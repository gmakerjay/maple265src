package net.swordie.ms.client.jobs.shine;

import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.SkillStat;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.MobAttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.AssistType;
import net.swordie.ms.enums.ChatType;
import net.swordie.ms.enums.MoveAbility;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.Etc.HexaCore.HexaCore;
import net.swordie.ms.scripts.ScriptManagerImpl;

import java.util.ArrayList;
import java.util.List;

import static net.swordie.ms.enums.InvType.EQUIPPED;

public class SiaAstelle extends Job {

    // ===== 1st Job (18200) =====
    public static final int ASTRAL_MAGIC_GUARD = 182000000;
    public static final int ASTRAL_MOVEMENT = 182000001;
    public static final int RAY_1 = 182001000;
    public static final int STELLAR_I_ANTARES = 182001001;
    public static final int STELLAR_I_ANTARES_SUB = 182001002;
    public static final int STARLIGHT_1 = 182001003;
    public static final int STARRY_FLOW = 182001004;
    public static final int STARRY_LEAP = 182001005;
    public static final int RAY_1_SUB = 182001006;
    public static final int STARLIGHT_1_SUB = 182001007;

    // ===== 2nd Job (18210) =====
    public static final int OORT_WAVE = 182100000;
    public static final int STARLIGHT_ENHANCEMENT_I = 182100001;
    public static final int ASTRAL_FORCE = 182100002;
    public static final int ASTRAL_ENERGY = 182100003;
    public static final int BOOM_2 = 182101000;
    public static final int STELLAR_II_ALGOL = 182101001;
    public static final int STELLAR_II_ALGOL_SUB1 = 182101002;
    public static final int STELLAR_II_ALGOL_SUB2 = 182101003;
    public static final int STELLAR_II_ALGOL_SUB3 = 182101004;
    public static final int CELESTIAL_ALIGNMENT = 182101005;

    // ===== 3rd Job (18211) =====
    public static final int STELLAR_ENHANCEMENT_I = 182110000;
    public static final int STARLIGHT_ENHANCEMENT_II = 182110001;
    public static final int ASTRAL_ELEMENTS = 182110002;
    public static final int ASTRAL_INVINCIBILITY = 182110003;
    public static final int POLE_3 = 182111000;
    public static final int POLE_3_SUB = 182111010;
    public static final int STELLAR_III_ALCHIBA = 182111001;
    public static final int STELLAR_III_ALCHIBA_SUB = 182111002;
    public static final int STELLAR_IV_BELLATRIX = 182111003;
    public static final int STELLAR_IV_BELLATRIX_SUB = 182111004;
    public static final int STELLAR_V_FOMALHAUT = 182111005;
    public static final int STELLAR_V_FOMALHAUT_SUB1 = 182111006;
    public static final int STELLAR_V_FOMALHAUT_SUB2 = 182111007;
    public static final int STARRY_BOOST = 182111008;

    // ===== 4th Job (18212) =====
    public static final int STELLAR_ENHANCEMENT_II = 182120000;
    public static final int STARLIGHT_ENHANCEMENT_III = 182120001;
    public static final int ASTRAL_ASSIMILATION = 182120002;
    public static final int ASTRAL_INFINITY = 182120003;
    public static final int LINK_4 = 182121000;
    public static final int STELLAR_VI_IZAR = 182121001;
    public static final int STELLAR_VI_IZAR_SUB = 182121002;
    public static final int STELLAR_VII_VEGA = 182121003;
    public static final int STELLAR_VII_VEGA_SUB1 = 182121004;
    public static final int STELLAR_VII_VEGA_SUB2 = 182121005;
    public static final int STELLAR_VII_VEGA_SUB3 = 182121006;
    public static final int STELLAR_VIII_SADALMELIK = 182121007;
    public static final int STELLAR_VIII_SADALMELIK_SUB1 = 182121008;
    public static final int STELLAR_VIII_SADALMELIK_SUB2 = 182121009;
    public static final int STELLAR_VIII_SADALMELIK_SUB3 = 182121010;
    public static final int APPEAR = 182121011;
    public static final int MAPLE_WARRIOR_SIA = 182121012;
    public static final int PULSE = 182121013;
    public static final int EMPOWERED_RAY = 182121014;
    public static final int ENHANCED_BOOM = 182121015;

    // ===== Hyper Skills =====
    public static final int STELLAR_IX_CANOPUS = 182121041;
    public static final int STELLAR_IX_CANOPUS_SUB = 182121042;
    public static final int STELLAR_X_CAPELLA = 182121043;
    public static final int STELLAR_X_CAPELLA_SUB = 182121044;
    public static final int OBSERVE = 182121045;

    // ===== 5th Job V Skills =====
    public static final int SHINE = 400021142;
    public static final int STELLAR_XI_SIRIUS = 400021143;
    public static final int STELLAR_XII_SADALSUUD = 400021147;
    public static final int SAVIOR_CIRCLE = 400021149;
    public static final int TIME_BLINDER = 400021152;

    // ===== 6th Job HEXA Skills =====
    public static final int SHINE_RAY = 182141000;
    public static final int SHINE_STELLAR_I_ANTARES = 182141001;
    public static final int SHINE_STELLAR_I_ANTARES_SUB = 182141002;
    public static final int CELESTIAL_DESIGN = 182141500;
    public static final int CELESTIAL_DESIGN_SUB = 182141501;

    // Stellagram runtime tracking (Star 1=Ray, Star 2=Boom, Star 3=Pole, Star 4=Link)
    private final List<Integer> stellagramRecord = new ArrayList<>();
    private long lastMarkTime = 0;
    private int lastMarkSkill = 0;

    public SiaAstelle(Char chr) {
        super(chr);
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isSiaAstelle(id);
    }

    @Override
    public void setCharCreationStats(Char chr) {
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.HOME_MAP);
        cs.setJob(JobConstants.JobEnum.SIA_1.getJobId());
        cs.setLevel(10);
        cs.setInt(45);
        cs.setStr(4);
        cs.setDex(4);
        cs.setLuk(4);
        cs.setHp(1000);
        cs.setMaxHp(1000);
        cs.setMp(500);
        cs.setMaxMp(500);
        cs.getExtendSP().addSpToJobLevel(1, 5);
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        // Secondary Weapon: Constellation (1352870)
        Item secondary = ItemData.getItemDeepCopy(1352870);
        if (secondary != null) {
            chr.addItemToInventoryToNewCharacter(EQUIPPED, secondary, true);
            secondary.setInventoryID(chr.getInventoryByType(EQUIPPED).getId());
            secondary.setCharID(chr.getId());
            secondary.setInvType(EQUIPPED);
            secondary.setBagIndex(BodyPart.Shield.getVal());
            secondary.saveToSQL();
            chr.getAvatarData().getAvatarLook().getHairEquips().add(secondary.getItemId());
            chr.getAvatarData().getAvatarLook().updateAvatarLookToSQL();
        }

        // Primary Weapon: Basic Celestial Light (1253000)
        if (chr.getEquippedItemByBodyPart(BodyPart.Weapon) == null) {
            Item weapon = ItemData.getItemDeepCopy(1253000);
            if (weapon != null) {
                chr.addItemToInventoryToNewCharacter(EQUIPPED, weapon, true);
                weapon.setInventoryID(chr.getInventoryByType(EQUIPPED).getId());
                weapon.setCharID(chr.getId());
                weapon.setInvType(EQUIPPED);
                weapon.setBagIndex(BodyPart.Weapon.getVal());
                weapon.saveToSQL();
                chr.getAvatarData().getAvatarLook().setWeaponId(weapon.getItemId());
                chr.getAvatarData().getAvatarLook().updateAvatarLookToSQL();
            }
        }
    }

    @Override
    public void handleLevelUp(short level) {
        super.handleLevelUp(level);
        var sm = chr.getScriptManager();
        short curJob = chr.getJob();
        if (level >= 100 && curJob < JobConstants.JobEnum.SIA_4.getJobId()) {
            sm.setJob(JobConstants.JobEnum.SIA_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_4.getJobId(), 5);
            sm.giveAndEquip(1352873);
            chr.maxSkills();
        } else if (level >= 60 && curJob < JobConstants.JobEnum.SIA_3.getJobId()) {
            sm.setJob(JobConstants.JobEnum.SIA_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 3);
            sm.giveAndEquip(1352872);
        } else if (level >= 30 && curJob < JobConstants.JobEnum.SIA_2.getJobId()) {
            sm.setJob(JobConstants.JobEnum.SIA_2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 3);
            sm.giveAndEquip(1352871);
        }
    }

    @Override
    public void handleJobAdvance() {
        ScriptManagerImpl sm = chr.getScriptManager();
        short curJob = chr.getJob();
        if (curJob == JobConstants.JobEnum.SIA_1.getJobId() || curJob == JobConstants.JobEnum.SIA.getJobId()) {
            if (chr.getLevel() < 30) {
                sm.sendSayOkay("#eThis job requires you to be at least level #r30#k prior to advancement.");
                return;
            }
            if (chr.getLevel() >= 100) {
                sm.setJob(JobConstants.JobEnum.SIA_4.getJobId());
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 5);
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 5);
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_4.getJobId(), 5);
                sm.giveAndEquip(1352873);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Sia] Successfully advanced to 4th Job (18212)!");
            } else if (chr.getLevel() >= 60) {
                sm.setJob(JobConstants.JobEnum.SIA_3.getJobId());
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 5);
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 3);
                sm.giveAndEquip(1352872);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Sia] Successfully advanced to 3rd Job (18211)!");
            } else {
                sm.setJob(JobConstants.JobEnum.SIA_2.getJobId());
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 3);
                sm.giveAndEquip(1352871);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Sia] Successfully advanced to 2nd Job (18210)!");
            }
        } else if (curJob == JobConstants.JobEnum.SIA_2.getJobId()) {
            if (chr.getLevel() < 60) {
                sm.sendSayOkay("#eThis job requires you to be at least level #r60#k prior to advancement.");
                return;
            }
            if (chr.getLevel() >= 100) {
                sm.setJob(JobConstants.JobEnum.SIA_4.getJobId());
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 5);
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 5);
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_4.getJobId(), 5);
                sm.giveAndEquip(1352873);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Sia] Successfully advanced to 4th Job (18212)!");
            } else {
                sm.setJob(JobConstants.JobEnum.SIA_3.getJobId());
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 5);
                sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 3);
                sm.giveAndEquip(1352872);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Sia] Successfully advanced to 3rd Job (18211)!");
            }
        } else if (curJob == JobConstants.JobEnum.SIA_3.getJobId()) {
            if (chr.getLevel() < 100) {
                sm.sendSayOkay("#eThis job requires you to be at least level #r100#k prior to advancement.");
                return;
            }
            sm.setJob(JobConstants.JobEnum.SIA_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_4.getJobId(), 5);
            sm.giveAndEquip(1352873);
            chr.maxSkills();
            chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Sia] Successfully advanced to 4th Job (18212)!");
        } else if (curJob == JobConstants.JobEnum.SIA_4.getJobId()) {
            chr.maxSkills();
            if (chr.getLevel() >= 260) {
                unlockErdaLink();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Sia] 6th Job Erda Link & HEXA Skills unlocked!");
                sm.sendSayOkay("#e[Erda Link]\nCongratulations! 6th Job Erda Link skills have been unlocked!\n#bCelestial Design (Origin), SHINE Ray, SHINE Antares, Sol Janus, and Erda Link Stats#k are now active.");
            } else {
                sm.sendSayOkay("#eYou are already at 4th Job (Sia Astelle). Reach #rLv. 260#k to unlock 6th Job Erda Link!");
            }
        }
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        super.handleInitAfterMigrate(chr);
        ScriptManagerImpl sm = chr.getScriptManager();
        short curJob = chr.getJob();
        if (chr.getLevel() >= 100 && curJob < JobConstants.JobEnum.SIA_4.getJobId()) {
            sm.setJob(JobConstants.JobEnum.SIA_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_4.getJobId(), 5);
            sm.giveAndEquip(1352873);
            chr.maxSkills();
            chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Sia] Job Auto-Repair: Advanced to 4th Job (18212) and maxed all skills!");
        } else if (chr.getLevel() >= 60 && curJob < JobConstants.JobEnum.SIA_3.getJobId()) {
            sm.setJob(JobConstants.JobEnum.SIA_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_3.getJobId(), 3);
            sm.giveAndEquip(1352872);
        } else if (chr.getLevel() < 30) {
            sm.levelUntil(30);
            sm.setJob(JobConstants.JobEnum.SIA_2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.SIA_2.getJobId(), 3);
            sm.giveAndEquip(1253000);
            sm.giveAndEquip(1352871);
            sm.warp(FieldConstants.HOME_MAP);
        }

        if (chr.getJob() == JobConstants.JobEnum.SIA_4.getJobId()) {
            if (!chr.hasSkill(182121000)) {
                chr.maxSkills();
            }
            if (chr.getLevel() >= 260) {
                unlockErdaLink();
            }
        }
    }

    // ===== Erda Link (Sia 6th job / HEXA) =====

    // HexaCore.img job 18212: Origin, Mastery (SHINE Ray + SHINE Antares), 4x Boost, Sol Janus
    private static final int[] SIA_ERDA_LINK_CORES = {10000051, 20000204, 30000205, 30000206, 30000207, 30000208, 40000000};
    private static final int ERDA_FOUNTAIN = 400001064;
    private static final int ERDA_LINK_STATS = 500081000;

    /**
     * Opens every Erda Link core at Lv.1 (only cores that are still locked) and repairs cores whose
     * connected skills are missing. Connected skills are granted by Char#setHexaSkill at the core
     * level (from HexaCore.img), so they are never pre-added at Lv.30 here (that desynced the
     * skill level from the core level shown in the Erda Link / HEXA UI).
     */
    private void unlockErdaLink() {
        boolean changed = false;
        for (int coreId : SIA_ERDA_LINK_CORES) {
            int coreLv = chr.getHexaSkillLevel(coreId);
            if (coreLv <= 0) {
                chr.setHexaSkill(coreId, 1);
                changed = true;
                continue;
            }
            HexaCore.HexaSkillCoreData coreData = HexaCore.getSkillCoreData(coreId);
            List<Integer> connected = coreData != null ? coreData.getConnectSkills() : Char.getSiaErdaLinkSkills(coreId);
            for (int sId : connected) {
                if (!chr.hasSkill(sId)) {
                    chr.setHexaSkill(coreId, coreLv);
                    changed = true;
                    break;
                }
            }
        }
        // Not part of any core row
        if (!chr.hasSkill(ERDA_FOUNTAIN)) {
            chr.addSkill(ERDA_FOUNTAIN, 30, 30);
            changed = true;
        }
        if (!chr.hasSkill(ERDA_LINK_STATS)) {
            chr.addSkill(ERDA_LINK_STATS, 1, 1);
            changed = true;
        }
        if (changed) {
            chr.write(WvsContext.hexaSkillsUpdate(chr));
        }
    }

    // ===== Stellagram Recording & Fusion Engine =====

    private synchronized void recordStellagramMark(int markType, String markName) {
        long now = System.currentTimeMillis();
        // Debounce double-packets within 250ms of the same mark
        if (now - lastMarkTime < 250 && lastMarkSkill == markType) {
            return;
        }
        // Auto-reset if idle for more than 20 seconds
        if (now - lastMarkTime > 20000 && !stellagramRecord.isEmpty()) {
            stellagramRecord.clear();
        }
        lastMarkTime = now;
        lastMarkSkill = markType;

        stellagramRecord.add(markType);
        if (stellagramRecord.size() > 4) {
            stellagramRecord.remove(0); // keep last 4
        }

        // Show combo progress
        StringBuilder sb = new StringBuilder("[Stellagram] ");
        for (int i = 0; i < stellagramRecord.size(); i++) {
            if (i > 0) sb.append(" - ");
            int m = stellagramRecord.get(i);
            switch (m) {
                case 1 -> sb.append("Ray ⭐1");
                case 2 -> sb.append("Boom ⭐2");
                case 3 -> sb.append("Pole ⭐3");
                case 4 -> sb.append("Link ⭐4");
                default -> sb.append("Star");
            }
        }
        sb.append(" (").append(stellagramRecord.size()).append("/4)");
        chr.chatMessage(ChatType.GameDesc, sb.toString());

        // Check for 4-star combinations
        if (stellagramRecord.size() == 4) {
            checkStellagramFusion();
        }
    }

    private void checkStellagramFusion() {
        if (stellagramRecord.size() != 4) return;
        int m1 = stellagramRecord.get(0);
        int m2 = stellagramRecord.get(1);
        int m3 = stellagramRecord.get(2);
        int m4 = stellagramRecord.get(3);

        // 1. Antares (Stellar I): Ray - Ray - Ray - Ray (1, 1, 1, 1)
        if (m1 == 1 && m2 == 1 && m3 == 1 && m4 == 1) {
            stellagramRecord.clear();
            // SHINE Antares (HEXA) replaces Antares once its Mastery core is unlocked
            int antaresId = chr.getSkillLevel(SHINE_STELLAR_I_ANTARES) > 0 ? SHINE_STELLAR_I_ANTARES : STELLAR_I_ANTARES;
            spawnAntares(antaresId, chr.getSkillLevel(antaresId));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] ✨ Stellar I - Antares Activated! (Rabbit Hole Summon)");
            return;
        }

        // 2. Algol (Stellar II): Boom - Boom - Boom - Boom (2, 2, 2, 2)
        if (m1 == 2 && m2 == 2 && m3 == 2 && m4 == 2) {
            stellagramRecord.clear();
            spawnAlgol(chr.getSkillLevel(STELLAR_II_ALGOL));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] 🦎 Stellar II - Algol Activated! (Lizard Summon)");
            return;
        }

        // 3. Bellatrix (Stellar IV): Ray - Ray - Boom - Pole (1, 1, 2, 3)
        if (m1 == 1 && m2 == 1 && m3 == 2 && m4 == 3) {
            stellagramRecord.clear();
            applyBellatrixBuff(STELLAR_IV_BELLATRIX, chr.getSkillLevel(STELLAR_IV_BELLATRIX));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] 💫 Stellar IV - Bellatrix Activated! (Damage Buff & Starlight Link)");
            return;
        }

        // 4. Fomalhaut (Stellar V): Boom - Boom - Boom - Pole (2, 2, 2, 3)
        if (m1 == 2 && m2 == 2 && m3 == 2 && m4 == 3) {
            stellagramRecord.clear();
            applyFomalhautBuff(STELLAR_V_FOMALHAUT, chr.getSkillLevel(STELLAR_V_FOMALHAUT));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] 🐚 Stellar V - Fomalhaut Activated! (Horned Conches Damage Buff)");
            return;
        }

        // 5. Izar (Stellar VI): Boom - Boom - Pole - Link (2, 2, 3, 4)
        if (m1 == 2 && m2 == 2 && m3 == 3 && m4 == 4) {
            stellagramRecord.clear();
            applyIzarBuff(STELLAR_VI_IZAR, chr.getSkillLevel(STELLAR_VI_IZAR));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] ⚔️ Stellar VI - Izar Activated! (Orbiting Blades Final Damage Buff)");
            return;
        }

        // 6. Vega (Stellar VII): Ray - Ray - Ray - Link (1, 1, 1, 4)
        if (m1 == 1 && m2 == 1 && m3 == 1 && m4 == 4) {
            stellagramRecord.clear();
            applyVegaBuff(STELLAR_VII_VEGA, chr.getSkillLevel(STELLAR_VII_VEGA));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] 🕊️ Stellar VII - Vega Activated! (Starlit Gust & Starlight Wings)");
            return;
        }

        // 7. Canopus (Stellar IX): Ray - Ray - Pole - Link (1, 1, 3, 4)
        if (m1 == 1 && m2 == 1 && m3 == 3 && m4 == 4) {
            stellagramRecord.clear();
            spawnCanopus(chr.getSkillLevel(STELLAR_IX_CANOPUS));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] ⚓ Stellar IX - Canopus Activated! (Anchor Summon)");
            return;
        }

        // 8. Capella (Stellar X): Ray - Ray - Boom - Link (1, 1, 2, 4)
        if (m1 == 1 && m2 == 1 && m3 == 2 && m4 == 4) {
            stellagramRecord.clear();
            applyCapellaBuff(STELLAR_X_CAPELLA, chr.getSkillLevel(STELLAR_X_CAPELLA));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] 🌟 Stellar X - Capella Activated! (Crit Rate + Crit DMG Buff)");
            return;
        }

        // 9. Alchiba (Stellar III): 4x Pole (3, 3, 3, 3)
        if (m1 == 3 && m2 == 3 && m3 == 3 && m4 == 3) {
            stellagramRecord.clear();
            applyAlchibaBuff(STELLAR_III_ALCHIBA, chr.getSkillLevel(STELLAR_III_ALCHIBA));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] 🛡️ Stellar III - Alchiba Activated! (Witch's Protection: IED & Magic ATT)");
            return;
        }

        // 10. Sadalmelik (Stellar VIII): 4x Link (4, 4, 4, 4)
        if (m1 == 4 && m2 == 4 && m3 == 4 && m4 == 4) {
            stellagramRecord.clear();
            applySadalmelikBuff(STELLAR_VIII_SADALMELIK, chr.getSkillLevel(STELLAR_VIII_SADALMELIK));
            chr.chatMessage(ChatType.Notice, "[Stellagram Fusion] 👑 Stellar VIII - Sadalmelik Activated! (Invincibility Buff)");
            return;
        }
    }

    // ===== Skill Implementation =====

    @Override
    public void handleSkill(Client c, InPacket inPacket, SkillUseInfo skillUseInfo) {
        Char chr = c.getChr();
        SkillInfo si = skillUseInfo.skillInfo;
        int slv = skillUseInfo.slv;
        int skillID = skillUseInfo.skillID;
        super.handleSkill(c, inPacket, skillUseInfo);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        Option o2 = new Option();

        switch (skillID) {
            // ----- Marking Skills -----
            case RAY_1:
            case RAY_1_SUB:
            case EMPOWERED_RAY:
            case SHINE_RAY:
                recordStellagramMark(1, "Ray");
                chr.dispose();
                break;

            case BOOM_2:
            case ENHANCED_BOOM:
                recordStellagramMark(2, "Boom");
                chr.dispose();
                break;

            case POLE_3:
            case POLE_3_SUB:
                spawnPole(slv);
                recordStellagramMark(3, "Pole");
                chr.dispose();
                break;

            case LINK_4:
                // Restores 20% Max HP
                int healPercent = si != null && si.getValue(SkillStat.hp, slv) > 0 ? si.getValue(SkillStat.hp, slv) : 20;
                chr.heal((int) (chr.getMaxHP() * (healPercent / 100.0)));
                recordStellagramMark(4, "Link");
                chr.dispose();
                break;

            // ----- Movement / Teleport Skills -----
            case STARRY_FLOW:
            case STARRY_LEAP:
                chr.dispose();
                break;

            // ----- Direct Hotkey / Constellation Skills -----
            case STELLAR_I_ANTARES:
            case STELLAR_I_ANTARES_SUB:
            case SHINE_STELLAR_I_ANTARES:
            case SHINE_STELLAR_I_ANTARES_SUB:
                spawnAntares(skillID, slv);
                chr.dispose();
                break;

            case STELLAR_II_ALGOL:
            case STELLAR_II_ALGOL_SUB1:
            case STELLAR_II_ALGOL_SUB2:
            case STELLAR_II_ALGOL_SUB3:
                spawnAlgol(slv);
                chr.dispose();
                break;

            case STELLAR_III_ALCHIBA:
            case STELLAR_III_ALCHIBA_SUB:
                applyAlchibaBuff(skillID, slv);
                chr.dispose();
                break;

            case STELLAR_IV_BELLATRIX:
            case STELLAR_IV_BELLATRIX_SUB:
                applyBellatrixBuff(skillID, slv);
                chr.dispose();
                break;

            case STELLAR_V_FOMALHAUT:
            case STELLAR_V_FOMALHAUT_SUB1:
            case STELLAR_V_FOMALHAUT_SUB2:
                applyFomalhautBuff(skillID, slv);
                chr.dispose();
                break;

            case STELLAR_VI_IZAR:
            case STELLAR_VI_IZAR_SUB:
                applyIzarBuff(skillID, slv);
                chr.dispose();
                break;

            case STELLAR_VII_VEGA:
            case STELLAR_VII_VEGA_SUB1:
            case STELLAR_VII_VEGA_SUB2:
            case STELLAR_VII_VEGA_SUB3:
                applyVegaBuff(skillID, slv);
                chr.dispose();
                break;

            case STELLAR_VIII_SADALMELIK:
            case STELLAR_VIII_SADALMELIK_SUB1:
            case STELLAR_VIII_SADALMELIK_SUB2:
            case STELLAR_VIII_SADALMELIK_SUB3:
                applySadalmelikBuff(skillID, slv);
                chr.dispose();
                break;

            case STELLAR_IX_CANOPUS:
            case STELLAR_IX_CANOPUS_SUB:
                spawnCanopus(slv);
                chr.dispose();
                break;

            case STELLAR_X_CAPELLA:
            case STELLAR_X_CAPELLA_SUB:
                applyCapellaBuff(skillID, slv);
                chr.dispose();
                break;

            // ----- Active Buffs -----
            case CELESTIAL_ALIGNMENT:
                o1.nReason = skillID;
                o1.nValue = si != null && si.getValue(SkillStat.indieCD, slv) > 0 ? si.getValue(SkillStat.indieCD, slv) : 15;
                o1.tTerm = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 180;
                tsm.sendStat(CharacterTemporaryStat.IndieCD, o1);
                chr.dispose();
                break;

            case APPEAR:
                o1.nReason = skillID;
                o1.nValue = si != null && si.getValue(SkillStat.indiePMdR, slv) > 0 ? si.getValue(SkillStat.indiePMdR, slv) : 25;
                o1.tTerm = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 30;
                tsm.sendStat(CharacterTemporaryStat.IndiePMdR, o1);
                chr.dispose();
                break;

            case OBSERVE:
                o1.nReason = skillID;
                o1.nValue = si != null && si.getValue(SkillStat.indieDamR, slv) > 0 ? si.getValue(SkillStat.indieDamR, slv) : 15;
                o1.tTerm = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 60;
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                chr.dispose();
                break;

            case MAPLE_WARRIOR_SIA:
                o1.nReason = skillID;
                o1.nValue = si != null && si.getValue(SkillStat.x, slv) > 0 ? si.getValue(SkillStat.x, slv) : 15;
                o1.tTerm = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 900;
                tsm.sendStat(CharacterTemporaryStat.BasicStatUp, o1);
                chr.dispose();
                break;

            case PULSE:
                tsm.removeAllDebuffs();
                chr.dispose();
                break;

            case STARLIGHT_1:
            case STARLIGHT_1_SUB:
                if (tsm.hasStatBySkillId(STARLIGHT_1)) {
                    tsm.removeStatsBySkill(STARLIGHT_1);
                } else {
                    o1.nOption = 1;
                    o1.rOption = STARLIGHT_1;
                    tsm.sendStat(CharacterTemporaryStat.IndieEmpty, o1);
                }
                chr.dispose();
                break;

            case STARRY_BOOST:
                if (tsm.hasStatBySkillId(STARRY_BOOST)) {
                    tsm.removeStatsBySkill(STARRY_BOOST);
                } else {
                    o1.nOption = 1;
                    o1.rOption = STARRY_BOOST;
                    tsm.sendStat(CharacterTemporaryStat.IndieEmpty, o1);
                }
                chr.dispose();
                break;

            // ----- 5th Job V Skills -----
            case SHINE:
                o1.nReason = skillID;
                o1.nValue = si != null && si.getValue(SkillStat.indieDamR, slv) > 0 ? si.getValue(SkillStat.indieDamR, slv) : 30;
                o1.tTerm = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 30;
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                chr.chatMessage(ChatType.Notice, "[Shine] Celestial radiance floods the battlefield!");
                chr.dispose();
                break;

            case STELLAR_XI_SIRIUS:
                if (chr.getField() != null) {
                    Summon summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                    summon.setMoveAbility(MoveAbility.Stop);
                    summon.setAssistType(AssistType.Attack);
                    chr.getField().spawnSummon(summon);
                }
                chr.dispose();
                break;

            case STELLAR_XII_SADALSUUD:
                chr.heal((int) (chr.getMaxHP() * 0.5));
                o1.nReason = skillID;
                o1.nValue = 20;
                o1.tTerm = 15;
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                chr.chatMessage(ChatType.Notice, "[Sadalsuud] Blessed water of fortune heals 50% HP!");
                chr.dispose();
                break;

            case SAVIOR_CIRCLE:
                o1.nReason = skillID;
                o1.nValue = 1;
                o1.tTerm = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 10;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                chr.chatMessage(ChatType.Notice, "[Savior Circle] Star sanctuary protects you from harm!");
                chr.dispose();
                break;

            case TIME_BLINDER:
                o1.nReason = skillID;
                o1.nValue = 20;
                o1.tTerm = 15;
                tsm.sendStat(CharacterTemporaryStat.IndiePMdR, o1);
                chr.dispose();
                break;

            // ----- 6th Job Origin Skill -----
            case CELESTIAL_DESIGN:
            case CELESTIAL_DESIGN_SUB:
                o1.nReason = skillID;
                o1.nValue = 1;
                o1.tTerm = 7;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                chr.chatMessage(ChatType.Notice, "[Origin] Celestial Design unleashed! Primordial starlight purifies the universe.");
                chr.dispose();
                break;

            default:
                chr.dispose();
                break;
        }
    }

    // ===== Attack Implementation =====

    @Override
    public void handleAttack(Client c, AttackInfo attackInfo, SkillInfo si, long now) {
        Char chr = c.getChr();
        super.handleAttack(c, attackInfo, si, now);
        int skillID = attackInfo.skillId;

        // Record marking skills on hit
        switch (skillID) {
            case RAY_1:
            case RAY_1_SUB:
            case EMPOWERED_RAY:
            case SHINE_RAY:
                recordStellagramMark(1, "Ray");
                break;
            case BOOM_2:
            case ENHANCED_BOOM:
                recordStellagramMark(2, "Boom");
                break;
        }

        // Time Blinder Bind (10s freeze on mobs)
        if (skillID == TIME_BLINDER) {
            for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                if (mob != null && mob.getHp() > 0) {
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    Option o = new Option();
                    o.nOption = 1;
                    o.rOption = skillID;
                    o.tOption = 10;
                    mts.addStatOptions(mob, MobStat.Freeze, o);
                }
            }
        }

        // Origin Skill Celestial Design (10s Absolute Freeze / Bind)
        if (skillID == CELESTIAL_DESIGN || skillID == CELESTIAL_DESIGN_SUB) {
            for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                if (mob != null && mob.getHp() > 0) {
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    Option o = new Option();
                    o.nOption = 1;
                    o.rOption = skillID;
                    o.tOption = 10;
                    mts.addStatOptions(mob, MobStat.Freeze, o);
                }
            }
        }
    }

    // ===== Helper Spawn & Buff Methods =====

    private void spawnAntares(int skillID, int slv) {
        // SHINE Antares has its own summon node (182141001); spawning 182001001 with a HEXA level was wrong
        int summonId = (skillID == SHINE_STELLAR_I_ANTARES || skillID == SHINE_STELLAR_I_ANTARES_SUB)
                ? SHINE_STELLAR_I_ANTARES : STELLAR_I_ANTARES;
        if (slv <= 0) {
            slv = chr.getSkillLevel(summonId);
        }
        if (slv > 0 && chr.getField() != null) {
            Summon summon = Summon.getSummonByAndSetStat(chr, summonId, slv);
            summon.setMoveAbility(MoveAbility.Stop);
            summon.setAssistType(AssistType.Attack);
            chr.getField().spawnSummon(summon);
        }
    }

    private void spawnAlgol(int slv) {
        if (slv > 0 && chr.getField() != null) {
            Summon summon = Summon.getSummonByAndSetStat(chr, STELLAR_II_ALGOL, slv);
            summon.setMoveAbility(MoveAbility.Stop);
            summon.setAssistType(AssistType.Attack);
            chr.getField().spawnSummon(summon);
        }
    }

    private void spawnPole(int slv) {
        if (chr.getField() != null) {
            Summon summon = Summon.getSummonByAndSetStat(chr, POLE_3, slv);
            summon.setMoveAbility(MoveAbility.Stop);
            summon.setAssistType(AssistType.Attack);
            chr.getField().spawnSummon(summon);
        }
    }

    private void applyFomalhautBuff(int skillID, int slv) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        o1.nReason = skillID;
        o1.nValue = 20; // 20% Damage
        o1.tTerm = 30;
        tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
    }

    private void applyIzarBuff(int skillID, int slv) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        o1.nReason = skillID;
        o1.nValue = 25; // 25% Final Damage / Orbiting Blades
        o1.tTerm = 40;
        tsm.sendStat(CharacterTemporaryStat.IndiePMdR, o1);
    }

    private void spawnCanopus(int slv) {
        if (slv > 0 && chr.getField() != null) {
            Summon summon = Summon.getSummonByAndSetStat(chr, STELLAR_IX_CANOPUS, slv);
            summon.setMoveAbility(MoveAbility.Stop);
            summon.setAssistType(AssistType.Attack);
            chr.getField().spawnSummon(summon);
        }
    }

    private void applyAlchibaBuff(int skillID, int slv) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        o1.nReason = skillID;
        o1.nValue = 30; // 30% IED
        o1.tTerm = 60;
        tsm.sendStat(CharacterTemporaryStat.IndieIgnoreMobpdpR, o1);

        Option o2 = new Option();
        o2.nReason = skillID;
        o2.nValue = 40; // 40 Magic ATT
        o2.tTerm = 60;
        tsm.sendStat(CharacterTemporaryStat.IndieMAD, o2);
    }

    private void applyBellatrixBuff(int skillID, int slv) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        o1.nReason = skillID;
        o1.nValue = 20; // 20% Damage
        o1.tTerm = 60;
        tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
    }

    private void applyVegaBuff(int skillID, int slv) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        o1.nReason = skillID;
        o1.nValue = 25; // 25% Damage / Starlight Wings
        o1.tTerm = 45;
        tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
    }

    private void applySadalmelikBuff(int skillID, int slv) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        o1.nReason = skillID;
        o1.nValue = 1;
        o1.tTerm = 5; // 5s Invincible
        tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);

        Option o2 = new Option();
        o2.nReason = skillID;
        o2.nValue = -40; // -40% Damage Taken
        o2.tTerm = 15;
        tsm.sendStat(CharacterTemporaryStat.IndieDamReduceR, o2);
    }

    private void applyCapellaBuff(int skillID, int slv) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        o1.nReason = skillID;
        o1.nValue = 20; // 20% Crit Rate
        o1.tTerm = 60;
        tsm.sendStat(CharacterTemporaryStat.IndieCrR, o1);

        Option o2 = new Option();
        o2.nReason = skillID;
        o2.nValue = 20; // 20% Crit DMG
        o2.tTerm = 60;
        tsm.sendStat(CharacterTemporaryStat.IndieCD, o2);
    }
}
