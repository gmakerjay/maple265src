package net.swordie.ms.world.boss;

import net.swordie.ms.Server;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.connection.packet.FieldPacket;
import net.swordie.ms.constants.BossConstants;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.enums.BossPartyType;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.field.Foothold;
import net.swordie.ms.world.field.Instance;

import java.util.concurrent.TimeUnit;

/**
 * Universal Boss Entry Manager for MapleStory v265.
 * Handles instant, natural boss entry from the in-game Boss UI / Content Guide
 * or NPC gatekeepers directly into private instanced battle fields.
 */
public class BossEntry {

    public static final int[] BOSS_PREQUEST_IDS = {
            30007, // Root Abyss
            1562,  // Von Leon
            31179, // Arkarium
            31833, // Magnus
            3521,  // Pink Bean
            31152, // Cygnus
            33565, // Ursus
            17523, // Gollux
            65851, // Ranmaru
            34330, // Lucid
            3496,  // OMNI-CLN
            3470,  // Papulatus
            37871, // Will
            36772, // Verus Hilla
            35815, // Black Mage & Darknell
            35632, // Gloom
            39921, // Chosen Seren
            36013, // Guardian Angel Slime
            38214, // Kalos the Guardian
            38401, // Kaling
            38702, // Limbo
            36996, // Baldrix
            38319, // First Adversary
    };

    /**
     * Unlocks all boss entry prerequisite quests for offline / LAN convenience.
     */
    public static void unlockBossPrerequisites(Char chr) {
        if (chr == null) {
            return;
        }
        for (int questId : BOSS_PREQUEST_IDS) {
            if (!chr.hasQuestCompleted(questId)) {
                chr.completeQuest(questId, true);
            }
        }
    }

    /**
     * Attempts to enter the boss battle field directly.
     * Returns true if handled (even if failed due to party leadership),
     * or false if no battle map is mapped for this boss type.
     */
    public static boolean enter(Char chr, BossPartyType boss, boolean practice) {
        if (chr == null || boss == null) {
            return false;
        }
        int fightingFieldId = BossConstants.getBossFightingFieldId(boss);
        if (fightingFieldId <= 0) {
            return false;
        }

        Party party = chr.getParty();
        if (party == null) {
            party = Party.createNewParty((byte) 1, chr.getName() + "'s Party", chr.getClient().getWorld());
            party.addPartyMember(chr);
        }
        if (!party.isLeader(chr)) {
            chr.chatPopup("Only the party leader can initiate boss entry. (เฉพาะหัวหน้าปาร์ตี้เท่านั้น)");
            return true;
        }

        // Determine safe return field
        int returnField;
        if (chr.getInstance() != null) {
            String mapRStr = chr.getQRValueByKey(102401, "mapR");
            int parsed = 0;
            try {
                if (mapRStr != null) {
                    parsed = Integer.parseInt(mapRStr);
                }
            } catch (Exception ignored) {}
            if (parsed > 0) {
                returnField = parsed;
            } else {
                int waitMap = BossConstants.getBossWaitingFieldId(boss);
                returnField = (waitMap > 0) ? waitMap : (chr.getPreviousFieldID() > 0 ? chr.getPreviousFieldID() : FieldConstants.HOME_MAP);
            }
        } else {
            returnField = chr.getFieldID();
        }

        // Record quest state, death count, and difficulty for all online party members
        int deathCount = BossConstants.getBossDeathCount(boss);
        for (Char pm : party.getOnlineChars()) {
            if (pm == null) continue;
            unlockBossPrerequisites(pm);
            pm.createQuestWithQRValue(102401, "mapR=" + returnField + ";order=" + boss.getOrderId() + ";diff=" + boss.getDifficulty().getVal());
            if (boss == BossPartyType.LUCID_EASY || boss == BossPartyType.LUCID_NORMAL || boss == BossPartyType.LUCID_HARD) {
                pm.setLucidMode(boss.getDifficulty().getVal());
            }
            pm.setDeathCount(deathCount);
            pm.setPracticeMode(practice);
        }

        // Clear existing instance if any
        if (chr.getInstance() != null) {
            chr.getInstance().clear();
        }

        // Warp party into fresh battle instance
        chr.getScriptManager().warpInstanceIn(chr, fightingFieldId, true);
        Instance instance = chr.getInstance();
        if (instance != null) {
            instance.setForcedReturn(returnField);
            int time = BossConstants.getBossFightingTime(boss);
            if (time <= 0) {
                time = 30 * 60;
            }
            instance.setTimeout(time, true);
        }

        for (Char pm : party.getOnlineChars()) {
            if (pm != null && pm.getDeathCount() > 0) {
                pm.showDeathCount(pm.getDeathCount());
            }
        }

        chr.write(FieldPacket.closeUI(7));
        chr.dispose();

        // Schedule boss spawn verification / fallback
        chr.getTimer().addEvent(() -> ensureSpawn(instance, fightingFieldId, boss, chr, 0), 2500, TimeUnit.MILLISECONDS);
        return true;
    }

    private static void ensureSpawn(Instance instance, int fieldId, BossPartyType boss, Char leader, int retryCount) {
        Field field = (instance != null) ? instance.getField(fieldId) : leader.getOrCreateFieldByCurrentInstanceType(fieldId);
        if (field == null) {
            return;
        }
        if (field.getChars().isEmpty() && retryCount < 5) {
            Server.get().getEventTimer().addEvent(() -> ensureSpawn(instance, fieldId, boss, leader, retryCount + 1), 1000, TimeUnit.MILLISECONDS);
            return;
        }
        if (field.isBossSpawned()) {
            return;
        }
        for (Mob m : field.getMobs()) {
            if (m.isBoss()) {
                field.setBossSpawned(true);
                return;
            }
        }
        spawnBossForField(field, boss, leader);
    }

    private static void spawnBossForField(Field field, BossPartyType boss, Char chr) {
        switch (boss) {
            case ZAKUM_EASY -> {
                Zakum.spawn(1, field);
                field.setBossSpawned(true);
            }
            case ZAKUM_NORMAL -> {
                Zakum.spawn(2, field);
                field.setBossSpawned(true);
            }
            case ZAKUM_CHAOS -> {
                Zakum.spawn(3, field);
                field.setBossSpawned(true);
            }
            case HORNTAIL_EASY -> {
                Horntail.spawn(0, field, 71, 260);
                field.setBossSpawned(true);
            }
            case HORNTAIL_NORMAL -> {
                Horntail.spawn(1, field, 71, 260);
                field.setBossSpawned(true);
            }
            case HORNTAIL_CHAOS -> {
                Horntail.spawn(2, field, 71, 260);
                field.setBossSpawned(true);
            }
            case PIERRE_NORMAL -> {
                RootAbyss.spawnPierre(field, chr, RootAbyss.PierreMode.NORMAL);
            }
            case PIERRE_CHAOS -> {
                RootAbyss.spawnPierre(field, chr, RootAbyss.PierreMode.CHAOS);
            }
            case VON_BON_NORMAL -> {
                RootAbyss.spawn(field, chr, "banbanNormal");
            }
            case VON_BON_CHAOS -> {
                RootAbyss.spawn(field, chr, "banbanChaos");
            }
            case QUEEN_NORMAL -> {
                RootAbyss.spawn(field, chr, "queenNormal");
            }
            case QUEEN_CHAOS -> {
                RootAbyss.spawn(field, chr, "queenChaos");
            }
            case VELLUM_NORMAL -> {
                RootAbyss.spawn(field, chr, "bellumNormal");
            }
            case VELLUM_CHAOS -> {
                RootAbyss.spawn(field, chr, "bellumChaos");
            }
            case VON_LEON_EASY, VON_LEON_NORMAL, VON_LEON_HARD -> {
                VonLeon.spawn(chr);
            }
            case ARKARIUM_EASY, ARKARIUM_NORMAL -> {
                Arkarium.spawn(chr);
            }
            case PINK_BEAN_NORMAL, PINK_BEAN_CHAOS -> {
                PinkBean.spawn(chr);
            }
            case RANMARU_NORMAL -> {
                Ranmaru.spawn(chr, Ranmaru.RanmaruMode.NORMAL);
            }
            case RANMARU_HARD -> {
                Ranmaru.spawn(chr, Ranmaru.RanmaruMode.HARD);
            }
            case OMNI_CLN_NORMAL -> {
                spawnSnappedMob(field, 8880200, 615, 298);
                spawnSnappedMob(field, 8880202, 615, 298);
                field.setBossSpawned(true);
            }
            case PAPULATUS_EASY -> {
                spawnSnappedMob(field, 8500001, -410, -500);
                field.setBossSpawned(true);
            }
            case PAPULATUS_NORMAL -> {
                spawnSnappedMob(field, 8500011, -410, -500);
                field.setBossSpawned(true);
            }
            case PAPULATUS_CHAOS -> {
                spawnSnappedMob(field, 8500021, -410, -500);
                field.setBossSpawned(true);
            }
            case PRINCESS_NO -> {
                spawnSnappedMob(field, 9450022, 600, 0);
                field.setBossSpawned(true);
            }
            case GLOOM_NORMAL -> {
                spawnSnappedMob(field, 8644650, 0, -157);
                field.setBossSpawned(true);
            }
            case GLOOM_CHAOS -> {
                spawnSnappedMob(field, 8644655, 0, -157);
                field.setBossSpawned(true);
            }
            case DARKNELL_NORMAL -> {
                spawnSnappedMob(field, 8645009, 0, 29);
                field.setBossSpawned(true);
            }
            case DARKNELL_HARD -> {
                spawnSnappedMob(field, 8645066, 0, 29);
                field.setBossSpawned(true);
            }
            case VERUS_HILLA_NORMAL -> {
                VerusHilla.spawn(field, chr, false);
            }
            case VERUS_HILLA_HARD -> {
                VerusHilla.spawn(field, chr, true);
            }
            case CHOSEN_SEREN_NORMAL -> {
                spawnSnappedMob(field, 8880630, 0, 275);
                field.setBossSpawned(true);
            }
            case CHOSEN_SEREN_HARD -> {
                spawnSnappedMob(field, 8880600, 0, 275);
                field.setBossSpawned(true);
            }
            case CHOSEN_SEREN_EXTREME -> {
                spawnSnappedMob(field, 8880650, 0, 275);
                field.setBossSpawned(true);
            }
            case SLIME_NORMAL -> {
                spawnSnappedMob(field, 8880711, 553, -1382);
                field.setBossSpawned(true);
            }
            case SLIME_CHAOS -> {
                spawnSnappedMob(field, 8880700, 553, -1382);
                field.setBossSpawned(true);
            }
            case KALOS_EASY -> {
                spawnSnappedMob(field, 8881010, 0, 398);
                field.setBossSpawned(true);
            }
            case KALOS_NORMAL -> {
                spawnSnappedMob(field, 8880800, 0, 398);
                field.setBossSpawned(true);
            }
            case KALOS_CHAOS -> {
                spawnSnappedMob(field, 8881030, 0, 398);
                field.setBossSpawned(true);
            }
            case KALOS_EXTREME -> {
                spawnSnappedMob(field, 8881050, 0, 398);
                field.setBossSpawned(true);
            }
            case KALING_EASY -> {
                spawnSnappedMob(field, 8880900, 350, 106);
                spawnSnappedMob(field, 8880901, 634, 106);
                spawnSnappedMob(field, 8880902, 950, 106);
                field.setBossSpawned(true);
            }
            case KALING_NORMAL -> {
                spawnSnappedMob(field, 8880830, 350, 106);
                spawnSnappedMob(field, 8880831, 634, 106);
                spawnSnappedMob(field, 8880832, 950, 106);
                field.setBossSpawned(true);
            }
            case KALING_HARD -> {
                spawnSnappedMob(field, 8880930, 350, 106);
                spawnSnappedMob(field, 8880931, 634, 106);
                spawnSnappedMob(field, 8880932, 950, 106);
                field.setBossSpawned(true);
            }
            case KALING_EXTREME -> {
                spawnSnappedMob(field, 8880960, 350, 106);
                spawnSnappedMob(field, 8880961, 634, 106);
                spawnSnappedMob(field, 8880962, 950, 106);
                field.setBossSpawned(true);
            }
            case LIMBO_NORMAL -> {
                spawnSnappedMob(field, 8881304, 0, 3);
                field.setBossSpawned(true);
            }
            case LIMBO_HARD -> {
                spawnSnappedMob(field, 8881354, 0, 3);
                field.setBossSpawned(true);
            }
            case BALDRIX_NORMAL -> {
                spawnSnappedMob(field, 8881600, 0, 18);
                field.setBossSpawned(true);
            }
            case BALDRIX_HARD -> {
                spawnSnappedMob(field, 8881650, 0, 18);
                field.setBossSpawned(true);
            }
            case FIRST_ADVERSARY_EASY -> {
                spawnSnappedMob(field, 8881710, 0, 55);
                field.setBossSpawned(true);
            }
            case FIRST_ADVERSARY_NORMAL -> {
                spawnSnappedMob(field, 8881740, 0, 55);
                field.setBossSpawned(true);
            }
            case FIRST_ADVERSARY_HARD -> {
                spawnSnappedMob(field, 8881770, 0, 55);
                field.setBossSpawned(true);
            }
            case FIRST_ADVERSARY_EXTREME -> {
                spawnSnappedMob(field, 8881800, 0, 55);
                field.setBossSpawned(true);
            }
            case URSUS -> {
                spawnSnappedMob(field, 8881000, 1000, 86);
                field.setBossSpawned(true);
            }
            case AKECHI_MITSUHIDE -> {
                spawnSnappedMob(field, 9601622, 0, 85);
                field.setBossSpawned(true);
            }
            case MAGNUS_EASY -> {
                Magnus.spawn(chr, Magnus.MagnusMode.EASY);
                field.setBossSpawned(true);
            }
            case MAGNUS_NORMAL -> {
                Magnus.spawn(chr, Magnus.MagnusMode.NORMAL);
                field.setBossSpawned(true);
            }
            case MAGNUS_HARD -> {
                Magnus.spawn(chr, Magnus.MagnusMode.HARD);
                field.setBossSpawned(true);
            }
            case CYGNUS_EASY -> {
                Cygnus.spawn(chr, Cygnus.CygnusMode.EASY);
                field.setBossSpawned(true);
            }
            case CYGNUS_NORMAL -> {
                Cygnus.spawn(chr, Cygnus.CygnusMode.NORMAL);
                field.setBossSpawned(true);
            }
            case LOTUS_NORMAL -> {
                Lotus.spawn(field, chr, Lotus.LotusPhase.FIRST, Lotus.LotusMode.NORMAL);
                field.setBossSpawned(true);
            }
            case LOTUS_HARD -> {
                Lotus.spawn(field, chr, Lotus.LotusPhase.FIRST, Lotus.LotusMode.HARD);
                field.setBossSpawned(true);
            }
            case LOTUS_EXTREME -> {
                spawnSnappedMob(field, 8881200, 0, 398);
                field.setBossSpawned(true);
            }
            case DAMIEN_NORMAL, DAMIEN_HARD -> {
                Damien.spawn(chr, Damien.DamienPhase.FIRST);
                field.setBossSpawned(true);
            }
            case LUCID_EASY, LUCID_NORMAL, LUCID_HARD -> {
                Lucid.spawn(chr, Lucid.LucidPhase.FIRST);
                field.setBossSpawned(true);
            }
            case WILL_EASY, WILL_NORMAL, WILL_HARD -> {
                Will.spawn(1, chr);
                field.setBossSpawned(true);
            }
            case BLACK_MAGE_HARD -> {
                spawnSnappedMob(field, 8880500, -375, 88);
                spawnSnappedMob(field, 8880501, 375, 88);
                field.setBossSpawned(true);
            }
            case BLACK_MAGE_EXTREME -> {
                spawnSnappedMob(field, 8880530, -375, 88);
                spawnSnappedMob(field, 8880531, 375, 88);
                field.setBossSpawned(true);
            }
            case HILLA_NORMAL -> {
                spawnSnappedMob(field, 8870000, -150, 169);
                field.setBossSpawned(true);
            }
            case HILLA_HARD -> {
                spawnSnappedMob(field, 8870100, -150, 169);
                field.setBossSpawned(true);
            }
            case BALROG -> {
                chr.getScriptManager().spawnBalrog(true);
                field.setBossSpawned(true);
            }
            default -> {
                // Exploration-based maze boss (e.g., Gollux) handles its own stages.
            }
        }
    }

    private static void spawnSnappedMob(Field field, int mobId, int x, int refY) {
        int y = snapToFootholdY(field, x, refY);
        field.spawnMob(mobId, x, y, false);
    }

    public static int snapToFootholdY(Field field, int x, int refY) {
        if (field == null || field.getFootholds() == null || field.getFootholds().isEmpty()) {
            return refY;
        }
        int bestY = refY;
        int minDiff = Integer.MAX_VALUE;
        for (Foothold fh : field.getFootholds()) {
            if (fh.isWall()) continue;
            if (fh.xIsInFoothold(x)) {
                int y = fh.getYFromX(x);
                int diff = y - refY;
                if (diff >= -50 && diff < minDiff) {
                    minDiff = diff;
                    bestY = y;
                }
            }
        }
        return bestY;
    }
}
