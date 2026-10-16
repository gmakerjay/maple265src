package net.swordie.ms.client.jobs.anima;

import it.unimi.dsi.fastutil.ints.Int2IntMap;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.skills.*;
import net.swordie.ms.client.character.skills.info.*;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.UserPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.constants.QuestConstants;
import net.swordie.ms.enums.AssistType;
import net.swordie.ms.enums.LeaveType;
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

public class Ren extends Job {

    // Beginner Skills (Anima Warrior)
    public static final int RETURN_TO_SERPENT_HEARTWATERS = 160021074;
    public static final int SPIRIT_AFFINITY = 160020000; // Passive
    public static final int GROUNDED_BODY = 160020001; // Passive
    public static final int EXCLUSIVE_SPELL = 160021005; // MaxLevelBuff nOption 4
    public static final int SHAPESHIFT = 160021075;

    // 1st Job (16100)
    public static final int PLUM_BLOSSOM_SWORD_SLICE = 161001000;
    public static final int SERENE_BREEZE = 161001001;
    public static final int SERENE_BREEZE_SUB = 161001002;
    public static final int LILTING_PETAL = 161001003;

    // 2nd Job (16110)
    public static final int PLUM_BLOSSOM_SWORD_STRIKE = 161101000;
    public static final int FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH = 161101001;
    public static final int FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH_UNSHEATHE = 161101009;
    public static final int FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH_SHEATHE = 161101002;
    public static final int IMUGI_SPIRIT_SWORD_SPIRIT_STRIKE = 161100003;
    public static final int IMUGI_SPIRIT_SWORD_SPIRIT_STRIKE_ATT = 161101004;
    public static final int BLOSSOMING_BLADE = 161101005; // Booster

    // 3rd Job (16111)
    public static final int PLUM_BLOSSOM_SWORD_TORRENT = 161111000;
    public static final int SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS = 161110001; // REGISTER_EXTRA_SKILL
    public static final int SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS_ATOM = 161111002;
    public static final int IMUGI_SPIRIT_SWORD_SPIRIT_STRIKE_II = 161110003;
    public static final int IMUGI_SPIRIT_SWORD_SPIRIT_STRIKE_II_ATT = 161111004;
    public static final int FIRST_IMUGI_SPIRIT_SWORD_SERPENT_BLESSING = 161110005;
    public static final int WISH_UNENDING = 161111006;
    public static final int FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH = 161110007;
    public static final int FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_EFF = 161111008; // invisible
    public static final int FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_2 = 161111011;

    // 4th Job (16112) & Hyper
    public static final int PLUM_BLOSSOM_SWORD_STORM = 161121000; // KeyDownMoving nOption = 1
    public static final int IMUGI_SPIRIT_SWORD_SPIRIT_STRIKE_III = 161120001;
    public static final int IMUGI_SPIRIT_SWORD_SPIRIT_STRIKE_III_ATT = 161121002;
    public static final int FINAL_IMUGI_SPIRIT_SWORD_RAVENOUS_SPIRIT = 161120003;
    public static final int FINAL_IMUGI_SPIRIT_SWORD_RAVENOUS_SPIRIT_EFF = 161121004;
    public static final int RIOTOUS_HEART = 161121005; // Shoot Object
    public static final int HEARTS_UNITED = 161121014; // Shoot Object
    public static final int UNITY = 161121015;
    public static final int SECOND_IMUGI_SPIRIT_SWORD_SERPENT_FANG = 161120006; // Final Attack
    public static final int FOURTH_PLUM_BLOSSOM_SWORD_UNBOWED_BLADE = 161121007;
    public static final int PLUM_BLOSSOM_SWORD_UNBOWED_BLADE = 161121008; // IndieNotDamaged nValue = 1 (3s)
    public static final int ANIMA_WARRIOR = 161121009;
    public static final int ANIMA_HERO_WILL = 161121010;
    public static final int SUBLIMATION = 161121041; // Sublimation nValue = 3
    public static final int PLUM_BRANCH_SNARE = 161121042; // Plum Branch Snare
    public static final int FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED = 161121043;
    public static final int FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED_DEBUFF = 161121044;

    // V Skills (40001)
    public static final int THOUSAND_BLOSSOM_FLURRY = 400011147;
    public static final int THOUSAND_BLOSSOM_FLURRY_EX = 400011148; // RenPlumSwordEx
    public static final int THOUSAND_BLOSSOM_FLURRY_ATOM = 400011149; // RenPlumSwordEx
    public static final int SOUL_IMMEASURABLE = 400011150; // Soul Immeasurable
    public static final int SOUL_IMMEASURABLE_ATT = 400011151; // Soul Immeasurable
    public static final int SOUL_IMMEASURABLE_SPE = 400011152; // Soul Immeasurable
    public static final int DANCING_ANNIHILATION = 400011153;
    public static final int FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART = 400011154;
    public static final int FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_2 = 400011155;
    public static final int FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_ATT = 400011157; // Skill Activation

    // HEXA Skills (16114)
    public static final int HEXA_PLUM_BLOSSOM_SWORD_STORM = 161141000;
    public static final int HEXA_IMUGI_SPIRIT_SWORD_SPIRIT_STRIKE = 161141001;
    public static final int HEXA_SECOND_IMUGI_SPIRIT_SWORD_SERPENT_FANG = 161140010; // Final Attack
    public static final int HEXA_WISH_UNENDING = 161140005;
    public static final int HEXA_WISH_UNENDING_ATT = 161141006;
    public static final int HEXA_FINAL_IMUGI_SPIRIT_SWORD_BURROWING_EARTH = 161141002;
    public static final int HEXA_FINAL_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_2 = 161141011;
    public static final int HEXA_FINAL_IMUGI_SPIRIT_SWORD_RAVENOUS_SPIRIT = 161141003;
    public static final int HEXA_FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED = 161141004;
    public static final int HEXA_FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED_DEBUFF = 161141012;
    public static final int HEXA_SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS = 161140007; // REGISTER_EXTRA_SKILL
    public static final int HEXA_SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS_ATOM = 161141008;
    public static final int HEXA_RIOTOUS_HEART = 161141009; // Shoot Object
    public static final int HEXA_HEARTS_UNITED = 161141013; // Shoot Object
    public static final int DIVIDED_HEAVENS = 161141500; // Rising Azure Dragon: Divided Heavens (Origin 1)
    public static final int DIVIDED_HEAVENS_FINISH = 161141501; // Rising Azure Dragon: Divided Heavens Finish
    public static final int HEARTBOUND_VERSE = 161141506; // Rising Azure Dragon: Heartbound Verse (Origin 2 / Ascent)
    public static final int HEARTBOUND_VERSE_FALLING_FLOWER = 161141502; // Rising Azure Dragon: Heartbound Verse - Falling Flower
    public static final int HEARTBOUND_VERSE_CLIMBING_SERPENT = 161141503; // Rising Azure Dragon: Heartbound Verse - Climbing Serpent
    public static final int HEARTBOUND_VERSE_SOARING_DRAGON = 161141504; // Rising Azure Dragon: Heartbound Verse - Soaring Dragon
    public static final int HEARTBOUND_VERSE_FALLING_FLOWER_ATT = 161141505; // Rising Azure Dragon: Heartbound Verse - Falling Flower Attack

    private static final int[] addedSkills = new int[]{
            RETURN_TO_SERPENT_HEARTWATERS,
            SPIRIT_AFFINITY,
            SHAPESHIFT,
            EXCLUSIVE_SPELL,
            GROUNDED_BODY,
    };
    public int soulImmeasuableStack = 0;

    public Ren(Char chr) {
        super(chr);
        if (chr.getId() != 0 && isHandlerOfJob(chr.getJob())) {
            for (int id : addedSkills) {
                if (!chr.hasSkill(id)) {
                    Skill skill = SkillData.getSkillDeepCopyById(id);
                    if (skill != null) {
                        int maxLv = skill.getMaxLevel() > 0 ? skill.getMaxLevel() : skill.getMasterLevel();
                        if (maxLv <= 0) maxLv = 1;
                        skill.setCurrentLevel(maxLv);
                        skill.setMasterLevel(maxLv);
                        chr.addSkill(skill);
                    }
                }
            }
        }
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isRen(id);
    }

    private boolean isFinalImugiSpiritSwordSkill(int skillID) {
        return switch (skillID) {
            case FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH,
                 FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_EFF,
                 FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_2,
                 FINAL_IMUGI_SPIRIT_SWORD_RAVENOUS_SPIRIT,
                 FINAL_IMUGI_SPIRIT_SWORD_RAVENOUS_SPIRIT_EFF,
                 FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED,
                 HEXA_FINAL_IMUGI_SPIRIT_SWORD_BURROWING_EARTH,
                 HEXA_FINAL_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_2,
                 HEXA_FINAL_IMUGI_SPIRIT_SWORD_RAVENOUS_SPIRIT,
                 HEXA_FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED,
                 FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART,
                 FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_2,
                 FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_ATT -> true;
            default -> false;
        };
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        Option o1 = new Option();
        MobTemporaryStat mts = mob.getTemporaryStat();
        switch (skillID) {
            case PLUM_BRANCH_SNARE:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    o1.tOption = si != null ? si.getValue(time, slv) : 10;
                    mts.addStatOptions(mob, MobStat.Stun, o1);
                }
                break;
            case FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED:
            case HEXA_FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    List<Option> options = new ArrayList<>();
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    o1.tOption = 5;
                    Option ox = new Option();
                    ox.nOption = 1;
                    ox.cOption = chr.getId();
                    ox.rOption = skillID;
                    ox.mOption = skillID == HEXA_FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED
                            ? HEXA_FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED_DEBUFF
                            : FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED_DEBUFF;
                    ox.xOption = mob.getPosition().getX();
                    ox.yOption = mob.getPosition().getY();
                    ox.zOption = mob.getPosition().getY() + 10;
                    ox.tOption = 5000; // 5s
                    ox.uOption = 10;
                    options.add(ox);
                    o1.extraOpts = new ArrayList<>(options);
                    mts.addStatOptions(mob, MobStat.NewBurnedInfo, o1);
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
            if (skillID != SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS_ATOM
                    && skillID != HEXA_SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS_ATOM
                    && skillID != THOUSAND_BLOSSOM_FLURRY_EX
                    && skillID != THOUSAND_BLOSSOM_FLURRY_ATOM
                    && skillID != SOUL_IMMEASURABLE_ATT
                    && skillID != SOUL_IMMEASURABLE_SPE
                    && skillID != HEXA_WISH_UNENDING_ATT) {
                serpentBlessing();
                rainingBlossoms();
                thousandBlossomsFlurry(attackInfo);
                soulImmeasuable(attackInfo);
            }
            if (isFinalImugiSpiritSwordSkill(skillID)
                    && chr.hasSkill(HEXA_WISH_UNENDING)
                    && !chr.hasSkillOnCooldown(HEXA_WISH_UNENDING_ATT)) {
                chr.write(UserLocal.userBonusAttackRequest(HEXA_WISH_UNENDING_ATT));
                chr.addSkillCooldown(HEXA_WISH_UNENDING_ATT, 1000);
            }
        }
        Option o1 = new Option();
        if (isFinalImugiSpiritSwordSkill(skillID)) {
            chr.write(WvsContext.renImugiSpiritSwordRequest(skillID));
        }
        switch (attackInfo.skillId) {
            case FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH:
            case FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH_UNSHEATHE:
            case FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH_SHEATHE: {
                SkillInfo pSi = SkillData.getSkillInfoById(FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH);
                int pSlv = Math.max(1, chr.getSkillLevel(FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH));
                int healR = pSi != null ? pSi.getValue(mhpR, pSlv) : (4 + pSlv / 3);
                if (healR > 0) {
                    chr.heal((int) (chr.getMaxHP() * (healR / 100D)));
                }
                break;
            }
            case PLUM_BLOSSOM_SWORD_STORM:
            case HEXA_PLUM_BLOSSOM_SWORD_STORM:
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si != null ? si.getValue(SkillStat.time, slv) : 0;
                o1.xOption = 1;
                tsm.sendStat(KeyDownMoving, o1);
                break;
            case FOURTH_PLUM_BLOSSOM_SWORD_UNBOWED_BLADE:
            case PLUM_BLOSSOM_SWORD_UNBOWED_BLADE:
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 3;
                o1.tOption = 3;
                tsm.sendStat(IndieNotDamaged, o1);
                break;
            case RIOTOUS_HEART:
            case HEXA_RIOTOUS_HEART:
                chr.addSkillCooldown(skillID, 10000);
                break;
            case HEARTS_UNITED:
            case HEXA_HEARTS_UNITED:
                chr.addSkillCooldown(skillID, 30000);
                break;
            case DIVIDED_HEAVENS:
            case DIVIDED_HEAVENS_FINISH:
                if (!chr.hasSkillOnCooldown(DIVIDED_HEAVENS)) {
                    chr.addSkillCooldown(DIVIDED_HEAVENS, 360000);
                    chr.addSkillCooldown(DIVIDED_HEAVENS_FINISH, 360000);
                }
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (mob == null) {
                        continue;
                    }
                    MobTemporaryStat mts = mob.getTemporaryStat();
                    if (!mts.hasCurrentMobStat(MobStat.Freeze)) {
                        EnumMap<MobStat, Option> stats = new EnumMap<>(MobStat.class);

                        Option oFreeze = new Option();
                        oFreeze.nOption = 1;
                        oFreeze.rOption = skillID;
                        oFreeze.tOption = 10;
                        oFreeze.cOption = chr.getId();
                        stats.put(MobStat.Freeze, oFreeze);

                        Option oDebuff = new Option();
                        oDebuff.nOption = 1;
                        oDebuff.rOption = skillID;
                        oDebuff.tOption = 20;
                        oDebuff.cOption = chr.getId();
                        stats.put(MobStat.OriginDebuff, oDebuff);

                        mts.addStatOptions(mob, stats);
                    }
                }
                break;
            case HEARTBOUND_VERSE:
            case HEARTBOUND_VERSE_FALLING_FLOWER:
            case HEARTBOUND_VERSE_CLIMBING_SERPENT:
            case HEARTBOUND_VERSE_FALLING_FLOWER_ATT:
                if (!chr.hasSkillOnCooldown(HEARTBOUND_VERSE)) {
                    chr.addSkillCooldown(HEARTBOUND_VERSE, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_FALLING_FLOWER, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_CLIMBING_SERPENT, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_SOARING_DRAGON, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_FALLING_FLOWER_ATT, 240000);
                }
                break;
            case HEARTBOUND_VERSE_SOARING_DRAGON:
                if (!chr.hasSkillOnCooldown(HEARTBOUND_VERSE)) {
                    chr.addSkillCooldown(HEARTBOUND_VERSE, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_FALLING_FLOWER, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_CLIMBING_SERPENT, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_SOARING_DRAGON, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_FALLING_FLOWER_ATT, 240000);
                }
                tsm.removeStatsBySkill(HEARTBOUND_VERSE);
                tsm.removeStat(Holding);
                break;
        }
    }

    private void soulImmeasuable(AttackInfo attackInfo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int skillID = SOUL_IMMEASURABLE;
        if (tsm.hasStatBySkillId(skillID)) {
            int slv = Math.max(1, chr.getSkillLevel(skillID));
            SkillInfo si = SkillData.getSkillInfoById(skillID);
            if (si == null) {
                return;
            }
            int maxStack = Math.max(90, si.getValue(u2, slv));
            if (this.soulImmeasuableStack < maxStack) {
                Option o2 = new Option();
                this.soulImmeasuableStack = Math.min(maxStack, this.soulImmeasuableStack + Math.max(1, attackInfo.mobCount));
                o2.nOption = this.soulImmeasuableStack;
                o2.rOption = skillID;
                o2.tOption = si.getValue(time, slv);
                tsm.sendStat(SpiritAwakeningStack, o2);
                chr.write(UserLocal.userBonusAttackRequest(SOUL_IMMEASURABLE_ATT));
                if (this.soulImmeasuableStack >= maxStack) {
                    chr.write(UserLocal.userBonusAttackRequest(SOUL_IMMEASURABLE_SPE));
                }
            }
        }
    }

    private void rainingBlossoms() {
        if (chr.hasSkill(SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS)) {
            boolean isHexa = chr.hasSkill(HEXA_SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS);
            int originalSkillID = isHexa
                    ? HEXA_SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS
                    : SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS;

            int atomSkillID = isHexa
                    ? HEXA_SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS_ATOM
                    : SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS_ATOM;

            int slv = Math.max(1, chr.getSkillLevel(originalSkillID));
            SkillInfo origSi = SkillData.getSkillInfoById(originalSkillID);
            SkillInfo si = SkillData.getSkillInfoById(atomSkillID);
            if (si == null || si.getSecondAtomInfos() == null || si.getSecondAtomInfos().isEmpty()) {
                return;
            }
            int propVal = origSi != null ? origSi.getValue(SkillStat.prop, slv) : 35;
            if (propVal <= 0) {
                propVal = 35;
            }
            if (Util.succeedProp(propVal)) {
                int bulletCount = si.getValue(SkillStat.bulletCount, slv);
                if (bulletCount <= 0 && origSi != null) {
                    bulletCount = origSi.getValue(SkillStat.bulletCount, slv);
                }
                if (bulletCount <= 0) {
                    bulletCount = isHexa ? 7 : 5;
                }
                List<SecondAtom> secondAtoms = new LinkedList<>();
                Rect rect = chr.getRectAround(new Rect(-500, -500, 500, 500));
                if (!chr.isLeft()) rect = rect.horizontalFlipAround(chr.getPosition().getX());
                var sai = si.getSecondAtomInfos().get(0);
                if (sai == null) return;
                final var pos = chr.getPosition();
                final var mobs = chr.getField().getMobsInRect(rect);
                final int dataIndex = atomSkillID == SECOND_PLUM_BLOSSOM_SWORD_RAINING_BLOSSOMS_ATOM
                        ? (Util.succeedProp(50) ? 105 : 117) : (Util.succeedProp(50) ? 108 : 118);
                final long start = System.currentTimeMillis();
                for (int i = 0; i < bulletCount; i++) {
                    var mob = Util.getRandomFromCollection(mobs);
                    if (mob == null) continue;
                    SecondAtom fa = new SecondAtom(sai, chr.getNewSecondAtomKey(), chr.getId(), mob.getObjectId(), i,
                            si.getSkillId(), pos, start);
                    fa.setDataIndex(dataIndex);
                    fa.setCustomrotate(360);
                    fa.setCustoms(sai.getCustoms());
                    fa.setUnk(2);
                    secondAtoms.add(fa);
                }
                if (!secondAtoms.isEmpty()) {
                    chr.createSecondAtom(secondAtoms);
                    Option o1 = new Option();
                    o1.nValue = 1;
                    o1.nReason = originalSkillID;
                    o1.tTerm = 2;
                    chr.getTemporaryStatManager().sendStat(IndieBuffIcon, o1);
                }
            }
        }
    }

    private void thousandBlossomsFlurry(AttackInfo attackInfo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (tsm.hasStat(RenPlumSwordEx)) {
            int count = 0;
            List<Integer> mobList = new ArrayList<>();
            for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                if (mob == null || mob.getHp() <= 0) {
                    continue;
                }
                mobList.add(mob.getObjectId());
            }
            chr.write(UserLocal.userBonusAttackRequest(THOUSAND_BLOSSOM_FLURRY_EX, mobList, attackInfo.skillId));
            if (chr.getField().getSummonBySkillId(chr, THOUSAND_BLOSSOM_FLURRY) != null) {
                Option o1 = tsm.getOption(RenPlumSwordEx);
                o1.nOption += 1;
                count = o1.nOption;
                o1.rOption = THOUSAND_BLOSSOM_FLURRY_EX;
                o1.yOption = Util.succeedProp(10) ? 2 : Util.succeedProp(30) ? 1 : 0;
                tsm.sendStat(RenPlumSwordEx, o1);
            }
            if (count == 30 || count == 70 || count == 125) {
                int bulletCount = count == 30 ? 20 : count == 70 ? 40 : 65;
                SkillInfo si = SkillData.getSkillInfoById(THOUSAND_BLOSSOM_FLURRY_ATOM);
                if (si == null || si.getSecondAtomInfos() == null) {
                    return;
                }
                List<SecondAtom> secondAtoms = new LinkedList<>();
                Rect rect = chr.getRectAround(new Rect(-1000, -1000, 1000, 1000));
                if (!chr.isLeft()) rect = rect.horizontalFlipAround(chr.getPosition().getX());
                final var mobs = chr.getField().getMobsInRect(rect);
                if (mobs.isEmpty()) return;
                var sai = si.getSecondAtomInfos().getOrDefault(0, null);
                if (sai != null) {
                    final int randX = chr.getPosition().getX() + Util.getRandom(-200, 200);
                    final int randY = chr.getPosition().getY() - Util.getRandom(100, 200);
                    final var pos = new Position(randX, randY);
                    final long start = System.currentTimeMillis();
                    for (int i = 0; i < bulletCount; i++) {
                        var mob = Util.getRandomFromCollection(mobs);
                        if (mob == null) continue;
                        SecondAtom fa = new SecondAtom(sai, chr.getNewSecondAtomKey(), chr.getId(), mob.getObjectId(),
                                i, si.getSkillId(), pos, start);
                        secondAtoms.add(fa);
                    }
                    chr.createSecondAtom(secondAtoms);
                }
            }
        }
    }

    private void serpentBlessing() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (chr.hasSkill(FIRST_IMUGI_SPIRIT_SWORD_SERPENT_BLESSING) && Util.succeedProp(35)
                && !tsm.hasStatBySkillId(FIRST_IMUGI_SPIRIT_SWORD_SERPENT_BLESSING)) {
            EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
            Option o1 = new Option();
            Option o2 = new Option();
            o1.nValue = 100;
            o1.nReason = FIRST_IMUGI_SPIRIT_SWORD_SERPENT_BLESSING;
            o1.tTerm = 4;
            newStats.put(IndieAsrR, o1);
            o2.nValue = 1;
            o2.nReason = FIRST_IMUGI_SPIRIT_SWORD_SERPENT_BLESSING;
            o2.tTerm = 4;
            newStats.put(IndieCheckTimeByClient, o2);
            tsm.sendStat(newStats);
        }
    }

    @Override
    public void handleSkill(Client c, InPacket inPacket, SkillUseInfo skillUseInfo) {
        super.handleSkill(c, inPacket, skillUseInfo);
        Char chr = c.getChr();
        SkillInfo si = skillUseInfo.skillInfo;
        int slv = skillUseInfo.slv;
        int skillID = skillUseInfo.skillID;
        Option o1 = new Option();
        Option o2 = new Option();
        Field field = chr.getField();
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Summon summon;
        switch (skillID) {
            case RETURN_TO_SERPENT_HEARTWATERS:
                Field toField = chr.getOrCreateFieldByCurrentInstanceType(si.getValue(x, slv));
                chr.warp(toField);
                break;
            case SHAPESHIFT:
                boolean enable;
                int qid = QuestConstants.SHAPESHIFT_QR;
                if (chr.getQRValueByKey(qid, "sw") != null && chr.getQRValueByKey(qid, "sw").equalsIgnoreCase("0")) {
                    chr.setQRValueByKey(qid, "sw", "1");
                    enable = true;
                } else {
                    chr.createQuestWithQRValue(qid, "sw=0");
                    enable = false;
                }
                chr.getField().broadcast(UserPacket.shapeShiftResult(chr.getId(), enable));
                chr.addSkillCooldown(SHAPESHIFT, 10000);
                break;
            case EXCLUSIVE_SPELL:
                o1.nOption = si.getValue(SkillStat.x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(SkillStat.time, slv);
                tsm.sendStat(MaxLevelBuff, o1);
                break;
            case FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH:
            case FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH_UNSHEATHE:
            case FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH_SHEATHE: {
                SkillInfo pSi = SkillData.getSkillInfoById(FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH);
                int pSlv = Math.max(1, chr.getSkillLevel(FIRST_PLUM_BLOSSOM_SWORD_PETAL_FLASH));
                int healR = pSi != null ? pSi.getValue(mhpR, pSlv) : (4 + pSlv / 3);
                if (healR > 0) {
                    chr.heal((int) (chr.getMaxHP() * (healR / 100D)));
                }
                break;
            }
            case BLOSSOMING_BLADE:
                o1.nOption = si.getValue(SkillStat.x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(SkillStat.time, slv);
                tsm.sendStat(Booster, o1);
                break;
            case FOURTH_PLUM_BLOSSOM_SWORD_UNBOWED_BLADE:
            case PLUM_BLOSSOM_SWORD_UNBOWED_BLADE:
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 3;
                o1.tOption = 3;
                tsm.sendStat(IndieNotDamaged, o1);
                break;
            case SUBLIMATION:
                o1.nOption = si.getValue(SkillStat.w, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(SkillStat.time, slv);
                tsm.sendStat(Sublimation, o1);
                break;
            case RIOTOUS_HEART:
            case HEXA_RIOTOUS_HEART:
                o1.nOption = tsm.hasStat(RenPlumSwordForm3Stack) ? (int) (tsm.getTotalNOptionOfStat(RenPlumSwordForm3Stack) - 1) : 0;
                o1.rOption = skillID;
                tsm.sendStat(RenPlumSwordForm3Stack, o1);
                o2.nOption = si.getValue(x, slv);
                o2.rOption = skillID;
                tsm.sendStat(RenPlumSwordForm3Shoot, o2);
                break;
            case ANIMA_HERO_WILL:
                tsm.removeAllDebuffs();
                break;
            case THOUSAND_BLOSSOM_FLURRY:
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Stop);
                summon.setAssistType(AssistType.None);
                field.spawnSummon(summon);
                AffectedArea aa = AffectedArea.getPassiveAA(chr, skillID, slv);
                aa.setMobOrigin((byte) 0);
                aa.setPosition(chr.getPosition());
                aa.setRect(aa.getPosition().getRectAround(si.getRects().getFirst()));
                aa.setDelay((short) 8);
                chr.getField().spawnAffectedArea(aa);
                o1.nOption = 0;
                o1.rOption = THOUSAND_BLOSSOM_FLURRY_EX;
                o1.tOption = si.getValue(SkillStat.time, slv);
                o1.startTime = System.currentTimeMillis();
                tsm.sendStat(RenPlumSwordEx, o1);
                break;
            case SOUL_IMMEASURABLE:
                this.soulImmeasuableStack = 0;
                o1.nOption = 2;
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                newStats.put(SpiritAwakening, o1);
                o2.nOption = 0;
                o2.rOption = skillID;
                o2.tOption = si.getValue(time, slv);
                newStats.put(SpiritAwakeningStack, o2);
                tsm.sendStat(newStats);
                break;
            case FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART:
            case FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_2:
            case FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_ATT: {
                SkillInfo atomSi = SkillData.getSkillInfoById(FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART);
                if (atomSi == null || atomSi.getSecondAtomInfos() == null) {
                    break;
                }
                List<SecondAtom> secondAtoms = new LinkedList<>();
                Rect rect = chr.getRectAround(new Rect(-800, -800, 800, 800));
                if (!chr.isLeft()) rect = rect.horizontalFlipAround(chr.getPosition().getX());
                final var mob = Util.getRandomFromCollection(chr.getField().getMobsInRect(rect));
                if (mob == null) {
                    break;
                }
                int key = 0;
                final long start = System.currentTimeMillis();
                for (SkillInfo.SecondAtomInfo sai : atomSi.getSecondAtomInfos().values()) {
                    final var pos = chr.getPosition().add(sai.getPos());
                    SecondAtom fa = new SecondAtom(sai, chr.getNewSecondAtomKey(), chr.getId(), mob.getObjectId(), key,
                            FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART, pos, start);
                    fa.setDataIndex(107);
                    fa.setSpecialAtom(true);
                    secondAtoms.add(fa);
                    key++;
                }
                chr.createSecondAtom(secondAtoms);
                break;
            }
            case DIVIDED_HEAVENS:
            case DIVIDED_HEAVENS_FINISH:
                if (!chr.hasSkillOnCooldown(DIVIDED_HEAVENS)) {
                    chr.addSkillCooldown(DIVIDED_HEAVENS, 360000);
                    chr.addSkillCooldown(DIVIDED_HEAVENS_FINISH, 360000);
                }
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 7;
                o1.tOption = 7;
                tsm.sendStat(IndieNotDamaged, o1);
                chr.write(UserLocal.showHexaSkillEff(chr));
                if (chr.getParty() != null) {
                    chr.getParty().broadcast(UserLocal.showHexaSkillEff(chr), chr);
                }
                break;
            case HEARTBOUND_VERSE:
                if (!chr.hasSkillOnCooldown(HEARTBOUND_VERSE)) {
                    chr.addSkillCooldown(HEARTBOUND_VERSE, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_FALLING_FLOWER, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_CLIMBING_SERPENT, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_SOARING_DRAGON, 240000);
                    chr.addSkillCooldown(HEARTBOUND_VERSE_FALLING_FLOWER_ATT, 240000);
                }
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = 7;
                o1.tOption = 7;
                tsm.sendStat(IndieNotDamaged, o1);
                Option oAscent = new Option();
                oAscent.nOption = 1;
                oAscent.rOption = skillID;
                oAscent.tOption = 30;
                tsm.sendStat(Holding, oAscent);
                chr.write(UserLocal.showHexaSkillEff(chr));
                if (chr.getParty() != null) {
                    chr.getParty().broadcast(UserLocal.showHexaSkillEff(chr), chr);
                }
                break;
            case HEARTBOUND_VERSE_FALLING_FLOWER:
                summon = Summon.getSummonByAndSetStat(chr, skillID, slv);
                summon.setMoveAbility(MoveAbility.Stop);
                summon.setAssistType(AssistType.ExplosionAttack);
                summon.setLeaveType(LeaveType.ASCENT);
                summon.setMoveAction((byte) 4);
                field.spawnSummon(summon);
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = si.getValue(ndTime, slv);
                o1.isInMillis = true;
                tsm.sendStat(Holding, o1);
                break;
            case HEARTBOUND_VERSE_CLIMBING_SERPENT:
                tsm.removeStatsBySkill(HEARTBOUND_VERSE_FALLING_FLOWER);
                break;
            case HEARTBOUND_VERSE_SOARING_DRAGON:
                tsm.removeStatsBySkill(HEARTBOUND_VERSE);
                tsm.removeStat(Holding);
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
        cs.setJob(JobConstants.JobEnum.REN_1.getJobId());
        cs.setLevel(10);
        cs.setStr(45);
        cs.setDex(4);
        cs.setInt(4);
        cs.setLuk(4);
        cs.setHp(1000);
        cs.setMaxHp(1000);
        if (!JobConstants.isNoManaJob(chr.getJob())) {
            cs.setMp(500);
            cs.setMaxMp(500);
        }
        cs.getExtendSP().addSpToJobLevel(1, 5);
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        // Secondary Weapon: Spirit Heart (1354040)
        Item secondary = ItemData.getItemDeepCopy(1354040);
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

        // Primary Weapon: Basic Plum Sword (1215000)
        if (chr.getEquippedItemByBodyPart(BodyPart.Weapon) == null) {
            Item weapon = ItemData.getItemDeepCopy(1215000);
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
        if (level >= 100 && curJob < JobConstants.JobEnum.REN_4.getJobId()) {
            for (int qid = 36821; qid <= 36839; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            sm.completeQuestNoRewards(36840);
            sm.completeQuestNoRewards(36844);
            sm.setJob(JobConstants.JobEnum.REN_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.REN_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_4.getJobId(), 5);
            sm.giveAndEquip(1354043);
        } else if (level >= 60 && curJob < JobConstants.JobEnum.REN_3.getJobId()) {
            for (int qid = 36821; qid <= 36839; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            sm.completeQuestNoRewards(36840);
            sm.setJob(JobConstants.JobEnum.REN_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.REN_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_3.getJobId(), 3);
            sm.giveAndEquip(1354042);
        } else if (level >= 30 && curJob < JobConstants.JobEnum.REN_2.getJobId()) {
            for (int qid = 36821; qid <= 36839; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            sm.setJob(JobConstants.JobEnum.REN_2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.REN_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_2.getJobId(), 3);
            sm.giveAndEquip(1354041);
        }
    }

    @Override
    public int getFinalAttackSkill(int faSkill) {
        if (faSkill == SECOND_IMUGI_SPIRIT_SWORD_SERPENT_FANG) {
            if (chr.hasSkill(HEXA_SECOND_IMUGI_SPIRIT_SWORD_SERPENT_FANG)) return HEXA_SECOND_IMUGI_SPIRIT_SWORD_SERPENT_FANG;
        }
        return super.getFinalAttackSkill(faSkill);
    }

    @Override
    public int handleSetCoolDownSkill(int skillId) {
        switch (skillId) {
            case FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH,
                 FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_EFF,
                 FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_2,
                 HEXA_FINAL_IMUGI_SPIRIT_SWORD_BURROWING_EARTH,
                 HEXA_FINAL_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_2 -> {
                chr.addSkillCooldown(FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH, 20000);
                chr.addSkillCooldown(FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_EFF, 20000);
                chr.addSkillCooldown(FIRST_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_2, 20000);
                if (chr.hasSkill(HEXA_FINAL_IMUGI_SPIRIT_SWORD_BURROWING_EARTH)) {
                    chr.addSkillCooldown(HEXA_FINAL_IMUGI_SPIRIT_SWORD_BURROWING_EARTH, 20000);
                    chr.addSkillCooldown(HEXA_FINAL_IMUGI_SPIRIT_SWORD_BURROWING_EARTH_2, 20000);
                }
                return 1;
            }
            case WISH_UNENDING -> {
                chr.addSkillCooldown(WISH_UNENDING, 20000);
                return 1;
            }
            case RIOTOUS_HEART, HEXA_RIOTOUS_HEART -> {
                chr.addSkillCooldown(RIOTOUS_HEART, 10000);
                if (chr.hasSkill(HEXA_RIOTOUS_HEART)) {
                    chr.addSkillCooldown(HEXA_RIOTOUS_HEART, 10000);
                }
                return 1;
            }
            case HEARTS_UNITED, HEXA_HEARTS_UNITED -> {
                chr.addSkillCooldown(HEARTS_UNITED, 30000);
                if (chr.hasSkill(HEXA_HEARTS_UNITED)) {
                    chr.addSkillCooldown(HEXA_HEARTS_UNITED, 30000);
                }
                return 1;
            }
            case UNITY -> {
                chr.addSkillCooldown(UNITY, 1000);
                return 1;
            }
            case FOURTH_PLUM_BLOSSOM_SWORD_UNBOWED_BLADE, PLUM_BLOSSOM_SWORD_UNBOWED_BLADE -> {
                chr.addSkillCooldown(FOURTH_PLUM_BLOSSOM_SWORD_UNBOWED_BLADE, 70000);
                chr.addSkillCooldown(PLUM_BLOSSOM_SWORD_UNBOWED_BLADE, 70000);
                return 1;
            }
            case SUBLIMATION -> {
                chr.addSkillCooldown(SUBLIMATION, 120000);
                return 1;
            }
            case PLUM_BRANCH_SNARE -> {
                chr.addSkillCooldown(PLUM_BRANCH_SNARE, 120000);
                return 1;
            }
            case FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED, HEXA_FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED -> {
                chr.addSkillCooldown(FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED, 60000);
                if (chr.hasSkill(HEXA_FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED)) {
                    chr.addSkillCooldown(HEXA_FINAL_IMUGI_SPIRIT_SWORD_YEARS_UNCOUNTED, 60000);
                }
                return 1;
            }
            case THOUSAND_BLOSSOM_FLURRY, THOUSAND_BLOSSOM_FLURRY_EX, THOUSAND_BLOSSOM_FLURRY_ATOM -> {
                chr.addSkillCooldown(THOUSAND_BLOSSOM_FLURRY, 120000);
                chr.addSkillCooldown(THOUSAND_BLOSSOM_FLURRY_EX, 120000);
                chr.addSkillCooldown(THOUSAND_BLOSSOM_FLURRY_ATOM, 120000);
                return 1;
            }
            case SOUL_IMMEASURABLE, SOUL_IMMEASURABLE_ATT, SOUL_IMMEASURABLE_SPE -> {
                chr.addSkillCooldown(SOUL_IMMEASURABLE, 120000);
                chr.addSkillCooldown(SOUL_IMMEASURABLE_ATT, 120000);
                chr.addSkillCooldown(SOUL_IMMEASURABLE_SPE, 120000);
                return 1;
            }
            case DANCING_ANNIHILATION -> {
                chr.addSkillCooldown(DANCING_ANNIHILATION, 120000);
                return 1;
            }
            case FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART,
                 FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_2,
                 FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_ATT -> {
                chr.addSkillCooldown(FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART, 1000);
                chr.addSkillCooldown(FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_2, 1000);
                chr.addSkillCooldown(FINAL_IMUGI_SPIRIT_SWORD_BLADE_OF_THE_UNBOUND_HEART_ATT, 1000);
                return 1;
            }
            case DIVIDED_HEAVENS, DIVIDED_HEAVENS_FINISH -> {
                chr.addSkillCooldown(DIVIDED_HEAVENS, 360000);
                chr.addSkillCooldown(DIVIDED_HEAVENS_FINISH, 360000);
                return 1;
            }
            case HEARTBOUND_VERSE, HEARTBOUND_VERSE_FALLING_FLOWER,
                 HEARTBOUND_VERSE_CLIMBING_SERPENT, HEARTBOUND_VERSE_SOARING_DRAGON,
                 HEARTBOUND_VERSE_FALLING_FLOWER_ATT -> {
                chr.addSkillCooldown(HEARTBOUND_VERSE, 240000);
                chr.addSkillCooldown(HEARTBOUND_VERSE_FALLING_FLOWER, 240000);
                chr.addSkillCooldown(HEARTBOUND_VERSE_CLIMBING_SERPENT, 240000);
                chr.addSkillCooldown(HEARTBOUND_VERSE_SOARING_DRAGON, 240000);
                chr.addSkillCooldown(HEARTBOUND_VERSE_FALLING_FLOWER_ATT, 240000);
                return 1;
            }
        }
        return super.handleSetCoolDownSkill(skillId);
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        super.handleInitAfterMigrate(chr);

        // Clean up legacy phantom sub-skills from memory & SQL silently (do NOT send packet to client)
        int[] phantomSubSkills = new int[]{
            161141501, 161141502, 161141503, 161141504, 161141505, // HEXA sub-skills
            161141006, 161141008, 161141011, 161141012, 161141013,
            400011140, 400011141, 400011143, 400011145, 400011146,
            400011148, 400011149, 400011151, 400011152, 400011154, 400011155, 400011156 // V-Matrix sub-skills
        };
        for (int pSkill : phantomSubSkills) {
            chr.removeSkill(pSkill);
        }

        ScriptManagerImpl sm = chr.getScriptManager();
        short curJob = chr.getJob();
        if (chr.getLevel() >= 100 && curJob < JobConstants.JobEnum.REN_4.getJobId()) {
            for (int qid = 36821; qid <= 36839; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            sm.completeQuestNoRewards(36840);
            sm.completeQuestNoRewards(36844);
            sm.setJob(JobConstants.JobEnum.REN_4.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.REN_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_3.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_4.getJobId(), 5);
            sm.giveAndEquip(1354043);
        } else if (chr.getLevel() >= 60 && curJob < JobConstants.JobEnum.REN_3.getJobId()) {
            for (int qid = 36821; qid <= 36839; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            sm.completeQuestNoRewards(36840);
            sm.setJob(JobConstants.JobEnum.REN_3.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.REN_2.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_3.getJobId(), 3);
            sm.giveAndEquip(1354042);
        } else if (chr.getLevel() >= 30 && curJob < JobConstants.JobEnum.REN_2.getJobId()) {
            for (int qid = 36821; qid <= 36839; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            sm.setJob(JobConstants.JobEnum.REN_2.getJobId());
            sm.addSPJobAdv(JobConstants.JobEnum.REN_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.REN_2.getJobId(), 3);
            sm.giveAndEquip(1354041);
        }

        incrementRiotousHeart();
    }

    @Override
    public void handleShootObject(Char chr, ShootObjectSkillInfo sosi) {
        var skillId = sosi.getSkillId();
        var slv = sosi.getSlv();
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (skillId == RIOTOUS_HEART || skillId == HEXA_RIOTOUS_HEART) {
            Option o = new Option();
            byte val = tsm.hasStat(RenPlumSwordForm3Shoot) ? (byte) (tsm.getTotalNOptionOfStat(RenPlumSwordForm3Shoot) - 1) : 0;
            o.nOption = Math.max(0, val);
            o.rOption = skillId;
            if (o.nOption <= 0) {
                tsm.removeStat(RenPlumSwordForm3Shoot);
            } else {
                tsm.sendStat(RenPlumSwordForm3Shoot, o);
            }
        } else if (skillId == HEARTS_UNITED || skillId == HEXA_HEARTS_UNITED) {
            if (tsm.hasStat(RenPlumSwordForm3Shoot)) {
                incrementRiotousHeart();
                tsm.removeStat(RenPlumSwordForm3Shoot);
            }
        }
        super.handleShootObject(chr, sosi);
    }

    public void incrementRiotousHeart() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        if (chr.hasSkill(HEXA_RIOTOUS_HEART)) {
            o.nOption = 2;
            o.rOption = HEXA_RIOTOUS_HEART;
            tsm.sendStat(RenPlumSwordForm3Stack, o);
            chr.write(WvsContext.updateSkillStackRequestResult(HEXA_RIOTOUS_HEART, (byte) 1));
        } else if (chr.hasSkill(RIOTOUS_HEART)) {
            o.nOption = 2;
            o.rOption = RIOTOUS_HEART;
            tsm.sendStat(RenPlumSwordForm3Stack, o);
            chr.write(WvsContext.updateSkillStackRequestResult(RIOTOUS_HEART, (byte) 1));
        }
    }
}
