package net.swordie.ms.client.jobs.anima;

import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.SecondAtom;
import net.swordie.ms.client.character.skills.SkillStat;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.MobAttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.enums.AssistType;
import net.swordie.ms.enums.ChatType;
import net.swordie.ms.enums.MoveAbility;
import net.swordie.ms.enums.Stat;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.loaders.ItemData;

import java.util.EnumMap;

import static net.swordie.ms.enums.InvType.EQUIPPED;

public class Lara extends Job {
    public static final int WIND_SWING_FLY_SKILLID = 80003059;

    // Link Skill
    public static final int NATURE_FRIEND_ORIGIN = 160010001; // Link Skill
    public static final int NATURE_FRIEND_LINKED = 80003058; // Link Skill
    public static final int NATURE_FRIEND_LINKED_BUFF = 80003070; // Link Skill Buff

    // 0th Job
    public static final int SPIRIT_AFFINITY = 160010000;

    // 1st Job
    // Passive
    public static final int MOUNTAIN_KID_PASSIVE = 162000003;
    public static final int RESPONSE = 162000006;
    // Active
    public static final int ESSENCE_SPRINKLE = 162001000;
    public static final int JUMP_FOR_JOY = 162001001; // Flash Jump
    public static final int LEAP_UP = 162001002; // Up Jump
    public static final int MOUNTAIN_KID_ACTIVE = 162001004;
    public static final int PEERLESS_MOUNTAIN = 162001005; // ON/OFF (CTS Val: 686)


    // 2nd Job
    // Passive
    public static final int ERUPTION_HEAVING_RIVER_PASSIVE = 162100002;
    public static final int ERUPTION_WHIRLWIND_PASSIVE = 162100005;
    public static final int ERUPTION_SUNRISE_WELL_PASSIVE = 162100008;
    public static final int WAND_MASTERY = 162100014;
    public static final int FORTUNE_FITNESS = 162100015;
    // Active
    public static final int DRAGON_VEIN_READING = 162101000; // (CTS Val: 684)
    public static final int DRAGON_VEIN_ERUPTION = 162101001;
    public static final int ERUPTION_HEAVING_RIVER_ACTIVE_1 = 162101003; // Summon
    public static final int ERUPTION_HEAVING_RIVER_ACTIVE_2 = 162101004;
    public static final int ERUPTION_WHIRLWIND_ACTIVE_1 = 162101006; // Summon
    public static final int ERUPTION_WHIRLWIND_ACTIVE_2 = 162101007;
    public static final int ERUPTION_SUNRISE_WELL_ACTIVE_1 = 162101009; // Normal Attack
    public static final int ERUPTION_SUNRISE_WELL_ACTIVE_2 = 162101010; // Affected Area (creates second Atoms)
    public static final int ERUPTION_SUNRISE_WELL_ACTIVE_3 = 162101011; // SecondAtom
    public static final int MOUNTAIN_SEEDS = 162101012; // Summon
    public static final int WAND_BOOSTER = 162101013;


    // 3rd Job
    // Passive
    public static final int DRAGON_VEIN_ECHO = 162110007;
    public static final int IMMACULATE_THOUGHT = 162110008;
    public static final int GEOMANCY = 162110009;
    // Active
    public static final int MANIFESTATION_WIND_SWING_ACTIVE_1 = 162111000; // Affected Area
    public static final int MANIFESTATION_WIND_SWING_ACTIVE_2 = 162111001; // Buff Info
    public static final int MANIFESTATION_WHERE_THE_RIVER_COURSES_ACTIVE_1 = 162111002; // SecondAtom
    public static final int MANIFESTATION_WHERE_THE_RIVER_COURSES_ACTIVE_2 = 162111010; // Contains Counter Number
    public static final int MANIFESTATION_SUNLIGHT_FILLED_GROUND_ACTIVE_1 = 162111003; // Affected Area
    public static final int MANIFESTATION_SUNLIGHT_FILLED_GROUND_ACTIVE_2 = 162111004; // Buff Info
    public static final int WAKEUP_CALL = 162111005;
    public static final int DRAGON_VEIN_TRACES = 162111006;


    // 4th Job
    // Passive
    public static final int ABSORPTION_RIVER_PUDDLE_DOUSE_PASSIVE = 162120002;
    public static final int ABSORPTION_FIERCE_WIND_PASSIVE = 162120005;
    public static final int ABSORPTION_SUNLIT_GRAIN_PASSIVE = 162120008;
    public static final int NATURE_MASTER = 162120011;
    public static final int BEST_FRIEND = 162120020;
    public static final int ADVANCED_WAND_MASTERY = 162120025;
    public static final int IN_DEPTH_GEOMANCY = 162120026;
    public static final int INSIGHT = 162120027;
    public static final int SOB = 162120028;
    // Active
    public static final int DRAGON_VEIN_ABSORPTION = 162121000;
    public static final int DRAGON_VEIN_CONVERSION = 162121001;
    public static final int ABSORPTION_RIVER_PUDDLE_DOUSE_ACTIVE_1 = 162121003;
    public static final int ABSORPTION_RIVER_PUDDLE_DOUSE_ACTIVE_2 = 162121004;
    public static final int ABSORPTION_FIERCE_WIND_ACTIVE_1 = 162121006;
    public static final int ABSORPTION_FIERCE_WIND_ACTIVE_2 = 162121007;
    public static final int ABSORPTION_SUNLIT_GRAIN_ACTIVE_1 = 162121009;
    public static final int ABSORPTION_SUNLIT_GRAIN_ACTIVE_2 = 162121010; // Second Atom & Called through extraSkillinfo
    public static final int ERUPTION_HEAVING_RIVER_UPGRADE_4_ACTIVE_1 = 162121012;
    public static final int ERUPTION_HEAVING_RIVER_UPGRADE_4_ACTIVE_2 = 162121013;
    public static final int ERUPTION_HEAVING_RIVER_UPGRADE_4_ACTIVE_3 = 162121014;
    public static final int ERUPTION_WHIRLWIND_UPGRADE_4_ACTIVE_1 = 162121015;
    public static final int ERUPTION_WHIRLWIND_UPGRADE_4_ACTIVE_2 = 162121016;
    public static final int ERUPTION_SUNRISE_WELL_UPGRADE_4_ACTIVE_1 = 162121017;
    public static final int ERUPTION_SUNRISE_WELL_UPGRADE_4_ACTIVE_2 = 162121018;
    public static final int ERUPTION_SUNRISE_WELL_UPGRADE_4_ACTIVE_3 = 162121019; // SecondAtom
    public static final int ESSENCE_SPRINKLE_UPGRADE_4 = 162121021;
    public static final int MOUNTAIN_EMBRACE = 162121022;
    public static final int ANIMA_WARRIOR = 162121023;
    public static final int ANIMA_HERO_WILL = 162121024;


    // Hypers
    // Passive
    public static final int ERUPTION_ABSORPTION_GUARD_BREAK = 162120031;
    public static final int ERUPTION_ABSORPTION_GUARD_REINFORCE = 162120032;
    public static final int ERUPTION_ABSORPTION_GUARD_BOSS_RUSH = 162120033;
    public static final int ESSENCE_SPRINKLE_BOSS_RUSH = 162120034;
    public static final int WAKEUP_CALL_COOLDOWN_CUTTER = 162120035; // Should automatically be handled
    public static final int MOUNTAIN_SEEDS_REINFORCE = 162120036;
    public static final int DRAGON_VEIN_ECHO_ENHANCE = 162120037;
    public static final int MOUNTAIN_EMBRACE_EXTRA_SHIELD = 162120038;
    public static final int DRAGON_VEIN_ENHANCE = 162120039;
    // Active
    public static final int VINE_COIL = 162121041; // 140
    public static final int UNCONSTRAINED_DRAGON_VEIN = 162121042; // 160
    public static final int ARBOR_AWAY_1 = 162121043; // 190
    public static final int ARBOR_AWAY_2 = 162121044; // 190

    // V skills
    public static final int BIG_STRETCH = 400021122;
    public static final int LANDS_CONNECTION = 400021123;
    public static final int LANDS_CONNECTION_PASSIVE_1 = 400021124;
    public static final int LANDS_CONNECTION_PASSIVE_2 = 400021125;
    public static final int LANDS_CONNECTION_PASSIVE_3 = 400021126;
    public static final int LANDS_CONNECTION_PASSIVE_4 = 400021127;
    public static final int LANDS_CONNECTION_PASSIVE_5 = 400021128;
    public static final int SURGING_ESSENCE = 400021129;
    public static final int WINDING_MOUNTAIN_RIDGE_1 = 400021130;
    public static final int WINDING_MOUNTAIN_RIDGE_2 = 400021131;

    // ===== 6th Job HEXA Origin Skill =====
    public static final int UNIVERSE_IN_BLOOM = 162141500;
    public static final int UNIVERSE_IN_BLOOM_ATTACK = 162141501;
    public static final int CORNUCOPIA = 162141502;

    // ===== 6th Job HEXA Mastery Skills =====
    public static final int HEXA_ERUPTION_HEAVING_RIVER = 162141001;
    public static final int HEXA_ERUPTION_HEAVING_RIVER_2 = 162141002;
    public static final int HEXA_ERUPTION_WHIRLWIND = 162141005;
    public static final int HEXA_ERUPTION_WHIRLWIND_2 = 162141006;
    public static final int HEXA_ERUPTION_SUNRISE_WELL = 162141008;
    public static final int HEXA_ERUPTION_SUNRISE_WELL_2 = 162141009;
    public static final int HEXA_DRAGON_VEIN_ABSORPTION = 162141010;
    public static final int HEXA_ABSORPTION_RIVER_PUDDLE_DOUSE = 162141012;
    public static final int HEXA_ABSORPTION_RIVER_PUDDLE_DOUSE_2 = 162141013;
    public static final int HEXA_ABSORPTION_FIERCE_WIND = 162141015;
    public static final int HEXA_ABSORPTION_FIERCE_WIND_2 = 162141016;
    public static final int HEXA_ABSORPTION_SUNLIT_GRAIN = 162141018;
    public static final int HEXA_ABSORPTION_SUNLIT_GRAIN_2 = 162141019;
    public static final int HEXA_WAKEUP_CALL = 162141020;

    public Lara(Char chr) {
        super(chr);
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isLara(id);
    }

    public void secondAtomCommandRequest(SecondAtom sa) {

    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.HENESYS_ID);
        cs.setJob(JobConstants.JobEnum.LARA_1.getJobId());
        cs.setLevel(10);
        cs.setStr(4);
        cs.setDex(4);
        cs.setInt(45);
        cs.setLuk(4);
        cs.setHp(1000);
        cs.setMaxHp(1000);
        cs.setMp(800);
        cs.setMaxMp(800);
        cs.getExtendSP().addSpToJobLevel(1, 5);
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        // Secondary Weapon: Ornamental Knot (1354010)
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

        // Primary Weapon: Basic Wand (1372000)
        if (chr.getEquippedItemByBodyPart(BodyPart.Weapon) == null) {
            Item weapon = ItemData.getItemDeepCopy(1372000);
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
        short curJob = chr.getJob();
        if (level >= 100 && curJob < JobConstants.JobEnum.LARA_4.getJobId()) {
            chr.setJob(JobConstants.JobEnum.LARA_4.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_1.getJobId(), 5);
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 5);
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_3.getJobId(), 5);
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_4.getJobId(), 5);
            chr.addStatAndSendPacket(Stat.ap, 5);
            chr.maxSkills();
        } else if (level >= 60 && curJob < JobConstants.JobEnum.LARA_3.getJobId()) {
            chr.setJob(JobConstants.JobEnum.LARA_3.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 5);
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_3.getJobId(), 4);
            chr.addStatAndSendPacket(Stat.ap, 5);
            chr.maxSkills();
        } else if (level >= 30 && curJob < JobConstants.JobEnum.LARA_2.getJobId()) {
            chr.setJob(JobConstants.JobEnum.LARA_2.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 4);
            chr.addStatAndSendPacket(Stat.ap, 4);
            chr.maxSkills();
        }
    }

    @Override
    public void handleJobAdvance() {
        ScriptManagerImpl sm = chr.getScriptManager();
        short curJob = chr.getJob();
        if (curJob == JobConstants.JobEnum.LARA_1.getJobId() || curJob == JobConstants.JobEnum.LARA.getJobId()) {
            if (chr.getLevel() < 30) {
                sm.sendSayOkay("#eThis job requires you to be at least level #r30#k prior to advancement.");
                return;
            }
            if (chr.getLevel() >= 100) {
                chr.setJob(JobConstants.JobEnum.LARA_4.getJobId());
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_1.getJobId(), 5);
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 5);
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_3.getJobId(), 5);
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_4.getJobId(), 5);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Lara] Advanced to 4th Job (16212)!");
            } else if (chr.getLevel() >= 60) {
                chr.setJob(JobConstants.JobEnum.LARA_3.getJobId());
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_1.getJobId(), 5);
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 5);
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_3.getJobId(), 5);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Lara] Advanced to 3rd Job (16211)!");
            } else {
                chr.setJob(JobConstants.JobEnum.LARA_2.getJobId());
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_1.getJobId(), 5);
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 5);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Lara] Advanced to 2nd Job (16210)!");
            }
        } else if (curJob == JobConstants.JobEnum.LARA_2.getJobId()) {
            if (chr.getLevel() < 60) {
                sm.sendSayOkay("#eThis job requires you to be at least level #r60#k prior to advancement.");
                return;
            }
            if (chr.getLevel() >= 100) {
                chr.setJob(JobConstants.JobEnum.LARA_4.getJobId());
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 5);
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_3.getJobId(), 5);
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_4.getJobId(), 5);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Lara] Advanced to 4th Job (16212)!");
            } else {
                chr.setJob(JobConstants.JobEnum.LARA_3.getJobId());
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 5);
                chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_3.getJobId(), 5);
                chr.maxSkills();
                chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Lara] Advanced to 3rd Job (16211)!");
            }
        } else if (curJob == JobConstants.JobEnum.LARA_3.getJobId()) {
            if (chr.getLevel() < 100) {
                sm.sendSayOkay("#eThis job requires you to be at least level #r100#k prior to advancement.");
                return;
            }
            chr.setJob(JobConstants.JobEnum.LARA_4.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_3.getJobId(), 5);
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_4.getJobId(), 5);
            chr.maxSkills();
            chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Lara] Advanced to 4th Job (16212)!");
        } else if (curJob == JobConstants.JobEnum.LARA_4.getJobId()) {
            chr.maxSkills();
            sm.sendSayOkay("#eYou are already at 4th Job (Lara). All skills have been refreshed and maxed!");
        }
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        super.handleInitAfterMigrate(chr);
        short curJob = chr.getJob();
        if (chr.getLevel() >= 100 && curJob < JobConstants.JobEnum.LARA_4.getJobId()) {
            chr.setJob(JobConstants.JobEnum.LARA_4.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_1.getJobId(), 5);
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 5);
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_3.getJobId(), 5);
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_4.getJobId(), 5);
            chr.maxSkills();
            chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[Lara] Job Auto-Repair: Advanced to 4th Job (16212) and maxed all skills!");
        } else if (chr.getLevel() >= 60 && curJob < JobConstants.JobEnum.LARA_3.getJobId()) {
            chr.setJob(JobConstants.JobEnum.LARA_3.getJobId());
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_2.getJobId(), 5);
            chr.addSpToSpecificJob((short) JobConstants.JobEnum.LARA_3.getJobId(), 5);
            chr.maxSkills();
        }

        if (chr.getJob() == JobConstants.JobEnum.LARA_4.getJobId() && !chr.hasSkill(162121000)) {
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

        switch (skillID) {
            case WAND_BOOSTER:
                o1.nOption = si != null ? si.getValue(SkillStat.x, slv) : -2;
                o1.rOption = skillID;
                o1.tOption = si != null ? si.getValue(SkillStat.time, slv) : 200;
                tsm.sendStat(CharacterTemporaryStat.Booster, o1);
                break;
            case ANIMA_WARRIOR:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.x, slv) : 15;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 900;
                tsm.sendStat(CharacterTemporaryStat.BasicStatUp, o1);
                break;
            case ANIMA_HERO_WILL:
                tsm.removeAllDebuffs();
                break;
            case PEERLESS_MOUNTAIN:
                if (tsm.hasStatBySkillId(PEERLESS_MOUNTAIN)) {
                    tsm.removeStatsBySkill(PEERLESS_MOUNTAIN);
                } else {
                    o1.nOption = 1;
                    o1.rOption = PEERLESS_MOUNTAIN;
                    tsm.sendStat(CharacterTemporaryStat.IndieEmpty, o1);
                }
                break;
            case MOUNTAIN_EMBRACE:
                // Damage reduction while channel/protecting (-60%)
                o1.nReason = skillID;
                o1.nValue = -60;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 8;
                tsm.sendStat(CharacterTemporaryStat.IndieDamReduceR, o1);
                break;
            case ARBOR_AWAY_1:
            case ARBOR_AWAY_2:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.indieDamR, slv) : 10;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 30;
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                break;
            case BIG_STRETCH:
                chr.chatMessage(ChatType.Notice, "[Big Stretch] Giant Land Spirits manifested!");
                chr.dispose();
                break;
            case UNCONSTRAINED_DRAGON_VEIN:
            case DRAGON_VEIN_READING:
            case DRAGON_VEIN_CONVERSION:
                chr.dispose();
                break;
            case MOUNTAIN_SEEDS:
                if (chr.getField() != null) {
                    Summon summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                    summon.setMoveAbility(MoveAbility.Stop);
                    summon.setAssistType(AssistType.Attack);
                    chr.getField().spawnSummon(summon);
                }
                break;
            case LANDS_CONNECTION:
                o1.nReason = skillID;
                o1.nValue = si != null ? si.getValue(SkillStat.indieDamR, slv) : 15;
                o1.tTerm = si != null ? si.getValue(SkillStat.time, slv) : 20;
                tsm.sendStat(CharacterTemporaryStat.IndieDamR, o1);
                break;
            case UNIVERSE_IN_BLOOM:
            case UNIVERSE_IN_BLOOM_ATTACK:
            case CORNUCOPIA:
                // Origin cutscene invincibility (7s)
                o1.nReason = skillID;
                o1.nValue = 1;
                o1.tTerm = 7;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                chr.write(UserLocal.showHexaSkillEff(chr));
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        other.write(UserLocal.showHexaSkillEff(chr));
                    }
                }
                chr.chatMessage(ChatType.Notice, "[Origin] Universe in Bloom activated! Nature's bounty purifies all.");
                chr.dispose();
                break;
            default:
                chr.dispose();
                break;
        }
    }

    @Override
    public void handleAttack(Client c, AttackInfo attackInfo, SkillInfo si, long now) {
        Char chr = c.getChr();
        super.handleAttack(c, attackInfo, si, now);
        int skillID = attackInfo.skillId;

        // Hyper Skill: Vine Coil (10s Stun / Bind)
        if (skillID == VINE_COIL) {
            for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                if (mob != null && mob.getHp() > 0) {
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    Option o = new Option();
                    o.nOption = 1;
                    o.rOption = skillID;
                    o.tOption = 10; // 10s Stun
                    mts.addStatOptions(mob, MobStat.Stun, o);
                }
            }
        }

        // Origin Skill: Universe in Bloom / Cornucopia (10s Freeze / Bind, Party Effect)
        if (skillID == UNIVERSE_IN_BLOOM || skillID == UNIVERSE_IN_BLOOM_ATTACK || skillID == CORNUCOPIA) {
            for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                if (mob != null && mob.getHp() > 0) {
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    Option opt1 = new Option();
                    opt1.nOption = 1;
                    opt1.rOption = skillID;
                    opt1.tOption = 10; // 10s Absolute Freeze / Bind
                    opt1.cOption = chr.getId();
                    mts.addStatOptions(mob, MobStat.Freeze, opt1);
                    Option opt2 = new Option();
                    opt2.nOption = 1;
                    opt2.rOption = skillID;
                    opt2.tOption = 20; // 20s Origin Debuff
                    opt2.cOption = chr.getId();
                    mts.addStatOptions(mob, MobStat.OriginDebuff, opt2);
                }
            }
            if (chr.getParty() != null) {
                for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                    other.write(UserLocal.showHexaSkillEff(chr));
                }
            }
        }
    }
}
