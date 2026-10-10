package net.swordie.ms.client.jobs.resistance;

import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.quest.Quest;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatBase;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.Effect;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.UserPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.constants.QuestConstants;
import net.swordie.ms.enums.MessageType;
import net.swordie.ms.enums.QuestStatus;
import net.swordie.ms.enums.TSIndex;
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

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;

/**
 * Created on 12/14/2017.
 */
public class WildHunter extends Citizen {

    //Jaguar Summon
    public static final int SUMMON_JAGUAR_GREY = 33001007;           //No Special Jaguar Stats
    public static final int SUMMON_JAGUAR_YELLOW = 33001008;         //No Special Jaguar Stats
    public static final int SUMMON_JAGUAR_RED = 33001009;            //No Special Jaguar Stats
    public static final int SUMMON_JAGUAR_PURPLE = 33001010;         //No Special Jaguar Stats
    public static final int SUMMON_JAGUAR_BLUE = 33001011;           //No Special Jaguar Stats
    public static final int SUMMON_JAGUAR_JAIRA = 33001012;          //Critical Rate +5%
    public static final int SUMMON_JAGUAR_SNOW_WHITE = 33001013;     //Buff Duration +10%
    public static final int SUMMON_JAGUAR_ONYX = 33001014;           //Buff Duration +10%
    public static final int SUMMON_JAGUAR_CRIMSON = 33001015;        //Dmg Absorption +10%
    public static final int[] SUMMONS = new int[]{SUMMON_JAGUAR_GREY, SUMMON_JAGUAR_YELLOW, SUMMON_JAGUAR_RED,
            SUMMON_JAGUAR_PURPLE, SUMMON_JAGUAR_BLUE, SUMMON_JAGUAR_JAIRA, SUMMON_JAGUAR_SNOW_WHITE, SUMMON_JAGUAR_ONYX,
            SUMMON_JAGUAR_CRIMSON};

    //Jaguar Mount
    public static final int MOUNT_JAGUAR_GREY = 1932015;
    public static final int MOUNT_JAGUAR_YELLOW = 1932030;
    public static final int MOUNT_JAGUAR_RED = 1932031;
    public static final int MOUNT_JAGUAR_PURPLE = 1932032;
    public static final int MOUNT_JAGUAR_BLUE = 1932033;
    public static final int MOUNT_JAGUAR_JAIRA = 1932036;
    public static final int MOUNT_JAGUAR_SNOW_WHITE = 1932100;
    public static final int MOUNT_JAGUAR_ONYX = 1932149;
    public static final int MOUNT_JAGUAR_CRIMSON = 1932215;
    public static final int[] MOUNTS = new int[]{MOUNT_JAGUAR_GREY, MOUNT_JAGUAR_YELLOW, MOUNT_JAGUAR_RED,
            MOUNT_JAGUAR_PURPLE, MOUNT_JAGUAR_BLUE, MOUNT_JAGUAR_JAIRA, MOUNT_JAGUAR_SNOW_WHITE, MOUNT_JAGUAR_ONYX,
            MOUNT_JAGUAR_CRIMSON};

    public static final int SECRET_ASSEMBLY = 30001281;
    public static final int CAPTURE = 30001061;
    public static final int CALL_OF_THE_HUNTER = 30001062;

    public static final int RIDE_JAGUAR = 33001001; //Special Buff
    public static final int SWIPE = 33001016; //Special Attack (Bite Debuff)
    public static final int WILD_LURE = 33001025;
    public static final int ANOTHER_BITE = 33000036;

    public static final int SOUL_ARROW_CROSSBOW = 3200014; //Passive
    public static final int CROSSBOW_BOOSTER = 33101012; //Buff
    public static final int CALL_OF_THE_WILD = 33101005; //Buff
    public static final int DASH_N_SLASH_JAGUAR_SUMMONED = 33101115; //Special Attack (Stun Debuff) + (Bite Debuff)
    public static final int DASH_N_SLASH_JAGUAR_ON = 33101215; //Special Attack (Stun Debuff) + (Bite Debuff)

    public static final int FELINE_BERSERK = 33111007; //Buff
    public static final int BACKSTEP = 33111011; //Special Buff (ON/OFF)
    public static final int HUNTING_ASSISTANT_UNIT = 33111013; //Area of Effect
    public static final int SONIC_ROAR = 33111015; //Special Attack (Bite Debuff)
    public static final int FLURRY = 33110008; //Dodge
    public static final int JAGUAR_LINK = 33110014; // Passive

    public static final int JAGUAR_SOUL = 33121017; //Special Attack (Stun Debuff) + (Bite Debuff) + (Magic Crash Debuff)
    public static final int DRILL_SALVO = 33121016; //Summon
    public static final int SHARP_EYES = 33121004; //Buff
    public static final int MAPLE_WARRIOR_WH = 33121007; //Buff
    public static final int HEROS_WILL_WH = 33121008;

    //Final Attack
    public static final int FINAL_ATTACK_WH = 33100009;
    public static final int ADVANCED_FINAL_ATTACK_WH = 33120011;

    public static final int FOR_LIBERTY_WH = 33121053;
    public static final int SILENT_RAMPAGE = 33121054;
    public static final int JAGUAR_RAMPAGE = 33121255;

    // V Skills
    public static final int JAGUAR_STORM = 400031005;
    public static final int PRIMAL_FURY = 400031012;
    public static final int PRIMAL_FURY_2 = 400031013; // screen
    public static final int PRIMAL_FURY_MOUNT_REQUEST = 400031014;
    public static final int PRIMAL_GRENADE = 400031032;
    public static final int WILD_ARROW_BLAST_TYPE_X = 400031046;

    // HEXA Skills
    public static final int HEXA_FINAL_ATTACK_WH = 21140012;

    private final int[] addedSkills = new int[]{
            SECRET_ASSEMBLY,};

    private final int[] jaguarSummons = new int[]{
            SUMMON_JAGUAR_GREY,
            SUMMON_JAGUAR_YELLOW,
            SUMMON_JAGUAR_RED,
            SUMMON_JAGUAR_PURPLE,
            SUMMON_JAGUAR_BLUE,
            SUMMON_JAGUAR_JAIRA,
            SUMMON_JAGUAR_SNOW_WHITE,
            SUMMON_JAGUAR_ONYX,
            SUMMON_JAGUAR_CRIMSON,};

    private int lastUsedSkill = 0;
    private long lastPrimalGrenadeCount = 0L;

    public WildHunter(Char chr) {
        super(chr);
        if (chr.getId() != 0 && isHandlerOfJob(chr.getJob())) {
            if (chr.getWildHunterInfo() == null) {
                chr.setWildHunterInfo(new WildHunterInfo());
            }
            for (int id : addedSkills) {
                Skill skill = chr.getSkill(id);
                if (!chr.hasSkill(id) || skill.getCurrentLevel() != skill.getMaxLevel()) {
                    skill = SkillData.getSkillDeepCopyById(id);
                    if (skill != null) {
                        skill.setCurrentLevel(skill.getMaxLevel());
                        chr.addSkill(skill);
                    }
                }
            }
        }
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isWildHunter(id);
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        if (skillID >= SUMMON_JAGUAR_GREY && skillID <= SUMMON_JAGUAR_CRIMSON) {
            skillID = lastUsedSkill;
            lastUsedSkill = 0;
        }
        Option o1 = new Option();
        Option o2 = new Option();
        MobTemporaryStat mts = mob.getTemporaryStat();
        EnumMap<MobStat, Option> map = new EnumMap<>(MobStat.class);

        int jaguarBleedingTime = SkillData.getSkillInfoById(SUMMON_JAGUAR_GREY).getValue(time, 1);
        switch (skillID) {
            case DASH_N_SLASH_JAGUAR_ON: //(33101115)  //Stun + Bite Debuff
                if (Util.succeedProp(si.getValue(prop, slv))) {
                    if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                        if (!mob.isBoss()) {
                            o2.nOption = 1;
                            o2.rOption = skillID;
                            o2.tOption = si.getValue(time, slv);
                            map.put(MobStat.Stun, o2);
                        }
                    }
                    int amount = 0;
                    if (mts.hasCurrentMobStat(MobStat.JaguarBleeding)) {
                        amount = mts.getCurrentOptionsByMobStat(MobStat.JaguarBleeding).nOption;
                    }
                    amount = Math.min(amount + 1, 3);
                    o1.nOption = amount;
                    o1.rOption = skillID;
                    o1.tOption = jaguarBleedingTime;
                    map.put(MobStat.JaguarBleeding, o1);
                    mts.addStatOptions(mob, map);
                } else {
                    if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                        if (!mob.isBoss()) {
                            o1.nOption = 1;
                            o1.rOption = skillID;
                            o1.tOption = si.getValue(time, slv);
                            mts.addStatOptions(mob, MobStat.Stun, o1);
                        }
                    }
                }
                break;
            case DASH_N_SLASH_JAGUAR_SUMMONED: //(33101215)   //Stun Debuff
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    if (Util.succeedProp(si.getValue(prop, slv)) && !mob.isBoss()) {
                        o1.nOption = 1;
                        o1.rOption = skillID;
                        o1.tOption = si.getValue(time, slv);
                        mts.addStatOptions(mob, MobStat.Stun, o1);
                    }
                }
                break;
            case SWIPE: //Bite Debuff
                if (Util.succeedProp(si.getValue(prop, slv))) {
                    int amount = 0;
                    if (mts.hasCurrentMobStat(MobStat.JaguarBleeding)) {
                        amount = mts.getCurrentOptionsByMobStat(MobStat.JaguarBleeding).nOption;
                    }
                    amount = Math.min(amount + 1, 3);
                    o1.nOption = amount;
                    o1.rOption = ANOTHER_BITE;
                    o1.tOption = jaguarBleedingTime;
                    mts.addStatOptions(mob, MobStat.JaguarBleeding, o1);
                }
                break;
            case JAGUAR_SOUL: //(Stun Debuff) + (Bite Debuff) + (Magic Crash Debuff)
                if (Util.succeedProp(si.getValue(prop, slv))) {
                    int amount = 0;
                    if (mts.hasCurrentMobStat(MobStat.JaguarBleeding)) {
                        amount = mts.getCurrentOptionsByMobStat(MobStat.JaguarBleeding).nOption;
                    }
                    amount = Math.min(amount + 1, 3);
                    o1.nOption = amount;
                    o1.rOption = ANOTHER_BITE;
                    o1.tOption = jaguarBleedingTime;
                    o2.nOption = 1;
                    o2.rOption = skillID;
                    o2.tOption = si.getValue(time, slv);
                    map.put(MobStat.JaguarBleeding, o1);
                    map.put(MobStat.Stun, o2);
                    mts.addStatOptions(mob, map);
                }
                break;
            case PRIMAL_FURY_2:
            case PRIMAL_FURY:
                o1.nOption = 3; // max stacks instantly
                o1.rOption = ANOTHER_BITE;
                o1.tOption = jaguarBleedingTime;
                mts.addStatOptions(mob, MobStat.JaguarBleeding, o1);
                break;
        }
        super.handleDebuffOnMob(c, mob, si, skillID, slv, damage);
    }

    @Override
    public void handleAttack(Client c, AttackInfo attackInfo, SkillInfo si, long now) {
        Char chr = c.getChr();
        super.handleAttack(c, attackInfo, si, now);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (JobConstants.isWildHunter(chr.getJob())) {
            if (now - lastPrimalGrenadeCount >= 4500L && tsm.hasStat(WildGrenade)) {
                increasePrimalGrenadeCount();
                lastPrimalGrenadeCount = now;
            }
        }

        if (attackInfo.skillId >= SUMMON_JAGUAR_GREY && attackInfo.skillId <= SUMMON_JAGUAR_CRIMSON) {
            attackInfo.skillId = lastUsedSkill;
            lastUsedSkill = 0;
        }
        switch (attackInfo.skillId) {
            case PRIMAL_GRENADE:
                updatePrimalGrenadeCount(tsm.hasStat(WildGrenade) ? tsm.getOption(WildGrenade).nOption - 1 : 0);
                break;
        }
    }

    private void increasePrimalGrenadeCount() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int count = 1;
        if (tsm.hasStat(WildGrenade)) {
            count = tsm.getOption(WildGrenade).nOption;
            if (count < 8) {
                count++;
            }
        }
        updatePrimalGrenadeCount(count);
    }

    private void updatePrimalGrenadeCount(int count) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        o.nOption = count;
        o.rOption = PRIMAL_GRENADE;
        tsm.sendStat(WildGrenade, o);
    }

    @Override
    public int getFinalAttackSkill(int faSkill) {
        if (faSkill == FINAL_ATTACK_WH) {
            if (chr.hasSkill(HEXA_FINAL_ATTACK_WH)) return HEXA_FINAL_ATTACK_WH;
            if (chr.hasSkill(ADVANCED_FINAL_ATTACK_WH)) return ADVANCED_FINAL_ATTACK_WH;
        }
        return super.getFinalAttackSkill(faSkill);
    }

    @Override
    public int getFinalAttackProc(int faSkill) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (tsm.getOptByCTSAndSkill(IndieDamR, SILENT_RAMPAGE) != null) {
            return 100;
        }
        return super.getFinalAttackProc(faSkill);
    }

    private void initJaguarLink() {
        if (chr.hasSkill(JAGUAR_LINK)) {
            TemporaryStatManager tsm = chr.getTemporaryStatManager();
            if (chr.getTemporaryStatManager().hasStatBySkillId(JAGUAR_LINK)) {
                tsm.removeStatsBySkill(RIDE_JAGUAR);
            }
            int amount = 0;
            for (int i = 0; i < 9; i++) {
                if (chr.getQRValueByKey(QuestConstants.WILD_HUNTER_JAGUAR_STORAGE_ID, "" + i) != null) {
                    amount += 1;
                }
            }
            if (amount == 0) {
                return;
            }
            EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
            amount = Math.min(amount, 6);
            Option o1 = new Option();
            Option o2 = new Option();
            Option o3 = new Option();
            SkillInfo si = SkillData.getSkillInfoById(JAGUAR_LINK);
            int slv = chr.getSkillLevel(JAGUAR_LINK);
            o1.nReason = JAGUAR_LINK;
            o1.nValue = amount * si.getValue(x, slv);
            newStats.put(IndieCrR, o1);
            o2.nReason = JAGUAR_LINK;
            o2.nValue = amount * si.getValue(z, slv);
            newStats.put(IndieCD, o2);
            o3.nReason = JAGUAR_LINK;
            o3.nValue = amount * si.getValue(padX, slv);
            newStats.put(IndiePAD, o3);
            tsm.sendStat(newStats);
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
        AffectedArea aa;
        Rect rect;
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        switch (skillID) {
            case WILD_LURE: {
                lastUsedSkill = skillID;
                c.write(UserLocal.jaguarSkill(skillID));
                List<Mob> provokedMobs = chr.getField().getMobsInRect(chr.getPosition().getRectAround(si.getRects().get(0)));
                o1.nOption = 1;
                o1.rOption = skillID;
                for (Mob mob : provokedMobs) {
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    o1.tOption = mob.isBoss() ? 5 : 10;
                    mts.addStatOptions(mob, MobStat.JaguarProvoke, o1.deepCopy());
                }
                break;
            }
            case SWIPE:
            case DASH_N_SLASH_JAGUAR_SUMMONED:
            case SONIC_ROAR:
            case JAGUAR_SOUL:
            case JAGUAR_RAMPAGE:
                lastUsedSkill = skillID;
                c.write(UserLocal.jaguarSkill(skillID));
                break;
            case SECRET_ASSEMBLY:
                Field toField = chr.getOrCreateFieldByCurrentInstanceType(si.getValue(x, slv));
                chr.warp(toField);
                break;
            case HUNTING_ASSISTANT_UNIT:
                aa = AffectedArea.getPassiveAA(chr, skillID, slv);
                aa.setMobOrigin((byte) 0);
                aa.setPosition(chr.getPosition());
                rect = aa.getPosition().getRectAround(si.getRects().get(0));
                if (!chr.isLeft()) {
                    rect = rect.horizontalFlipAround(chr.getPosition().getX());
                }
                aa.setRect(rect);
                aa.setFlip(!chr.isLeft());
                aa.setDelay((short) 4);
                chr.getField().spawnAffectedAreaAndRemoveOld(aa);
                break;
            case HEROS_WILL_WH:
                tsm.removeAllDebuffs();
                break;
            case CAPTURE:
                int mobID = inPacket.decodeInt();
                Life life = chr.getField().getLifeByObjectID(mobID);
                if (life instanceof Mob mob) {
                    if (mob.getMaxHp() * 0.90 <= mob.getHp()) {
                        chr.write(UserPacket.effect(Effect.showCaptureEffect(skillID, slv, 0, 1)));
                        return;
                    }
                    Quest quest = chr.getQuestById(QuestConstants.WILD_HUNTER_JAGUAR_STORAGE_ID);
                    if (quest == null) {
                        quest = new Quest(chr.getId(), QuestConstants.WILD_HUNTER_JAGUAR_STORAGE_ID, QuestStatus.Started);
                        chr.addQuest(quest);
                    }
                    String key = QuestConstants.getWhStorageQuestValByTemplateID(mob.getTemplateId());
                    if (key != null) {
                        quest.setProperty(key, "1");
                        chr.write(WvsContext.message(MessageType.QUEST_RECORD_EX_MESSAGE, quest.getQRKey(), quest.getQRValue(), (byte) 0));
                        chr.write(UserPacket.effect(Effect.showCaptureEffect(skillID, slv, 0, 0)));
                        WildHunterInfo whi = chr.getWildHunterInfo();
                        mob.remove(true);
                    } else {
                        chr.write(UserPacket.effect(Effect.showCaptureEffect(skillID, slv, 0, 2)));
                    }
                }
                break;
            case PRIMAL_FURY_MOUNT_REQUEST:
                skillUseInfo.skillID = RIDE_JAGUAR;
                skillUseInfo.slv = chr.getSkillLevel(RIDE_JAGUAR);
                handleSkill(c, inPacket, skillUseInfo);
                break;
            case SUMMON_JAGUAR_GREY:
            case SUMMON_JAGUAR_YELLOW:
            case SUMMON_JAGUAR_RED:
            case SUMMON_JAGUAR_PURPLE:
            case SUMMON_JAGUAR_BLUE:
            case SUMMON_JAGUAR_JAIRA:
            case SUMMON_JAGUAR_SNOW_WHITE:
            case SUMMON_JAGUAR_ONYX:
            case SUMMON_JAGUAR_CRIMSON:
                if (chr.getWildHunterInfo() == null
                        || chr.getWildHunterInfo().getIdx() < 0
                        || chr.getWildHunterInfo().getIdx() >= MOUNTS.length) {
                    chr.chatMessage("Bạn chưa chọn báo đốm. Vui lòng mở tab Kỹ năng và chọn lại!");
                    return;
                }
                if (tsm.hasStatBySkillId(RIDE_JAGUAR)) {
                    tsm.removeStatsBySkill(RIDE_JAGUAR);
                }
                Summon.summonJaguar(chr, SUMMONS[chr.getWildHunterInfo().getIdx()]);
                chr.write(UserLocal.jaguarActive(true)); // Makes Jaguar use normal attacks
                break;
            case RIDE_JAGUAR:
                if (chr.getWildHunterInfo() == null
                        || chr.getWildHunterInfo().getIdx() < 0
                        || chr.getWildHunterInfo().getIdx() >= MOUNTS.length) {
                    chr.chatMessage("Bạn chưa chọn báo đốm. Vui lòng mở tab Kỹ năng và chọn lại!");
                    return;
                }
                for (int jaguarSummonSkill : jaguarSummons) {
                    tsm.removeStatsBySkill(jaguarSummonSkill);
                }
                TemporaryStatBase tsb = tsm.getTSBByTSIndex(TSIndex.RideVehicle);
                if (tsm.hasStat(RideVehicle)) {
                    tsm.removeStat(RideVehicle);
                } else {
                    tsb.setNOption(MOUNTS[chr.getWildHunterInfo().getIdx()]);
                    tsb.setROption(skillID);
                    tsm.sendStat(RideVehicle, tsb.getOption());
                }
                break;
            case CALL_OF_THE_WILD:
                o1.nReason = skillID;
                o1.nValue = si.getValue(z, slv);
                o1.tTerm = si.getValue(time, slv);
                newStats.put(IndiePADR, o1);
                newStats.put(IndieMADR, o1.deepCopy());
                o2.nOption = si.getValue(x, slv);
                o2.rOption = skillID;
                o2.tOption = si.getValue(time, slv);
                newStats.put(DamageReduce, o2);
                newStats.put(Guard, o2.deepCopy());
                newStats.put(EVAR, o2.deepCopy());
                o3.nReason = skillID;
                o3.nValue = si.getValue(x, slv);
                o3.tTerm = si.getValue(time, slv);
                newStats.put(IndieMMPR, o3);
                tsm.sendStat(newStats);
                break;
            case FELINE_BERSERK:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieBooster, slv);
                o1.tTerm = si.getValue(time, slv);
                newStats.put(IndieBooster, o1);
                o2.nOption = si.getValue(z, slv);
                o2.rOption = skillID;
                o2.tOption = si.getValue(time, slv);
                newStats.put(DamR, o2);
                o3.nOption = si.getValue(x, slv);
                o3.rOption = skillID;
                o3.tOption = si.getValue(time, slv);
                newStats.put(Speed, o3);
                tsm.sendStat(newStats);
                break;
            case BACKSTEP:
                o1.nOption = 1;
                o1.rOption = skillID;
                tsm.sendStat(DrawBack, o1);
                break;
            case SHARP_EYES: // x = crit rate%  |  y = max crit dmg%
                int cr = si.getValue(x, slv);
                int crDmg = si.getValue(y, slv);
                o1.nOption = (cr << 8) + crDmg;
                o1.nValue = si.getValue(y, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(SharpEyes, o1);
                break;
            case FOR_LIBERTY_WH:
            case SILENT_RAMPAGE:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieDamR, o1);
                break;
            case DRILL_SALVO:
                aa = AffectedArea.getPassiveAA(chr, skillID, slv);
                aa.setMobOrigin((byte) 0);
                aa.setPosition(chr.getPosition());
                rect = aa.getPosition().getRectAround(si.getRects().get(0));
                if (!chr.isLeft()) {
                    rect = rect.horizontalFlipAround(chr.getPosition().getX());
                }
                aa.setRect(rect);
                aa.setFlip(!chr.isLeft());
                aa.setDelay((short) 8);
                chr.getField().spawnAffectedAreaAndRemoveOld(aa);
                break;
            case PRIMAL_FURY:
                aa = AffectedArea.getPassiveAA(chr, skillID, slv);
                aa.setDuration(si.getValue(v, slv) * 1000);
                aa.setRect(aa.getPosition().getRectAround(si.getFirstRect()));
                chr.getField().spawnAffectedAreaAndRemoveOld(aa);

                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(v, slv);
                tsm.sendStat(NotDamaged, o1);
                break;
            case JAGUAR_STORM:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(SlowAttack, o1);

                Position pos = Util.getRandomFromCollection(chr.getField().getFootholdsInRect(chr.getRectAround(si.getFirstRect()))).getRandomPosition();
                Random rand = new Random();
                int x = chr.getPosition().getX();
                int count = 0;
                List<Integer> summon = new ArrayList<>();
                while (count < 6) {
                    int random = (int) (rand.nextDouble() * 9);
                    pos.setX(chr.isLeft() ? (x + random * 200) : (x - random * 200));
                    if (random != chr.getWildHunterInfo().getIdx() && !summon.contains(SUMMONS[random])) {
                        Summon.summonJaguarStorm(chr, WildHunter.SUMMONS[random], pos, si.getValue(time, slv));
                        summon.add(SUMMONS[random]);
                        count++;
                    }
                }
                break;
        }
    }

    // Hit related methods ---------------------------------------------------------------------------------------------
    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {
        if (hitInfo.hpDamage == 0 && hitInfo.mpDamage == 0) {
            // Dodged
            if (chr.hasSkill(FLURRY)) {
                Skill skill = chr.getSkill(FLURRY);
                int slv = skill.getCurrentLevel();
                SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
                TemporaryStatManager tsm = chr.getTemporaryStatManager();
                Option o = new Option();
                o.nOption = 100;
                o.rOption = skill.getSkillId();
                o.tOption = si.getValue(time, slv);
                tsm.sendStat(CriticalBuff, o);
            }
        }
        super.handleHit(c, inPacket, hitInfo);
    }

}
