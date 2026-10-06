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
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.ChatType;
import net.swordie.ms.life.AffectedArea;
import net.swordie.ms.life.mob.Mob;
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

    // ===== 1st Job (15400) =====
    public static final int ARTS_CROSS_CUT = 154001000;
    public static final int SPARK = 154001001;
    public static final int VOID_RUSH = 154001003;
    public static final int FLARE = 154000004;
    public static final int PATIENCE = 154000005;

    // ===== 2nd Job (15410) =====
    public static final int ARTS_DUAL_EDGE = 154101000;
    public static final int ARTS_CRESCENTUM = 154101001;
    public static final int VOID_RUSH_2 = 154101004;
    public static final int CHAKRAM_BOOSTER = 154101005;
    public static final int INSANITY_1 = 154100003;
    public static final int CHAKRAM_MASTERY = 154100006;
    public static final int PHYSICAL_TRAINING = 154100007;
    public static final int IMPULSE = 154100008;

    // ===== 3rd Job (15411) =====
    public static final int RESONATE = 154110001;
    public static final int INSANITY_2 = 154110003;
    public static final int DECEIVING_BLADE = 154110005;
    public static final int INTUITION = 154110008;
    public static final int VIGILANCE = 154110009;
    public static final int SUMMON_CHAKRI = 154110010;
    public static final int SUMMON_CHAKRI_EFFECT = 154111000;
    public static final int ARTS_TRIPLE_BASH = 154111002;
    public static final int VOID_RUSH_3 = 154111004;
    public static final int HEX_CHAKRAM_SWEEP = 154111006;
    public static final int VOID_ENHANCE = 154111007;

    // ===== 4th Job (15412) =====
    public static final int CHAKRAM_EXPERT = 154120007;
    public static final int INSANITY_3 = 154120008;
    public static final int ASCEND = 154120010;
    public static final int REDEMPTION = 154120011;
    public static final int ARTS_FLURRY = 154121000;
    public static final int HEX_CHAKRAM_SPLIT = 154121001;
    public static final int HEX_CHAKRAM_FURY = 154121002;
    public static final int VOID_BLITZ = 154121003;
    public static final int DESERT_VEIL = 154121004;
    public static final int HERO_OF_THE_FLORA = 154121005;
    public static final int FLORAN_HEROS_WILL = 154121006;
    public static final int VOID_RUSH_4 = 154121009;
    public static final int VOID_RUSH_5 = 154121012;
    public static final int DEATH_BLOSSOM = 154121041;
    public static final int DIVINE_WRATH = 154121042;
    public static final int OBLIVION = 154121043;

    // ===== Hyper Skills (15414) =====
    public static final int HEX_SANDSTORM = 154141500;
    public static final int WAKE_THE_VOID = 154141504;

    // ===== V Skills (5th Job) =====
    public static final int HEX_PANDEMONIUM = 400041082;
    public static final int VOID_BURST = 400041084;
    public static final int ARTS_ASTRA = 400041087;
    public static final int RESONATE_ULTIMATUM = 400041089;

    public static final int[] HEX_SKILLS = new int[]{
            HEX_CHAKRAM_SWEEP,
            HEX_CHAKRAM_SPLIT,
            HEX_CHAKRAM_FURY,
            HEX_SANDSTORM,
            HEX_PANDEMONIUM,
            DEATH_BLOSSOM
    };

    public static final int[] VOID_SKILLS = new int[]{
            VOID_RUSH,
            VOID_RUSH_2,
            VOID_RUSH_3,
            VOID_RUSH_4,
            VOID_RUSH_5,
            VOID_BLITZ,
            VOID_BURST
    };

    public Khali(Char chr) {
        super(chr);
    }

    public static boolean isArtsSkill(int skillID) {
        return skillID == ARTS_CROSS_CUT
                || skillID == ARTS_DUAL_EDGE
                || skillID == ARTS_CRESCENTUM
                || skillID == ARTS_TRIPLE_BASH
                || skillID == ARTS_FLURRY
                || skillID == ARTS_ASTRA;
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
        cs.getExtendSP().addSpToJobLevel(1, 10);
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        // Secondary Weapon: Basic Hex Jewelry (1354040)
        Item secondary = ItemData.getItemDeepCopy(1354040);
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

        // Primary Weapon: Basic Chakram (1292000)
        if (chr.getEquippedItemByBodyPart(BodyPart.Weapon) == null) {
            Item weapon = ItemData.getItemDeepCopy(1292000);
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
        ScriptManagerImpl sm = chr.getScriptManager();
        if (level == 30) {
            sm.setJob(JobConstants.JobEnum.KHALI_2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_2.getJobId(), 5);
            chr.chatMessage(ChatType.Notice, "[Khali] Advanced to 2nd Job! New skills unlocked.");
        } else if (level == 60) {
            sm.setJob(JobConstants.JobEnum.KHALI_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_3.getJobId(), 5);
            chr.chatMessage(ChatType.Notice, "[Khali] Advanced to 3rd Job! New skills unlocked.");
        } else if (level == 100) {
            sm.setJob(JobConstants.JobEnum.KHALI_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_4.getJobId(), 5);
            chr.chatMessage(ChatType.Notice, "[Khali] Advanced to 4th Job! New skills unlocked.");
        }
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        if (chr.getLevel() >= 10 && chr.getJob() == JobConstants.JobEnum.KHALI.getJobId()) {
            ScriptManagerImpl sm = chr.getScriptManager();
            sm.setJob(JobConstants.JobEnum.KHALI_1.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.KHALI_1.getJobId(), 10);
            chr.chatMessage(ChatType.Notice, "[Khali] Initialized 1st Job (15400) successfully.");
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
            case CHAKRAM_BOOSTER:
                o1.nOption = si != null ? si.getValue(SkillStat.x, slv) : -2;
                o1.rOption = skillID;
                o1.tOption = si != null ? si.getValue(SkillStat.time, slv) : 200;
                tsm.sendStat(CharacterTemporaryStat.Booster, o1);
                break;
            case HERO_OF_THE_FLORA:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.x, slv) : 15;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 900;
                tsm.sendStat(CharacterTemporaryStat.BasicStatUp, o1);
                break;
            case DESERT_VEIL:
                o1.nReason = skillID;
                o1.nValue = 1;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 5;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                break;
            case DECEIVING_BLADE:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.indiePad, slv) : 30;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 180;
                tsm.sendStat(CharacterTemporaryStat.IndiePAD, o1);
                break;
            case DIVINE_WRATH:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.indieDamR, slv) : 10;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 60;
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                break;
            case OBLIVION:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.bdR, slv) : 30;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 30;
                tsm.sendStat(CharacterTemporaryStat.IndieBDR, o1);
                break;
            case WAKE_THE_VOID:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.indieDamR, slv) : 25;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 30;
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                break;
            case FLORAN_HEROS_WILL:
                tsm.removeAllDebuffs();
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

        // Arts skills reduce cooldown of all Hex skills by 1 second on hit
        if (isArtsSkill(skillID) && !attackInfo.mobAttackInfo.isEmpty()) {
            for (int hexSkill : HEX_SKILLS) {
                if (chr.hasSkillOnCooldown(hexSkill)) {
                    chr.reduceSkillCoolTime(hexSkill, 1000);
                }
            }

            // Spawn Chakri (Vortex) with 60% chance on mob position
            if ((chr.hasSkill(SUMMON_CHAKRI) || chr.hasSkill(SUMMON_CHAKRI_EFFECT) || chr.getJob() >= JobConstants.JobEnum.KHALI_3.getJobId())
                    && Util.succeedProp(60)) {
                spawnChakriVortex(chr, attackInfo.mobAttackInfo.get(0).mobId);
            }
        }

        // Void Rush skills trigger Resonate if passing through a Chakri
        if (isVoidSkill(skillID)) {
            triggerResonate(chr);
        }
    }

    private void spawnChakriVortex(Char chr, int mobObjId) {
        Field field = chr.getField();
        if (field == null) {
            return;
        }

        // Limit maximum active vortices on field to 4
        long activeCount = field.getAffectedAreas().stream()
                .filter(aa -> aa.getCharID() == chr.getId() && aa.getSkillID() == SUMMON_CHAKRI)
                .count();
        if (activeCount >= 4) {
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
                if (aa.getPosition() != null && Math.hypot(chrPos.getX() - aa.getPosition().getX(), chrPos.getY() - aa.getPosition().getY()) <= 300) {
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
            Rect resonateRect = chrPos.getRectAround(new Rect(-350, -250, 350, 250));
            List<Mob> nearbyMobs = field.getMobsInRect(resonateRect);
            int luk = chr.getAvatarData().getCharacterStat().getLuk();
            long dmg = (long) (luk * 10.0);
            for (Mob mob : nearbyMobs) {
                if (mob != null && mob.getHp() > 0) {
                    mob.damage(chr, Math.max(dmg, 50000), RESONATE);
                }
            }

            chr.chatMessage(ChatType.Notice, "[Resonate] Chakram Vortex triggered! Cooldowns reset.");
        }
    }
}
