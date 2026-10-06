package net.swordie.ms.world.boss;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.connection.packet.DemianFieldPacket;
import net.swordie.ms.connection.packet.TemporarySkillMan;
import net.swordie.ms.constants.BossConstants;
import net.swordie.ms.handlers.GlobalTimerManager;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.boss.demian.Demian;
import net.swordie.ms.life.mob.boss.demian.sword.DemianFlyingSword;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.field.Instance;

import java.util.concurrent.ScheduledFuture;

public class Damien {

    public static void spawn(Char chr, DamienPhase phase) {
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
                sm.invokeForParty(1000, "spineScreen", false, false, true, 0, "Map/Effect2/DemianIllust/1pahseSp/demian", "animation", "");
                sm.invokeForParty(1000, "playSound", "Sound/SoundEff.img/BossDemian/phase1");
                field.getTimer().addEvent(() -> init(chr), 15000);
            }
            case LAST -> {
                if (field.isBossSpawned()) {
                    return;
                }
                field.setBossSpawned(true);
                sm.invokeForParty(1000, "spineScreen", false, false, true, 0, "Map/Effect2/DemianIllust/2pahseSp/003", "animation", "");
                sm.invokeForParty(1000, "playSound", "Sound/SoundEff.img/BossDemian/phase2");
                field.getTimer().addEvent(() -> init(chr), 15000);
            }
        }
    }

    public static void init(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        Party party = chr.getParty();
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        switch (field.getId()) {
            case 350160200 -> {
                Mob mob = field.spawnMob(BossConstants.DEMIAN_NORMAL_PHASE_1_TEMPLATE_ID, 895, 16, false, BossConstants.DEMIAN_NORMAL_PHASE_1_HP);
                ScheduledFuture<?> sfField = Demian.stigmaIncinerateObjectTimer(field); // start Pillar
                field.setSpawnButterflyTimer(sfField);
                GlobalTimerManager.addFieldTimer(field.getSN(), sfField);
                DemianFlyingSword sword = DemianFlyingSword.createDemianFlyingSword(chr, mob);
                field.spawnLife(sword, null);
                sword.startPath();
                sword.target();
                if (party != null && party.getPartyMembersInSameFieldWithChr(chr).size() >= 2) {
                    for (Char member : party.getPartyMembersInSameFieldWithChr(chr)) {
                        member.write(TemporarySkillMan.setTemporarySkillSet(BossConstants.BRAND_OF_SACRIFICE, 13));
                        member.write(DemianFieldPacket.corruptionChange(false, 0)); // show corruption window
                        if (member.getWillGaugeTimer() != null) {
                            member.getWillGaugeTimer().cancel(false);
                        }
                        ScheduledFuture<?> sf = Demian.increaseStigmaPassiveTimer(member); // start stigma timer on corruption window
                        member.setWillGaugeTimer(sf);
                        GlobalTimerManager.addCharTimer(member.getId(), sf);
                    }
                } else {
                    chr.write(TemporarySkillMan.setTemporarySkillSet(BossConstants.BRAND_OF_SACRIFICE, 13));
                    chr.write(DemianFieldPacket.corruptionChange(false, 0)); // show corruption window
                    if (chr.getWillGaugeTimer() != null) {
                        chr.getWillGaugeTimer().cancel(false);
                    }
                    ScheduledFuture<?> sf = Demian.increaseStigmaPassiveTimer(chr); // start stigma timer on corruption window
                    chr.setWillGaugeTimer(sf);
                    GlobalTimerManager.addCharTimer(chr.getId(), sf);
                }
            }
            case 350160240 -> {
                Instance instance = chr.getInstance();
                long hp = BossConstants.DEMIAN_NORMAL_PHASE_2_HP;
                if (instance != null && instance.hasProperty("crystalReached")) {
                    hp = BossConstants.DEMIAN_NORMAL_PHASE_2_HP + (long) instance.getProperty("crystalReached");
                }
                field.spawnMob(BossConstants.DEMIAN_NORMAL_PHASE_2_TEMPLATE_ID, 1073, 16, false, hp);
                ScheduledFuture<?> sfField = Demian.stigmaIncinerateObjectTimer(field); // start Pillar
                field.setSpawnButterflyTimer(sfField);
                GlobalTimerManager.addFieldTimer(field.getSN(), sfField);
                if (party != null && party.getPartyMembersInSameFieldWithChr(chr).size() >= 2) {
                    for (Char member : party.getPartyMembersInSameFieldWithChr(chr)) {
                        member.write(TemporarySkillMan.setTemporarySkillSet(BossConstants.BRAND_OF_SACRIFICE, 13));
                        member.write(DemianFieldPacket.corruptionChange(false, 0)); // show corruption window
                        if (member.getWillGaugeTimer() != null) {
                            member.getWillGaugeTimer().cancel(false);
                        }
                        ScheduledFuture<?> sf = Demian.increaseStigmaPassiveTimer(member); // start stigma timer on corruption window
                        member.setWillGaugeTimer(sf);
                        GlobalTimerManager.addCharTimer(member.getId(), sf);
                    }
                } else {
                    chr.write(TemporarySkillMan.setTemporarySkillSet(BossConstants.BRAND_OF_SACRIFICE, 13));
                    chr.write(DemianFieldPacket.corruptionChange(false, 0)); // show corruption window
                    if (chr.getWillGaugeTimer() != null) {
                        chr.getWillGaugeTimer().cancel(false);
                    }
                    ScheduledFuture<?> sf = Demian.increaseStigmaPassiveTimer(chr); // start stigma timer on corruption window
                    chr.setWillGaugeTimer(sf);
                    GlobalTimerManager.addCharTimer(chr.getId(), sf);
                }
            }
            case 350160100 -> {
                Mob mob = field.spawnMob(BossConstants.DEMIAN_HARD_PHASE_1_TEMPLATE_ID, 895, 16, false, BossConstants.DEMIAN_HARD_PHASE_1_HP);
                ScheduledFuture<?> sfField = Demian.stigmaIncinerateObjectTimer(field); // start Pillar
                field.setSpawnButterflyTimer(sfField);
                GlobalTimerManager.addFieldTimer(field.getSN(), sfField);
                DemianFlyingSword sword = DemianFlyingSword.createDemianFlyingSword(chr, mob);
                field.spawnLife(sword, null);
                sword.startPath();
                sword.target();
                if (party != null && party.getPartyMembersInSameFieldWithChr(chr).size() >= 2) {
                    for (Char member : party.getPartyMembersInSameFieldWithChr(chr)) {
                        member.write(TemporarySkillMan.setTemporarySkillSet(BossConstants.BRAND_OF_SACRIFICE, 13));
                        member.write(DemianFieldPacket.corruptionChange(false, 0)); // show corruption window
                        if (member.getWillGaugeTimer() != null) {
                            member.getWillGaugeTimer().cancel(false);
                        }
                        ScheduledFuture<?> sf = Demian.increaseStigmaPassiveTimer(member); // start stigma timer on corruption window
                        member.setWillGaugeTimer(sf);
                        GlobalTimerManager.addCharTimer(member.getId(), sf);
                    }
                } else {
                    chr.write(TemporarySkillMan.setTemporarySkillSet(BossConstants.BRAND_OF_SACRIFICE, 13));
                    chr.write(DemianFieldPacket.corruptionChange(false, 0)); // show corruption window
                    if (chr.getWillGaugeTimer() != null) {
                        chr.getWillGaugeTimer().cancel(false);
                    }
                    ScheduledFuture<?> sf = Demian.increaseStigmaPassiveTimer(chr); // start stigma timer on corruption window
                    chr.setWillGaugeTimer(sf);
                    GlobalTimerManager.addCharTimer(chr.getId(), sf);
                }
            }
            case 350160140 -> {
                Instance instance = chr.getInstance();
                long hp = BossConstants.DEMIAN_HARD_PHASE_2_HP;
                if (instance != null && instance.hasProperty("crystalReached")) {
                    hp = BossConstants.DEMIAN_HARD_PHASE_2_HP + (long) instance.getProperty("crystalReached");
                }
                field.spawnMob(BossConstants.DEMIAN_HARD_PHASE_2_TEMPLATE_ID, 1073, 16, false, hp);
                ScheduledFuture<?> sfField = Demian.stigmaIncinerateObjectTimer(field); // start Pillar
                field.setSpawnButterflyTimer(sfField);
                GlobalTimerManager.addFieldTimer(field.getSN(), sfField);
                if (party != null && party.getPartyMembersInSameFieldWithChr(chr).size() >= 2) {
                    for (Char member : party.getPartyMembersInSameFieldWithChr(chr)) {
                        member.write(TemporarySkillMan.setTemporarySkillSet(BossConstants.BRAND_OF_SACRIFICE, 13));
                        member.write(DemianFieldPacket.corruptionChange(false, 0)); // show corruption window
                        if (member.getWillGaugeTimer() != null) {
                            member.getWillGaugeTimer().cancel(false);
                        }
                        ScheduledFuture<?> sf = Demian.increaseStigmaPassiveTimer(member); // start stigma timer on corruption window
                        member.setWillGaugeTimer(sf);
                        GlobalTimerManager.addCharTimer(member.getId(), sf);
                    }
                } else {
                    chr.write(TemporarySkillMan.setTemporarySkillSet(BossConstants.BRAND_OF_SACRIFICE, 13));
                    chr.write(DemianFieldPacket.corruptionChange(false, 0)); // show corruption window
                    if (chr.getWillGaugeTimer() != null) {
                        chr.getWillGaugeTimer().cancel(false);
                    }
                    ScheduledFuture<?> sf = Demian.increaseStigmaPassiveTimer(chr); // start stigma timer on corruption window
                    chr.setWillGaugeTimer(sf);
                    GlobalTimerManager.addCharTimer(chr.getId(), sf);
                }
            }
        }
    }

    public enum DamienPhase {
        FIRST(0),
        LAST(1),
        ;

        private final int val;

        DamienPhase(int val) {
            this.val = val;
        }

        public int getVal() {
            return val;
        }
    }
}
