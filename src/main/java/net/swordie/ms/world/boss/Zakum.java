package net.swordie.ms.world.boss;

import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.BossConstants;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.world.field.Field;

public class Zakum {

    public static void spawn(int mode, Field field) {
        if (field.getZakumStand() == 0) {
            field.setZakumStand(1);
            final short x = BossConstants.ZAKUM_SPAWN_X;
            final short y = BossConstants.ZAKUM_SPAWN_Y;
            int zakumBody = 0;
            int zakumArm = 0;
            switch (mode) {
                case 1 -> {
                    field.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossKillNotice, "[Easy] Zakum is summoned by the force of eye of fire."));
                    zakumBody = BossConstants.ZAKUM_EASY_BODY;
                    zakumArm = BossConstants.ZAKUM_EASY_ARM;
                }
                case 2 -> {
                    field.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossKillNotice, "[Normal] Zakum is summoned by the force of eye of fire."));
                    zakumBody = BossConstants.ZAKUM_NORMAL_BODY;
                    zakumArm = BossConstants.ZAKUM_NORMAL_ARM;
                }
                case 3 -> {
                    field.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossKillNotice, "[Chaos] Zakum is summoned by the force of eye of fire."));
                    zakumBody = BossConstants.ZAKUM_CHAOS_BODY;
                    zakumArm = BossConstants.ZAKUM_CHAOS_ARM;
                }
            }
            field.spawnMob(zakumBody, x, y, false);
            for (int i = 0; i < 8; i++) {
                field.spawnMob(zakumArm + i, x, y, false);
            }
            field.createZakumStand();
        }
    }
}
