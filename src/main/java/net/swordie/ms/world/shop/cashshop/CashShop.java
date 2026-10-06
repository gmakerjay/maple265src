package net.swordie.ms.world.shop.cashshop;

import net.swordie.ms.connection.OutPacket;

public class CashShop {

    public void encodeSaleInfo(OutPacket outPacket) {
        short size = 0;
        size = 1;
        outPacket.encodeInt(size); // int per size
        for (int i = 0; i < size; i++) {
            outPacket.encodeInt(0);
        }
        size = 1;
        outPacket.encodeInt(size); // randomItemCount
        for (int i = 0; i < size; i++) {
            outPacket.encodeArr(new byte[20]);
        }
    }

    public void encodeMainBest(OutPacket outPacket) {
        int size = 0;
        outPacket.encodeShort(size); // was int in kmst?
        for (int i = 0; i < size; i++) {
            outPacket.encodeByte(1); // nClass
            outPacket.encodeInt(5160013); // nQuestID?
        }
    }

    public void encodeCustomizedPackage(OutPacket outPacket) {
        int size = 0;
        outPacket.encodeInt(size);
        for (int i = 0; i < size; i++) {
            outPacket.encodeByte(2); // nClass
            outPacket.encodeInt(5160013); // nQuestID?
        }
    }

    public void encodeNew(OutPacket outPacket) {
        // CCashShop::LoadData
        outPacket.encodeByte(true);
        // CCashShop::LoadData_0(v150, InPacket)
        outPacket.encodeShort(0);
        outPacket.encodeShort(0);
        int size = 0;
        outPacket.encodeInt(size);
        // CCashShop::LoadData_1(v150, InPacket)
        int size1 = 0;
        outPacket.encodeInt(size1); // best items
        for (int i = 0; i < size1; i++) {
            outPacket.encodeByte(3);
            outPacket.encodeInt(110000030);
        }
        // CCashShop::LoadData_2(v150, InPacket)
        int size2 = 0;
        outPacket.encodeInt(size2);
        for (int i = 0; i < size2; i++) {
            outPacket.encodeByte(3);
            outPacket.encodeInt(110000030);
        }
        // CCashShop::LoadData_3(v150, InPacket)
        String[][] strs = {
                {"Royal", "Want an even more beautiful and cool character? Click to find out the secret ----->"},
                {"Magical Harp", "Reach the top of Fever! During the fever moment, the chances of getting good items DOUBLE UP."},
                {"Maple Royal Style", "Don't miss out on limited-time premium items with powerful options."}
        };
        outPacket.encodeInt(strs.length);
        for (String[] str : strs) {
            outPacket.encodeString(str[0]);
            outPacket.encodeString(str[1]);
        }
        // CCashShop::LoadData_4(v150, InPacket)
        int size4 = 0;
        outPacket.encodeShort(size4);
        for (int i = 0; i < size4; i++) {
            outPacket.encodeLong(0);
        }
        // CCashShop::LoadData_5(v150, InPacket)
        int size5 = 0;
        outPacket.encodeShort(size5);
        if (size5 > 0) {
            outPacket.encodeInt(0);
        }
        for (int i = 0; i < size5; i++) {
            outPacket.encodeInt(0);
            outPacket.encodeArr(new byte[40]);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeByte(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeArr(new byte[28]);
            outPacket.encodeByte(0);
            outPacket.encodeString("");
            outPacket.encodeInt(0);
        }
    }
}
