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
        } catch (Exception e) {
            final var inPacketEx = new InPacket(inPacket.getData().clone());
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, String.format("Packet %s [%d] got Exception: %s", header, inPacketEx.decodeShort(), inPacketEx));
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
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
