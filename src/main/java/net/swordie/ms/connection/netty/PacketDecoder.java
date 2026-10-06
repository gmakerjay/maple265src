package net.swordie.ms.connection.netty;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.crypto.MapleCrypto;

import java.util.List;

public class PacketDecoder extends ByteToMessageDecoder {

    private byte[] iv;

    public PacketDecoder(byte[] initialIv) {
        this.iv = initialIv;
    }

    @Override
    protected void decode(ChannelHandlerContext chc, ByteBuf in, List<Object> out) {
        if (this.iv == null) {
            throw new IllegalStateException("IV has not been initialized.");
        }
        NettyClient c = chc.channel().attr(NettyClient.CLIENT_KEY).get();
        MapleCrypto mCr = chc.channel().attr(NettyClient.CRYPTO_KEY).get();
        if (c != null) {
            byte[] currentIv = this.iv;
            if (c.getStoredLength() == -1) {
                if (in.readableBytes() >= 4) {
                    int h = in.readInt();
                    if (!MapleCrypto.checkPacket(h, currentIv)) {
                        System.out.printf("Incorrect packet seq! Dropping client %s%n", c.getIP());
                        c.close();
                        return;
                    }
                    c.setStoredLength(MapleCrypto.getLength(h));
                } else {
                    return;
                }
            }
            if (in.readableBytes() >= c.getStoredLength()) {
                byte[] dec = new byte[c.getStoredLength()];
                in.readBytes(dec);
                c.setStoredLength(-1);
                dec = mCr.crypt(dec, currentIv);
                this.iv = MapleCrypto.getNewIv(currentIv);
                InPacket inPacket = new InPacket(dec);
                out.clear();
                out.add(inPacket);
            }
        }
    }
}
