package net.swordie.ms.connection.netty;

import io.netty.channel.Channel;
import io.netty.util.AttributeKey;
import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.crypto.MapleCrypto;
import net.swordie.ms.handlers.ClientSocket;
import net.swordie.ms.handlers.header.OutHeader;
import net.swordie.ms.util.DataPrinter;

import static net.swordie.ms.ServerConstants.version;

public class NettyClient {

    public static final int MAX_PACKET_SIZE = 16777215;
    public static final AttributeKey<MapleCrypto> CRYPTO_KEY = AttributeKey.valueOf("A");
    public static final AttributeKey<NettyClient> CLIENT_KEY = AttributeKey.valueOf("C");

    protected final Channel ch;
    private int storedLength = -1;

    public NettyClient(Channel channel) {
        this.ch = channel;
    }

    public final int getStoredLength() {
        return storedLength;
    }

    public final void setStoredLength(int val) {
        storedLength = val;
    }

    public void write(OutPacket packet) {
        if (packet.getLength() > MAX_PACKET_SIZE) {
            DataPrinter.send(DataPrinter.PACKET_LOG_ERR, String.format("Packet is too big! ([Out] %d size = %d)",
                    packet.getHeader(), packet.getLength()), false);
            return;
        }
        final byte[] data = packet.getData();
        this.ch.writeAndFlush(data);
        debug(this, packet);
    }

    public static void debug(String name, OutPacket outPacket) {
        try {
            if (!OutHeader.isSpamHeader(OutHeader.getOutHeaderByOp(outPacket.getHeader()))) {
                if (ServerConfig.PACKET_LOG) {
                    String err = "[Out]\t| " + outPacket;
                    System.out.println(err);
                    DataPrinter.send(DataPrinter.PACKET_LOG + name + ".txt", err, false);
                }
            }
        } catch (Exception ignored) {}
    }

    public static void debug(NettyClient c, OutPacket outPacket) {
        try {
            if (c != null) {
                Client client = (Client) c;
                Char chr = client.getChr();
                if (chr != null) {
                    if (!OutHeader.isSpamHeader(OutHeader.getOutHeaderByOp(outPacket.getHeader()))) {
                        if (ServerConfig.PACKET_LOG) {
                            String err = "[Out v." + version + "]\t| " + chr.getName() + "\t| " + outPacket;
                            System.out.println(err);
                            DataPrinter.send(DataPrinter.PACKET_LOG + chr.getName() + ".txt", err, false);
                        }
                    }
                } else {
                    if (!OutHeader.isSpamHeader(OutHeader.getOutHeaderByOp(outPacket.getHeader()))) {
                        if (ServerConfig.PACKET_LOG) {
                            String err = "[Out v." + version + "]\t| " + client.getIP() + "\t| " + outPacket;
                            System.out.println(err);
                            DataPrinter.send(DataPrinter.PACKET_LOG + "Clients.txt", err, false);
                        }
                    }
                }
            }
        } catch (Exception ignored) {}
    }

    public Channel getCh() {
        return ch;
    }

    public void close() {
        System.out.println("[NettyClient] Đã gửi packet đóng client cho " + getIP());
        write(ClientSocket.migrateCommand(false, (short) 0));
    }

    public String getIP() {
        String ip = ch.remoteAddress().toString().split(":")[0];
        return ip.startsWith("/") ? ip.substring(1) : ip;
    }

    public String getPort() {
        return ch.remoteAddress().toString().split(":")[1];
    }

    public byte[] getEffectiveChannelIp() {
        try {
            String remoteIp = getIP();
            if ("127.0.0.1".equals(remoteIp) || "localhost".equalsIgnoreCase(remoteIp)) {
                return new byte[] {127, 0, 0, 1};
            }
            if (!net.swordie.ms.ServerConstants.LOCAL_HOST_SERVER && net.swordie.ms.ServerConstants.CHANNEL_IP != null) {
                return net.swordie.ms.ServerConstants.CHANNEL_IP;
            }
            if (ch != null && ch.localAddress() instanceof java.net.InetSocketAddress) {
                java.net.InetSocketAddress local = (java.net.InetSocketAddress) ch.localAddress();
                byte[] addr = local.getAddress().getAddress();
                if (addr != null && addr.length == 4 && !(addr[0] == 0 && addr[1] == 0 && addr[2] == 0 && addr[3] == 0)) {
                    return addr;
                }
            }
        } catch (Exception ignored) {}
        return net.swordie.ms.ServerConstants.CHANNEL_IP;
    }
}