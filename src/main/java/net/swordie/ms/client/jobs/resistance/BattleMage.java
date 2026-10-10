package net.swordie.ms.client.jobs.resistance;

import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.runestones.RuneStone;
import net.swordie.ms.client.character.skills.ForceAtom;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.*;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.AssistType;
import net.swordie.ms.enums.ForceAtomEnum;
import net.swordie.ms.enums.MoveAbility;
import net.swordie.ms.life.AffectedArea;
import net.swordie.ms.life.Life;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Rect;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Field;

import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;

public class BattleMage extends Citizen {

    public static final int SECRET_ASSEMBLY = 30001281;

    public static final int CONDEMNATION = 32001014; //Special Buff (ON/OFF)
    public static final int HASTY_AURA = 32001016; //Buff (Unlimited Duration)

    public static final int CONDEMNATION_I = 32100010; //Special Buff (ON/OFF)
    public static final int DRAINING_AURA = 32101009; //Buff (Unlimited Duration)
    public static final int STAFF_BOOST = 32101005; //Buff
    public static final int DARK_CHAIN = 32101001; //Special Attack (Stun Debuff)

    public static final int CONDEMNATION_II = 32110017; //Special Buff (ON/OFF)
    public static final int BLUE_AURA = 32111012; //Buff (Unlimited Duration
    public static final int DARK_SHOCK = 32111016; //Buff (ON/OFF)
    public static final int DARK_SHOCK_EXPLOSION = 32110020;

    public static final int CONDEMNATION_III = 32120019; //Special Buff (ON/OFF)
    public static final int DARK_GENESIS = 32121004; //Special Attack (Stun Debuff) (Special Properties if on Cooldown)
    public static final int DARK_GENESIS_FA = 32121011; // Final Attack  attack if DarkGenesis is on CD
    public static final int DARK_AURA = 32121017; //Buff (Unlimited Duration)
    public static final int WEAKENING_AURA = 32121018; //Buff (Unlimited Duration)
    public static final int PARTY_SHIELD = 32121006;
    public static final int BATTLE_RAGE = 32121010; //Buff (ON/OFF)
    public static final int MAPLE_WARRIOR_BAM = 32121007; //Buff
    public static final int HEROS_WILL_BAM = 32121008;

    public static final int FOR_LIBERTY_BAM = 32121053;
    public static final int MASTER_OF_DEATH = 32121056;

    // V Skills
    public static final int AURA_SCYTHE = 400021006;
    public static final int ALTAR_OF_ANNIHILATION = 400021047;
    public static final int GRIM_HARVEST = 400021069;
    public static final int ABYSSAL_LIGHTNING = 400021087;
    public static final int ABYSSAL_LIGHTNING_PORTAL_ATTACK = 400021088;
    public static final int ABYSSAL_LIGHTNING_PORTAL = 400021089;

    // HEXA Skills
    public static final int HEXA_DARK_GENESIS = 32141008; //Special Attack (Stun Debuff) (Special Properties if on Cooldown)
    public static final int HEXA_DARK_GENESIS_FA = 32141010; // Final Attack  attack if DarkGenesis is on CD

    private final int[] addedSkills = new int[]{
            SECRET_ASSEMBLY,};

    private final int[] auras = new int[]{
            HASTY_AURA,
            DRAINING_AURA,
            BLUE_AURA,
            DARK_AURA,
            WEAKENING_AURA,
            AURA_SCYTHE,};

    private Summon death;
    private long drainAuraCD = Long.MIN_VALUE;
    private ScheduledFuture<?> WeaknessAuraTimer;
    private long lastAltarAnnihilation = 0L;
    private long lastCondemnationAttack = Long.MIN_VALUE;
    private List<Summon> annihilationAltarList = new ArrayList<>();
    private int hitCountBoss = 0;

    public BattleMage(Char chr) {
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
        }
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isBattleMage(id);
    }

    public void spawnDeath(int skillID, int slv) {
        Field field = chr.getField();
        death = Summon.getSummonByAndSetStatWithTime(chr, skillID, slv, Util.getCurrentTimeLong(), 0);
        death.setFlyMob(true);
        death.setMaxHP(Integer.MAX_VALUE);
        death.setMoveAbility(MoveAbility.Walk);
        death.setAssistType(AssistType.Attack);
        field.spawnSummon(death);
    }

    public void removeCondemnationBuff(Summon summon) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (summon != null) {
            if (tsm.hasStat(BMageDeath)) {
                tsm.removeStatsBySkill(summon.getSkillID());
            }
        }
    }

    public void applyBlueAuraDispel() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Skill skill = chr.getSkill(BLUE_AURA);
        if (chr.hasSkill(32120062)) { //Blue Aura - Dispel Magic
            if (tsm.getOptByCTSAndSkill(BMageAuraBlue, skill.getSkillId()) != null) {
                tsm.removeAllDebuffs();
                chr.getTimer().addEvent(this::applyBlueAuraDispel, 5, TimeUnit.SECONDS);
            }
        }
    }

    private void incrementAltarAnnihilationCount() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        changeAltarAnnihilationCount(tsm.getOption(CannonShooter_BFCannonBall).nOption + 1);
    }

    private void changeAltarAnnihilationCount(int count) {
        Skill skill = chr.getSkill(ALTAR_OF_ANNIHILATION);
        SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
        int slv = skill.getCurrentLevel();
        int maxCount = si.getValue(y, slv);

        count = count > maxCount ? maxCount : Math.max(count, 0);
        updateVSkillStackBuff(chr, count);
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        MobTemporaryStat mts = mob.getTemporaryStat();

        if (skillID != DARK_SHOCK_EXPLOSION) {
            doDarkShockBonusAttack(mob);
        }
        switch (skillID) {
            case DARK_SHOCK:
                if (!tsm.hasStat(CharacterTemporaryStat.DarkLighting)) {
                    return;
                }
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    //o1.nOption = si.getValue(x, slv);
                    //o1.rOption = skillID;
                    //o1.tOption = 5;
                    //mts.addStatOptions(mob, MobStat.DarkLightning, o1);
                }
                break;
            case DARK_CHAIN:
            case DARK_GENESIS:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(time, slv);
                    mts.addStatOptions(mob, MobStat.Stun, o1);
                }
                break;
            case GRIM_HARVEST:
                createGrimHarvestForceAtom(mob);
                break;
        }
        super.handleDebuffOnMob(c, mob, si, skillID, slv, damage);
    }

    @Override
    public void handleAttack(Client c, AttackInfo attackInfo, SkillInfo si, long now) {
        Char chr = c.getChr();
        super.handleAttack(c, attackInfo, si, now);
        boolean hasHitMobs = !attackInfo.mobAttackInfo.isEmpty();
        if (chr.hasSkill(ALTAR_OF_ANNIHILATION)) {
            if (now - lastAltarAnnihilation >= 4000L) {
                incrementAltarAnnihilationCount();
                lastAltarAnnihilation = now;
            }
        }
        if (hasHitMobs) {
            if (attackInfo.skillId != CONDEMNATION
                    && attackInfo.skillId != CONDEMNATION_I
                    && attackInfo.skillId != CONDEMNATION_II
                    && attackInfo.skillId != CONDEMNATION_III
                    && attackInfo.skillId != RuneStone.LIBERATE_THE_RUNE_OF_THUNDER_ATTACK) {
                incrementCondemnation(attackInfo);
            }
            drainAuraActiveHPRecovery(attackInfo, now);
            drainAuraPassiveHPRecovery(attackInfo);
        }
    }

    private void doDarkShockBonusAttack(Mob mob) {
        MobTemporaryStat mts = mob.getTemporaryStat();
        //if (mts.hasCurrentMobStat(MobStat.DarkLightning)) {
        //    mts.removeMobStat(mob, MobStat.DarkLightning);
        //    chr.write(UserLocal.userBonusAttackRequest(DARK_SHOCK_EXPLOSION, mob.getObjectId()));
        //}
    }

    private void incrementCondemnation(AttackInfo attackInfo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();

        if (!tsm.hasStat(BMageDeath)) {
            return;
        }
        int killCount = tsm.getOption(BMageDeath).nOption;
        for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
            Life life = chr.getField().getLifeByObjectID(mai.mobId);
            if (life instanceof Mob mob) {
                long dmgOnMob = Arrays.stream(mai.damages).sum();
                if (mob == null || mob.getHp() <= 0) {
                    continue;
                }
                if (mob.isBoss()) {
                    if (hitCountBoss < 1) {
                        hitCountBoss++;
                    } else {
                        hitCountBoss = 0;
                        if (killCount < getCondemnationKillReq()) {
                            killCount++;
                        }
                    }
                } else {
                    if (mob.getHp() <= dmgOnMob) {
                        if (killCount < getCondemnationKillReq()) {
                            killCount++;
                        }
                    }
                }
            }
        }
        setCondemnationCount(killCount);
    }

    private void setCondemnationCount(int killCount) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        o.nOption = killCount;
        o.rOption = getCondemnationSkill().getSkillId();
        tsm.sendStat(BMageDeath, o);
    }

    private int getCondemnationCooldown() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Skill skill = getCondemnationSkill();
        SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());

        // Master of Death Buff
        if (tsm.getOptByCTSAndSkill(AttackCountX, MASTER_OF_DEATH) != null) {
            return 0;
        }

        return si.getValue(time, 1);
    }

    private int getCondemnationKillReq() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Skill skill = getCondemnationSkill();
        SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());

        // Master of Death Buff
        if (tsm.getOptByCTSAndSkill(AttackCountX, MASTER_OF_DEATH) != null) {
            return 1;
        }

        return si.getValue(x, 1);
    }

    private Skill getCondemnationSkill() {
        Skill skill = null;

        if (chr.getJob() == JobConstants.JobEnum.BATTLE_MAGE_1.getJobId()) {
            skill = chr.getSkill(CONDEMNATION);
        }
        if (chr.getJob() == JobConstants.JobEnum.BATTLE_MAGE_2.getJobId()) {
            skill = chr.getSkill(CONDEMNATION_I);
        }
        if (chr.getJob() == JobConstants.JobEnum.BATTLE_MAGE_3.getJobId()) {
            skill = chr.getSkill(CONDEMNATION_II);
        }
        if (chr.getJob() == JobConstants.JobEnum.BATTLE_MAGE_4.getJobId()) {
            skill = chr.getSkill(CONDEMNATION_III);
        }
        return skill;
    }

    private void drainAuraActiveHPRecovery(AttackInfo attackInfo, long now) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Skill skill = chr.getSkill(DRAINING_AURA);
        if (skill == null) {
            return;
        }
        int slv = skill.getCurrentLevel();
        SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
        int duration = 1000 * si.getValue(subTime, slv);
        if ((tsm.getOptByCTSAndSkill(BMageAuraYellow, DRAINING_AURA) != null || tsm.getOptByCTSAndSkill(BMageAuraDebuff, AURA_SCYTHE) != null) && (drainAuraCD + duration < now)) {
            for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                drainAuraCD = now;
                long totaldmg = Arrays.stream(mai.damages).sum();
                int healingrate = si.getValue(x, slv);
                int restoration = (int) (totaldmg / ((double) 100 / healingrate));
                chr.heal(restoration);
            }
        }
    }

    private void drainAuraPassiveHPRecovery(AttackInfo attackInfo) {
        Skill skill = chr.getSkill(DRAINING_AURA);
        if (skill == null) {
            return;
        }
        int slv = skill.getCurrentLevel();
        SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
        for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
            Life life = chr.getField().getLifeByObjectID(mai.mobId);
            if (life instanceof Mob mob) {
                if (mob == null || mob.getHp() <= 0) {
                    continue;
                }
                long totaldmg = Arrays.stream(mai.damages).sum();
                if (totaldmg >= mob.getHp()) {
                    int maxHP = chr.getMaxHP();
                    int healingrate = si.getValue(x, slv);
                    int restoration = (int) (maxHP / ((double) 100 / healingrate));
                    chr.heal(restoration);
                }
            }
        }
    }

    public void applyWeakenAuraOnMob() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Skill skill = chr.getSkill(WEAKENING_AURA);
        int slv = skill.getCurrentLevel();
        SkillInfo si = SkillData.getSkillInfoById(WEAKENING_AURA);
        Option o = new Option();
        int delay = si.getValue(y, slv);
        if (tsm.getOptByCTSAndSkill(BMageAuraDebuff, WEAKENING_AURA) != null
                || tsm.getOptByCTSAndSkill(BMageAuraDebuff, AURA_SCYTHE) != null) {
            Rect rect = chr.getPosition().getRectAround(si.getRects().get(0));
            if (!chr.isLeft()) {
                rect = rect.moveRight();
            }
            Field field = chr.getField();
            List<Mob> mobs = field.getMobsInRect(rect);
            o.nOption = -si.getValue(x, slv);
            o.rOption = WEAKENING_AURA;
            o.tOption = si.getValue(time, slv);
            for (Mob mob : mobs) {
                if (mob == null || mob.getHp() <= 0) {
                    continue;
                }
                MobTemporaryStat mts = mob.getTemporaryStat();
                if (!mts.hasCurrentMobStatBySkillId(WEAKENING_AURA)) {
                    mts.addStatOptions(mob, MobStat.PDR, o.deepCopy());
                }
            }
            WeaknessAuraTimer = chr.getTimer().addEvent(this::applyWeakenAuraOnMob, delay, TimeUnit.SECONDS);
        }
    }

    public List<Summon> getAnnihilationAltarList() {
        return annihilationAltarList;
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
        Summon summon;
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        Option o4 = new Option();
        Option o5 = new Option();
        Option o6 = new Option();
        Option o7 = new Option();
        switch (skillID) {
            case PARTY_SHIELD:
                AffectedArea aa = AffectedArea.getPassiveAA(chr, skillID, slv);
                aa.setMobOrigin((byte) 0);
                aa.setPosition(chr.getPosition());
                aa.setRect(aa.getPosition().getRectAround(si.getRects().get(0)));
                aa.setDelay((short) 16);
                chr.getField().spawnAffectedArea(aa);
                break;
            case SECRET_ASSEMBLY:
                Field toField = chr.getOrCreateFieldByCurrentInstanceType(si.getValue(x, slv));
                chr.warp(toField);
                break;
            case HEROS_WILL_BAM:
                tsm.removeAllDebuffs();
                break;
            case AURA_SCYTHE:
                for (int aura : auras) {
                    tsm.removeStatsBySkill(aura);
                }

                //Hasty Aura
                SkillInfo hastyAura = SkillData.getSkillInfoById(HASTY_AURA);
                o1.nReason = skillID;
                o1.nValue = hastyAura.getValue(indieSpeed, chr.getSkillLevel(HASTY_AURA));
                o1.tTerm = si.getValue(time, slv);
                newStats.put(IndieSpeed, o1);
                o2.nReason = skillID;
                o2.nValue = -1;
                o2.tTerm = si.getValue(time, slv);
                newStats.put(IndieBooster, o2);

                //Blue Aura
                SkillInfo blueAura = SkillData.getSkillInfoById(BLUE_AURA);
                o3.nOption = blueAura.getValue(asrR, chr.getSkillLevel(BLUE_AURA));
                o3.rOption = skillID;
                o3.tOption = si.getValue(time, slv);
                newStats.put(AsrR, o3);
                o4.nOption = blueAura.getValue(terR, chr.getSkillLevel(BLUE_AURA));
                o4.rOption = skillID;
                o4.tOption = si.getValue(time, slv);
                newStats.put(TerR, o4);
                o5.nOption = blueAura.getValue(y, chr.getSkillLevel(BLUE_AURA));
                o5.rOption = skillID;
                o5.tOption = si.getValue(time, slv);
                newStats.put(IgnoreMobDamR, o5);

                //Dark Aura
                SkillInfo darkAura = SkillData.getSkillInfoById(DARK_AURA);
                o6.nReason = skillID;
                o6.nValue = darkAura.getValue(indieDamR, chr.getSkillLevel(DARK_AURA));
                o6.tTerm = si.getValue(time, slv);
                newStats.put(IndieDamR, o6);
                o7.nOption = 1;
                o7.rOption = skillID;
                o7.tOption = si.getValue(time, slv);
                newStats.put(BMageAuraDark, o7);
                newStats.put(BMageAuraUnion, o7.deepCopy());

                tsm.sendStat(newStats);

                applyBlueAuraDispel(); //Hyper
                if (WeaknessAuraTimer != null) {
                    WeaknessAuraTimer.cancel(false);
                }
                applyWeakenAuraOnMob();
                break;
            case CONDEMNATION:
            case CONDEMNATION_I:
            case CONDEMNATION_II:
            case CONDEMNATION_III:
                o1.rOption = skillID;
                tsm.sendStat(BMageDeath, o1);
                spawnDeath(skillID, slv);
                break;
            case STAFF_BOOST:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(Booster, o1);
                break;
            case HASTY_AURA:
                for (int aura : auras) {
                    tsm.removeStatsBySkill(aura);
                }

                o1.nReason = skillID;
                o1.nValue = si.getValue(indieSpeed, slv);
                o1.tTerm = 0;
                newStats.put(IndieSpeed, o1);
                o2.nReason = skillID;
                o2.nValue = -1;//   si.getValue(indieBooster, slv);
                o2.tTerm = 0;
                newStats.put(IndieBooster, o2);
                o3.nOption = 1;
                o3.rOption = skillID;
                newStats.put(BMageAuraYellow, o3);
                tsm.sendStat(newStats);
                break;
            case DRAINING_AURA:
                for (int aura : auras) {
                    tsm.removeStatsBySkill(aura);
                }

                o3.nOption = 1;
                o3.rOption = skillID;
                tsm.sendStat(BMageAuraYellow, o3);
                break;
            case BLUE_AURA:
                for (int aura : auras) {
                    tsm.removeStatsBySkill(aura);
                }

                o1.nOption = si.getValue(asrR, slv);
                o1.rOption = skillID;
                newStats.put(AsrR, o1);
                o2.nOption = si.getValue(terR, slv);
                o2.rOption = skillID;
                newStats.put(TerR, o2);
                o3.nOption = si.getValue(y, slv);
                o3.rOption = skillID;
                newStats.put(IgnoreMobDamR, o3);
                o4.nOption = 1;
                o4.rOption = skillID;
                newStats.put(BMageAuraBlue, o4);
                tsm.sendStat(newStats);
                applyBlueAuraDispel(); //Hyper
                break;
            case DARK_AURA:
                for (int aura : auras) {
                    tsm.removeStatsBySkill(aura);
                }

                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv);
                newStats.put(IndieDamR, o1);
                o3.nOption = 1;
                o3.rOption = skillID;
                newStats.put(BMageAuraDark, o3);
                tsm.sendStat(newStats);
                break;
            case WEAKENING_AURA:
                for (int aura : auras) {
                    tsm.removeStatsBySkill(aura);
                }

                o3.nOption = 1;
                o3.rOption = skillID;
                tsm.sendStat(BMageAuraDebuff, o3);

                if (WeaknessAuraTimer != null) {
                    WeaknessAuraTimer.cancel(false);
                }
                applyWeakenAuraOnMob();
                break;
            case DARK_SHOCK:
                o1.nOption = 1;
                o1.rOption = skillID;
                tsm.sendStat(DarkLighting, o1);
                break;
            case BATTLE_RAGE:
                o1.nOption = 1;
                o1.rOption = skillID;
                newStats.put(Enrage, o1);
                o2.nOption = si.getValue(x, slv);
                o2.rOption = skillID;
                newStats.put(DamR, o2);
                o3.nOption = si.getValue(z, slv);
                o3.rOption = skillID;
                newStats.put(CriticalBuff, o3);
                tsm.sendStat(newStats);
                break;
            case FOR_LIBERTY_BAM:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieDamR, o1);
                break;
            case MASTER_OF_DEATH:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(AttackCountX, o1);
                break;
            case GRIM_HARVEST:
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Stop);
                summon.setAssistType(AssistType.Attack);
                summon.setSummonTerm(80);
                chr.getField().spawnSummon(summon);
                break;
            case ALTAR_OF_ANNIHILATION:
                if (tsm.getOption(CannonShooter_BFCannonBall).nOption < 1) {
                    chr.chatMessage("You don't have enough Altar stacks.");
                    chr.dispose();
                    return;
                }

                if (getAnnihilationAltarList().size() >= 4) {
                    chr.getField().removeLife(getAnnihilationAltarList().get(0));
                }
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Stop);
                summon.setAssistType(AssistType.CreateShootObj);
                summon.setFlip(true);
                chr.getField().spawnAddSummon(summon);
                getAnnihilationAltarList().add(summon);
                changeAltarAnnihilationCount(tsm.getOption(CannonShooter_BFCannonBall).nOption - 1);

                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = si.getValue(time, slv);
                o1.summon = summon;
                tsm.sendStat(IndieEmpty, o1);
                break;
        }
    }

    // Hit related methods ---------------------------------------------------------------------------------------------
    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {
        super.handleHit(c, inPacket, hitInfo);
    }


    @Override
    public void handleForceAtomCollision(int faKey, int skillId, int mobObjId, Position position, InPacket inPacket) {
        switch (skillId) {
            case GRIM_HARVEST:
                ForceAtom fa = chr.getForceAtomByKey(faKey);
                ForceAtomInfo fai = fa.getFaiList().stream().filter(sfai -> sfai.getKey() == faKey).findFirst().orElse(null);
                if (fai == null) {
                    return;
                }
                boolean isBoss = fai.isBossMob();
                extendGrimHarvest(isBoss);
                break;
        }

        super.handleForceAtomCollision(faKey, skillId, mobObjId, position, inPacket);
    }

    private void createGrimHarvestForceAtom(Mob mob) {
        Summon summon = chr.getField().getSummonBySkillId(chr, GRIM_HARVEST);
        if (summon != null) {
            ForceAtomEnum fae = ForceAtomEnum.GRIM_HARVEST;
            Rect rect = new Rect(new Position(-1500, -1500), new Position(1500, 1500));
            ForceAtomInfo fai = new ForceAtomInfo(
                    chr.getNewForceAtomKey(),
                    fae.getInc(),
                    2,
                    2,
                    0,
                    1300,
                    Util.getCurrentTime(),
                    1,
                    0,
                    new Position());
            fai.setBossMob(mob != null && mob.isBoss());
            chr.createForceAtom(new ForceAtom(true, chr.getId(), mob.getObjectId(), fae,
                    false, mob.getObjectId(), GRIM_HARVEST, fai, mob.getPosition().getRectAround(rect), 0, 0,
                    summon.getPosition(), GRIM_HARVEST, summon.getPosition(), 0), false);
        }
    }

    private void extendGrimHarvest(boolean isBoss) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        long remainingTime = tsm.getRemainingTime(CharacterTemporaryStat.IndieEmpty, GRIM_HARVEST);
        long addedTimeMS = isBoss ? 2000 : 200;

        Option o = new Option();
        o.nValue = 1;
        o.nReason = GRIM_HARVEST;
        o.tTerm = (int) (remainingTime + addedTimeMS);
        o.summon = tsm.getOptByCTSAndSkill(CharacterTemporaryStat.IndieEmpty, GRIM_HARVEST).summon;
        o.setInMillis(true);
        tsm.sendStat(IndieEmpty, o);
    }

    public void recallGrimHarvest() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Field field = chr.getField();
        if (field != null) {
            Summon summon = Summon.getSummonByAndSetStat(chr, GRIM_HARVEST, chr.getSkillLevel(GRIM_HARVEST));
            summon.setMoveAbility(MoveAbility.Stop);
            summon.setAssistType(AssistType.Attack);
            summon.setSummonTerm((int) ((tsm.getRemainingTime(CharacterTemporaryStat.IndieEmpty, GRIM_HARVEST)) / 1000));
            field.spawnSummon(summon);
        }
    }

    @Override
    public void handleCancelTimer(Char chr) {
        if (WeaknessAuraTimer != null) {
            WeaknessAuraTimer.cancel(true);
        }
        super.handleCancelTimer(chr);
    }
}
