package net.swordie.ms.connection.netty;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import net.swordie.ms.ServerConstants;
import net.swordie.ms.client.Client;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.crypto.MapleCrypto;
import net.swordie.ms.connection.packet.Login;
import net.swordie.ms.util.DataPrinter;

import java.security.SecureRandom;

import static net.swordie.ms.connection.netty.NettyClient.CLIENT_KEY;

public class LoginAcceptor implements Runnable {

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
                    siv = new byte[]{(byte) 0xED, (byte) 0x15, (byte) 0xFD, (byte) 0x45};
                    new SecureRandom().nextBytes(siv);
                    riv = new byte[]{(byte) 0x39, (byte) 0x33, (byte) 0xD2, (byte) 0x2A};
                    new SecureRandom().nextBytes(riv);
                    ch.pipeline().addLast(
                            new PacketDecoder(riv),
                            new PacketEncoder(siv),
                            new ChannelHandler(true));
                    Client c = new Client(ch);
                    c.write(Login.sendConnect(riv, siv, false));
                    ch.attr(CLIENT_KEY).set(c);
                    ch.attr(Client.CRYPTO_KEY).set(new MapleCrypto());
                    c.write(Login.sendSecurityPacket());
                    c.write(Login.sendServerValues());
                    c.write(Login.sendServerEnvironment());
                    c.write(Login.sendWzCheckList());
                    c.write(Login.sendSecurityCodePacket());
                    c.write(Login.sendSecurityCodePacket_Attach());
                    c.sendPing();
                }
            });
            b.childOption(ChannelOption.TCP_NODELAY, true);
            b.childOption(ChannelOption.SO_KEEPALIVE, true);
            ChannelFuture f = b.bind(ServerConstants.LOGIN_PORT).sync();
            System.out.printf("Login listening on port %d.%n", ServerConstants.LOGIN_PORT);
            f.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
        } finally {
            workerGroup.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
    }
}
