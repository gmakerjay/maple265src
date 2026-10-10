package net.swordie.ms.connection.netty;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import net.swordie.ms.Server;
import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.handlers.*;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.handlers.item.*;
import net.swordie.ms.handlers.life.*;
import net.swordie.ms.handlers.social.*;
import net.swordie.ms.handlers.ui.*;
import net.swordie.ms.handlers.user.*;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.FileTime;

import java.io.IOException;
import java.time.format.DateTimeFormatter;

import static net.swordie.ms.ServerConstants.version;
import static net.swordie.ms.connection.netty.NettyClient.CLIENT_KEY;

public class ChannelHandler extends SimpleChannelInboundHandler<InPacket> {

    public ChannelHandler(boolean autoRelease) {
        super(autoRelease);
    }

    @Override
    public void channelActive(ChannelHandlerContext chc) throws Exception {
        super.channelActive(chc);
        Server.get().getChannels().add(chc.channel());
        System.out.println(STR."Online(s): \{Server.get().getChannels().size()}");
    }

    @Override
    public void channelInactive(ChannelHandlerContext chc) {
        Client c = (Client) chc.channel().attr(CLIENT_KEY).get();
        if (c != null) {
            c.handleChannelInactive();
        }
        Server.get().getChannels().remove(chc.channel());
        System.out.println(STR."Online(s): \{Server.get().getChannels().size()}");
    }

    @Override
    public void channelRead0(ChannelHandlerContext chc, InPacket inPacket) {
        final var c = (Client) chc.channel().attr(CLIENT_KEY).get();
        final var chr = c != null ? c.getChr() : null;
        final var op = inPacket.decodeShort();
        final var header = InHeader.getInHeaderByOp(op);
        if (header == null) {
            if (ServerConfig.PACKET_LOG) {
                handleUnknown(inPacket, op);
            }
            return;
        }
        if (ServerConfig.PACKET_LOG && !InHeader.isSpamHeader(header)) {
            try {
                debug(c, chr, inPacket, op);
            } catch (Exception ignored) {}
        }
        final PacketHandler handler = PacketProcessor.getHandler(header);
        if (handler == null) return;
        try {
            handler.handle(c, chr, inPacket);
        } catch (Throwable t) {
            final var inPacketEx = new InPacket(inPacket.getData().clone());
            short inOp = inPacketEx.decodeShort();
            String accName = (c != null && c.getUser() != null) ? c.getUser().getName() : ((c != null && c.getAccount() != null) ? ("AccID:" + c.getAccount().getId()) : "(no acc)");
            String chrInfo = (chr != null) ? String.format("%s (ID: %d, Job: %d, Lv: %d)", chr.getName(), chr.getId(), chr.getJob(), chr.getLevel()) : "(no chr)";
            String ip = (c != null) ? c.getIP() : "(no ip)";

            StringBuilder sb = new StringBuilder();
            sb.append("\n============================== [PACKET EXCEPTION] ==============================\n");
            sb.append(String.format("[Packet]   Opcode: %s [%d / 0x%04X]\n", header, inOp, inOp));
            sb.append(String.format("[Client]   Account: %s | Char: %s | IP: %s\n", accName, chrInfo, ip));
            sb.append(String.format("[Error]    %s: %s\n", t.getClass().getName(), t.getMessage()));
            sb.append("[Location] Stack Trace:\n");
            int frames = 0;
            for (StackTraceElement elem : t.getStackTrace()) {
                if (elem.getClassName().startsWith("net.swordie.ms")) {
                    sb.append(String.format("   -> %s.%s(%s:%d)\n", elem.getClassName(), elem.getMethodName(), elem.getFileName(), elem.getLineNumber()));
                    frames++;
                    if (frames >= 10) break;
                }
            }
            if (frames == 0) {
                for (int i = 0; i < Math.min(5, t.getStackTrace().length); i++) {
                    sb.append(String.format("   -> %s\n", t.getStackTrace()[i]));
                }
            }
            if (t.getCause() != null) {
                sb.append(String.format("[Caused By] %s: %s\n", t.getCause().getClass().getName(), t.getCause().getMessage()));
                for (StackTraceElement elem : t.getCause().getStackTrace()) {
                    if (elem.getClassName().startsWith("net.swordie.ms")) {
                        sb.append(String.format("      -> %s.%s(%s:%d)\n", elem.getClassName(), elem.getMethodName(), elem.getFileName(), elem.getLineNumber()));
                    }
                }
            }
            sb.append(String.format("[Dump]     %s\n", inPacketEx));
            sb.append("================================================================================");

            System.err.println(sb.toString());
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, sb.toString(), true);
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, t);
            if (c != null) c.write(WvsContext.exclRequest());
        }
    }

    private void handleUnknown(InPacket inPacket, short op) {
        if (!InHeader.isSpamHeader(InHeader.getInHeaderByOp(op))) {
            String err = String.format("[%s] Unhandled opcode %s, %d\t| %s", FileTime.currentTime().toLocalDateTime().format(DateTimeFormatter.ISO_DATE_TIME), InHeader.getInHeaderByOp(op), op, inPacket);
            System.out.println(err);
        }
    }

    private void debug(Client c, Char chr, InPacket inPacket, short op) {
        if (chr != null) {
            if (ServerConfig.PACKET_LOG) {
                String err = String.format("[In v." + version + "]\t| %s\t| %s, %d\t| %s", chr.getName(), InHeader.getInHeaderByOp(op), op, inPacket);
                System.out.println(err);
                DataPrinter.send(DataPrinter.PACKET_LOG + chr.getName() + ".txt", err, false);
            }
        } else {
            if (ServerConfig.PACKET_LOG) {
                System.out.printf("[In v." + version + "]\t| %s\t| %s, %d\t| %s%n", c.getIP(), InHeader.getInHeaderByOp(op), op, inPacket);
            }
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        Client c = (Client) ctx.channel().attr(CLIENT_KEY).get();
        if (cause instanceof IOException) {
            System.out.printf("%s forcibly closed the game.%n", c.getIP());
        } else {
            System.out.printf("%s caught an exception:%n", c.getIP());
        }
    }
}
