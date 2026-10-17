package net.swordie.ms.client.jobs.nova;

import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.SkillStat;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.enums.Stat;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.client.character.skills.info.MobAttackInfo;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.util.Rect;

import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;

import static net.swordie.ms.enums.InvType.EQUIPPED;

public class Kain extends Job {

    // TODO [4] Handle Grappling Wire local&remote effect
    // TODO [5] Handle Link Skill & Union (If needs handling)

    // Thanatos Descent Rect
    public static final Rect thanatosRect = new Rect(-200, -250, 200, -30);
    public static final Rect remainIncenseRect = new Rect(-700, -400, 700, 450);

    // Beginner Job
    public static final int FACING_THE_PAST = 60031000;
    public static final int PRIOR_PREPARATION = 60030241;

    // 1st Job
    public static final int HITMAN = 63000007; // Passive
    public static final int COVERT = 63000008; // Passive
    public static final int STRIKE_ARROW = 63001000;
    public static final int STRIKE_ARROW_EXTRA_HIT = 63001001;
    public static final int SHADOW_STEP_HORIZONTAL = 63001002;
    public static final int SHADOW_STEP_VERTICAL_UP = 63001003; // Up
    public static final int GRAPPLING_WIRE = 63001004;
    public static final int SHADOW_STEP_VERTICAL_DOWN = 63001005; // Down
    public static final int SHADOW_SWIFT = 63001006; // Flash Jump
    public static final int STRIKE_ARROW_POSSESS = 63001100; // Possess Skill


    // 2nd Job
    public static final int STRIKE_ARROW_2_PASSIVE = 63100002; // Upgrade on StrikeArrow
    public static final int BREATH_SHOOTER_MASTERY = 63100011; // Passive Mastery
    public static final int PHYSICAL_TRAINING = 63100012; // Passive
    public static final int STRIKE_ARROW_POSSESS_PASSIVE = 63100100; // Upgrade on StrikeArrowPossess? (disable=1)
    public static final int SCATTERING_SHOT_POSSESS_PASSIVE = 63100104; // Upgrade on ScatteringShotPossess? (disable=1)
    public static final int POSSESSION = 63101001; // Kain Energy/Gauge Skill
    public static final int STRIKE_ARROW_2 = 63101003; // Upgrade on StrikeArrow. Added Sequential Attack after StrikeArrow
    public static final int SCATTERING_SHOT = 63101004; // TODO [2] Handle Stack Inc Request
    public static final int DRAGON_FANG = 63101005; // Buff that shows 3 Orbs around character (So new CTS, most likely)
    public static final int DRAGON_FANG_SA = 63101006; // Second Atom!
    public static final int BREATH_SHOOTER_BOOSTER = 63101010; // Booster Buff
    public static final int STRIKE_ARROW_2_POSSESS = 63101100; // Possess Skill
    public static final int SCATTERING_SHOT_POSSESS = 63101104; // Possess Skill & Second Atom


    // 3rd Job
    public static final int STRIKE_ARROW_3_PASSIVE = 63110001; // Upgrade on StrikeArrow2
    public static final int DEATH_BLESSING = 63110011; // Passive Skill that places MobStat on Mobs when attacking with Possessed Skills
    public static final int NATURAL_BORN_INSTINCT = 63110014; // Passive
    public static final int GRINDING = 63110015;
    public static final int SHAFT_BREAK_PASSIVE = 63110103; // Upgrade? (disable=1)
    public static final int STRIKE_ARROW_3 = 63111002; // Upgrade on StrikeArrow2. Added Sequential Attack after StrikeArrow2
    public static final int SHAFT_BREAK = 63111003; // Shoot Obj
    public static final int SHAFT_BREAK_VACUUM = 63111004; // Shoot Obj
    public static final int SHAFT_BREAK_EXPLOSION = 63111005; // Shoot Obj
    public static final int TEARING_KNIFE = 63111007; // Execution Skill
    public static final int PHANTOM_BLADE = 63111008; // Execution Skill
    public static final int REMAIN_INCENSE = 63111009; // ON/OFF buff
    public static final int REMAIN_INCENSE_WRECKAGE = 63111010; // Wreckage
    public static final int DEATH_BLESSING_ATTACK = 63111012;
    public static final int DEATH_BLESSING_BUFF = 63111013; // skillList = placeMobDebuff | skillList2 = explodeMobDebuff
    public static final int SHAFT_BREAK_POSSESS = 63111103;
    public static final int SHAFT_BREAK_VACUUM_POSSESS = 63111104;
    public static final int SHAFT_BREAK_EXPLOSION_POSSESS = 63111105;
    public static final int SHAFT_BREAK_AFTER_EFFECT_POSSESS = 63111106;


    // 4th Job
    public static final int POSSESSION_2 = 63120000; // Upgrade on Possession
    public static final int ADVANCED_DEATH_BLESSING = 63120001; // Upgrade on Death Blessing
    public static final int GRINDING_2 = 63120011; // Upgrade on Grinding
    public static final int DOGMA = 63120012; // Passive
    public static final int BREATH_SHOOTER_EXPERT = 63120013; // Passive
    public static final int ADAPT_TO_DEATH = 63120014; // Passive
    public static final int FALLING_DUST_PASSIVE = 63120102; // Upgrade? (disable=1)
    public static final int FALLING_DUST = 63121002; // Attack
    public static final int CHAIN_SICKLE = 63121004; // Execution
    public static final int CHAIN_SICKLE_2 = 63121005; // Execution | Additional Attack after ChainSickle
    public static final int POISON_NEEDLE = 63121006; // Execution | Inflicts BurnedInfo | KeyDown
    public static final int POISON_NEEDLE_2 = 63121007; // Execution | Inflicts BurnedInfo
    public static final int DRAGON_SCALE = 63121008; // iFrames | KeyDown
    public static final int NOVA_WARRIOR = 63121009;
    public static final int NOVA_HERO_WILL = 63121010;
    public static final int FALLING_DUST_POSSESS = 63121102; // Possess
    public static final int FALLING_DUST_2_POSSESS = 63121103;


    // Hyper Skills
    public static final int DRAGON_SCALE_EXTRA_HEALING = 63120039;

    public static final int SNEAKY_SNIPING_POSSES_PASSIVE = 63120140; // Upgrade? (disable=1)

    public static final int SNEAKY_SNIPING = 63121040; // Keydown!
    public static final int SNEAKY_SNIPING_2 = 63121041; // Keydown!
    public static final int CHASING_SHOT = 63121042;
    public static final int INCARNATION = 63121044; // Buff
    public static final int SNEAKY_SNIPING_POSSESS = 63121140;
    public static final int SNEAKY_SNIPING_2_POSSESS = 63121141;

    // V skills
    public static final int DRAGON_BURST = 400031061; // Possess | Keydown!
    public static final int THANATOS_DESCENT = 400031062; // Buff
    public static final int THANATOS_DESCENT_2 = 400031063; // Second Atom
    public static final int THANATOS_DESCENT_3 = 400031064; // Screen Attack
    public static final int FATAL_BLITZ = 400031065; // Execution
    public static final int GRIP_OF_AGONY = 400031066; // Second Atom

    // 6th Job (HEXA Matrix)
    public static final int CHURNING_MALICE = 63141506; // 2nd 6th Job Ascent/Origin Skill Cast
    public static final int CHURNING_MALICE_ATTACK_1 = 63141507;
    public static final int CHURNING_MALICE_ATTACK_2 = 63141508;
    public static final int TOTAL_ANNIHILATION = 63141500; // 6th Job Origin Skill
    public static final int TOTAL_ANNIHILATION_ATTACK_1 = 63141501;
    public static final int TOTAL_ANNIHILATION_ATTACK_2 = 63141502;
    public static final int TOTAL_ANNIHILATION_ATTACK_3 = 63141503;
    public static final int TOTAL_ANNIHILATION_ATTACK_4 = 63141504;
    public static final int TOTAL_ANNIHILATION_ATTACK_5 = 63141505;

    // HEXA Mastery Skills
    public static final int HEXA_FALLING_DUST = 63141000;
    public static final int HEXA_FALLING_DUST_POSSESS = 63141100;
    public static final int HEXA_FALLING_DUST_POSSESS_2 = 63141101;
    public static final int HEXA_POISON_NEEDLE = 63141004;
    public static final int HEXA_POISON_NEEDLE_1 = 63141005;
    public static final int HEXA_POISON_NEEDLE_2 = 63141006;
    public static final int HEXA_STRIKE_ARROW = 63141007;
    public static final int HEXA_STRIKE_ARROW_1 = 63141008;
    public static final int HEXA_STRIKE_ARROW_POSSESS = 63141107;
    public static final int HEXA_SCATTERING_SHOT = 63141009;
    public static final int HEXA_SCATTERING_SHOT_POSSESS = 63141109;
    public static final int HEXA_TEARING_KNIFE = 63141010;
    public static final int HEXA_CHAIN_SICKLE = 63141011;
    public static final int HEXA_CHAIN_SICKLE_1 = 63141012;
    public static final int HEXA_DRAGON_FANG = 63141013;
    public static final int HEXA_DRAGON_FANG_1 = 63141014;
    public static final int HEXA_DEATH_BLESSING = 63141015;
    public static final int HEXA_DEATH_BLESSING_1 = 63141016;
    public static final int HEXA_DEATH_BLESSING_2 = 63141017;
    public static final int HEXA_SHAFT_BREAK = 63141018;
    public static final int HEXA_SHAFT_BREAK_1 = 63141019;
    public static final int HEXA_SHAFT_BREAK_2 = 63141020;
    public static final int HEXA_SHAFT_BREAK_POSSESS = 63141118;
    public static final int HEXA_SHAFT_BREAK_POSSESS_1 = 63141119;
    public static final int HEXA_SHAFT_BREAK_POSSESS_2 = 63141120;
    public static final int HEXA_SHAFT_BREAK_POSSESS_3 = 63141121;
    public static final int HEXA_LASTING_GRUDGE = 63141022;
    public static final int HEXA_LASTING_GRUDGE_1 = 63141023;
    public static final int HEXA_PHANTOM_BLADE = 63141024;
    public static final int HEXA_CHASING_SHOT = 63141025;
    public static final int HEXA_UNSEEN_SNIPER = 63141026;
    public static final int HEXA_UNSEEN_SNIPER_1 = 63141027;
    public static final int HEXA_UNSEEN_SNIPER_POSSESS = 63141126;
    public static final int HEXA_UNSEEN_SNIPER_POSSESS_1 = 63141127;

    public static final int[] possessionSkills = new int[] {
            STRIKE_ARROW_POSSESS,
            STRIKE_ARROW_2_POSSESS,
            SCATTERING_SHOT_POSSESS,
            SHAFT_BREAK_POSSESS,
            SHAFT_BREAK_VACUUM_POSSESS,
            SHAFT_BREAK_EXPLOSION_POSSESS,
            SHAFT_BREAK_AFTER_EFFECT_POSSESS,
            FALLING_DUST_POSSESS,
            FALLING_DUST_2_POSSESS,
            SNEAKY_SNIPING_POSSESS,
            SNEAKY_SNIPING_2_POSSESS,

            HEXA_STRIKE_ARROW_POSSESS,
            HEXA_SCATTERING_SHOT_POSSESS,
            HEXA_SHAFT_BREAK_POSSESS,
            HEXA_SHAFT_BREAK_POSSESS_1,
            HEXA_SHAFT_BREAK_POSSESS_2,
            HEXA_SHAFT_BREAK_POSSESS_3,
            HEXA_FALLING_DUST_POSSESS,
            HEXA_FALLING_DUST_POSSESS_2,
            HEXA_UNSEEN_SNIPER_POSSESS,
            HEXA_UNSEEN_SNIPER_POSSESS_1,
            CHURNING_MALICE,
            CHURNING_MALICE_ATTACK_1,
            CHURNING_MALICE_ATTACK_2,

            DRAGON_BURST,
    };

    public static final int[] executionSkills = new int[] {
            TEARING_KNIFE,
            PHANTOM_BLADE,
            CHAIN_SICKLE,
            CHAIN_SICKLE_2,
            POISON_NEEDLE,
            POISON_NEEDLE_2,

            HEXA_TEARING_KNIFE,
            HEXA_PHANTOM_BLADE,
            HEXA_CHAIN_SICKLE,
            HEXA_CHAIN_SICKLE_1,
            HEXA_POISON_NEEDLE,
            HEXA_POISON_NEEDLE_1,
            HEXA_POISON_NEEDLE_2,
            HEXA_UNSEEN_SNIPER,
            HEXA_UNSEEN_SNIPER_1,
            HEXA_UNSEEN_SNIPER_POSSESS,
            HEXA_UNSEEN_SNIPER_POSSESS_1,

            SNEAKY_SNIPING_POSSESS,
            SNEAKY_SNIPING_2_POSSESS,
            FATAL_BLITZ,
    };

    public static final int[] whisperShotSkills = new int[]{
            STRIKE_ARROW,
            STRIKE_ARROW_EXTRA_HIT,
            STRIKE_ARROW_2,
            SCATTERING_SHOT,
            STRIKE_ARROW_3,
            SHAFT_BREAK,
            SHAFT_BREAK_VACUUM,
            SHAFT_BREAK_EXPLOSION,
            FALLING_DUST,
            CHASING_SHOT,
            SNEAKY_SNIPING,
            SNEAKY_SNIPING_2,

            HEXA_STRIKE_ARROW,
            HEXA_STRIKE_ARROW_1,
            HEXA_SCATTERING_SHOT,
            HEXA_SHAFT_BREAK,
            HEXA_SHAFT_BREAK_1,
            HEXA_SHAFT_BREAK_2,
            HEXA_FALLING_DUST,
            HEXA_CHASING_SHOT,
    };

    public static final int[] addedSkills = new int[] {
            FACING_THE_PAST,
            PRIOR_PREPARATION
    };

    private Map<Integer, Integer> kainStackSkills = new HashMap<>(); // <SkillId, CurStack>
    private int advDeathBlessingKillCount = 0;

    public Kain(Char chr) {
        super(chr);
        if (chr != null && chr.getId() != 0 && isHandlerOfJob(chr.getJob())) {
            for (int id : addedSkills) {
                if (!chr.hasSkill(id)) {
                    Skill skill = SkillData.getSkillDeepCopyById(id);
                    if (skill != null) {
                        skill.setCurrentLevel(skill.getMaxLevel() > 0 ? skill.getMaxLevel() : skill.getMasterLevel());
                        chr.addSkill(skill);
                    }
                }
            }
        }
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isKain(id);
    }

    public boolean isPossessionSkill(int skillId) {
        for (int id : possessionSkills) {
            if (id == skillId) {
                return true;
            }
        }
        return false;
    }

    public boolean isExecutionSkill(int skillId) {
        for (int id : executionSkills) {
            if (id == skillId) {
                return true;
            }
        }
        return false;
    }

    public boolean isWhisperShotSkill(int skillId) {
        for (int id : whisperShotSkills) {
            if (id == skillId) {
                return true;
            }
        }
        return false;
    }

    public void addMalice(int amount) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int maxGauge = chr.hasSkill(POSSESSION_2) ? 500 : 200;
        int curGauge = tsm.hasStat(CharacterTemporaryStat.NADragonGauge) ? tsm.getOption(CharacterTemporaryStat.NADragonGauge).nOption : 0;
        int newGauge = Math.max(0, Math.min(maxGauge, curGauge + amount));
        Option o = new Option();
        o.nOption = newGauge;
        o.rOption = POSSESSION;
        tsm.sendStat(CharacterTemporaryStat.NADragonGauge, o);
    }

    private void applyDeathBlessing(AttackInfo attackInfo) {
        if (!chr.hasSkill(DEATH_BLESSING)) {
            return;
        }
        int maxStacks = chr.hasSkill(ADVANCED_DEATH_BLESSING) ? 15 : 10;
        int blessingSkillId = chr.hasSkill(HEXA_DEATH_BLESSING) ? HEXA_DEATH_BLESSING : chr.hasSkill(ADVANCED_DEATH_BLESSING) ? ADVANCED_DEATH_BLESSING : DEATH_BLESSING;
        for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
            Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
            if (mob == null) {
                continue;
            }
            MobTemporaryStat mts = mob.getTemporaryStat();
            int curStack = mts.hasCurrentMobStat(MobStat.IndieDummyBuffIcon) ? mts.getCurrentOptionsByMobStat(MobStat.IndieDummyBuffIcon).nValue : 0;
            Option o = new Option();
            o.nValue = Math.min(maxStacks, curStack + 1);
            o.nReason = blessingSkillId;
            o.tTerm = 30;
            mts.addStatOptions(mob, MobStat.IndieDummyBuffIcon, o);
        }
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option charOpt = new Option();
        charOpt.nOption = 1;
        charOpt.rOption = blessingSkillId;
        charOpt.tOption = 30;
        tsm.sendStat(CharacterTemporaryStat.NADeathBlessing, charOpt);
    }

    private void realizeDeathBlessing(AttackInfo attackInfo) {
        if (!chr.hasSkill(DEATH_BLESSING)) {
            return;
        }
        boolean realizedAny = false;
        int blessingSkillId = chr.hasSkill(HEXA_DEATH_BLESSING) ? HEXA_DEATH_BLESSING : chr.hasSkill(ADVANCED_DEATH_BLESSING) ? ADVANCED_DEATH_BLESSING : DEATH_BLESSING;
        for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
            Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
            if (mob == null) {
                continue;
            }
            MobTemporaryStat mts = mob.getTemporaryStat();
            if (mts.hasCurrentMobStat(MobStat.IndieDummyBuffIcon)) {
                int curStack = mts.getCurrentOptionsByMobStat(MobStat.IndieDummyBuffIcon).nValue;
                realizedAny = true;
                if (curStack > 1) {
                    Option o = new Option();
                    o.nValue = curStack - 1;
                    o.nReason = blessingSkillId;
                    o.tTerm = 30;
                    mts.addStatOptions(mob, MobStat.IndieDummyBuffIcon, o);
                } else {
                    mts.removeMobStat(mob, MobStat.IndieDummyBuffIcon);
                }
            }
        }
        if (realizedAny) {
            TemporaryStatManager tsm = chr.getTemporaryStatManager();
            int buffSkillId = chr.hasSkill(HEXA_DEATH_BLESSING) ? HEXA_DEATH_BLESSING_2 : DEATH_BLESSING_BUFF;
            Option o = new Option();
            o.nReason = buffSkillId;
            o.nValue = chr.hasSkill(ADVANCED_DEATH_BLESSING) ? 10 : 5;
            o.tTerm = 5;
            tsm.sendStat(CharacterTemporaryStat.IndiePMdR, o);
            chr.resetSkillCoolTime(SHADOW_STEP_HORIZONTAL);
        }
    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.HOME_MAP);
        cs.setLevel(10);
        chr.setJob(JobConstants.JobEnum.KAIN_1.getJobId());
        chr.addSpToSpecificJob((short) JobConstants.JobEnum.KAIN_1.getJobId(), 5);
        cs.setStr(5);
        cs.setDex(5);
        cs.setInt(5);
        cs.setLuk(5);
        cs.setAp(4 + cs.getLevel() * 5);
        cs.setHp(450);
        cs.setMaxHp(450);
        cs.setMp(300);
        cs.setMaxMp(300);
    }

    @Override
    public void handleLevelUp(short level) {
        super.handleLevelUp(level);
        short jobId = chr.getJob();
        if (level >= 10 && jobId == JobConstants.JobEnum.KAIN.getJobId()) {
            short next = JobConstants.JobEnum.KAIN_1.getJobId();
            chr.setJob(next);
            chr.addSpToSpecificJob(next, 5);
            jobId = next;
        }
        if (level >= 30 && jobId == JobConstants.JobEnum.KAIN_1.getJobId()) {
            short next = JobConstants.JobEnum.KAIN_2.getJobId();
            chr.setJob(next);
            chr.addSpToSpecificJob(next, 4);
            jobId = next;
        }
        if (level >= 60 && jobId == JobConstants.JobEnum.KAIN_2.getJobId()) {
            short next = JobConstants.JobEnum.KAIN_3.getJobId();
            chr.setJob(next);
            chr.addSpToSpecificJob(next, 4);
            jobId = next;
        }
        if (level >= 100 && jobId == JobConstants.JobEnum.KAIN_3.getJobId()) {
            short next = JobConstants.JobEnum.KAIN_4.getJobId();
            chr.setJob(next);
            chr.addSpToSpecificJob(next, 3);
        }
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        if (chr.getFieldID() >= 410000400 && chr.getFieldID() <= 410000499) {
            chr.getScriptManager().warp(FieldConstants.HOME_MAP);
        }
        super.handleInitAfterMigrate(chr);
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        // Secondary Weapon: Basic Weapon Belt (1354010)
        Item secondary = ItemData.getItemDeepCopy(1354010);
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

        // Primary Weapon: Basic Whispershot (1214000)
        if (chr.getEquippedItemByBodyPart(BodyPart.Weapon) == null) {
            Item weapon = ItemData.getItemDeepCopy(1214000);
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
            case POSSESSION:
                int curMalice = tsm.hasStat(CharacterTemporaryStat.NADragonGauge) ? tsm.getOption(CharacterTemporaryStat.NADragonGauge).nOption : 0;
                if (curMalice < 100) {
                    return;
                }
                o1.nOption = 1;
                o1.rOption = POSSESSION;
                o1.tOption = 15;
                tsm.sendStat(CharacterTemporaryStat.NADragonEnchant, o1);
                addMalice(-100);
                break;
            case DRAGON_FANG:
            case HEXA_DRAGON_FANG:
                if (tsm.hasStatBySkillId(DRAGON_FANG) || tsm.hasStatBySkillId(HEXA_DRAGON_FANG)) {
                    tsm.removeStatsBySkill(DRAGON_FANG);
                    tsm.removeStatsBySkill(HEXA_DRAGON_FANG);
                } else {
                    o1.nValue = 1;
                    o1.nReason = skillID;
                    tsm.sendStat(CharacterTemporaryStat.IndieCheckTimeByClient, o1);
                }
                break;
            case BREATH_SHOOTER_BOOSTER:
                o1.nOption = si != null ? si.getValue(SkillStat.x, slv) : -2;
                o1.rOption = skillID;
                o1.tOption = si != null ? si.getValue(SkillStat.time, slv) : 200;
                tsm.sendStat(CharacterTemporaryStat.Booster, o1);
                break;
            case NOVA_WARRIOR:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.x, slv) : 15;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 900;
                tsm.sendStat(CharacterTemporaryStat.BasicStatUp, o1);
                break;
            case NOVA_HERO_WILL:
                tsm.removeAllDebuffs();
                break;
            case INCARNATION:
                int incDur = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 30;
                EnumMap<CharacterTemporaryStat, Option> incStats = new EnumMap<>(CharacterTemporaryStat.class);
                o1.nReason = skillID;
                o1.nValue = si != null && si.getValue(SkillStat.indieDamR, slv) > 0 ? si.getValue(SkillStat.indieDamR, slv) : 15;
                o1.tTerm = incDur;
                incStats.put(CharacterTemporaryStat.IndieDamR, o1);
                o2.nReason = skillID;
                o2.nValue = 100;
                o2.tTerm = incDur;
                incStats.put(CharacterTemporaryStat.IndieStance, o2);
                Option o3 = new Option();
                o3.nReason = skillID;
                o3.nValue = si != null && si.getValue(SkillStat.indiePadR, slv) > 0 ? si.getValue(SkillStat.indiePadR, slv) : 15;
                o3.tTerm = incDur;
                incStats.put(CharacterTemporaryStat.IndiePADR, o3);
                Option o4 = new Option();
                o4.nOption = 1;
                o4.rOption = skillID;
                o4.tOption = incDur;
                incStats.put(CharacterTemporaryStat.NovaArcherIncanation, o4);
                tsm.sendStat(incStats);
                break;
            case DRAGON_SCALE:
                int scaleDur = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 3;
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = scaleDur;
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = scaleDur;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                break;
            case THANATOS_DESCENT:
                int thanatosDur = si != null && si.getValue(SkillStat.time, slv) > 0 ? si.getValue(SkillStat.time, slv) : 35;
                EnumMap<CharacterTemporaryStat, Option> tdStats = new EnumMap<>(CharacterTemporaryStat.class);
                o1.nReason = skillID;
                o1.nValue = si != null && si.getValue(SkillStat.indieDamR, slv) > 0 ? si.getValue(SkillStat.indieDamR, slv) : 30;
                o1.tTerm = thanatosDur;
                tdStats.put(CharacterTemporaryStat.IndieDamR, o1);
                o2.nReason = skillID;
                o2.nValue = 100;
                o2.tTerm = thanatosDur;
                tdStats.put(CharacterTemporaryStat.IndieStance, o2);
                Option tdOpt = new Option();
                tdOpt.nOption = 1;
                tdOpt.rOption = skillID;
                tdOpt.tOption = thanatosDur;
                tdStats.put(CharacterTemporaryStat.NAThanatosDescent, tdOpt);
                tsm.sendStat(tdStats);
                break;
            case THANATOS_DESCENT_3:
                tsm.removeStatsBySkill(THANATOS_DESCENT);
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 3;
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 3;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                break;
            case CHURNING_MALICE:
                // 2nd 6th Job Origin/Ascent Skill: 7 seconds invincibility (iframe) during cast animation
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 7;
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 7;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                chr.write(UserLocal.showHexaSkillEff(chr));
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        if (other.getId() != chr.getId()) {
                            other.write(UserLocal.showHexaSkillEff(chr));
                        }
                    }
                }
                break;
            case TOTAL_ANNIHILATION:
                // 6th Job Origin Skill: 7s invincibility + NAAnnihilation domain buff
                EnumMap<CharacterTemporaryStat, Option> taStats = new EnumMap<>(CharacterTemporaryStat.class);
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 7;
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 7;
                taStats.put(CharacterTemporaryStat.IndieNotDamaged, o1);
                o2.nOption = 1;
                o2.rOption = skillID;
                o2.tOption = 30;
                taStats.put(CharacterTemporaryStat.NAAnnihilation, o2);
                tsm.sendStat(taStats);
                chr.write(UserLocal.showHexaSkillEff(chr));
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        if (other.getId() != chr.getId()) {
                            other.write(UserLocal.showHexaSkillEff(chr));
                        }
                    }
                }
                break;
            case REMAIN_INCENSE:
            case HEXA_LASTING_GRUDGE:
                if (tsm.hasStat(CharacterTemporaryStat.NARemainIncense)) {
                    tsm.removeStatsBySkill(REMAIN_INCENSE);
                    tsm.removeStatsBySkill(HEXA_LASTING_GRUDGE);
                } else {
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    tsm.sendStat(CharacterTemporaryStat.NARemainIncense, o1);
                }
                break;
        }
    }

    @Override
    public void handleAttack(Client c, AttackInfo attackInfo, SkillInfo si, long now) {
        Char chr = c.getChr();
        super.handleAttack(c, attackInfo, si, now);
        int skillID = attackInfo.skillId;
        TemporaryStatManager tsm = chr.getTemporaryStatManager();

        if (!attackInfo.mobAttackInfo.isEmpty()) {
            if (isWhisperShotSkill(skillID)) {
                addMalice(chr.hasSkill(GRINDING_2) ? 35 : chr.hasSkill(GRINDING) ? 25 : 18);
            }
            if (isPossessionSkill(skillID) || skillID == DEATH_BLESSING_ATTACK || skillID == HEXA_DEATH_BLESSING_1) {
                applyDeathBlessing(attackInfo);
                if (isPossessionSkill(skillID) && skillID != DRAGON_BURST
                        && skillID != CHURNING_MALICE && skillID != CHURNING_MALICE_ATTACK_1 && skillID != CHURNING_MALICE_ATTACK_2) {
                    tsm.removeStatsBySkill(POSSESSION);
                }
            }
            if (isExecutionSkill(skillID)) {
                realizeDeathBlessing(attackInfo);
            }
        }

        switch (skillID) {
            case CHURNING_MALICE:
            case CHURNING_MALICE_ATTACK_1:
            case CHURNING_MALICE_ATTACK_2:
            case TOTAL_ANNIHILATION:
            case TOTAL_ANNIHILATION_ATTACK_1:
            case TOTAL_ANNIHILATION_ATTACK_2:
            case TOTAL_ANNIHILATION_ATTACK_3:
            case TOTAL_ANNIHILATION_ATTACK_4:
            case TOTAL_ANNIHILATION_ATTACK_5:
                applyDeathBlessing(attackInfo);
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob targetMob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (targetMob == null) continue;
                    MobTemporaryStat mts = targetMob.getTemporaryStat();
                    EnumMap<MobStat, Option> newMobStats = new EnumMap<>(MobStat.class);
                    Option opt1 = new Option();
                    opt1.nOption = 1;
                    opt1.rOption = skillID;
                    opt1.tOption = 10; // 10s Absolute Freeze / Bind
                    opt1.cOption = chr.getId();
                    newMobStats.put(MobStat.Freeze, opt1);
                    Option opt2 = new Option();
                    opt2.nOption = 1;
                    opt2.rOption = skillID;
                    opt2.tOption = 20; // 20s Origin Debuff
                    opt2.cOption = chr.getId();
                    newMobStats.put(MobStat.OriginDebuff, opt2);
                    mts.addStatOptions(targetMob, newMobStats);
                }
                chr.write(UserLocal.showHexaSkillEff(chr));
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        if (other.getId() != chr.getId()) {
                            other.write(UserLocal.showHexaSkillEff(chr));
                        }
                    }
                }
                break;
        }
    }

    @Override
    public int handleSetCoolDownSkill(int skillId) {
        switch (skillId) {
            case TOTAL_ANNIHILATION_ATTACK_1, TOTAL_ANNIHILATION_ATTACK_2, TOTAL_ANNIHILATION_ATTACK_3,
                 TOTAL_ANNIHILATION_ATTACK_4, TOTAL_ANNIHILATION_ATTACK_5 -> {
                chr.setSkillCooldown(TOTAL_ANNIHILATION, chr.getSkillLevel(TOTAL_ANNIHILATION));
                return 1;
            }
            case CHURNING_MALICE_ATTACK_1, CHURNING_MALICE_ATTACK_2 -> {
                chr.setSkillCooldown(CHURNING_MALICE, chr.getSkillLevel(CHURNING_MALICE));
                return 1;
            }
            case SHADOW_STEP_VERTICAL_UP, SHADOW_STEP_VERTICAL_DOWN -> {
                chr.setSkillCooldown(SHADOW_STEP_HORIZONTAL, chr.getSkillLevel(SHADOW_STEP_HORIZONTAL));
                return 1;
            }
            case SCATTERING_SHOT_POSSESS, HEXA_SCATTERING_SHOT_POSSESS, HEXA_SCATTERING_SHOT -> {
                int slv = chr.getSkillLevel(SCATTERING_SHOT);
                chr.setSkillCooldown(SCATTERING_SHOT, slv);
                chr.setSkillCooldown(SCATTERING_SHOT_POSSESS, slv);
                if (chr.hasSkill(HEXA_SCATTERING_SHOT)) {
                    chr.setSkillCooldown(HEXA_SCATTERING_SHOT, chr.getSkillLevel(HEXA_SCATTERING_SHOT));
                    chr.setSkillCooldown(HEXA_SCATTERING_SHOT_POSSESS, chr.getSkillLevel(HEXA_SCATTERING_SHOT));
                }
                return 1;
            }
            case SHAFT_BREAK_POSSESS, SHAFT_BREAK_VACUUM, SHAFT_BREAK_EXPLOSION,
                 SHAFT_BREAK_VACUUM_POSSESS, SHAFT_BREAK_EXPLOSION_POSSESS, SHAFT_BREAK_AFTER_EFFECT_POSSESS,
                 HEXA_SHAFT_BREAK, HEXA_SHAFT_BREAK_POSSESS -> {
                int slv = chr.getSkillLevel(SHAFT_BREAK);
                chr.setSkillCooldown(SHAFT_BREAK, slv);
                chr.setSkillCooldown(SHAFT_BREAK_POSSESS, slv);
                if (chr.hasSkill(HEXA_SHAFT_BREAK)) {
                    chr.setSkillCooldown(HEXA_SHAFT_BREAK, chr.getSkillLevel(HEXA_SHAFT_BREAK));
                    chr.setSkillCooldown(HEXA_SHAFT_BREAK_POSSESS, chr.getSkillLevel(HEXA_SHAFT_BREAK));
                }
                return 1;
            }
            case TEARING_KNIFE, HEXA_TEARING_KNIFE -> {
                int cd = 4500;
                chr.addSkillCooldown(TEARING_KNIFE, cd);
                if (chr.hasSkill(HEXA_TEARING_KNIFE)) {
                    chr.addSkillCooldown(HEXA_TEARING_KNIFE, cd);
                }
                return 1;
            }
            case FALLING_DUST_POSSESS, FALLING_DUST_2_POSSESS, HEXA_FALLING_DUST, HEXA_FALLING_DUST_POSSESS, HEXA_FALLING_DUST_POSSESS_2 -> {
                int slv = chr.getSkillLevel(FALLING_DUST);
                chr.setSkillCooldown(FALLING_DUST, slv);
                chr.setSkillCooldown(FALLING_DUST_POSSESS, slv);
                if (chr.hasSkill(HEXA_FALLING_DUST)) {
                    chr.setSkillCooldown(HEXA_FALLING_DUST, chr.getSkillLevel(HEXA_FALLING_DUST));
                    chr.setSkillCooldown(HEXA_FALLING_DUST_POSSESS, chr.getSkillLevel(HEXA_FALLING_DUST));
                }
                return 1;
            }
            case CHAIN_SICKLE_2, HEXA_CHAIN_SICKLE, HEXA_CHAIN_SICKLE_1 -> {
                int slv = chr.getSkillLevel(CHAIN_SICKLE);
                chr.setSkillCooldown(CHAIN_SICKLE, slv);
                if (chr.hasSkill(HEXA_CHAIN_SICKLE)) {
                    chr.setSkillCooldown(HEXA_CHAIN_SICKLE, chr.getSkillLevel(HEXA_CHAIN_SICKLE));
                }
                return 1;
            }
            case POISON_NEEDLE_2, HEXA_POISON_NEEDLE, HEXA_POISON_NEEDLE_1, HEXA_POISON_NEEDLE_2 -> {
                int slv = chr.getSkillLevel(POISON_NEEDLE);
                chr.setSkillCooldown(POISON_NEEDLE, slv);
                if (chr.hasSkill(HEXA_POISON_NEEDLE)) {
                    chr.setSkillCooldown(HEXA_POISON_NEEDLE, chr.getSkillLevel(HEXA_POISON_NEEDLE));
                }
                return 1;
            }
            case SNEAKY_SNIPING_2, SNEAKY_SNIPING_POSSESS, SNEAKY_SNIPING_2_POSSESS,
                 HEXA_UNSEEN_SNIPER, HEXA_UNSEEN_SNIPER_1, HEXA_UNSEEN_SNIPER_POSSESS, HEXA_UNSEEN_SNIPER_POSSESS_1 -> {
                int slv = chr.getSkillLevel(SNEAKY_SNIPING);
                chr.setSkillCooldown(SNEAKY_SNIPING, slv);
                chr.setSkillCooldown(SNEAKY_SNIPING_POSSESS, slv);
                if (chr.hasSkill(HEXA_UNSEEN_SNIPER)) {
                    chr.setSkillCooldown(HEXA_UNSEEN_SNIPER, chr.getSkillLevel(HEXA_UNSEEN_SNIPER));
                    chr.setSkillCooldown(HEXA_UNSEEN_SNIPER_POSSESS, chr.getSkillLevel(HEXA_UNSEEN_SNIPER));
                }
                return 1;
            }
            case CHASING_SHOT, HEXA_CHASING_SHOT -> {
                int slv = chr.getSkillLevel(CHASING_SHOT);
                chr.setSkillCooldown(CHASING_SHOT, slv);
                if (chr.hasSkill(HEXA_CHASING_SHOT)) {
                    chr.setSkillCooldown(HEXA_CHASING_SHOT, chr.getSkillLevel(HEXA_CHASING_SHOT));
                }
                return 1;
            }
            case THANATOS_DESCENT_2, THANATOS_DESCENT_3 -> {
                chr.setSkillCooldown(THANATOS_DESCENT, chr.getSkillLevel(THANATOS_DESCENT));
                return 1;
            }
        }
        return super.handleSetCoolDownSkill(skillId);
    }
}
