package net.swordie.ms.world.boss;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.packet.Effect;
import net.swordie.ms.connection.packet.UserPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.world.field.Field;

public class RootAbyss {

    public static void spawnPierre(Field field, Char chr, PierreMode mode) {
        if (field == null) {
            if (chr != null) {
                field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
            }
        }
        if (field == null || field.isBossSpawned()) {
            return;
        }
        field.setBossSpawned(true);
        Field finalField = field;
        switch (mode) {
            case NORMAL -> {
                finalField.getTimer().addEvent(() -> {
                    finalField.spawnMob(BossHelper.PIERRE_1, 497, 551, false);
                    finalField.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/Effect.img/rootabyss/firework")));
                    finalField.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossPierre, "From the bottom of my heart, welcome to the tea party!"));
                }, 1500);
            }
            case CHAOS -> {
                finalField.getTimer().addEvent(() -> {
                    finalField.spawnMob(BossHelper.CHAOS_PIERRE_1, 497, 551, false, 80_000_000_000L);
                    finalField.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/Effect.img/rootabyss/firework")));
                    finalField.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossPierre, "From the bottom of my heart, welcome to the tea party!"));
                }, 1500);
            }
        }
    }

    public static void spawnPierre(Char chr, PierreMode mode) {
        Field field = (chr != null) ? chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId()) : null;
        spawnPierre(field, chr, mode);
    }

    public enum PierreMode {
        NORMAL(0),
        CHAOS(1),
        ;

        private final int val;

        PierreMode(int val) {
            this.val = val;
        }

        public int getVal() {
            return val;
        }
    }

    public static void spawn(Field field, Char chr, String action) {
        if (field == null) {
            if (chr != null) {
                field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
            }
        }
        if (field == null) {
            return;
        }
        if (!field.getMobs().isEmpty() || field.isBossSpawned()) {
            return;
        }
        field.setBossSpawned(true);
        switch (action) {
            case "banbanNormal" -> {
                field.spawnMob(BossHelper.VON_BON, -135, 455, false);
            }
            case "banbanChaos" -> {
                field.spawnMob(BossHelper.CHAOS_VON_BON, -135, 455, false, 100_000_000_000L);
            }
            case "bellumNormal" -> {
                field.spawnMob(BossHelper.VELLUM, -200, 440, false);
                field.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossVellum, "You ignore my warnings?! I will show you no mercy!"));
            }
            case "bellumChaos" -> {
                field.spawnMob(BossHelper.CHAOS_VELLUM, -200, 440, false, 200_000_000_000L);
                field.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossVellum, "You ignore my warnings?! I will show you no mercy!"));
            }
            case "queenNormal" -> {
                field.spawnMob(BossHelper.QUEEN_1, 37, 135, false);
            }
            case "queenChaos" -> {
                field.spawnMob(BossHelper.CHAOS_QUEEN_1, 37, 135, false, 140_000_000_000L);
            }
        }
    }

    public static void spawn(Char chr, String action) {
        Field field = (chr != null) ? chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId()) : null;
        spawn(field, chr, action);
    }
}
