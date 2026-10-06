package net.swordie.ms.client.jobs.flora;

import it.unimi.dsi.fastutil.ints.Int2IntOpenHashMap;
import net.swordie.ms.client.Client;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.CharacterStat;
import net.swordie.ms.client.character.info.HitInfo;
import net.swordie.ms.client.character.items.BodyPart;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.SecondAtom;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.SkillStat;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.MobAttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatBase;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.client.jobs.adventurer.archer.Pathfinder;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.SecondAtomPacket;
import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.FieldConstants;
import net.swordie.ms.constants.JobConstants;
import net.swordie.ms.enums.*;
import net.swordie.ms.handlers.GlobalTimerManager;
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
import net.swordie.ms.util.container.Tuple;
import net.swordie.ms.world.field.Field;

import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;
import static net.swordie.ms.enums.InvType.EQUIPPED;

public class Adele extends Job {

    // Constants
    public static final int ETHER_CRYSTAL_COUNT = 7; // Max Ether Crystals on Field
    public static final int ETHER_SWORD_COST = 100; // 100 Ether -> 1 Sword
    public static final int ETHER_GAIN_PASSIVE_INTERVAL = 10000; // 10 seconds

    // Beginner
    public static final int ARTISTIC_RECALL = 150021000;
    public static final int MAGIC_CONVERSION = 150000079;
    public static final int RECALLING_GREATNESS = 150020006; // TODO: Level this up periodically

    // First Job
    public static final int MAGIC_DISPATCH = 151001001;
    public static final int AETHER_CRYSTAL = 151100002;
    public static final int HIGH_RISE = 151001004;

    // Second Job
    public static final int AETHER_WEAVING = 151100017;
    public static final int SKEWERING = 151101000;
    public static final int IMPALE = 151101001;
    public static final int RESONANCE_RUSH = 151101003;
    public static final int RESONANCE_RUSH_1 = 151101004;
    public static final int RESONANCE_RUSH_2 = 151101010;
    public static final int WEAVE_INFUSION = 151101005;
    public static final int AETHER_FORGE = 151101006;
    public static final int AETHER_FORGE_1 = 151101007;
    public static final int AETHER_FORGE_2 = 151101008;
    public static final int AETHER_FORGE_3 = 151101009;
    public static final int AETHERIAL_ARMS = 151101013;

    // Third Job
    public static final int EVISCERATE = 151111000;
    public static final int REIGN_OF_DESTRUCTION = 151111001;
    public static final int NOBLE_SUMMONS = 151111002;
    public static final int HUNTING_DECREE = 151111003;
    public static final int FEATHER_FLOAT = 151111004;
    public static final int TRUE_NOBILITY = 151111005;

    // Forth Job
    public static final int AETHER_MASTERY = 151120012;

    public static final int CLEAVE = 151121000;
    public static final int GRAVE_PROCLAMATION = 151121001;
    public static final int PLUMMET = 151121002;
    public static final int AETHER_BLOOM = 151121003;
    public static final int AETHER_GUARD = 151121004;
    public static final int AETHER_GUARD_PERSIST = 151120039;
    public static final int HERO_OF_THE_FLORA = 151121005;
    public static final int FLORAN_HEROS_WILL = 151121006;

    // Hyper Skills
    public static final int BLADE_TORRENT = 151121040;
    public static final int SHARDBREAKER = 151121041;
    public static final int DIVINE_WRATH = 151121042;

    // V Skills
    public static final int RUIN = 400011105;
    public static final int INFINITY_BLADE = 400011108;
    public static final int LEGACY_RESTORATION = 400011109; // party buffs
    public static final int STORM = 400011136;

    // HEXA Skills
    public static final int HEXA_CLEAVE = 151141000;
    public static final int HEXA_ENHANCED_CLEAVE = 151141001; // CD 6s
    public static final int HEXA_MAGIC_DISPATCH = 151141002; // CD 6s
    public static final int HEXA_AETHERIAL_ARMS = 151141003;
    public static final int HEXA_HUNTING_DECREE = 151141004;
    public static final int HEXA_PLUMMET = 151141005;
    public static final int HEXA_IMPALE = 151141010;
    public static final int HEXA_RESONANCE_RUSH = 151141011;
    public static final int HEXA_RESONANCE_RUSH_1 = 151141012;
    public static final int HEXA_RESONANCE_RUSH_2 = 151141013;
    public static final int HEXA_NOBLE_SUMMONS = 151141014;
    public static final int HEXA_AETHER_BLOOM = 151141016;
    public static final int HEXA_AETHER_FORGE = 151141006;
    public static final int HEXA_AETHER_FORGE_1 = 151141007;
    public static final int HEXA_AETHER_FORGE_2 = 151141008;
    public static final int HEXA_AETHER_FORGE_3 = 151141009;
    public static final int HEXA_REIGN_OF_DESTRUCTION = 151141015;
    public static final int HEXA_SHARDBREAKER = 151141017;

    // HEXA Boosts
    public static final int HEXA_LEGACY_RESTORATION = 500061065; // party buffs

    private List<SecondAtom> capeAtoms = new ArrayList<>();
    private List<SecondAtom> huntingDecreeList = new ArrayList<>();
    private List<Summon> summonList = new ArrayList<>();
    private int capeCounter = 0;
    private ScheduledFuture<?> legacyRestorationTimer;
    private static final Rect MAGIC_DISPATCH_RECT = new Rect(-600, -600, 600, 600);
    private static final Rect INFINITY_BLADE_RECT = new Rect(-1200, -1200, 1200, 1200);

    private boolean isTriggerSkill(int skillID) {
        return switch (skillID) {
            case SKEWERING, EVISCERATE, CLEAVE, HEXA_CLEAVE, PLUMMET, HEXA_PLUMMET -> true;
            default -> false;
        };
    }

    private static final int[] addedSkills = new int[]{
            RECALLING_GREATNESS
    };

    public Adele(Char chr) {
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
        return JobConstants.isAdele(id);
    }

    public void autoModifyAether() {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int delta = tsm.hasStat(LefWarriorNobility) ? 40 : 15;
        int currentEnergy = tsm.getOption(LWSwordGauge).nOption;
        updateAether(currentEnergy + delta);
    }

    private int getAether() {
        if (chr == null || chr.getField() == null) {
            return 0;
        }
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        return tsm.getOption(LWSwordGauge).nOption;
    }

    public int getAetherSwords() {
        return getAether() / ETHER_SWORD_COST;
    }

    private void modifyAether(int change) {
        if (chr == null || chr.getField() == null) {
            return;
        }
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (!tsm.hasStat(LWCreation)) {
            return;
        }
        int currentEnergy = tsm.getOption(LWSwordGauge).nOption;
        updateAether(currentEnergy + change);
    }

    private void updateAether(int aether) {
        int maxAether = 300;
        if (chr.hasSkill(AETHER_MASTERY)) {
            maxAether = 400;
        }
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o = new Option();
        o.nOption = (aether > maxAether ? maxAether : (Math.max(aether, 0)));
        o.rOption = 15002;
        tsm.sendStat(LWSwordGauge, o);
        chr.write(WvsContext.updateSkillStackRequestResult(AETHER_WEAVING, (byte) o.nOption));
    }

    // Attack related methods ------------------------------------------------------------------------------------------
    @Override
    public void handleDebuffOnMob(Client c, Mob mob, SkillInfo si, int skillID, int slv, long damage) {
        Char chr = c.getChr();
        Option o1 = new Option();
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        MobTemporaryStat mts = mob.getTemporaryStat();
        switch (skillID) {
            case BLADE_TORRENT:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(SkillStat.time, slv);
                    mts.addStatOptions(mob, MobStat.Stun, o1);
                }
                break;
            case GRAVE_PROCLAMATION:
                TemporaryStatBase tsb = tsm.getTSBByTSIndex(TSIndex.SecondAtomLockOn);
                tsb.setNOption(1);
                tsb.setROption(skillID);
                tsb.setXOption(mob.getObjectId());
                tsb.setYOption(skillID);
                tsb.setExpireTerm(1080);
                tsm.sendStat(SecondAtomLockOn, tsb.getOption());
                break;
            case NOBLE_SUMMONS:
            case HEXA_NOBLE_SUMMONS:
                if (!mts.hasCurrentMobStatBySkillId(skillID)) {
                    o1.nOption = 10; // x
                    o1.rOption = skillID;
                    o1.tOption = 60; // q2
                    o1.xOption = chr.getId();
                    mts.addStatOptions(mob, MobStat.LWGathering, o1);
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
        Option o2 = new Option();

        if (hasHitMobs && isTriggerSkill(skillID)) {

            modifyAether(10);

            if (!chr.hasSkillOnCooldown(chr.hasSkill(HEXA_AETHER_FORGE) ? HEXA_AETHER_FORGE_1 : AETHER_FORGE_1)
                    && tsm.hasStat(LWCreation)) {
                for (var e : capeAtoms) {
                    if (getAether() >= 100) {
                        int key = e.getKey();
                        int objectID = e.getObjectID();
                        int tier = (key > 1) ? 0 : (getAether() >= 300 ? 3 : getAether() >= 200 ? 2 : 1);
                        chr.getField().broadcast(SecondAtomPacket.secondAtomAttack(chr, objectID, tier));
                    }
                }
                chr.addSkillCooldown(AETHER_FORGE_1, chr.getJob() == 15112 ? 6000 : chr.getJob() == 15111 ? 9000 : 12000);
            }
            if (!chr.hasSkillOnCooldown(AETHERIAL_ARMS) && tsm.hasStat(LWWonder)) {
                spawnMagicDispatchs();
            }
        }

        switch (skillID) {
            case HEXA_IMPALE:
                if (!chr.hasSkillOnCooldown(IMPALE)) {
                    chr.addSkillCooldown(IMPALE, 7000);
                }
                break;
            case HEXA_PLUMMET:
                if (!chr.hasSkillOnCooldown(PLUMMET)) {
                    chr.addSkillCooldown(PLUMMET, 1500);
                }
                break;
            case RESONANCE_RUSH:
            case RESONANCE_RUSH_1:
            case HEXA_RESONANCE_RUSH:
            case HEXA_RESONANCE_RUSH_1:
                EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
                int buffID = chr.hasSkill(HEXA_RESONANCE_RUSH) ? HEXA_RESONANCE_RUSH_2 : RESONANCE_RUSH_2;
                si = SkillData.getSkillInfoById(buffID);
                int amount = 1;
                if (tsm.hasStat(LWResonanceBuff)) {
                    amount = tsm.getOption(LWResonanceBuff).nOption;
                    if (amount < 3) {
                        amount++;
                    }
                }
                o1.nValue = si.getValue(SkillStat.z, slv) * amount;
                o1.nReason = buffID;
                o1.tTerm = si.getValue(SkillStat.time, slv);
                newStats.put(IndieIgnoreMobpdpR, o1);
                o2.nOption = amount;
                o2.rOption = buffID;
                o2.tOption = si.getValue(SkillStat.time, slv) * 2;
                newStats.put(LWResonanceBuff, o2);
                tsm.sendStat(newStats);
                break;
            case LEGACY_RESTORATION:
            case HEXA_LEGACY_RESTORATION:
                chr.heal(chr.getMaxHP() / 100 * si.getValue(SkillStat.t, slv));
                break;
            case 400011106:
            case 400011107:
                chr.setSkillCooldown(RUIN, slv);
                break;
            case AETHER_FORGE_1:
            case HEXA_AETHER_FORGE_1:
            case AETHER_FORGE_2:
            case HEXA_AETHER_FORGE_2:
            case AETHER_FORGE_3:
            case HEXA_AETHER_FORGE_3:
            case HUNTING_DECREE:
            case HEXA_HUNTING_DECREE:
                int chance = 100;
                if (skillID == HUNTING_DECREE || skillID == HEXA_HUNTING_DECREE) {
                    chance = 15; // prop
                }
                for (MobAttackInfo mai : attackInfo.mobAttackInfo) {
                    Mob mob = (Mob) chr.getField().getLifeByObjectID(mai.mobId);
                    if (mob == null || mob.getHp() <= 0) {
                        continue;
                    }
                    final Position pos = mob.getPosition();
                    if (Util.succeedProp(chance)) {
                        spawnAetherShard(pos);
                    }
                }
                break;
        }
    }

    public void createCapeAtoms(int swords) {
        int chrId = chr.getId();
        Position position = chr.getPosition();
        int skillID = chr.hasSkill(HEXA_AETHER_FORGE) ? HEXA_AETHER_FORGE : AETHER_FORGE;
        int slv = chr.getSkillLevel(skillID);
        List<SecondAtom> secondAtoms = new ArrayList<>();
        for (int i = 1; i <= swords; i++) {
            int atomObjectID = chr.getField().getNewObjectID();
            final var capeAtom = new SecondAtom(atomObjectID, chrId,0,0, skillID, slv, position,
                            i, capeAtoms.size(), 0,1,100,100,
                            System.currentTimeMillis(),0,false, new Int2IntOpenHashMap());
            secondAtoms.add(capeAtom);
            capeAtoms.add(capeAtom);
        }
        chr.createSecondAtom(secondAtoms);
    }

    public void removeCapeAtoms() {
        for (var sa : capeAtoms) {
            sa.setExpire(0);
            chr.removeSecondAtomInternal(sa);
        }
        capeAtoms.clear();
    }

    public void spawnAetherShard(Position pos) {
        Skill skill = chr.getSkill(AETHER_CRYSTAL);
        SkillInfo si = null;
        int slv = 0;
        if (skill != null) {
            si = SkillData.getSkillInfoById(AETHER_CRYSTAL);
            slv = chr.getSkillLevel(AETHER_CRYSTAL);
        }
        if (si != null) {
            Summon summon = Summon.getSummonByAndSetStat(chr, AETHER_CRYSTAL, slv);
            summon.setPosition(pos);
            summon.setMoveAction((byte) 4);
            summon.setCurFoothold((short) 0);
            summon.setMoveAbility(MoveAbility.Stop);
            summon.setAssistType(AssistType.None);
            summon.setEnterType(EnterType.Animation);
            summon.setFlyMob(false);
            summon.setBeforeFirstAttack(true);
            summon.setAttackActive(true);
            summon.setSummonTerm(30);
            summonList.add(summon);
            chr.getField().spawnAddSummon(summon);
            try {
                if (summonList.size() > 7) {
                    var e = summonList.removeFirst();
                    chr.getField().removeLife(e);
                }
            } catch (Exception ignored) {}
        }
    }

    public void applyLegacyRestoration(SkillInfo si, int slv) {
        if (this.legacyRestorationTimer != null) {
            this.legacyRestorationTimer.cancel(false);
        }
        ScheduledFuture<?> sf = chr.getTimer().addFixedRateEvent(() ->
                chr.healMP(-(chr.getMaxMP() / 100 * si.getValue(SkillStat.mpRCon, slv))), 0, 1000, false);
        this.legacyRestorationTimer = sf;
        GlobalTimerManager.addCharTimer(chr.getId(), sf);
        chr.getTimer().addEvent(() -> {
            if (this.legacyRestorationTimer != null) {
                this.legacyRestorationTimer.cancel(true);
            }
        }, si.getValue(SkillStat.time, slv), TimeUnit.SECONDS);
    }

    @Override
    public void handleSkill(Client c, InPacket inPacket, SkillUseInfo skillUseInfo) {
        Char chr = c.getChr();
        SkillInfo si = skillUseInfo.skillInfo;
        int slv = skillUseInfo.slv;
        int skillID = skillUseInfo.skillID;
        Field field = chr.getField();
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        Option o1 = new Option();
        Option o2 = new Option();
        switch (skillID) {
            case AETHER_FORGE:
            case HEXA_AETHER_FORGE:
                if (tsm.hasStatBySkillId(skillID)) {
                    tsm.removeStatsBySkill(skillID);
                    removeCapeAtoms();
                } else {
                    var swords = Math.min(3, getAetherSwords());
                    o1.nOption = 1;
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(SkillStat.time, slv);
                    tsm.sendStat(LWCreation, o1);
                    createCapeAtoms(swords * 2);
                }
                break;
            case AETHERIAL_ARMS:
            case HEXA_AETHERIAL_ARMS:
                if (tsm.hasStatBySkillId(skillID)) {
                    tsm.removeStatsBySkill(skillID);
                } else {
                    o1.nOption = 1;// si.getValue(SkillStat.x, slv); ?? 8 in wz 1 in sniff?
                    o1.rOption = skillID;
                    o1.tOption = si.getValue(SkillStat.time, slv);
                    tsm.sendStat(LWWonder, o1);
                }
                break;
            case WEAVE_INFUSION:
                o1.rOption = skillID;
                o1.nOption = si.getValue(SkillStat.x, slv);
                o1.tOption = si.getValue(SkillStat.time, slv);
                tsm.sendStat(Booster, o1);
                break;
            case FLORAN_HEROS_WILL:
                tsm.removeAllDebuffs();
                break;
            case REIGN_OF_DESTRUCTION:
            case HEXA_REIGN_OF_DESTRUCTION:
                Summon summon = Summon.getSummonByAndSetStat(c.getChr(), skillID, slv);
                summon.setFlyMob(false);
                summon.setSummonTerm(si.getValue(SkillStat.time, slv));
                summon.setMoveAbility(MoveAbility.Stop);
                field.spawnSummon(summon);
                break;
            case MAGIC_DISPATCH:
            case HEXA_MAGIC_DISPATCH:
                chr.addSkillCooldown(skillID, 6000);
                spawnMagicDispatchs();
                break;
            case NOBLE_SUMMONS:
            case HEXA_NOBLE_SUMMONS:
                chr.setSkillCooldown(NOBLE_SUMMONS, slv);
                break;
            case IMPALE:
            case HEXA_IMPALE:
            case FEATHER_FLOAT:
                modifyAether(-si.getValue(SkillStat.y, slv));
                break;
            case HUNTING_DECREE:
            case HEXA_HUNTING_DECREE:
                chr.addSkillCooldown(skillID, 500);
                var size = inPacket.decodeByte();
                var targetObjId = 0;
                for (int i = 0; i < size; i++) {
                    targetObjId = inPacket.decodeInt();
                }
                inPacket.decodeArr(3);
                Position position = inPacket.decodePositionInt();
                modifyAether(-si.getValue(SkillStat.s, slv));
                int maxSword = skillID ==  HEXA_HUNTING_DECREE ? si.getValue(SkillStat.w, slv) : si.getValue(SkillStat.z, slv);
                while (huntingDecreeList.size() > maxSword) {
                    SecondAtom sa = huntingDecreeList.removeFirst();
                    chr.removeSecondAtom(sa);
                }
                spawnHuntingDecrees(si, targetObjId, position);
                break;
            case INFINITY_BLADE:
                o1.nValue = 1;
                o1.nReason = skillID;
                o1.tTerm = si.getValue(SkillStat.x, slv);
                o1.setInMillis(true);
                tsm.sendStat(IndieNotDamaged, o1);
                spawnInfinityBlades(si, slv);
                break;
            case LEGACY_RESTORATION:
            case HEXA_LEGACY_RESTORATION:
                if ((chr.getMaxMP() / 100 * si.getValue(SkillStat.mpRCon, slv) * si.getValue(SkillStat.time, slv)) > chr.getMP()) {
                    chr.chatMessage("You don't have enough MP to use this skill.");
                } else {
                    if (chr.hasSkill(skillID)) {
                        modifyAether(tsm.getOption(LWSwordGauge).nOption / 100 * si.getValue(SkillStat.x, slv));
                        applyLegacyRestoration(si, slv);
                    }
                    o1.nValue = si.getValue(SkillStat.y, slv) + si.getValue(SkillStat.u, slv);
                    o1.nReason = skillID;
                    o1.tTerm = si.getValue(SkillStat.time, slv);
                    newStats.put(IndieDamR, o1);
                    o2.nOption = 1;
                    o2.rOption = skillID;
                    o2.tOption = si.getValue(SkillStat.time, slv);
                    newStats.put(LWRestore, o2);
                    tsm.sendStat(newStats);
                }
                break;
            case DIVINE_WRATH:
                o1.nReason = skillID;
                o1.nValue = si.getValue(SkillStat.indieDamR, slv);
                o1.tTerm = si.getValue(SkillStat.time, slv);
                tsm.sendStat(IndieDamR, o1);
                break;
            case TRUE_NOBILITY:
                o1.rOption = skillID;
                o1.nOption = 10; //Sniff
                o1.tOption = si.getValue(SkillStat.time, slv);
                o1.xOption = chr.getId();
                o1.yOption = si.getValue(SkillStat.y, slv);
                tsm.sendStat(LefWarriorNobility, o1);
                break;
            case SHARDBREAKER:
            case HEXA_SHARDBREAKER:
                if (skillUseInfo.spawnCrystals) break;
                List<Rect> shardRects = new ArrayList<>();
                for (Tuple<Integer, Position> shard : skillUseInfo.shardsPositions) {
                    Position shardPosition = shard.getRight();
                    Rect shardRect = shardPosition.getRectAround(si.getLastRect());
                    AffectedArea aa = AffectedArea.getAffectedArea(chr, skillID, slv);
                    aa.setSkillID(skillID);
                    aa.setPosition(shardPosition);
                    aa.setDelay((short) 3);
                    aa.setDuration(15900);
                    aa.setRect(shardRect);
                    aa.setHitMob(true);
                    chr.getField().spawnAffectedArea(aa);
                }
                chr.write(UserLocal.areaExplosionRequest(skillID, shardRects));
                break;
            case AETHER_CRYSTAL:
                spawnAetherShard(skillUseInfo.endingPosition);
                break;
            case HIGH_RISE:
                o1.rOption = skillID;
                o1.nOption = 50;
                o1.tOption = 1900 / 1000;
                newStats.put(NewFlying, o1);
                o2.nReason = skillID;
                o2.nValue = 50;
                o2.tTerm = si.getValue(SkillStat.time, slv);
                newStats.put(IndieFlyAcc, o2);
                tsm.sendStat(newStats);
                break;
            case STORM:
                int inc = si.getValue(SkillStat.x, slv);
                int swordCount = huntingDecreeList.size();
                int effectiveCount = Math.min(swordCount, 2);
                o1.nOption = effectiveCount * inc - inc;
                o1.rOption = skillID;
                o1.tOption = si.getValue(SkillStat.time, slv);
                tsm.sendStat(DevilishPower, o1);
                break;
            case RESONANCE_RUSH: {
                chr.getField().removeLife(skillUseInfo.objectId, true);
                break;
            }
        }
        super.handleSkill(c, inPacket, skillUseInfo);
    }

    private void spawnInfinityBlades(SkillInfo si, int slv) {
        Rect rect = chr.getRectAround(INFINITY_BLADE_RECT);
        if (!chr.isLeft()) {
            rect = rect.horizontalFlipAround(chr.getPosition().getX());
        }
        int bulletCount = si.getValue(SkillStat.bulletCount, slv);
        final var mob = Util.getRandomFromCollection(chr.getField().getMobsInRect(rect));
        List<SecondAtom> secondAtoms = new LinkedList<>();
        final long start = System.currentTimeMillis();
        for (int key = 0; key < bulletCount; key++) {
            var sai = si.getSecondAtomInfos().get(0);
            SecondAtom fa = new SecondAtom(sai, chr.getNewSecondAtomKey(), chr.getId(),
                    mob != null ? mob.getObjectId() : 0, key, si.getSkillId(), new Position(), start);
            secondAtoms.add(fa);
        }
        chr.createSecondAtom(secondAtoms);
    }

    private void spawnHuntingDecrees(SkillInfo si, int mobID, Position pos) {
        if (!chr.hasSkill(si.getSkillId())) {
            return;
        }
        final long start = System.currentTimeMillis();
        var sai = si.getSecondAtomInfos().get(0);
        pos.add(sai.getExtraPos().get(0));
        SecondAtom fa = new SecondAtom(sai, chr.getNewSecondAtomKey(), chr.getId(), mobID, huntingDecreeList.size(),
                si.getSkillId(), pos, start);
        if (si.getSkillId() == HEXA_HUNTING_DECREE) {
            fa.setExpire(60000); // fk nexon
        }
        huntingDecreeList.add(fa);
        chr.createSecondAtom(fa);
    }

    private void spawnMagicDispatchs() {
        if (!chr.hasSkill(MAGIC_DISPATCH)) {
            return;
        }
        List<SecondAtom> secondAtoms = new LinkedList<>();
        Rect rect = chr.getRectAround(MAGIC_DISPATCH_RECT);
        if (!chr.isLeft()) {
            rect = rect.horizontalFlipAround(chr.getPosition().getX());
        }
        int skillID = chr.hasSkill(HEXA_MAGIC_DISPATCH) ? HEXA_MAGIC_DISPATCH : MAGIC_DISPATCH;
        int dataIndex = skillID == HEXA_MAGIC_DISPATCH ? 58 : 0;
        SkillInfo si = SkillData.getSkillInfoById(skillID);
        int slv = chr.getSkillLevel(skillID);
        int bulletCount = si.getValue(SkillStat.bulletCount, slv);

        int bossID = 0;
        List<Integer> mobs = new ArrayList<>(bulletCount);
        for (Mob mob : chr.getField().getMobsInRect(rect)) {
            if (mob == null || mob.getHp() <= 0) {
                continue;
            }
            if (mobs.size() < bulletCount) {
                mobs.add(mob.getObjectId());
            }
            if (mob.isBoss()) {
                bossID = mob.getObjectId();
            }
        }
        if (mobs.isEmpty()) {
            return;
        }
        if (mobs.size() < bulletCount) {
            for (int i = mobs.size(); i < bulletCount; i++) {
                mobs.add(mobs.getFirst());
            }
        }
        int key = 0;
        final long start = System.currentTimeMillis();
        for (var entry : si.getSecondAtomInfos().int2ObjectEntrySet()) {
            var sai = entry.getValue();
            final int randX = chr.getPosition().getX() + Util.getRandom(-20, 20);
            final int randY = chr.getPosition().getY() - Util.getRandom(10, 20);
            final var pos = new Position(randX, randY);
            final int mobID = bossID != 0 ? bossID : mobs.get(key);
            SecondAtom fa = new SecondAtom(sai, chr.getNewSecondAtomKey(), chr.getId(), mobID, key,
                    si.getSkillId(), pos, start);
            fa.setDataIndex(dataIndex);
            secondAtoms.add(fa);
            key++;
        }
        chr.createSecondAtom(secondAtoms);
    }

    public void handleCancelKeyDownSkill(Char chr, int skillID) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        EnumMap<CharacterTemporaryStat, Option> newStats = new EnumMap<>(CharacterTemporaryStat.class);
        Option o1 = new Option();
        Option o2 = new Option();
        Option o3 = new Option();
        Option o4 = new Option();
        SkillInfo si = SkillData.getSkillInfoById(skillID);
        int slv = chr.getSkillLevel(skillID);
        switch (skillID) {
            case AETHER_GUARD:
                int time = 8;
                if (chr.getSkillLevel(AETHER_GUARD_PERSIST) > 0) {
                    time += 1;
                }
                o1.nReason = skillID;
                o1.nValue = 1;
                o1.tTerm = time;
                newStats.put(IndieApplySuperStance, o1);
                o2.nReason = skillID;
                o2.nValue = -si.getValue(SkillStat.x, slv);
                o2.tTerm = time;
                newStats.put(IndieDamReduceR, o2);
                o3.rOption = skillID;
                o3.nOption = 1;
                o3.tOption = time;
                newStats.put(KeyDownEnable, o3);
                o4.rOption = skillID;
                o4.nOption = 1;
                o4.tOption = 1;
                newStats.put(LWDike, o4);
                tsm.sendStat(newStats);
                break;
            default:
                super.handleCancelKeyDownSkill(chr, skillID);
        }
    }

    @Override
    public void handleHit(Client c, InPacket inPacket, HitInfo hitInfo) {
        Char chr = c.getChr();
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        if (tsm.hasStat(LefWarriorNobility)) {
            Option o = tsm.getOptByCTSAndSkill(LefWarriorNobility, TRUE_NOBILITY);
            if (JobConstants.isAdele(chr.getJob())) {
                int shield = hitInfo.hpDamage / 100 * o.yOption;
                c.write(UserLocal.Novilityshiled(shield));
            } else {
                int finaldam;
                Char leader = chr.getField().getCharByID(o.xOption);
                if (leader != null && leader.getTemporaryStatManager().hasStat(LefWarriorNobility)
                        && (long) (finaldam = hitInfo.hpDamage / 100 * 10) < leader.getHP()) {
                    Option o1 = leader.getTemporaryStatManager().getOptByCTSAndSkill(LefWarriorNobility, TRUE_NOBILITY);
                    leader.heal(-finaldam);
                    leader.write(UserLocal.Novilityshiled(hitInfo.hpDamage / 100 * o1.yOption));
                }
            }
        }
        super.handleHit(c, inPacket, hitInfo);
    }

    @Override
    public void setCharCreationStats(Char chr) {
        super.setCharCreationStats(chr);
        CharacterStat cs = chr.getAvatarData().getCharacterStat();
        cs.setPosMap(FieldConstants.HENESYS_ID);
        cs.setJob(JobConstants.JobEnum.ADELE_1.getJobId());
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
        Item secondary = ItemData.getItemDeepCopy(1354000);
        chr.addItemToInventoryToNewCharacter(EQUIPPED, secondary, true);
        secondary.setInventoryID(chr.getInventoryByType(EQUIPPED).getId());
        secondary.setCharID(chr.getId());
        secondary.setInvType(EQUIPPED);
        secondary.setBagIndex(BodyPart.Shield.getVal());
        secondary.saveToSQL();
        chr.getAvatarData().getAvatarLook().getHairEquips().add(secondary.getItemId());
        chr.getAvatarData().getAvatarLook().updateAvatarLookToSQL();
    }

    @Override
    public void handleLevelUp(short level) {
        super.handleLevelUp(level);
        // hacks to bypass the quest glitch (accept but no packet)
        var sm = chr.getScriptManager();
        if (level == 60 || level == 100) {
            final short jobID = chr.getJob();
            if (!JobConstants.canJobAdvance(jobID)) {
                return;
            }
            final short next = JobConstants.nextJob(jobID);
            sm.setJob(next);
            sm.completeQuestNoRewards(level == 60 ? 39653 : 39654);
            sm.addSPJobAdv(jobID, 5);
            sm.addSPJobAdv(next, 3);
        }
    }

    @Override
    public void handleInitAfterMigrate(Char chr) {
        if (chr.getLevel() < 30) {
            ScriptManagerImpl sm = chr.getScriptManager();
            sm.setJob(JobConstants.JobEnum.ADELE_2.getJobId());
            sm.levelUntil(30);
            for (int qid = 39601; qid <= 39630; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            for (int qid = 39651; qid <= 39652; qid++) {
                sm.completeQuestNoRewards(qid);
            }
            sm.addSPJobAdv(JobConstants.JobEnum.ADELE_1.getJobId(), 5);
            sm.addSPJobAdv(JobConstants.JobEnum.ADELE_2.getJobId(), 3);
            sm.giveAndEquip(1213001);
            sm.giveAndEquip(1354001);
            sm.warp(FieldConstants.HOME_MAP);
        }
        super.handleInitAfterMigrate(chr);
    }

    @Override
    public void handleCancelTimer(Char chr) {
        if (legacyRestorationTimer != null) {
            legacyRestorationTimer.cancel(true);
        }
        super.handleCancelTimer(chr);
    }

    @Override
    public int handleSetCoolDownSkill(int skillId) {
        switch (skillId) {
            case HEXA_ENHANCED_CLEAVE -> {
                chr.addSkillCooldown(skillId, 6000);
                return 1;
            }
            case HEXA_AETHERIAL_ARMS -> {
                int skillID = AETHERIAL_ARMS;
                int slv = chr.getSkillLevel(skillID);
                chr.setSkillCooldown(skillID, slv);
                return 1;
            }
            case HEXA_AETHER_BLOOM -> {
                int skillID = AETHER_BLOOM;
                int slv = chr.getSkillLevel(skillID);
                chr.setSkillCooldown(skillID, slv);
                return 1;
            }
            case HEXA_REIGN_OF_DESTRUCTION -> {
                int skillID = REIGN_OF_DESTRUCTION;
                int slv = chr.getSkillLevel(skillID);
                chr.setSkillCooldown(skillID, slv);
                return 1;
            }
            case HEXA_SHARDBREAKER -> {
                int skillID = SHARDBREAKER;
                int slv = chr.getSkillLevel(skillID);
                chr.setSkillCooldown(skillID, slv);
                return 1;
            }
        }
        return super.handleSetCoolDownSkill(skillId);
    }
}
