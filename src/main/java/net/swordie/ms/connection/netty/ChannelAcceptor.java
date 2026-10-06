package net.swordie.ms.connection.netty;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;

import net.swordie.ms.client.Client;
import net.swordie.ms.connection.crypto.MapleCrypto;
import net.swordie.ms.connection.packet.Login;
import net.swordie.ms.util.DataPrinter;

import java.security.SecureRandom;

import static net.swordie.ms.connection.netty.NettyClient.CLIENT_KEY;


public class ChannelAcceptor implements Runnable {

    public net.swordie.ms.world.Channel channel;

    @Override
    public void run() {
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup);
            b.channel(NioServerSocketChannel.class);
            b.childHandler(new ChannelInitializer<SocketChannel>() {
                @Override
                protected void initChannel(SocketChannel ch) {
                    byte[] siv;
                    byte[] riv;
                    siv = new byte[]{(byte) 0xC0, (byte) 0x13, (byte) 0xB8, (byte) 0x12};
                    new SecureRandom().nextBytes(siv);
                    riv = new byte[]{(byte) 0x5F, (byte) 0x5D, (byte) 0x93, (byte) 0x28};
                    new SecureRandom().nextBytes(riv);
                    ch.pipeline().addLast(
                            new PacketDecoder(riv),
                            new PacketEncoder(siv),
                            new ChannelHandler(true));
                    Client c = new Client(ch);
                    c.write(Login.sendConnect(riv, siv, true));
                    ch.attr(CLIENT_KEY).set(c);
                    ch.attr(Client.CRYPTO_KEY).set(new MapleCrypto());
                    c.write(Login.sendServerValues());        // 69
                    c.write(Login.sendServerEnvironment());   // 70
                    c.write(Login.sendWzCheckList());  // 61
                    c.write(Login.sendFileCheckList());
                    c.write(Login.sendSecurityCodePacket()); // 45
                    c.write(Login.sendSecurityCodePacket_Attach()); // 48
                    c.sendPing();
                }
            });
            b.childOption(ChannelOption.TCP_NODELAY, true);
            b.childOption(ChannelOption.SO_KEEPALIVE, true);
            ChannelFuture f = b.bind(channel.getPort()).sync();
            System.out.printf("[World %d] Channel %d listening on port %d.%n", channel.getWorldId(), channel.getChannelId(), channel.getPort());
            f.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
        } finally {
            workerGroup.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
    }
}
