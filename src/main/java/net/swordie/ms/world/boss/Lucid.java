package net.swordie.ms.world.boss;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.connection.packet.LucidPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.enums.ButterFlyType;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.handlers.GlobalTimerManager;
import net.swordie.ms.life.mob.skill.ButterFly;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Randomizer;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Field;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

public class Lucid {

    public static void spawn(Char chr, LucidPhase phase) {
        if (BossHelper.checkInstance(chr)) {
            return;
        }

        ScriptManagerImpl sm = chr.getScriptManager();
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        switch (phase) {
            case FIRST -> {
                if (field.isBossSpawned()) {
                    return;
                }
                field.setBossSpawned(true);
                sm.invokeForParty(500, "spineScreen", false, false, true, 0, "Map/Effect3/BossLucid/Lucid/lusi", "animation", null);
                sm.invokeForParty(500, "playSound", "Sound/SoundEff.img/ArcaneRiver/phase1");
                field.getTimer().addEvent(() -> {
                    if (field.getId() == 450004150) {
                        long hp;
                        if (chr.getLucidMode() == 0) {
                            hp = 60000000000L;
                        } else if (chr.getLucidMode() == 1) {
                            hp = 120000000000L;
                        } else if (chr.getLucidMode() == 2) {
                            hp = 50800000000000L;
                        } else {
                            return;
                        }
                        field.spawnMob(8880140, 1000, 48, false, hp);
                        field.spawnMob(8880166, 1000, 48, false, hp);
                        if (field.getSpawnButterflyTimer() != null) {
                            field.getSpawnButterflyTimer().cancel(false);
                        }
                        ScheduledFuture<?> sf = field.getTimer().addFixedRateEvent(() -> spawnButterFly(chr, LucidPhase.FIRST.getVal()), 1000, 5000, false);
                        field.setSpawnButterflyTimer(sf);
                        GlobalTimerManager.addFieldTimer(field.getSN(), sf);
                        if (field.getDestroyButterflyTimer() != null) {
                            field.getDestroyButterflyTimer().cancel(false);
                        }
                        ScheduledFuture<?> sf2 = field.getTimer().addFixedRateEvent(() -> destroyButterFly(chr), 33500, 32500, false);
                        field.setDestroyButterflyTimer(sf2);
                        GlobalTimerManager.addFieldTimer(field.getSN(), sf2);
                    }
                }, 2000);
            }
            case SECOND -> {
                if (field.isBossSpawned()) {
                    return;
                }
                field.setBossSpawned(true);
                if (field.getId() == 450004250 && !field.hasMobById(8880150)) {
                    long hp;
                    if (chr.getLucidMode() == 0) {
                        hp = 60000000000L;
                    } else if (chr.getLucidMode() == 1) {
                        hp = 120000000000L;
                    } else if (chr.getLucidMode() == 2) {
                        hp = 50800000000000L;
                    } else {
                        return;
                    }
                    field.spawnMob(8880150, 532, -490, false, hp);
                    if (field.getSpawnButterflyTimer() != null) {
                        field.getSpawnButterflyTimer().cancel(false);
                    }
                    ScheduledFuture<?> sf = field.getTimer().addFixedRateEvent(() -> spawnButterFly(chr, 1), 1000, 5000, false);
                    field.setSpawnButterflyTimer(sf);
                    GlobalTimerManager.addFieldTimer(field.getSN(), sf);
                    if (field.getDestroyButterflyTimer() != null) {
                        field.getDestroyButterflyTimer().cancel(false);
                    }
                    ScheduledFuture<?> sf2 = field.getTimer().addFixedRateEvent(() -> destroyButterFly(chr), 33500, 32500, false);
                    field.setDestroyButterflyTimer(sf2);
                    GlobalTimerManager.addFieldTimer(field.getSN(), sf2);
                }
            }
            case REWARD -> {
                if (field.isBossSpawned()) {
                    return;
                }
                field.setBossSpawned(true);
                long hp = 9999999;
                if (field.getId() == 450004300) {
                    if (!field.isLucidRewardSpawned()) {
                        int id;
                        if (chr.getLucidMode() == 0) {
                            id = 8880177;
                            field.getTimer().addEvent(() -> field.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossLucid, "Congratulations on defeating the Easy Lucid!", 3000)), 1000);
                        } else if (chr.getLucidMode() == 1) {
                            id = 8880167;
                            field.getTimer().addEvent(() -> field.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossLucid, "Congratulations on defeating the Normal Lucid!", 3000)), 1000);
                        } else if (chr.getLucidMode() == 2) {
                            id = 8880156;
                            field.getTimer().addEvent(() -> field.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.BossLucid, "Congratulations on defeating the Hard Lucid!", 3000)), 1000);
                        } else {
                            return;
                        }
                        field.getTimer().addEvent(() -> chr.getField().spawnMob(id, 50, 36, false, hp), 2000);
                        field.setLucidRewardSpawned(true);
                    }
                }
            }
        }
    }

    public static void spawnButterFly(Char chr, int phase) {
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        switch (field.getId()) {
            case 450004150:
            case 450004250:
            case 450004450:
            case 450004550:
            case 450004750:
            case 450004850:
                List<ButterFly> butterflies = new ArrayList<>();
                Position butterflyPosition = ButterFly.getPosition(phase != 1, Randomizer.rand(0, phase == 1 ? ButterFly.BUTTERFLY_POS2.size() - 1 : ButterFly.BUTTERFLY_POS1.size() - 2));
                butterflies.add(new ButterFly(Randomizer.rand(0, 8), butterflyPosition));
                field.setButterFlyCount(field.getButterFlyCount() + 1);
                field.broadcast(LucidPacket.butterFlyInit(butterflies));
                field.broadcast(LucidPacket.butterflyAction(ButterFlyType.Add, butterflies.get(0).getType(), butterflies.get(0).getPos(), 0, 0));
                break;
            default:
                if (field.getSpawnButterflyTimer() != null) {
                    field.getSpawnButterflyTimer().cancel(false);
                    field.setSpawnButterflyTimer(null);
                }
                break;
        }
    }

    public static void cutScene(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        if (field.getId() == 450004800) {
            sm.lockInGameUI(true);
            sm.blind(1, 255, 0, 0);
            field.getTimer().addEvent(() -> sm.spineScreen(true, false, false, 0, "Map/Effect3.img/BossLucid/butterfly2/buterfly", "animation", ""), 1000);
            field.getTimer().addEvent(() -> sm.blind(0, 0, 0, 0, 0, 1000), 3800);
            field.getTimer().addEvent(() -> sm.lockInGameUI(false), 4000);
            field.getTimer().addEvent(() -> chr.warp(chr.getField().getId() + 50), 3900);
        } else if (field.getId() == 450004500) {
            sm.lockInGameUI(true);
            sm.blind(1, 255, 0, 0);
            field.getTimer().addEvent(() -> sm.spineScreen(true, false, false, 0, "Map/Effect3.img/BossLucid/butterfly2/buterfly", "animation", ""), 1000);
            field.getTimer().addEvent(() -> sm.blind(0, 0, 0, 0, 0, 1000), 3800);
            field.getTimer().addEvent(() -> sm.lockInGameUI(false), 4000);
            field.getTimer().addEvent(() -> chr.warp(chr.getField().getId() + 50), 3900);
        } else if (field.getId() == 450004200) {
            sm.lockInGameUI(true);
            sm.blind(1, 255, 0, 0);
            field.getTimer().addEvent(() -> sm.spineScreen(true, false, false, 0, "Map/Effect3.img/BossLucid/butterfly2/buterfly", "animation", ""), 1000);
            field.getTimer().addEvent(() -> sm.blind(0, 0, 0, 0, 0, 1000), 3800);
            field.getTimer().addEvent(() -> sm.lockInGameUI(false), 4000);
            field.getTimer().addEvent(() -> chr.warp(chr.getField().getId() + 50), 3900);
        }
    }

    public static void destroyButterFly(Char chr) {
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        switch (field.getId()) {
            case 450004150:
            case 450004250:
            case 450004450:
            case 450004550:
            case 450004750:
            case 450004850:
                final int count = field.getButterFlyCount();
                field.setLucidStatueGauge(0);
                field.setButterFlyCount(0);
                List<Integer> chars = new ArrayList<>();
                for (int i = 0; i <= chr.getLucidMode() * 10 + 20; i++) {
                    Char x = Util.getRandomFromCollection(field.getChars());
                    if (x != null) {
                        chars.add(x.getId());
                    }
                }
                field.broadcast(LucidPacket.butterflyAttack(count, chars));
                field.broadcast(LucidPacket.statueStateChange(false, Math.min(field.getLucidStatueGauge(), 3), true));
                break;
            default:
                if (field.getDestroyButterflyTimer() != null) {
                    field.getDestroyButterflyTimer().cancel(false);
                    field.setDestroyButterflyTimer(null);
                }
                break;
        }
    }

    public enum LucidPhase {
        FIRST(0),
        SECOND(1),
        LAST(2),
        REWARD(3),
        ;

        private final int val;

        LucidPhase(int val) {
            this.val = val;
        }

        public int getVal() {
            return val;
        }
    }

    public enum LucidMode {
        EASY(0),
        NORMAL(1),
        HARD(2),
        ;

        private final int val;

        LucidMode(int val) {
            this.val = val;
        }

        public int getVal() {
            return val;
        }
    }
}
