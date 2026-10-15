package net.swordie.ms.client.jobs.legend;

import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Equip;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.loaders.ItemData;
import static net.swordie.ms.enums.InvType.EQUIPPED;
import net.swordie.ms.client.character.skills.LarknessManager;
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
import net.swordie.ms.connection.packet.Effect;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.UserPacket;
import net.swordie.ms.connection.packet.UserRemote;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.constants.SkillConstants;
import net.swordie.ms.enums.AssistType;
import net.swordie.ms.enums.ChatType;
import net.swordie.ms.enums.MoveAbility;
import net.swordie.ms.enums.Stat;
import net.swordie.ms.life.AffectedArea;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Util;

import java.util.EnumMap;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;

public class Luminous extends Job {

    public static final int SUNFIRE = 20040216;
    public static final int ECLIPSE = 20040217;
    public static final int EQUILIBRIUM_DARK = 20040219;
    public static final int EQUILIBRIUM_LIGHT = 20040220;
    public static final int INNER_LIGHT = 20040221;
    public static final int FLASH_BLINK = 20041222;
    public static final int CHANGE_LIGHT_DARK = 20041239;
    public static final int MAGIC_BOOSTER = 27101004; //Buff
    public static final int PRESSURE_VOID = 27101202;

    public static final int STANDARD_MAGIC_GUARD = 27000003;
    public static final int FLASH_SHOWER = 27001100;
    public static final int ABYSSALL_DROP = 27001201;
    public static final int LIGHT_LEAP = 27001008;
    public static final int LIGHT_AFFINITY = 27000106;
    public static final int DARK_AFFINITY = 27000207;

    public static final int SHADOW_SHELL = 27111004; //Buff
    public static final int RAY_OF_REDEMPTION = 27111101; // Attack + heals party members
    public static final int DUSK_GUARD = 27110005; // Passive in v265 (was 27111005)
    public static final int PHOTIC_MEDITATION = 27111006; //Buff
    public static final int LUNAR_TIDE = 27110007; // Self Recovery in v265
    public static final int LIGHT_SPEED_BOOST = 27111008; // Toggle
    public static final int EQUILIBRIUM_LIBERATION = 27111009; // Toggle
    public static final int DEATH_SCYTHE = 27111303;

    public static final int DARK_CRESCENDO = 27120005; // Passive stacking buff on attack in v265 (was 27121005)
    public static final int ARCANE_PITCH = 27121006; //Buff
    public static final int MAPLE_WARRIOR_LUMI = 27121009; // Passive in v265
    public static final int TWILIGHT_NOVA = 27121113;
    public static final int TWILIGHT_NOVA_DARK = 27121114;
    public static final int TWILIGHT_NOVA_EQ = 27121115;
    public static final int ENDER = 27121303;
    public static final int DARKNESS_MASTERY = 27120008;
    public static final int HEROS_WILL_LUMI = 27121010;
    public static final int MORNING_STAR = 27121201;

    public static final int EQUALIZE = 27121054;
    public static final int HEROIC_MEMORIES_LUMI = 27121053;
    public static final int ARMAGEDDON = 27121052; //Stun debuff

    // V skills
    public static final int GATE_OF_LIGHT = 400021005;
    public static final int AETHER_CONDUIT_L = 400021041;
    public static final int AETHER_CONDUIT_D = 400021049;
    public static final int AETHER_CONDUIT_EQ = 400021050;
    public static final int BAPTISM_OF_LIGHT_AND_DARKNESS = 400021071;
    public static final int LIBERATION_ORB = 400021105;
    public static final int LIBERATION_ORB_IMBALANCE_ATOM = 400021106; // Active Imbalance ForceAtom
    public static final int LIBERATION_ORB_LIGHT_ZONE = 400021107; // Passive Light
    public static final int LIBERATION_ORB_DARK_BULLET = 400021108; // Passive Dark
    public static final int LIBERATION_ORB_IMBALANCE_ATTACK = 400021109;
    public static final int LIBERATION_ORB_BALANCE_ATTACK = 400021110;

    // ===== 6th Job HEXA Matrix Skills =====
    public static final int HARMONIC_PARADOX = 27141500; // Origin Skill
    public static final int HARMONIC_PARADOX_KEY = 27141501;
    public static final int LUSTROUS_ORB = 27141502; // Origin Second Skill
    public static final int HARMONIC_PARADOX_FINISHER = 27141503;
    public static final int HEXA_ENDER = 27141000;
    public static final int HEXA_REFLECTION = 27141001;
    public static final int HEXA_ENDLESS_DARKNESS = 27140002;
    public static final int HEXA_ENDLESS_DARKNESS_ACTIVE = 27141003;
    public static final int HEXA_APOCALYPSE = 27141004;
    public static final int HEXA_ETERNAL_LIGHT = 27140005;
    public static final int HEXA_ETERNAL_LIGHT_ACTIVE = 27141006;
    public static final int HEXA_TWILIGHT_NOVA = 27141007;
    public static final int HEXA_TWILIGHT_NOVA_DARK = 27141008;
    public static final int HEXA_TWILIGHT_NOVA_EQ = 27141009;

    private final int[] addedSkills = new int[]{
            EQUILIBRIUM_DARK,
            EQUILIBRIUM_LIGHT,
            CHANGE_LIGHT_DARK,
            SUNFIRE,
            ECLIPSE,
            INNER_LIGHT,
            FLASH_BLINK
    };

    private static final int[] FIRST_JOB_INVISIBLE_SKILLS = new int[]{
            FLASH_SHOWER,
            ABYSSALL_DROP,
            LIGHT_LEAP,
            LIGHT_AFFINITY,
            DARK_AFFINITY
    };

    private long darkCrescendoTimer;
    private ScheduledFuture<?> equilibriumTimer;

    public Luminous(Char chr) {
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
            ensureFirstJobVisibleSkills(chr);
            if (chr.getTemporaryStatManager().getLarknessManager() == null) {
                chr.getTemporaryStatManager().setLarknessManager(new LarknessManager(chr));
            }
        }
    }

    public static void ensureFirstJobVisibleSkills(Char chr) {
        if (chr == null || !JobConstants.isLuminous(chr.getJob())) {
            return;
        }
        for (int skillId : FIRST_JOB_INVISIBLE_SKILLS) {
            if (chr.getSkill(skillId) == null) {
                Skill skill = SkillData.getSkillDeepCopyById(skillId);
                if (skill != null) {
                    int maxLv = skill.getMaxLevel() > 0 ? skill.getMaxLevel() : skill.getMasterLevel();
                    skill.setMasterLevel(maxLv);
                    skill.setCurrentLevel(0);
                    chr.addSkill(skill);
                }
            }
        }
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isLuminous(id);
    }

    private boolean isInEquilibrium() {
        return equilibriumTimer != null && !equilibriumTimer.isDone();
    }

    private void enterEquilibrium(boolean fromDark) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        LarknessManager lm = tsm.getLarknessManager();
        if (equilibriumTimer != null && !equilibriumTimer.isDone()) {
            equilibriumTimer.cancel(true);
        }
        int eqDuration = getMoreEquilibriumTime();
        Option o = new Option();
        o.nOption = 1;
        o.rOption = fromDark ? EQUILIBRIUM_DARK : EQUILIBRIUM_LIGHT;
        o.tOption = eqDuration;
        if (fromDark) {
            lm.setGauge(0);
        } else {
            lm.setGauge(10000);
        }
        tsm.sendStat(Larkness, o);
        equilibriumTimer = chr.getTimer().addEvent(this::changeMode, eqDuration, TimeUnit.SECONDS);
        chr.resetSkillCoolTime(ENDER);
        chr.resetSkillCoolTime(HEXA_ENDER);
        chr.resetSkillCoolTime(DEATH_SCYTHE);
        chr.resetSkillCoolTime(BAPTISM_OF_LIGHT_AND_DARKNESS);
        chr.resetSkillCoolTime(GATE_OF_LIGHT);
    }

    private void changeLarknessState(int skillID) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        LarknessManager lm = tsm.getLarknessManager();
        if (lm == null) {
            lm = new LarknessManager(chr);
            tsm.setLarknessManager(lm);
        }

        // Heal 1% Max HP when using Light skills in Sunfire or Equilibrium
        if (SkillConstants.isLarknessLightSkill(skillID) && (!lm.isDark() || isInEquilibrium())) {
            chr.heal(Math.max(1, chr.getMaxHP() / 100));
        }

        // Do not alter gauge while already in Equilibrium
        if (isInEquilibrium()) {
            return;
        }

        SkillInfo si = SkillData.getSkillInfoById(skillID);
        int slv = Math.max(1, chr.getSkillLevel(skillID));
        int gaugeInc = (si != null && si.getValue(gauge, slv) > 0) ? si.getValue(gauge, slv) : 250;
        if (chr.hasSkill(DARKNESS_MASTERY)) {
            gaugeInc += 380;
        }

        if (SkillConstants.isLarknessLightSkill(skillID)) {
            lm.addGauge(gaugeInc, false);
            if (lm.getGauge() >= 10000) {
                enterEquilibrium(false);
            }
        } else if (SkillConstants.isLarknessDarkSkill(skillID)) {
            lm.addGauge(gaugeInc, true);
            if (lm.getGauge() <= 0) {
                enterEquilibrium(true);
            }
        }
    }

    private void giveLunarTideBuff() {
    }

    public void changeMode() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        LarknessManager lm = tsm.getLarknessManager();
        if (lm == null) {
            return;
        }
        lm.setGauge(5000);
        lm.changeMode();
        Option o = new Option();
        o.nOption = 1;
        o.rOption = lm.isDark() ? ECLIPSE : SUNFIRE;
        tsm.sendStat(Larkness, o);
    }

    public int getMoreEquilibriumTime() {
        int eqTime = 10;
        SkillInfo eqi = SkillData.getSkillInfoById(DARKNESS_MASTERY);
        if (chr.hasSkill(DARKNESS_MASTERY) && eqi != null) {
            int dmSlv = chr.getSkillLevel(DARKNESS_MASTERY);
            eqTime += eqi.getValue(time, dmSlv);
            eqTime += 5;
        }
        return eqTime;
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        Option o1 = new Option();
        MobTemporaryStat mts = mob.getTemporaryStat();
        switch (skillID) {
            case ARMAGEDDON:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(time, slv);
                    mts.addStatOptions(mob, MobStat.Stun, o1);
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
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        Option o4 = new Option();

        if (chr.getJob() != 2004) { // Beginner Luminous
            changeLarknessState(skillID);
        }

        // Sync 6th Job HEXA Eternal Light (27140005 -> 27141006) & Endless Darkness (27140002 -> 27141003) active sub-skills
        if (chr.hasSkill(HEXA_ETERNAL_LIGHT) && !chr.hasSkill(HEXA_ETERNAL_LIGHT_ACTIVE)) {
            int elLv = chr.getSkillLevel(HEXA_ETERNAL_LIGHT);
            chr.addSkill(HEXA_ETERNAL_LIGHT_ACTIVE, elLv, 30);
        }
        if (chr.hasSkill(HEXA_ENDLESS_DARKNESS) && !chr.hasSkill(HEXA_ENDLESS_DARKNESS_ACTIVE)) {
            int edLv = chr.getSkillLevel(HEXA_ENDLESS_DARKNESS);
            chr.addSkill(HEXA_ENDLESS_DARKNESS_ACTIVE, edLv, 30);
        }

        int crescendoProp = getCrescendoProp();
        if (hasHitMobs) {
            // Eclipse/Sunfire Mode
            LarknessManager lm = tsm.getLarknessManager();
            if (!tsm.hasStat(Larkness)) {
                o1.nOption = 1;
                o1.rOption = lm.isDark() ? ECLIPSE : SUNFIRE;
                newStats.put(Larkness, o1);
            }
            // Dark Crescendo (v265 passive stacking buff on attack: 27120005)
            if (chr.hasSkill(DARK_CRESCENDO) && Util.succeedProp(crescendoProp)) {
                SkillInfo crescendoInfo = SkillData.getSkillInfoById(DARK_CRESCENDO);
                Skill skill = chr.getSkill(DARK_CRESCENDO);
                if (crescendoInfo != null && skill != null) {
                    int cSlv = skill.getCurrentLevel();
                    int amount = 1;
                    if (tsm.hasStat(StackBuff) && tsm.getOption(StackBuff).rOption == DARK_CRESCENDO) {
                        amount = tsm.getOption(StackBuff).mOption;
                        if (amount < getMaxDarkCrescendoStack()) {
                            amount++;
                        }
                    }
                    int durationSec = Math.max(30, crescendoInfo.getValue(time, cSlv));
                    this.darkCrescendoTimer = System.currentTimeMillis() + (durationSec * 1000L);
                    o2.nOption = (amount * crescendoInfo.getValue(damR, cSlv));
                    o2.rOption = DARK_CRESCENDO;
                    o2.tOption = durationSec;
                    o2.mOption = amount;
                    newStats.put(StackBuff, o2);
                }
            }
            // Self Recovery (27110007 in v265, formerly Lunar Tide)
            if (chr.hasSkill(LUNAR_TIDE)) {
                SkillInfo lti = SkillData.getSkillInfoById(LUNAR_TIDE);
                Skill skill = chr.getSkill(LUNAR_TIDE);
                if (lti != null && skill != null && lti.getSkillStatInfo().containsKey(prop) && !lti.getSkillStatInfo().containsKey(t)) {
                    int lSlv = skill.getCurrentLevel();
                    int maxMP = c.getChr().getStat(Stat.mmp);
                    int curMP = c.getChr().getStat(Stat.mp);
                    int maxHP = c.getChr().getStat(Stat.mhp);
                    int curHP = c.getChr().getStat(Stat.hp);
                    double ratioHP = ((double) curHP / maxHP);
                    double ratioMP = ((double) curMP) / maxMP;
                    if (ratioHP > ratioMP) {
                        o3.nOption = 2;
                        o3.rOption = LUNAR_TIDE;
                        newStats.put(LifeTidal, o3);
                        o4.nOption = lti.getValue(prop, lSlv);
                        o4.rOption = LUNAR_TIDE;
                        newStats.put(CriticalBuff, o4);
                    } else {
                        o3.nOption = 1;
                        o3.rOption = LUNAR_TIDE;
                        newStats.put(LifeTidal, o3);
                        o4.nOption = lti.getValue(x, lSlv);
                        o4.rOption = LUNAR_TIDE;
                        newStats.put(DamR, o4);
                    }
                }
            }
            if (!newStats.isEmpty()) {
                tsm.sendStat(newStats);
                newStats.clear();
            }
        }
        switch (skillID) {
            case HARMONIC_PARADOX:
            case HARMONIC_PARADOX_KEY:
            case LUSTROUS_ORB:
            case HARMONIC_PARADOX_FINISHER:
                int originRoot = (skillID == LUSTROUS_ORB || skillID == HARMONIC_PARADOX_FINISHER) ? LUSTROUS_ORB : HARMONIC_PARADOX;
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (mob != null && mob.getHp() > 0) {
                        MobTemporaryStat mts = mob.getTemporaryStat();
                        Option opt1 = new Option();
                        opt1.nOption = 1;
                        opt1.rOption = originRoot;
                        opt1.tOption = 10; // 10s Absolute Freeze / Bind
                        opt1.cOption = chr.getId();
                        Option opt2 = new Option();
                        opt2.nOption = 1;
                        opt2.rOption = originRoot;
                        opt2.tOption = 20;
                        EnumMap<MobStat, Option> originStats = new EnumMap<>(MobStat.class);
                        originStats.put(MobStat.Freeze, opt1);
                        originStats.put(MobStat.OriginDebuff, opt2);
                        mts.addStatOptions(mob, originStats);
                    }
                }
                break;
            case RAY_OF_REDEMPTION:
                chr.heal(chr.getMaxHP()); // 800% Recovery
                if (chr.getParty() != null) {
                    for (Char pChr : chr.getParty().getPartyMembersInSameFieldWithChr(chr)) {
                        pChr.heal(pChr.getMaxHP());
                    }
                }
                break;
            case PRESSURE_VOID:
                if (!tsm.hasStatBySkillId(skillID)) {
                    o1.nOption = si.getValue(x, slv);
                    o1.rOption = skillID;
                    tsm.sendStat(KeyDownAreaMoving, o1);
                }
                break;
            case ENDER:
            case HEXA_ENDER:
            case DEATH_SCYTHE:
                if (chr.hasSkill(BAPTISM_OF_LIGHT_AND_DARKNESS)) {
                    incrementSwordsOfConsciousness();
                    if (chr.hasSkillOnCooldown(BAPTISM_OF_LIGHT_AND_DARKNESS)) {
                        chr.reduceSkillCoolTime(BAPTISM_OF_LIGHT_AND_DARKNESS, 3000);
                    }
                }
                break;
        }
    }

    private void incrementSwordsOfConsciousness() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int curStack = tsm.hasStat(SwordBaptism) ? tsm.getOption(SwordBaptism).nOption : 0;
        changeSwordsOfConsciousness(curStack + 1);
    }

    private void changeSwordsOfConsciousness(int swords) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int skillID = BAPTISM_OF_LIGHT_AND_DARKNESS;
        Option o = new Option();
        if (swords <= 12) {
            o.nOption = swords;
            o.rOption = skillID;
            tsm.sendStat(SwordBaptism, o);
        } else {
            tsm.removeStatsBySkill(skillID);
            chr.resetSkillCoolTime(skillID);
        }
    }

    private int getCrescendoProp() {
        Skill skill = null;
        if (chr.hasSkill(DARK_CRESCENDO)) {
            skill = chr.getSkill(DARK_CRESCENDO);
        }
        return skill == null ? 0 : SkillData.getSkillInfoById(DARK_CRESCENDO).getValue(prop, skill.getCurrentLevel());
    }

    private int getMaxDarkCrescendoStack() {
        Skill skill = null;
        if (chr.hasSkill(DARK_CRESCENDO)) {
            skill = chr.getSkill(DARK_CRESCENDO);
        }
        return skill == null ? 0 : SkillData.getSkillInfoById(skill.getSkillId()).getValue(x, skill.getCurrentLevel());
    }

    // Skill related methods -------------------------------------------------------------------------------------------
    @Override
    public void handleSkill(Client c, InPacket inPacket, SkillUseInfo skillUseInfo) {
        super.handleSkill(c, inPacket, skillUseInfo);
        Char chr = c.getChr();
        SkillInfo si = skillUseInfo.skillInfo;
        int slv = skillUseInfo.slv;
        int skillID = skillUseInfo.skillID;
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        LarknessManager lm = tsm.getLarknessManager();
        Option o1 = new Option();
        switch (skillID) {
            case CHANGE_LIGHT_DARK:
            case EQUILIBRIUM_LIBERATION:
                if (lm.getGauge() >= 10000) {
                    enterEquilibrium(false);
                } else if (lm.getGauge() <= 0) {
                    enterEquilibrium(true);
                } else {
                    changeMode();
                }
                chr.dispose();
                break;
            case LIGHT_SPEED_BOOST:
                if (tsm.hasStatBySkillId(LIGHT_SPEED_BOOST)) {
                    tsm.removeStatsBySkill(LIGHT_SPEED_BOOST);
                } else {
                    o1.nOption = si != null ? si.getValue(x, slv) : 120;
                    o1.rOption = LIGHT_SPEED_BOOST;
                    tsm.sendStat(TeleportMasteryRange, o1);
                }
                chr.dispose();
                break;
            case MAGIC_BOOSTER:
                if (si != null && si.getValue(time, slv) > 0) {
                    o1.nOption = si.getValue(x, slv);
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(time, slv);
                    tsm.sendStat(Booster, o1);
                }
                break;
            case MAPLE_WARRIOR_LUMI:
                if (si != null && si.getValue(time, slv) > 0) {
                    o1.nReason = skillID;
                    o1.nValue = si.getValue(x, slv);
                    o1.tTerm = si.getValue(time, slv);
                    tsm.sendStat(IndieStatR, o1);
                }
                break;
            case SHADOW_SHELL:
                o1.nOption = si != null && si.getValue(u, slv) > 0 ? si.getValue(u, slv) : 7;
                o1.rOption = skillID;
                o1.tOption = 0; // Permanent until blocks are consumed
                tsm.sendStat(AntiMagicShell, o1);
                break;
            case DUSK_GUARD:
            case 27111005:
                if (si != null && si.getValue(time, slv) > 0) {
                    o1.nValue = si.getValue(indiePdd, slv);
                    o1.nReason = skillID;
                    o1.tTerm = si.getValue(time, slv);
                    tsm.sendStat(IndiePDD, o1);
                }
                break;
            case PHOTIC_MEDITATION:
                o1.nOption = si.getValue(emad, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(EMAD, o1);
                break;
            case DARK_CRESCENDO:
            case 27121005:
                if (si != null && si.getValue(time, slv) > 0) {
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(time, slv);
                    o1.mOption = 1;
                    tsm.sendStat(StackBuff, o1);
                    this.darkCrescendoTimer = System.currentTimeMillis() + (si.getValue(time, slv) * 1000L);
                }
                break;
            case ARCANE_PITCH:
                o1.nOption = si.getValue(y, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(ElementalReset, o1);
                break;
            case EQUALIZE:
                enterEquilibrium(lm.isDark());
                break;
            case HEROIC_MEMORIES_LUMI:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieDamR, o1);
                break;
            case GATE_OF_LIGHT:
                Summon summon = Summon.getSummonByAndSetStat(c.getChr(), skillID, slv);
                summon.setFlyMob(false);
                summon.setMoveAbility(MoveAbility.Stop);
                summon.setAssistType(AssistType.Attack);
                summon.setAttackActive(true);
                chr.getField().spawnSummon(summon);
                if (!isInEquilibrium()) {
                    if (lm.isDark()) {
                        o1.nOption = 1;
                        o1.rOption = SUNFIRE;
                        tsm.sendStat(Larkness, o1);
                    } else {
                        o1.nOption = 1;
                        o1.rOption = ECLIPSE;
                        tsm.sendStat(Larkness, o1);
                    }
                    lm.changeMode();
                    lm.setFeathers(0);
                }
                break;
            case AETHER_CONDUIT_L:
            case AETHER_CONDUIT_D:
            case AETHER_CONDUIT_EQ:
                slv = chr.getSkillLevel(AETHER_CONDUIT_L);
                AffectedArea aa = AffectedArea.getPassiveAA(chr, skillID, slv);
                aa.setRect(aa.getPosition().getRectAround(si.getFirstRect()));
                chr.getField().spawnAffectedAreaAndRemoveOld(aa);
                chr.setSkillCooldown(AETHER_CONDUIT_L, slv);
                break;
            case BAPTISM_OF_LIGHT_AND_DARKNESS:
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Stop);
                summon.setAssistType(AssistType.SequenceAttack);
                chr.getField().spawnSummon(summon);
                break;
            case LIBERATION_ORB:
                int orbTime = si != null && si.getValue(time, slv) > 0 ? si.getValue(time, slv) : 45;
                o1.nOption = 1;
                o1.rOption = LIBERATION_ORB;
                o1.tOption = orbTime;
                tsm.sendStat(EquinoxActive, o1);
                chr.dispose();
                break;
            case HEROS_WILL_LUMI:
                tsm.removeAllDebuffs();
                break;
            case HARMONIC_PARADOX:
            case HARMONIC_PARADOX_KEY:
            case LUSTROUS_ORB:
            case HARMONIC_PARADOX_FINISHER:
                // Origin cutscene invincibility (7s) + enter Equilibrium
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 7;
                o1.nReason = skillID;
                o1.nValue = 1;
                o1.tTerm = 7;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                chr.getField().broadcast(UserLocal.showHexaSkillEff(chr));
                enterEquilibrium(false);
                chr.dispose();
                break;

        }
    }

    public int alterCooldownSkill(int skillID) {
        switch (skillID) {
            case ENDER:
            case HEXA_ENDER:
            case DEATH_SCYTHE:
                if (equilibriumTimer != null && !equilibriumTimer.isDone()) {
                    return 0;
                }
        }
        return -1;
    }

    // Hit related methods ---------------------------------------------------------------------------------------------
    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (chr.hasSkill(STANDARD_MAGIC_GUARD)) {
            if (chr.getMP() > 0) {
                Skill skill = chr.getSkill(STANDARD_MAGIC_GUARD);
                SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
                int dmgPerc = si.getValue(x, skill.getCurrentLevel());
                int dmg = hitInfo.hpDamage;
                int mpDmg = (int) (dmg * (dmgPerc / 100D));
                if (chr.getMP() > 0) {
                    mpDmg = chr.getMP() - mpDmg < 0 ? chr.getMP() : mpDmg;
                    hitInfo.hpDamage = dmg - mpDmg;
                    hitInfo.mpDamage = mpDmg;
                }
            }
        }
        if (tsm.hasStat(Larkness) && tsm.getOption(Larkness).rOption == EQUILIBRIUM_DARK) {
            return;
        }
        super.handleHit(c, inPacket, hitInfo);
    }

    @Override
    public void handleMobDebuffSkill(Char chr) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (tsm.hasStat(AntiMagicShell)) {
            tsm.removeAllDebuffs();
            deductShadowShell();
        }
        super.handleMobDebuffSkill(chr);
    }

    private void deductShadowShell() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (!chr.hasSkill(SHADOW_SHELL)) {
            return;
        }
        Skill skill = chr.getSkill(SHADOW_SHELL);
        Option o = new Option();
        if (tsm.hasStat(AntiMagicShell)) {
            int shadowShellCount = tsm.getOption(AntiMagicShell).nOption;

            if (shadowShellCount > 0) {
                shadowShellCount--;
            }

            if (shadowShellCount <= 0) {
                tsm.removeStatsBySkill(skill.getSkillId());
            } else {
                o.nOption = shadowShellCount;
                o.rOption = skill.getSkillId();
                o.tOption = 0;
                tsm.sendStat(AntiMagicShell, o);
            }
            chr.write(UserPacket.effect(Effect.skillSpecial(skill.getSkillId())));
            chr.getField().broadcast(UserRemote.effect(chr.getId(), Effect.skillSpecial(skill.getSkillId())), chr);
        }
    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.START_MAP);
        cs.setLevel(10);
        cs.setJob(JobConstants.JobEnum.LUMINOUS1.getJobId());
        cs.setStr(4);
        cs.setDex(4);
        cs.setInt(45);
        cs.setLuk(4);
        cs.setHp(1000);
        cs.setMaxHp(1000);
        cs.setMp(1000);
        cs.setMaxMp(1000);
        cs.getExtendSP().addSpToJobLevel(1, 5);
        chr.getAvatarData().getAvatarLook().setJob(JobConstants.JobEnum.LUMINOUS1.getJobId());
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        Equip weapon = ItemData.getEquipDeepCopyFromID(1212000, false); // Starter Shining Rod
        if (weapon != null) {
            chr.addItemToInventoryToNewCharacter(EQUIPPED, weapon, true);
            weapon.setInventoryID(chr.getInventoryByType(EQUIPPED).getId());
            weapon.setCharID(chr.getId());
            weapon.setInvType(EQUIPPED);
            weapon.setBagIndex(BodyPart.Weapon.getVal());
            weapon.saveToSQL();
        }
        Item secondary = ItemData.getItemDeepCopy(1352400); // Orb
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
        ensureFirstJobVisibleSkills(chr);
        if (chr.getLevel() < 30) {
            ScriptManagerImpl sm = chr.getScriptManager();
            for (int qid = 25000; qid <= 25015; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            sm.levelUntil(30); // Job.handleLevelUp(30) automatically advances to 2710, grants SP, and maxes skills
            if (chr.getJob() != JobConstants.JobEnum.LUMINOUS2.getJobId()) {
                sm.setJob(JobConstants.JobEnum.LUMINOUS2.getJobId());
            }
            sm.giveAndEquip(1212001); // Lv 30 Shining Rod
            sm.giveAndEquip(1352401); // Lv 30 Orb
            sm.warp(FieldConstants.HOME_MAP);
        }
        super.handleInitAfterMigrate(chr);
    }

    @Override
    public void handleCancelTimer(Char chr) {
        if (equilibriumTimer != null) {
            equilibriumTimer.cancel(true);
        }
        super.handleCancelTimer(chr);
    }

    @Override
    public int handleSetCoolDownSkill(int skillId) {
        switch (skillId) {
            case HARMONIC_PARADOX, HARMONIC_PARADOX_KEY -> {
                chr.setSkillCooldown(HARMONIC_PARADOX, chr.getSkillLevel(HARMONIC_PARADOX));
                return 1;
            }
            case LUSTROUS_ORB, HARMONIC_PARADOX_FINISHER -> {
                chr.setSkillCooldown(LUSTROUS_ORB, chr.getSkillLevel(LUSTROUS_ORB));
                return 1;
            }
            case HEXA_ENDER -> {
                chr.setSkillCooldown(ENDER, chr.getSkillLevel(HEXA_ENDER));
                return 1;
            }
            case HEXA_REFLECTION -> {
                chr.setSkillCooldown(27121100, chr.getSkillLevel(HEXA_REFLECTION));
                return 1;
            }
            case HEXA_APOCALYPSE -> {
                chr.setSkillCooldown(27121202, chr.getSkillLevel(HEXA_APOCALYPSE));
                return 1;
            }
            case TWILIGHT_NOVA, TWILIGHT_NOVA_DARK, TWILIGHT_NOVA_EQ -> {
                chr.setSkillCooldown(TWILIGHT_NOVA, chr.getSkillLevel(TWILIGHT_NOVA));
                return 1;
            }
            case HEXA_TWILIGHT_NOVA, HEXA_TWILIGHT_NOVA_DARK, HEXA_TWILIGHT_NOVA_EQ -> {
                chr.setSkillCooldown(HEXA_TWILIGHT_NOVA, chr.getSkillLevel(HEXA_TWILIGHT_NOVA));
                return 1;
            }
            case HEXA_ENDLESS_DARKNESS_ACTIVE -> {
                chr.setSkillCooldown(HEXA_ENDLESS_DARKNESS, chr.getSkillLevel(HEXA_ENDLESS_DARKNESS));
                return 1;
            }
            case HEXA_ETERNAL_LIGHT_ACTIVE -> {
                chr.setSkillCooldown(HEXA_ETERNAL_LIGHT, chr.getSkillLevel(HEXA_ETERNAL_LIGHT));
                return 1;
            }
        }
        return super.handleSetCoolDownSkill(skillId);
    }
}
