package net.swordie.ms.client.jobs.nova;

import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.ShootObjectSkillInfo;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.MobAttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.Effect;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.UserPacket;
import net.swordie.ms.connection.packet.UserRemote;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.AssistType;
import net.swordie.ms.enums.MoveAbility;
import net.swordie.ms.life.AffectedArea;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.life.mob.skill.BurnedInfo;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Util;

import java.util.Arrays;
import java.util.EnumMap;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;
import static net.swordie.ms.enums.InvType.EQUIPPED;

/**
 * @author Sjonnie
 * Created on 6/25/2018.
 */
public class Cadena extends Job {

    public static final int HAGGLE = 60020216;
    public static final int BACK_TO_HQ = 60021217;
    public static final int UNFAIR_ADVANTAGE = 60020218;
    public static final int CHAIN_ARTS_TRASH = 60021278;
    public static final int CHAIN_ARTS_TRASH_2 = 60021279;

    public static final int SUMMON_SCIMITAR = 64001002;
    public static final int SUMMON_SCIMITAR2 = 64001013;
    public static final int CHAIN_ARTS_PURSUIT_HORIZONTAL = 64001009;
    public static final int CHAIN_ARTS_PURSUIT_HORIZONTAL_START = 64001000;
    public static final int CHAIN_ARTS_PURSUIT_UP = 64001010;
    public static final int CHAIN_ARTS_PURSUIT_UP_START = 64001007;
    public static final int CHAIN_ARTS_PURSUIT_DOWN = 64001011;
    public static final int CHAIN_ARTS_PURSUIT_DOWN_START = 64001008;
    public static final int CHAIN_ARTS_PURSUIT_PULL = 64001012;

    public static final int WEAPON_BOOSTER_CADENA = 64101003;
    public static final int SUMMON_SHURIKEN = 64101002;
    public static final int SUMMON_SHURIKEN2 = 64101008;
    public static final int SUMMON_CLAW = 64101001;

    public static final int SUMMON_DAGGERS = 64111003;
    public static final int SUMMON_SHOTGUN = 64111002;
    public static final int SUMMON_DECOY_BOMB = 64111004;
    public static final int SUMMON_DECOY_BOMB2 = 64111012;

    public static final int CHEAP_SHOT_II = 64120007;
    public static final int NOVA_WARRIOR_CADENA = 64121004;
    public static final int NOVA_TEMPERANCE = 64121005;
    public static final int CHAIN_ART_BEATDOWN = 64121001;
    public static final int SUMMON_BRICK = 64121021;
    public static final int SUMMON_SPIKED_BAT_1 = 64121003;
    public static final int SUMMON_SPIKED_BAT_3 = 64121011;

    public static final int CHAIN_ARTS_TRASH_LINKED_ATTACK_REINFORCE = 64120046;
    public static final int CHAIN_ARTS_CRUSH = 64121052;
    public static final int SHADOW_DEALER_ELIXIR = 64121054;
    public static final int VETERAN_SHADOWDEALER = 64121053;
    public static final int VETERAN_SHADOW_DEALER_FA = 64121055;

    public static final int APOCALYPSE_CANNON_SUMMON = 400041033;
    public static final int APOCALYPSE_CANNON_SHOOTOBJ = 400041034;
    public static final int CHAIN_ARTS_VOID_STRIKE_BUFF = 400041035;
    public static final int CHAIN_ARTS_VOID_STRIKE_ATTACK = 400041036;
    public static final int CHAIN_ARTS_MAELSTROM = 400041041;
    public static final int MUSCLE_MEMORY_FINALE = 400041074;

    public static final int MUSCLE_MEMORY_I_BUFF = 64100004;
    public static final int MUSCLE_MEMORY_I_ATTACK = 64101009;
    public static final int MUSCLE_MEMORY_II_BUFF = 64110005;
    public static final int MUSCLE_MEMORY_II_ATTACK = 64111013;
    public static final int MUSCLE_MEMORY_III_BUFF = 64120006;
    public static final int MUSCLE_MEMORY_III_ATTACK = 64121020;

    public static final int CHAIN_ART_TRASH_I = 64001001;
    public static final int CHAIN_ART_TRASH_I_2 = 64001006;
    public static final int CHAIN_ART_TRASH_II = 64100000;
    public static final int CHAIN_ART_TRASH_III = 64110000;
    public static final int CHAIN_ART_TRASH_IV = 64120000;
    public static final int CHAIN_ART_REIGN_OF_CHAINS = 64121002;

    // 6th Job HEXA Skills
    public static final int HEXA_CHAIN_ARTS_THRASH = 64141000;
    public static final int HEXA_CHAIN_ARTS_THRASH_2 = 64141001;
    public static final int HEXA_CHAIN_ARTS_THRASH_3 = 64141002;
    public static final int HEXA_CHAIN_ARTS_THRASH_4 = 64141003;

    public static final int HEXA_MUSCLE_MEMORY_BUFF = 64141004;
    public static final int HEXA_MUSCLE_MEMORY_ATTACK = 64141005;
    public static final int HEXA_MUSCLE_MEMORY_ATTACK_2 = 64141006;
    public static final int HEXA_MUSCLE_MEMORY_ATTACK_3 = 64141007;

    public static final int HEXA_SUMMON_SPIKED_BAT_1 = 64141008;
    public static final int HEXA_SUMMON_SPIKED_BAT_2 = 64141009;
    public static final int HEXA_SUMMON_SPIKED_BAT_3 = 64141010;

    public static final int HEXA_VETERAN_SHADOWDEALER = 64141011;
    public static final int HEXA_VETERAN_SHADOW_DEALER_FA = 64141012;

    public static final int HEXA_CHAIN_ARTS_BEATDOWN = 64141013;
    public static final int HEXA_CHAIN_ARTS_CRUSH = 64141021;
    public static final int HEXA_SUMMON_SHOTGUN = 64141022;
    public static final int HEXA_SUMMON_BRICK = 64141023;
    public static final int HEXA_SUMMON_BRICK_2 = 64141024;
    public static final int HEXA_SUMMON_BRICK_3 = 64141025;
    public static final int HEXA_SUMMON_BRICK_4 = 64141026;
    public static final int HEXA_SUMMON_DAGGERS = 64141027;
    public static final int HEXA_SUMMON_DECOY_BOMB = 64141028;
    public static final int HEXA_SUMMON_DECOY_BOMB2 = 64141029;
    public static final int HEXA_SUMMON_SCIMITAR = 64141030;
    public static final int HEXA_SUMMON_SCIMITAR2 = 64141031;
    public static final int HEXA_SUMMON_SHURIKEN = 64141032;
    public static final int HEXA_SUMMON_SHURIKEN2 = 64141033;
    public static final int HEXA_SUMMON_CLAW = 64141034;

    public static final int CHAIN_ARTS_GRAND_ARSENAL = 64141500;
    public static final int CHAIN_ARTS_GRAND_ARSENAL_2 = 64141501;
    public static final int CHAIN_ARTS_GRAND_ARSENAL_3 = 64141502;
    public static final int BRUTAL_RAMPAGE = 64141503;
    public static final int BRUTAL_RAMPAGE_2 = 64141504;

    private static final int[] addedSkills = new int[]{
            HAGGLE,
            BACK_TO_HQ,
            UNFAIR_ADVANTAGE,
    };

    private static final int[] muscleMemoryBuff = new int[]{
            MUSCLE_MEMORY_I_BUFF,
            MUSCLE_MEMORY_II_BUFF,
            MUSCLE_MEMORY_III_BUFF,
            HEXA_MUSCLE_MEMORY_BUFF,
    };

    private static final int[] muscleMemoryAttack = new int[]{
            MUSCLE_MEMORY_I_ATTACK,
            MUSCLE_MEMORY_II_ATTACK,
            MUSCLE_MEMORY_III_ATTACK,
            MUSCLE_MEMORY_FINALE,
            400041075,
            HEXA_MUSCLE_MEMORY_ATTACK,
            HEXA_MUSCLE_MEMORY_ATTACK_2,
            HEXA_MUSCLE_MEMORY_ATTACK_3,
    };

    private static final int[] chainArtSkills = new int[]{
            CHAIN_ARTS_TRASH,
            CHAIN_ARTS_TRASH_2,
            CHAIN_ART_TRASH_I,
            CHAIN_ART_TRASH_I_2,
            CHAIN_ART_TRASH_II,
            CHAIN_ART_TRASH_III,
            CHAIN_ART_TRASH_IV,
            CHAIN_ART_REIGN_OF_CHAINS,
            CHAIN_ARTS_VOID_STRIKE_ATTACK,
            HEXA_CHAIN_ARTS_THRASH,
            HEXA_CHAIN_ARTS_THRASH_2,
            HEXA_CHAIN_ARTS_THRASH_3,
            HEXA_CHAIN_ARTS_THRASH_4,
    };

    private static final int[] summonedSkills = new int[]{
            SUMMON_SCIMITAR,
            SUMMON_CLAW,
            SUMMON_SHURIKEN,
            SUMMON_DAGGERS,
            SUMMON_SHOTGUN,
            SUMMON_DECOY_BOMB,
            SUMMON_BRICK,
            SUMMON_SPIKED_BAT_1,
            APOCALYPSE_CANNON_SUMMON
    };

    private int lastAttack = 0;
    private long lastMMAttack = Long.MIN_VALUE;

    public Cadena(Char chr) {
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
        return JobConstants.isCadena(id);
    }


    @Override
    public void handleShootObject(Char chr, ShootObjectSkillInfo sosi) {
        var skillId = sosi.getSkillId();
        switch (skillId) {
            case SUMMON_DECOY_BOMB:
            case SUMMON_DECOY_BOMB2:
                chr.addSkillCooldown(SUMMON_DECOY_BOMB, 8 * 1000);
                increaseMuscleMemory(SUMMON_DECOY_BOMB);
                break;
            case HEXA_SUMMON_DECOY_BOMB:
            case HEXA_SUMMON_DECOY_BOMB2:
                chr.addSkillCooldown(HEXA_SUMMON_DECOY_BOMB, 8 * 1000);
                increaseMuscleMemory(HEXA_SUMMON_DECOY_BOMB);
                break;
        }
        super.handleShootObject(chr, sosi);
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        Option o1 = new Option();
        Option o2 = new Option();
        MobTemporaryStat mts = mob.getTemporaryStat();
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        EnumMap<MobStat, Option> map = new EnumMap<>(MobStat.class);

        if (skillID != VETERAN_SHADOW_DEALER_FA
                && skillID != HEXA_VETERAN_SHADOW_DEALER_FA
                && skillID != APOCALYPSE_CANNON_SUMMON
                && (tsm.getOptByCTSAndSkill(TempSecondaryStat, VETERAN_SHADOWDEALER) != null
                || tsm.getOptByCTSAndSkill(TempSecondaryStat, HEXA_VETERAN_SHADOWDEALER) != null)) {
            int faSkill = chr.hasSkill(HEXA_VETERAN_SHADOWDEALER) ? HEXA_VETERAN_SHADOW_DEALER_FA : VETERAN_SHADOW_DEALER_FA;
            chr.write(UserLocal.userBonusAttackRequest(faSkill));
        }
        if (skillID != CHAIN_ARTS_VOID_STRIKE_ATTACK
                && tsm.getOptByCTSAndSkill(ChainArtsFury, CHAIN_ARTS_VOID_STRIKE_BUFF) != null
                && !chr.hasSkillOnCooldown(CHAIN_ARTS_VOID_STRIKE_ATTACK)) {
            chr.write(UserLocal.cadenaVoidStrikeRequest(mob.getPosition()));
        }
        applyCheapShotDoT(mob, damage);
        switch (skillID) {
            case CHAIN_ART_TRASH_I:
            case CHAIN_ARTS_TRASH:
            case CHAIN_ARTS_TRASH_2:
            case CHAIN_ART_TRASH_I_2:
            case CHAIN_ART_TRASH_II:
            case CHAIN_ART_TRASH_III:
            case CHAIN_ART_TRASH_IV:
            case HEXA_CHAIN_ARTS_THRASH:
            case HEXA_CHAIN_ARTS_THRASH_2:
            case HEXA_CHAIN_ARTS_THRASH_3:
            case HEXA_CHAIN_ARTS_THRASH_4:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = -30;
                    o1.rOption = skillID;
                    o1.tOption = 5;
                    mts.addStatOptions(mob, MobStat.Speed, o1);
                }
                break;
            case CHAIN_ART_BEATDOWN:
            case HEXA_CHAIN_ARTS_BEATDOWN:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    o1.tOption = 10;
                    mts.addStatOptions(mob, MobStat.Stun, o1);
                }
                break;
            case SUMMON_DAGGERS:
            case HEXA_SUMMON_DAGGERS:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = si.getValue(x, slv);
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(time, slv);
                    map.put(MobStat.PDR, o1);
                    o2.nOption = si.getValue(x, slv);
                    o2.rOption = skillID;
                    o2.tOption = si.getValue(time, slv);
                    map.put(MobStat.MDR, o2);
                    mts.addStatOptions(mob, map);
                }
                break;
            case SUMMON_SPIKED_BAT_3:
            case HEXA_SUMMON_SPIKED_BAT_3:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    if (Util.succeedProp(si.getValue(s2, slv))) {
                        int batParent = skillID == HEXA_SUMMON_SPIKED_BAT_3 ? HEXA_SUMMON_SPIKED_BAT_1 : SUMMON_SPIKED_BAT_1;
                        si = SkillData.getSkillInfoById(batParent);
                        slv = chr.getSkillLevel(batParent);
                        if (si != null && slv > 0) {
                            o1.nOption = si.getValue(u, slv);
                            o1.rOption = skillID;
                            o1.tOption = si.getValue(s, slv);
                            map.put(MobStat.PAD, o1);
                            o2.nOption = si.getValue(u, slv);
                            o2.rOption = skillID;
                            o2.tOption = si.getValue(s, slv);
                            map.put(MobStat.MAD, o2);
                            mts.addStatOptions(mob, map);
                        }
                    }
                }
                break;
        }
        super.handleDebuffOnMob(c, mob, si, skillID, slv, damage);
    }

    @Override
    public void handleAttack(Client c, AttackInfo attackInfo, SkillInfo si, long now) {
        Char chr = c.getChr();
        super.handleAttack(c, attackInfo, si, now);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int skillID = attackInfo.skillId;
        boolean hasHitMobs = !attackInfo.mobAttackInfo.isEmpty();
        int slv = attackInfo.slv;
        if (hasHitMobs) {
            increaseMuscleMemory(skillID);
        }
        Option o1 = new Option();
        Option o2 = new Option();
        switch (attackInfo.skillId) {
            case SUMMON_SCIMITAR2:
                chr.addSkillCooldown(SUMMON_SCIMITAR, 4 * 1000);
                increaseMuscleMemory(SUMMON_SCIMITAR);
                break;
            case HEXA_SUMMON_SCIMITAR2:
                chr.addSkillCooldown(HEXA_SUMMON_SCIMITAR, 4 * 1000);
                increaseMuscleMemory(HEXA_SUMMON_SCIMITAR);
                break;
            case SUMMON_DECOY_BOMB2:
                chr.addSkillCooldown(SUMMON_DECOY_BOMB, 8 * 1000);
                break;
            case HEXA_SUMMON_DECOY_BOMB2:
                chr.addSkillCooldown(HEXA_SUMMON_DECOY_BOMB, 8 * 1000);
                break;
            case CHAIN_ART_TRASH_I:
            case HEXA_CHAIN_ARTS_THRASH:
                o2.nOption = (si != null ? si.getValue(x, slv) : 10) + (chr.hasSkill(CHAIN_ARTS_TRASH_LINKED_ATTACK_REINFORCE) ? 5 : 0);
                o2.rOption = attackInfo.skillId;
                o2.tOption = 1;
                tsm.sendStat(NextAttackEnhance, o2);
                break;
            case CHAIN_ARTS_TRASH:
            case CHAIN_ARTS_TRASH_2:
            case CHAIN_ART_TRASH_I_2:
            case CHAIN_ART_TRASH_II:
            case CHAIN_ART_TRASH_III:
            case CHAIN_ART_TRASH_IV:
            case HEXA_CHAIN_ARTS_THRASH_2:
            case HEXA_CHAIN_ARTS_THRASH_3:
            case HEXA_CHAIN_ARTS_THRASH_4:
                tsm.removeStatsBySkill(CHAIN_ART_TRASH_I);
                tsm.removeStatsBySkill(HEXA_CHAIN_ARTS_THRASH);
                break;
            case CHAIN_ARTS_VOID_STRIKE_ATTACK:
                chr.addSkillCooldown(attackInfo.skillId, 600);
                break;
            case CHAIN_ARTS_PURSUIT_UP:
            case CHAIN_ARTS_PURSUIT_DOWN:
                chr.write(UserPacket.effect(Effect.showChainArtPursuitEffect(attackInfo.skillId, chr.getLevel(), slv, attackInfo.left, attackInfo.ptTarget)));
                chr.getField().broadcast(UserRemote.effect(chr.getId(), Effect.showChainArtPursuitEffect(attackInfo.skillId, chr.getLevel(), slv, attackInfo.left, attackInfo.ptTarget)));
                tsm.removeStat(DarkSight);
                break;
            case CHAIN_ARTS_PURSUIT_HORIZONTAL:
                o1.nOption = -30;
                o1.rOption = skillID;
                o1.tOption = 5;
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (mob == null || mob.getHp() <= 0) {
                        continue;
                    }
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    mts.addStatOptions(mob, MobStat.Speed, o1.deepCopy());

                    chr.write(UserPacket.effect(Effect.showChainArtPursuitEffect(attackInfo.skillId, chr.getLevel(), slv,
                            attackInfo.left, new Position(mob.getPosition().getX(), chr.getPosition().getY()))));
                    mob.getField().broadcast(UserRemote.effect(chr.getId(), Effect.showChainArtPursuitEffect(attackInfo.skillId, chr.getLevel(), slv,
                            attackInfo.left, new Position(mob.getPosition().getX(), chr.getPosition().getY()))), chr);
                }
                tsm.removeStat(DarkSight);
                break;
            case CHAIN_ARTS_GRAND_ARSENAL:
            case CHAIN_ARTS_GRAND_ARSENAL_2:
            case CHAIN_ARTS_GRAND_ARSENAL_3:
            case BRUTAL_RAMPAGE:
            case BRUTAL_RAMPAGE_2:
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob targetMob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (targetMob == null) continue;
                    MobTemporaryStat mts = targetMob.getTemporaryStat();
                    EnumMap<MobStat, Option> newMobStats = new EnumMap<>(MobStat.class);
                    Option opt1 = new Option();
                    opt1.nOption = 1;
                    opt1.rOption = skillID;
                    opt1.tOption = 10; // 10s Absolute Freeze
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
                setMuscleMemory(8);
                break;
        }
    }

    @Override
    public void handleSkillRemove(Char chr, int skillId) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        tsm.removeStat(DarkSight); // sent when Cadena needs to go out of DarkSight Mode from Pursuit
    }

    private int getBaseWeaponSkillId(int skillId) {
        int actual = net.swordie.ms.constants.SkillConstants.getActualSkillIDfromSkillID(skillId);
        return switch (actual) {
            case HEXA_SUMMON_SCIMITAR -> SUMMON_SCIMITAR;
            case HEXA_SUMMON_CLAW -> SUMMON_CLAW;
            case HEXA_SUMMON_SHURIKEN -> SUMMON_SHURIKEN;
            case HEXA_SUMMON_DAGGERS -> SUMMON_DAGGERS;
            case HEXA_SUMMON_SHOTGUN -> SUMMON_SHOTGUN;
            case HEXA_SUMMON_DECOY_BOMB -> SUMMON_DECOY_BOMB;
            case HEXA_SUMMON_BRICK -> SUMMON_BRICK;
            case HEXA_SUMMON_SPIKED_BAT_1 -> SUMMON_SPIKED_BAT_1;
            default -> actual;
        };
    }

    private void increaseMuscleMemory(int skillId) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int baseSkillId = getBaseWeaponSkillId(skillId);
        int amount = 1;
        if (lastAttack == baseSkillId
                || SUMMON_SHURIKEN2 == skillId
                || HEXA_SUMMON_SHURIKEN2 == skillId
                || APOCALYPSE_CANNON_SUMMON == baseSkillId
                || Arrays.stream(chainArtSkills).anyMatch(s -> s == skillId || s == baseSkillId)
                || Arrays.stream(muscleMemoryAttack).anyMatch(s -> s == skillId || s == baseSkillId)) {
            return;
        }
        if (tsm.hasStat(WeaponVariety)) {
            amount = tsm.getOption(WeaponVariety).nOption;
            long maxStacks = Math.max(8, Arrays.stream(summonedSkills).filter(skill -> chr.hasSkill(skill)).count());
            if (amount < maxStacks) {
                amount++;
            }
        }
        lastAttack = baseSkillId;
        setMuscleMemory(amount);
    }

    private void setMuscleMemory(int mmCombo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Skill skill = getMuscleMemorySkill();
        if (skill == null) {
            return;
        }
        SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
        int slv = skill.getCurrentLevel();
        Option o1 = new Option();
        o1.nOption = mmCombo;
        o1.rOption = skill.getSkillId();
        o1.tOption = si != null && si.getValue(time, slv) > 0 ? si.getValue(time, slv) : 20;
        tsm.sendStat(WeaponVariety, o1);

        if (mmCombo > 0 && (lastMMAttack + 500 < Util.getCurrentTime())) {
            lastMMAttack = Util.getCurrentTime();
            chr.write(UserLocal.userBonusAttackRequest(getMMAttackByMMBuff(skill.getSkillId())));
        }
    }

    private Skill getMuscleMemorySkill() {
        Skill skill = null;
        for (int muscleMem : muscleMemoryBuff) {
            if (chr.hasSkill(muscleMem)) {
                skill = chr.getSkill(muscleMem);
            }
        }
        return skill;
    }

    private int getMMAttackByMMBuff(int skillId) {
        switch (skillId) {
            case MUSCLE_MEMORY_I_BUFF:
                return MUSCLE_MEMORY_I_ATTACK;
            case MUSCLE_MEMORY_II_BUFF:
                return MUSCLE_MEMORY_II_ATTACK;
            case MUSCLE_MEMORY_III_BUFF:
                return MUSCLE_MEMORY_III_ATTACK;
            case HEXA_MUSCLE_MEMORY_BUFF:
                return HEXA_MUSCLE_MEMORY_ATTACK;
            default:
                return 0;
        }
    }

    private void applyCheapShotDoT(Mob mob, long damage) {
        if (!chr.hasSkill(CHEAP_SHOT_II)) {
            return;
        }
        Skill skill = chr.getSkill(CHEAP_SHOT_II);
        int slv = skill.getCurrentLevel();

        MobTemporaryStat mts = mob.getTemporaryStat();
        BurnedInfo bi = BurnedInfo.createBurnInfo(chr, skill.getSkillId(), slv, damage);
        mts.createAndAddBurnedInfo(mob, bi, skill.getSkillId());
    }

    @Override
    public void handleSkill(Client c, InPacket inPacket, SkillUseInfo skillUseInfo) {
        super.handleSkill(c, inPacket, skillUseInfo);
        Char chr = c.getChr();
        SkillInfo si = skillUseInfo.skillInfo;
        int slv = skillUseInfo.slv;
        int skillID = skillUseInfo.skillID;
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        Option o2 = new Option();
        switch (skillID) {
            case NOVA_TEMPERANCE:
                tsm.removeAllDebuffs();
                break;
            case CHAIN_ARTS_PURSUIT_PULL:
                if (inPacket.getUnreadAmount() > 13) {
                    inPacket.decodeArr(inPacket.getUnreadAmount() - 13);
                }
                boolean isLeft = inPacket.decodeByte() != 0;
                Position position = inPacket.decodePositionInt();
                int originSkillId = inPacket.decodeInt();
                o1.nOption = chr.getSkillLevel(CHAIN_ARTS_PURSUIT_HORIZONTAL_START);
                o1.rOption = CHAIN_ARTS_PURSUIT_HORIZONTAL_START;
                o1.tOption = 2;
                tsm.sendStat(DarkSight, o1);
                chr.write(UserPacket.effect(Effect.showChainArtPursuitPullEffect(skillID, chr.getLevel(), chr.getSkillLevel(CHAIN_ARTS_PURSUIT_HORIZONTAL_START), isLeft, position, originSkillId)));
                break;
            case WEAPON_BOOSTER_CADENA:
                o1.nValue = si.getValue(x, slv);
                o1.nReason = skillID;
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieBooster, o1);
                break;
            case NOVA_WARRIOR_CADENA:
                o1.nReason = skillID;
                o1.nValue = si.getValue(x, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieStatR, o1);
                break;
            case SHADOW_DEALER_ELIXIR:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv);
                newStats.put(IndieDamR, o1);
                o2.nReason = skillID;
                o2.nValue = si.getValue(indieCr, slv);
                o2.tTerm = si.getValue(time, slv);
                newStats.put(IndieCrR, o2);
                tsm.sendStat(newStats);
                break;
            case VETERAN_SHADOWDEALER:
            case HEXA_VETERAN_SHADOWDEALER:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si != null && si.getValue(time, slv) > 0 ? si.getValue(time, slv) : 30;
                tsm.sendStat(TempSecondaryStat, o1);
                break;
            case CHAIN_ARTS_VOID_STRIKE_BUFF:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(ChainArtsFury, o1);
                break;
            case APOCALYPSE_CANNON_SUMMON:
                Summon summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAction((byte) 4);
                summon.setMoveAbility(MoveAbility.Stop);
                summon.setAssistType(AssistType.None);
                summon.setFlip(!chr.isLeft());
                chr.getField().spawnSummon(summon);
                break;
            case CHAIN_ARTS_MAELSTROM:
                AffectedArea aa = AffectedArea.getPassiveAA(chr, skillID, slv);
                aa.setPosition(new Position(chr.getPosition().getX() + (chr.isLeft() ? -200 : 200), chr.getPosition().getY()));
                aa.setRect(aa.getRectAround(si.getFirstRect()));
                aa.setFlip(!chr.isLeft());
                aa.setDelay((short) 4);
                chr.getField().spawnAffectedAreaAndRemoveOld(aa);
                break;
            case SUMMON_BRICK:
            case HEXA_SUMMON_BRICK:
                increaseMuscleMemory(skillID);
                break;
            case CHAIN_ARTS_CRUSH:
            case HEXA_CHAIN_ARTS_CRUSH:
                setMuscleMemory(8);
                break;
            case CHAIN_ARTS_GRAND_ARSENAL:
            case BRUTAL_RAMPAGE:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 7;
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 7;
                tsm.sendStat(IndieNotDamaged, o1);
                chr.write(UserLocal.showHexaSkillEff(chr));
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        if (other.getId() != chr.getId()) {
                            other.write(UserLocal.showHexaSkillEff(chr));
                        }
                    }
                }
                setMuscleMemory(8);
                break;
        }

    }

    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {

        super.handleHit(c, inPacket, hitInfo);
    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.HOME_MAP);
        cs.setLevel(10);
        cs.setJob(6400);
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
        Item secondary = ItemData.getItemDeepCopy(1353300);
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
        if (chr.getEquippedItemByBodyPart(BodyPart.Weapon) == null) {
            Item weapon = ItemData.getItemDeepCopy(1272000);
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
        if (chr.getLevel() >= 30 && !chr.hasQuestCompleted(34657)) {
            if (chr.getJob() == 6400) {
                sm.jobAdvance((short) 6410);
            }
            sm.giveAndEquip(1143054);
            sm.completeQuestNoRewards(34657);
        }
        if (chr.getLevel() >= 60 && !chr.hasQuestCompleted(34658)) {
            if (chr.getJob() == 6410) {
                sm.jobAdvance((short) 6411);
            }
            sm.giveAndEquip(1143055);
            sm.completeQuestNoRewards(34658);
        }
        if (chr.getLevel() >= 100 && !chr.hasQuestCompleted(34659)) {
            if (chr.getJob() == 6411) {
                sm.jobAdvance((short) 6412);
            }
            sm.giveAndEquip(1143056);
            sm.completeQuestNoRewards(34659);
        }
    }

}
