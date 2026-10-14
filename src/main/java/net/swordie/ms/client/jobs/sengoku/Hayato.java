package net.swordie.ms.client.jobs.sengoku;

import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Equip;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import static net.swordie.ms.enums.InvType.EQUIPPED;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.MobAttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.*;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.AssistType;
import net.swordie.ms.enums.MoveAbility;
import net.swordie.ms.enums.Stat;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.life.mob.skill.BurnedInfo;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.util.Util;

import java.util.Arrays;
import java.util.EnumMap;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;

public class Hayato extends Job {

    //Blade Energy
    public static final int QUICK_DRAW = 40011288;
    public static final int NORMAL_STANCE_BONUS = 40011291;
    public static final int QUICK_DRAW_STANCE_BONUS = 40011292;
    public static final int SUMMER_RAIN = 40011289;
    public static final int HITOKIRI_HUNDRED_STRIKE = 40011290;
    public static final int MASTER_OF_BLADES = 40010000;
    public static final int SHIMADA_HEART = 40010067;

    public static final int BATTOUJUTSU_ADVANCE = 41001010; //not sure what this skill does

    public static final int KATANA_BOOSTER = 41101005; //Buff
    public static final int MILITARY_MIGHT = 41101003; //Buff

    public static final int TORNADO_BLADE = 41111005;
    public static final int WILLOW_DODGE = 41110006;
    public static final int MERCILESS_BLADE = 41110007;
    public static final int WARRIOR_HEART = 41110009;

    public static final int IRON_SKIN = 41121003; //Buff
    public static final int AKATSUKI_HERO_HAYATO = 41121005; //Buff
    public static final int TORNADO_BLADE_IV = 41121017; //Attack (Stun Debuff)
    public static final int HITOKIRI_STRIKE = 41121002;
    public static final int HITOKIRI_STRIKE_ANGLE = 41121022;
    public static final int HITOKIRI_STRIKE_PRESIST = 41120049;
    public static final int EYE_FOR_AN_EYE = 41121015; //  ON/OFF
    public static final int JINSOKU = 41120006;
    public static final int BLOODLETTER = 41120007;
    public static final int SUDDEN_STRIKE = 41121018;
    public static final int AKATSUKI_BLOSSOMS = 41121004;
    public static final int AKATSUKI_TRACE = 41120013;

    public static final int GOD_OF_BLADES = 41121054;
    public static final int PRINCESS_VOW_HAYATO = 41121053;
    public static final int FALCONS_HONOR = 41121052;

    //BattouJutsu Linked Skills
    public static final int SURGING_BLADE_BATTOUJUTSU = 41001014;
    public static final int SHOURYUUSEN_BATTOUJUTSU = 41001015;
    public static final int RISING_SLASH_BATTOUJUTSU = 41101014;
    public static final int FALCON_DIVE_BATTOUJUTSU = 41101015;
    public static final int DANKUUSEN_BATTOUJUTSU = 41111018;
    public static final int SWEEPING_SWORD_BATTOUJUTSU = 41111017;
    public static final int TORNADO_BLADE_BATTOUJUTSU = 41121020;
    public static final int SUDDEN_STRIKE_BATTOUJUTSU = 41121021;

    // V skills
    public static final int BATTOUJUTSU_ZANKOU = 400011026;
    public static final int IAIJUTSU_PHANTOM_BLADE = 400011029;
    public static final int BATTOUJUTSU_ULTIMATE_WILL = 400011104;
    public static final int INSTANT_SLICE = 400011138;

    // HEXA skills
    public static final int RETURN_OF_THE_FIVE_PLANETS = 40011227;
    public static final int JIN_QUICK_DRAW = 41141500;
    public static final int JIN_QUICK_DRAW_1 = 41141501;
    public static final int JIN_QUICK_DRAW_2 = 41141502;
    public static final int JIN_QUICK_DRAW_3 = 41141503;
    public static final int JIN_QUICK_DRAW_4 = 41141504;
    public static final int HEXA_RAI_SANRENZAN = 41141000;
    public static final int HEXA_RAI_SANRENZAN_2 = 41141001;
    public static final int HEXA_RAI_SANRENZAN_3 = 41141002;
    public static final int HEXA_RAI_BLADE_FLASH = 41141003;
    public static final int HEXA_SHINSOKU = 41141004;
    public static final int HEXA_FALCONS_HONOR = 41141005;
    public static final int HEXA_AKATSUKI_TRACE = 41140006;
    public static final int HEXA_HITOKIRI_STRIKE = 41141007;
    public static final int HEXA_HITOKIRI_STRIKE_ANGLE = 41141008;

    private final int[] addedSkills = new int[]{
            RETURN_OF_THE_FIVE_PLANETS,
            QUICK_DRAW,
            SUMMER_RAIN,
            HITOKIRI_HUNDRED_STRIKE,
            MASTER_OF_BLADES,
            SHIMADA_HEART,
    };

    private int swordEnergy;

    public void setSwordEnergy(int swordEnergy) {
        this.swordEnergy = swordEnergy;
        chr.write(UserLocal.setSwordEnergy(swordEnergy));
    }

    public int getSwordEnergy() {
        return swordEnergy;
    }

    public void incSwordEnergy(int inc) {
        setSwordEnergy(getSwordEnergy() + inc > 1000 ? 1000 : (Math.max(getSwordEnergy() + inc, 0)));
    }

    public void incSwordEnergyFromGodOfBladesSummon(int swordEnergy) {
        int endingSwordEnergy = Math.min(swordEnergy, 800);
        incSwordEnergy(endingSwordEnergy);
        chr.write(UserPacket.effect(Effect.effectFromWZ("Skill/40001.img/skill/400011104/special0", !chr.isLeft(), 0, 0, 0)));
    }

    public Hayato(Char chr) {
        super(chr);
        if (chr.getId() != 0 && isHandlerOfJob(chr.getJob())) {
            for (int id : addedSkills) {
                if (!chr.hasSkill(id) || chr.getSkillLevel(id) == 0) {
                    Skill skill = SkillData.getSkillDeepCopyById(id);
                    if (skill != null) {
                        skill.setCurrentLevel(skill.getMaxLevel());
                        chr.addSkill(skill);
                    }
                }
            }
            chr.getTimer().addEvent(() -> setSwordEnergy(0), 2000);
        }
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isHayato(id);
    }

    private boolean isInQuickDrawStance() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        return tsm.hasStat(BladeStanceMode) && tsm.getOption(BladeStanceMode).nOption == 1;
    }

    public void toggleQuickDraw(TemporaryStatManager tsm) {
        Option o = new Option();
        if (isInQuickDrawStance()) {
            if (tsm.hasStatBySkillId(QUICK_DRAW_STANCE_BONUS)) {
                tsm.removeStatsBySkill(QUICK_DRAW_STANCE_BONUS);
            }
            if (tsm.hasStatBySkillId(QUICK_DRAW)) {
                tsm.removeStatsBySkill(QUICK_DRAW);
            }
            normalStanceBonus();
            chr.getTimer().addEvent(this::normalStanceBonus, 1000);
        } else {
            if (tsm.hasStatBySkillId(NORMAL_STANCE_BONUS)) {
                tsm.removeStatsBySkill(NORMAL_STANCE_BONUS);
            }
            o.nOption = 1; // true
            o.rOption = QUICK_DRAW;
            tsm.sendStat(BladeStanceMode, o);
            quickDrawStanceBonus();
            chr.getTimer().addEvent(this::quickDrawStanceBonus, 1000);
        }
    }

    public void setHayatoStanceBonus() {
        if (chr.hasSkill(QUICK_DRAW)) {
            TemporaryStatManager tsm = chr.getTemporaryStatManager();
            if (tsm.hasStat(BladeStancePower)) {
                if (isInQuickDrawStance()) {
                    if (tsm.getOptByCTSAndSkill(BladeStancePower, QUICK_DRAW_STANCE_BONUS) == null) {
                        tsm.removeStat(BladeStancePower);
                        Option o = new Option();
                        o.nOption = 1;
                        o.rOption = QUICK_DRAW_STANCE_BONUS;
                        tsm.sendStat(BladeStancePower, o);
                    }
                } else {
                    if (tsm.getOptByCTSAndSkill(BladeStancePower, NORMAL_STANCE_BONUS) == null) {
                        tsm.removeStat(BladeStancePower);
                        Option o = new Option();
                        o.nOption = 1;
                        o.rOption = NORMAL_STANCE_BONUS;
                        tsm.sendStat(BladeStancePower, o);
                    }
                }
            } else {
                Option o = new Option();
                o.nOption = 1;
                o.rOption = isInQuickDrawStance() ? QUICK_DRAW_STANCE_BONUS : NORMAL_STANCE_BONUS;
                tsm.sendStat(BladeStancePower, o);
            }
        }
    }

    private void quickDrawStanceBonus() {
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        int hayatoBDR = 2;
        int hayatoBooster = -1;
        boolean setStat = false;
        if (getSwordEnergy() >= 200) {
            hayatoBDR += 2;
        }
        if (getSwordEnergy() >= 400) {
            hayatoBDR += 2;
        }
        if (getSwordEnergy() >= 700) {
            hayatoBDR += 2;
        }
        if (getSwordEnergy() == 1000) {
            hayatoBDR += 2;
        }
        //BossDmg
        Option curBdr = tsm.getOptByCTSAndSkill(IndieBDR, QUICK_DRAW_STANCE_BONUS);
        if (curBdr == null || curBdr.nValue != hayatoBDR) {
            o1.nValue = hayatoBDR;
            o1.nReason = QUICK_DRAW_STANCE_BONUS;
            newStats.put(IndieBDR, o1);
            setStat = true;
        }
        // Stance
        if (tsm.getOptByCTSAndSkill(Stance, QUICK_DRAW_STANCE_BONUS) == null) {
            o2.nOption = 100;
            o2.rOption = QUICK_DRAW_STANCE_BONUS;
            newStats.put(Stance, o2);
            setStat = true;
        }
        //Booster
        if (tsm.getOptByCTSAndSkill(IndieBooster, QUICK_DRAW_STANCE_BONUS) == null) {
            o3.nValue = hayatoBooster;
            o3.nReason = QUICK_DRAW_STANCE_BONUS;
            newStats.put(IndieBooster, o3);
            setStat = true;
        }
        if (setStat) {
            tsm.sendStat(newStats, true);
        }
    }

    private void normalStanceBonus() {
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        Option o4 = new Option();
        int hayatoPAD = 1;
        int hayatoMHPR = 2;
        int hayatoIgnoreMobpdpR = 9;
        boolean setStat = false;
        if (getSwordEnergy() >= 200) {
            hayatoPAD += 1;
            hayatoMHPR += 2;
            hayatoIgnoreMobpdpR += 9;
        }
        if (getSwordEnergy() >= 400) {
            hayatoPAD += 2;
            hayatoMHPR += 4;
            hayatoIgnoreMobpdpR += 9;
        }
        if (getSwordEnergy() >= 700) {
            hayatoPAD += 2;
            hayatoMHPR += 4;
            hayatoIgnoreMobpdpR += 9;
        }
        if (getSwordEnergy() == 1000) {
            hayatoPAD += 2;
            hayatoMHPR += 3;
            hayatoIgnoreMobpdpR += 9;
        }
        // PAD
        Option curPad = tsm.getOptByCTSAndSkill(IndiePADR, NORMAL_STANCE_BONUS);
        if (curPad == null || curPad.nValue != hayatoPAD) {
            o1.nOption = hayatoPAD;
            o1.nValue = hayatoPAD;
            o1.rOption = NORMAL_STANCE_BONUS;
            o1.nReason = NORMAL_STANCE_BONUS;
            newStats.put(IndiePADR, o1);
            setStat = true;
        }
        // Max HP & Max MP
        Option curMhp = tsm.getOptByCTSAndSkill(IndieMHPR, NORMAL_STANCE_BONUS);
        if (curMhp == null || curMhp.nValue != hayatoMHPR) {
            o2.nOption = hayatoMHPR;
            o2.nValue = hayatoMHPR;
            o2.rOption = NORMAL_STANCE_BONUS;
            o2.nReason = NORMAL_STANCE_BONUS;
            newStats.put(IndieMHPR, o2);
            newStats.put(IndieMMPR, o2.deepCopy());
            setStat = true;
        }
        // Ignore DEF
        Option curIed = tsm.getOptByCTSAndSkill(IndieIgnoreMobpdpR, NORMAL_STANCE_BONUS);
        if (curIed == null || curIed.nValue != hayatoIgnoreMobpdpR) {
            o3.nOption = hayatoIgnoreMobpdpR;
            o3.nValue = hayatoIgnoreMobpdpR;
            o3.rOption = NORMAL_STANCE_BONUS;
            o3.nReason = NORMAL_STANCE_BONUS;
            newStats.put(IndieIgnoreMobpdpR, o3);
            setStat = true;
        }
        // Stance
        if (tsm.getOptByCTSAndSkill(Stance, NORMAL_STANCE_BONUS) == null) {
            o4.nOption = 100;
            o4.rOption = NORMAL_STANCE_BONUS;
            newStats.put(Stance, o4);
            setStat = true;
        }
        if (setStat) {
            tsm.sendStat(newStats, true);
        }
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        Option o1 = new Option();
        MobTemporaryStat mts = mob.getTemporaryStat();

        if (isInQuickDrawStance()) {
            quickDrawStunBonus(mob);
        }
        applyDOTOnMob(mob, damage);
        switch (skillID) {
            case TORNADO_BLADE_IV:
            case TORNADO_BLADE_BATTOUJUTSU:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    if (Util.succeedProp(si.getValue(subProp, slv))) {
                        if (!mob.isBoss()) {
                            o1.nOption = 1;
                            o1.rOption = skillID;
                            o1.tOption = si.getValue(time, slv);
                            mts.addStatOptions(mob, MobStat.Stun, o1);
                        }
                    }
                }
                break;
            case SUDDEN_STRIKE:
            case SUDDEN_STRIKE_BATTOUJUTSU:
            case HEXA_SHINSOKU:
            case HEXA_RAI_SANRENZAN_3:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = si.getValue(y, slv) > 0 ? si.getValue(y, slv) : 20;
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(time, slv) > 0 ? si.getValue(time, slv) : 20;
                    mts.addStatOptions(mob, MobStat.TotalDamParty, o1);
                }
                break;
        }
        super.handleDebuffOnMob(c, mob, si, skillID, slv, damage);
    }

    @Override
    public void handleAttack(Client c, AttackInfo attackInfo, SkillInfo si, long now) {
        Char chr = c.getChr();
        super.handleAttack(c, attackInfo, si, now);
        int skillID = attackInfo.skillId;
        boolean hasHitMobs = !attackInfo.mobAttackInfo.isEmpty();
        int slv = attackInfo.slv;
        if (hasHitMobs) {
            if (isInQuickDrawStance()) {
                quickDrawStanceBonus();
            } else {
                normalStanceBonus();
            }
            warriorHeartHealHP();
            incrementSwordEnergy();
        }
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        switch (attackInfo.skillId) {
            case SUMMER_RAIN:
            case HITOKIRI_HUNDRED_STRIKE:
                o1.nReason = skillID;
                o1.nValue = 15;
                o1.tTerm = 120;
                tsm.sendStat(IndieDamR, o1); //Indie
                setSwordEnergy(Math.max(0, getSwordEnergy() - 200));
                break;
            case HITOKIRI_STRIKE:
            case HITOKIRI_STRIKE_ANGLE:
                if (!tsm.hasStatBySkillId(HITOKIRI_STRIKE)) {
                    o1.nReason = HITOKIRI_STRIKE;
                    o1.nValue = si.getValue(prop, slv);
                    o1.tTerm = si.getValue(time, slv) + (chr.hasSkill(HITOKIRI_STRIKE_PRESIST) ? 20 : 0);
                    newStats.put(IndieCrR, o1);
                    o2.nOption = 1;
                    o2.rOption = HITOKIRI_STRIKE;
                    o2.tOption = 3;
                    o2.nReason = HITOKIRI_STRIKE;
                    o2.nValue = 1;
                    o2.tTerm = 3;
                    newStats.put(IndieNotDamaged, o2);
                    tsm.sendStat(newStats);
                }
                break;
            case HEXA_HITOKIRI_STRIKE:
            case HEXA_HITOKIRI_STRIKE_ANGLE:
                if (!tsm.hasStatBySkillId(HEXA_HITOKIRI_STRIKE)) {
                    o1.nReason = HEXA_HITOKIRI_STRIKE;
                    o1.nValue = si.getValue(prop, slv);
                    o1.tTerm = si.getValue(time, slv);
                    newStats.put(IndieCrR, o1);
                    o2.nOption = 1;
                    o2.rOption = HEXA_HITOKIRI_STRIKE;
                    o2.tOption = 3;
                    o2.nReason = HEXA_HITOKIRI_STRIKE;
                    o2.nValue = 1;
                    o2.tTerm = 3;
                    newStats.put(IndieNotDamaged, o2);
                    o3.nReason = HEXA_HITOKIRI_STRIKE;
                    o3.nValue = si.getValue(x, slv);
                    o3.tTerm = si.getValue(time, slv);
                    newStats.put(IndieCD, o3);
                    tsm.sendStat(newStats);
                }
                break;
            case IAIJUTSU_PHANTOM_BLADE:
                incSwordEnergy(-Math.min(getSwordEnergy(), 200));
                o1.nOption = Math.min(5, (tsm.hasStat(SummonProp) ? tsm.getOption(SummonProp).nOption : 0) + 1);
                o1.rOption = skillID;
                o1.tOption = 40;
                newStats.put(SummonProp, o1);
                int fdPerStack = si.getValue(v, slv) > 0 ? si.getValue(v, slv) : 4;
                o2.nValue = fdPerStack * o1.nOption;
                o2.nReason = skillID;
                o2.tTerm = 40;
                newStats.put(IndiePMdR, o2);
                tsm.sendStat(newStats);
                break;
            case BATTOUJUTSU_ULTIMATE_WILL:
                Summon gobSummon = chr.getField().getSummonBySkillId(chr, BATTOUJUTSU_ULTIMATE_WILL);
                if (gobSummon == null) {
                    break;
                }
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (mob == null || mob.getHp() <= 0) {
                        continue;
                    }
                    long totaldmg = Arrays.stream(mai.damages).sum();
                    if (totaldmg >= mob.getHp()) {
                        gobSummon.setCount(Math.min(gobSummon.getCount() + 8, 800));
                        chr.write(MobPool.specialEffectBySkill(mob, attackInfo.skillId, chr.getId(), (short) 1000));
                    }
                }
                chr.getField().broadcast(Summoned.effect(gobSummon, 3));
                gobSummon.setCount(Math.min(gobSummon.getCount() + 10, 800));
                break;
            case FALCONS_HONOR:
            case HEXA_FALCONS_HONOR:
            case BATTOUJUTSU_ZANKOU:
                if (getSwordEnergy() + si.getValue(x, slv) > 1000) {
                    setSwordEnergy(1000);
                } else {
                    incSwordEnergy(si.getValue(x, slv));
                }
                break;
            case JIN_QUICK_DRAW:
            case JIN_QUICK_DRAW_1:
            case JIN_QUICK_DRAW_2:
            case JIN_QUICK_DRAW_3:
            case JIN_QUICK_DRAW_4:
                setSwordEnergy(1000);
                if (!tsm.hasStat(SixthShinBatto)) {
                    o1.nOption = 1;
                    o1.rOption = JIN_QUICK_DRAW;
                    o1.tOption = 30;
                    newStats.put(SixthShinBatto, o1);
                    o2.nReason = JIN_QUICK_DRAW;
                    o2.nValue = si != null && si.getValue(q, slv) > 0 ? si.getValue(q, slv) : 15;
                    o2.tTerm = 30;
                    newStats.put(IndiePMdR, o2);
                    tsm.sendStat(newStats);
                }
                break;
        }
        setHayatoStanceBonus();
    }

    public void applyDOTOnMob(Mob mob, long damage) {
        if (chr.hasSkill(BLOODLETTER)) {
            Skill skill = chr.getSkill(BLOODLETTER);
            int slv = skill.getCurrentLevel();
            SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
            int proc = si.getValue(prop, slv);
            if (Util.succeedProp(proc)) {
                MobTemporaryStat mts = mob.getTemporaryStat();
                BurnedInfo bi = BurnedInfo.createBurnInfo(chr, skill.getSkillId(), slv, damage);
                mts.createAndAddBurnedInfo(mob, bi, skill.getSkillId());
            }
        } else if (chr.hasSkill(MERCILESS_BLADE)) {
            Skill skill = chr.getSkill(MERCILESS_BLADE);
            int slv = skill.getCurrentLevel();
            SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
            int proc = si.getValue(prop, slv);
            if (Util.succeedProp(proc)) {
                MobTemporaryStat mts = mob.getTemporaryStat();
                BurnedInfo bi = BurnedInfo.createBurnInfo(chr, skill.getSkillId(), slv, damage);
                mts.createAndAddBurnedInfo(mob, bi, skill.getSkillId());
            }
        }
    }

    public void warriorHeartHealHP() { //TODO on Crit hit,  proc% to gainHP%
        if (chr.hasSkill(WARRIOR_HEART)) {
            Skill skill = chr.getSkill(WARRIOR_HEART);
            int slv = skill.getCurrentLevel();
            SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
            int proc = si.getValue(prop, slv);
            int healrate = si.getValue(x, slv);
            int healhp = (int) ((chr.getMaxHP() / ((double) 100 / healrate)));

            //Get chance to heal on  #Crit hits
            if (Util.succeedProp(proc)) {
                chr.heal(healhp);
            }
        }
    }

    public void quickDrawStunBonus(Mob mob) {
        Option o = new Option();
        int stunProc = 30;
        if (getSwordEnergy() >= 200) {
            stunProc += 5;
        }
        if (getSwordEnergy() >= 400) {
            stunProc += 5;
        }
        if (getSwordEnergy() >= 700) {
            stunProc += 5;
        }
        if (getSwordEnergy() == 1000) {
            stunProc += 5;
        }
        MobTemporaryStat mts = mob.getTemporaryStat();
        if (!mts.hasCurrentMobStatBySkillId(QUICK_DRAW)) {
            if (Util.succeedProp(stunProc) && !mob.isBoss()) {
                o.nOption = 1;
                o.rOption = QUICK_DRAW;
                o.tOption = 3;
                mts.addStatOptions(mob, MobStat.Stun, o);
            }
        }
    }

    public void incrementSwordEnergy() {
        //reward BladeEnergy
        if (isInQuickDrawStance()) {
            //Reward 2 Blade Energy
            if (getSwordEnergy() + 2 > 1000) {
                setSwordEnergy(1000);
            } else {
                incSwordEnergy(2);
            }
        } else {
            //Reward 5 Blade Energy
            if (getSwordEnergy() + 5 > 1000) {
                setSwordEnergy(1000);
            } else {
                incSwordEnergy(5);
            }
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
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        Option o4 = new Option();
        Option o5 = new Option();
        switch (skillID) {
            case AKATSUKI_BLOSSOMS:
                tsm.removeAllDebuffs();
                break;
            case QUICK_DRAW:
                setSwordEnergy(Math.max(0, getSwordEnergy() - 100));
                toggleQuickDraw(tsm);
                setHayatoStanceBonus();
                return;
            case BATTOUJUTSU_ADVANCE:
                o1.nOption = 2;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                newStats.put(SkillDeployment, o1);
                o2.nOption = 4;
                o2.rOption = skillID;
                o2.tOption = si.getValue(time, slv);
                newStats.put(DamR, o2);
                tsm.sendStat(newStats);
                break;
            case KATANA_BOOSTER:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(Booster, o1);
                break;
            case MILITARY_MIGHT:
                o1.nReason = skillID;
                o1.nValue = si.getValue(x, slv);
                o1.tTerm = si.getValue(time, slv);
                newStats.put(IndieMHPR, o1); //Indie
                o2.nReason = skillID;
                o2.nValue = si.getValue(y, slv);
                o2.tTerm = si.getValue(time, slv);
                newStats.put(IndieMMPR, o2); //Indie
                o3.nOption = si.getValue(speed, slv);
                o3.rOption = skillID;
                o3.tOption = si.getValue(time, slv);
                newStats.put(Speed, o3);
                o4.nOption = si.getValue(jump, slv);
                o4.rOption = skillID;
                o4.tOption = si.getValue(time, slv);
                newStats.put(Jump, o4);
                o5.nOption = si.getValue(padX, slv);
                o5.rOption = skillID;
                o5.tOption = si.getValue(time, slv);
                newStats.put(PAD, o5);
                tsm.sendStat(newStats);
                break;
            case IRON_SKIN:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                newStats.put(AsrR, o1);
                newStats.put(TerR, o1.deepCopy());
                o2.nOption = si.getValue(y, slv);
                o2.rOption = skillID;
                o2.tOption = si.getValue(time, slv);
                newStats.put(DamageReduce, o2);
                tsm.sendStat(newStats);
                break;
            case AKATSUKI_HERO_HAYATO:
                o1.nReason = skillID;
                o1.nValue = si.getValue(x, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieStatR, o1);
                break;
            case EYE_FOR_AN_EYE:
                if (tsm.hasStatBySkillId(skillID)) {
                    tsm.removeStatsBySkill(skillID);
                } else {
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    tsm.sendStat(KenjiCounter, o1);
                }
                break;
            case PRINCESS_VOW_HAYATO:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv); // 60
                tsm.sendStat(IndieDamR, o1);
                break;
            case GOD_OF_BLADES:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indiePad, slv);
                o1.tTerm = si.getValue(time, slv);
                newStats.put(IndiePAD, o1); //Indie
                o2.nOption = si.getValue(x, slv);
                o2.rOption = skillID;
                o2.tOption = si.getValue(time, slv);
                newStats.put(AsrR, o2);
                newStats.put(TerR, o2.deepCopy());
                tsm.sendStat(newStats);
                break;
            case BATTOUJUTSU_ULTIMATE_WILL:
                int cost = si.getValue(s, slv);
                incSwordEnergy(-Math.min(getSwordEnergy(), cost));
                Summon summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setFlyMob(false);
                summon.setMoveAbility(MoveAbility.Stop);
                chr.getField().spawnSummon(summon);
                break;
            case JIN_QUICK_DRAW:
                setSwordEnergy(1000);
                o1.nOption = 1;
                o1.rOption = JIN_QUICK_DRAW;
                o1.tOption = 30;
                newStats.put(SixthShinBatto, o1);
                o2.nReason = JIN_QUICK_DRAW;
                o2.nValue = si.getValue(q, slv) > 0 ? si.getValue(q, slv) : 15;
                o2.tTerm = 30;
                newStats.put(IndiePMdR, o2);
                tsm.sendStat(newStats);
                break;
        }
        setHayatoStanceBonus();
    }

    // Hit related methods ---------------------------------------------------------------------------------------------
    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {

        //Dodge
        if (hitInfo.hpDamage == 0 && hitInfo.mpDamage == 0) {
            jinsoku();
            incrementWillowDodge();
        }
        super.handleHit(c, inPacket, hitInfo);
    }

    public void incrementWillowDodge() {
        if (!chr.hasSkill(WILLOW_DODGE)) {
            return;
        }
        int slv = chr.getSkillLevel(WILLOW_DODGE);
        SkillInfo si = SkillData.getSkillInfoById(WILLOW_DODGE);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        if (tsm.hasStat(EvasionMaster)) {
            int currentNOption = tsm.getOption(EvasionMaster).nOption;
            if (currentNOption / si.getValue(damR, slv) < si.getValue(x, slv)) {
                o1.nOption = tsm.getOption(EvasionMaster).nOption + si.getValue(damR, slv);
                o1.rOption = WILLOW_DODGE;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(EvasionMaster, o1);
            }
        } else {
            o1.nOption = si.getValue(damR, slv);
            o1.rOption = WILLOW_DODGE;
            o1.tOption = si.getValue(time, slv);
            tsm.sendStat(EvasionMaster, o1);
        }
    }

    public void jinsoku() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        if (chr.hasSkill(JINSOKU)) {
            Skill skill = chr.getSkill(JINSOKU);
            int slv = skill.getCurrentLevel();
            SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
            int proc = si.getValue(t, slv);
            if (Util.succeedProp(proc)) {
                o.nOption = si.getValue(y, slv);
                o.rOption = skill.getSkillId();
                o.tOption = si.getValue(time, slv);
                tsm.sendStat(DamageReduce, o);
            }
        }
    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(JobConstants.HAYATO_CREATION_MAP);
        cs.setLevel(10);
        cs.setJob(JobConstants.JobEnum.HAYATO1.getJobId());
        cs.setStr(45);
        cs.setDex(4);
        cs.setInt(4);
        cs.setLuk(4);
        cs.setHp(1000);
        cs.setMaxHp(1000);
        cs.setMp(500);
        cs.setMaxMp(500);
        cs.getExtendSP().addSpToJobLevel(1, 5);
        chr.getAvatarData().getAvatarLook().setJob(JobConstants.JobEnum.HAYATO1.getJobId());
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        Equip weapon = ItemData.getEquipDeepCopyFromID(1542000, false); // Starter Katana
        if (weapon != null) {
            chr.addItemToInventoryToNewCharacter(EQUIPPED, weapon, true);
            weapon.setInventoryID(chr.getInventoryByType(EQUIPPED).getId());
            weapon.setCharID(chr.getId());
            weapon.setInvType(EQUIPPED);
            weapon.setBagIndex(BodyPart.Weapon.getVal());
            weapon.saveToSQL();
        }
        Item secondary = ItemData.getItemDeepCopy(1352800); // Wakizashi
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
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        for (int id : addedSkills) {
            if (!chr.hasSkill(id) || chr.getSkillLevel(id) == 0) {
                Skill skill = SkillData.getSkillDeepCopyById(id);
                if (skill != null) {
                    skill.setCurrentLevel(skill.getMaxLevel());
                    chr.addSkill(skill);
                }
            }
        }
        if (chr.getLevel() < 30) {
            ScriptManagerImpl sm = chr.getScriptManager();
            for (int qid = 57000; qid <= 57015; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            sm.levelUntil(30);
            sm.setJob(JobConstants.JobEnum.HAYATO2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.HAYATO1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.HAYATO2.getJobId(), 3);
            sm.giveAndEquip(1542000); // Katana
            sm.giveAndEquip(1352801); // Lv 30 Wakizashi
            sm.warp(FieldConstants.HOME_MAP);
        }
        normalStanceBonus();
        setHayatoStanceBonus();
        super.handleInitAfterMigrate(chr);
    }

    @Override
    public int getFinalAttackSkill(int faSkill) {
        if (faSkill == AKATSUKI_TRACE) {
            if (chr.hasSkill(HEXA_AKATSUKI_TRACE)) return HEXA_AKATSUKI_TRACE;
        }
        return super.getFinalAttackSkill(faSkill);
    }

    @Override
    public void handleLevelUp(short level) {
        super.handleLevelUp(level);
        ScriptManagerImpl sm = chr.getScriptManager();
        if (level >= 30 && chr.getJob() == 4100) {
            sm.jobAdvance((short) 4110);
        }
        if (level >= 60 && chr.getJob() == 4110) {
            sm.jobAdvance((short) 4111);
            chr.completeQuest(57163);
        }
        if (level >= 100 && chr.getJob() == 4111) {
            sm.jobAdvance((short) 4112);
            chr.completeQuest(57164);
        }
    }

    @Override
    public int handleSetCoolDownSkill(int skillId) {
        switch (skillId) {
            case TORNADO_BLADE, TORNADO_BLADE_BATTOUJUTSU -> { // Tornado Blade
                chr.setSkillCooldown(TORNADO_BLADE_IV, chr.getSkillLevel(TORNADO_BLADE_IV));
                return 1;
            }
            case HITOKIRI_HUNDRED_STRIKE -> {
                chr.setSkillCooldown(SUMMER_RAIN, chr.getSkillLevel(SUMMER_RAIN));
                return 1;
            }
            case HITOKIRI_STRIKE_ANGLE -> {
                chr.setSkillCooldown(Hayato.HITOKIRI_STRIKE_ANGLE, chr.getSkillLevel(HITOKIRI_STRIKE));
                return 1;
            }
            case HEXA_HITOKIRI_STRIKE -> {
                chr.setSkillCooldown(HITOKIRI_STRIKE, chr.getSkillLevel(HEXA_HITOKIRI_STRIKE));
                return 1;
            }
            case HEXA_HITOKIRI_STRIKE_ANGLE -> {
                chr.setSkillCooldown(HITOKIRI_STRIKE_ANGLE, chr.getSkillLevel(HEXA_HITOKIRI_STRIKE));
                return 1;
            }
        }
        return super.handleSetCoolDownSkill(skillId);
    }
}
