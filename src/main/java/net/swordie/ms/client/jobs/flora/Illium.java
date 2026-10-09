package net.swordie.ms.client.jobs.flora;

import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.skills.ForceAtom;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.ShootObjectSkillInfo;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.*;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.Summoned;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.AssistType;
import net.swordie.ms.enums.ForceAtomEnum;
import net.swordie.ms.enums.MoveAbility;
import net.swordie.ms.life.AffectedArea;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Rect;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Field;

import java.util.*;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;
import static net.swordie.ms.enums.InvType.EQUIPPED;

/**
 * @author Sjonnie
 * Created on 6/25/2018.
 */
public class Illium extends Job {

    public static final int SHELTER_RETURN = 150001021; // requires Complete QuestId  34900
    public static final int MAGIC_CONVERSION = 150000079;

    public static final int EX = 152001003;
    public static final int RADIANT_ORB = 152001002;
    public static final int RADIANT_JAVELIN = 152001001;
    public static final int CRYSTALLINE_WINGS = 152001004;
    public static final int CRYSTALLINE_WINGS_FLY = 152001005;
    public static final int LUCENT_BRAND = 152000007;
    public static final int UMBRAL_BRAND_HIDDEN = 152000010;

    public static final int REACTION_DESTRUCTION = 152100001;
    public static final int REACTION_DOMINATION = 152100002;
    public static final int DEPLOY_CRYSTAL = 152101000;
    public static final int REPOSITION_CRYSTAL = 152101003;
    public static final int CRYSTAL_BATTERY = 152100010;
    public static final int VORTEX_OF_LIGHT = 152101006;
    public static final int UMBRAL_BRAND = 152100012;
    public static final int GAUNTLET_FRENZY = 152101007;
    public static final int MACHINA = 152101008;

    public static final int CRYSTAL_BATTERY_II = 152110008;
    public static final int LUCENT_BRAND_II = 152110009;
    public static final int UMBRAL_BRAND_II = 152110010;
    public static final int RESONANCE = 152111007;
    public static final int REACTION_DESTRUCTION_II = 152110001;
    public static final int REACTION_DOMINATION_II = 152110002;
    public static final int RADIANT_JAVELIN_ENHANCED = 152110004;

    public static final int AEGIS_OF_LIGHT = 152100011;
    public static final int RADIANT_ORB_II = 152120003;
    public static final int CRYSTAL_BATTERY_III = 152120014;
    public static final int LUCENT_BRAND_III = 152120012;
    public static final int UMBRAL_BRAND_III = 152120013;
    public static final int CRYSTAL_SKILL_DEUS = 152121005;
    public static final int HERO_OF_THE_FLORA = 152121009;
    public static final int FLORAN_HERO_WILL = 152121010;
    public static final int FLASH_CRYSTAL_BATTERY = 152121011;
    public static final int RADIANT_JAVELIN_II = 152120001;
    public static final int LONGINUS_SPEAR = 152121004;
    public static final int WINGS_OF_GLORY = 152111003;
    public static final int DEUS_SUB = 152121006;
    public static final int VORTEX_WINGS = 152121007;
    public static final int RADIANT_ATOM = 152120002;

    public static final int LONGINUS_ZONE = 152121041;
    public static final int DIVINE_WRATH = 152121042;
    public static final int CRYSTALLINE_BULWARK = 152121043;

    // V skills
    public static final int CRYSTAL_IGNITION = 400021061;
    public static final int REFLECTION_SPECTRAL_BLAST = 400021062;
    public static final int TEMPLAR_KNIGHT = 400021063;
    public static final int CRYSTALLINE_SPIRIT = 400021068;
    public static final int CRYSTAL_GATE = 400021099;
    public static final int CRYSTAL_GATE_PORTAL = 400021100;
    public static final int CRYSTAL_GATE_PORTAL_ATTACK = 400021111;

    // 6th Job (HEXA Matrix)
    public static final int EXCIDIUM = 152141508; // Origin Skill Cast
    public static final int EXCIDIUM_ATTACK = 152141509; // Origin Skill Attack
    public static final int MYTOCRYSTAL_EXPANSE = 152141500;
    public static final int MYTOCRYSTAL_EXPANSE_ATTACK_1 = 152141501;
    public static final int MYTOCRYSTAL_EXPANSE_ATTACK_2 = 152141502;
    public static final int MYTOCRYSTAL_EXPANSE_ATTACK_3 = 152141503;
    public static final int MYTOCRYSTAL_EXPANSE_ATTACK_4 = 152141504;
    public static final int MYTOCRYSTAL_EXPANSE_ATTACK_5 = 152141505;
    public static final int MYTOCRYSTAL_EXPANSE_ATTACK_6 = 152141506;

    // HEXA Mastery Skills
    public static final int HEXA_RADIANT_JAVELIN = 152141000;
    public static final int HEXA_RADIANT_JAVELIN_2 = 152141001;
    public static final int HEXA_RADIANT_ENCHANTED_JAVELIN = 152141002;
    public static final int HEXA_WINGED_JAVELIN = 152141004;
    public static final int HEXA_WINGED_ENCHANTED_JAVELIN = 152141005;
    public static final int HEXA_WINGED_JAVELIN_2 = 152141006;
    public static final int HEXA_REACTION_DESTRUCTION = 152141007;
    public static final int HEXA_REACTION_DOMINATION = 152141008;
    public static final int HEXA_VORTEX_WINGS = 152141009;
    public static final int HEXA_EX = 152141010;
    public static final int HEXA_MACHINA = 152141011;
    public static final int HEXA_CRYSTAL_SKILL_DEUS = 152141012;
    public static final int HEXA_CRYSTAL_SKILL_DEUS_SUB = 152141013;
    public static final int HEXA_LONGINUS_SPEAR = 152141014;
    public static final int HEXA_LONGINUS_ZONE = 152141015;
    public static final int HEXA_UMBRAL_BRAND_III = 152140016;

    public static final int CRYSTAL_SKILL_ID_VORTEX_OF_LIGHT = 1;
    public static final int CRYSTAL_SKILL_ID_RESONANCE = 2;
    public static final int CRYSTAL_SKILL_ID_DEUS = 3;
    public static final int CRYSTAL_SKILL_ID_WINGS_OF_GLORY = 4;
    public static final int CRYSTAL_SKILL_ID_VORTEX_WINGS = 5;

    private static final int[] lucentSkills = new int[]{
            LUCENT_BRAND,
            LUCENT_BRAND_II,
            LUCENT_BRAND_III
    };

    private static final int[] umbralSkills = new int[]{
            UMBRAL_BRAND,
            UMBRAL_BRAND_II,
            UMBRAL_BRAND_III
    };

    public Map<Integer, Boolean> crystalSkillMap = new HashMap<Integer, Boolean>() {{
        put(CRYSTAL_SKILL_ID_VORTEX_OF_LIGHT, true);
        put(CRYSTAL_SKILL_ID_RESONANCE, true);
        put(CRYSTAL_SKILL_ID_DEUS, true);
        put(CRYSTAL_SKILL_ID_WINGS_OF_GLORY, true);
        put(CRYSTAL_SKILL_ID_VORTEX_WINGS, true);
    }};

    private static final int[] addedSkills = new int[]{
            SHELTER_RETURN,
            MAGIC_CONVERSION,
    };

    public Illium(Char chr) {
        super(chr);
        if (chr != null && chr.getId() != 0 && isHandlerOfJob(chr.getJob())) {
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
        return JobConstants.isIllium(id);
    }


    public Summon getCrystal() {
        return chr.getField().getSummons().stream().filter(s -> s.getSkillID() == DEPLOY_CRYSTAL && s.getOwnerId() == chr.getId()).findAny().orElse(null);
    }

    private int getCrystalCharge() {
        if (getCrystal() == null) {
            return 0;
        }
        return getCrystal().getCount();
    }

    private void setCrystalCharge(int charge) {
        if (getCrystal() != null) {
            getCrystal().setCount(charge);
        }
    }

    private int getShards() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        return tsm.hasStat(CharacterTemporaryStat.CannonShooter_BFCannonBall) ? tsm.getOption(CharacterTemporaryStat.CannonShooter_BFCannonBall).nOption : 0;
    }

    public void incrementCrystallineShard() {
        if (!chr.hasSkill(CRYSTALLINE_SPIRIT) || chr.hasSkillOnCooldown(CRYSTALLINE_SPIRIT)) {
            return;
        }
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Skill skill = chr.getSkill(CRYSTALLINE_SPIRIT);
        SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
        int slv = skill.getCurrentLevel();
        int maxStack = si.getValue(y, slv);
        int count = 1;
        if (tsm.hasStat(CharacterTemporaryStat.CannonShooter_BFCannonBall)) {
            count = getShards();
            if (count < maxStack) {
                count++;
            }
        }
        updateVSkillStackBuff(chr, count);
        chr.addSkillCooldown(CRYSTALLINE_SPIRIT, 20 * 1000);
    }

    public void resetCrystalBattery() {
        this.crystalSkillMap.put(CRYSTAL_SKILL_ID_VORTEX_OF_LIGHT, true);
        this.crystalSkillMap.put(CRYSTAL_SKILL_ID_RESONANCE, true);
        this.crystalSkillMap.put(CRYSTAL_SKILL_ID_DEUS, true);
        this.crystalSkillMap.put(CRYSTAL_SKILL_ID_WINGS_OF_GLORY, true);
        chr.getField().broadcast(Summoned.stateChanged(getCrystal(), 2, crystalSkillMap));
        chr.getField().broadcast(Summoned.upgradeStage(getCrystal(), 3)); // resets crystal attacks
    }

    public void doResonanceSkill() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        chr.getField().broadcast(Summoned.stateChanged(getCrystal(), 1, null));
        if (!chr.hasSkill(RESONANCE)) {
            return;
        }
        Skill skill = chr.getSkill(RESONANCE);
        SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
        int slv = skill.getCurrentLevel();
        o.nOption = 1;
        o.rOption = skill.getSkillId();
        o.tOption = si.getValue(x, slv);
        tsm.sendStat(HarmonyLink, o);
        this.crystalSkillMap.put(CRYSTAL_SKILL_ID_RESONANCE, false);
        chr.getField().broadcast(Summoned.stateChanged(getCrystal(), 2, crystalSkillMap));
        chr.getField().broadcast(Summoned.upgradeStage(getCrystal(), 3)); // resets crystal attacks
    }

    public void incrementCrystal(int skillId) {
        int increment = (getIncrementBySkillId(skillId) * (hasFlashCrystalBattery() ? 2 : 1));
        changeCrystalCharge(getCrystalCharge() + increment);
        chr.getField().broadcast(Summoned.upgradeStage(getCrystal(), 3)); // resets crystal attacks

        if (!chr.hasSkillOnCooldown(REACTION_DESTRUCTION_II) && (chr.getSkillLevel(REACTION_DESTRUCTION_II) >= 1) &&
                (skillId == RADIANT_JAVELIN_II || skillId == RADIANT_JAVELIN || skillId == LONGINUS_SPEAR ||
                 skillId == HEXA_RADIANT_JAVELIN || skillId == HEXA_RADIANT_JAVELIN_2 || skillId == HEXA_RADIANT_ENCHANTED_JAVELIN ||
                 skillId == HEXA_WINGED_JAVELIN || skillId == HEXA_WINGED_ENCHANTED_JAVELIN || skillId == HEXA_WINGED_JAVELIN_2 || skillId == HEXA_LONGINUS_SPEAR)) {
            doDestructionII();
        } else if (!chr.hasSkillOnCooldown(REACTION_DESTRUCTION) && (chr.getSkillLevel(REACTION_DESTRUCTION) >= 1) &&
                (skillId == RADIANT_JAVELIN || skillId == HEXA_RADIANT_JAVELIN || skillId == HEXA_RADIANT_JAVELIN_2)) {
            doDestruction();
        }
    }

    private void doDestruction() {
        SkillInfo si = SkillData.getSkillInfoById(REACTION_DESTRUCTION);
        int slv = chr.getSkillLevel(REACTION_DESTRUCTION);
        //   chr.write(Summoned.summonUseSpecifiedSkill(getCrystal(), REACTION_DESTRUCTION));
        chr.addSkillCooldown(REACTION_DESTRUCTION, si.getValue(cooltime, slv) * 1000);
    }

    private void doDestructionII() {
        SkillInfo si = SkillData.getSkillInfoById(REACTION_DESTRUCTION_II);
        int slv = chr.getSkillLevel(REACTION_DESTRUCTION_II);
        chr.write(Summoned.useSpecifiedSkill(getCrystal(), REACTION_DESTRUCTION_II));
        chr.addSkillCooldown(REACTION_DESTRUCTION_II, si.getValue(cooltime, slv) * 1000);
    }

    public void doCrystallineDestruction(int summonObjId, int summonAttackId) {
        Summon illi = (Summon) chr.getField().getLifeByObjectID(summonObjId);
        if (illi != null) {
            chr.write(Summoned.useSpecifiedSkill(illi, summonAttackId));
        }
    }

    public void changeCrystalCharge(int charge) {
        int curState = getCrystal().getState();

        charge = charge < 0 ? 0 : Math.min(charge, getMaxCrystalCharge());
        setCrystalCharge(charge);
        getCrystal().setState(getCrystalStateByCharge(charge));
        chr.getField().broadcast(Summoned.upgradeStage(getCrystal(), 2)); // change Crystal Summon State

        if (curState != getCrystal().getState()) {
            chr.getField().broadcast(Summoned.effect(getCrystal(), 3)); // new form effect
        } else {
            chr.getField().broadcast(Summoned.effect(getCrystal(), 2)); // increment effect
        }

        if (getCrystalCharge() >= getMaxCrystalCharge() && !chr.getTemporaryStatManager().hasStat(CharacterTemporaryStat.CrystalChargeBuffIcon)) {
            giveCrystalBatteryBuff();
        }
    }

    private int getMaxCrystalCharge() {
        int maxCrystalCharge = 0;
        if (chr.hasSkill(CRYSTAL_BATTERY)) {
            maxCrystalCharge = 30;
        }
        if (chr.hasSkill(CRYSTAL_BATTERY_II)) {
            maxCrystalCharge = 150;
        }
        return maxCrystalCharge;
    }


    private Skill getCrystalBatterySkill() {
        Skill skill = null;
        if (chr.hasSkill(CRYSTAL_BATTERY)) {
            skill = chr.getSkill(CRYSTAL_BATTERY);
        }
        if (chr.hasSkill(CRYSTAL_BATTERY_II)) {
            skill = chr.getSkill(CRYSTAL_BATTERY_II);
        }
        if (chr.hasSkill(CRYSTAL_BATTERY_III)) {
            skill = chr.getSkill(CRYSTAL_BATTERY_III);
        }
        return skill;
    }

    private boolean hasFlashCrystalBattery() {
        return chr.getTemporaryStatManager().hasStat(CharacterTemporaryStat.LefFastCharge);
    }

    private void giveCrystalBatteryBuff() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        o.nOption = 1;
        o.rOption = getCrystalBatterySkill().getSkillId();
        o.tOption = 10;
        tsm.sendStat(CrystalChargeBuffIcon, o);
    }

    private int getIncrementBySkillId(int skillId) {
        switch (skillId) {
            case RADIANT_JAVELIN:
            case RADIANT_JAVELIN_II:
            case HEXA_RADIANT_JAVELIN:
            case HEXA_RADIANT_JAVELIN_2:
            case HEXA_RADIANT_ENCHANTED_JAVELIN:
            case HEXA_WINGED_JAVELIN:
            case HEXA_WINGED_ENCHANTED_JAVELIN:
            case HEXA_WINGED_JAVELIN_2:
                return 1;
            case RADIANT_ORB:
            case RADIANT_ORB_II:
                return 2;
            case LONGINUS_SPEAR:
            case HEXA_LONGINUS_SPEAR:
                return 3;
        }
        return 0;
    }

    private int getCrystalStateByCharge(int count) {
        int state = 0;
        if (count >= 0) {
            state = 0;
        }
        if (count >= 30) {
            state = 1;
        }
        if (count >= 60) {
            state = 2;
        }
        if (count >= 100) {
            state = 3;
        }
        if (count >= 150) {
            state = 4;
        }
        return state;
    }

    public void applyUmbralBrand(int oid) {
        int skillId = UMBRAL_BRAND;
        Skill skill = chr.getSkill(skillId);
        if (skill == null) {
            return;
        }
        Option o1 = new Option();
        int maxstack = chr.hasSkill(UMBRAL_BRAND_III) ? 5 : chr.hasSkill(UMBRAL_BRAND_II) ? 3 : 1;
        int skillID = chr.hasSkill(UMBRAL_BRAND_III) ? UMBRAL_BRAND_III : chr.hasSkill(UMBRAL_BRAND_II) ? UMBRAL_BRAND_II : UMBRAL_BRAND;
        Mob mob = (Mob) chr.getField().getLifeByObjectID(oid);
        if (mob != null) {
            MobTemporaryStat mts = mob.getTemporaryStat();
            if (mts.hasCurrentMobStat(MobStat.LefDebuff)) {
                int currentMark = mts.getCurrentOptionsByMobStat(MobStat.LefDebuff).nOption;
                o1.nOption = Math.min(currentMark + 1, maxstack);
            } else {
                o1.nOption = 1;
            }
            o1.rOption = UMBRAL_BRAND_HIDDEN;
            o1.tOption = chr.hasSkill(UMBRAL_BRAND_III) ? 50 : chr.hasSkill(UMBRAL_BRAND_II) ? 30 : 10; //TODO fix this
            o1.xOption = 4;
            o1.zOption = skillID;
            mts.addStatOptions(mob, MobStat.LefDebuff, o1);
        }
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
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
        if (hasHitMobs && attackInfo.skillId != CONVERSION_OVERDRIVE_ATTACK) {
            bonusConversionOverdriveAttack();
        }
        switch (skillID) {
            case EXCIDIUM:
            case EXCIDIUM_ATTACK:
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (mob == null) continue;
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    Option opt1 = new Option();
                    opt1.nOption = 1;
                    opt1.rOption = skillID;
                    opt1.tOption = 10; // 10s Absolute Freeze / Bind
                    opt1.cOption = chr.getId();
                    mts.addStatOptions(mob, MobStat.Freeze, opt1);
                }
                if (chr.getParty() != null) {
                    for (Char other : chr.getParty().getPartyMembersInSameField(chr)) {
                        other.write(UserLocal.showHexaSkillEff(chr));
                    }
                }
                break;
            case MYTOCRYSTAL_EXPANSE:
            case MYTOCRYSTAL_EXPANSE_ATTACK_1:
            case MYTOCRYSTAL_EXPANSE_ATTACK_2:
            case MYTOCRYSTAL_EXPANSE_ATTACK_3:
            case MYTOCRYSTAL_EXPANSE_ATTACK_4:
            case MYTOCRYSTAL_EXPANSE_ATTACK_5:
            case MYTOCRYSTAL_EXPANSE_ATTACK_6:
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    applyUmbralBrand(mai.mobId);
                }
                break;
            case RADIANT_JAVELIN:
            case RADIANT_JAVELIN_II:
            case HEXA_RADIANT_JAVELIN:
            case HEXA_RADIANT_JAVELIN_2:
            case HEXA_RADIANT_ENCHANTED_JAVELIN:
            case HEXA_WINGED_JAVELIN:
            case HEXA_WINGED_ENCHANTED_JAVELIN:
            case HEXA_WINGED_JAVELIN_2:
            case LONGINUS_SPEAR:
            case HEXA_LONGINUS_SPEAR:
                if (getCrystal() != null) {
                    incrementCrystal(skillID);
                }
                break;
            case DEPLOY_CRYSTAL:
                int attackingSkillId = attackInfo.summonSpecialSkillId;
                switch (attackingSkillId) {
                    case REACTION_DOMINATION:
                    case REACTION_DOMINATION_II:
                    case HEXA_REACTION_DOMINATION:
                        slv = chr.getSkillLevel(attackingSkillId);
                        chr.setSkillCooldown(attackingSkillId, slv);
                        si = SkillData.getSkillInfoById(attackingSkillId);
                        chr.addSkillCooldown(attackingSkillId, si.getValue(cooltime, slv) * 1000);
                        for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                            applyUmbralBrand(mai.mobId);
                        }
                        break;
                    case VORTEX_OF_LIGHT:
                        crystalSkillMap.put(CRYSTAL_SKILL_ID_VORTEX_OF_LIGHT, false);
                        chr.getField().broadcast(Summoned.stateChanged(getCrystal(), 2, crystalSkillMap));
                        break;
                    case REFLECTION_SPECTRAL_BLAST:
                        chr.setSkillCooldown(attackingSkillId, chr.getSkillLevel(CRYSTAL_IGNITION));
                        break;
                }
                chr.getField().broadcast(Summoned.upgradeStage(getCrystal(), 3)); // resets crystal attacks
                break;
            case VORTEX_WINGS:
            case HEXA_VORTEX_WINGS:
                handleVortexWings();
                break;
        }
    }

    private void handleVortexWings() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        if (tsm.hasStat(CharacterTemporaryStat.LefGloryWing)) {
            int nOpt = tsm.getOption(CharacterTemporaryStat.LefGloryWing).nOption;
            int nSkill = tsm.getOption(CharacterTemporaryStat.LefGloryWing).rOption;
            o.nOption = nOpt;
            o.rOption = nSkill;
            o.cOption = 1;
            tsm.sendStat(LefGloryWing, o);
        }
    }

    public void handleRadiantAtom() {
        Rect rect = new Rect(-550, -550, 550, 550);
        int targetID = 0;
        for (int i = 0; i < 2; i++) {
            ForceAtomEnum fae = ForceAtomEnum.RADIANT_JAVELIN_AFTER;
            Mob targetMob;
            if (!chr.getField().getMobsInRect(chr.getRectAround(rect)).isEmpty()) {
                targetMob = Util.getRandomFromCollection(chr.getField().getMobsInRect(chr.getRectAround(rect)));
            } else {
                targetMob = null;
            }
            targetID = (targetMob == null || targetMob.getHp() <= 0 ? 0 : targetMob.getObjectId());

            ForceAtomInfo fai = new ForceAtomInfo(chr.getNewForceAtomKey(), 1, Util.getRandom(40, 70),
                    Util.getRandom(4, 8), chr.isLeft() ? 150 : 90, 0, Util.getCurrentTime(), 0,
                    0, chr.getPosition());
            ForceAtom fa = new ForceAtom(false, chr.getId(), chr.getId(), fae,
                    true, targetID, RADIANT_ATOM, fai, chr.getRectAround(rect), 0, 0,
                    chr.getPosition(), 0, chr.getPosition(), 0);
            chr.createForceAtom(fa);
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
        Summon summon;
        Field field = chr.getField();
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        Option o4 = new Option();
        Option o5 = new Option();
        switch (skillID) {
            case FLORAN_HERO_WILL:
                tsm.removeAllDebuffs();
                break;
            case REPOSITION_CRYSTAL:
                if (getCrystal() != null) {
                    inPacket.decodeInt(); // unknown
                    boolean isLeft = inPacket.decodeByte() != 0;
                    Position position = inPacket.decodePosition();
                    chr.getField().broadcast(Summoned.reposition(getCrystal(), skillID, position));
                }
                break;
            case RADIANT_JAVELIN:
            case RADIANT_JAVELIN_II:
            case RADIANT_JAVELIN_ENHANCED:
            case HEXA_RADIANT_JAVELIN:
            case HEXA_RADIANT_JAVELIN_2:
            case HEXA_RADIANT_ENCHANTED_JAVELIN:
            case HEXA_WINGED_JAVELIN:
            case HEXA_WINGED_ENCHANTED_JAVELIN:
            case HEXA_WINGED_JAVELIN_2:
                boolean isWinged = (skillID == RADIANT_JAVELIN_ENHANCED || skillID == HEXA_RADIANT_ENCHANTED_JAVELIN ||
                        skillID == HEXA_WINGED_JAVELIN || skillID == HEXA_WINGED_ENCHANTED_JAVELIN || skillID == HEXA_WINGED_JAVELIN_2);
                ForceAtomEnum fae = isWinged ? ForceAtomEnum.GLORY_WING_JAVELIN : ForceAtomEnum.RADIANT_JAVELIN;
                ForceAtomInfo fai = new ForceAtomInfo(chr.getNewForceAtomKey(), (skillID == RADIANT_JAVELIN_II || skillID == HEXA_RADIANT_JAVELIN || skillID == HEXA_RADIANT_JAVELIN_2) ? 2 : 1, 50, 50,
                        0, 300, Util.getCurrentTime(), 0, 0,
                        new Position(-48, 7));
                Position pos = new Position(0, 0);
                if (getCrystal() == null) {
                    pos = chr.getPosition();
                } else {
                    pos = getCrystal().getPosition();
                }
                ForceAtom fa = new ForceAtom(false, chr.getId(), chr.getId(), fae,
                        true, 0, skillID, fai, si.getFirstRect(), 0, 0,
                        pos, 0, pos, 0);

                if (!isWinged) {
                    fa.setRect2(si.getLastRect());
                }
                chr.createForceAtom(fa);
                if (skillID == RADIANT_JAVELIN_II || skillID == HEXA_RADIANT_JAVELIN || skillID == HEXA_RADIANT_JAVELIN_2) {
                    handleRadiantAtom();
                }
                break;
            case CRYSTALLINE_WINGS_FLY:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 1000;
                o1.setInMillis(true);
                newStats.put(NewFlying, o1);
                //o2.nReason = 1;
                //o2.nValue = skillID;
                //o2.tTerm = si.getValue(time, slv);
                //newStats.put(IndieNuclearOption, o2);
                tsm.sendStat(newStats);
                break;
            case GAUNTLET_FRENZY:
                o1.nValue = si.getValue(x, slv);
                o1.nReason = skillID;
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieBooster, o1);
                break;
            case HERO_OF_THE_FLORA:
                o1.nReason = skillID;
                o1.nValue = si.getValue(x, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieStatR, o1);
                break;
            case DIVINE_WRATH:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieDamR, o1);
                break;
            case FLASH_CRYSTAL_BATTERY:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(LefFastCharge, o1);
                break;
            case WINGS_OF_GLORY:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                o1.xOption = 1;
                o1.cOption = 1;
                newStats.put(LefGloryWing, o1);
                o2.nReason = skillID;
                o2.nValue = 19; //Bugged
                o2.tTerm = si.getValue(time, slv);
                newStats.put(IndiePMdR, o2);
                o3.nReason = skillID;
                o3.nValue = si.getValue(indieBDR, slv);
                o3.tTerm = si.getValue(time, slv);
                newStats.put(IndieBDR, o3);
                o4.nReason = skillID;
                o4.nValue = si.getValue(indieStance, slv);
                o4.tTerm = si.getValue(time, slv);
                newStats.put(IndieStance, o4);
                o5.nOption = 1;
                o5.rOption = skillID;
                o5.tOption = si.getValue(time, slv);
                newStats.put(NewFlying, o5);
                tsm.sendStat(newStats);
                crystalSkillMap.put(CRYSTAL_SKILL_ID_WINGS_OF_GLORY, false);
                chr.getField().broadcast(Summoned.stateChanged(getCrystal(), 2, crystalSkillMap));
                chr.getField().broadcast(Summoned.upgradeStage(getCrystal(), 3)); // resets crystal attacks
                break;
            case EX:
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Walk);
                summon.setAssistType(AssistType.AttackCounter);
                field.spawnSummon(summon);
                break;
            case MACHINA: // spawn at Crystal Position
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Fly);
                summon.setAssistType(AssistType.Attack);
                field.spawnSummon(summon);
                break;
            case CRYSTAL_SKILL_DEUS: // TODO
                field.getSummons().stream().filter(s -> s.getOwnerId() == chr.getId() && (s.getSkillID() == MACHINA || s.getSkillID() == EX)).forEach(field::removeLife);
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Walk);
                field.spawnSummon(summon);

                for (int i = 0; i < 5; i++) {
                    summon = Summon.getSummonByAndSetStat(chr, DEUS_SUB, slv);
                    summon.setMoveAbility(MoveAbility.Fly);
                    summon.setAssistType(AssistType.AttackCounter);
                    field.spawnAddSummon(summon);
                }

                crystalSkillMap.put(CRYSTAL_SKILL_ID_DEUS, false);
                chr.getField().broadcast(Summoned.stateChanged(getCrystal(), 2, crystalSkillMap));
                chr.getField().broadcast(Summoned.upgradeStage(getCrystal(), 3)); // resets crystal attacks
                break;
            case DEPLOY_CRYSTAL:
                Summon crystal = Summon.getSummonByAndSetStat(chr, skillID, slv);
                crystal.setMoveAbility(MoveAbility.Crystal);
                crystal.setAssistType(AssistType.AttackCounter);
                crystal.setSummonTerm(0);
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.summon = crystal;
                tsm.sendStat(IndieEmpty, o1);
                field.spawnSummon(crystal);
                resetCrystalBattery();
                chr.getField().broadcast(Summoned.upgradeStage(getCrystal(), 3)); // resets crystal attacks
                break;
            case CONVERSION_OVERDRIVE:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                newStats.put(LPMagicCircuitFullDrive, o1);
                int mpRatio = (int) (chr.getCurrentMPPerc());
                int damR = si.getValue(y, slv);

                if (mpRatio <= 80) { // upto this based on mp proportions
                    damR = damR - 5;
                }
                if (mpRatio <= 60) {
                    damR = damR - 8;
                }
                if (mpRatio <= 40) {
                    damR = damR - 12;
                }
                if (mpRatio <= 20) {
                    damR = damR - 16;
                }
                if (mpRatio <= 5) {
                    damR = damR - 18;
                }
                o2.nValue = damR;
                o2.nReason = skillID;
                o2.tTerm = si.getValue(time, slv);
                newStats.put(IndieDamR, o2);
                tsm.sendStat(newStats);
                break;
            case TEMPLAR_KNIGHT:
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Stop);
                summon.setAssistType(AssistType.CreateShootObj);
                field.spawnSummon(summon);
                break;
            case CRYSTALLINE_BULWARK:
                o1.nOption = 1;
                o1.rOption = skillID;
                int stack = 1;
                if (tsm.hasStat(CharacterTemporaryStat.LefBuffMastery)) {
                    stack = tsm.getOption(CharacterTemporaryStat.LefBuffMastery).nOption;
                    if (stack < getMaxLucentBrand()) {
                        stack++;
                    }
                }
                o1.tOption = stack;
                tsm.sendStat(NotDamaged, o1);
                break;
            case LONGINUS_ZONE:
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 3;
                tsm.sendStat(IndieNotDamaged, o1);
                chr.dispose();
                break;
            case CRYSTALLINE_SPIRIT:
                if (getShards() > 0) {
                    updateVSkillStackBuff(chr, getShards() - 1);
                } else {
                    chr.chatMessage("You don't have enough Charges to use this.");
                }
                Summon Shard;
                Shard = Summon.getSummonByAndSetStat(chr, skillID, slv);
                Shard.setMoveAbility(MoveAbility.Crystal);
                Shard.setAssistType(AssistType.AttackCounter);
                Shard.setSummonTerm(30);
                Shard.setPosition(getCrystal().getPosition());
                field.spawnAddSummon(Shard);
                break;
            case CRYSTAL_GATE:
                o1.nReason = skillID;
                o1.nValue = si != null && si.getValue(s, slv) > 0 ? si.getValue(s, slv) : 10;
                o1.tTerm = si != null && si.getValue(time, slv) > 0 ? si.getValue(time, slv) : 80;
                tsm.sendStat(IndieMAD, o1);
                chr.dispose();
                break;
            case EXCIDIUM:
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
            case MYTOCRYSTAL_EXPANSE:
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 6;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                chr.dispose();
                break;
            case HEXA_LONGINUS_ZONE:
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 3;
                tsm.sendStat(CharacterTemporaryStat.IndieNotDamaged, o1);
                chr.dispose();
                break;
            case HEXA_EX:
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Walk);
                summon.setAssistType(AssistType.AttackCounter);
                field.spawnSummon(summon);
                break;
            case HEXA_MACHINA:
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Fly);
                summon.setAssistType(AssistType.Attack);
                field.spawnSummon(summon);
                break;
            case HEXA_CRYSTAL_SKILL_DEUS:
                field.getSummons().stream().filter(s -> s.getOwnerId() == chr.getId() && (s.getSkillID() == MACHINA || s.getSkillID() == EX || s.getSkillID() == HEXA_MACHINA || s.getSkillID() == HEXA_EX)).forEach(field::removeLife);
                summon = Summon.getSummonByAndSetStat(chr, CRYSTAL_SKILL_DEUS, slv);
                summon.setMoveAbility(MoveAbility.Walk);
                field.spawnSummon(summon);

                for (int i = 0; i < 5; i++) {
                    summon = Summon.getSummonByAndSetStat(chr, DEUS_SUB, slv);
                    summon.setMoveAbility(MoveAbility.Fly);
                    summon.setAssistType(AssistType.AttackCounter);
                    field.spawnAddSummon(summon);
                }

                crystalSkillMap.put(CRYSTAL_SKILL_ID_DEUS, false);
                chr.getField().broadcast(Summoned.stateChanged(getCrystal(), 2, crystalSkillMap));
                chr.getField().broadcast(Summoned.upgradeStage(getCrystal(), 3));
                break;
        }
    }

    @Override
    public void handleShootObject(Char chr, ShootObjectSkillInfo sosi) {
        var skillId = sosi.getSkillId();
        var slv = sosi.getSlv();
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        switch (skillId) {
            case RADIANT_ORB:
            case RADIANT_ORB_II:
                SkillInfo si = SkillData.getSkillInfoById(skillId);
                slv = chr.getSkillLevel(skillId);
                Option o1 = new Option();
                Option o2 = new Option();
                Option o3 = new Option();
                Option o4 = new Option();
                o1.nOption = si.getValue(y, slv);
                o1.rOption = skillId;
                o1.tOption = 2000;
                o1.setInMillis(true);
                o1.skillIds = new ArrayList<>();
                o1.skillIds.add(RADIANT_JAVELIN_II);
                o1.skillIds.add(400021000); // Mana Overload
                newStats.put(NextSpecificSkillDamageUp, o1);
                //o2.nReason = 1;
                //o2.nValue = skillId;
                //o2.tTerm = 2000;
                //o2.setInMillis(true);
                //newStats.put(IndieNuclearOption, o2);

                Skill skill = getLucentBrandSkill();
                if (skill == null) {
                    return;
                }
                int stack = 1;
                if (tsm.hasStat(CharacterTemporaryStat.LefBuffMastery)) {
                    stack = tsm.getOption(CharacterTemporaryStat.LefBuffMastery).nOption;
                    if (stack < getMaxLucentBrand()) {
                        stack++;
                    }
                }
                o3.nOption = stack;
                o3.rOption = skill.getSkillId();
                o3.tOption = 2000;
                o3.xOption = skill.getSkillId();
                o3.cOption = skill.getSkillId() == LUCENT_BRAND ? 3 : skill.getSkillId() == LUCENT_BRAND_II ? 6 : 10;
                o3.setInMillis(true);
                newStats.put(LefBuffMastery, o3);
                tsm.sendStat(newStats);
                break;
        }
        super.handleShootObject(chr, sosi);
    }

    public void giveLucentBrand(TemporaryStatManager tsm, Option o3, Option o4) {
    }

    private int getMaxLucentBrand() {
        int maxStack = 0;
        for (int lucentSkillId : lucentSkills) {
            if (chr.hasSkill(lucentSkillId)) {
                SkillInfo si = SkillData.getSkillInfoById(lucentSkillId);
                maxStack = si.getValue(x, chr.getSkillLevel(lucentSkillId));
            }
        }
        return maxStack;
    }

    private Skill getLucentBrandSkill() {
        Skill skill = null;
        for (int lucentSkillId : lucentSkills) {
            if (chr.hasSkill(lucentSkillId)) {
                skill = chr.getSkill(lucentSkillId);
            }
        }
        return skill;
    }

    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (tsm.hasStat(LefBuffMastery) && tsm.getOption(LefBuffMastery).nOption > 1) {
            Skill skill = chr.getSkill(AEGIS_OF_LIGHT);
            if (skill != null) {
                SkillInfo si = SkillData.getSkillInfoById(AEGIS_OF_LIGHT);
                int dmgPerc = si.getValue(x, skill.getCurrentLevel());
                int dmg = hitInfo.hpDamage;
                hitInfo.hpDamage = dmg - (dmg * (dmgPerc / 100));
                tsm.getOption(LefBuffMastery).nOption -= 1;
            }
        }
        super.handleHit(c, inPacket, hitInfo);
    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.HOME_MAP);
        cs.setLevel(10);
        cs.setJob(JobConstants.JobEnum.ILLIUM_1.getJobId());
        cs.setStr(4);
        cs.setDex(4);
        cs.setInt(45);
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
        Item secondary = ItemData.getItemDeepCopy(1353500);
        chr.addItemToInventoryToNewCharacter(EQUIPPED, secondary, true);
        secondary.setInventoryID(chr.getInventoryByType(EQUIPPED).getId());
        secondary.setCharID(chr.getId());
        secondary.setInvType(EQUIPPED);
        secondary.setBagIndex(BodyPart.Shield.getVal());
        secondary.saveToSQL();
        chr.getAvatarData().getAvatarLook().getHairEquips().add(secondary.getItemId());
        chr.getAvatarData().getAvatarLook().setDrawElfEar(true);
        chr.getAvatarData().getAvatarLook().updateAvatarLookToSQL();
    }

    @Override
    public void handleJobAdvance() {
        ScriptManagerImpl sm = chr.getScriptManager();
        if (chr.getJob() == JobConstants.JobEnum.ILLIUM_1.getJobId()) {
            if (chr.getLevel() < 30) {
                sm.sendSayOkay("#eThis jobs require the player to be at least level #r30#k prior to advancement");
                return;
            }
            if (sm.sendAskYesNo("#eWould you like to skip the Job Advanced Quest(s)?")) {
                if (sm.getEmptyInventorySlots(1) < 1) {
                    sm.sendSayOkay("#ePlease make more space in your EQUIP inventory.");
                    return;
                }
                sm.jobAdvance(JobConstants.JobEnum.ILLIUM_2.getJobId());
                sm.giveItem(1143079);
                sm.completeQuestNoRewards(34817);
            }
        } else if (chr.getJob() == JobConstants.JobEnum.ILLIUM_2.getJobId()) {
            if (chr.getLevel() < 60) {
                sm.sendSayOkay("#eThis jobs require the player to be at least level #r60#k prior to advancement");
                return;
            }
            if (sm.sendAskYesNo("#eWould you like to skip the Job Advanced Quest(s)?")) {
                if (sm.getEmptyInventorySlots(1) < 1) {
                    sm.sendSayOkay("#ePlease make more space in your EQUIP inventory.");
                    return;
                }
                sm.jobAdvance(JobConstants.JobEnum.ILLIUM_3.getJobId());
                sm.giveItem(1143080);
                sm.completeQuestNoRewards(34831);
                sm.completeQuestNoRewards(34832);
                sm.completeQuestNoRewards(34833);
                sm.completeQuestNoRewards(34834);
            }
        } else if (chr.getJob() == JobConstants.JobEnum.ILLIUM_3.getJobId()) {
            if (chr.getLevel() < 100) {
                sm.sendSayOkay("#eThis jobs require the player to be at least level #r100#k prior to advancement");
                return;
            }
            if (sm.sendAskYesNo("#eWould you like to skip the Job Advanced Quest(s)?")) {
                if (sm.getEmptyInventorySlots(1) < 1) {
                    sm.sendSayOkay("#ePlease make more space in your EQUIP inventory.");
                    return;
                }
                sm.jobAdvance(JobConstants.JobEnum.ILLIUM_4.getJobId());
                sm.giveItem(1143081);
                sm.completeQuestNoRewards(34842);
            }
        } else {
            sm.sendSayOkay("#eYou may not advance at the current state.");
        }
    }

    @Override
    public void handleRemoveCTS(CharacterTemporaryStat cts,  List<Option> options) {
        if (cts == CharacterTemporaryStat.CrystalChargeBuffIcon) {
            changeCrystalCharge(0);
            resetCrystalBattery();
        }
    }
}
