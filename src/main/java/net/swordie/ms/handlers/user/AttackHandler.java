package net.swordie.ms.handlers.user;

import net.swordie.ms.BannedMachines;
import net.swordie.ms.DiscordAPI;
import net.swordie.ms.client.User;
import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.achievement.AchievementHandler;
import net.swordie.ms.client.character.runestones.RuneStone;
import net.swordie.ms.client.character.skills.*;
import net.swordie.ms.client.character.skills.info.AttackInfo;
import net.swordie.ms.client.character.skills.info.MobAttackInfo;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.info.SkillUseInfo;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Jianghu.Lynn;
import net.swordie.ms.client.jobs.Jianghu.MoXuan;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.client.jobs.adventurer.Kinesis;
import net.swordie.ms.client.jobs.adventurer.archer.BowMaster;
import net.swordie.ms.client.jobs.adventurer.magician.Bishop;
import net.swordie.ms.client.jobs.adventurer.magician.FirePoison;
import net.swordie.ms.client.jobs.adventurer.pirate.Buccaneer;
import net.swordie.ms.client.jobs.adventurer.pirate.Cannoneer;
import net.swordie.ms.client.jobs.adventurer.pirate.Corsair;
import net.swordie.ms.client.jobs.adventurer.warrior.Hero;
import net.swordie.ms.client.jobs.adventurer.warrior.Paladin;
import net.swordie.ms.client.jobs.anima.HoYoung;
import net.swordie.ms.client.jobs.anima.Ren;
import net.swordie.ms.client.jobs.cygnus.BlazeWizard;
import net.swordie.ms.client.jobs.cygnus.DawnWarrior;
import net.swordie.ms.client.jobs.cygnus.NightWalker;
import net.swordie.ms.client.jobs.cygnus.WindArcher;
import net.swordie.ms.client.jobs.flora.Adele;
import net.swordie.ms.client.jobs.legend.Mercedes;
import net.swordie.ms.client.jobs.legend.Shade;
import net.swordie.ms.client.jobs.nova.AngelicBuster;
import net.swordie.ms.client.jobs.nova.Cadena;
import net.swordie.ms.client.jobs.nova.Kaiser;
import net.swordie.ms.client.jobs.resistance.BattleMage;
import net.swordie.ms.client.jobs.resistance.Blaster;
import net.swordie.ms.client.jobs.resistance.WildHunter;
import net.swordie.ms.client.jobs.resistance.Xenon;
import net.swordie.ms.client.jobs.resistance.demon.DemonAvenger;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.OutPacket;
import net.swordie.ms.connection.packet.*;
import net.swordie.ms.constants.*;
import net.swordie.ms.enums.BaseStat;
import net.swordie.ms.enums.FieldOption;
import net.swordie.ms.enums.StylishKillType;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.handlers.header.OutHeader;
import net.swordie.ms.life.Life;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.loaders.StringData;
import net.swordie.ms.util.*;
import net.swordie.ms.world.field.Field;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;

import static net.swordie.ms.client.character.skills.SkillStat.*;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.*;

public class AttackHandler {

    private static void handleAttack(Char chr, AttackInfo attackInfo) {
        var isBattleRecordOn = chr.isBattleRecordOn();
        var skillID = attackInfo.skillId;
        if (skillID == 0) {
            attackInfo.slv = 1;
        } else {
            if (attackInfo.slv == 0) {
                attackInfo.slv = chr.getSkillLevel(skillID);
            } else {
                int curSLV = chr.getSkillLevel(skillID);
                if (chr.hasSkill(skillID) && attackInfo.slv != curSLV) {
                    attackInfo.slv = curSLV;
                }
            }
        }

        if (isBattleRecordOn) chr.write(BattleRecordMan.killDamageInfo(skillID, attackInfo.totalDamageDealt));

        int slv = attackInfo.slv;

        Field field = chr.getField();

        if ((field.getFieldLimit() & FieldOption.SkillLimit.getVal()) > 0
                || (field.getFieldLimit() & FieldOption.MoveSkillOnly.getVal()) > 0) {
            chr.dispose();
            return;
        }

        boolean noCoolTimeAttackHeader = attackInfo.attackHeader == OutHeader.SUMMONED_ATTACK ||
                                         attackInfo.inHeader == InHeader.USER_AREA_DOT_ATTACK ||
                                         attackInfo.inHeader == InHeader.USER_BODY_ATTACK ||
                                         attackInfo.inHeader == InHeader.USER_AFFECTED_AREA_FOR_SCREEN_ATTACK;
        if (!attackInfo.byUnreliableMemory && !noCoolTimeAttackHeader && !chr.applyMpCon(attackInfo.skillInfo, slv, false)) {
            chr.dispose();
            return;
        }

        if (attackInfo.inHeader == InHeader.USER_SHOOT_ATTACK && !chr.applyBulletCon(attackInfo.skillInfo, slv)) {
            chr.dispose();
            return;
        }

        final boolean isCheckAndSetCoolTime = chr.checkAndSetSkillCooltime(skillID, true);

        if (isCheckAndSetCoolTime || noCoolTimeAttackHeader || attackInfo.byUnreliableMemory) {

            final var mobList = attackInfo.mobAttackInfo;
            final int mobSize = mobList == null ? 0 : mobList.size();

            final int[] mobIds;
            final long[] totals;
            final long[] minHits;

            if (mobSize > 0) {
                mobIds = new int[mobSize];
                totals = new long[mobSize];
                minHits = new long[mobSize];

                for (int i = 0; i < mobSize; i++) {
                    MobAttackInfo mai = mobList.get(i);
                    mobIds[i] = mai.mobId;

                    long totalDamage = 0L;
                    long minDamage = 0L;
                    final long[] dmgArr = mai.damages;
                    for (long damage : dmgArr) {
                        totalDamage += damage;
                        if (chr.isGM()) {
                            System.out.println("[ATTACK SKILL] " + skillID + " : " + Util.getNumberFormat(damage));
                        }
                        if (minDamage == 0L || damage < minDamage) minDamage = damage;
                    }
                    totals[i] = totalDamage;
                    minHits[i] = minDamage;
                }
            } else {
                mobIds = null;
                totals = null;
                minHits = null;
            }

            field.addTask(() -> {
                long start = 0;
                if (chr.isGM()) {
                    start = System.currentTimeMillis();
                }

                int multiKillMessage = 0;
                long mobexp = 0;

                long now = System.currentTimeMillis();
                if (chr.tryConsumeAttackEffectBudget(skillID, now, 50)) {
                    try {
                        handleAttack(chr, attackInfo.skillInfo, attackInfo, skillID, slv, now);
                    } catch (Exception e) {
                        DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                    }
                }

                if (attackInfo.attackHeader != null) {
                    if (attackInfo.attackHeader == OutHeader.SUMMONED_ATTACK && attackInfo.summon != null) {
                        field.broadcast(Summoned.attack(chr, attackInfo, false), chr);
                    } else {
                        if (!SkillConstants.notSureRemoteAttackSkill(skillID)) {
                            field.broadcast(UserRemote.attack(chr, attackInfo), chr);
                        }
                    }
                }

                if (mobSize <= 0) {
                    return;
                }

                final Map<Integer, Life> lifes = field.getLifes();

                for (int i = 0; i < mobSize; i++) {
                    Life life = lifes.get(mobIds[i]);
                    if (!(life instanceof Mob mob)) {
                        continue;
                    }
                    if (mob.getHp() <= 0) {
                        continue;
                    }

                    long totalDamage = totals[i];
                    if (totalDamage <= 0) {
                        continue;
                    }

                    // Clamp to current HP to avoid negative & unnecessary work
                    long hp = mob.getHp();
                    long hpLeft = hp - totalDamage;
                    if (hpLeft < 0) {
                        totalDamage += hpLeft; // subtract overflow
                        if (totalDamage <= 0) {
                            continue;
                        }
                    }

                    if (attackInfo.attackHeader != OutHeader.SUMMONED_ATTACK &&
                            attackInfo.attackHeader != OutHeader.FAMILIAR_ATTACK &&
                            attackInfo.attackHeader != OutHeader.REMOTE_BODY_ATTACK) {
                        totalDamage = mob.handleDamageReflect(chr, attackInfo.attackHeader, skillID, totalDamage);
                        if (totalDamage <= 0) {
                            continue;
                        }
                        totalDamage = mob.handleDamageImmune(chr, attackInfo.attackHeader, totalDamage, mobList.get(i).damages);
                        if (totalDamage <= 0) {
                            continue;
                        }
                    }

                    try {

                        if (chr.isGM()) {
                            totalDamage = Long.MAX_VALUE;
                        }

                        boolean isKilled = mob.damage(chr, totalDamage, skillID);
                        if (isKilled) {
                            multiKillMessage++;
                            long exp = mob.getForcedMobStat().getExp();
                            if (exp > mobexp) mobexp = exp;
                            if (isBattleRecordOn) chr.write(BattleRecordMan.enemiesDefeatedUpdate());
                        } else {
                            try {
                                long minHit = minHits[i];
                                if (minHit > 0) {
                                    try {
                                        mob.handleDebuffOnMob(chr, attackInfo.skillInfo, skillID, slv, minHit);
                                    } catch (Exception e) {
                                        DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                                    }
                                }
                            } catch (Exception e) {
                                DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                            }
                        }
                    } catch (Exception e) {
                        DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                    }
                }
                if (multiKillMessage > 2 && mobexp > 0) {
                    int bonusExpMultiplier = (multiKillMessage - 2) * 5;
                    long totalBonusExp = (long) (mobexp * (bonusExpMultiplier * GameConstants.MULTI_KILL_BONUS_EXP_MULTIPLIER));
                    chr.write(UserLocal.comboCounter(StylishKillType.MULTI_KILL, (int) totalBonusExp, Math.min(multiKillMessage, 10)));
                    chr.addExpNoMsg(totalBonusExp);
                    AchievementHandler.handleMultiKO(chr, multiKillMessage);
                }
                if (chr.isGM()) {
                    long total = System.currentTimeMillis() - start;
                    var ssi = StringData.getSkillStringById(skillID);
                    String sName = (ssi != null && ssi.getName() != null) ? ssi.getName() : "Skill " + skillID;
                    System.out.printf("Thời gian xử lý kỹ năng %s (%d): %d ms.%n", sName, skillID, total);
                }
            });
        }
    }

    private static void handleAttack(Char chr, SkillInfo si, AttackInfo attackInfo, int skillID, int slv, long now) {
        var src = chr.getJobHandler();
        if (si != null) {
            src.handleAttack(chr.getClient(), attackInfo, si, now);
            if (si.isMassSpell() && chr.getParty() != null && chr.getParty().getPartyMembersInSameField(chr).size() > 1) {
                var r = si.getFirstRect();
                if (r != null) {
                    var rectAround = chr.getRectAround(r);
                    for (var pmChr : chr.getParty().getPartyMembersInSameField(chr)) {
                        if (pmChr != null && rectAround.hasPositionInside(pmChr.getPosition())) {
                            src.handleAttack(chr.getClient(), attackInfo, si, now);
                            var effect = Effect.skillAffected(skillID, slv, 0);
                            pmChr.write(UserPacket.effect(effect));
                            chr.getField().broadcast(UserRemote.effect(pmChr.getId(), effect), pmChr);
                        }
                    }
                }
            }
        }
    }

    @Handler(ops = InHeader.USER_BODY_ATTACK)
    public static void handleBodyAttack(Char chr, InPacket inPacket) {
        AttackInfo ai = new AttackInfo();
        ai.attackHeader = OutHeader.REMOTE_BODY_ATTACK;
        inPacket.decodeInt();
        inPacket.decodeInt();
        ai.fieldKey = inPacket.decodeByte();
        byte mask = inPacket.decodeByte();
        ai.hits = (byte) (mask & 0xF);
        ai.mobCount = (mask >>> 4) & 0xF;
        ai.skillId = inPacket.decodeInt();
        ai.slv = inPacket.decodeInt();
        ai.crc1 = inPacket.decodeInt();
        ai.crc2 = inPacket.decodeInt();
        ai.crc3 = inPacket.decodeInt();

        int skillID = ai.skillId;

        SkillInfo si = SkillData.getSkillInfoById(skillID);
        if (si == null && skillID != 0) {
            if (chr.isGM()) {
                chr.chatScriptMessage("Skill " + skillID + " has not been implemented yet.");
            }
            chr.dispose();
            return;
        } else {
            ai.skillInfo = si;
        }

        attackBonusReader(inPacket, ai);

        SkillUseInfo skillUseInfo = new SkillUseInfo(si, ai.slv);
        ProcessType processType = new ProcessType(skillUseInfo);
        processType.decode(inPacket);
        ai.processType = processType;

        if (SkillConstants.isZeroSkill(ai.skillId)) {
            ai.zeroTag = inPacket.decodeByte();
        }
        ai.areaPAD = inPacket.decodeByte() >>> 3;
        byte nul = inPacket.decodeByte(); // encoded as 0
        short actionMask = inPacket.decodeShort();
        ai.left = ((actionMask >>> 15) & 1) != 0;
        ai.attackAction = (short) (actionMask & 0x7FFF);
        ai.attackCount = inPacket.decodeInt();
        ai.attackSpeed = inPacket.decodeByte();

        inPacket.skipByte();

        ai.wt = inPacket.decodeInt();
        ai.ar01Mad = inPacket.decodeInt();

        if (ai.skillId > 0) {
            for (int i = 0; i < ai.mobCount; i++) {
                MobAttackInfo mai = new MobAttackInfo();
                mai.mobId = inPacket.decodeInt();

                mai.hitAction = inPacket.decodeByte();
                mai.left = inPacket.decodeByte();
                mai.idk3 = inPacket.decodeByte();
                mai.forceActionAndLeft = inPacket.decodeByte();
                mai.frameIdx = inPacket.decodeByte();

                mai.templateID = inPacket.decodeInt();

                mai.calcDamageStatIndexAndDoomed = inPacket.decodeByte(); // 1st bit for bDoomed, rest for calcDamageStatIndex

                mai.hitX = inPacket.decodeShort();
                mai.hitY = inPacket.decodeShort();
                mai.oldPosX = inPacket.decodeShort(); // ?
                mai.oldPosY = inPacket.decodeShort(); // ?

                mai.idk6 = inPacket.decodeShort();
                mai.hitAction = inPacket.decodeByte();
                mai.idk7 = inPacket.decodeInt();
                mai.idk8 = inPacket.decodeInt();
                long totalDamage = 0;
                mai.damages = new long[ai.hits];
                for (int j = 0; j < ai.hits; j++) {
                    long damage = inPacket.decodeLong();
                    totalDamage += damage;
                    mai.damages[j] = damage;
                }
                ai.totalDamageDealt = totalDamage;
                mai.mobUpDownYRange = inPacket.decodeInt();
                mai.crc1 = inPacket.decodeInt(); // crc
                mai.crc2 = inPacket.decodeInt(); // crc
                parseAttackInfoPacket(inPacket, mai);
                ai.mobAttackInfo.add(mai);
            }
        }
        ai.pos = inPacket.decodePosition();
        handleAttack(chr, ai);
    }

    @Handler(op = InHeader.SUMMONED_ATTACK)
    public static void handleSummonedAttack(Char chr, InPacket inPacket) {
        Field field = chr.getField();
        AttackInfo ai = new AttackInfo();
        int summonedID = inPacket.decodeInt();
        ai.attackHeader = OutHeader.SUMMONED_ATTACK;
        Life life = field.getLifeByObjectID(summonedID);
        if (life == null) {
            return;
        }
        if (!(life instanceof Summon summon)) {
            return;
        }
        ai.summon = summon;
        ai.updateTime = inPacket.decodeInt();
        ai.skillId = inPacket.decodeInt();
        ai.summonSpecialSkillId = inPacket.decodeInt();

        int skillID = ai.skillId;

        SkillInfo si = SkillData.getSkillInfoById(skillID);
        if (si == null && skillID != 0) {
            if (chr.isGM()) {
                chr.chatScriptMessage("Skill " + skillID + " has not been implemented yet.");
            }
            chr.dispose();
            return;
        } else {
            ai.skillInfo = si;
        }

        summonAttackBonusReader(inPacket, ai);

        byte leftAndAction = inPacket.decodeByte();
        ai.attackActionType = (byte) (leftAndAction & 0x7F);
        ai.left = (byte) (leftAndAction >>> 7) != 0;
        byte mask = inPacket.decodeByte();
        ai.hits = (byte) (mask & 0xF);
        ai.mobCount = (mask >>> 4) & 0xF;
        inPacket.decodeByte(); // hardcoded 0
        ai.pos = inPacket.decodePosition();
        inPacket.decodePosition(); // new pos i guess
        inPacket.decodeByte(); // 0
        inPacket.decodeInt(); // hardcoded 0xFFFFFFFF
        inPacket.decodeShort();
        inPacket.decodeInt();
        inPacket.decodeInt();
        if (skillID == AngelicBuster.MIGHTY_MASCOT
                || skillID == Corsair.BROADSIDE_SUMMON
                || skillID == Corsair.HEXA_BROADSIDE_SUMMON) {
            inPacket.decodeInt();
        }
        if (skillID == 5221028 || skillID == 5241016) {
            ai.grenadePos = inPacket.decodePositionInt();
        }
        for (int i = 0; i < ai.mobCount; i++) {
            MobAttackInfo mai = new MobAttackInfo();
            mai.mobId = inPacket.decodeInt();
            mai.templateID = inPacket.decodeInt();
            mai.hitAction = inPacket.decodeByte();
            mai.left = inPacket.decodeByte();
            mai.idk3 = inPacket.decodeByte();
            mai.forceActionAndLeft = inPacket.decodeByte();
            mai.frameIdx = inPacket.decodeByte();
            mai.templateID = inPacket.decodeInt();
            mai.calcDamageStatIndexAndDoomed = inPacket.decodeByte(); // 1st bit for bDoomed, rest for calcDamageStatIndex
            mai.hitX = inPacket.decodeShort();
            mai.hitY = inPacket.decodeShort();
            mai.oldPosX = inPacket.decodeShort(); // ?
            mai.oldPosY = inPacket.decodeShort(); // ?
            int idk8 = inPacket.decodeInt(); //
            mai.idk6 = inPacket.decodeShort();
            mai.idk7 = inPacket.decodeInt();
            mai.idk8 = inPacket.decodeInt();
            mai.idk9 = inPacket.decodeByte();
            long totalDamage = 0;
            mai.damages = new long[ai.hits];
            for (int j = 0; j < ai.hits; j++) {
                long damage = inPacket.decodeLong();
                totalDamage += damage;
                mai.damages[j] = damage;
            }
            ai.totalDamageDealt = totalDamage;
            mai.mobUpDownYRange = inPacket.decodeInt();
            parseAttackInfoPacket(inPacket, mai);
            ai.mobAttackInfo.add(mai);
        }
        handleAttack(chr, ai);
    }

    public static void handleAttack(Char chr, InPacket inPacket, InHeader header) {
        AttackInfo ai = new AttackInfo();
        ai.inHeader = header;
        switch (header) {
            case USER_MELEE_ATTACK:
                ai.attackHeader = OutHeader.REMOTE_MELEE_ATTACK;
                inPacket.skipInt();
                inPacket.skipInt();
                break;
            case USER_AREA_DOT_ATTACK:
                inPacket.skipInt();
                inPacket.skipInt();
                break;
            case USER_SHOOT_ATTACK:
                inPacket.skipInt();
                inPacket.skipInt();
                ai.boxAttack = inPacket.decodeByte() != 0; // hardcoded 0
                ai.attackHeader = OutHeader.REMOTE_SHOOT_ATTACK;
                break;
            case USER_NON_TARGET_FORCE_ATOM_ATTACK:
                inPacket.skipInt();
                inPacket.skipInt();

                // id/crc/something else
                inPacket.skipInt(); // skillID
                inPacket.skipInt(); // crc?
                inPacket.skipInt(); // mask?

                inPacket.skipInt(); // crc
                inPacket.skipInt(); // crc
                break;
            case USER_MAGIC_ATTACK:
                ai.attackHeader = OutHeader.REMOTE_MAGIC_ATTACK;
                inPacket.skipInt();
                inPacket.skipInt();
                break;
            case USER_AFFECTED_AREA_FOR_SCREEN_ATTACK:
                ai.attackHeader = OutHeader.REMOTE_MELEE_ATTACK;
                break;
        }
        ai.charPosition = chr.getPosition();

        ai.fieldKey = inPacket.decodeByte();

        byte mask = inPacket.decodeByte();
        ai.hits = (byte) (mask & 0xF);
        ai.mobCount = (mask >>> 4) & 0xF;

        int skillID = ai.skillId = inPacket.decodeInt();
        ai.slv = inPacket.decodeInt();

        SkillInfo si = SkillData.getSkillInfoById(skillID);
        if (si == null && skillID != 0) {
            if (chr.isGM()) {
                chr.chatScriptMessage("Skill " + skillID + " has not been implemented yet.");
            }
            chr.dispose();
            return;
        } else {
            ai.skillInfo = si;
        }

        try {
            if (header == InHeader.USER_MELEE_ATTACK
                    || header == InHeader.USER_SHOOT_ATTACK
                    || header == InHeader.USER_NON_TARGET_FORCE_ATOM_ATTACK) {
                ai.addAttackProc = inPacket.decodeByte();
            }

            // Fully Charged Key Down Skills
            if (ai.skillId == 12121055) {
                ai.skillId = 12121054;
            }

            inPacket.skipInt();
            inPacket.skipInt();
            inPacket.skipInt();

            attackBonusReader(inPacket, ai);

            SkillUseInfo skillUseInfo = new SkillUseInfo(si, ai.slv);
            ProcessType processType = new ProcessType(skillUseInfo);
            processType.decode(inPacket);
            ai.processType = processType;

            if (SkillConstants.isKeyDownSkill(skillID) || SkillConstants.isSuperNovaSkill(skillID)) {
                ai.keyDown = inPacket.decodeInt();
            }
            if (SkillConstants.isRushBombSkill(skillID) || skillID == 5300007 || skillID == 11101030 || skillID == 64101008) {
                ai.grenadeId = inPacket.decodeInt();
            }
            if (header == InHeader.USER_NON_TARGET_FORCE_ATOM_ATTACK && (skillID == 12121057 || skillID == 12121059)) {
                ai.pos = inPacket.decodePositionInt();
            }
            if (SkillConstants.isZeroSkill(skillID)) {
                ai.zeroTag = inPacket.decodeByte();
            }
            if (SkillConstants.isUsercloneSummonedAbleSkill(skillID)) {
                ai.bySummonedID = inPacket.decodeInt();
            }
            if (skillID == AngelicBuster.MIGHTY_MASCOT) { // Mighty Mascot
                inPacket.decodeInt();
            }
            if (skillID == Mercedes.ROLLING_MOONSAULT) { // Mercedes Rolling Moonsault skill
                inPacket.decodeInt();
            }
            if (skillID == NightWalker.SHADOW_SPEAR_AA_LARGE) {
                ai.shadowSpear1 = inPacket.decodeInt();
                ai.shadowSpear2 = inPacket.decodeInt();
            }
            if (skillID == 400011133
                    || skillID == DemonAvenger.BAT_SWARM
                    || skillID == Ren.THOUSAND_BLOSSOM_FLURRY_EX
                    || skillID == WildHunter.ANOTHER_BITE
                    || SkillConstants.isDelugeSkill(skillID)) {
                inPacket.skipInt();
            }
            ai.buckShot = inPacket.decodeByte();
            ai.someMask = inPacket.decodeByte(); // decides where the Remote Attack goes for mimicked skills (Divine Echo)
            if (header == InHeader.USER_SHOOT_ATTACK) {
                int bAddtionalBolt = inPacket.decodeInt();
                ai.isJablin = inPacket.decodeByte() != 0;
                if (ai.boxAttack) {
                    int boxAttack_1 = inPacket.decodeInt();
                    short boxAttack_2 = inPacket.decodeShort();
                    short boxAttack_3 = inPacket.decodeShort();
                }
            }
            if (skillID == 400031033 || skillID == 400031070) {
                // Primal Grenade: Flash
                ai.isJablin = inPacket.decodeByte() != 0;
                if (ai.boxAttack) {
                    int boxAttack_1 = inPacket.decodeInt();
                    short boxAttack_2 = inPacket.decodeShort();
                    short boxAttack_3 = inPacket.decodeShort();
                }
            }
            if (header == InHeader.USER_NON_TARGET_FORCE_ATOM_ATTACK) {
                if (SkillConstants.isOrbitalFlameOrPhoenixDrive(skillID)) {
                    inPacket.skipInt();
                }
                if (SkillConstants.isHexaOrbitalFlame(skillID)) {
                    inPacket.skipInt();
                }
            }
            ai.mask = inPacket.decodeShort(); // COutPacket::Encode2(v105, v118 & 0x7FFF | (v30 << 15));
            ai.left = ((ai.mask >>> 15) & 1) != 0;
            ai.attackAction = (short) (ai.mask & 0x7FFF);
            ai.requestTime = inPacket.decodeInt();
            ai.attackActionType = inPacket.decodeByte();

            if (skillID == 23111001 || skillID == 80001915 || skillID == 36111010) {
                inPacket.skipInt(); // bIsEncryptedByShanda
                inPacket.skipInt(); // x
                inPacket.skipInt(); // y
            }

            if (SkillConstants.isEvanForceSkill(skillID)) {
                inPacket.skipByte();
            }

            ai.attackSpeed = inPacket.decodeByte();
            ai.tick = inPacket.decodeInt();

            if (header == InHeader.USER_AREA_DOT_ATTACK) {
                ai.affectedAreaObjId = inPacket.decodeInt();
            }

            if (header != InHeader.USER_MAGIC_ATTACK
                    && header != InHeader.USER_NON_TARGET_FORCE_ATOM_ATTACK
                    && header != InHeader.USER_AREA_DOT_ATTACK
                    && header != InHeader.USER_AFFECTED_AREA_FOR_SCREEN_ATTACK) {
                ai.bulletSlot = inPacket.decodeInt(); // 2
            }

            if (header == InHeader.USER_MELEE_ATTACK || header == InHeader.USER_SHOOT_ATTACK) {
                ai.finalAttackLastSkillID = inPacket.decodeInt();
                if (ai.finalAttackLastSkillID > 0) {
                    ai.finalAttackByte = inPacket.decodeByte();
                }
            } else if (header == InHeader.USER_MAGIC_ATTACK
                    || header == InHeader.USER_AREA_DOT_ATTACK
                    || header == InHeader.USER_NON_TARGET_FORCE_ATOM_ATTACK) {
                inPacket.skipInt();
            } else {
                ai.ptStart_X = inPacket.decodeShort();
                ai.hitRange = inPacket.decodeShort();
            }
            if (header == InHeader.USER_NON_TARGET_FORCE_ATOM_ATTACK
                    || skillID == RuneStone.LIBERATE_THE_RUNE_OF_THUNDER_ATTACK) {
                ai.maximumMobCount = inPacket.decodeInt();
            }
            if (header == InHeader.USER_SHOOT_ATTACK) {
                inPacket.skipShort();
                inPacket.skipByte();
                ai.bulletID = chr.getBulletIDForAttack();
                ai.rect = inPacket.decodeShortRect();
            }
            if (skillID == Buccaneer.SPIRAL_ASSAULT) {
                ai.ignorePCounter = inPacket.decodeByte() != 0;
            }
            if (skillID == Shade.SPIRIT_FRENZY) {
                ai.spiritCoreEnhance = inPacket.decodeInt();
            }
            if (skillID == Lynn.STRIKE_1 || skillID == Lynn.STRIKE_2
                    || skillID == Lynn.STRIKE_3 || skillID == Lynn.STRIKE_4
                    || skillID == Lynn.PREDATOR_BLOW) {
                inPacket.decodeInt();
                if (skillID == Lynn.PREDATOR_BLOW) {
                    inPacket.decodeByte();
                }
            }

            long totalDamage = 0;
            int totalCr = chr.getTotalStat(BaseStat.cr);
            for (int i = 0; i < ai.mobCount; i++) {
                MobAttackInfo mai = new MobAttackInfo();
                mai.mobId = inPacket.decodeInt();
                mai.hitAction = inPacket.decodeByte();
                mai.left = inPacket.decodeByte();
                mai.idk3 = inPacket.decodeByte();
                mai.forceActionAndLeft = inPacket.decodeByte();
                mai.frameIdx = inPacket.decodeByte();
                mai.templateID = inPacket.decodeInt();
                mai.calcDamageStatIndexAndDoomed = inPacket.decodeByte(); // 1st bit for bDoomed, rest for calcDamageStatIndex
                mai.hitX = inPacket.decodeShort();
                mai.hitY = inPacket.decodeShort();
                mai.oldPosX = inPacket.decodeShort(); // ?
                mai.oldPosY = inPacket.decodeShort(); // ?
                if (header == InHeader.USER_MAGIC_ATTACK) {
                    mai.hpPerc = inPacket.decodeByte();
                    mai.magicInfo = inPacket.decodeShort();
                } else {
                    inPacket.skipShort();
                }
                inPacket.skipInt();
                inPacket.skipInt();
                inPacket.skipByte();
                mai.damages = new long[ai.hits];
                for (int j = 0; j < ai.hits; j++) {
                    long damage = inPacket.decodeLong();
                    totalDamage += damage;
                    mai.damages[j] = damage;
                }
                mai.crits = calculateCriticalsByAverage(mai.damages, totalCr);
                mai.mobUpDownYRange = inPacket.decodeInt();
                inPacket.skipInt(); // crc
                inPacket.skipInt(); // crc
                if (skillID == Blaster.ROCKET_RUSH) {
                    mai.isResWarriorLiftPress = inPacket.decodeByte() != 0;
                } else if (skillID == 400021029) {
                    inPacket.decodeByte();
                    inPacket.decodeInt();
                } else if (SkillConstants.isKinesisPsychicLockSkill(skillID)) {
                    inPacket.decodeInt();
                    inPacket.decodeInt();
                }
                parseAttackInfoPacket(inPacket, mai);
                ai.mobAttackInfo.add(mai);
            }
            ai.totalDamageDealt = totalDamage;

            try {
                if (skillID == 27121052 || skillID == 80001837) {
                    ai.x = inPacket.decodeShort();
                    ai.y = inPacket.decodeShort();
                }
                if (SkillConstants.isShootObjectSkill(skillID)) {
                    ai.forcedX = inPacket.decodeShort();
                    ai.forcedY = inPacket.decodeShort();
                    ai.shootObjId = inPacket.decodeInt();
                    if (SkillConstants.isSomePathfinderSkill(skillID)) {
                        ai.teleportPt = inPacket.decodePosition();
                        ai.pathFinderBool = inPacket.decodeByte();
                    }
                } else if (header == InHeader.USER_MAGIC_ATTACK
                        && skillID != BattleMage.DARK_SHOCK
                        && skillID != 400021004
                        && skillID != 27121052
                        && skillID != 152001002
                        && skillID != 400021028
                        && !SkillConstants.isKinesisPsychicAreaSkill(skillID)) {
                    ai.forcedX = inPacket.decodeShort();
                    ai.forcedY = inPacket.decodeShort();
                    ai.dragon = inPacket.decodeByte() != 0;
                    if (ai.dragon) {
                        ai.rcDstRight = inPacket.decodeShort();
                        ai.rectRight = inPacket.decodeShort();
                        ai.x = inPacket.decodeShort();
                        ai.y = inPacket.decodeShort();
                        ai.dragonAttackStart = inPacket.decodeByte();
                        ai.dragonAttackActionType = inPacket.decodeByte();
                        ai.dragonAttackProgess = inPacket.decodeByte();
                        inPacket.decodeByte();
                        inPacket.decodeByte();
                    }
                } else if (SkillConstants.isThrowableAttackSkill(skillID)) {
                    ai.throwableAttack = inPacket.decodeInt();
                    ai.throwableAttackFootHold = inPacket.decodeByte();
                }

                if (SkillConstants.isSuperNovaSkill(skillID)
                        || SkillConstants.isScreenCenterAttackSkill(skillID)
                        || skillID == 101000202
                        || skillID == 101141032
                        || skillID == 101000102
                        || skillID == 101141028
                        || skillID == 80002212
                        || skillID == 80002463
                        || skillID == 400041019 || skillID == 400041024 || skillID == 400041080 // (v145 = v246 - 400041019, v145 <= 61) && _bittest64(&v141, v145)
                        || skillID == 400031016
                        || skillID == 31240014
                        || skillID == 3221019
                        || SkillConstants.isWingedJavelinOrAbyssalCast(skillID)
                        || skillID == 400021075
                        || skillID == 14111036
                        || skillID == 400001055 || skillID == 400001056) {
                    ai.ptTarget = inPacket.decodePosition();
                }
                if (skillID == 400041062 || skillID == 400041064 || skillID == 400041065 || skillID == 400041066 || skillID == 400041074 || skillID == 400041079
                        || skillID == 400051080
                        || skillID == 400011125 || skillID == 400011126
                        || skillID == 36141008
                        || skillID == 155121007 // sub_141083250(155121007, v144)
                        || skillID == 80003017
                        || skillID == 22201501
                        || skillID == 1241006
                        || skillID == 11141007
                        || skillID == 400041082 || skillID == 400041083
                        || skillID == 5241501
                        || skillID == 64141003) {
                    ai.pos = inPacket.decodePosition();
                }

                if (skillID == FirePoison.POISON_MIST) {
                    ai.force = inPacket.decodeByte();
                    ai.forcedXSh = inPacket.decodeShort();
                    ai.forcedYSh = inPacket.decodeShort();
                }

                if (skillID == 80001835) { // Soul Shear
                    byte sizeB = inPacket.decodeByte();
                    int[] idkArr2 = new int[sizeB];
                    short[] shortArr2 = new short[sizeB];
                    for (int i = 0; i < sizeB; i++) {
                        idkArr2[i] = inPacket.decodeInt();
                        shortArr2[i] = inPacket.decodeShort();
                    }
                    ai.delay = inPacket.decodeShort();
                    ai.mists = idkArr2;
                    ai.shortArr = shortArr2;
                }

                if (header == InHeader.USER_AREA_DOT_ATTACK) {
                    ai.pos.setX(inPacket.decodeShort());
                    ai.pos.setY(inPacket.decodeShort());
                }

                if (SkillConstants.isAranFallingStopSkill(skillID)) {
                    ai.fh = inPacket.decodeByte();
                }

                if (ai.inHeader == InHeader.USER_AFFECTED_AREA_FOR_SCREEN_ATTACK) {
                    inPacket.decodePosition();
                }

                if (header == InHeader.USER_SHOOT_ATTACK && skillID / 1000000 == 33) {
                    ai.bodyRelMove = inPacket.decodePosition();
                }

                if (skillID == Blaster.HYPER_MAGNUM_PUNCH
                        || SkillConstants.isShadowAssault(skillID)
                        || skillID == DawnWarrior.EQUINOX_SLASH
                        || SkillConstants.isOctoPunch(skillID)) {
                    ai.teleportByte = inPacket.decodeByte();
                    ai.teleportPt.setX(inPacket.decodeInt());
                    ai.teleportPt.setY(inPacket.decodeInt());
                }

                if (SkillConstants.isKeydownSkillRectMoveXY(skillID)) {
                    ai.keyDownRectMoveXY = inPacket.decodePosition();
                }

                if (skillID == Kaiser.INFERNO_BREATH || skillID == Kaiser.INFERNO_BREATH_FINAL_FORM) {
                    inPacket.decodeInt(); // unk
                    ai.Vx = inPacket.decodeShort();
                    ai.positions = new ArrayList<>();
                    for (int i = 0; i < ai.Vx; i++) {
                        // Inferno Breath Affected Area Positions
                        ai.positions.add(inPacket.decodePosition());
                    }
                }
                if (skillID == 14111006 && ai.grenadeId != 0) {
                    ai.grenadePos.setX(inPacket.decodeShort());
                    ai.grenadePos.setY(inPacket.decodeShort());
                }
                if (/*skillID == 23121002 ||*/skillID == 80001914) { // first skill is Spikes Royale, not needed?
                    ai.fh = inPacket.decodeByte();
                }

                if (skillID == Cadena.CHAIN_ARTS_PURSUIT_UP || skillID == Cadena.CHAIN_ARTS_PURSUIT_DOWN) {
                    if (inPacket.getUnreadAmount() > 5) {
                        int toReadAmount = inPacket.getUnreadAmount() - 5;
                        inPacket.decodeArr(toReadAmount);
                    }
                    inPacket.decodeByte(); // unk
                    ai.ptTarget = inPacket.decodePosition(); // pursuit hook end position
                }
                if (SkillConstants.isDivineEchoMimicSkills(skillID) && inPacket.getUnreadAmount() == 8) { // Divine Echo Mimic Skills
                    ai.isMimickedBy = inPacket.decodeInt(); // Mimic Chr Id
                    inPacket.decodePosition(); // Mimic Chr Position
                }
            } catch (Exception i) {
                // TODO?
            }

            boolean verify = !isExploitSkill(chr, ai);
            if (verify) {
                handleAttack(chr, ai);
            }
        } catch (Exception e) {
            DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT_ATTACK, String.format("[%s] Skill ID: %d unable to handle Attacks.", chr.getName(), skillID), false);
            chr.dispose();
        }
    }

    public static boolean[] calculateCriticalsByAverage(long[] damages, int totalCr) {
        if (damages == null || damages.length == 0) {
            return new boolean[0];
        }
        final double CRITICAL_MULTIPLIER = 1.1;
        final double SAME_SAME_MULTIPLIER = 0.95;
        final double UNIFORMITY_TOLERANCE = 0.10;
        double expectedCr = totalCr / 100.0;
        if (expectedCr >= 1.0) {
            boolean[] crits = new boolean[damages.length];
            Arrays.fill(crits, true);
            return crits;
        }
        if (damages.length == 1) {
            boolean[] crits = new boolean[1];
            Random rand = new Random();
            crits[0] = rand.nextDouble() < expectedCr;
            return crits;
        }
        long totalDamage = 0;
        long maxDamage = Long.MIN_VALUE;
        long minDamage = Long.MAX_VALUE;
        for (long dmg : damages) {
            totalDamage += dmg;
            if (dmg > maxDamage) maxDamage = dmg;
            if (dmg < minDamage) minDamage = dmg;
        }
        double averageDamage = (double) totalDamage / damages.length;
        boolean[] crits = new boolean[damages.length];
        double range = maxDamage - minDamage;
        boolean isHighlyUniform = (range / averageDamage) < UNIFORMITY_TOLERANCE;
        for (int i = 0; i < damages.length; i++) {
            long dmg = damages[i];
            if (isHighlyUniform) {
                crits[i] = true;
            }
            else if (dmg >= averageDamage * CRITICAL_MULTIPLIER || // Hit lớn hơn 110% Average
                    dmg >= averageDamage * SAME_SAME_MULTIPLIER) { // HOẶC Hit "same same" (>= 95% Average)
                crits[i] = true;
            } else {
                crits[i] = false;
            }
        }
        return crits;
    }

    @Handler(op = InHeader.FAMILIAR_ATTACK)
    public static void handleFamiliarAttack(Char chr, InPacket inPacket) {
        inPacket.decodeByte(); // ?
        int familiarID = inPacket.decodeInt();
        if (chr.getActiveFamiliar() == null || chr.getActiveFamiliar().getFamiliarID() != familiarID) {
            return;
        }
        AttackInfo ai = new AttackInfo();
        ai.attackHeader = OutHeader.FAMILIAR_ATTACK;
        ai.fieldKey = inPacket.decodeByte();
        ai.skillId = inPacket.decodeInt();
        ai.idk = inPacket.decodeByte();
        ai.slv = 1;

        int skillID = ai.skillId;

        SkillInfo si = SkillData.getSkillInfoById(skillID);
        if (si == null && skillID != 0) {
            if (chr.isGM()) {
                chr.chatScriptMessage("Skill " + skillID + " has not been implemented yet.");
            }
            chr.dispose();
            return;
        } else {
            ai.skillInfo = si;
        }

        ai.mobCount = inPacket.decodeByte();
        for (int i = 0; i < ai.mobCount; i++) {
            MobAttackInfo mai = new MobAttackInfo();
            mai.mobId = inPacket.decodeInt();
            inPacket.decodeInt();
            mai.byteIdk1 = inPacket.decodeByte();
            inPacket.decodeInt();
            mai.byteIdk2 = inPacket.decodeByte();
            inPacket.decodeInt();
            ai.hits = inPacket.decodeByte();
            long totalDamage = 0;
            mai.damages = new long[ai.hits];
            for (int j = 0; j < ai.hits; j++) {
                long damage = inPacket.decodeLong();
                totalDamage += damage;
                mai.damages[j] = damage;
            }
            ai.totalDamageDealt = totalDamage;
            ai.mobAttackInfo.add(mai);
        }
        inPacket.decodeInt();
        handleAttack(chr, ai);
    }

    @Handler(op = InHeader.USER_MOVING_SHOOT_ATTACK_PREPARE)
    public static void handleMovingShootAttackPrepare(Char chr, InPacket inPacket) {
        if (chr == null) return;
        int skillID = inPacket.decodeInt();
        short mask = inPacket.decodeShort();
        boolean isLeft = (mask >> 15) != 0;
        int action = mask & 0x7FFF;
        byte actionSpeed = inPacket.decodeByte();
    }

    @Handler(op = InHeader.ADD_ATTACK_RESET)
    public static void handleAddAttackReset(Char chr, InPacket inPacket) {
        int parentSkillID = inPacket.decodeInt();
        if (JobConstants.isZero(chr.getJob())) {
            return;
        }
        chr.resetSkillCoolTime(parentSkillID);
    }

    @Handler(op = InHeader.CHARGE_STACKING_MATRIX_SKILL_REQUEST)
    public static void handleStackingMatrixSkillRequest(Char chr, InPacket inPacket) {
        if (JobConstants.isWarriorEquipJob(chr.getJob())) {
            if (chr.getTemporaryStatManager().hasStat(Warrior_AuraWeaponStack) && chr.hasSkill(Job.WEAPON_AURA)) {
                chr.write(UserLocal.userBonusAttackRequest(Job.WEAPON_AURA_ATTACK));
            }
        }
    }

    @Handler(op = InHeader.DIVINE_ECHO_EXPIRE_REQUEST)
    public static void handleDivineEchoExpireRequest(Char chr, InPacket inPacket) {
        Paladin.removeDivineEchoLinkedBuffs(chr);
    }

    @Handler(op = InHeader.STACK_OVER_TIME_SKILL_INCREASE_REQUEST)
    public static void handleStackOverTimeSkillIncreaseRequest(Char chr, InPacket inPacket) {
        int skillID = inPacket.decodeInt();
        Option o1 = new Option();
        switch (skillID) {
            case Job.WEAPON_AURA:
                if (chr.hasSkill(skillID)) {
                    TemporaryStatManager tsm = chr.getTemporaryStatManager();
                    byte val = tsm.hasStat(Warrior_AuraWeaponStack) ? (byte) (tsm.getTotalNOptionOfStat(Warrior_AuraWeaponStack) + 1) : 2;
                    o1.nOption = Math.min(2, val);
                    o1.rOption = skillID;
                    tsm.sendStat(Warrior_AuraWeaponStack, o1);
                    chr.write(WvsContext.updateSkillStackRequestResult(skillID, (byte) o1.nOption));
                }
                break;
            case BowMaster.SILHOUETTE_MIRAGE:
                if (chr.hasSkill(skillID)) {
                    ((BowMaster) chr.getJobHandler()).increaseSilhouetteMirageClone();
                }
                break;
            case BlazeWizard.INFERNO_SPHERE:
                if (chr.hasSkill(skillID)) {
                    ((BlazeWizard) chr.getJobHandler()).increasePhoenixFeather();
                }
                break;
            case WindArcher.HOWLING_GALE:
                if (chr.hasSkill(skillID)) {
                    ((WindArcher) chr.getJobHandler()).increaseWindEnergy();
                }
                break;
            case Xenon.SUPPLY_SURPLUS:
            case Xenon.CORE_OVERLOAD_BUFF:
                if (chr.hasSkill(skillID)) {
                    ((Xenon) chr.getJobHandler()).incrementSupply(1);
                }
                break;
            case Adele.AETHER_WEAVING:
                if (chr.hasSkill(skillID)) {
                    ((Adele) chr.getJobHandler()).autoModifyAether();
                }
                break;
            case HoYoung.MASTER_ELIXIR:
                if (chr.hasSkill(skillID)) {
                    ((HoYoung) chr.getJobHandler()).restoreMasterExilir();
                }
                break;
            case DemonAvenger.REVENANT:
                if (chr.hasSkill(skillID)) {
                    ((DemonAvenger) chr.getJobHandler()).reduceFuryRevenant();
                }
                break;
            case Hero.HEXA_BEAM_BLADE:
                if (chr.hasSkill(skillID)) {
                    ((Hero) chr.getJobHandler()).increaseBeamBlade();
                }
                break;
            case Cannoneer.BARREL_ROULETTE:
                if (chr.hasSkill(skillID)) {
                    ((Cannoneer) chr.getJobHandler()).giveBarrelRouletteBuff(skillID);
                }
                break;
            case Cannoneer.HEXA_ROLLING_RAINBOW:
                if (chr.hasSkill(skillID)) {
                    ((Cannoneer) chr.getJobHandler()).increaseRollingRainbow();
                }
                break;
            // Không cố định skill ID:
            case -2:
                if (chr.hasSkill(Cannoneer.BIG_HUGE_GIGANTIC_ROCKET)) {
                    ((Cannoneer) chr.getJobHandler()).incVSkillStackBuff();
                }
                if (chr.hasSkill(Buccaneer.SERPENT_VORTEX)) {
                    ((Buccaneer) chr.getJobHandler()).incVSkillStackBuff();
                }
                if (chr.hasSkill(MoXuan.SECRET_ART_ARROW_FLIGHT)) {
                    ((MoXuan) chr.getJobHandler()).increaseArrowFlight();
                }
                if (chr.hasSkill(Paladin.MIGHTY_MJOLNIR)) {
                    ((Paladin) chr.getJobHandler()).increaseMightyMjolnir();
                }
                if (chr.hasSkill(Bishop.DIVINE_PUNIHSMENT)) {
                    ((Bishop) chr.getJobHandler()).increaseDivinePunishment();
                }
                if (chr.hasSkill(Lynn.SWEEP)) {
                    ((Lynn) chr.getJobHandler()).incVSkillStackBuff();
                }
                break;
            case -1:
                if (chr.hasSkill(Cannoneer.MONKEY_MORTAR)) {
                    ((Cannoneer) chr.getJobHandler()).increaseMonkeyMortar();
                }
                break;
        }
    }

    @Handler(op = InHeader.CREEPING_TOXIN_AREA_REQUEST)
    public static void handleCreepingToxinAreaRequest(Char chr, InPacket inPacket) {
        if (JobConstants.isFirePoison(chr.getJob()) && chr.getJobHandler() instanceof FirePoison firePoison) {
            firePoison.spawnCreepingToxinAreas(inPacket);
        }
    }

    @Handler(op = InHeader.SHOOT_OBJECT_CREATE_REQUEST)
    public static void handleShootObjectCreateRequest(Char chr, InPacket inPacket) {
        ShootObjectSkillInfo shootObjectSkillInfo = new ShootObjectSkillInfo(chr.getId());

        int skillID = inPacket.decodeInt();
        int slv = inPacket.decodeInt();

        shootObjectSkillInfo.setSkillId(skillID);
        shootObjectSkillInfo.setSlv(slv);

        SkillUseInfo skillUseInfo = new SkillUseInfo(skillID, slv);
        new ProcessType(skillUseInfo).decode(inPacket);

        shootObjectSkillInfo.setAction(inPacket.decodeInt()); // action
        shootObjectSkillInfo.setActionSpeed(inPacket.decodeInt()); // action Speed
        shootObjectSkillInfo.setUnknownBool(inPacket.decodeByte());
        shootObjectSkillInfo.setProjectileItemId(inPacket.decodeInt());
        shootObjectSkillInfo.setProjectileItemPosition(inPacket.decodeInt());

        inPacket.decodeByte();
        inPacket.decodeInt();
        inPacket.decodeByte();
        inPacket.decodeByte(); // Unknown

        shootObjectSkillInfo.setPosition(inPacket.decodePosition());

        shootObjectSkillInfo.setEncodeExtra(inPacket.decodeByte() != 0);
        if (shootObjectSkillInfo.isEncodeExtra()) {
            shootObjectSkillInfo.extraEncodeInt1 = inPacket.decodeInt();
            shootObjectSkillInfo.extraEncodeInt2 = inPacket.decodeInt();
            shootObjectSkillInfo.extraEncodeInt3 = inPacket.decodeInt();
            shootObjectSkillInfo.extraEncodeInt4 = inPacket.decodeInt();
            shootObjectSkillInfo.extraEncodeInt5 = inPacket.decodeInt();
            shootObjectSkillInfo.extraEncodeInt6 = inPacket.decodeInt();
            shootObjectSkillInfo.extraEncodeByte1 = inPacket.decodeByte();
            shootObjectSkillInfo.extraEncodeInt7 = inPacket.decodeInt();
            shootObjectSkillInfo.extraEncodeByte2 = inPacket.decodeByte();
            shootObjectSkillInfo.extraEncodeLong1 = inPacket.decodeLong();
            shootObjectSkillInfo.extraEncodeInt8 = inPacket.decodeInt();
            shootObjectSkillInfo.extraEncodeInt9 = inPacket.decodeInt();
        }
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipInt();
        int loopSize = inPacket.decodeInt();
        for (int i = 0; i < loopSize; i++) {
            ShootObject shootObject = new ShootObject(chr, inPacket);
            shootObjectSkillInfo.getShootObjects().add(shootObject);
        }

        Job job = chr.getJobHandler();
        job.handleShootObject(chr, shootObjectSkillInfo);
        if (skillID == Kinesis.MIND_OVER_MATTER) {
            SkillInfo si = SkillData.getSkillInfoById(skillID);
            int ppCons = si.getValue(ppCon, slv);
            ((Kinesis) job).substractPP(ppCons);
        }

        if (skillID == Ren.RIOTOUS_HEART || skillID == Ren.HEXA_RIOTOUS_HEART) {
            if (!chr.getTemporaryStatManager().hasStat(RenPlumSwordForm3Shoot)) {
                return;
            }
        }

        chr.write(UserLocal.shootObjectCreated(shootObjectSkillInfo));
        chr.getField().broadcast(UserRemote.shootObject(shootObjectSkillInfo), chr);
        chr.dispose();
    }

    @Handler(op = InHeader.SHOOT_OBJECT_EXPLODE_REQUEST)
    public static void handleShootObjectExplodeRequest(Char chr, InPacket inPacket) {
        int size = inPacket.decodeInt();
        List<Integer> shootObjectIdList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            shootObjectIdList.add(inPacket.decodeInt());
        }

        if (JobConstants.isFirePoison(chr.getJob()) && chr.hasSkill(FirePoison.POISON_NOVA)
                && chr.getJobHandler() instanceof FirePoison firePoison) {
            firePoison.setExplodeShootObjList(shootObjectIdList);
            chr.getTimer().addEvent(() -> firePoison.getExplodeShootObjList().clear(), 6, TimeUnit.SECONDS);
        }
    }

    private static void attackBonusReader(InPacket inPacket, AttackInfo attackInfo) {
        inPacket.skipByte();
        inPacket.skipShort(); // bullet slot
        inPacket.skipInt();
        inPacket.skipByte(); // by Unreliable Memory?
        inPacket.skipByte();
        inPacket.skipByte();
        inPacket.skipByte();
        inPacket.skipInt();
        inPacket.skipLong();
        inPacket.skipInt();
        inPacket.skipInt();
        int count = inPacket.decodeInt(); // bonus attack Count
        for (int i = 0; i < count; i++) {
            inPacket.skipInt();
        }
        inPacket.skipByte();
        inPacket.skipByte();
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipLong();
        inPacket.skipLong();
        inPacket.skipLong();
        inPacket.skipByte();
        int count2 = inPacket.decodeInt(); // bonus attack Count
        for (int i = 0; i < count2; i++) {
            inPacket.skipInt();
        }
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipInt();
        inPacket.skipString();
        inPacket.skipInt();
        inPacket.skipInt(); // tick
        inPacket.skipByte();
        int count3 = inPacket.decodeInt(); // bonus attack Count
        for (int i = 0; i < count3; i++) {
            inPacket.skipInt();
            inPacket.skipInt();
        }
        inPacket.skipInt();
    }

    private static void summonAttackBonusReader(InPacket inPacket, AttackInfo attackInfo) {
        inPacket.decodeByte();
        inPacket.decodeByte();
        inPacket.decodeByte();
        int count = inPacket.decodeInt(); // bonus attack Count
        for (int i = 0; i < count; i++) {
            inPacket.decodeInt();
            inPacket.decodeInt();
        }
        inPacket.decodeInt();
        inPacket.decodeString();
        inPacket.decodeInt();
        inPacket.decodeByte();
    }

    private static void parseAttackInfoPacket(InPacket inPacket, MobAttackInfo mai) {
        // PACKETMAKER::MakeAttackInfoPacket
        mai.type = inPacket.decodeByte();
        mai.currentAnimationName = "";
        if (mai.type == 1) {
            mai.currentAnimationName = inPacket.decodeString();
            inPacket.decodeString();
            mai.animationDeltaL = inPacket.decodeInt();
            mai.animationBool = inPacket.decodeByte() != 0;
            if (mai.animationBool) {
                mai.hitPartRunTimesSize = inPacket.decodeInt();
                mai.hitPartRunTimes = new String[mai.hitPartRunTimesSize];
                for (int j = 0; j < mai.hitPartRunTimesSize; j++) {
                    mai.hitPartRunTimes[j] = inPacket.decodeString();
                }
            } else {
                mai.hitPartRunTimesSize = inPacket.decodeInt();
            }
        } else if (mai.type == 2) {
            mai.currentAnimationName = inPacket.decodeString();
            inPacket.skipString();
            mai.animationDeltaL = inPacket.decodeInt();
            mai.animationBool = inPacket.decodeByte() != 0;
        }
        inPacket.skipByte();
        inPacket.skipPosition();
        inPacket.skipPosition();
        inPacket.skipPosition();
        inPacket.skipByte();
        inPacket.skipByte();
        inPacket.skipByte();
        inPacket.skipInt();
        boolean bool = inPacket.decodeByte() != 0;
        if (bool) {
            inPacket.skipInt();
            inPacket.skipInt();
            int size = inPacket.decodeInt();
            for (int i = 0; i < size; i++) {
                inPacket.skipInt();
                inPacket.skipLong();
                inPacket.skipString();
                inPacket.skipLong();
            }
            inPacket.skipInt();
            inPacket.skipInt();
            inPacket.skipInt();
            inPacket.skipInt();
            inPacket.skipLong();
            inPacket.skipLong();
            inPacket.skipInt();
            inPacket.skipInt();
            inPacket.skipInt();
        }
        inPacket.skipInt(); // mobTemplateID
        inPacket.skipInt();
        int size = inPacket.decodeInt();
        for (int i = 0; i < size; i++) {
            inPacket.skipInt();
            inPacket.skipInt();
        }
    }

    public static boolean isExploitSkill(Char chr, AttackInfo attackInfo) {
        switch (attackInfo.skillId) {
            case 80001332, 80001593, 80001706 -> {
                User user = chr.getUser();
                String name = user.getName();
                try {
                    LocalDateTime banDate = LocalDateTime.now().plusDays(365);
                    user.setBanExpireDate(FileTime.fromDate(banDate));
                    user.setBanReason("Memory Edits");
                    user.saveToSQL(true);
                    BannedMachines.addBannedMachine(user.getMachineID());
                    DiscordAPI.send("banned", String.format("Account ||%s|| have been banned with reason: %s for %d day(s).", name, "Memory Edits", 365), DiscordAPI.mainGuildServer);
                } catch (Exception e) {
                    DiscordAPI.send("lệnh", "Không thể khoá tài khoản " + chr.getName(), DiscordAPI.staffGuildServer);
                } finally {
                    chr.setUser(user);
                    chr.getClient().setUser(user);
                    chr.getClient().close();
                    DataPrinter.send(DataPrinter.AUTOBAN_WARNING,
                            String.format("[%s] Sử dụng bug kỹ năng, Nhân vật: %s, ID Kỹ năng: %d, Tên kỹ năng: %s.",
                                    chr.getClient().getIP(),
                                    chr.getName(),
                                    attackInfo.skillId,
                                    StringData.getSkillStringById(attackInfo.skillId)));
                }
                return true;
            }
        }
        return false;
    }
}
