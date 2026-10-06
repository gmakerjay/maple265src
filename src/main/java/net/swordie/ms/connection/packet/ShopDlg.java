package net.swordie.ms.connection.packet;

import net.swordie.ms.client.character.items.IntensePowerCrystalData;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.handlers.header.OutHeader;
import net.swordie.ms.world.shop.NpcShopDlg;
import net.swordie.ms.world.shop.result.ShopResult;

import java.util.Map;

public class ShopDlg {

    public static OutPacket openShop(int petTemplateID, NpcShopDlg nsd) {
        OutPacket outPacket = new OutPacket(OutHeader.SHOP_OPEN);

        outPacket.encodeInt(nsd.getNpcTemplateID());
        outPacket.encodeByte(petTemplateID != 0);
        if (petTemplateID != 0) {
            outPacket.encodeInt(petTemplateID);
        }
        nsd.encode(outPacket);

        return outPacket;
    }

    public static OutPacket shopResult(ShopResult shopResult) {
        OutPacket outPacket = new OutPacket(OutHeader.SHOP_RESULT);

        outPacket.encodeByte(shopResult.getType().getVal());
        shopResult.encode(outPacket);

        return outPacket;
    }

    public static OutPacket shopCrystal(boolean bool) {
        OutPacket outPacket = new OutPacket(OutHeader.SHOP_CRYSTAL);
        final Map<Integer, IntensePowerCrystalData> crystalDataMap = GameConstants.intensePowerCrystal;
        outPacket.encodeByte(bool);
        if (bool) {
            outPacket.encodeInt(1);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(2);
            outPacket.encodeInt(0);
            outPacket.encodeInt(0);
            outPacket.encodeInt(1);

            outPacket.encodeLong(94354848000000000L);
            outPacket.encodeLong(133778304000000000L);
            outPacket.encodeInt(crystalDataMap.size());
            crystalDataMap.forEach((bossId, data) -> {
                outPacket.encodeInt(data.getNamingMonster());
                outPacket.encodeLong(data.getMeso());
                outPacket.encodeInt(data.getRealMonster());
            });

            outPacket.encodeLong(133778304000000000L);
            outPacket.encodeLong(150842304000000000L);
            outPacket.encodeInt(crystalDataMap.size());
            crystalDataMap.forEach((bossId, data) -> {
                outPacket.encodeInt(data.getNamingMonster());
                outPacket.encodeLong(data.getMeso());
                outPacket.encodeInt(data.getRealMonster());
            });
        }
        
        return outPacket;
    }
}
