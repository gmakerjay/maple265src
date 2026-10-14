package net.swordie.ms.client.jobs.resistance;

import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.MobAttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.UserPacket;
import net.swordie.ms.connection.packet.UserRemote;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.life.AffectedArea;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.world.field.Field;

import java.util.EnumMap;
import java.util.concurrent.ScheduledFuture;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;

public class Blaster extends Citizen {

    public static final int SECRET_ASSEMBLY = 30001281;

    public static final int HAMMER_SMASH = 37111000;
    public static final int HAMMER_SMASH_CHARGE = 37110001;
    public static final int ARM_CANNON_BOOST = 37101003;
    public static final int MAPLE_WARRIOR_BLASTER = 37121006;
    public static final int HEROS_WILL_BLASTER = 37121007;

    public static final int FOR_LIBERTY_BLASTER = 37121053;
    public static final int CANNON_OVERDRIVE = 37121054;
    public static final int HYPER_MAGNUM_PUNCH = 37121052;

    public static final int DETONATE = 37001004;
    public static final int DETONATE_UP = 37000005;

    // Revolving Cannon & Main Attacks
    public static final int MAGNUM_PUNCH = 37001000;
    public static final int DOUBLE_BLAST = 37101000;
    public static final int SHOTGUN_PUNCH = 37121000;
    public static final int SHOTGUN_PUNCH_SHOCKWAVE = 37121001;
    public static final int REVOLVING_CANON_MASTERY = 37000007;
    public static final int REVOLVING_CANNON_RELOAD = 37000010;
    public static final int REVOLVING_CANNON = 37001001;
    public static final int REVOLVING_CANNON_2 = 37100008;
    public static final int REVOLVING_CANNON_3 = 37000009;

    public static final int REVOLVING_CANNON_PLUS = 37100007;
    public static final int REVOLVING_CANNON_PLUS_II = 37110007;
    public static final int REVOLVING_CANNON_PLUS_III = 37120008;

    public static final int BUNKER_BUSTER_EXPLOSION = 37000008;
    public static final int BUNKER_BUSTER_EXPLOSION_1 = 37001002;
    public static final int BUNKER_BUSTER_EXPLOSION_2 = 37000011;
    public static final int BUNKER_BUSTER_EXPLOSION_3 = 37000012;
    public static final int BUNKER_BUSTER_EXPLOSION_4 = 37000013;
    public static final int BUNKER_BUSTER_EXPLOSION_2ND = 37100009;
    public static final int BUNKER_BUSTER_EXPLOSION_3RD = 37110010;
    public static final int BUNKER_BUSTER_EXPLOSION_4TH = 37120013;

    // Blast Shield
    public static final int BLAST_SHIELD = 37000006;
    public static final int SHIELD_TRAINING = 37110008;
    public static final int SHIELD_TRAINING_II = 37120009;
    public static final int VITALITY_SHIELD = 37121005;

    // Combo Training
    public static final int COMBO_TRAINING = 37110009;
    public static final int COMBO_TRAINING_II = 37120012;

    // Charged Skills
    public static final int CHARGE_MASTERY = 37100006;
    public static final int ADVANCED_CHARGE_MASTERY = 37120011;
    public static final int BOBBING_CHARGED = 37100002;
    public static final int WEAVING_CHARGED = 37110004;

    public static final int ROCKET_RUSH = 37111005;
    public static final int MAGNUM_LAUNCH = 37110006;

    public static final int BALLISTIC_HURRICANE = 37121003;
    public static final int REVOLVING_BLAST = 37121004;
    public static final int BALLISTIC_HURRICANE_1 = 37120024;
    public static final int WEAVING = 37111003;
    public static final int BOBBING = 37101001;

    // V Skills
    public static final int ROCKET_PUNCH = 400011017;
    public static final int ROCKET_PUNCH_EXTRA_SKILL = 400011019;
    public static final int GATLING_PUNCH = 400011028;
    public static final int BULLET_BLAST = 400011091;
    public static final int BULLET_BLAST_2 = 400011103;
    public static final int AFTERIMAGE_SHOCK_1 = 400011116; // Buff
    public static final int AFTERIMAGE_SHOCK_2 = 400011117; // Bonus Attack

    // 6th Job Origin & Ascent Skills
    public static final int FINAL_DESTROYER = 37141500;
    public static final int FINAL_DESTROYER_1 = 37141501;
    public static final int ASCENT_BLASTER_1 = 37141502;
    public static final int ASCENT_BLASTER_2 = 37141503;

    // HEXA Mastery Skills
    public static final int HEXA_MAGNUM_PUNCH = 37141000;
    public static final int HEXA_DOUBLE_BLAST = 37141001;
    public static final int HEXA_BUNKER_BUSTER_EXPLOSION = 37141002;
    public static final int HEXA_BUNKER_BUSTER_EXPLOSION_1 = 37141003;
    public static final int HEXA_BUNKER_BUSTER_EXPLOSION_2 = 37141004;
    public static final int HEXA_BUNKER_BUSTER_EXPLOSION_3 = 37141005;
    public static final int HEXA_BUNKER_BUSTER_EXPLOSION_4 = 37141006;
    public static final int HEXA_BUNKER_BUSTER_EXPLOSION_5 = 37141007;
    public static final int HEXA_REVOLVING_CANON_MASTERY = 37141008;
    public static final int HEXA_HAMMER_SMASH = 37141009;
    public static final int HEXA_HAMMER_SMASH_CHARGE = 37141010;
    public static final int HEXA_SHOTGUN_PUNCH = 37141011;
    public static final int HEXA_REVOLVING_CANNON = 37141012;
    public static final int HEXA_REVOLVING_CANNON_2 = 37141013;
    public static final int HEXA_REVOLVING_CANNON_3 = 37141014;

    private final int[] addedSkills = new int[]{
            SECRET_ASSEMBLY,};

    private int gauge = 0;
    private int ammo = 0;
    private int lastAttack = 0;

    private ScheduledFuture<?> reloadCylinder;

    public Blaster(Char chr) {
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
        return JobConstants.isBlaster(id);
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        super.handleInitAfterMigrate(chr);
        reloadCylinder();
    }

    public void resetBlastShield() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        tsm.removeStat(RWBarrier);
        tsm.removeStatsBySkill(BLAST_SHIELD);
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (tsm.hasStat(TempSecondaryStat) && skillID != ROCKET_PUNCH_EXTRA_SKILL && skillID != AFTERIMAGE_SHOCK_2) {
            if (tsm.getOptByCTSAndSkill(TempSecondaryStat, ROCKET_PUNCH) != null) {
                chr.write(UserLocal.userBonusAttackRequest(ROCKET_PUNCH_EXTRA_SKILL));
            }
            if (tsm.getOptByCTSAndSkill(TempSecondaryStat, AFTERIMAGE_SHOCK_1) != null) {
                chr.write(UserLocal.userBonusAttackRequest(AFTERIMAGE_SHOCK_2));
            }
        }
        Option o1 = new Option();
        Option o2 = new Option();
        MobTemporaryStat mts = mob.getTemporaryStat();

        switch (skillID) {
            case HAMMER_SMASH:
            case HAMMER_SMASH_CHARGE:
            case HEXA_HAMMER_SMASH:
            case HEXA_HAMMER_SMASH_CHARGE:
                int hsDebuffSkill = chr.hasSkill(HEXA_HAMMER_SMASH_CHARGE) ? HEXA_HAMMER_SMASH_CHARGE : HAMMER_SMASH_CHARGE;
                if (!mts.hasCurrentMobStatBySkillId(hsDebuffSkill)) {
                    si = SkillData.getSkillInfoById(hsDebuffSkill);
                    o1.nOption = si != null ? si.getValue(x, slv) : 10;
                    o1.rOption = hsDebuffSkill;
                    o1.tOption = 10;
                    mts.addStatOptions(mob, MobStat.RWLiftPress, o1);
                }
                break;
            case REVOLVING_BLAST:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    if (!mob.isBoss()) {
                        o1.nOption = 1;
                        o1.rOption = skillID;
                        o1.tOption = 10;
                        mts.addStatOptions(mob, MobStat.Freeze, o1);
                        if (!tsm.hasStatBySkillId(skillID)) {
                            o2.nOption = 1;
                            o2.rOption = skillID;
                            o2.tOption = 10;
                            tsm.sendStat(NotDamaged, o2);
                        }
                        chr.getField().broadcast(UserPacket.RWZeroBunkerMobBind(chr.getId(), mob, true));
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
        Option o1 = new Option();
        switch (attackInfo.skillId) {
            case FINAL_DESTROYER:
            case FINAL_DESTROYER_1:
            case ASCENT_BLASTER_1:
            case ASCENT_BLASTER_2:
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (mob == null) continue;
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    EnumMap<MobStat, Option> newMobStats = new EnumMap<>(MobStat.class);
                    Option opt1 = new Option();
                    opt1.nOption = 1;
                    opt1.rOption = skillID;
                    opt1.tOption = 10;
                    opt1.cOption = chr.getId();
                    newMobStats.put(MobStat.Freeze, opt1);
                    Option opt2 = new Option();
                    opt2.nOption = 1;
                    opt2.rOption = skillID;
                    opt2.tOption = 20;
                    opt2.cOption = chr.getId();
                    newMobStats.put(MobStat.OriginDebuff, opt2);
                    mts.addStatOptions(mob, newMobStats);
                }
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        other.write(UserLocal.showHexaSkillEff(chr));
                    }
                }
                break;
            case DETONATE:
            case DETONATE_UP:
                removeAmmo();
                break;
            case BOBBING_CHARGED:
            case WEAVING_CHARGED:
                if (chr.hasSkill(CHARGE_MASTERY) && getAmmo() > 0 && getAmmo() < getMaxAmmo()) {
                    addAmmo(chr.hasSkill(ADVANCED_CHARGE_MASTERY) ? 2 : 1);
                }
                int realSkillId = skillID == BOBBING_CHARGED ? BOBBING : WEAVING;
                si = SkillData.getSkillInfoById(realSkillId);
                if (si != null) {
                    o1.nOption = si.getValue(w, slv);
                    o1.rOption = realSkillId;
                    o1.tOption = si.getValue(subTime, slv);
                    o1.setInMillis(true);
                    tsm.sendStat(RWMovingEvar, o1);
                }
                break;
            case HAMMER_SMASH_CHARGE:
            case HEXA_HAMMER_SMASH_CHARGE:
                if (chr.hasSkill(CHARGE_MASTERY) && getAmmo() > 0 && getAmmo() < getMaxAmmo()) {
                    addAmmo(chr.hasSkill(ADVANCED_CHARGE_MASTERY) ? 2 : 1);
                }
                int hsAreaId = skillID == HEXA_HAMMER_SMASH_CHARGE ? HEXA_HAMMER_SMASH : HAMMER_SMASH;
                si = SkillData.getSkillInfoById(hsAreaId);
                if (si != null && !si.getRects().isEmpty()) {
                    AffectedArea aa = AffectedArea.getPassiveAA(chr, hsAreaId, slv);
                    aa.setMobOrigin((byte) 0);
                    aa.setPosition(chr.getPosition());
                    aa.setRect(aa.getPosition().getRectAround(si.getRects().get(0)));
                    aa.setDelay((short) 5);
                    chr.getField().spawnAffectedArea(aa);
                }
                break;
            case BUNKER_BUSTER_EXPLOSION:
            case BUNKER_BUSTER_EXPLOSION_2ND:
            case BUNKER_BUSTER_EXPLOSION_3RD:
            case BUNKER_BUSTER_EXPLOSION_4TH:
            case HEXA_BUNKER_BUSTER_EXPLOSION:
                setGauge(0);
                gaugeChange(0);
                break;
            case BUNKER_BUSTER_EXPLOSION_1:
            case BUNKER_BUSTER_EXPLOSION_2:
            case BUNKER_BUSTER_EXPLOSION_3:
            case BUNKER_BUSTER_EXPLOSION_4:
            case HEXA_BUNKER_BUSTER_EXPLOSION_1:
            case HEXA_BUNKER_BUSTER_EXPLOSION_2:
            case HEXA_BUNKER_BUSTER_EXPLOSION_3:
            case HEXA_BUNKER_BUSTER_EXPLOSION_4:
            case HEXA_BUNKER_BUSTER_EXPLOSION_5:
                if (tsm.hasStat(RWOverHeat)) {
                    return;
                }
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = (tsm.hasStat(RWMaximizeCannon) ? 1 : (si != null && si.getValue(time, 1) > 0 ? si.getValue(time, 1) : 7));
                tsm.sendStat(RWOverHeat, o1);
                removeGauge(getMaxAmmo());
                break;
            case HYPER_MAGNUM_PUNCH:
                o1.nOption = 5;
                o1.rOption = skillID;
                o1.tOption = 10;
                tsm.sendStat(RWMagnumBlow, o1);
                break;
            case MAGNUM_PUNCH:
            case DOUBLE_BLAST:
            case SHOTGUN_PUNCH:
            case SHOTGUN_PUNCH_SHOCKWAVE:
            case REVOLVING_CANON_MASTERY:
            case HEXA_MAGNUM_PUNCH:
            case HEXA_DOUBLE_BLAST:
            case HEXA_SHOTGUN_PUNCH:
            case HEXA_REVOLVING_CANON_MASTERY: {
                if (hasHitMobs) {
                    if (getGauge() < getMaxAmmo() && !tsm.hasStat(RWOverHeat)) {
                        addGauge();
                    }
                }
                lastAttack = skillID;
                chr.getField().broadcast(UserRemote.requestRWMultiChargeCancel(chr, skillID), chr);
                break;
            }
            case REVOLVING_CANNON_3:
            case REVOLVING_CANNON_2:
            case REVOLVING_CANNON:
            case HEXA_REVOLVING_CANNON:
            case HEXA_REVOLVING_CANNON_2:
            case HEXA_REVOLVING_CANNON_3: {
                if (hasHitMobs) {
                    removeAmmo();
                    if (getGauge() < getMaxAmmo() && !tsm.hasStat(RWOverHeat)) {
                        addGauge();
                    }
                }
                lastAttack = skillID;
                chr.getField().broadcast(UserRemote.requestRWMultiChargeCancel(chr, skillID), chr);
                break;
            }
        }
        if (getAmmo() == 0) {
            Option reloadOpt = new Option();
            reloadOpt.nOption = 1;
            reloadOpt.rOption = Blaster.REVOLVING_CANNON_RELOAD;
            reloadOpt.bOption = 0;
            reloadOpt.cOption = getGauge();
            tsm.sendStat(RWCylinder, reloadOpt);
            if (reloadCylinder == null || reloadCylinder.isDone()) {
                int time = tsm.hasStat(RWMaximizeCannon) ? 500 : 1500;
                reloadCylinder = chr.getTimer().addEvent(this::reloadCylinder, time);
            }
        }
        incrementComboTraining(skillID, tsm);
    }

    public int getAmmo() {
        return ammo;
    }

    public void setAmmo(int ammo) {
        this.ammo = ammo;
    }

    public void addAmmo() {
        addAmmo(1);
    }

    public void addAmmo(int amount) {
        ammoChange(amount);
    }

    public void removeAmmo() {
        removeAmmo(1);
    }

    public void removeAmmo(int amount) {
        ammoChange(-amount);
    }

    public void ammoChange(int amount) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        setAmmo(Math.max(0, Math.min(getAmmo() + amount, getMaxAmmo())));
        o.nOption = 1;
        o.rOption = REVOLVING_CANNON_RELOAD;
        o.bOption = getAmmo();
        o.cOption = getGauge();
        tsm.sendStat(RWCylinder, o);
    }

    public int getGauge() {
        return gauge;
    }

    public void setGauge(int gauge) {
        this.gauge = gauge;
    }

    public void addGauge() {
        addGauge(1);
    }

    public void addGauge(int amount) {
        gaugeChange(amount);
    }

    public void removeGauge() {
        removeGauge(1);
    }

    public void removeGauge(int amount) {
        gaugeChange(-amount);
    }

    public void gaugeChange(int amount) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        setGauge(Math.max(0, Math.min(getGauge() + amount, getMaxAmmo())));
        o.nOption = 1;
        o.rOption = REVOLVING_CANNON_RELOAD;
        o.bOption = getAmmo();
        o.cOption = getGauge();
        tsm.sendStat(RWCylinder, o);
    }

    public int getMaxAmmo() {
        int maxAmmo = 3;
        if (chr.hasSkill(REVOLVING_CANNON_PLUS)) {
            maxAmmo = 4;
        }
        if (chr.hasSkill(REVOLVING_CANNON_PLUS_II)) {
            maxAmmo = 5;
        }
        if (chr.hasSkill(REVOLVING_CANNON_PLUS_III)) {
            maxAmmo = 6;
        }
        return maxAmmo;
    }

    public void reloadCylinder() {
        setAmmo(getMaxAmmo());
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        o.nOption = 1;
        o.rOption = REVOLVING_CANNON_RELOAD;
        o.bOption = getMaxAmmo(); //ammo
        o.cOption = getGauge(); //gauge
        tsm.sendStat(RWCylinder, o);
    }

    private void incrementComboTraining(int skillId, TemporaryStatManager tsm) {
        if (chr.hasSkill(COMBO_TRAINING)) {
            SkillInfo chargeInfo = SkillData.getSkillInfoById(COMBO_TRAINING);
            int amount = 1;
            if (tsm.hasStat(RWCombination)) {
                amount = tsm.getOption(RWCombination).nOption;
                if (lastAttack == skillId) {
                    return;
                }
                if (amount < chargeInfo.getValue(z, 1)) {
                    amount++;
                }
            }
            int comboSkillId = chr.hasSkill(COMBO_TRAINING_II) ? COMBO_TRAINING_II : COMBO_TRAINING;
            EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
            Option o1 = new Option();
            Option o2 = new Option();
            Option o3 = new Option();
            Option o4 = new Option();
            lastAttack = skillId;
            o1.nOption = amount;
            o1.rOption = comboSkillId;
            o1.tOption = 30;
            newStats.put(RWCombination, o1);
            if (amount >= chargeInfo.getValue(w, 1)) { //if combo higher than w value give attack speed, for both passives
                o2.nValue = -1;
                o2.nReason = comboSkillId;
                o2.tTerm = 30;
                newStats.put(IndieBooster, o2);
            }
            o3.nOption = chr.hasSkill(COMBO_TRAINING_II) ? (3 + (chr.getSkillLevel(COMBO_TRAINING_II) / 10)) * amount : Math.max(1, chr.getSkillLevel(COMBO_TRAINING) / 3) * amount;
            o3.rOption = comboSkillId;
            o3.tOption = 30;
            newStats.put(DamR, o3);

            if (chr.hasSkill(COMBO_TRAINING_II)) {
                o4.nOption = Math.max(1, chr.getSkillLevel(COMBO_TRAINING_II) / 10) * amount;
                o4.rOption = COMBO_TRAINING_II;
                o4.tOption = 30;
                newStats.put(CriticalBuff, o4);
            }
            tsm.sendStat(newStats);
        }
    }

    @Override
    public int getFinalAttackSkill(int faSkill) {
        if (faSkill == REVOLVING_CANON_MASTERY) {
            if (chr.hasSkill(HEXA_REVOLVING_CANON_MASTERY)) return HEXA_REVOLVING_CANON_MASTERY;
        }
        return super.getFinalAttackSkill(faSkill);
    }

    // Skill related methods -------------------------------------------------------------------------------------------
    @Override
    public void handleSkill(Client c, InPacket inPacket, SkillUseInfo skillUseInfo) {
        super.handleSkill(c, inPacket, skillUseInfo);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Char chr = c.getChr();
        SkillInfo si = skillUseInfo.skillInfo;
        int slv = skillUseInfo.slv;
        int skillID = skillUseInfo.skillID;
        Option o1 = new Option();
        switch (skillID) {
            case SECRET_ASSEMBLY:
                Field toField = chr.getOrCreateFieldByCurrentInstanceType(si.getValue(x, slv));
                chr.warp(toField);
                break;
            case REVOLVING_CANNON_RELOAD:
                reloadCylinder();
                break;
            case VITALITY_SHIELD:
                if (!tsm.hasStat(RWBarrier)) {
                    return;
                }
                int healAmount = (int) (0.5 * chr.getMaxHP() + tsm.getOption(RWBarrier).nOption);
                chr.heal(healAmount);
                resetBlastShield();
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(RWBarrierHeal, o1);
                break;
            case HEROS_WILL_BLASTER:
                tsm.removeAllDebuffs();
                break;
            case ARM_CANNON_BOOST:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(Booster, o1);
                break;
            case FOR_LIBERTY_BLASTER:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieDamR, o1);
                break;
            case CANNON_OVERDRIVE:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(RWMaximizeCannon, o1);
                break;
            case ROCKET_PUNCH:
            case AFTERIMAGE_SHOCK_1:
                if (tsm.hasStat(TempSecondaryStat)) {
                    tsm.removeStatsBySkill(skillID);
                }
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si != null && si.getValue(time, slv) > 0 ? si.getValue(time, slv) : 35;
                o1.xOption = skillID == ROCKET_PUNCH ? ROCKET_PUNCH_EXTRA_SKILL : AFTERIMAGE_SHOCK_2;
                tsm.sendStat(TempSecondaryStat, o1);
                break;
            case FINAL_DESTROYER:
            case ASCENT_BLASTER_1:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 7;
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
        }
    }

    // Hit related methods ---------------------------------------------------------------------------------------------
    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (chr.hasSkill(BLAST_SHIELD) && hitInfo.hpDamage > 0 && !tsm.hasStat(RWBarrier)) {
            Skill shieldSkill = getBlastShieldSkill();
            if (shieldSkill != null) {
                SkillInfo shieldInfo = SkillData.getSkillInfoById(shieldSkill.getSkillId());
                if (shieldInfo != null) {
                    int amount = Math.min(hitInfo.hpDamage * shieldInfo.getValue(x, shieldSkill.getCurrentLevel()) / 100 + 1, chr.getMaxHP());
                    putOnShield(amount);
                }
            }
        }
        super.handleHit(c, inPacket, hitInfo);
    }

    public Skill getBlastShieldSkill() {
        Skill skill = null;
        if (chr.hasSkill(BLAST_SHIELD)) {
            skill = chr.getSkill(BLAST_SHIELD);
        }
        if (chr.hasSkill(SHIELD_TRAINING)) {
            skill = chr.getSkill(SHIELD_TRAINING);
        }
        if (chr.hasSkill(SHIELD_TRAINING_II)) {
            skill = chr.getSkill(SHIELD_TRAINING_II);
        }
        return skill;
    }

    public void decreaseShield() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (!tsm.hasStat(RWBarrier)) { //function stops on vitality shield or shield value <=0
            return;
        }
        Skill shieldSkill = getBlastShieldSkill();
        if (shieldSkill == null) {
            tsm.removeStat(RWBarrier);
            return;
        }
        SkillInfo si = SkillData.getSkillInfoById(shieldSkill.getSkillId());
        int oldShield = tsm.getOption(RWBarrier).nOption;
        int newShield = (oldShield * si.getValue(y, shieldSkill.getCurrentLevel()) / 100) - si.getValue(z, shieldSkill.getCurrentLevel());
        if (newShield <= 0) {
            resetBlastShield();
        } else {
            putOnShield(newShield);
        }
    }

    public void putOnShield(int amount) {
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        Option o1 = new Option();
        Option o2 = new Option();
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        o1.nReason = BLAST_SHIELD;
        o1.nValue = 100;
        newStats.put(IndieStance, o1);
        o2.nOption = amount;
        o2.rOption = BLAST_SHIELD;
        newStats.put(RWBarrier, o2);
        tsm.sendStat(newStats);
        chr.getTimer().addEvent(this::decreaseShield, 3000);
    }

    public void releaseRevolvingBlast() {
        for (Mob mob : chr.getField().getMobs()) {
            if (mob == null || mob.getHp() <= 0) {
                continue;
            }
            MobTemporaryStat mts = mob.getTemporaryStat();
            TemporaryStatManager tsm = chr.getTemporaryStatManager();
            if (mts.hasCurrentMobStatBySkillId(REVOLVING_BLAST)) {
                tsm.removeStatsBySkill(REVOLVING_BLAST);
                mts.removeMobStat(mob, MobStat.Freeze);
                chr.getField().broadcast(UserPacket.RWZeroBunkerMobBind(chr.getId(), mob, false));
            }
        }
    }

    @Override
    public void handleKeyDownSkill(Char chr, SkillInfo si, InPacket inPacket) {
        super.handleKeyDownSkill(chr, si, inPacket);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int skillId = si.getSkillId();
        Option o1 = new Option();
        switch (skillId) {
            case BULLET_BLAST:
                o1.nOption = 1;
                o1.rOption = BULLET_BLAST;
                o1.tOption = 5;
                tsm.sendStat(NotDamaged, o1);
                break;
        }
    }

    @Override
    public void handleCancelKeyDownSkill(Char chr, int skillID) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        switch (skillID) {
            case BULLET_BLAST:
                tsm.removeStatsBySkill(skillID);
                break;
            default:
                super.handleCancelKeyDownSkill(chr, skillID);
        }
    }

    @Override
    public void handleCancelTimer(Char chr) {
        if (reloadCylinder != null) {
            reloadCylinder.cancel(true);
        }
        super.handleCancelTimer(chr);
    }
}
