package net.swordie.ms.world.boss;

import net.swordie.ms.Server;
import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.MonsterPark;
import net.swordie.ms.client.character.SpiritSavior;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.union.UnionArtifact;
import net.swordie.ms.client.jobs.sengoku.Hayato;
import net.swordie.ms.client.social.Guild.Guild;
import net.swordie.ms.client.social.Guild.GuildMember;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.connection.packet.*;
import net.swordie.ms.constants.*;
import net.swordie.ms.enums.*;
import net.swordie.ms.life.Life;
import net.swordie.ms.life.drop.Drop;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.boss.demian.stigma.DemianStigma;
import net.swordie.ms.life.mob.skill.SpiderWeb;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.MobData;
import net.swordie.ms.loaders.StringData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.scripts.ScriptType;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.event.SunnySunday;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.field.Instance;
import net.swordie.ms.world.field.MobGen;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

public class BossHelper {

    // Root Abyss:
    public static final int VON_BON = 8910100;
    public static final int CHAOS_VON_BON = 8910000;
    public static final int VELLUM = 8930100;
    public static final int CHAOS_VELLUM = 8930000;
    public static final int QUEEN_1 = 8920100;
    public static final int QUEEN_2 = 8920101;
    public static final int QUEEN_3 = 8920102;
    public static final int QUEEN_4 = 8920103;
    public static final int QUEEN_CHEST = 8920106;
    public static final int CHAOS_QUEEN_1 = 8920000;
    public static final int CHAOS_QUEEN_2 = 8920001;
    public static final int CHAOS_QUEEN_3 = 8920002;
    public static final int CHAOS_QUEEN_4 = 8920003;
    public static final int CHAOS_QUEEN_CHEST = 8920006;
    public static final int PIERRE_1 = 8900100;
    public static final int PIERRE_2 = 8900101;
    public static final int PIERRE_3 = 8900102;
    public static final int PIERRE_CHEST = 8900103;
    public static final int CHAOS_PIERRE_1 = 8900000;
    public static final int CHAOS_PIERRE_2 = 8900001;
    public static final int CHAOS_PIERRE_3 = 8900002;
    public static final int CHAOS_PIERRE_CHEST = 8900003;

    // Gollux:
    public static final int GOLLUX_FIRST_PHASE_HEAD = 9390600;
    public static final int GOLLUX_SECOND_PHASE_HEAD = 9390601;
    public static final int GOLLUX_THIRD_PHASE_HEAD = 9390602;
    public static final int GOLLUX_LEFT_SIDE_MOB = 9390622;
    public static final int GOLLUX_RIGHT_SIDE_MOB = 9390623;
    public static final int GOLLUX_RIGHT_SHOULDER = 9390610;
    public static final int GOLLUX_LEFT_SHOULDER = 9390611;
    public static final int GOLLUX_ABDOMEN = 9390612;

    // Ranmaru:
    public static final int RANMARU_NORMAL = 9421581;
    public static final int RANMARU_HARD = 9421583;

    // Chu Chu PQ
    public static final int[][] xy = {
            {-224, -380}, {-58, -380}, {124, -380}, {300, -380}, {530, -380}, {2320, -380}, {2510, -380},
            {2730, -380}, {2860, -380}, {3050, -380}, {-1287, -380}, {-1042, -380}, {-939, -380}, {-796, -380},
            {-583, -380}, {3363, -380}, {3511, -380}, {3748, -380}, {3964, -380}, {4177, -380}, {-1530, -890},
            {-1270, -890}, {-980, -890}, {-870, -890}, {-700, -890}, {3536, -890}, {3711, -890}, {3942, -890},
            {4189, -890}, {4365, -890}, {1120, -800}, {1400, -800}, {1730, -800}, {1413, -970}, {1413, -1100},
            {1113, -1650}, {1422, -1650}, {1720, -1650}, {1370, -1830}, {1646, -1950}};
    public static final int[][] setting = {
            {9833030, 9833031, 9833032, 9833033, 9833034, 9833035, 9833036, 9833037, 9833038, 9833039, 9833040, 9833041, 9833042, 9833043, 9833044, 9833045, 9833046},
            {9833050, 9833051, 9833052, 9833053, 9833054, 9833055, 9833056, 9833057, 9833058, 9833059, 9833060, 9833061, 9833062, 9833063, 9833064, 9833065, 9833066}};

    public static boolean checkInstance(Char chr) {
        if (chr == null) {
            System.out.println("Player %s is null and tried to attempt Boss.");
            return true;
        }
        Instance instance = chr.getInstance();
        if (instance == null) {
            System.out.printf("Player %s tried to attempt Boss in Field ID: %d without an instance.%n", chr.getName(), chr.getFieldID());
            return true;
        }
        return false;
    }

    public static void handleBossCompletion(Char chr, Mob mob) {
        if (chr == null || mob == null) {
            return;
        }
        Field field = mob.getField();
        ScriptManagerImpl sm = chr.getScriptManager();
        Instance instance = chr.getInstance();

        sm.showFieldEffect("Map/Effect.img/killing/clear");
        field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/Effect.img/killing/clear")));
        field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));

        sm.stopEvents();

        if (instance != null) {
            instance.stopEvents();
            instance.setTimeout(300, true);
        }
    }

    public static void handleMobKilled(Mob mob, Char chr) {
        if (chr == null) return;

        ScriptManagerImpl sm = chr.getScriptManager();
        Party party = chr.getParty();
        Field field = mob.getField();
        int mobID = mob.getTemplateId();
        Instance instance = chr.getInstance();
        // Zakum (Easy: 8800022, Normal: 8800002, Chaos: 8800102)
        if (mobID == 8800002 || mobID == 8800022 || mobID == 8800102) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Arkarium (Easy: 8860005, Normal: 8860000)
        if (mobID == 8860005 || mobID == 8860000) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Pink Bean (Normal: 8820001, Chaos P1: 8820101, Chaos Body: 8820212)
        if (mobID == 8820001 || mobID == 8820101 || mobID == 8820212) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Von Leon (Easy: 8840007, Normal: 8840000, Hard: 8840014)
        if (mobID == 8840007 || mobID == 8840000 || mobID == 8840014) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Cygnus (Easy: 8850111, Normal: 8850011)
        if (mobID == 8850111 || mobID == 8850011) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Hilla (Normal: 8870000, Hard: 8870100)
        if (mobID == 8870000 || mobID == 8870100) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Magnus (Easy: 8880010, Normal: 8880002, Hard: 8880000)
        if (mobID == 8880010 || mobID == 8880002 || mobID == 8880000) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Ranmaru (Normal: 9421581, Hard: 9421589, 9421583)
        if (mobID == 9421581 || mobID == 9421589 || mobID == 9421583) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Papulatus Phase 2 (Easy: 8500002, Normal: 8500012, Chaos: 8500022)
        if (mobID == 8500002 || mobID == 8500012 || mobID == 8500022) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Root Abyss: Von Bon & Vellum
        if (mobID == VON_BON || mobID == CHAOS_VON_BON || mobID == VELLUM || mobID == CHAOS_VELLUM) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Root Abyss: Pierre Chests & Queen Chests
        if (mobID == PIERRE_CHEST || mobID == CHAOS_PIERRE_CHEST || mobID == QUEEN_CHEST || mobID == CHAOS_QUEEN_CHEST) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // OMNI-CLN (8880200)
        if (mobID == 8880200) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Princess No (9450022)
        if (mobID == 9450022) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            handleBossCompletion(chr, mob);
        }
        // Horntail (Easy: 8810214, Normal: 8810018, Chaos: 8810122)
        if (mobID == 8810214 || mobID == 8810018 || mobID == 8810122) {
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId()) {
                    m.removeWithAnimation();
                }
            }
            sm.showFieldEffect("Map/Effect.img/killing/clear");
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
            field.broadcast(UserLocal.chatMsg(ChatType.SystemNotice, "[Horntail Defeated] Congratulations! The cave will collapse in 5 minutes. Talk to the Root Crystal on the left or wait for the timer to exit."));
            sm.stopEvents();
            if (instance != null) {
                instance.setTimeout(300, true);
            }
            if (field.getLifeByTemplateId(2083002) == null) {
                field.spawnNpc(2083002, -252, 215);
            }
        }
        // Lucid
        if (mobID == 8880142 || mobID == 8880140 || mobID == 8880141) { // Lucid Phase 1 -> Phase 2
            if (instance != null) {
                if (field.getSpawnButterflyTimer() != null) {
                    field.getSpawnButterflyTimer().cancel(false);
                }
                if (field.getDestroyButterflyTimer() != null) {
                    field.getDestroyButterflyTimer().cancel(false);
                }
                field.broadcast(LucidPacket.butterflyAction(ButterFlyType.Erase, 0, null, 0, 0));
                for (Mob m : field.getMobs()) {
                    if (m.getObjectId() != mob.getObjectId()) {
                        m.removeWithAnimation();
                    }
                }
                int nextMap = 450004250;
                chr.getTimer().addEvent(() -> {
                    warpPartyOrSolo(chr, party, instance, nextMap);
                    Lucid.spawn(chr, Lucid.LucidPhase.SECOND);
                }, 2000);
            }
        } else if (mobID == 8880155 || mobID == 8880176 || (mobID == 8880150 && chr.getLucidMode() != 2)) { // Easy / Normal Lucid Phase 2 -> Reward Room
            if (instance != null) {
                if (field.getSpawnButterflyTimer() != null) {
                    field.getSpawnButterflyTimer().cancel(false);
                }
                if (field.getDestroyButterflyTimer() != null) {
                    field.getDestroyButterflyTimer().cancel(false);
                }
                field.broadcast(LucidPacket.butterflyAction(ButterFlyType.Erase, 0, null, 0, 0));
                for (Mob m : field.getMobs()) {
                    if (m.getObjectId() != mob.getObjectId()) {
                        m.removeWithAnimation();
                    }
                }
                instance.setTimeout(300, true);
                int nextMap = 450004300;
                chr.getTimer().addEvent(() -> {
                    warpPartyOrSolo(chr, party, instance, nextMap);
                    Lucid.spawn(chr, Lucid.LucidPhase.REWARD);
                }, 2000);
            }
            chr.createQuestWithQRValue(34360, "boss=1");
        } else if (mobID == 8880151 || (mobID == 8880150 && chr.getLucidMode() == 2)) { // Hard Lucid Phase 2 -> Phase 3
            if (instance != null) {
                if (field.getSpawnButterflyTimer() != null) {
                    field.getSpawnButterflyTimer().cancel(false);
                }
                if (field.getDestroyButterflyTimer() != null) {
                    field.getDestroyButterflyTimer().cancel(false);
                }
                field.broadcast(LucidPacket.butterflyAction(ButterFlyType.Erase, 0, null, 0, 0));
                for (Mob m : field.getMobs()) {
                    if (m.getObjectId() != mob.getObjectId()) {
                        m.removeWithAnimation();
                    }
                }
                instance.setTimeout(45, true);
                field.spawnMob(8880153, 600, -490, false, 13_200_000_000_000L);
                field.broadcast(LucidPacket.setLastPhaseTypeForHardMode(0));
            }
        } else if (mobID == 8880153) { // Hard Lucid Phase 3 -> Reward Room
            if (instance != null) {
                for (Mob m : field.getMobs()) {
                    if (m.getObjectId() != mob.getObjectId()) {
                        m.removeWithAnimation();
                    }
                }
                instance.setTimeout(300, true);
                int nextMap = 450004300;
                chr.getTimer().addEvent(() -> {
                    warpPartyOrSolo(chr, party, instance, nextMap);
                    Lucid.spawn(chr, Lucid.LucidPhase.REWARD);
                }, 2000);
            }
            chr.createQuestWithQRValue(34360, "boss=1");
        } else if (mobID == 8880190 || mobID == 8880196 || mobID == 8880191) {
            if (instance != null) {
                if (field.getSpawnButterflyTimer() != null) {
                    field.getSpawnButterflyTimer().cancel(false);
                }
                field.broadcast(LucidPacket.butterflyAction(ButterFlyType.Erase, 0, null, 0, 0));
                if (mobID == 8880191) {
                    chr.createQuestWithQRValue(34360, "boss=1");
                    sm.warpInstanceOut(chr, 450004000);
                } else {
                    chr.warp(450004850);
                }
            }
        }
        // Damien
        if (mobID == BossConstants.DEMIAN_NORMAL_PHASE_1_TEMPLATE_ID || mobID == BossConstants.DEMIAN_HARD_PHASE_1_TEMPLATE_ID) {
            DemianStigma.startNextPhase(chr, false);
        } else if (mobID == BossConstants.DEMIAN_NORMAL_PHASE_2_TEMPLATE_ID || mobID == BossConstants.DEMIAN_HARD_PHASE_2_TEMPLATE_ID) {
            field.removeMobs();
            sm.showFieldEffect("Map/Effect.img/killing/clear");
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
            if (instance != null) {
                instance.setTimeout(300, true);
            }
        }
        // Lotus (Normal / Hard)
        if (mobID == 8950000 || mobID == 8950100) {
            int fieldID = field.getId();
            if (fieldID == 350060700 || fieldID == 350060400) {
                for (Mob m : field.getMobs()) {
                    if (m.getObjectId() != mob.getObjectId()) {
                        m.removeWithAnimation();
                    }
                }
                int nextFieldID = fieldID + 100;
                Lotus.LotusMode nextMode = (fieldID == 350060400) ? Lotus.LotusMode.HARD : Lotus.LotusMode.NORMAL;
                chr.getTimer().addEvent(() -> {
                    warpPartyOrSolo(chr, party, instance, nextFieldID);
                    Lotus.spawn(chr, Lotus.LotusPhase.SECOND, nextMode);
                }, 2500);
            }
        } else if (mobID == 8950001 || mobID == 8950101) {
            int fieldID = field.getId();
            if (fieldID == 350060800 || fieldID == 350060500) {
                int nextFieldID = fieldID + 100;
                Lotus.LotusMode nextMode = (fieldID == 350060500) ? Lotus.LotusMode.HARD : Lotus.LotusMode.NORMAL;
                chr.getTimer().addEvent(() -> {
                    warpPartyOrSolo(chr, party, instance, nextFieldID);
                    Lotus.spawn(chr, Lotus.LotusPhase.LAST, nextMode);
                }, 2500);
            }
        } else if (mobID == 8950002 || mobID == 8950102) {
            int fieldID = field.getId();
            if (fieldID == 350060900 || fieldID == 350060600) {
                sm.stopEvents();
                field.removeMobs();
                sm.showFieldEffect("Map/Effect.img/killing/clear");
                field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/Effect2.img/blackHeavenBossDie3")));
                if (instance != null) {
                    instance.setTimeout(300, true);
                }
            }
        }
        // Remastered Extreme Lotus (P1 -> P2 -> P3 -> Reward Room)
        if (mobID == 8881200) {
            transitionToBossMap(chr, field, 350068300, 8881201, 0, 398, false);
        } else if (mobID == 8881201) {
            transitionToBossMap(chr, field, 350068500, 8881202, 0, 396, false);
        } else if (mobID == 8881202) {
            transitionToBossMap(chr, field, 350068600, 8881203, 0, 498, true);
        }
        // Black Mage (Hard & Extreme)
        if (mobID == 8880500 || mobID == 8880501 || mobID == 8880530 || mobID == 8880531) { // Phase 1
            boolean otherAlive = false;
            boolean isExtreme = (mobID == 8880530 || mobID == 8880531);
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId() && (m.getTemplateId() == 8880500 || m.getTemplateId() == 8880501 || m.getTemplateId() == 8880530 || m.getTemplateId() == 8880531)) {
                    otherAlive = true;
                    break;
                }
            }
            if (!otherAlive) {
                int nextMap = isExtreme ? 450013930 : 450013300;
                int nextMob = isExtreme ? 8880532 : 8880502;
                transitionToBossMap(chr, field, nextMap, nextMob, 0, 88, false);
            }
        } else if (mobID == 8880502 || mobID == 8880532) { // Black Mage Phase 2
            boolean isExtreme = (mobID == 8880532);
            int nextMap = isExtreme ? 450013950 : 450013500;
            int nextMob = isExtreme ? 8880533 : 8880503;
            transitionToBossMap(chr, field, nextMap, nextMob, 0, 85, false);
        } else if (mobID == 8880503 || mobID == 8880533) { // Black Mage Phase 3
            boolean isExtreme = (mobID == 8880533);
            int nextMap = isExtreme ? 450013970 : 450013700;
            int nextMob = isExtreme ? 8880534 : 8880504;
            transitionToBossMap(chr, field, nextMap, nextMob, 0, 218, false);
        } else if (mobID == 8880504) { // Hard Black Mage Phase 4 -> Genesis Crux Reward Room
            transitionToBossMap(chr, field, 450013750, 8880518, 0, 218, true);
        } else if (mobID == 8880534) { // Extreme Black Mage Phase 4 -> Genesis Crux Reward Room
            transitionToBossMap(chr, field, 450013980, 8880548, 0, 218, true);
        }
        // Akechi Mitsuhide
        if (mobID == 9601622) { // Phase 1
            field.removeMobs();
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/Effect2.img/blackHeavenBossDie3")));
            chr.getTimer().addEvent(() -> {
                field.spawnMob(9601623, 0, 264, false, 400000000000L);
            }, 1500);
        } else if (mobID == 9601623) { // Phase 2
            field.removeMobs();
            sm.showFieldEffect("Map/Effect.img/killing/clear");
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
            if (instance != null) {
                instance.setTimeout(300, true);
            }
        }
        // Will (Easy, Normal & Hard)
        if (mobID == 8880360 || mobID == 8880363 || mobID == 8880364
                || mobID == 8880340 || mobID == 8880343 || mobID == 8880344
                || mobID == 8880300 || mobID == 8880303 || mobID == 8880304) { // Will Phase 1
            if (field.isBossSpawned()) {
                field.setBossSpawned(false);
                field.removeMobs();
                field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/Effect2.img/blackHeavenBossDie3")));
                int nextFieldID = (field.getId() == 450007850) ? 450007950 : ((field.getId() == 450008750) ? 450008850 : 450008250);
                chr.getTimer().addEvent(() -> {
                    warpPartyOrSolo(chr, party, instance, nextFieldID);
                    Will.spawn(2, chr);
                }, 2000);
            }
        } else if (mobID == 8880361 || mobID == 8880341 || mobID == 8880301) { // Will Phase 2
            field.removeMobs();
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/Effect2.img/blackHeavenBossDie3")));
            int nextFieldID = (field.getId() == 450007950) ? 450008050 : ((field.getId() == 450008850) ? 450008950 : 450008350);
            chr.getTimer().addEvent(() -> {
                warpPartyOrSolo(chr, party, instance, nextFieldID);
                Will.spawn(3, chr);
            }, 2000);
        } else if (mobID == 8880362 || mobID == 8880342 || mobID == 8880302) { // Will Phase 3
            field.removeMobs();
            for (SpiderWeb spiderWeb : field.getSpiderWebs()) {
                field.removeLife(spiderWeb);
            }
            java.util.Collection<Char> members = (party != null) ? party.getOnlineChars() : java.util.List.of(chr);
            for (Char pm : members) {
                if (pm.getWillGaugeTimer() != null) {
                    pm.getWillGaugeTimer().cancel(false);
                    pm.setWillGaugeTimer(null);
                }
            }
            sm.showFieldEffect("Map/Effect.img/killing/clear");
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
            if (instance != null) {
                instance.setTimeout(300, true);
            }
        }
        // Gloom (Dusk) Normal / Chaos -> Reward Room
        if (mobID == 8644650) {
            transitionToBossMap(chr, field, 450009430, 8950118, -2686, -488, true);
        } else if (mobID == 8644655) {
            transitionToBossMap(chr, field, 450009480, 8950119, -2686, -488, true);
        }
        // Darknell (Dunkel) Normal / Hard -> Reward Room
        if (mobID == 8645009) {
            transitionToBossMap(chr, field, 450012250, 8950116, 120, 29, true);
        } else if (mobID == 8645066) {
            transitionToBossMap(chr, field, 450012650, 8950117, 120, 29, true);
        }
        // Verus Hilla (Jin Hilla) Normal / Hard -> Reward Room
        if (mobID == 8880405 || mobID == 8880450) {
            transitionToBossMap(chr, field, 450010950, 8950120, 600, 206, true);
        } else if (mobID == 8880410) {
            transitionToBossMap(chr, field, 450010550, 8950121, 600, 206, true);
        }
        // Chosen Seren (Normal / Hard / Extreme: P1 -> P2 -> Reward Room)
        if (mobID == 8880630) { // Normal P1 -> P2
            transitionToBossMap(chr, field, 410002160, 8880633, 0, 305, false);
        } else if (mobID == 8880633 || mobID == 8880632) { // Normal P2 -> Reward Room
            transitionToBossMap(chr, field, 410002180, 8880644, 0, 275, true);
        } else if (mobID == 8880600) { // Hard P1 -> P2
            transitionToBossMap(chr, field, 410002060, 8880603, 0, 305, false);
        } else if (mobID == 8880603 || mobID == 8880602) { // Hard P2 -> Reward Room
            transitionToBossMap(chr, field, 410002080, 8880614, 0, 275, true);
        } else if (mobID == 8880650) { // Extreme P1 -> P2
            transitionToBossMap(chr, field, 410002260, 8880653, 0, 305, false);
        } else if (mobID == 8880653 || mobID == 8880652) { // Extreme P2 -> Reward Room
            transitionToBossMap(chr, field, 410002280, 8880664, 0, 275, true);
        }
        // Guardian Angel Slime (Normal / Chaos -> Reward Room)
        if (mobID == 8880711) { // Normal Slime
            transitionToBossMap(chr, field, 160050000, 8880726, 150, 316, true);
        } else if (mobID == 8880700) { // Chaos Slime
            transitionToBossMap(chr, field, 160050000, 8880725, 150, 316, true);
        }
        // Kalos the Guardian (Easy / Normal / Chaos / Extreme: P1 -> P2 -> Reward Room)
        if (mobID == 8881010) { // Easy P1 -> P2
            transitionToBossMap(chr, field, 410006260, 8881013, 500, 399, false);
        } else if (mobID == 8881013 || mobID == 8881012) { // Easy P2 -> Reward Room
            transitionToBossMap(chr, field, 410006280, 8881018, 150, 399, true);
        } else if (mobID == 8880800) { // Normal P1 -> P2
            transitionToBossMap(chr, field, 410006060, 8880803, 500, 399, false);
        } else if (mobID == 8880803 || mobID == 8880802) { // Normal P2 -> Reward Room
            transitionToBossMap(chr, field, 410006080, 8880808, 150, 399, true);
        } else if (mobID == 8881030) { // Chaos P1 -> P2
            transitionToBossMap(chr, field, 410006360, 8881033, 500, 399, false);
        } else if (mobID == 8881033 || mobID == 8881032) { // Chaos P2 -> Reward Room
            transitionToBossMap(chr, field, 410006380, 8881038, 150, 399, true);
        } else if (mobID == 8881050) { // Extreme P1 -> P2
            transitionToBossMap(chr, field, 410006460, 8881053, 500, 399, false);
        } else if (mobID == 8881053 || mobID == 8881052) { // Extreme P2 -> Reward Room
            transitionToBossMap(chr, field, 410006480, 8881058, 150, 399, true);
        }
        // Kaling (Easy / Normal / Hard / Extreme: P1 Three Perils -> P2 Kaling -> P3 Fierce Kaling -> Reward Room)
        if (mobID == 8880900 || mobID == 8880901 || mobID == 8880902
                || mobID == 8880830 || mobID == 8880831 || mobID == 8880832
                || mobID == 8880930 || mobID == 8880931 || mobID == 8880932
                || mobID == 8880960 || mobID == 8880961 || mobID == 8880962) {
            boolean perilRemaining = false;
            for (Mob m : field.getMobs()) {
                if (m.getObjectId() != mob.getObjectId() && m.isBoss() && m.getHp() > 0) {
                    perilRemaining = true;
                    break;
                }
            }
            if (!perilRemaining) {
                if (mobID >= 8880900 && mobID <= 8880902) { // Easy
                    transitionToBossMap(chr, field, 410008160, 8880907, 568, 106, false);
                } else if (mobID >= 8880830 && mobID <= 8880832) { // Normal
                    transitionToBossMap(chr, field, 410007260, 8880837, 568, 106, false);
                } else if (mobID >= 8880930 && mobID <= 8880932) { // Hard
                    transitionToBossMap(chr, field, 410008460, 8880937, 568, 106, false);
                } else { // Extreme
                    transitionToBossMap(chr, field, 410008760, 8880967, 568, 106, false);
                }
            }
        } else if (mobID == 8880907) { // Easy P2 -> P3
            transitionToBossMap(chr, field, 410008200, 8880912, 0, 398, false);
        } else if (mobID == 8880837) { // Normal P2 -> P3
            transitionToBossMap(chr, field, 410007300, 8880842, 0, 398, false);
        } else if (mobID == 8880937) { // Hard P2 -> P3
            transitionToBossMap(chr, field, 410008500, 8880942, 0, 398, false);
        } else if (mobID == 8880967) { // Extreme P2 -> P3
            transitionToBossMap(chr, field, 410008800, 8880972, 0, 398, false);
        } else if (mobID == 8880912) { // Easy P3 -> Reward Room
            transitionToBossMap(chr, field, 410008220, 8880915, 500, 105, true);
        } else if (mobID == 8880842) { // Normal P3 -> Reward Room
            transitionToBossMap(chr, field, 410007320, 8880845, 500, 105, true);
        } else if (mobID == 8880942) { // Hard P3 -> Reward Room
            transitionToBossMap(chr, field, 410008520, 8880945, 500, 105, true);
        } else if (mobID == 8880972) { // Extreme P3 -> Reward Room
            transitionToBossMap(chr, field, 410008820, 8880975, 500, 105, true);
        }
        // Limbo (Normal / Hard: P1 -> P2 -> P3 -> Reward Room)
        if (mobID == 8881304) { // Normal P1 -> P2
            transitionToBossMap(chr, field, 410009300, 8881318, 0, 1, false);
        } else if (mobID == 8881318) { // Normal P2 -> P3
            transitionToBossMap(chr, field, 410009700, 8881320, 0, -18, false);
        } else if (mobID == 8881320) { // Normal P3 -> Reward Room
            transitionToBossMap(chr, field, 410009800, 8881334, 0, 754, true);
        } else if (mobID == 8881354) { // Hard P1 -> P2
            transitionToBossMap(chr, field, 410011300, 8881368, 0, 1, false);
        } else if (mobID == 8881368) { // Hard P2 -> P3
            transitionToBossMap(chr, field, 410011700, 8881370, 0, -18, false);
        } else if (mobID == 8881370) { // Hard P3 -> Reward Room
            transitionToBossMap(chr, field, 410011800, 8881384, 0, 754, true);
        }
        // Baldrix (Normal / Hard: P1 -> P2 -> P3 -> Reward Room)
        if (mobID == 8881600) { // Normal P1 -> P2
            transitionToBossMap(chr, field, 410014600, 8881614, 0, -16, false);
        } else if (mobID == 8881614) { // Normal P2 -> P3
            transitionToBossMap(chr, field, 410014900, 8881621, 0, -9, false);
        } else if (mobID == 8881621) { // Normal P3 -> Reward Room
            transitionToBossMap(chr, field, 410015000, 8881624, 0, 498, true);
        } else if (mobID == 8881650) { // Hard P1 -> P2
            transitionToBossMap(chr, field, 410015700, 8881664, 0, -16, false);
        } else if (mobID == 8881664) { // Hard P2 -> P3
            transitionToBossMap(chr, field, 410016000, 8881671, 0, -9, false);
        } else if (mobID == 8881671) { // Hard P3 -> Reward Room
            transitionToBossMap(chr, field, 410016100, 8881674, 0, 498, true);
        }
        // First Adversary (Easy / Normal / Hard / Extreme: P1 -> P2 -> P3 -> Reward Room)
        if (mobID == 8881710) { // Easy P1 -> P2
            transitionToBossMap(chr, field, 410020300, 8881711, 0, 244, false);
        } else if (mobID == 8881711) { // Easy P2 -> P3
            transitionToBossMap(chr, field, 410020500, 8881712, 0, 108, false);
        } else if (mobID == 8881712) { // Easy P3 -> Reward Room
            transitionToBossMap(chr, field, 410020600, 8881715, 0, 303, true);
        } else if (mobID == 8881740) { // Normal P1 -> P2
            transitionToBossMap(chr, field, 410021300, 8881741, 0, 244, false);
        } else if (mobID == 8881741) { // Normal P2 -> P3
            transitionToBossMap(chr, field, 410021500, 8881742, 0, 108, false);
        } else if (mobID == 8881742) { // Normal P3 -> Reward Room
            transitionToBossMap(chr, field, 410021600, 8881745, 0, 303, true);
        } else if (mobID == 8881770) { // Hard P1 -> P2
            transitionToBossMap(chr, field, 410022300, 8881771, 0, 244, false);
        } else if (mobID == 8881771) { // Hard P2 -> P3
            transitionToBossMap(chr, field, 410022500, 8881772, 0, 108, false);
        } else if (mobID == 8881772) { // Hard P3 -> Reward Room
            transitionToBossMap(chr, field, 410022600, 8881775, 0, 303, true);
        } else if (mobID == 8881800) { // Extreme P1 -> P2
            transitionToBossMap(chr, field, 410023300, 8881801, 0, 244, false);
        } else if (mobID == 8881801) { // Extreme P2 -> P3
            transitionToBossMap(chr, field, 410023500, 8881802, 0, 108, false);
        } else if (mobID == 8881802) { // Extreme P3 -> Reward Room
            transitionToBossMap(chr, field, 410023600, 8881805, 0, 303, true);
        }
        // Reward Chests / Boxes
        if (mobID == 8880177 || mobID == 8880167 || mobID == 8880156
                || (mobID >= 8950116 && mobID <= 8950121)
                || mobID == 8880518 || mobID == 8880548
                || mobID == 8880644 || mobID == 8880614 || mobID == 8880664
                || mobID == 8880726 || mobID == 8880725
                || mobID == 8881018 || mobID == 8880808 || mobID == 8881038 || mobID == 8881058
                || mobID == 8880915 || mobID == 8880845 || mobID == 8880945 || mobID == 8880975
                || mobID == 8881203
                || mobID == 8881334 || mobID == 8881384
                || mobID == 8881624 || mobID == 8881674
                || mobID == 8881715 || mobID == 8881745 || mobID == 8881775 || mobID == 8881805) {
            sm.showFieldEffect("Map/Effect.img/killing/clear");
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
        }
        // Root Abyss
        if (mobID == BossHelper.PIERRE_1 || mobID == BossHelper.PIERRE_2 || mobID == BossHelper.PIERRE_3) {
            BossHelper.initRootAbyss(chr, PIERRE_CHEST, 0, 497, 551);
        } else if (mobID == BossHelper.CHAOS_PIERRE_1 || mobID == BossHelper.CHAOS_PIERRE_2 || mobID == BossHelper.CHAOS_PIERRE_3) {
            BossHelper.initRootAbyss(chr, CHAOS_PIERRE_CHEST, 0, 497, 551);
        } else if (mobID == BossHelper.QUEEN_1 || mobID == BossHelper.QUEEN_2 || mobID == BossHelper.QUEEN_3 || mobID == BossHelper.QUEEN_4) {
            BossHelper.initRootAbyss(chr, QUEEN_CHEST, 0, 40, 135);
        } else if (mobID == BossHelper.CHAOS_QUEEN_1 || mobID == BossHelper.CHAOS_QUEEN_2 || mobID == BossHelper.CHAOS_QUEEN_3 || mobID == BossHelper.CHAOS_QUEEN_4) {
            BossHelper.initRootAbyss(chr, CHAOS_QUEEN_CHEST, 0, 40, 135);
        }
        // Gollux
        if (mobID == BossHelper.GOLLUX_FIRST_PHASE_HEAD) {
            field.broadcast(FieldPacket.syncDynamicFootHold("phase2-1", true, new Position(0, 0)));
            field.broadcast(FieldPacket.syncDynamicFootHold("phase2-2", true, new Position(0, 0)));
            BossHelper.spawnGollux(chr, 1);
        } else if (mobID == BossHelper.GOLLUX_SECOND_PHASE_HEAD) {
            if (instance != null) {
                field.broadcast(FieldPacket.syncDynamicFootHold("phase3", true, new Position(0, 0)));
                BossHelper.spawnGollux(chr, 2);
                sm.createTimerGauge(90);
                instance.setTimeout(90, true);
            }
        } else if (mobID == BossHelper.GOLLUX_THIRD_PHASE_HEAD) {
            sm.showFieldEffect("Map/Effect.img/killing/clear");
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/Effect.img/killing/clear")));
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
            sm.stopEvents();
            if (instance != null) {
                instance.stopEvents();
                instance.setTimeout(300, true);
            }
            warpPartyOrSolo(chr, party, instance, BossConstants.GOLLUX_REWARD_MAP);
        } else if (mobID == BossHelper.GOLLUX_LEFT_SHOULDER) {
            BossHelper.addClearedField(field, chr);
            BossHelper.openPortal(field, "clear", 7);
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
        } else if (field.getOnUserEnter().equals("GiantBoss_field")) {
            int mobsize = field.getMobs().size();
            if (mobsize > 3) {
                sm.chatScript("There are " + (mobsize - 3) + " doses of evil energy remaining in this area.");
            } else {
                BossHelper.addClearedField(field, chr);
                field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
                if (chr.getField().getId() == 863010310 || chr.getField().getId() == 863010410) {
                    BossHelper.openPortal(field, "open", 1);
                    BossHelper.openPortal(field, "clear", 1);
                }
            }
        } else if (mobID == BossHelper.GOLLUX_ABDOMEN) {
            BossHelper.addClearedField(field, chr);
            BossHelper.openPortal(field, "clear2", 12);
            BossHelper.openPortal(field, "clear1", 12);
            field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
        } else if (field.getOnUserEnter().equals("GiantBoss_RArm")) {
            int mobsize = field.getMobs().size();
            if (mobsize < 1) {
                BossHelper.addClearedField(field, chr);
                BossHelper.openPortal(field, "clear", 7);
                field.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
            }
        }
        // Tiger Chief
        if (mobID == 9300811 &&  chr.hasQuest(38022)) {
            chr.setQRValue(38022, "clear", false);
        }
        // Monster Park
        if (MonsterPark.isMonsterParkMob(mobID)) {
            long newExp = Long.parseLong(chr.getQRValue(GameConstants.MONSTER_PARK_EXP_QUEST)) + sm.getMPExpByMobId(mobID);
            var sunday = SunnySunday.SunnySundayLogic.get();
            newExp += newExp * (sunday != null ? sunday.mpIncEXP : 0) / 100;
            chr.setQRValue(GameConstants.MONSTER_PARK_EXP_QUEST, String.valueOf(newExp));
            field.broadcast(WvsContext.weatherEffectNotice(WeatherEffNoticeType.MonsterPark_ExpMsg, "EXP reward " + sm.formatNumber(chr.getQRValue(GameConstants.MONSTER_PARK_EXP_QUEST)) + " earned!", 7000));
            if (!sm.hasMobsInField(chr.getFieldID())) {
                field.broadcast(UserPacket.effect(Effect.effectFromWZ(WzConstants.EFFECT_CLEAR)));
            }
        }
        // Mulung Dojo
        if (GameConstants.isMuLungDojoMob(mobID)) {
            if (instance != null) {
                instance.addProperty("dojoclear" + ((chr.getField().getId() % 10000) / 100), 1);
                sm.showFieldEffectToField(WzConstants.EFFECT_CLEAR);
                field.broadcast(UserPacket.effect(Effect.effectFromWZ(WzConstants.EFFECT_CLEAR)));
            }
        }
        // Red Leaf High Event
        if (EventConstants.RED_LEAF_HIGH_EVENT) {
            if (instance != null && GameConstants.isRedLeafHigh(mobID)) {
                if (mobID == 9410248) {
                    sm.showFieldEffect("Map/Effect.img/MapleHighSchool/clearF");
                    sm.spawnNpc(9330279, 21, 257);
                } else if (mobID == 9410218 || mobID == 9410219) {
                    sm.showFieldEffect("Map/Effect.img/MapleHighSchool/clear");
                    sm.spawnNpc(9330279, 34, 247);
                } else {
                    sm.showFieldEffect("Map/Effect.img/MapleHighSchool/clear");
                    sm.spawnNpc(9330279, 34, 247);
                }
            }
            if (mobID == 8642002) {
                if (chr.hasQuest(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD)) {
                    int currentMob = Integer.parseInt(chr.getQRValueByKey(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD, String.valueOf(mobID)));
                    if (currentMob < 200) {
                        currentMob++;
                        chr.setQRValueByKey(EventConstants.RED_LEAF_HIGH_MOB_KILLS_RECORD, String.valueOf(mobID), String.valueOf(currentMob));
                        chr.write(WvsContext.progressMessageFont(1, 14, 4, 0, String.format("%s (%d/200)", StringData.getMobStringById(mobID), currentMob)));
                    }
                }
            }
        }
        // [Elodin] Spring Cleaning
        if (chr.hasQuest(37164) && field.getId() == 101082200) { // 2nd Floor Attic 2
            // Eliminate Dust Bundles with the Makeshift Broomstick
            String count = chr.getQRValueByKey(37164, "count");
            if (count == null) {
                chr.createQuestWithQRValue(37164, "count=1");
                chr.chatScriptMessage("Monsters defeated (1/50)");
            } else if (!count.equalsIgnoreCase("50")) {
                int inc = Integer.parseInt(count) + 1;
                if (inc == 10 || inc == 30 || inc == 50) {
                    chr.consumeItem(4036502, 1);
                }
                chr.setQRValueByKey(37164, "count", String.valueOf(inc));
                chr.chatScriptMessage(String.format("Monsters defeated (%d/50)", inc));
            }
        }
        // Daily Quest Theme Dungeon
        if (instance != null) {
            if (field.getMobs().size() <= 1
                    && (field.getId() == 993162500
                    || field.getId() == 993162600
                    || field.getId() == 993162700
                    || field.getId() == 993162900
                    || field.getId() == 993163000
                    || field.getId() == 993163100)) {
                sm.showFieldEffect("Map/Effect.img/MapleHighSchool/clear");
            }
        }
        // Party Quests
        if (party != null && instance != null) {
            // Xerxes PQ
            if (field.getId() == GameConstants.XERXES_CHRYSE_FRONT_FIELD && field.getMobs().size() <= 1) {
                sm.showEffectToField("Map/Effect.img/killing/clear");
            } else if (mobID == 6160003 && field.getId() == GameConstants.XERXES_CHRYSE_MAP_BOSS) {
                sm.givePQRewards(party);
                for (Char player : party.getOnlineChars()) {
                    int amount = Util.getRandom(1, 15);
                    if (player.canHold(4001844)) {
                        player.addItemToInventory(4001844, amount);
                        player.chatScriptMessage("Congratulations! You have been gifted " + amount + " Chryse Core Fragments by defeated Xerxes!");
                    } else {
                        player.sendRewardToChar(4001844, amount, 0, "Xerxes Chryse PQ Reward.", 1);
                    }
                    player.getScriptManager().setAchieveRatio(100);
                }
                chr.getScriptManager().warpInstanceOut(chr, GameConstants.XERXES_CHRYSE_EXIT);
                party.broadcast(TemporarySkillMan.setTemporarySkillSet(0, 0));
            }
            // Alien Visitor
            if (field.getId() / 1000 == 861000) {
                int stage = (field.getId() % 1000) / 100;
                if (instance.getVisitorStageCount() < 180) {
                    if ((stage == 3 && mobID == 9390110) || (stage == 5 && (mobID == 9390111 || mobID == 9390112))) {
                        instance.setVisitorStageCount(1);
                    } else {
                        instance.setVisitorStageCount(instance.getVisitorStageCount() + 1);
                    }
                    for (Char player : party.getOnlineChars()) {
                        if ((stage == 3 && mobID == 9390110) || (stage == 5 && (mobID == 9390111 || mobID == 9390112))) {
                            player.chatScriptMessage("[Alien Visitor] stage " + stage + " : " + instance.getVisitorStageCount() + "/1");
                        } else {
                            player.chatScriptMessage("[Alien Visitor] stage " + stage + " : " + instance.getVisitorStageCount() + "/180");
                        }
                    }
                }
                if (((stage == 3 || stage == 5) && instance.getVisitorStageCount() == 1) || instance.getVisitorStageCount() == 180) {
                    for (MobGen mg : field.getMobGens()) {
                        field.removeLife(mg);
                    }
                    for (Mob m : field.getMobs()) {
                        if (m.getObjectId() != mob.getObjectId()) {
                            field.removeMob(m.getObjectId());
                        }
                    }
                    int timeConsumed = 5 * 60 - instance.getRemainingTime();
                    if (timeConsumed <= 90) {
                        for (Char pmChr : party.getOnlineChars()) {
                            pmChr.getVisitorStageResult().put(stage, "S");
                        }
                        sm.showEffectToField("Map/Effect.img/Visitor/RankS");
                    } else if (timeConsumed <= 150) {
                        for (Char pmChr : party.getOnlineChars()) {
                            pmChr.getVisitorStageResult().put(stage, "A");
                        }
                        sm.showEffectToField("Map/Effect.img/Visitor/RankA");
                    } else if (timeConsumed <= 210) {
                        for (Char pmChr : party.getOnlineChars()) {
                            pmChr.getVisitorStageResult().put(stage, "B");
                        }
                        sm.showEffectToField("Map/Effect.img/Visitor/RankB");
                    } else if (timeConsumed < 300) {
                        for (Char pmChr : party.getOnlineChars()) {
                            pmChr.getVisitorStageResult().put(stage, "C");
                        }
                        sm.showEffectToField("Map/Effect.img/Visitor/RankC");
                    }
                }
            }
            // Nett Pyramid
            if (field.getId() == GameConstants.NETT_PYRAMID_MAIN_MAP) {
                chr.getDefenseEventMember().plusPoint(2);
            }
            // Dimensional Invasion
            if (field.getId() == GameConstants.DIMENSIONAL_INVASION_MAIN_STAGE) {
                if (mobID >= 2500130 && mobID <= 2500133) {
                    field.decMonsterGauge(5);
                } else if (mobID >= 2500800 && mobID <= 2500803) {
                    field.decMonsterGauge(15);
                } else if (mobID == 9300622) {
                    field.decMonsterGauge(70);
                } else if (mobID >= 2500030 && mobID <= 2500033) {
                    field.decMonsterGauge(1);
                } else if (mobID == 9300621) {
                    field.decMonsterGauge(1);
                } else if (mobID == 9300634) {
                    field.decMonsterGauge(70);
                }
                field.broadcast(MultiStagePacket.setMonsterGauge(100, field.getMonsterGauge()));
            }
            // Dragon Rider
            if (field.getId() == 240080100 || field.getId() == 240080200) {
                int mobsize = field.getMobs().size();
                if (mobsize > 1) {
                    sm.chatScript("There are " + mobsize + " monsters left.");
                } else {
                    int stage = (sm.getFieldID() % 1000) / 100;
                    instance.addProperty("escape" + stage + "clear", sm.getField());
                    sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
                    sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
                    sm.showClearStageExpWindowToParty(sm.getPQExp());
                    sm.setAchieveRatio(stage * 20);
                    sm.chatScript("Please use the portal to move on to the next stage.");
                }
            } else if (mobID == 9300863 && field.getId() == 240080300) {
                int stage = (sm.getFieldID() % 1000) / 100;
                instance.addProperty("escape" + stage + "clear", sm.getField());
                sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
                sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
                sm.showClearStageExpWindowToParty(sm.getPQExp());
                sm.setAchieveRatio(stage * 20);
            } else if (mobID == 9303079 && field.getId() == 240080500) {
                int stage = (sm.getFieldID() % 1000) / 100;
                instance.addProperty("escape" + stage + "clear", sm.getField());
                sm.givePQRewards(party);
                sm.setAchieveRatio(100);
            }
            // Escape
            if (mobID == 9300454) {
                int stage = (sm.getFieldID() % 1000) / 100;
                instance.addProperty("escape" + stage + "clear", sm.getField());
                sm.givePQRewards(party);
                sm.setAchieveRatio(100);
            }
            // Evolution System
            if (mobID == 9306003 && field.getId() == 957013000) {
                spawnMobForEvolLink(field, 4, mob.getPosition());
            } else if (mobID == 9306004 && field.getId() == 957014000) {
                spawnMobForEvolLink(field, 5, mob.getPosition());
            } else if (mobID == 9306003 && field.getId() == 957017000) {
                spawnMobForEvolLink(field, 8, mob.getPosition());
            }
            // Chu Chu PQ
            int[] mobs = new int[]{};
            if (field.getId() == GameConstants.HUNGRY_MUTO_NORMAL_STAGE) {
                mobs = setting[0];
                spawnHungryMutoMobs(field, mob, sm, mobs);
            } else if (field.getId() == GameConstants.HUNGRY_MUTO_HARD_STAGE) {
                mobs = setting[1];
                spawnHungryMutoMobs(field, mob, sm, mobs);
            }
            // Juliet
            if (field.getId() == 926110001) {
                int mobsize = field.getMobs().size();
                if (mobsize > 1) {
                    sm.chatScript("There are " + mobsize + " monsters left.");
                } else {
                    sm.chatScript("Please use the portal to move on to the next stage.");
                }
            } else if (field.getId() == 926110401 && mobID == 9300152) {
                field.spawnNpc(2112006, 45, 150);
                for (Mob m : field.getMobs()) {
                    if (m.getObjectId() != mob.getObjectId()) {
                        field.removeMob(m.getObjectId());
                    }
                }
                sm.givePQRewards(party);
                sm.setAchieveRatio(100);
            }
            // Rome
            if (field.getId() == 926100001) {
                int mobsize = field.getMobs().size();
                if (mobsize > 1) {
                    sm.chatScript("There are " + mobsize + " monsters left.");
                } else {
                    sm.chatScript("Please use the portal to move on to the next stage.");
                }
            } else if (field.getId() == 926100401 && mobID == 9300140) {
                field.spawnNpc(2112005, 45, 150);
                for (Mob m : field.getMobs()) {
                    if (m.getObjectId() != mob.getObjectId()) {
                        field.removeMob(m.getObjectId());
                    }
                }
                sm.givePQRewards(party);
                sm.setAchieveRatio(100);
            }
        }
        // Spirit Savior
        if (field.getId() == SpiritSavior.SPIRIT_SAVIOR_MAP) {
            chr.getSpiritSavior().monsterkilled(mob);
        }
        // Hayato Passive
        if (JobConstants.isHayato(chr.getJob()) && chr.getJobHandler() instanceof Hayato hayato) {
            hayato.incrementSwordEnergy();
        }
        if (chr.getInstance() != null) {
            int bossGuildContribution = GameConstants.getBossGuildContribution(mobID);
            long bossRewardPrice = GameConstants.getBossRewardPrice(GameConstants.getBossRewardID(mobID));
            if (bossRewardPrice != 1) {
                Server.get().broadcastForWorld(UserLocal.chatMsg(ChatType.Expedition, "[Notice] Character " + chr.getName() + " has successfully defeated " + StringData.getMobStringById(mobID) + "!"));
            }
            java.util.Collection<Char> winners = (chr.getParty() != null) ? chr.getParty().getOnlineChars() : java.util.List.of(chr);
            for (Char pmChr : winners) {
                if (pmChr.getGuild() != null && bossGuildContribution != -1) {
                    pmChr.getGuild().addContributionToChar(pmChr, bossGuildContribution);
                }
                // Intense Power Crystal
                if (bossRewardPrice != 1) {
                    pmChr.setLastBossTemplateID(GameConstants.getBossRewardID(mobID));
                    Item item = ItemData.getItemDeepCopy(4001886);
                    item.setBossRewardID(GameConstants.getBossRewardID(mobID));
                    Drop drop = new Drop(item.getItemId(), item);
                    field.drop(drop, pmChr.getPosition(), pmChr.getPosition(), true, 0, pmChr);
                }
            }
        }
        // Boss Reward for Guild Members
        if (chr.getParty() == null || (chr.getParty() != null && chr.getParty().getOnlineChars().size() == 1)) {
            // Solo party
            int type = BossHelper.getGuildRewardGradeByMobID(mobID);
            if (type != -1) {
                Guild guild = chr.getGuild();
                if (guild != null) {
                    for (GuildMember gm : guild.getMembers()) {
                        Char gmChar = Server.get().getWorld().getCharById(gm.getCharID());
                        if (gmChar != null) {
                            if (gmChar.getId() != chr.getId() && gmChar.getGuildID() == guild.getId()) {
                                gmChar.sendGuildReward(chr.getName(), guild.getName(), type);
                                gmChar.sendPacketRewards();
                            }
                        } else {
                            gmChar = Char.getCharByGuildID(gm.getCharID());
                            if (gmChar != null) {
                                gmChar.initRewardSystem();
                                gmChar.sendGuildReward(chr.getName(), guild.getName(), type);
                            }
                        }
                    }
                }
            }
        }
        // Boss Attempt Clear Limit
        if (chr.getParty() != null) {
            switch (mobID) {
                case 8800022 -> sm.addPartyBoss(party, BossPartyType.ZAKUM_EASY);
                case 8800002 -> sm.addPartyBoss(party, BossPartyType.ZAKUM_NORMAL);
                case 8800102 -> sm.addPartyBoss(party, BossPartyType.ZAKUM_CHAOS);

                case 8860005 -> sm.addPartyBoss(party, BossPartyType.ARKARIUM_EASY);
                case 8860000 -> sm.addPartyBoss(party, BossPartyType.ARKARIUM_NORMAL);

                case 8850111 -> sm.addPartyBoss(party, BossPartyType.CYGNUS_EASY);
                case 8850011 -> sm.addPartyBoss(party, BossPartyType.CYGNUS_NORMAL);

                case 8880111 -> sm.addPartyBoss(party, BossPartyType.DAMIEN_NORMAL);
                case 8880101 -> sm.addPartyBoss(party, BossPartyType.DAMIEN_HARD);

                case 8870000 -> sm.addPartyBoss(party, BossPartyType.HILLA_NORMAL);
                case 8870100 -> sm.addPartyBoss(party, BossPartyType.HILLA_HARD);

                case 8950102 -> sm.addPartyBoss(party, BossPartyType.LOTUS_NORMAL);
                case 8950002 -> sm.addPartyBoss(party, BossPartyType.LOTUS_HARD);

                case 8880010 -> sm.addPartyBoss(party, BossPartyType.MAGNUS_EASY);
                case 8880002 -> sm.addPartyBoss(party, BossPartyType.MAGNUS_NORMAL);
                case 8880000 -> sm.addPartyBoss(party, BossPartyType.MAGNUS_HARD);

                case 8820001 -> sm.addPartyBoss(party, BossPartyType.PINK_BEAN_NORMAL);
                case 8820101, 8820212 -> sm.addPartyBoss(party, BossPartyType.PINK_BEAN_CHAOS);

                case 9421581 -> sm.addPartyBoss(party, BossPartyType.RANMARU_NORMAL);
                case 9421589 -> sm.addPartyBoss(party, BossPartyType.RANMARU_HARD);

                case VON_BON -> sm.addPartyBoss(party, BossPartyType.VON_BON_NORMAL);
                case CHAOS_VON_BON -> sm.addPartyBoss(party, BossPartyType.VON_BON_CHAOS);

                case QUEEN_CHEST -> sm.addPartyBoss(party, BossPartyType.QUEEN_NORMAL);
                case CHAOS_QUEEN_CHEST -> sm.addPartyBoss(party, BossPartyType.QUEEN_CHAOS);

                case VELLUM -> sm.addPartyBoss(party, BossPartyType.VELLUM_NORMAL);
                case CHAOS_VELLUM -> sm.addPartyBoss(party, BossPartyType.VELLUM_CHAOS);

                case PIERRE_CHEST -> sm.addPartyBoss(party, BossPartyType.PIERRE_NORMAL);
                case CHAOS_PIERRE_CHEST -> sm.addPartyBoss(party, BossPartyType.PIERRE_CHAOS);

                case 8840007 -> sm.addPartyBoss(party, BossPartyType.VON_LEON_EASY);
                case 8840000 -> sm.addPartyBoss(party, BossPartyType.VON_LEON_NORMAL);
                case 8840014 -> sm.addPartyBoss(party, BossPartyType.VON_LEON_HARD);

                case 8500002 -> sm.addPartyBoss(party, BossPartyType.PAPULATUS_EASY);
                case 8500012 -> sm.addPartyBoss(party, BossPartyType.PAPULATUS_NORMAL);
                case 8500022 -> sm.addPartyBoss(party, BossPartyType.PAPULATUS_CHAOS);

                case 8880200 -> sm.addPartyBoss(party, BossPartyType.OMNI_CLN_NORMAL);

                case 9450022 -> sm.addPartyBoss(party, BossPartyType.PRINCESS_NO);

                case 8880177 -> sm.addPartyBoss(party, BossPartyType.LUCID_EASY);
                case 8880167 -> sm.addPartyBoss(party, BossPartyType.LUCID_NORMAL);
                case 8880156 -> sm.addPartyBoss(party, BossPartyType.LUCID_HARD);

                case 8880362 -> sm.addPartyBoss(party, BossPartyType.WILL_EASY);
                case 8880342 -> sm.addPartyBoss(party, BossPartyType.WILL_NORMAL);
                case 8880302 -> sm.addPartyBoss(party, BossPartyType.WILL_HARD);

                case 8810214 -> sm.addPartyBoss(party, BossPartyType.HORNTAIL_EASY);
                case 8810018 -> sm.addPartyBoss(party, BossPartyType.HORNTAIL_NORMAL);
                case 8810122 -> sm.addPartyBoss(party, BossPartyType.HORNTAIL_CHAOS);
            }
        } else {
            switch (mobID) {
                case 8800022 -> chr.addPartyboss(BossPartyType.ZAKUM_EASY);
                case 8800002 -> chr.addPartyboss(BossPartyType.ZAKUM_NORMAL);
                case 8800102 -> chr.addPartyboss(BossPartyType.ZAKUM_CHAOS);

                case 8860005 -> chr.addPartyboss(BossPartyType.ARKARIUM_EASY);
                case 8860000 -> chr.addPartyboss(BossPartyType.ARKARIUM_NORMAL);

                case 8850111 -> chr.addPartyboss(BossPartyType.CYGNUS_EASY);
                case 8850011 -> chr.addPartyboss(BossPartyType.CYGNUS_NORMAL);

                case 8880111 -> chr.addPartyboss(BossPartyType.DAMIEN_NORMAL);
                case 8880101 -> chr.addPartyboss(BossPartyType.DAMIEN_HARD);

                case 8870000 -> chr.addPartyboss(BossPartyType.HILLA_NORMAL);
                case 8870100 -> chr.addPartyboss(BossPartyType.HILLA_HARD);

                case 8950102 -> chr.addPartyboss(BossPartyType.LOTUS_NORMAL);
                case 8950002 -> chr.addPartyboss(BossPartyType.LOTUS_HARD);

                case 8880010 -> chr.addPartyboss(BossPartyType.MAGNUS_EASY);
                case 8880002 -> chr.addPartyboss(BossPartyType.MAGNUS_NORMAL);
                case 8880000 -> chr.addPartyboss(BossPartyType.MAGNUS_HARD);

                case 8820001 -> chr.addPartyboss(BossPartyType.PINK_BEAN_NORMAL);
                case 8820101, 8820212 -> chr.addPartyboss(BossPartyType.PINK_BEAN_CHAOS);

                case 9421581 -> chr.addPartyboss(BossPartyType.RANMARU_NORMAL);
                case 9421589 -> chr.addPartyboss(BossPartyType.RANMARU_HARD);

                case VON_BON -> chr.addPartyboss(BossPartyType.VON_BON_NORMAL);
                case CHAOS_VON_BON -> chr.addPartyboss(BossPartyType.VON_BON_CHAOS);

                case QUEEN_CHEST -> chr.addPartyboss(BossPartyType.QUEEN_NORMAL);
                case CHAOS_QUEEN_CHEST -> chr.addPartyboss(BossPartyType.QUEEN_CHAOS);

                case VELLUM -> chr.addPartyboss(BossPartyType.VELLUM_NORMAL);
                case CHAOS_VELLUM -> chr.addPartyboss(BossPartyType.VELLUM_CHAOS);

                case PIERRE_CHEST -> chr.addPartyboss(BossPartyType.PIERRE_NORMAL);
                case CHAOS_PIERRE_CHEST -> chr.addPartyboss(BossPartyType.PIERRE_CHAOS);

                case 8840007 -> chr.addPartyboss(BossPartyType.VON_LEON_EASY);
                case 8840000 -> chr.addPartyboss(BossPartyType.VON_LEON_NORMAL);
                case 8840014 -> chr.addPartyboss(BossPartyType.VON_LEON_HARD);

                case 8500002 -> chr.addPartyboss(BossPartyType.PAPULATUS_EASY);
                case 8500012 -> chr.addPartyboss(BossPartyType.PAPULATUS_NORMAL);
                case 8500022 -> chr.addPartyboss(BossPartyType.PAPULATUS_CHAOS);

                case 8880200 -> chr.addPartyboss(BossPartyType.OMNI_CLN_NORMAL);

                case 9450022 -> chr.addPartyboss(BossPartyType.PRINCESS_NO);

                case 8880177 -> chr.addPartyboss(BossPartyType.LUCID_EASY);
                case 8880167 -> chr.addPartyboss(BossPartyType.LUCID_NORMAL);
                case 8880156 -> chr.addPartyboss(BossPartyType.LUCID_HARD);

                case 8880362 -> chr.addPartyboss(BossPartyType.WILL_EASY);
                case 8880342 -> chr.addPartyboss(BossPartyType.WILL_NORMAL);
                case 8880302 -> chr.addPartyboss(BossPartyType.WILL_HARD);

                case 8810214 -> chr.addPartyboss(BossPartyType.HORNTAIL_EASY);
                case 8810018 -> chr.addPartyboss(BossPartyType.HORNTAIL_NORMAL);
                case 8810122 -> chr.addPartyboss(BossPartyType.HORNTAIL_CHAOS);
            }
        }
        if (chr.getAccount().getDailyGift() != null) {
            chr.getAccount().getDailyGift().updateMonsterCount(chr, mob.getLevel());
        }
        if (chr.hasQuest(QuestConstants.UNION_ARTIFACT)) {
            UnionArtifact.updateCommonMission(chr, mob);
            UnionArtifact.updateHuntMission(chr, mob);
        }
        if (EventConstants.HYPER_BURNING_MAX && field.getId() == EventConstants.TERA_BLINK_FIELD) {
            if (chr.hasQuest(102444)) {
                if (mob.getTemplateId() != 9834328 && mob.getTemplateId() != 9834329) {
                    // Spiegelmann's Orange Mushroom
                    // Spiegelmann's Slime
                    if (field.getMobs().size() <= 1 && !"1".equals(chr.getQRValueByKey(102444, "eliteMob"))) {
                        field.removeMobsBySvr(chr);
                        field.spawnMob(Util.succeedProp(50) ? 9834328 : 9834329, mob.getX(), mob.getY(), false, 53662500, 0);
                        sm.createQuestWithQRValue(102444, "step=2");
                    }
                } else {
                    sm.removeBlowWeather();
                    sm.blowWeather(5120243, "Elite Mob has been defeated! Talk to Spiegelmann to continue!", 4);
                    sm.createQuestWithQRValue(102444, "step=2;eliteMob=1");
                }
            } else if (chr.hasQuest(102447)) {
                if (mob.getTemplateId() != 9834330) {
                    // Spiegelmann's Black Knight
                    if (field.getMobs().size() <= 1 && !"1".equals(chr.getQRValueByKey(102447, "eliteBoss"))) {
                        field.removeMobsBySvr(chr);
                        field.spawnMob(9834330, mob.getX(), mob.getY(), false, 53662500, 0);
                    }
                } else {
                    sm.removeBlowWeather();
                    sm.blowWeather(5120243, "Elite Boss has been defeated! Talk to Spiegelmann to continue!", 4);
                    sm.createQuestWithQRValue(102447, "eliteBoss=1;step=done;crEqp=1");
                    field.drop(new Drop(-1, GameConstants.RARE_TREASURE_CHEST), mob.getPosition());
                }
            } else if (chr.hasQuest(102448)) {
                if (mob.getTemplateId() == 9834332) {
                    // Spiegelmann's Door
                    sm.startScript(chr, 102448, "q102448e", ScriptType.Quest);
                }
            }
        }
        // Arcane Stones
        var itemID = chr.hasQuest(1473) ? Integer.parseInt(chr.getQRValueByKey(1473, "itemID")) : 0;
        if (itemID >= 2435734 && itemID <= 2435736) {
            var mobExp = mob.getExp() * ServerConfig.QUEST_EXP_RATE;
            var questID = 1470 + itemID - 2435734;
            if (!chr.hasQuestCompleted(questID + 4)) {
                long exp = Long.parseLong(chr.getQRValueByKey(questID, "exp"));
                if (exp + mobExp < 500_000_000L) {
                    chr.setQRValueByKey(questID, "exp", (Math.min(500_000_000L, (exp + mobExp)) + ""));
                } else {
                    chr.createQuestWithQRValue(questID,  "on=1;u=1;exp=500000000");
                }
            }
        }
    }

    private static void warpPartyOrSolo(Char chr, Party party, Instance instance, int nextMapId) {
        if (party != null) {
            chr.getScriptManager().warpParty(nextMapId, party);
        } else if (instance != null) {
            Field nextField = instance.getField(nextMapId);
            if (nextField != null) {
                chr.warp(nextField);
            } else {
                chr.warp(nextMapId);
            }
        } else {
            chr.warp(nextMapId);
        }
    }

    private static void transitionToBossMap(Char chr, Field currentField, int nextMapId, int nextMobId, int x, int refY, boolean isRewardRoom) {
        currentField.removeMobs();
        ScriptManagerImpl sm = chr.getScriptManager();
        Party party = chr.getParty();
        Instance instance = chr.getInstance();
        if (isRewardRoom) {
            sm.showFieldEffect("Map/Effect.img/killing/clear");
            currentField.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/EffectTW.img/arisan/clear")));
            if (instance != null) {
                instance.setTimeout(300, true);
            }
        } else {
            currentField.broadcast(UserPacket.effect(Effect.effectFromWZ("Map/Effect2.img/blackHeavenBossDie3")));
        }
        chr.getTimer().addEvent(() -> {
            warpPartyOrSolo(chr, party, instance, nextMapId);
            Instance activeInst = chr.getInstance();
            Field nextField = (activeInst != null) ? activeInst.getField(nextMapId) : chr.getOrCreateFieldByCurrentInstanceType(nextMapId);
            if (nextField != null && nextMobId > 0 && !nextField.hasMobById(nextMobId)) {
                int y = BossEntry.snapToFootholdY(nextField, x, refY);
                nextField.spawnMob(nextMobId, x, y, false);
                nextField.setBossSpawned(true);
                if (isRewardRoom) {
                    nextField.broadcast(UserLocal.chatMsg(ChatType.SystemNotice, "[Boss Clear] Attack the Reward Chest to claim your loot, then use the portal or talk to the NPC to leave."));
                }
            }
        }, 2000);
    }

    public static void spawnHungryMutoMobs(Field field, Mob mob, ScriptManagerImpl sm, int[] mobs) {
        if (mob.getTemplateId() == 9833046 || mob.getTemplateId() == 9833066) {
            sm.showEffectToField("Map/Effect3.img/hungryMutoMsg/msg7");
            field.getTimer().addEvent(() -> {
                for (Integer integer : mobs) {
                    if (integer == mob.getTemplateId()) {
                        int[] zz = xy[(int) Math.floor(Math.random() * xy.length)];
                        sm.spawnMob(mob.getTemplateId(), zz[0], zz[1], false, 0);
                        sm.showEffectToField("Map/Effect3.img/hungryMutoMsg/msg8");
                        break;
                    }
                }
            }, field.getId() == GameConstants.HUNGRY_MUTO_HARD_STAGE ? 15000 : 10000);
        } else {
            field.spawnMob(mob.getTemplateId(), mob.getHomePosition().getX(), mob.getHomePosition().getY(), true, 0);
        }
    }

    public static void spawnMobForEvolLink(Field field, int link, Position pos) {
        int mobID = 0;
        if (!Util.succeedProp(20)) {
            return;
        }
        switch (link) {
            case 4 -> {
                mobID = 9306006;
                break;
            }
            case 5 -> {
                mobID = Util.succeedProp(10) ? 9306100 : 9306005;
                break;
            }
            case 8 -> {
                mobID = 9306200;
                break;
            }
        }
        if (mobID == 0) {
            return;
        }
        field.spawnMob(mobID, pos.getX(), pos.getY(), false);
    }

    public static int getGuildRewardGradeByMobID(int mobID) {
        switch (mobID) {
            case 8800002: // Zakum (Normal)
            case 8810018: // Horntail (Normal)
            case 8880002: // Magnus (Normal)
            case 8870000: // Hilla (Normal)
            case 8900103: // Pierre (Normal)
            case 8910100: // Von Bon (Normal)
            case 8920106: // Queen (Normal)
            case VELLUM: // Vellum (Normal)
            case 9421581: // Mori Ranmaru (Normal)
            case 8840007: // Von Leon (Easy)
            case 8840000: // Von Leon (Normal)
            case 8860000: // Arkarium (Normal)
            case 8820001: // Pink Bean (Normal)
            case 8850011: // Cygnus (Normal)
                return 0; // Quà thường
            case 8800102: // Zakum Chaos
            case 8810122: // Horntail Chaos
            case 8880000: // Magnus Hard
            case 8870100: // Hilla Hard
            case 8910000: // Chaos Von Bon
            case CHAOS_VELLUM: // Chaos Vellum
            case 8920006: // Chaos Crimson Queen
            case 8900003: // Chaos Pierre
            case 8820101:
            case 8820212: // Chaos Pink Bean
            case 9421589: // Mori Ranmaru (Hard)
            case 8840014: // Von Leon (Hard)
                return 1; // Quà Khó < 100,000
            case 8950002: // Lotus Hard
            case 8880111: // Damien Normal
            case 8950102: // Lotus Normal
            case 8880101: // Damien Hard
            case 8880177: // Final Music Box (Lucid Easy)
            case 8880167: // Final Music Box (Lucid Normal)
            case 8880156: // Final Music Box (Lucid Hard)
                return 2; // Quà Siêu khó 100,000 - 500,000
        }
        return -1;
    }

    public static void initRootAbyss(Char chr, int chestID, int reactorID, int spawnX, int spawnY) {
        if (checkInstance(chr)) {
            return;
        }

        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        Life reactor = field.getLifeByTemplateId(reactorID);
        if (reactor != null) {
            field.removeLife(reactor.getObjectId(), false);
        }
        Party party = chr.getParty();
        if (chestID != 0) {
            if (!field.hasMobById(chestID)) {
                field.spawnMob(chestID, spawnX, spawnY, false);
            }
            if (party != null && party.getPartyMembersInSameFieldWithChr(chr).size() >= 2) {
                for (Char member : party.getPartyMembersInSameFieldWithChr(chr)) {
                    ScriptManagerImpl sm = member.getScriptManager();
                    if (chr.hasQuest(30009) && !chr.hasQuestCompleted(30009)) {
                        chr.completeQuest(30009); // [Root Abyss] Defeat the First Guardian
                    } else if (chr.hasQuest(30010) && !chr.hasQuestCompleted(30010)) {
                        chr.completeQuest(30010); // [Root Abyss] Defeat the Second Guardian
                    } else if (chr.hasQuest(30011) && !chr.hasQuestCompleted(30011)) {
                        chr.completeQuest(30011); // [Root Abyss] Defeat the Third Seal Guardian
                    } else if (chr.hasQuest(30012) && !chr.hasQuestCompleted(30012)) {
                        chr.completeQuest(30012); // [Root Abyss] Defeat the Final Guardian
                    }
                }
            } else {
                ScriptManagerImpl sm = chr.getScriptManager();
                if (chr.hasQuest(30009) && !chr.hasQuestCompleted(30009)) {
                    chr.completeQuest(30009); // [Root Abyss] Defeat the First Guardian
                } else if (chr.hasQuest(30010) && !chr.hasQuestCompleted(30010)) {
                    chr.completeQuest(30010); // [Root Abyss] Defeat the Second Guardian
                } else if (chr.hasQuest(30011) && !chr.hasQuestCompleted(30011)) {
                    chr.completeQuest(30011); // [Root Abyss] Defeat the Third Seal Guardian
                } else if (chr.hasQuest(30012) && !chr.hasQuestCompleted(30012)) {
                    chr.completeQuest(30012); // [Root Abyss] Defeat the Final Guardian
                }
            }
        }
    }

    public static void spawnGollux(Char chr, int phase) {
        if (checkInstance(chr)) {
            return;
        }

        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());
        int mobId = 9390600 + phase;
        Mob gollux = MobData.getMobDeepCopyById(mobId);
        int hpMultiplier = BossConstants.GOLLUX_HP_MULTIPLIERS[phase][chr.getScriptManager().getGolluxDifficulty().getVal()];
        field.spawnMob(mobId, 0, 0, false, gollux.getHp() * 5L * (long) hpMultiplier);
        //blockAttacks(chr);
    }

    public static void blockAttacks(Char chr) {
        Mob mob = null;
        Field field = chr.getOrCreateFieldByCurrentInstanceType(chr.getField().getId());

        for (int i = 9390600; i <= 9390602; i++) {
            mob = (Mob) field.getLifeByTemplateId(i);
            if (mob != null) {
                Map<String, Object> golluxMaps = chr.getOrCreateFieldByCurrentInstanceType(BossConstants.GOLLUX_FIRST_MAP).getProperties();
                ArrayList<Integer> blockedSkills = new ArrayList<>();
                if ((int) golluxMaps.getOrDefault(String.valueOf(BossConstants.GOLLUX_RIGHT_SHOULDER), 0) == 2) {
                    blockedSkills.addAll(Arrays.stream(BossConstants.GOLLUX_RIGHT_HAND_SKILLS).boxed().toList());
                }
                if ((int) golluxMaps.getOrDefault(String.valueOf(BossConstants.GOLLUX_LEFT_SHOULDER), 0) == 2) {
                    blockedSkills.addAll(Arrays.stream(BossConstants.GOLLUX_LEFT_HAND_SKILLS).boxed().toList());
                }
                if ((int) golluxMaps.getOrDefault(String.valueOf(BossConstants.GOLLUX_ABDOMEN), 0) == 2) {
                    blockedSkills.add(BossConstants.GOLLUX_BREATH_ATTACK);
                }
                mob.getField().broadcast(MobPool.mobAttackBlock(mob, blockedSkills));
                break;
            }
        }
    }

    public static void clearMaps(Char chr) {
        chr.getOrCreateFieldByCurrentInstanceType(BossConstants.GOLLUX_FIRST_MAP).getProperties().clear();
    }

    public static void openPortal(Field field, String action, int show) {
        field.broadcast(FieldPacket.golluxOpenPortal(action, show));
    }

    public static void addClearedField(Field field, Char chr) {
        chr.getOrCreateFieldByCurrentInstanceType(BossConstants.GOLLUX_FIRST_MAP).getProperties().put(String.valueOf(chr.getFieldID()), 2);
        updateField(field, chr);
    }

    public static void addCurrentField(Field field, Char chr) {
        int type = field.getMobs().size() == 0 ? 2 : 1;
        chr.getOrCreateFieldByCurrentInstanceType(BossConstants.GOLLUX_FIRST_MAP).getProperties().put(String.valueOf(chr.getFieldID()), type);
        updateField(field, chr);
    }

    public static void updateField(Field field, Char chr) {
        field.broadcast(FieldPacket.golluxUpdateMiniMap(chr));
    }

    public static boolean isAlreadyVisited(Char chr) {
        return chr.getOrCreateFieldByCurrentInstanceType(BossConstants.GOLLUX_FIRST_MAP).getProperties().containsKey(String.valueOf(chr.getFieldID()));
    }

    public static void setBlockAttack(Mob mob) {
        ArrayList<Integer> blockedSkills = new ArrayList<>();
        switch (mob.getTemplateId()) {
            case 8800102:
                if (mob.getPhase() != 2) {
                    mob.getField().removeMobsByTemplateID(8800117);
                    blockedSkills.add(1);
                }
                if (mob.getPhase() != 3) {
                    blockedSkills.add(2);
                    blockedSkills.add(3);
                    blockedSkills.add(4);
                    blockedSkills.add(5);
                }
                if (mob.getPhase() != 4) {
                    blockedSkills.add(6);
                    blockedSkills.add(7);
                    blockedSkills.add(8);
                }
                break;
            case 8850011:
            case 8850111:
                blockedSkills.add(4);
                break;
            case 8910000:
            case 8910100:
                if (mob.getHPPercent() > 10) {
                    blockedSkills.add(3);
                    blockedSkills.add(4);
                    blockedSkills.add(5);
                    blockedSkills.add(6);
                    blockedSkills.add(7);
                }
                if (mob.getHPPercent() > 70) {
                    blockedSkills.add(2);
                }
                break;
            case 8930000:
            case 8930100:
                if (mob.getTemplateId() == 8930100 && mob.getHPPercent() > 70) {
                    blockedSkills.add(2);
                    blockedSkills.add(3);
                    blockedSkills.add(4);
                }
                if (mob.getHPPercent() > 40) {
                    blockedSkills.add(8);
                    blockedSkills.add(9);
                    blockedSkills.add(10);
                    blockedSkills.add(12);
                    blockedSkills.add(13);
                    blockedSkills.add(14);
                    blockedSkills.add(15);
                }
                break;
            case 8880300:
            case 8880301:
            case 8880303:
            case 8880304:
            case 8880321:
            case 8880322:
            case 8880325:
            case 8880326:
            case 8880340:
            case 8880341:
            case 8880343:
            case 8880344:
            case 8880351:
            case 8880352:
            case 8880355:
            case 8880356:
            case 8880360:
            case 8880361:
            case 8880363:
            case 8880364:
            case 8880370:
            case 8880371:
            case 8880374:
            case 8880375:
                return;
        }
        mob.getField().broadcast(MobPool.mobAttackBlock(mob, blockedSkills));
    }
}
