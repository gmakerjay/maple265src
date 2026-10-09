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
    public static final int SCATTERING_SHOT_POSSESS_PASSIVE = 63101001; // Upgrade on ScatteringShotPossess? (disable=1)
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
    public static final int CHURNING_MALICE = 63141506; // Origin Skill Cast
    public static final int CHURNING_MALICE_ATTACK_1 = 63141507;
    public static final int CHURNING_MALICE_ATTACK_2 = 63141508;
    public static final int TOTAL_ANNIHILATION = 63141500; // 6th Job Active
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
            FALLING_DUST_POSSESS,

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

            DRAGON_BURST,
    };

    public static final int[] executionSkills = new int[] {
            TEARING_KNIFE,
            PHANTOM_BLADE,
            CHAIN_SICKLE,
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

            SNEAKY_SNIPING_POSSESS,
            SNEAKY_SNIPING_2_POSSESS,
            FATAL_BLITZ,
    };

    public static final int[] whisperShotSkills = new int[]{
            STRIKE_ARROW,
            STRIKE_ARROW_2,
            SCATTERING_SHOT,
            STRIKE_ARROW_3,
            SHAFT_BREAK,
            FALLING_DUST,

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
            PRIOR_PREPARATION
    };

    private Map<Integer, Integer> kainStackSkills = new HashMap<>(); // <SkillId, CurStack>
    private int advDeathBlessingKillCount = 0;

    public Kain(Char chr) {
        super(chr);
        if (isHandlerOfJob(chr.getJob())) {
            for (int id : addedSkills) {
                if (!chr.hasSkill(id)) {
                    Skill skill = SkillData.getSkillDeepCopyById(id);
                    if (skill != null) {
                        skill.setCurrentLevel(skill.getMasterLevel());
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

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(410000401);
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
        if (level == 10) {
            chr.setJob(JobConstants.JobEnum.KAIN_1.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.KAIN_1.getJobId(), 5);
            chr.addStatAndSendPacket(Stat.ap, 5);
        } else if (level == 30) {
            chr.setJob(JobConstants.JobEnum.KAIN_2.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.KAIN_2.getJobId(), 4);
            chr.addStatAndSendPacket(Stat.ap, 4);
        } else if (level == 60) {
            chr.setJob(JobConstants.JobEnum.KAIN_3.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.KAIN_3.getJobId(), 4);
            chr.addStatAndSendPacket(Stat.ap, 5);
        } else if (level == 100) {
            chr.setJob(JobConstants.JobEnum.KAIN_4.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.KAIN_4.getJobId(), 3);
            chr.addStatAndSendPacket(Stat.ap, 5);
        }
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        // Secondary Weapon: Basic Weapon Belt (1354020)
        Item secondary = ItemData.getItemDeepCopy(1354020);
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
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.indieDamR, slv) : 15;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 40;
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                o2.nReason = skillID;
                o2.nValue = 100;
                o2.tTerm = o1.tTerm;
                tsm.sendStat(CharacterTemporaryStat.IndieStance, o2);
                break;
            case DRAGON_SCALE:
                o1.nReason = skillID;
                o1.nValue = 1;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 3;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                break;
            case THANATOS_DESCENT:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.indieDamR, slv) : 30;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 35;
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                o2.nReason = skillID;
                o2.nValue = 100;
                o2.tTerm = o1.tTerm;
                tsm.sendStat(CharacterTemporaryStat.IndieStance, o2);
                break;
            case CHURNING_MALICE:
                // Origin Skill 6th Job: 7 seconds invincibility (iframe) during cast animation
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 7;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        other.write(UserLocal.showHexaSkillEff(chr));
                    }
                }
                break;
            case TOTAL_ANNIHILATION:
                // 6th Job Active: 6s invincibility (ndTime: 5200)
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 6;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                break;
            case REMAIN_INCENSE:
                if (tsm.hasStatBySkillId(REMAIN_INCENSE)) {
                    tsm.removeStatsBySkill(REMAIN_INCENSE);
                } else {
                    o1.nOption = 1;
                    o1.rOption = REMAIN_INCENSE;
                    tsm.sendStat(CharacterTemporaryStat.IndieEmpty, o1);
                }
                break;
        }
    }

    @Override
    public void handleAttack(Client c, AttackInfo attackInfo, SkillInfo si, long now) {
        Char chr = c.getChr();
        super.handleAttack(c, attackInfo, si, now);
        int skillID = attackInfo.skillId;
        switch (skillID) {
            case CHURNING_MALICE:
            case CHURNING_MALICE_ATTACK_1:
            case CHURNING_MALICE_ATTACK_2:
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob targetMob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (targetMob == null) continue;
                    MobTemporaryStat mts = targetMob.getTemporaryStat();
                    Option opt1 = new Option();
                    opt1.nOption = 1;
                    opt1.rOption = skillID;
                    opt1.tOption = 10; // 10s Absolute Freeze / Bind
                    opt1.cOption = chr.getId();
                    mts.addStatOptions(targetMob, MobStat.Freeze, opt1);
                }
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        other.write(UserLocal.showHexaSkillEff(chr));
                    }
                }
                break;
            case TOTAL_ANNIHILATION:
            case TOTAL_ANNIHILATION_ATTACK_1:
            case TOTAL_ANNIHILATION_ATTACK_2:
            case TOTAL_ANNIHILATION_ATTACK_3:
            case TOTAL_ANNIHILATION_ATTACK_4:
            case TOTAL_ANNIHILATION_ATTACK_5:
                break;
        }
    }
}
