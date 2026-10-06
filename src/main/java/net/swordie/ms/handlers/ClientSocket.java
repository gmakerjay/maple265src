package net.swordie.ms.handlers;

import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.handlers.header.OutHeader;

public class ClientSocket {

    public static OutPacket migrateCommand(boolean succeed, short port) {
        OutPacket outPacket = new OutPacket(OutHeader.MIGRATE_COMMAND);

        outPacket.encodeByte(succeed); // will disconnect if false
        if (succeed) {
            outPacket.encodeArr(net.swordie.ms.ServerConstants.CHANNEL_IP);
            outPacket.encodeShort(port);
            outPacket.encodeInt(0); // ??
        }

        return outPacket;
    }

    public static OutPacket auctionHouseOut(short port) {
        OutPacket outPacket = new OutPacket(OutHeader.MIGRATE_COMMAND);

        outPacket.encodeByte(true);
        outPacket.encodeArr(net.swordie.ms.ServerConstants.CHANNEL_IP);
        outPacket.encodeShort(port);
        outPacket.encodeInt(0); // ??

        return outPacket;
    }

    public static OutPacket opcodeEncryption(byte[] buf) {
        OutPacket outPacket = new OutPacket(OutHeader.OPCODE_ENCRYPTION);

        outPacket.encodeInt(buf.length);
        outPacket.encodeArr(buf);

        return outPacket;
    }
}
