package net.swordie.ms.client.jobs.Jianghu;

import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.Effect;
import net.swordie.ms.connection.packet.UserPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.handlers.GlobalTimerManager;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Field;

import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.loaders.ItemData;
import static net.swordie.ms.enums.InvType.EQUIPPED;

import java.util.EnumMap;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;

public class MoXuan extends Job {

    public static final int XUANSHAN_SPIRIT = 170000001;
    public static final int RETURN_TO_XUANSHAN = 170001000;
    public static final int WILL_OF_THE_ALLIANCE = 170000190;

    public static final int AWAKEN = 175000006; // Restores #x% of Max HP/MP every #w sec, even in combat

    public static final int XUANSHAN_ARTS_TIAN = 175001000;
    public static final int XUANSHAN_STRIKE_TIAN = 175001002;
    public static final int XUANSHAN_CROSS_TIAN = 175121001;
    public static final int DIVINE_ART_ERUPTING_FLAME = 175001003;

    public static final int XUANSHAN_ARTS_DI = 175101003;
    public static final int XUANSHAN_STRIKE_DI = 175101001;
    public static final int XUANSHAN_CROSS_DI = 175121002;
    public static final int DIVINE_ART_TEARING_WIND = 175101004;
    public static final int DIVINE_ART_BURNING_IRON = 175101005;
    public static final int SECRET_ART_ARROW_FLIGHT = 175101007; // Secret Art: Arrow Flight

    public static final int THE_HOLY_MOUNTAIN = 175110010;
    public static final int DIVINE_ART_RIGHTEOUS_THUNDER = 175111001;
    public static final int DIVINE_ART_SWIRLING_TIDE = 175111002; // MukHyun_SEON_PUNG_GAG(10) // Buff
    public static final int DIVINE_ART_SWIRLING_TIDE_2 = 175111003;
    public static final int SECRET_ART_QI_PROJECTION = 175111004; // IndiePeriodicalSkillActivation(132160, 132159, 132158, 132157)
    public static final int SECRET_ART_QI_PROJECTION_ATOM = 175111011;

    public static final int HEIR_OF_THE_DIVINE = 175120016; // MukHyunDivine(2)
    public static final int DIVINE_FIST_PERSIST = 175120039;
    public static final int DIVINE_ART_HOWLING_STROM_ATTACK = 175121003; // IndieDamReduceR(50) + IndieAntiMagicShell(1) + IndieCheckTimeByClient(1)
    public static final int SECRET_ART_QI_DISRUPTION = 175121005; // IndieNotDamaged(1)
    public static final int SECRET_ART_QI_SHIELD = 175121009; // MukHyun_HO_SIN_GANG_GI(100)

    public static final int SOUL_ART_BLACK_WIND = 175121040;
    public static final int SECRET_ART_STRENGTH_WITHIN = 175121041;
    public static final int AURA_OF_DESTINY = 175121042;

    // V Skills
    public static final int SOUL_ART_BENEATH_HEAVEN = 400051084;
    public static final int SOUL_ART_THE_CONQUERED_SELF = 400051086;
    public static final int SOUL_ART_THE_CONQUERED_SELF_ATOM = 400051087;
    public static final int SOUL_ART_THE_OPENED_GATE = 400051088;
    public static final int DIVINE_ART_CRASHING_EARTH = 400051089;

    // HEXA Boosts
    public static final int HEXA_SOUL_ART_THE_OPENED_GATE = 500061070;

    // HEXA Mastery / Origin (Skill.wz/Skill_00002/17514.xml, HexaCore job 17512)
    public static final int HEXA_XUANSHAN_ARTS_TIAN = 175141000;
    public static final int HEXA_XUANSHAN_ARTS_TIAN_2 = 175141001;
    public static final int HEXA_XUANSHAN_ARTS_TIAN_3 = 175141002;
    public static final int HEXA_XUANSHAN_ARTS_DI = 175141003;
    public static final int HEXA_XUANSHAN_ARTS_DI_2 = 175141004;
    public static final int HEXA_XUANSHAN_ARTS_DI_3 = 175141005;
    public static final int HEXA_DIVINE_ART_HOWLING_STORM = 175141006;
    public static final int HEXA_DIVINE_ART_HOWLING_STORM_2 = 175141007;
    public static final int HEXA_XUANSHAN_ARTS_TIAN_4 = 175141008;
    public static final int HEXA_XUANSHAN_ARTS_DI_4 = 175141009;
    public static final int HEXA_DIVINE_ART_ERUPTING_FLAME = 175141010;
    public static final int HEXA_DIVINE_ART_RIGHTEOUS_THUNDER = 175141011;
    public static final int HEXA_DIVINE_ART_SWIRLING_TIDE = 175141012;
    public static final int HEXA_DIVINE_ART_SWIRLING_TIDE_2 = 175141013;
    public static final int HEXA_SOUL_ART_BLACK_WIND = 175141014;
    public static final int HEXA_DIVINE_ART_TEARING_WIND = 175141015;
    public static final int HEXA_SECRET_ART_QI_PROJECTION = 175141016;
    public static final int SOUL_ART_JIANGHU_DRAGON = 175141500; // Origin

    private static final int HEIR_OF_THE_DIVINE_MAX_STACK = 5; // Skill.wz 175120016 common/y

    // EFFECT 106:
    // 175120016 - Heir of the Divine => 01 01 00 => khi dùng 175001003 - Divine Art: Erupting Flame
    // 175120016 - Heir of the Divine => 01 01 00 => khi dùng 175111001 - Divine Art: Righteous Thunder
    // 175120016 - Heir of the Divine => 02 01 00 => khi dùng 175101004 - Divine Art: Tearing Wind
    // 175120016 - Heir of the Divine => 02 01 00 => khi dùng 175111002 - Divine Art: Swirling Tide
    // 175120016 - Heir of the Divine => 01 02 00 => khi dùng 175121003 - Divine Art: Howling Storm chưa đủ nộ
    // 175120016 - Heir of the Divine => 01 02 01 => khi dùng 175121003 - Divine Art: Howling Storm đủ nộ
    // 175121009 - Secret Art: Qi Shield => int 100 (64 00 00 00) => khi dùng 175121009 - Secret Art: Qi Shield
    // 175110010 - Khi Di 2 cái

    private final int[] addedSkills = new int[]{
            XUANSHAN_SPIRIT, RETURN_TO_XUANSHAN, WILL_OF_THE_ALLIANCE, DIVINE_ART_ERUPTING_FLAME, AWAKEN,
            THE_HOLY_MOUNTAIN, HEIR_OF_THE_DIVINE,
    };

    public AtomicInteger godPower = new AtomicInteger(0);
    public AtomicInteger powerType = new AtomicInteger(0);
    public ScheduledFuture<?> powerTimer;
    public long awaken = 0L;

    public MoXuan(Char chr) {
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

    public int getGodPower() {
        return godPower.get();
    }

    public void setGodPower(int godPower) {
        this.godPower.set(godPower);
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isMoXuan(id);
    }


    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        Option o = new Option();
        MobTemporaryStat mts = mob.getTemporaryStat();
        switch (skillID) {

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
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        Option o1 = new Option();
        Option o2 = new Option();
        handleSpecialEffect(skillID);
        switch (skillID) {
            case DIVINE_ART_SWIRLING_TIDE:
            case HEXA_DIVINE_ART_SWIRLING_TIDE:
                o1.nOption = 10;
                o1.rOption = skillID;
                o1.tOption = 5;
                tsm.sendStat(MukHyun_SEON_PUNG_GAG, o1);
                break;
            case DIVINE_ART_SWIRLING_TIDE_2:
            case HEXA_DIVINE_ART_SWIRLING_TIDE_2:
                o1.nOption = 2010; // 10010
                o1.rOption = skillID;
                o1.tOption = 5;
                tsm.sendStat(MukHyun_SEON_PUNG_GAG, o1);
                break;
            case SECRET_ART_QI_DISRUPTION:
            case SOUL_ART_BLACK_WIND:
            case HEXA_SOUL_ART_BLACK_WIND:
            case SOUL_ART_BENEATH_HEAVEN:
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = si.getValue(ndTime, slv);
                o1.isInMillis = true;
                tsm.sendStat(IndieNotDamaged, o1);
                break;
            case DIVINE_ART_HOWLING_STROM_ATTACK:
            case HEXA_DIVINE_ART_HOWLING_STORM:
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 4;
                newStats.put(IndieDamReduceR, o1);
                o2.nValue = 1;
                o2.nReason = skillID;
                o2.tTerm = 4;
                newStats.put(IndieAntiMagicShell, o2);
                tsm.sendStat(newStats);
                break;
        }
    }

    private void handleSpecialEffect(int skillID) {
        boolean stack = false;
        switch (skillID) {
            case XUANSHAN_ARTS_TIAN:
            case XUANSHAN_STRIKE_TIAN:
            case XUANSHAN_CROSS_TIAN:
            case HEXA_XUANSHAN_ARTS_TIAN:
            case HEXA_XUANSHAN_ARTS_TIAN_2:
            case HEXA_XUANSHAN_ARTS_TIAN_3:
            case HEXA_XUANSHAN_ARTS_TIAN_4:
                if (this.godPower.get() == 110) {
                    this.godPower.set(120);
                } else {
                    this.godPower.set(110);
                }
                chr.write(WvsContext.sendMoXuanStack(this.powerType.get(), this.godPower.get()));
                break;
            case XUANSHAN_ARTS_DI:
            case XUANSHAN_STRIKE_DI:
            case XUANSHAN_CROSS_DI:
            case HEXA_XUANSHAN_ARTS_DI:
            case HEXA_XUANSHAN_ARTS_DI_2:
            case HEXA_XUANSHAN_ARTS_DI_3:
            case HEXA_XUANSHAN_ARTS_DI_4:
                if (this.godPower.get() == 210) {
                    this.godPower.set(220);
                } else {
                    this.godPower.set(210);
                }
                chr.write(WvsContext.sendMoXuanStack(this.powerType.get(), this.godPower.get()));
                break;
            case DIVINE_ART_RIGHTEOUS_THUNDER:
            case DIVINE_ART_ERUPTING_FLAME:
            case HEXA_DIVINE_ART_RIGHTEOUS_THUNDER:
            case HEXA_DIVINE_ART_ERUPTING_FLAME:
                chr.write(UserPacket.effect(Effect.sendMoXuanEff(1, 1, 0, 0)));
                this.powerType.set(2);
                this.godPower.set(1);
                chr.write(WvsContext.sendMoXuanStack(this.powerType.get(), this.godPower.get()));
                stack = true;
                break;
            case DIVINE_ART_TEARING_WIND:
            case HEXA_DIVINE_ART_TEARING_WIND:
                chr.write(UserPacket.effect(Effect.sendMoXuanEff(2, 1, 0, 0)));
                this.powerType.set(2);
                this.godPower.set(2);
                chr.write(WvsContext.sendMoXuanStack(this.powerType.get(), this.godPower.get()));
                stack = true;
                break;
            case DIVINE_ART_SWIRLING_TIDE:
            case HEXA_DIVINE_ART_SWIRLING_TIDE:
                chr.write(UserPacket.effect(Effect.sendMoXuanEff(2, 1, 1, 0)));
                this.powerType.set(2);
                this.godPower.set(0);
                chr.write(WvsContext.sendMoXuanStack(this.powerType.get(), this.godPower.get()));
                stack = true;
                break;
            case DIVINE_ART_SWIRLING_TIDE_2:
            case HEXA_DIVINE_ART_SWIRLING_TIDE_2:
                this.powerType.set(1000);
                this.godPower.set(0);
                chr.write(WvsContext.sendMoXuanStack(this.powerType.get(), this.godPower.get()));
                stack = true;
                break;
            case DIVINE_ART_HOWLING_STROM_ATTACK:
            case HEXA_DIVINE_ART_HOWLING_STORM:
                chr.write(UserPacket.effect(Effect.sendMoXuanEff(1, 2, Util.getRandom(0, 1), 0)));
                this.powerType.set(2);
                this.godPower.set(1);
                chr.write(WvsContext.sendMoXuanStack(this.powerType.get(), this.godPower.get()));
                stack = true;
                break;
            case SECRET_ART_QI_SHIELD:
                chr.write(UserPacket.effect(Effect.sendMoXuanEff(0, 0, 0, 100)));
                break;
        }
        if (stack && chr.hasSkill(MoXuan.HEIR_OF_THE_DIVINE)) {
            TemporaryStatManager tsm = chr.getTemporaryStatManager();
            Option o1 = new Option();
            // Heir of the Divine stacks up to 5 (was Math.max which forced 5 stacks after the first hit)
            o1.nOption = tsm.hasStat(MukHyunDivine)
                    ? (int) Math.min(tsm.getTotalNOptionOfStat(MukHyunDivine) + 1, HEIR_OF_THE_DIVINE_MAX_STACK) : 1;
            o1.rOption = MoXuan.HEIR_OF_THE_DIVINE;
            o1.tOption = 60;
            tsm.sendStat(MukHyunDivine, o1);
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
        handleSpecialEffect(skillID);
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        switch (skillID) {
            case RETURN_TO_XUANSHAN:
                Field toField = chr.getOrCreateFieldByCurrentInstanceType(si.getValue(x, slv));
                chr.warp(toField);
                break;
            case SECRET_ART_ARROW_FLIGHT:
                if (!tsm.hasStat(CannonShooter_BFCannonBall)) {
                    o1.nOption = si.getValue(y, slv);
                    o1.rOption = skillID;
                    tsm.sendStat(CannonShooter_BFCannonBall, o1);
                } else {
                    o1.nOption = (int) Math.max(tsm.getTotalNOptionOfStat(CannonShooter_BFCannonBall) - 1, 0);
                    o1.rOption = skillID;
                    tsm.sendStat(CannonShooter_BFCannonBall, o1);
                }
                break;
            case SECRET_ART_QI_SHIELD:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(MukHyun_HO_SIN_GANG_GI, o1);
                break;
            case SECRET_ART_QI_PROJECTION:
            case HEXA_SECRET_ART_QI_PROJECTION:
                if (tsm.hasStatBySkillId(skillID)) {
                    tsm.removeStatsBySkill(skillID);
                } else {
                    tsm.removeStatsBySkill(SOUL_ART_THE_CONQUERED_SELF);
                    // normal and HEXA Qi Projection are the same toggle - never keep both active
                    tsm.removeStatsBySkill(skillID == SECRET_ART_QI_PROJECTION ? HEXA_SECRET_ART_QI_PROJECTION : SECRET_ART_QI_PROJECTION);
                    o1.nValue = 132160; // min 132140
                    o1.nReason = skillID;
                    tsm.sendStat(IndiePeriodicalSkillActivation, o1);
                }
                break;
            case SOUL_ART_THE_CONQUERED_SELF:
                if (tsm.hasStatBySkillId(skillID)) {
                    tsm.removeStatsBySkill(skillID);
                } else {
                    tsm.removeStatsBySkill(SECRET_ART_QI_PROJECTION);
                    tsm.removeStatsBySkill(HEXA_SECRET_ART_QI_PROJECTION);
                    o1.nValue = 132160; // min 132140
                    o1.nReason = skillID;
                    tsm.sendStat(IndiePeriodicalSkillActivation, o1);
                }
                break;
            case SECRET_ART_STRENGTH_WITHIN:
                this.powerType.set(2);
                this.godPower.set(1);
                chr.write(WvsContext.sendMoXuanStack(this.powerType.get(), this.godPower.get()));
                break;
            case AURA_OF_DESTINY:
                o1.nValue = si.getValue(indieDamR, slv);
                o1.nReason = skillID;
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieDamR, o1);
                break;
        }
    }

    public void increaseArrowFlight() {
        if (!chr.hasSkill(SECRET_ART_ARROW_FLIGHT)) {
            return;
        }
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        SkillInfo si = SkillData.getSkillInfoById(SECRET_ART_ARROW_FLIGHT);
        int max = si.getValue(y, chr.getSkillLevel(SECRET_ART_ARROW_FLIGHT));
        int count = 1;
        if (tsm.hasStat(CannonShooter_BFCannonBall)) {
            count = tsm.getOption(CannonShooter_BFCannonBall).nOption;
            if (count < max) {
                count++;
            }
        }
        updateVSkillStackBuff(chr, count);
    }

    private void awaken(long now) {
        if (!chr.hasSkill(AWAKEN)) {
            return;
        }
        SkillInfo si = SkillData.getSkillInfoById(AWAKEN);
        if (si == null) {
            return;
        }
        int slv = chr.getSkillLevel(AWAKEN);
        // Awaken: "Restores #x% of Max HP/MP every #w sec, even in combat" (Skill.wz 175000006)
        long interval = Math.max(1, si.getValue(w, slv)) * 1000L;
        if (this.awaken != 0 && now - this.awaken < interval) {
            return;
        }
        this.awaken = now;
        int healR = si.getValue(x, slv);
        if (healR <= 0) {
            return;
        }
        if (chr.getHP() > 0 && chr.getHP() < chr.getMaxHP()) {
            chr.heal((int) (chr.getMaxHP() * healR / 100L));
        }
        if (chr.getHP() > 0 && chr.getMP() < chr.getMaxMP()) {
            chr.healMP((int) (chr.getMaxMP() * healR / 100L));
        }
    }

    @Override
    public void update(long now) {
        super.update(now);
        awaken(now);
    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.HOME_MAP);
        cs.setJob(JobConstants.JobEnum.MOXUAN_1.getJobId());
        cs.setLevel(10);
        cs.setStr(45);
        cs.setDex(4);
        cs.setInt(4);
        cs.setLuk(4);
        cs.setHp(1000);
        cs.setMaxHp(1000);
        cs.setMp(500);
        cs.setMaxMp(500);
        cs.getExtendSP().addSpToJobLevel(1, 5);
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        // Secondary Weapon: Martial Fist (1352860)
        Item secondary = ItemData.getItemDeepCopy(1352860);
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

        // Primary Weapon: Basic Martial Fist (1403000)
        if (chr.getEquippedItemByBodyPart(BodyPart.Weapon) == null) {
            Item weapon = ItemData.getItemDeepCopy(1403000);
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
        var sm = chr.getScriptManager();
        short curJob = chr.getJob();
        if (level >= 100 && curJob < JobConstants.JobEnum.MOXUAN_4.getJobId()) {
            sm.setJob(JobConstants.JobEnum.MOXUAN_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_4.getJobId(), 5);
            sm.giveAndEquip(1352863);
            chr.maxSkills();
        } else if (level >= 60 && curJob < JobConstants.JobEnum.MOXUAN_3.getJobId()) {
            sm.setJob(JobConstants.JobEnum.MOXUAN_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_3.getJobId(), 3);
            sm.giveAndEquip(1352862);
        } else if (level >= 30 && curJob < JobConstants.JobEnum.MOXUAN_2.getJobId()) {
            sm.setJob(JobConstants.JobEnum.MOXUAN_2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_2.getJobId(), 3);
            sm.giveAndEquip(1352861);
        }
    }



    @Override
    public void handleCancelTimer(Char chr) {
        if (powerTimer != null) {
            powerTimer.cancel(true);
        }
        super.handleCancelTimer(chr);
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (!tsm.hasStat(MukHyunDivine) && chr.hasSkill(MoXuan.HEIR_OF_THE_DIVINE)) {
            Option o1 = new Option();
            o1.nOption = 0;
            o1.rOption = MoXuan.HEIR_OF_THE_DIVINE;
            tsm.sendStat(MukHyunDivine, o1);
        }
        if (this.powerTimer == null || this.powerTimer.isCancelled()) {
            ScheduledFuture<?> sf = chr.getTimer().addFixedRateEvent(() -> {
                this.powerType.set(0);
                this.godPower.set(0);
                chr.write(WvsContext.sendExtraSystemStack(0, -1639974713, (byte) 246));
                chr.write(WvsContext.sendExtraSystemStack(1, -1639974713, (byte) 247));
                chr.write(WvsContext.sendExtraSystemStack(2, -1639974713, (byte) 248));
                chr.write(WvsContext.sendExtraSystemInit());
            }, 3000, 5000, false);
            this.powerTimer = sf;
            GlobalTimerManager.addCharTimer(chr.getId(), sf);
        }
        short curJob = chr.getJob();
        if (chr.getLevel() >= 100 && curJob < JobConstants.JobEnum.MOXUAN_4.getJobId()) {
            ScriptManagerImpl sm = chr.getScriptManager();
            sm.setJob(JobConstants.JobEnum.MOXUAN_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_4.getJobId(), 5);
            sm.giveAndEquip(1352863);
            chr.maxSkills();
            chr.chatMessage(net.swordie.ms.enums.ChatType.Notice, "[MoXuan] Job Auto-Repair: Advanced to 4th Job (17512) and maxed all skills!");
        } else if (chr.getLevel() >= 60 && curJob < JobConstants.JobEnum.MOXUAN_3.getJobId()) {
            ScriptManagerImpl sm = chr.getScriptManager();
            sm.setJob(JobConstants.JobEnum.MOXUAN_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.MOXUAN_3.getJobId(), 3);
            sm.giveAndEquip(1352862);
        }

        // 175121003 (Divine Art: Howling Storm) is a real 4th job skill; 175121000 does not exist in Skill.wz,
        // which made maxSkills() run on every login.
        if (chr.getJob() == JobConstants.JobEnum.MOXUAN_4.getJobId() && !chr.hasSkill(DIVINE_ART_HOWLING_STROM_ATTACK)) {
            chr.maxSkills();
        }

        super.handleInitAfterMigrate(chr);
    }
}
