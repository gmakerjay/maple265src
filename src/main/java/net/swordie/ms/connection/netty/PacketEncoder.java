package net.swordie.ms.connection.netty;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import net.swordie.ms.client.Client;
import net.swordie.ms.connection.Packet;
import net.swordie.ms.connection.SharedPacket;
import net.swordie.ms.connection.crypto.MapleCrypto;
import net.swordie.ms.util.Util;

public final class PacketEncoder extends MessageToByteEncoder<Object> {

    private byte[] iv;

    public PacketEncoder(byte[] initialIv) {
        this.iv = initialIv;
    }

    @Override
    protected void encode(ChannelHandlerContext chc, Object msg, ByteBuf bb) throws Exception {
        if (this.iv == null) {
            throw new IllegalStateException("IV has not been initialized.");
        }
        final byte[] src;
        final boolean shared;
        if (msg instanceof byte[]) {
            src = (byte[]) msg;
            shared = false;
        } else if (msg instanceof SharedPacket) {
            src = ((SharedPacket) msg).data;
            shared = true;
        } else {
            throw new IllegalArgumentException("Unsupported msg type: " + msg.getClass());
        }
        final byte[] data;
        if (shared) {
            data = new byte[src.length];
            System.arraycopy(src, 0, data, 0, src.length);
        } else {
            data = src;
        }
        NettyClient c = chc.channel().attr(NettyClient.CLIENT_KEY).get();
        MapleCrypto mCr = chc.channel().attr(NettyClient.CRYPTO_KEY).get();
        if (c != null) {
            byte[] currentIv = this.iv;
            byte[] head = MapleCrypto.getHeader(data.length, currentIv);
            if (data.length >= Packet.MAX_SHORT_PACKET_SIZE) {
                var oldHeader = head;
                head = new byte[oldHeader.length + 4];
                System.arraycopy(oldHeader, 0, head, 0, oldHeader.length);

                var rawSeq = (head[0] & 0xFF) + ((head[1] & 0xFF) << 8);
                encodeIntLength(head, data.length, rawSeq);
            }
            Client client = (Client) c;
            if (client.getChr() != null) {
                mCr.encInit(Util.toInt(currentIv), data, false);
            } else {
                mCr.crypt(data, currentIv);
            }
            this.iv = MapleCrypto.getNewIv(currentIv);
            bb.writeBytes(head);
            bb.writeBytes(data);
        } else {
            bb.writeBytes(data);
        }
    }

    private void encodeIntLength(byte[] data, int length, int rawSeq) {
        // make dataLen LE
        int xorLen = rawSeq ^ length;
        data[4] = (byte) (xorLen & 0xFF);
        data[5] = (byte) ((xorLen >>> 8) & 0xFF);
        data[6] = (byte) ((xorLen >>> 16) & 0xFF);
        data[7] = (byte) ((xorLen >>> 24) & 0xFF);
    }
}
