package net.swordie.ms.client.jobs.legend;

import net.swordie.ms.ServerConfig;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.quest.Quest;
import net.swordie.ms.client.character.skills.ForceAtom;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.*;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatBase;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.DragonPool;
import net.swordie.ms.connection.packet.FieldPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.constants.SkillConstants;
import net.swordie.ms.enums.*;
import net.swordie.ms.life.*;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.life.mob.MobStat;
import net.swordie.ms.life.mob.MobTemporaryStat;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Equip;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.FileTime;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Rect;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Field;

import java.util.EnumMap;
import java.util.List;

import static net.swordie.ms.enums.InvType.EQUIPPED;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;

/**
 * Created on 12/14/2017.
 */
public class Evan extends Job {

    public static final int INHERITED_WILL = 20010194;
    public static final int BACK_TO_NATURE = 20011293;

    public static final int MAGIC_GUARD = 22001012; // Buff

    public static final int MAGIC_BOOSTER = 22111020; // Buff
    public static final int ELEMENTAL_DECREASE = 22141016; // Buff
    public static final int PARTNERS = 22110016;

    public static final int MAGIC_DEBRIS = 22141017;

    public static final int MAPLE_WARRIOR_EVAN = 22171068; // Buff
    public static final int BLESSING_OF_THE_ONYX = 22171073;
    public static final int DRAGON_MASTER = 22171080; // Mount
    public static final int DRAGON_MASTER_ATTACK = 22171083; // Add-on
    public static final int SUMMON_ONYX_DRAGON = 22171081; // Summon
    public static final int HEROIC_MEMORIES_EVAN = 22171082;
    public static final int ENHANCED_MAGIC_DEBRIS = 22170070;
    public static final int HEROS_WILL_EVAN = 22171004;
    public static final int DRAGON_FURY = 22170074;

    //Returns
    public static final int RETURN_FLASH = 22110013; // Return after Wind Skills (Mob Debuff)
    public static final int RETURN_DIVE = 22140013; // Return Dive (Buff)
    public static final int RETURN_FLAME = 22170064; // Return Flame (Flame  AoE)
    public static final int RETURN_FLAME_TILE = 22170093; // Return Flames Tile

    //Evan Attacks
    public static final int MANA_BURST_I = 22001010;
    public static final int MANA_BURST_II = 22110010;
    public static final int MANA_BURST_III = 22140010;
    public static final int MANA_BURST_IV_1 = 22170060;
    public static final int MANA_BURST_IV_2 = 22170061;
    public static final int WIND_CIRCLE = 22111011;
    public static final int THUNDER_CIRCLE = 22141011;
    public static final int EARTH_CIRCLE = 22171062;
    public static final int DARK_FOG = 22171095;

    //Final Attack
    public static final int DRAGON_SPARK = 22000015;
    public static final int ADV_DRAGON_SPARK = 22110021;

    public static final int SPEEDY_DRAGON_FLASH = 22170084;
    public static final int SPEEDY_DRAGON_DIVE = 22170087;
    public static final int SPEEDY_DRAGON_BREATH = 22170090;

    // V Skills
    public static final int ELEMENTAL_BARRAGE = 400021012;
    public static final int DRAGON_SLAM = 400021046;
    public static final int WYRMKINGS_BREATH = 400020046;
    public static final int LUDICROUS_SPEED = 400020051;
    public static final int ELEMENTAL_RADIANCE = 400021073;
    public static final int SPIRAL_OF_MANA = 400021095;

    // HEXA Skills
    public static final int HEXA_DRAGON_SPARK = 22200016;
    public static final int HEXA_MAGIC_DEBRIS = 22201015;
    public static final int HEXA_DRAGON_FLASH = 22201003;
    public static final int HEXA_DRAGON_DIVE = 22201007;
    public static final int HEXA_DRAGON_BREATH = 22201011;
    public static final int DRAGON_BREATH = 22171063;
    public static final int ZODIAC_BURST = 22201500;
    public static final int ZODIAC_BURST_ATTACK = 22201501;
    public static final int UNITED_HORIZONS = 22201502;
    public static final int UNITED_HORIZONS_ATTACK = 22201503;
    public static final int ZODIAC_BURST_FINISHER = UNITED_HORIZONS; // alias
    public static final int ZODIAC_BURST_FINISHER_ATTACK = UNITED_HORIZONS_ATTACK; // alias
    public static final int HEXA_ELEMENTAL_BARRAGE = 500061041;

    private int prevSkill = 0;
    private Dragon dragon;

    private final int[] addedSkills = new int[]{
            INHERITED_WILL,
            BACK_TO_NATURE,};

    public Evan(Char chr) {
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

    public void spawnDragon() {
        Dragon dragon = getDragon();
        if (dragon == null || chr == null || chr.getField() == null) {
            return;
        }
        short dragonJob = chr.getJob();
        if (JobConstants.isEvan(dragonJob) && (chr.getLevel() >= 260 || chr.hasSkill(22201000) || chr.hasSkill(22201500) || (chr.getHexaSkills() != null && !chr.getHexaSkills().isEmpty()))) {
            dragonJob = 2220;
        }
        boolean jobChanged = (dragon.getJob() != dragonJob);
        dragon.setJob(dragonJob);
        dragon.resetToPlayer(chr.getPosition());
        Field currentField = chr.getField();
        if (dragon.getField() != null && dragon.getField() != currentField) {
            dragon.getField().removeLife(dragon.getObjectId(), false, false);
            dragon.setObjectId(-1);
        }
        if (currentField.getLifeByObjectID(dragon.getObjectId()) != null) {
            if (jobChanged) {
                currentField.removeLife(dragon.getObjectId(), false, true);
                dragon.setObjectId(-1);
                currentField.spawnLife(dragon, null);
            } else {
                chr.write(DragonPool.createDragon(dragon));
            }
        } else {
            dragon.setObjectId(-1);
            currentField.spawnLife(dragon, null);
        }
    }

    public int getEvanSkill(int skillID) {
        switch (skillID) {
            case MANA_BURST_I:
            case MANA_BURST_II:
            case MANA_BURST_III:
            case MANA_BURST_IV_1:
            case MANA_BURST_IV_2:
            case 22201000: // HEXA Mana Burst
            case 22201001:
            case WIND_CIRCLE:
            case 22201010: // HEXA Wind Circle
            case THUNDER_CIRCLE:
            case 22201002: // HEXA Thunder Circle
            case EARTH_CIRCLE:
            case 22201006: // HEXA Earth Circle
            case DARK_FOG:
                return 1;

        }
        return skillID;
    }

    @Override
    public boolean isHandlerOfJob(short id) {
        return JobConstants.isEvan(id);
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
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
        handleDragonSkillEffect(attackInfo, skillID);
        if (skillID == ZODIAC_BURST || skillID == ZODIAC_BURST_ATTACK) {
            if (!chr.hasSkillOnCooldown(ZODIAC_BURST)) {
                chr.addSkillCooldown(ZODIAC_BURST, 360 * 1000);
            }
        } else if (skillID == UNITED_HORIZONS || skillID == UNITED_HORIZONS_ATTACK) {
            if (!chr.hasSkillOnCooldown(UNITED_HORIZONS)) {
                chr.addSkillCooldown(UNITED_HORIZONS, 240 * 1000);
            }
        }
        if (hasHitMobs) {
            if (skillID == ZODIAC_BURST || skillID == ZODIAC_BURST_ATTACK || skillID == UNITED_HORIZONS || skillID == UNITED_HORIZONS_ATTACK) {
                Option oOrigin1 = new Option();
                Option oOrigin2 = new Option();
                oOrigin1.nOption = 1;
                oOrigin1.rOption = skillID;
                oOrigin1.tOption = 10;
                oOrigin2.nOption = 1;
                oOrigin2.rOption = skillID;
                oOrigin2.tOption = 20;
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (mob == null || mob.getHp() <= 0) {
                        continue;
                    }
                    EnumMap<MobStat, Option> originStats = new EnumMap<>(MobStat.class);
                    originStats.put(MobStat.Freeze, oOrigin1);
                    originStats.put(MobStat.OriginDebuff, oOrigin2);
                    mob.getTemporaryStat().addStatOptions(mob, originStats);
                }
            }
            // Partners
            if (getEvanSkill(skillID) != 1) {
                givePartnersBuff(skillID);
            }
            if (chr.hasSkill(MAGIC_DEBRIS) || chr.hasSkill(ENHANCED_MAGIC_DEBRIS) || chr.hasSkill(HEXA_MAGIC_DEBRIS)) {
                createWreckage(attackInfo, skillID);
            }
            boolean isElementalBarrage = skillID == ELEMENTAL_BARRAGE || (skillID >= 400021013 && skillID <= 400021015);
            boolean isHexaElementalBarrage = skillID == HEXA_ELEMENTAL_BARRAGE || (skillID >= 500061042 && skillID <= 500061045);
            if (isElementalBarrage || isHexaElementalBarrage) {
                int rootSkill = isHexaElementalBarrage ? HEXA_ELEMENTAL_BARRAGE : ELEMENTAL_BARRAGE;
                if (!chr.hasSkillOnCooldown(rootSkill)) {
                    int slv2 = Math.max(1, chr.getSkillLevel(rootSkill));
                    chr.setSkillCooldown(rootSkill, slv2);
                }
                Option o1 = new Option();
                Option o2 = new Option();
                si = SkillData.getSkillInfoById(rootSkill);
                if (si == null) {
                    si = SkillData.getSkillInfoById(ELEMENTAL_BARRAGE);
                }
                int yValue = si != null ? si.getValue(y, slv) : 0;
                int hitCount = 1;
                if (skillID == 400021015 || skillID == 500061045) hitCount = 4;
                else if (skillID == 400021014 || skillID == 500061044) hitCount = 3;
                else if (skillID == 400021013 || skillID == 500061043) hitCount = 2;
                int RealValue = yValue * hitCount;
                if (skillID == ELEMENTAL_BARRAGE || skillID == HEXA_ELEMENTAL_BARRAGE) {
                    o1.nReason = isHexaElementalBarrage ? 500061045 : 400021015;
                    o1.nValue = si != null ? si.getValue(cr, slv) : 0;
                    o1.tTerm = 10;
                    tsm.sendStat(IndieCrR, o1);
                    o2.nReason = isHexaElementalBarrage ? 500061045 : 400021015;
                    o2.nValue = RealValue;
                    o2.tTerm = 10;
                    tsm.sendStat(IndieDamR, o2);
                }
            }
        }
        switch (attackInfo.skillId) {
            case DRAGON_MASTER_ATTACK:
                if (!tsm.hasStat(CharacterTemporaryStat.NewFlying)) {
                    tsm.removeStatsBySkill(Evan.DRAGON_MASTER);
                }
                break;
        }
    }

    public void givePartnersBuff(int skillID) {
        if (!chr.hasSkill(PARTNERS)) {
            return;
        }
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        SkillInfo si = SkillData.getSkillInfoById(PARTNERS);
        if (si == null) {
            return;
        }
        if (tsm.getOptByCTSAndSkill(Stance, PARTNERS) == null) {
            EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
            Option o1 = new Option();
            Option o2 = new Option();
            prevSkill = skillID;
            o1.nReason = PARTNERS;
            o1.nValue = si.getValue(indieDamR, 1);
            o1.tTerm = 3;
            newStats.put(IndieDamR, o1);
            o2.nOption = si.getValue(stanceProp, 1);
            o2.rOption = PARTNERS;
            o2.tOption = 3;
            newStats.put(Stance, o2);
            tsm.sendStat(newStats);
        }
    }

    private void createMagicDebrisForceAtom() {
        Field field = chr.getField();
        SkillInfo si = SkillData.getSkillInfoById(getDebrisSkill());
        if (si == null || si.getFirstRect() == null) {
            return;
        }
        Rect rect = chr.getPosition().getRectAround(si.getFirstRect());
        if (!chr.isLeft()) {
            rect = rect.horizontalFlipAround(chr.getPosition().getX());
        }
        List<Mob> lifes = field.getMobsInRect(rect);
        if (lifes.size() <= 0) {
            return;
        }
        for (Wreckage wreckage : field.getWreckageByChrId(chr.getId())) {
            if (wreckage.getField() != chr.getField()) {
                continue;
            }
            Life life = Util.getRandomFromCollection(lifes);
            int mobID = (life).getObjectId();
            ForceAtomEnum fae = ForceAtomEnum.WRECKAGE;
            if (chr.hasSkill(ENHANCED_MAGIC_DEBRIS) || chr.hasSkill(HEXA_MAGIC_DEBRIS)) {
                fae = ForceAtomEnum.ADV_WRECKAGE;
            }
            ForceAtomInfo forceAtomInfo = new ForceAtomInfo(chr.getNewForceAtomKey(), fae.getInc(), 15, 10,
                    0, 200, Util.getCurrentTime(), 1, 0,
                    wreckage.getPosition());
            chr.createForceAtom(new ForceAtom(false, 0, chr.getId(), fae,
                    true, mobID, getDebrisSkill(), forceAtomInfo, new Rect(), 0, 300,
                    life.getPosition(), getDebrisSkill(), life.getPosition(), 0));
        }
        chr.write(FieldPacket.delWreckage(chr, field.getWreckageByChrId(chr.getId())));
    }

    private void createWreckage(AttackInfo attackInfo, int skillID) {
        if (SkillConstants.isEvanFusionSkill(skillID) && (skillID != MAGIC_DEBRIS && skillID != ENHANCED_MAGIC_DEBRIS && skillID != HEXA_MAGIC_DEBRIS)) {
            if (chr.getField().getWreckage().size() < getMaxDebris()) {
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (mob == null || mob.getHp() <= 0) {
                        continue;
                    }
                    final Position pos = mob.getPosition();
                    Wreckage wreckage = Wreckage.getWreckageBy(chr, getDebrisSkill(), pos, 30000, 1);
                    chr.getField().spawnWreckage(chr, wreckage);
                }
            }
        }
    }

    private int getMaxDebris() {
        Skill skill = null;
        if (chr.hasSkill(MAGIC_DEBRIS)) {
            skill = chr.getSkill(MAGIC_DEBRIS);
        }
        if (chr.hasSkill(ENHANCED_MAGIC_DEBRIS)) {
            skill = chr.getSkill(ENHANCED_MAGIC_DEBRIS);
        }
        if (chr.hasSkill(HEXA_MAGIC_DEBRIS)) {
            skill = chr.getSkill(HEXA_MAGIC_DEBRIS);
        }
        if (skill == null) {
            return 0;
        }
        SkillInfo si = SkillData.getSkillInfoById(skill.getSkillId());
        int slv = skill.getCurrentLevel();
        return si.getValue(x, slv);
    }

    private int getDebrisSkill() {
        int skill = 0;
        if (chr.hasSkill(MAGIC_DEBRIS)) {
            skill = MAGIC_DEBRIS;
        }
        if (chr.hasSkill(ENHANCED_MAGIC_DEBRIS)) {
            skill = ENHANCED_MAGIC_DEBRIS;
        }
        if (chr.hasSkill(HEXA_MAGIC_DEBRIS)) {
            skill = HEXA_MAGIC_DEBRIS;
        }
        return skill;
    }

    private void handleDragonSkillEffect(AttackInfo attackInfo, int skillID) {
        // Hacky Way:
        switch (skillID) {
            case 22110013:
                attackInfo.attackActionType = 2;
                break;
            case 22110023:
            case 22201003: // HEXA Dragon Flash
                attackInfo.attackActionType = 3;
                break;
            case 22110025:
            case 22201005: // HEXA Wind Flash
                attackInfo.attackActionType = 4;
                break;
            case 22140023:
            case 22201007: // HEXA Dragon Dive
                attackInfo.attackActionType = 5;
                break;
            case 22140022:
            case 22200009: // HEXA Thunder Dive
                attackInfo.attackActionType = 6;
                break;
            case 22140015:
            case 22200008: // HEXA Earth Dive
                attackInfo.attackActionType = 7;
                break;
            case 22170067:
            case 22200014: // HEXA Wind Breath
                attackInfo.attackActionType = 8;
                break;
            case 22171063:
            case 22201011: // HEXA Dragon Breath
                attackInfo.attackActionType = 9;
                break;
            case 22110014:
            case 22201004: // HEXA Thunder Flash
                attackInfo.attackActionType = 10;
                break;
            case 22170066:
            case 22200012: // HEXA Earth Breath
            case 22200013:
                attackInfo.attackActionType = 11;
                break;
        }
    }

    @Override
    public int getFinalAttackSkill(int faSkill) {
        if (faSkill == DRAGON_SPARK) {
            if (chr.hasSkill(HEXA_DRAGON_SPARK)) return HEXA_DRAGON_SPARK;
            if (chr.hasSkill(ADV_DRAGON_SPARK)) return ADV_DRAGON_SPARK;
        }
        return super.getFinalAttackSkill(faSkill);
    }

    public Dragon getDragon() {
        if (dragon == null && chr.getJob() != JobConstants.JobEnum.EVAN_NOOB.getJobId()) {
            dragon = new Dragon(chr);
        }
        if (dragon != null) {
            short dragonJob = chr.getJob();
            if (JobConstants.isEvan(dragonJob) && (chr.getLevel() >= 260 || chr.hasSkill(22201000) || chr.hasSkill(22201500) || (chr.getHexaSkills() != null && !chr.getHexaSkills().isEmpty()))) {
                dragonJob = 2220;
            }
            dragon.setJob(dragonJob);
        }
        return dragon;
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
        switch (skillID) {
            case MAGIC_GUARD:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                tsm.sendStat(MagicGuard, o1);
                break;
            case MAGIC_BOOSTER:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(Booster, o1);
                break;
            case MAPLE_WARRIOR_EVAN:
                o1.nReason = skillID;
                o1.nValue = si.getValue(x, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(BasicStatUp, o1);
                break;
            case RETURN_DIVE:
                o1.nReason = skillID;
                o1.nValue = si.getValue(x, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieBooster, o1);
                break;
            case ELEMENTAL_DECREASE:
                o1.nOption = si.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                tsm.sendStat(ElementalReset, o1);
                break;
            case BLESSING_OF_THE_ONYX:
                o1.nOption = si.getValue(emad, slv);
                o1.rOption = skillID;
                o1.tOption = si.getValue(time, slv);
                newStats.put(EMAD, o1);
                o2.nOption = si.getValue(epdd, slv);
                o2.rOption = skillID;
                o2.tOption = si.getValue(time, slv);
                newStats.put(EPDD, o2);
                tsm.sendStat(newStats);
                break;
            case HEROIC_MEMORIES_EVAN:
                o1.nReason = skillID;
                o1.nValue = si.getValue(indieDamR, slv);
                o1.tTerm = si.getValue(time, slv);
                tsm.sendStat(IndieDamR, o1);
                break;
            case SUMMON_ONYX_DRAGON:
                Summon summon = Summon.getSummonByAndSetStat(c.getChr(), skillID, slv);
                summon.setFlyMob(true);
                summon.setMoveAbility(MoveAbility.Stop);
                chr.getField().spawnSummon(summon);
                break;
            case DRAGON_MASTER:
                TemporaryStatBase tsb = tsm.getTSBByTSIndex(TSIndex.RideVehicleExpire);
                tsb.setNOption(1939007);
                tsb.setROption(skillID);
                tsb.setExpireTerm(10);
                tsm.sendStat(RideVehicleExpire, tsb.getOption());
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 1;
                tsm.sendStat(NotDamaged, o1);
                o2.nOption = 1;
                o2.rOption = skillID;
                o2.tOption = 10;
                tsm.sendStat(NewFlying, o2);
                break;
            case BACK_TO_NATURE:
                Field toField = chr.getOrCreateFieldByCurrentInstanceType(si.getValue(x, slv));
                chr.warp(toField);
                break;
            case RETURN_FLAME:
                SkillInfo rft = SkillData.getSkillInfoById(RETURN_FLAME_TILE);
                AffectedArea aa = AffectedArea.getPassiveAA(chr, RETURN_FLAME_TILE, slv);
                aa.setMobOrigin((byte) 0);
                aa.setPosition(chr.getPosition());
                aa.setRect(aa.getPosition().getRectAround(rft.getRects().get(0)));
                chr.getField().spawnAffectedArea(aa);
                break;
            case RETURN_FLASH:
                SkillInfo rflash = SkillData.getSkillInfoById(RETURN_FLASH);
                Rect rect = new Rect( //Skill itself doesn't give a Rect
                        new Position(
                                chr.getPosition().deepCopy().getX() - 300,
                                chr.getPosition().deepCopy().getY() - 300),
                        new Position(
                                chr.getPosition().deepCopy().getX() + 300,
                                chr.getPosition().deepCopy().getY() + 300)
                );
                o1.nOption = rflash.getValue(x, slv);
                o1.rOption = skillID;
                o1.tOption = rflash.getValue(time, slv);
                for (Life life : chr.getField().getLifesInRect(rect)) {
                    if (life instanceof Mob mob) {
                        if (mob == null || mob.getHp() <= 0) {
                            continue;
                        }
                        if (mob.getHp() > 0) {
                            MobTemporaryStat mts = mob.getTemporaryStat();
                            mts.addStatOptions(mob, MobStat.TotalDamParty, o1.deepCopy());
                        }
                    }
                }
                break;
            case MAGIC_DEBRIS:
            case ENHANCED_MAGIC_DEBRIS:
            case HEXA_MAGIC_DEBRIS:
                createMagicDebrisForceAtom();
                break;
            case ZODIAC_BURST:
                if (chr.hasSkillOnCooldown(ZODIAC_BURST)) {
                    return;
                }
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 7;
                tsm.sendStat(IndieNotDamaged, o1);
                chr.getField().broadcast(UserLocal.showHexaSkillEff(chr));
                chr.addSkillCooldown(ZODIAC_BURST, 360 * 1000);
                break;
            case UNITED_HORIZONS:
                if (chr.hasSkillOnCooldown(UNITED_HORIZONS)) {
                    return;
                }
                o1.nOption = 1;
                o1.rOption = skillID;
                o1.tOption = 5;
                tsm.sendStat(IndieNotDamaged, o1);
                chr.getField().broadcast(UserLocal.showHexaSkillEff(chr));
                chr.addSkillCooldown(UNITED_HORIZONS, 240 * 1000);
                break;
            case HEROS_WILL_EVAN:
                tsm.removeAllDebuffs();
                break;
        }
    }

    // Hit related methods ---------------------------------------------------------------------------------------------
    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (tsm.hasStat(MagicGuard)) {
            Skill skill = chr.getSkill(MAGIC_GUARD);
            SkillInfo si = SkillData.getSkillInfoById(MAGIC_GUARD);
            int dmgPerc = si.getValue(x, skill.getCurrentLevel());
            int dmg = hitInfo.hpDamage;
            int mpDmg = (int) (dmg * (dmgPerc / 100D));
            mpDmg = chr.getStat(Stat.mp) - mpDmg < 0 ? chr.getStat(Stat.mp) : mpDmg;
            hitInfo.hpDamage = dmg - mpDmg;
            hitInfo.mpDamage = mpDmg;
        }
        super.handleHit(c, inPacket, hitInfo);
    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(100030100); // Utah's House - Small Attic (จุดเกิดดั้งเดิมของ Evan)
        cs.setJob(JobConstants.JobEnum.EVAN1.getJobId()); // 2210 (Evan 1st Job)
        cs.setLevel(10);
        cs.setStr(4);
        cs.setDex(4);
        cs.setInt(45);
        cs.setLuk(4);
        cs.setHp(1000);
        cs.setMaxHp(1000);
        cs.setMp(500);
        cs.setMaxMp(500);
        cs.getExtendSP().addSpToJobLevel(1, 5);
        chr.getAvatarData().getAvatarLook().setJob(JobConstants.JobEnum.EVAN1.getJobId());
        // ปลดล็อคเควสต์บทนำฟาร์มล่วงหน้าเพื่อป้องกันบั๊กเควสต์ที่ไม่มีไฟล์สคริปต์
        for (int qid = 22000; qid <= 22015; qid++) {
            Quest q = new Quest(chr.getId(), qid, QuestStatus.Completed);
            q.setCompletedTime(FileTime.currentTime());
            chr.getQuests().put(qid, q);
        }
        // ปลดล็อคเควสต์กำเนิดมังกร 1st Job (22100) เพื่อให้ Mir ฟักออกจากไข่ในหน้าต่าง UI ทันที
        Quest qMir = new Quest(chr.getId(), 22100, QuestStatus.Completed);
        qMir.setCompletedTime(FileTime.currentTime());
        chr.getQuests().put(22100, qMir);
    }

    @Override
    public void addItemToNewCharacter(Char chr) {
        super.addItemToNewCharacter(chr);
        Equip weapon = ItemData.getEquipDeepCopyFromID(1382000, false); // Staff
        if (weapon != null) {
            chr.addItemToInventoryToNewCharacter(EQUIPPED, weapon, true);
            weapon.setInventoryID(chr.getInventoryByType(EQUIPPED).getId());
            weapon.setCharID(chr.getId());
            weapon.setInvType(EQUIPPED);
            weapon.setBagIndex(BodyPart.Weapon.getVal());
            weapon.saveToSQL();
        }
        Item secondary = ItemData.getItemDeepCopy(1352940); // Dragon Master's Document
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
        spawnDragon();
        super.handleInitAfterMigrate(chr);
    }

    @Override
    public void handleLevelUp(short level) {
        super.handleLevelUp(level);
        switch (level) {
            case 10:
                chr.setJob(2210);
                chr.setStatAndSendPacket(Stat.job, 2210);
                chr.addSpToSpecificJob((short) 2210, 3);
                spawnDragon();
                break;
            case 20: {
                String message = "You really know how to fight, Master!";
                chr.write(UserLocal.addPopupSay(1013208, 6000, message, "FarmSE.img/boxResult"));
                break;
            }
            case 30:
                chr.setJob(2212);
                chr.setStatAndSendPacket(Stat.job, 2212);
                chr.addSpToSpecificJob((short) 2210, 2);
                chr.addSpToSpecificJob((short) 2212, 3);
                spawnDragon();
                break;
            case 50: {
                String message = "If I focus my attacks on one area while you attack a different area, we should be able " +
                        "to defeat more enemies. But if we're fighting a stronger enemy, we should be definitely";
                chr.write(UserLocal.addPopupSay(1013208, 6000, message, "FarmSE.img/boxResult"));
                break;
            }
            case 60:
                chr.setJob(2214);
                chr.setStatAndSendPacket(Stat.job, 2214);
                chr.addSpToSpecificJob((short) 2212, 1);
                chr.addSpToSpecificJob((short) 2214, 3);
                spawnDragon();
                break;
            case 70: {
                String message = "Master! Thunder Flash will attack five different spots!";
                chr.write(UserLocal.addPopupSay(1013208, 3000, message, "FarmSE.img/boxResult"));
                String message2 = "If you use it on a big enemy, it'll do more damage than any of my other skills.";
                chr.write(UserLocal.addPopupSay(1013208, 3000, message2, "FarmSE.img/boxResult"));
                break;
            }
            case 90: {
                String message = "Guess what, Mir? I've heard that weapons and armor made from Dragon leather have " +
                        "been selling for pretty high prices recently....";
                chr.write(UserLocal.addPopupSay(0, 3000, message, "FarmSE.img/boxResult"));
                String message2 = "Wait, wh-what do you mean, M-Master...";
                chr.write(UserLocal.addPopupSay(1013208, 3000, message2, "FarmSE.img/boxResult"));
                String message3 = "Hah! Gotcha.";
                chr.write(UserLocal.addPopupSay(0, 3000, message3, "FarmSE.img/boxResult"));
                String message4 = "Hey! Don't scare me like that!";
                chr.write(UserLocal.addPopupSay(1013208, 3000, message4, "FarmSE.img/boxResult"));
                String message5 = "Heh. Well, if anything ever happens to you, I'll be sure not to leave you behind!";
                chr.write(UserLocal.addPopupSay(0, 3000, message5, "FarmSE.img/boxResult"));
                String message6 = ".....";
                chr.write(UserLocal.addPopupSay(1013208, 3000, message6, "FarmSE.img/boxResult"));
                break;
            }
            case 100:
                chr.setJob(2217);
                chr.setStatAndSendPacket(Stat.job, 2217);
                chr.addSpToSpecificJob((short) 2214, 2);
                chr.addSpToSpecificJob((short) 2217, 3);
                spawnDragon();
                break;
            case 200: {
                String message = "L.V 200...This is amazing, Master! I'm really starting to feel stronger!";
                chr.write(UserLocal.addPopupSay(1013208, 6000, message, "FarmSE.img/boxResult"));
                break;
            }
            case 260:
                spawnDragon();
                break;
        }
    }


    @Override
    public void handleRemoveCTS(CharacterTemporaryStat cts, List<Option> options) {
        if (cts == RideVehicleExpire) {
            spawnDragon();
        }
        super.handleRemoveCTS(cts, options);
    }

    @Override
    public int handleSetCoolDownSkill(int skillId) {
        switch (skillId) {
            case 22140022, 22141012 -> { // Dragon Dive
                chr.setSkillCooldown(22140022, chr.getSkillLevel(22141012));
                chr.setSkillCooldown(22141012, chr.getSkillLevel(22141012));
                return 1;
            }
            case HEXA_DRAGON_DIVE, 22201008, 22201009 -> { // HEXA Dragon Dive
                chr.setSkillCooldown(HEXA_DRAGON_DIVE, chr.getSkillLevel(HEXA_DRAGON_DIVE));
                return 1;
            }
            case 22110023, 22110022, 22111012 -> { // Dragon Flash
                chr.setSkillCooldown(22110023, chr.getSkillLevel(22111012));
                chr.setSkillCooldown(22110022, chr.getSkillLevel(22111012));
                chr.setSkillCooldown(22111012, chr.getSkillLevel(22111012));
                return 1;
            }
            case HEXA_DRAGON_FLASH, 22201004, 22201005 -> { // HEXA Dragon Flash
                chr.setSkillCooldown(HEXA_DRAGON_FLASH, chr.getSkillLevel(HEXA_DRAGON_FLASH));
                return 1;
            }
            case DRAGON_BREATH -> { // Dragon Breath
                chr.setSkillCooldown(DRAGON_BREATH, chr.getSkillLevel(DRAGON_BREATH));
                return 1;
            }
            case HEXA_DRAGON_BREATH, 22201012, 22201013, 22201014 -> { // HEXA Dragon Breath
                chr.setSkillCooldown(HEXA_DRAGON_BREATH, chr.getSkillLevel(HEXA_DRAGON_BREATH));
                return 1;
            }
            case DARK_FOG -> {
                chr.setSkillCooldown(DARK_FOG, chr.getSkillLevel(DARK_FOG));
                return 1;
            }
            case DRAGON_MASTER -> {
                chr.setSkillCooldown(DRAGON_MASTER, chr.getSkillLevel(DRAGON_MASTER));
                return 1;
            }
            case SUMMON_ONYX_DRAGON -> {
                chr.setSkillCooldown(SUMMON_ONYX_DRAGON, chr.getSkillLevel(SUMMON_ONYX_DRAGON));
                return 1;
            }
            case HEROIC_MEMORIES_EVAN -> {
                chr.setSkillCooldown(HEROIC_MEMORIES_EVAN, chr.getSkillLevel(HEROIC_MEMORIES_EVAN));
                return 1;
            }
            case ELEMENTAL_BARRAGE, 400021013, 400021014, 400021015,
                 HEXA_ELEMENTAL_BARRAGE, 500061042, 500061043, 500061044, 500061045 -> {
                int cdSkill = chr.hasSkill(HEXA_ELEMENTAL_BARRAGE) ? HEXA_ELEMENTAL_BARRAGE : ELEMENTAL_BARRAGE;
                int slv = Math.max(1, chr.getSkillLevel(cdSkill));
                chr.setSkillCooldown(cdSkill, slv);
                return 1;
            }
            case DRAGON_SLAM -> {
                chr.setSkillCooldown(DRAGON_SLAM, chr.getSkillLevel(DRAGON_SLAM));
                return 1;
            }
            case WYRMKINGS_BREATH -> {
                chr.setSkillCooldown(WYRMKINGS_BREATH, chr.getSkillLevel(WYRMKINGS_BREATH));
                return 1;
            }
            case ELEMENTAL_RADIANCE -> {
                chr.setSkillCooldown(ELEMENTAL_RADIANCE, chr.getSkillLevel(ELEMENTAL_RADIANCE));
                return 1;
            }
            case SPIRAL_OF_MANA -> {
                chr.setSkillCooldown(SPIRAL_OF_MANA, chr.getSkillLevel(SPIRAL_OF_MANA));
                return 1;
            }
            case ZODIAC_BURST, ZODIAC_BURST_ATTACK -> {
                chr.addSkillCooldown(ZODIAC_BURST, 360 * 1000);
                return 1;
            }
            case UNITED_HORIZONS, UNITED_HORIZONS_ATTACK -> {
                chr.addSkillCooldown(UNITED_HORIZONS, 240 * 1000);
                return 1;
            }
        }
        return super.handleSetCoolDownSkill(skillId);
    }
}
