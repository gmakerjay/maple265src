package net.swordie.ms.world.boss;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.constants.BossConstants;
import net.swordie.ms.enums.BossPartyType;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Field;

public class VonLeon {

    public static void spawn(Char chr) {
        if (BossHelper.checkInstance(chr)) {
            return;
        }

        ScriptManagerImpl sm = chr.getScriptManager();
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        Party party = chr.getParty();
        sm.setPlayerBoxChat();
        if (party != null) {
            if (!party.isLeader(chr)) {
                sm.sendSayOkay("Xin hãy để người lãnh đạo nhóm của bạn nói chuyện với tôi!");
            } else {
                if (field.getId() == 211070104 && !field.isBossSpawned()) {
                    field.setBossSpawned(true);
                    sm.removeNpc(2161000);
                    field.spawnMob(8840018, 28, -181, false);
                } else if (field.getId() == 211070102 && !field.isBossSpawned()) {
                    field.setBossSpawned(true);
                    sm.removeNpc(2161000);
                    field.spawnMob(8840013, 28, -181, false);
                } else if (field.getId() == 211070100 && !field.isBossSpawned()) {
                    field.setBossSpawned(true);
                    sm.removeNpc(2161000);
                    field.spawnMob(8840010, 28, -181, false);
                } else {
                    sm.exitBoss();
                }
            }
        } else {
            sm.warpInstanceOut(chr, BossConstants.VON_LEON_ENTRACE_MAP);
        }
    }
}
