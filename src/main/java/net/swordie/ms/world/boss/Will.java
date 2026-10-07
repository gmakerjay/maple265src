package net.swordie.ms.world.boss;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.connection.packet.WillPacket;
import net.swordie.ms.constants.BossConstants;
import net.swordie.ms.enums.BossPartyType;
import net.swordie.ms.handlers.GlobalTimerManager;
import net.swordie.ms.life.mob.skill.SpiderWeb;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Field;

import java.util.concurrent.ScheduledFuture;

public class Will {

    public static void playAnimation(int stage, Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        int nextFieldID = sm.getFieldID() + 50;
        if (stage == 1) {
            sm.lockUI();
            sm.spineScreen(false, false, true, 0, "Effect/Direction20.img/bossWill/intro_spine/skeleton", "1", "skeleton");
            sm.playSound("Sound/SoundEff.img/esfera/boss/intro1");
            sm.invokeAfterDelay(7000, "unlockUI");
            sm.invokeAfterDelay(8000, "warpInstanceIn", chr, nextFieldID);
        } else if (stage == 2) {
            sm.lockUI();
            sm.spineScreen(false, false, true, 0, "Effect/Direction20.img/bossWill/intro_spine/skeleton", "2", "skeleton");
            sm.playSound("Sound/SoundEff.img/esfera/boss/intro2");
            sm.invokeAfterDelay(7000, "unlockUI");
            sm.invokeAfterDelay(8000, "warpInstanceIn", chr, nextFieldID);
        } else if (stage == 3) {
            sm.lockUI();
            sm.spineScreen(false, false, true, 0, "Effect/Direction20.img/bossWill/intro_spine/skeleton", "3", "skeleton");
            sm.playSound("Sound/SoundEff.img/esfera/boss/intro3");
            sm.invokeAfterDelay(7000, "unlockUI");
            sm.invokeAfterDelay(8000, "warpInstanceIn", chr, nextFieldID);
        }
    }

    public static void spawn(int stage, Char chr) {
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        if (field.isBossSpawned()) {
            return;
        }
        field.setBossSpawned(true);
        Party party = chr.getParty();
        int fieldID = field.getId();
        long moonLightTime = 100000000L;
        if (fieldID == 450008750 || fieldID == 450008850 || fieldID == 450008950) {
            moonLightTime = 1000L;
        } else if (fieldID == 450008150 || fieldID == 450008250 || fieldID == 450008350) {
            moonLightTime = 2000L;
        }
        boolean isNormal = moonLightTime == 1000L;
        boolean isHard = moonLightTime == 2000L;
        java.util.Collection<Char> targets = (party != null) ? party.getOnlineChars() : java.util.List.of(chr);
        if (stage == 1) {
            field.removeMobs();
            for (Char pmChr : targets) {
                if (pmChr.getField().getId() != 450008150 && pmChr.getField().getId() != 450008750) {
                    continue;
                }
                pmChr.setMoonGauge(0);
                pmChr.write(WillPacket.setMoonGauge(100, 45));
                pmChr.write(WillPacket.addMoonGauge(pmChr.getMoonGauge()));
                if (pmChr.getWillGaugeTimer() != null) {
                    pmChr.getWillGaugeTimer().cancel(false);
                }
                ScheduledFuture<?> sf = field.getTimer().addFixedRateEvent(() -> {
                    pmChr.setMoonGauge(Math.min(pmChr.getMoonGauge() + 2, 100));
                    pmChr.write(WillPacket.addMoonGauge(pmChr.getMoonGauge()));
                }, 500, moonLightTime, false);
                pmChr.setWillGaugeTimer(sf);
                GlobalTimerManager.addCharTimer(pmChr.getId(), sf);
            }
            if (isNormal) {
                long hp = 8400000000000L;
                field.spawnMob(8880340, 352, -2020, false, hp); // boss
                field.spawnMob(8880343, 352, 0, false, hp); // Bottom
                field.spawnMob(8880351, 352, 0, false); // dummy1ID
                field.spawnMob(8880355, 252, 0, false); // dummy2ID
                field.spawnMob(8880344, 352, -2020, false, hp); /// Top
                field.spawnMob(8880352, 352, -2020, false); // dummy1ID
                field.spawnMob(8880356, 252, -2020, false); // dummy2ID
            } else if (isHard) {
                long hp = 42000000000000L;
                field.spawnMob(8880300, 352, -2020, false, hp); // boss
                field.spawnMob(8880303, 352, 0, false, hp); // Bottom
                field.spawnMob(8880321, 352, 0, false); // dummy1ID
                field.spawnMob(8880325, 252, 0, false); // dummy2ID
                field.spawnMob(8880304, 352, -2020, false, hp); /// Top
                field.spawnMob(8880322, 352, -2020, false); // dummy1ID
                field.spawnMob(8880326, 252, -2020, false); // dummy2ID
            }
        } else if (stage == 2) {
            for (Char pmChr : targets) {
                if (pmChr.getField().getId() != 450008250 && pmChr.getField().getId() != 450008850) {
                    continue;
                }
                pmChr.write(WillPacket.setMoonGauge(100, 50));
                pmChr.write(WillPacket.addMoonGauge(pmChr.getMoonGauge()));
            }
            if (isNormal) {
                long hp = 6300000000000L;
                field.spawnMob(8880341, 0, 215, false, hp); // boss
                field.spawnMob(8880353, 352, 215, false); // dummy1ID
                field.spawnMob(8880357, 252, 215, false); // dummy2ID
            } else if (isHard) {
                long hp = 31500000000000L;
                field.spawnMob(8880301, 0, 215, false, hp); // boss
                field.spawnMob(8880323, 352, 215, false); // dummy1ID
                field.spawnMob(8880327, 252, 215, false); // dummy2ID
            }
        } else if (stage == 3) {
            for (Char pmChr : targets) {
                if (pmChr.getField().getId() != 450008350 && pmChr.getField().getId() != 450008950) {
                    continue;
                }
                pmChr.write(WillPacket.setMoonGauge(100, 25));
                pmChr.write(WillPacket.addMoonGauge(pmChr.getMoonGauge()));
            }
            for (SpiderWeb spiderWeb : field.getSpiderWebs()) {
                field.removeLife(spiderWeb.getObjectId(), false);
            }
            for (int i = 0; i < 35; i++) {
                SpiderWeb spiderWeb = new SpiderWeb(i);
                field.spawnLife(spiderWeb, null);
            }
            if (isNormal) {
                long hp = 10500000000000L;
                field.spawnMob(8880342, -4, 25, false, hp); // boss
                field.spawnMob(8880354, 352, 281, false); // dummy1ID
                field.spawnMob(8880358, 252, 281, false); // dummy2ID
            } else if (isHard) {
                long hp = 52500000000000L;
                field.spawnMob(8880302, -4, 25, false, hp); // boss
                field.spawnMob(8880324, 352, 281, false); // dummy1ID
                field.spawnMob(8880328, 252, 281, false); // dummy2ID
            }
        }
    }
}
