package net.swordie.ms.world.boss;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.constants.BossConstants;
import net.swordie.ms.enums.BossPartyType;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Field;

public class Ranmaru {

    public static void spawn(Char chr, RanmaruMode mode) {
        if (BossHelper.checkInstance(chr)) {
            return;
        }

        ScriptManagerImpl sm = chr.getScriptManager();
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        switch (mode) {
            case NORMAL:
                if (!field.isBossSpawned()) {
                    field.setBossSpawned(true);
                    field.getTimer().addEvent(() -> field.spawnMob(BossHelper.RANMARU_NORMAL, -373, 123, false, 5000000000L), 2000);
                }
                break;
            case HARD:
                if (!field.isBossSpawned()) {
                    field.setBossSpawned(true);
                    field.getTimer().addEvent(() -> field.spawnMob(BossHelper.RANMARU_HARD, -373, 123, false, 50000000000L), 2000);
                }
                break;
        }
    }

    public enum RanmaruMode {
        NORMAL(0),
        HARD(1),
        ;

        private final int val;

        RanmaruMode(int val) {
            this.val = val;
        }

        public int getVal() {
            return val;
        }
    }
}
