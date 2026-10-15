package net.swordie.ms.client.jobs.flora;

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
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.ChatType;
import net.swordie.ms.life.AffectedArea;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Rect;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Field;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;

import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;
import static net.swordie.ms.enums.InvType.EQUIPPED;

public class Khali extends Job {

    // ===== Beginner (15003) =====
    public static final int MAGIC_CONVERSION = 150030079;
    public static final int INNATE_GIFT = 150030241;
    public static final int EXCLUSIVE_SPELL_KHALI = 150031005;
    public static final int REMINISCENCE = 150031074;
    public static final int DESERT_BORN = 150031242;

    // ===== 1st Job (15400) =====
    public static final int ARTS_CROSS_CUT = 154001000;
    public static final int SPARK = 154001001;
    public static final int SPARK_2 = 154001002;
    public static final int VOID_RUSH = 154001003;
    public static final int FLARE = 154000004;
    public static final int PATIENCE = 154000005;

    // ===== 2nd Job (15410) =====
    public static final int ARTS_DUAL_EDGE = 154101000;
    public static final int ARTS_CRESCENTUM = 154101001;
    public static final int ARTS_CRESCENTUM_2 = 154101002;
    public static final int VOID_RUSH_2 = 154101004;
    public static final int CHAKRAM_BOOSTER = 154101005;
    public static final int DESERT_VEIL_1 = 154101009;
    public static final int INSANITY_1 = 154100003;
    public static final int CHAKRAM_MASTERY = 154100006;
    public static final int PHYSICAL_TRAINING = 154100007;
    public static final int IMPULSE = 154100008;

    // ===== 3rd Job (15411) =====
    public static final int RESONATE_SUB = 154110000;
    public static final int RESONATE = 154110001;
    public static final int INSANITY_2 = 154110003;
    public static final int DECEIVING_BLADE = 154110005;
    public static final int INTUITION = 154110008;
    public static final int VIGILANCE = 154110009;
    public static final int SUMMON_CHAKRI = 154110010;
    public static final int SUMMON_CHAKRI_EFFECT = 154111000;
    public static final int ARTS_TRIPLE_BASH = 154111002;
    public static final int ARTS_TRIPLE_BASH_2 = 154111003;
    public static final int VOID_RUSH_3 = 154111004;
    public static final int HEX_CHAKRAM_SWEEP = 154111006;
    public static final int VOID_ENHANCE = 154111007;

    // ===== 4th Job (15412) =====
    public static final int RESONATE_4 = 154120003;
    public static final int RESONATE_4_SUB = 154120004;
    public static final int CHAKRAM_EXPERT = 154120007;
    public static final int INSANITY_3 = 154120008;
    public static final int ASCEND = 154120010;
    public static final int REDEMPTION = 154120011;
    public static final int ARTS_FLURRY = 154121000;
    public static final int HEX_CHAKRAM_SPLIT = 154121001;
    public static final int HEX_CHAKRAM_FURY = 154121002;
    public static final int HEX_CHAKRAM_FURY_2 = 154121003;
    public static final int VOID_BLITZ = 154121003;
    public static final int DESERT_VEIL = 154121004;
    public static final int HERO_OF_THE_FLORA = 154121005;
    public static final int FLORAN_HEROS_WILL = 154121006;
    public static final int VOID_BLITZ_1 = 154121007;
    public static final int VOID_BLITZ_2 = 154121008;
    public static final int VOID_RUSH_4 = 154121009;
    public static final int VOID_BLITZ_3 = 154121010;
    public static final int VOID_BLITZ_4 = 154121011;
    public static final int VOID_RUSH_5 = 154121012;
    public static final int VOID_RUSH_4_DIAG_DOWN = 154121013;
    public static final int VOID_RUSH_4_DOWN = 154121014;
    public static final int VOID_RUSH_4_DIAG_UP = 154121015;
    public static final int DEATH_BLOSSOM = 154121041;
    public static final int DIVINE_WRATH = 154121042;
    public static final int OBLIVION = 154121043;

    // ===== 6th Job HEXA Origin Skills (15414) =====
    public static final int HEX_SANDSTORM = 154141500;
    public static final int HEX_SANDSTORM_1 = 154141501;
    public static final int HEX_SANDSTORM_2 = 154141502;
    public static final int HEX_SANDSTORM_3 = 154141503;
    public static final int WAKE_THE_VOID = 154141504;
    public static final int WAKE_THE_VOID_EXPLOSION = 154141505;

    // ===== 6th Job HEXA Mastery Skills =====
    public static final int HEXA_ARTS_FLURRY = 154141000;
    public static final int HEXA_ARTS_CRESCENTUM = 154141001;
    public static final int HEXA_ARTS_CRESCENTUM_2 = 154141002;
    public static final int HEXA_VOID_RUSH = 154141003;
    public static final int HEXA_VOID_RUSH_2 = 154141004;
    public static final int HEXA_VOID_RUSH_3 = 154141005;
    public static final int HEXA_VOID_RUSH_4 = 154141006;
    public static final int HEXA_VOID_BLITZ = 154141007;
    public static final int HEXA_VOID_BLITZ_2 = 154141008;
    public static final int HEXA_CHAKRAM_SPLIT = 154141009;
    public static final int HEXA_CHAKRAM_FURY = 154141010;
    public static final int HEXA_CHAKRAM_SWEEP = 154141011;
    public static final int HEXA_DEATH_BLOSSOM = 154141012;
    public static final int HEXA_RESONATE = 154141013;
    public static final int HEXA_DECEIVING_BLADE = 154141014;

    // ===== V Skills (5th Job) =====
    public static final int HEX_PANDEMONIUM = 400041082;
    public static final int HEX_PANDEMONIUM_2 = 400041083;
    public static final int VOID_BURST = 400041084;
    public static final int VOID_BURST_SLASH = 400041085;
    public static final int VOID_BURST_FINAL = 400041086;
    public static final int ARTS_ASTRA = 400041087;
    public static final int ARTS_ASTRA_SUB = 400041088;
    public static final int RESONATE_ULTIMATUM = 400041089;
    public static final int RESONATE_ULTIMATUM_2 = 400041090;

    public static final int[] HEX_SKILLS = new int[]{
            HEX_CHAKRAM_SWEEP,
            HEX_CHAKRAM_SPLIT,
            HEX_CHAKRAM_FURY,
            HEX_CHAKRAM_FURY_2,
            HEX_SANDSTORM,
            HEX_SANDSTORM_1,
            HEX_SANDSTORM_2,
            HEX_SANDSTORM_3,
            HEX_PANDEMONIUM,
            HEX_PANDEMONIUM_2,
            DEATH_BLOSSOM,
            HEXA_CHAKRAM_SWEEP,
            HEXA_CHAKRAM_SPLIT,
            HEXA_CHAKRAM_FURY,
            HEXA_DEATH_BLOSSOM
    };

    public static final int[] VOID_SKILLS = new int[]{
            SPARK,
            SPARK_2,
            VOID_RUSH,
            VOID_RUSH_2,
            VOID_RUSH_3,
            VOID_RUSH_4,
            VOID_RUSH_5,
            VOID_RUSH_4_DIAG_DOWN,
            VOID_RUSH_4_DOWN,
            VOID_RUSH_4_DIAG_UP,
            VOID_BLITZ,
            VOID_BLITZ_1,
            VOID_BLITZ_2,
            VOID_BLITZ_3,
            VOID_BLITZ_4,
            VOID_BURST,
            VOID_BURST_SLASH,
            VOID_BURST_FINAL,
            HEXA_VOID_BLITZ,
            HEXA_VOID_BLITZ_2,
            HEXA_VOID_RUSH,
            HEXA_VOID_RUSH_2,
            HEXA_VOID_RUSH_3,
            HEXA_VOID_RUSH_4,
            WAKE_THE_VOID,
            WAKE_THE_VOID_EXPLOSION
    };

    public Khali(Char chr) {
        super(chr);
    }

    public static boolean isArtsSkill(int skillID) {
        return skillID == ARTS_CROSS_CUT
                || skillID == ARTS_DUAL_EDGE
                || skillID == ARTS_CRESCENTUM
                || skillID == ARTS_CRESCENTUM_2
                || skillID == ARTS_TRIPLE_BASH
                || skillID == ARTS_TRIPLE_BASH_2
                || skillID == ARTS_FLURRY
                || skillID == ARTS_ASTRA
                || skillID == ARTS_ASTRA_SUB
                || skillID == HEXA_ARTS_FLURRY
                || skillID == HEXA_ARTS_CRESCENTUM
                || skillID == HEXA_ARTS_CRESCENTUM_2;
    }

    public static boolean isHexSkill(int skillID) {
        for (int id : HEX_SKILLS) {
            if (id == skillID) {
                return true;
            }
        }
        return false;
    }

    public static boolean isVoidSkill(int skillID) {
        for (int id : VOID_SKILLS) {
            if (id == skillID) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isKhali(id);
    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.HENESYS_ID);
        cs.setJob(JobConstants.JobEnum.KHALI_1.getJobId()); // Start directly as 1st Job Khali (15400)
        cs.setLevel(10);
        cs.setStr(4);
        cs.setDex(4);
        cs.setInt(4);
        cs.setLuk(45);
        cs.setHp(1000);
        cs.setMaxHp(1000);
        cs.setMp(500);
        cs.setMaxMp(500);
        cs.getExtendSP().addSpToJobLevel(1, 5);
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        // Secondary Weapon: Plain Hex Seeker (1354030)
        Item secondary = ItemData.getItemDeepCopy(1354030);
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

        // Primary Weapon: Eneth Canis (Lv.10 Chakram, 1404000)
        if (chr.getEquippedItemByBodyPart(BodyPart.Weapon) == null) {
            Item weapon = ItemData.getItemDeepCopy(1404000);
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

    private void ensureBeginnerSkills(Char chr) {
        if (!chr.hasSkill(REMINISCENCE)) {
            chr.addSkill(REMINISCENCE, 1, 1);
        }
        if (!chr.hasSkill(MAGIC_CONVERSION)) {
            chr.addSkill(MAGIC_CONVERSION, 1, 1);
        }
        if (!chr.hasSkill(INNATE_GIFT)) {
            chr.addSkill(INNATE_GIFT, 1, 1);
        }
        if (chr.getLevel() >= 200 && !chr.hasSkill(EXCLUSIVE_SPELL_KHALI)) {
            chr.addSkill(EXCLUSIVE_SPELL_KHALI, 1, 1);
        }
    }

    @Override
    public void handleLevelUp(short level) {
        super.handleLevelUp(level);
        ScriptManagerImpl sm = chr.getScriptManager();
        short curJob = chr.getJob();
        ensureBeginnerSkills(chr);
        if (level >= 100 && curJob < JobConstants.JobEnum.KHALI_4.getJobId()) {
            sm.setJob(JobConstants.JobEnum.KHALI_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_4.getJobId(), 5);
            sm.giveAndEquip(1354033);
            chr.maxSkills();
            chr.chatMessage(ChatType.Notice, "[Khali] Advanced to 4th Job! New skills unlocked.");
        } else if (level >= 60 && curJob < JobConstants.JobEnum.KHALI_3.getJobId()) {
            sm.setJob(JobConstants.JobEnum.KHALI_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_3.getJobId(), 5);
            sm.giveAndEquip(1354032);
            chr.maxSkills();
            chr.chatMessage(ChatType.Notice, "[Khali] Advanced to 3rd Job! New skills unlocked.");
        } else if (level >= 30 && curJob < JobConstants.JobEnum.KHALI_2.getJobId()) {
            sm.setJob(JobConstants.JobEnum.KHALI_2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_2.getJobId(), 5);
            sm.giveAndEquip(1354031);
            chr.maxSkills();
            chr.chatMessage(ChatType.Notice, "[Khali] Advanced to 2nd Job! New skills unlocked.");
        }
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        super.handleInitAfterMigrate(chr);
        ScriptManagerImpl sm = chr.getScriptManager();
        short curJob = chr.getJob();
        ensureBeginnerSkills(chr);

        // Auto-repair wrong Hoyoung starter items (1292000 / 1354040) on existing Khali characters
        Item equippedWeapon = chr.getEquippedItemByBodyPart(BodyPart.Weapon);
        if (equippedWeapon == null || equippedWeapon.getItemId() == 1292000) {
            sm.giveAndEquip(1404000);
        }
        Item equippedSecondary = chr.getEquippedItemByBodyPart(BodyPart.Shield);
        if (equippedSecondary == null || equippedSecondary.getItemId() == 1354040) {
            sm.giveAndEquip(chr.getLevel() >= 100 ? 1354033 : (chr.getLevel() >= 60 ? 1354032 : (chr.getLevel() >= 30 ? 1354031 : 1354030)));
        }

        if (chr.getLevel() >= 100 && curJob < JobConstants.JobEnum.KHALI_4.getJobId()) {
            sm.setJob(JobConstants.JobEnum.KHALI_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_4.getJobId(), 5);
            sm.giveAndEquip(1354033);
            chr.maxSkills();
            chr.chatMessage(ChatType.Notice, "[Khali] Job Auto-Repair: Advanced to 4th Job (15412) and maxed all skills!");
        } else if (chr.getLevel() >= 60 && curJob < JobConstants.JobEnum.KHALI_3.getJobId()) {
            sm.setJob(JobConstants.JobEnum.KHALI_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_3.getJobId(), 5);
            sm.giveAndEquip(1354032);
            chr.maxSkills();
        } else if (chr.getLevel() >= 10 && curJob == JobConstants.JobEnum.KHALI.getJobId()) {
            sm.setJob(JobConstants.JobEnum.KHALI_1.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_1.getJobId(), 5);
            chr.chatMessage(ChatType.Notice, "[Khali] Initialized 1st Job (15400) successfully.");
        }

        if (chr.getJob() == JobConstants.JobEnum.KHALI_4.getJobId() && !chr.hasSkill(154121000)) {
            chr.maxSkills();
        }
    }

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
            case SUMMON_CHAKRI_EFFECT:
                if (tsm.hasStatBySkillId(SUMMON_CHAKRI_EFFECT)) {
                    tsm.removeStatsBySkill(SUMMON_CHAKRI_EFFECT);
                } else {
                    o1.nOption = 1;
                    o1.rOption = SUMMON_CHAKRI_EFFECT;
                    tsm.sendStat(CharacterTemporaryStat.SummonChakri, o1);
                }
                chr.dispose();
                break;
            case VOID_ENHANCE:
                if (tsm.hasStatBySkillId(VOID_ENHANCE)) {
                    tsm.removeStatsBySkill(VOID_ENHANCE);
                } else {
                    o1.nOption = 1;
                    o1.rOption = VOID_ENHANCE;
                    tsm.sendStat(CharacterTemporaryStat.ShadowAcceleration, o1);
                }
                chr.dispose();
                break;
            case DESERT_VEIL:
                int veilTime = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 4;
                o1.nReason = skillID;
                o1.nOption = 1;
                o1.nValue = 1;
                o1.tTerm = veilTime;
                o1.tOption = veilTime;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                chr.dispose();
                break;
            case DEATH_BLOSSOM:
            case HEXA_DEATH_BLOSSOM:
                if (chr.getField() != null) {
                    net.swordie.ms.life.Summon summon = net.swordie.ms.life.Summon.getSummonByAndSetStat(chr, skillID, slv);
                    summon.setMoveAbility(net.swordie.ms.enums.MoveAbility.Stop);
                    summon.setAssistType(net.swordie.ms.enums.AssistType.Attack);
                    chr.getField().spawnSummon(summon);
                }
                spawnResonateUltimatumVortices(chr);
                chr.dispose();
                break;
            case DIVINE_WRATH:
            case EXCLUSIVE_SPELL_KHALI:
                o1.nReason = skillID;
                o1.nValue = si != null && si.getValue(SkillStat.indieDamR, slv) > 0 ? si.getValue(SkillStat.indieDamR, slv) : (skillID == DIVINE_WRATH ? 10 : 4);
                o1.tTerm = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : (skillID == DIVINE_WRATH ? 60 : 40);
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                chr.dispose();
                break;
            case OBLIVION:
                int obTime = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 30;
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = obTime;

                o2.nReason = skillID;
                o2.nValue = si != null && si.getValue(SkillStat.indiePMdR, slv) > 0 ? si.getValue(SkillStat.indiePMdR, slv) : 30;
                o2.tTerm = obTime;

                EnumMap<CharacterTemporaryStat, Option> obStats = new EnumMap<>(CharacterTemporaryStat.class);
                obStats.put(CharacterTemporaryStat.Oblivion, o1);
                obStats.put(CharacterTemporaryStat.IndiePMdR, o2);
                tsm.sendStat(obStats);

                for (int voidSkill : VOID_SKILLS) {
                    chr.resetSkillCoolTime(voidSkill);
                }
                chr.dispose();
                break;
            case VOID_BURST:
            case VOID_BURST_SLASH:
            case VOID_BURST_FINAL:
                o1.nReason = VOID_BURST;
                o1.nOption = 1;
                o1.nValue = 1;
                o1.tTerm = 5;
                o1.tOption = 5;

                o2.nOption = 5;
                o2.rOption = VOID_BURST;
                o2.tOption = 5;

                EnumMap<CharacterTemporaryStat, Option> vbStats = new EnumMap<>(CharacterTemporaryStat.class);
                vbStats.put(CharacterTemporaryStat.IndieNotDamaged, o1);
                vbStats.put(CharacterTemporaryStat.ShadowBurst, o2);
                tsm.sendStat(vbStats);

                triggerResonate(chr);
                chr.dispose();
                break;
            case RESONATE_ULTIMATUM:
            case RESONATE_ULTIMATUM_2:
                int ultTime = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 30;
                o1.nOption = 1;
                o1.rOption = RESONATE_ULTIMATUM;
                o1.tOption = ultTime;
                tsm.sendStat(CharacterTemporaryStat.KhaliUltimatum, o1);
                spawnResonateUltimatumVortices(chr);
                chr.dispose();
                break;
            case HEX_SANDSTORM:
            case HEX_SANDSTORM_1:
            case HEX_SANDSTORM_2:
            case HEX_SANDSTORM_3:
            case WAKE_THE_VOID:
            case WAKE_THE_VOID_EXPLOSION:
                o1.nReason = skillID;
                o1.nOption = 1;
                o1.nValue = 1;
                o1.tTerm = 7;
                o1.tOption = 7;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                chr.write(UserLocal.showHexaSkillEff(chr));
                for (int voidSkill : VOID_SKILLS) {
                    chr.resetSkillCoolTime(voidSkill);
                }
                triggerResonate(chr);
                chr.dispose();
                break;
            case FLORAN_HEROS_WILL:
                tsm.removeAllDebuffs();
                chr.dispose();
                break;
            default:
                chr.dispose();
                break;
        }

        // Void Rush usage checks for nearby Chakram Vortex trigger
        if (isVoidSkill(skillID)) {
            triggerResonate(chr);
        }
    }

    @Override
    public void handleAttack(Client c, AttackInfo attackInfo, SkillInfo si, long now) {
        Char chr = c.getChr();
        super.handleAttack(c, attackInfo, si, now);
        int skillID = attackInfo.skillId;
        TemporaryStatManager tsm = chr.getTemporaryStatManager();

        // Arts skills reduce cooldown of Void Rush & Void Blitz skills on hit
        if (isArtsSkill(skillID) && !attackInfo.mobAttackInfo.isEmpty()) {
            int cdrMs = (skillID == ARTS_CRESCENTUM || skillID == ARTS_CRESCENTUM_2
                    || skillID == HEXA_ARTS_CRESCENTUM || skillID == HEXA_ARTS_CRESCENTUM_2) ? 5000 : 1000;
            for (int voidSkill : VOID_SKILLS) {
                if (chr.hasSkillOnCooldown(voidSkill)) {
                    chr.reduceSkillCoolTime(voidSkill, cdrMs);
                }
            }
            for (int hexSkill : HEX_SKILLS) {
                if (chr.hasSkillOnCooldown(hexSkill)) {
                    chr.reduceSkillCoolTime(hexSkill, 1000);
                }
            }
        }

        // Void skills grant 2s Dark Sight (Desert Veil), proc Deceiving Blade, and spawn Chakri
        if (isVoidSkill(skillID) && !attackInfo.mobAttackInfo.isEmpty()) {
            if (chr.hasSkill(DESERT_VEIL_1)) {
                Option oDs = new Option();
                oDs.nOption = 1;
                oDs.rOption = DESERT_VEIL_1;
                oDs.tOption = 2;
                tsm.sendStat(CharacterTemporaryStat.DarkSight, oDs);
            }
            int dbSkill = chr.hasSkill(HEXA_DECEIVING_BLADE) ? HEXA_DECEIVING_BLADE : (chr.hasSkill(DECEIVING_BLADE) ? DECEIVING_BLADE : 0);
            if (dbSkill > 0 && !chr.hasSkillOnCooldown(dbSkill)) {
                Option oDb = new Option();
                oDb.nOption = 1;
                oDb.rOption = dbSkill;
                oDb.tOption = 20;
                tsm.sendStat(CharacterTemporaryStat.DeceivingBlade, oDb);
                chr.addSkillCoolTime(dbSkill, 10000);
            }
            if (chr.hasSkill(SUMMON_CHAKRI) || chr.hasSkill(SUMMON_CHAKRI_EFFECT) || chr.getJob() >= JobConstants.JobEnum.KHALI_3.getJobId()) {
                spawnChakriVortex(chr, attackInfo.mobAttackInfo.get(0).mobId);
            }
            triggerResonate(chr);
        }

        // Hex skills trigger Resonate, heal HP/MP (Sparkle/Redemption), and spawn Chakri
        if (isHexSkill(skillID) && !attackInfo.mobAttackInfo.isEmpty()) {
            chr.heal(Math.max(1, chr.getMaxHP() / 20));
            chr.healMP(Math.max(1, chr.getMaxMP() / 20));
            if (chr.hasSkill(SUMMON_CHAKRI) || chr.hasSkill(SUMMON_CHAKRI_EFFECT) || chr.getJob() >= JobConstants.JobEnum.KHALI_3.getJobId()) {
                spawnChakriVortex(chr, attackInfo.mobAttackInfo.get(0).mobId);
            }
            triggerResonate(chr);
        }

        // 6th Job Origin Skills (Hex: Sandstorm & Wake the Void): 10s Absolute Freeze/Bind + 20s OriginDebuff
        if (skillID == HEX_SANDSTORM || skillID == HEX_SANDSTORM_1 || skillID == HEX_SANDSTORM_2 || skillID == HEX_SANDSTORM_3
                || skillID == WAKE_THE_VOID || skillID == WAKE_THE_VOID_EXPLOSION) {
            int originRoot = (skillID == WAKE_THE_VOID || skillID == WAKE_THE_VOID_EXPLOSION) ? WAKE_THE_VOID : HEX_SANDSTORM;
            for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                if (mob != null && mob.getHp() > 0) {
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    Option oFreeze = new Option();
                    oFreeze.nOption = 1;
                    oFreeze.rOption = originRoot;
                    oFreeze.tOption = 10;
                    oFreeze.cOption = chr.getId();

                    Option oDebuff = new Option();
                    oDebuff.nOption = 1;
                    oDebuff.rOption = originRoot;
                    oDebuff.tOption = 20;

                    EnumMap<MobStat, Option> stats = new EnumMap<>(MobStat.class);
                    stats.put(MobStat.Freeze, oFreeze);
                    stats.put(MobStat.OriginDebuff, oDebuff);
                    mts.addStatOptions(mob, stats);
                }
            }
            if (chr.getParty() != null) {
                for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                    other.write(UserLocal.showHexaSkillEff(chr));
                }
            }
            triggerResonate(chr);
        }
    }

    private void spawnResonateUltimatumVortices(Char chr) {
        Field field = chr.getField();
        if (field == null || chr.getPosition() == null) {
            return;
        }
        Position pos = chr.getPosition();
        int[][] offsets = {{-150, 0}, {150, 0}, {-80, -60}, {80, -60}};
        for (int[] off : offsets) {
            Position vPos = new Position(pos.getX() + off[0], pos.getY() + off[1]);
            AffectedArea aa = AffectedArea.getAffectedArea(chr, SUMMON_CHAKRI, 1);
            aa.setSkillID(SUMMON_CHAKRI);
            aa.setPosition(vPos);
            aa.setRect(vPos.getRectAround(new Rect(-60, -60, 60, 60)));
            aa.setDelay((short) 1);
            aa.setDuration(20000);
            field.spawnAffectedArea(aa);
        }
        triggerResonate(chr);
    }

    private void spawnChakriVortex(Char chr, int mobObjId) {
        Field field = chr.getField();
        if (field == null) {
            return;
        }

        // Limit maximum active vortices on field to 6
        long activeCount = field.getAffectedAreas().stream()
                .filter(aa -> aa.getCharID() == chr.getId() && aa.getSkillID() == SUMMON_CHAKRI)
                .count();
        if (activeCount >= 6) {
            return;
        }

        Mob mob = (Mob) field.getLifeByObjectID(mobObjId);
        Position pos = mob != null && mob.getPosition() != null ? mob.getPosition().deepCopy() : chr.getPosition().deepCopy();
        if (pos == null) {
            return;
        }

        AffectedArea aa = AffectedArea.getAffectedArea(chr, SUMMON_CHAKRI, 1);
        aa.setSkillID(SUMMON_CHAKRI);
        aa.setPosition(pos);
        aa.setRect(pos.getRectAround(new Rect(-60, -60, 60, 60)));
        aa.setDelay((short) 1);
        aa.setDuration(15000); // 15 seconds
        field.spawnAffectedArea(aa);
    }

    private void triggerResonate(Char chr) {
        Field field = chr.getField();
        if (field == null || chr.getPosition() == null) {
            return;
        }
        Position chrPos = chr.getPosition();

        List<AffectedArea> toRemove = new ArrayList<>();
        for (AffectedArea aa : field.getAffectedAreas()) {
            if (aa.getCharID() == chr.getId() && aa.getSkillID() == SUMMON_CHAKRI) {
                if (aa.getPosition() != null && Math.hypot(chrPos.getX() - aa.getPosition().getX(), chrPos.getY() - aa.getPosition().getY()) <= 400) {
                    toRemove.add(aa);
                }
            }
        }

        if (!toRemove.isEmpty()) {
            for (AffectedArea aa : toRemove) {
                field.removeLife(aa);
            }

            // Reset Void Rush cooldowns
            for (int voidSkill : VOID_SKILLS) {
                chr.resetSkillCoolTime(voidSkill);
            }

            // Heal 5% HP and MP
            chr.heal(Math.max(1, chr.getMaxHP() / 20));
            chr.healMP(Math.max(1, chr.getMaxMP() / 20));

            // Deal Resonate damage to nearby mobs
            int resSkill = chr.hasSkill(HEXA_RESONATE) ? HEXA_RESONATE : (chr.hasSkill(RESONATE_4) ? RESONATE_4 : RESONATE);
            Rect resonateRect = chrPos.getRectAround(new Rect(-350, -250, 350, 250));
            List<Mob> nearbyMobs = field.getMobsInRect(resonateRect);
            int luk = chr.getAvatarData().getCharacterStat().getLuk();
            long dmg = (long) (luk * 10.0);
            for (Mob mob : nearbyMobs) {
                if (mob != null && mob.getHp() > 0) {
                    mob.damage(chr, Math.max(dmg, 50000), resSkill);
                }
            }
        }
    }
}
