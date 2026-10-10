package net.swordie.ms.client.jobs.resistance.demon;

import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.skills.ForceAtom;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.*;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.*;
import net.swordie.ms.life.Life;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.life.mob.skill.BurnedInfo;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Rect;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Field;

import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;

public class DemonSlayer extends Job {

    public static final int CURSE_OF_FURY = 30010111;

    public static final int GRIM_SCYTHE = 31001000; //Special Attack
    public static final int BATTLE_PACT_DS = 31001001; //Buff

    public static final int SOUL_EATER = 31101000; //Special Attack
    public static final int DARK_THRUST = 31101001; //Special Attack
    public static final int CHAOS_LOCK = 31101002; //Special Attack  -Stun-
    public static final int VENGEANCE = 31101003; //Buff (Stun Debuff)

    public static final int JUDGEMENT = 31111000; //Special Attack
    public static final int VORTEX_OF_DOOM = 31111001; //Special Attack  -Stun-
    public static final int RAVEN_STORM = 31111003; //Special Attack -GainHP-
    public static final int CARRION_BREATH = 31111005; //Special Attack  -DoT-
    public static final int POSSESSED_AEGIS = 31110008;
    public static final int MAX_FURY = 31110009;

    public static final int INFERNAL_CONCUSSION = 31121000; //Special Attack
    public static final int DEMON_IMPACT = 31121001; //Special Attack  -Slow-
    public static final int DEMON_CRY = 31121003; //Special Attack -DemonCry-
    public static final int BINDING_DARKNESS = 31121006; //Special Attack -Bind-
    public static final int DARK_METAMORPHOSIS = 31121005; //Buff
    public static final int BOUNDLESS_RAGE = 31121007; //Buff
    public static final int LEECH_AURA = 31121002; //Buff
    public static final int MAPLE_WARRIOR_DS = 31121004; //Buff

    public static final int BLUE_BLOOD = 31121054;
    public static final int DEMONIC_FORTITUDE_DS = 31121053;
    public static final int CERBERUS_CHOMP = 31121052;

    public static final int DEMON_LASH = 31000004;
    public static final int DEMON_LASH_2 = 31001006;
    public static final int DEMON_LASH_3 = 31001007;
    public static final int DEMON_LASH_4 = 31001008;

    // V Skills
    public static final int ORTHRUS_2 = 400011078;
    public static final int ORTHRUS = 400011077;
    public static final int SPIRIT_OF_RAGE = 400011057;
    public static final int DEMON_AWAKENING = 400011006;
    public static final int DEMON_AWAKENING_LASH_1 = 400011007;
    public static final int DEMON_AWAKENING_LASH_2 = 400011008;
    public static final int DEMON_AWAKENING_LASH_3 = 400011009;
    public static final int DEMON_AWAKENING_LASH_4 = 400011018;
    public static final int DEMON_BANE = 400011110;
    public static final int DEMON_BANE_2 = 400011111;

    // ===== 6th Job HEXA Matrix Skills =====
    public static final int NIGHTMARE = 31141500; // Origin Skill
    public static final int AMETHYSTINE_INCURSION = 31141504; // Origin Second Skill
    public static final int HEXA_DEMON_IMPACT = 31141000;
    public static final int HEXA_DEMON_LASH = 31141002;
    public static final int HEXA_INFERNAL_CONCUSSION = 31141008;
    public static final int HEXA_DEMON_CRY = 31141012;
    public static final int HEXA_DARK_METAMORPHOSIS = 31141009;
    public static final int HEXA_CERBERUS_CHOMP = 31141013;
    public static final int HEXA_DEMONIC_PLUME = 31140016;

    private final int[] addedSkills = new int[]{
            CURSE_OF_FURY,
    };

    private long leechAuraCD = Long.MIN_VALUE;
    private ScheduledFuture<?> MaxFuryRecoveryTimer;
    private int blueBloodFury = 0;

    public DemonSlayer(Char chr) {
        super(chr);
        if (chr.getId() != 0 && isHandlerOfJob(chr.getJob())) {
            for (int id : addedSkills) {
                if (!chr.hasSkill(id)) {
                    Skill skill = SkillData.getSkillDeepCopyById(id);
                    if (skill != null) {
                        skill.setCurrentLevel(skill.getMasterLevel());
                        chr.addSkill(skill);
                    }
                }
            }
            if (chr.hasSkill(MAX_FURY)) {
                regenDFInterval();
            }
        }
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isDemonSlayer(id);
    }

    public void regenDFInterval() {
        if (MaxFuryRecoveryTimer != null) {
            if ((MaxFuryRecoveryTimer.isDone() && chr.getMP() < chr.getMaxMP())) {
                MaxFuryRecoveryTimer = chr.getTimer().addEvent(()
                        -> chr.healMP(chr.getSkill(MAX_FURY).getCurrentLevel() * 2), 4, TimeUnit.SECONDS);
            }
        } else {
            if (chr.getMP() < chr.getMaxMP()) {
                MaxFuryRecoveryTimer = chr.getTimer().addEvent(()
                        -> chr.healMP(chr.getSkill(MAX_FURY).getCurrentLevel() * 2), 4, TimeUnit.SECONDS);
            }
        }
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        MobTemporaryStat mts = mob.getTemporaryStat();
        EnumMap<MobStat, Option> map = new EnumMap<>(MobStat.class);
        switch (skillID) {
            case CHAOS_LOCK: //prop Stun/Bind
            case VORTEX_OF_DOOM: //prop
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    if (Util.succeedProp(si.getValue(prop, slv)) && !mob.isBoss()) {
                        o1.nOption = 1;
                        o1.rOption = skillID;
                        o1.tOption = si.getValue(time, slv);
                        mts.addStatOptions(mob, MobStat.Stun, o1);
                    }
                }
                break;
            case CARRION_BREATH: //DoT
                BurnedInfo bi = BurnedInfo.createBurnInfo(chr, CARRION_BREATH, slv, damage);
                mts.createAndAddBurnedInfo(mob, bi, CARRION_BREATH);
                break;
            case BINDING_DARKNESS: //stun + DoT
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(time, slv);
                    mts.addStatOptions(mob, MobStat.Stun, o1);
                }
                break;
            case DEMON_CRY:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = -si.getValue(y, slv);
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(time, slv);
                    o2.nOption = -si.getValue(z, slv);
                    o2.rOption = skillID;
                    o2.tOption = si.getValue(time, slv);
                    o3.nOption = 1;
                    o3.rOption = skillID;
                    o3.tOption = si.getValue(time, slv);
                    o3.xOption = si.getValue(w, slv); // exp
                    o3.yOption = si.getValue(w, slv); // dropRate
                    map.put(MobStat.PAD, o1);
                    map.put(MobStat.PDR, o1.deepCopy());
                    map.put(MobStat.MAD, o1.deepCopy());
                    map.put(MobStat.MDR, o1.deepCopy());
                    map.put(MobStat.ACC, o2);
                    map.put(MobStat.AddEffect, o3);
                    mts.addStatOptions(mob, map);
                }
                break;
            case DEMON_IMPACT:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = -20;
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(time, slv);
                    mts.addStatOptions(mob, MobStat.Speed, o1);
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
            //Demon Slayer Fury Atoms
            createDemonFuryForceAtom(attackInfo);
            //Max Fury
            if (chr.hasSkill(MAX_FURY)) {
                switch (attackInfo.skillId) {
                    case DEMON_LASH, DEMON_LASH_3, DEMON_LASH_4, DEMON_AWAKENING_LASH_1, DEMON_AWAKENING_LASH_2, DEMON_AWAKENING_LASH_3, DEMON_AWAKENING_LASH_4 -> {
                        SkillInfo maxFuryInfo = SkillData.getSkillInfoById(MAX_FURY);
                        if (maxFuryInfo != null) {
                            if (Util.succeedProp(maxFuryInfo.getValue(prop, chr.getSkillLevel(MAX_FURY)))) {
                                createDemonFuryForceAtom(attackInfo);
                            }
                        }
                    }
                }
            }
            //Leech Aura
            leechAuraHealing(attackInfo, now);
        }
        switch (attackInfo.skillId) {
            case NIGHTMARE:
            case AMETHYSTINE_INCURSION:
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
                    }
                }
                break;
            case CERBERUS_CHOMP:
            case HEXA_CERBERUS_CHOMP:
                int furyabsorbed = si.getValue(x, slv);
                chr.healMP(furyabsorbed);
                break;
            case RAVEN_STORM:
                int hpheal = (int) (chr.getMaxHP() / ((double) 100 / si.getValue(x, slv)));
                chr.heal(hpheal);
                break;
            case DEMON_CRY:
            case HEXA_DEMON_CRY:
                chr.setSkillCooldown(skillID, slv);
                break;
        }
    }

    public void sendHpUpdate() {
        // Used for client side damage calculation for DAs
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        o.nOption = 3; // Hp -> damage conversion
        o.mOption = chr.getTotalStat(BaseStat.mhp);
        tsm.sendStat(LifeTidal, o);
    }

    public void giveExceedOverload(int skillid) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        o.nOption = skillid;
        o.rOption = skillid;
        o.tOption = 8;
        tsm.sendStat(ExceedOverload, o);
    }

    public void leechAuraHealing(AttackInfo attackInfo, long now) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (chr.hasSkill(LEECH_AURA)) {
            if (tsm.getOptByCTSAndSkill(Regen, LEECH_AURA) != null) {
                Skill skill = chr.getSkill(LEECH_AURA);
                int slv = skill.getCurrentLevel();
                SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
                int cd = si.getValue(y, slv) * 1000;
                if (cd + leechAuraCD < now) {
                    for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                        long totalDMG = Arrays.stream(mai.damages).sum();
                        int hpheal = (int) (totalDMG * ((double) 100 / si.getValue(x, slv)));
                        if (hpheal >= (chr.getMaxHP() / 4)) {
                            hpheal = (chr.getMaxHP() / 4);
                        }
                        leechAuraCD = now;
                        chr.heal(hpheal);
                    }
                }
            }
        }
    }

    private void createDemonFuryForceAtom(AttackInfo attackInfo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Map<Integer, Life> lifes = chr.getField().getLifes();
        for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
            Life life = lifes.get(mai.mobId);
            if (life instanceof Mob mob) {
                int mobID = mai.mobId;
                int angle = new Random().nextInt(40) + 30;
                int speed = new Random().nextInt(31) + 29;

                //Attacking with Demon Lash
                switch (attackInfo.skillId) {
                    case DEMON_LASH, DEMON_LASH_2, DEMON_LASH_3, DEMON_LASH_4, DEMON_AWAKENING_LASH_1, DEMON_AWAKENING_LASH_2, DEMON_AWAKENING_LASH_3, DEMON_AWAKENING_LASH_4 -> {
                        ForceAtomEnum fae = ForceAtomEnum.DEMON_SLAYER_FURY_1;
                        if (mob.isBoss()) {
                            fae = ForceAtomEnum.DEMON_SLAYER_FURY_1_BOSS;
                        }
                        if (chr.getJob() == JobConstants.JobEnum.DEMON_SLAYER4.getJobId()) {
                            fae = ForceAtomEnum.DEMON_SLAYER_FURY_2;
                            if (mob.isBoss()) {
                                fae = ForceAtomEnum.DEMON_SLAYER_FURY_2_BOSS;
                            }
                        }
                        ForceAtomInfo forceAtomInfo = new ForceAtomInfo(1, fae.getInc(), speed, 5,
                                angle, 50, Util.getCurrentTime(), 1, 0,
                                new Position(0, 0));
                        chr.createForceAtom(new ForceAtom(true, chr.getId(), mobID, fae,
                                true, mobID, chr.getJob(), forceAtomInfo, new Rect(), 0, 300,
                                mob.getPosition(), 0, mob.getPosition(), 0), false);
                        chr.healMP(mob.isBoss() ? 4 : 2);
                    }
                    default -> {
                        //Attacking with another skill
                        long totalDMG = Arrays.stream(mai.damages).sum();
                        if (totalDMG > mob.getHp()) {
                            ForceAtomEnum fae = ForceAtomEnum.DEMON_SLAYER_FURY_1;
                            if (mob.isBoss()) {
                                fae = ForceAtomEnum.DEMON_SLAYER_FURY_1_BOSS;
                            }
                            if (chr.getJob() == JobConstants.JobEnum.DEMON_SLAYER4.getJobId()) {
                                fae = ForceAtomEnum.DEMON_SLAYER_FURY_2;
                                if (mob.isBoss()) {
                                    fae = ForceAtomEnum.DEMON_SLAYER_FURY_2_BOSS;
                                }
                            }
                            ForceAtomInfo forceAtomInfo = new ForceAtomInfo(1, fae.getInc(), speed, 5,
                                    angle, 50, Util.getCurrentTime(), 1, 0,
                                    new Position(0, 0));
                            chr.createForceAtom(new ForceAtom(true, chr.getId(), mobID, fae,
                                    true, mobID, chr.getJob(), forceAtomInfo, new Rect(), 0, 300,
                                    mob.getPosition(), 0, mob.getPosition(), 0), false);
                            chr.healMP(mob.isBoss() ? 4 : 2);
                        }
                    }
                }
                if (tsm.hasStatBySkillId(BLUE_BLOOD)) {
                    blueBloodFury += mob.isBoss() ? 4 : 2;
                    if (blueBloodFury >= 50) {
                        blueBloodFury = 0;
                        if (chr.hasSkillOnCooldown(BLUE_BLOOD)) {
                            chr.reduceSkillCoolTime(BLUE_BLOOD, (tsm.hasStat(InfinityForce) ? 5000 : 3000));
                        }
                    }
                }
            }
        }
    }

    private void createPossessedAegisFuryForceAtom(int mobID) {
        Field field = chr.getField();
        Life life = field.getLifeByObjectID(mobID);
        if (life instanceof Mob) {
            int angle = new Random().nextInt(40) + 30;
            int speed = new Random().nextInt(31) + 29;
            ForceAtomEnum fae = ForceAtomEnum.DEMON_SLAYER_FURY_1;
            if (chr.getJob() == JobConstants.JobEnum.DEMON_SLAYER4.getJobId()) {
                fae = ForceAtomEnum.DEMON_SLAYER_FURY_2;
            }
            ForceAtomInfo forceAtomInfo = new ForceAtomInfo(1, fae.getInc(), speed, 4,
                    angle, 50, Util.getCurrentTime(), 1, 0,
                    new Position(0, 0));
            chr.createForceAtom(new ForceAtom(true, chr.getId(), mobID, fae,
                    false, mobID, POSSESSED_AEGIS, forceAtomInfo, new Rect(), 0, 300,
                    life.getPosition(), 0, life.getPosition(), 0));
        }
    }

    // Skill related methods -------------------------------------------------------------------------------------------
    @Override
    public void handleSkill(Client c, InPacket inPacket, SkillUseInfo skillUseInfo) {
        super.handleSkill(c, inPacket, skillUseInfo);
        Char chr = c.getChr();
        SkillInfo si = skillUseInfo.skillInfo;
        int slv = skillUseInfo.slv;
        int skillID = skillUseInfo.skillID;
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Field field = chr.getField();
        Summon summon;
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        Option o4 = new Option();
        switch (skillID) {
            case NIGHTMARE:
            case AMETHYSTINE_INCURSION:
                o1.nReason = skillID;
                o1.nValue = 1;
                o1.tTerm = 7;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        other.write(UserLocal.showHexaSkillEff(chr));
                    }
                }
                chr.chatMessage(ChatType.Notice, "[Origin] Nightmare activated! Dark fury overwhelms the battlefield.");
                chr.dispose();
                break;
            case BATTLE_PACT_DS:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(Booster, o1);
                break;
            case VENGEANCE: //stun chance = prop | stun dur. = subTime
                o1.nOption = si.getValue(y, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(PowerGuard, o1);
                break;
            case DARK_METAMORPHOSIS:
                o1.nOption = si.getValue(damR, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                newStats.put(DamR, o1);
                o2.nReason = skillID;
                o2.nValue = si.getValue(indieMhpR, slv);
                o2.tTerm = si.getValue(time, slv);
                newStats.put(IndieMHPR, o2);
                o3.nOption = 1;
                o3.rOption = skillID;
                o3.tOption = si.getValue(time, slv);
                newStats.put(DevilishPower, o3);
                tsm.sendStat(newStats);
                break;
            case BOUNDLESS_RAGE:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(InfinityForce, o1);
                break;
            case LEECH_AURA:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(Regen, o1);
                break;
            case DEMONIC_FORTITUDE_DS:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieDamR, o1);
                break;
            case BLUE_BLOOD:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(ShadowPartner, o1);
                blueBloodFury = 0;
                break;
            case DEMON_AWAKENING:
                o1.nOption = 7;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                newStats.put(DamR, o1);

                o2.nReason = skillID;
                o2.nValue = si.getValue(indieCr, slv);
                o2.tTerm = si.getValue(time, slv);
                newStats.put(IndieCrR, o2);

                o3.nReason = skillID;
                o3.nValue = si.getValue(ignoreMobpdpR, slv);
                o3.tTerm = si.getValue(time, slv);
                newStats.put(IndieIgnoreMobpdpR, o3);

                o4.nReason = skillID;
                o4.nValue = si.getValue(indiePMdR, slv);
                o4.tTerm = si.getValue(time, slv);
                newStats.put(IndiePMdR, o4);

                tsm.sendStat(newStats);

                Summon demonAwakening = Summon.getSummonByAndSetStat(c.getChr(), skillID, slv);
                demonAwakening.setFlyMob(false);
                //demonAwakening.setAvatarLook(chr.getAvatarData().getAvatarLook());
                demonAwakening.setMoveAbility(MoveAbility.Walk);
                demonAwakening.setAssistType(AssistType.Attack);
                chr.getField().spawnSummon(demonAwakening);

                break;
            case SPIRIT_OF_RAGE:
                summon = Summon.getSummonByAndSetStat(c.getChr(), skillID, slv);
                summon.setFlyMob(false);
                summon.setMoveAction((byte) 0);
                summon.setMoveAbility(MoveAbility.Stop);
                summon.setPosition(inPacket.decodePosition());
                summon.setFlip(inPacket.decodeByte() == 0);
                chr.getField().spawnSummon(summon);
                break;
            case ORTHRUS:
                List<Integer> list = Arrays.asList(ORTHRUS, ORTHRUS_2);
                for (int summonDS : list) {
                    summon = Summon.getSummonByAndSetStat(c.getChr(), summonDS, slv);
                    summon.setFlyMob(false);
                    summon.setMoveAction((byte) 0);
                    summon.setMoveAbility(MoveAbility.Walk);
                    summon.setPosition(chr.getPosition());
                    chr.getField().spawnSummon(summon);
                }
                break;
        }
    }

    public int alterCooldownSkill(int skillId) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Skill skill = chr.getSkill(skillId);
        if (skill != null) {
            SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
            int slv = skill.getCurrentLevel();

            if (skillId == DEMON_CRY) {
                if (tsm.hasStat(InfinityForce)) {
                    return si.getValue(s, slv) * 1000;
                }
            }
        }
        return -1;
    }

    // Hit related methods ---------------------------------------------------------------------------------------------
    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();

        //Vengeance
        if (tsm.getOptByCTSAndSkill(PowerGuard, VENGEANCE) != null) {
            if (hitInfo.hpDamage != 0) {
                Skill skill = chr.getSkill(VENGEANCE);
                int slv = skill.getCurrentLevel();
                SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
                int mobID = hitInfo.mobID;
                Life life = chr.getField().getLifeByObjectID(mobID);
                if (life == null) {
                    return;
                }
                if (life instanceof Mob mob) {
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    if (!mts.hasCurrentMobStatBySkillId(skill.getSkillId())) {
                        if (Util.succeedProp(si.getValue(prop, slv))) {
                            o1.nOption = 1;
                            o1.rOption = skill.getSkillId();
                            o1.tOption = si.getValue(subTime, slv);
                            o1.bOption = 1;
                            mts.addStatOptions(mob, MobStat.Freeze, o1);
                        }
                    }
                }
            }
        }

        //Possessed Aegis
        if (hitInfo.hpDamage > 0) {
            // Guarded
            if (chr.hasSkill(POSSESSED_AEGIS)) {
                Skill skill = chr.getSkill(POSSESSED_AEGIS);
                int slv = skill.getCurrentLevel();
                SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
                int propz = si.getValue(x, slv);
                if (Util.succeedProp(propz)) {
                    hitInfo.hpDamage = 0;
                    hitInfo.mpDamage = 0;
                    int mobID = hitInfo.mobID;
                    createPossessedAegisFuryForceAtom(mobID);
                    chr.heal((int) (chr.getMaxHP() / ((double) 100 / si.getValue(y, slv))));
                    chr.healMP(si.getValue(z, slv));
                }
            }
        }
        super.handleHit(c, inPacket, hitInfo);
    }

    @Override
    public void handleLevelUp(short level) {
        super.handleLevelUp(level);
        Map<Stat, Object> stats = new HashMap<>();

        if (level > 10) {
            chr.addHonorExp(700 + ((chr.getLevel() - 50) / 10) * 100);
            stats.put(Stat.sp, chr.getAvatarData().getCharacterStat().getExtendSP());
        }
        if (level >= 30 && chr.getStat(Stat.mmp) == 10) {
            chr.addSpToJobByCurrentLevel(2);
            chr.setStatAndSendPacket(Stat.mmp, 30);
            stats.put(Stat.mmp, chr.getStat(Stat.mmp));
        } else if (level >= 60 && chr.getStat(Stat.mmp) == 30) {
            chr.setStatAndSendPacket(Stat.mmp, 60);
            stats.put(Stat.mmp, chr.getStat(Stat.mmp));
        } else if (level >= 100 && chr.getStat(Stat.mmp) == 60 || chr.getStat(Stat.mmp) == 30) {
            chr.setStatAndSendPacket(Stat.mmp, 100);
            stats.put(Stat.mmp, chr.getStat(Stat.mmp));
        }
        chr.sendStatsPacket(stats);
    }

    @Override
    public void handleAddCTS(CharacterTemporaryStat cts, List<Option> options) {
        if (cts != LifeTidal && JobConstants.isDemonAvenger(chr.getJob())) {
            sendHpUpdate();
        }
        super.handleAddCTS(cts, options);
    }

    @Override
    public void handleRemoveCTS(CharacterTemporaryStat cts, List<Option> options) {
        if (JobConstants.isDemonAvenger(chr.getJob())) {
            sendHpUpdate();
        }
        super.handleRemoveCTS(cts, options);
    }

    // Character creation related methods ---------------------------------------------------------------------------------------------
    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
    }

    @Override
    public void handleCancelTimer(Char chr) {
        if (MaxFuryRecoveryTimer != null) {
            MaxFuryRecoveryTimer.cancel(true);
        }
        super.handleCancelTimer(chr);
    }
}
