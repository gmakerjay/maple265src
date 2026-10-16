package net.swordie.ms.handlers.user;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.ExtendSP;
import net.swordie.ms.client.character.skills.HyperStat;
import net.swordie.ms.client.character.skills.Skill;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.jobs.Job;
import net.swordie.ms.client.jobs.cygnus.DawnWarrior;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.*;
import net.swordie.ms.constants.*;
import net.swordie.ms.enums.InstanceTableType;
import net.swordie.ms.enums.Stat;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.loaders.containerclasses.MakingSkillRecipe;
import net.swordie.ms.scripts.ScriptType;
import net.swordie.ms.util.DataPrinter;

import java.util.*;

public class UserStatHandler {

    @Handler(op = InHeader.USER_SKILL_UP_REQUEST)
    public static void handleUserSkillUpRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int skillID = inPacket.decodeInt();
        int amount = inPacket.decodeInt();
        if (amount < 1) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
            return;
        }
        // seperate skill/current skills for adding stuff to the base cache if everything is succesful
        Skill skill = SkillData.getSkillDeepCopyById(skillID);
        Skill curSkill = chr.getSkill(skillID);
        byte jobLevel = (byte) JobConstants.getJobLevel((short) skill.getRootId());
        if (JobConstants.isZero((short) skill.getRootId())) {
            jobLevel = JobConstants.getJobLevelByZeroSkillID(skillID);
        }
        Map<Stat, Object> stats;
        int rootId = skill.getRootId();
        if ((!JobConstants.isBeginnerJob((short) rootId) && !SkillConstants.isMatching(rootId, chr.getJob())) || SkillConstants.isSkillFromItem(skillID)) {
            DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("Character %d tried adding an invalid skill (job %d, skill id %d)", chr.getId(), rootId, skillID));
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
            return;
        }
        if (JobConstants.isBeginnerJob((short) rootId)) {
            stats = new HashMap<>();
            int spentSp = 0;
            for (Skill s : chr.getSkills()) {
                if (SkillConstants.isBeginnerSpAddableSkill(s.getSkillId())) {
                    int currentLevel = s.getCurrentLevel();
                    spentSp += currentLevel;
                }
            }
            int totalSp;
            if (JobConstants.isResistance((short) skill.getRootId())) {
                totalSp = Math.min(chr.getLevel(), GameConstants.RESISTANCE_SP_MAX_LV) - 1; // sp gained from 2~10
            } else {
                totalSp = Math.min(chr.getLevel(), GameConstants.BEGINNER_SP_MAX_LV) - 1; // sp gained from 2~7
            }
            if (totalSp - spentSp >= amount) {
                int curLevel = curSkill == null ? 0 : curSkill.getCurrentLevel();
                int max = curSkill == null ? skill.getMasterLevel() : curSkill.getMasterLevel();
                if (max == 0) {
                    // some beginner skills have no max level, default is 3
                    max = 3;
                }
                int newLevel = curLevel + amount > max ? max : curLevel + amount;
                skill.setCurrentLevel(newLevel);
                chr.addSkill(skill);
                chr.write(WvsContext.changeSkillRecordResult(skill));
                return;
            }
        } else if (JobConstants.isExtendSpJob(chr.getJob())) {
            ExtendSP esp = chr.getAvatarData().getCharacterStat().getExtendSP();
            int currentSp = esp.getSpByJobLevel(jobLevel);
            if (currentSp >= amount) {
                int curLevel = curSkill == null ? 0 : curSkill.getCurrentLevel();
                int max = 0;
                //Some skill don't need mastery Book but have mastery Level = 10.
                switch (skillID) {
                    case 1120012:
                    case 1320011:
                    case 21120011:
                        max = skill.getMaxLevel();
                        break;
                    default:
                        max = curSkill == null ? skill.getMasterLevel() : curSkill.getMasterLevel();
                        if (max <= 0) {
                            max = skill.getMaxLevel();
                        }
                        break;
                }
                int newLevel;
                if (curLevel + amount >= max) {
                    newLevel = max;
                    amount = max - curLevel;
                } else {
                    newLevel = curLevel + amount;
                }
                if (curSkill != null && curSkill.getMasterLevel() > skill.getMasterLevel()) {
                    skill.setMasterLevel(curSkill.getMasterLevel());
                } else if (skill.getMasterLevel() < max) {
                    skill.setMasterLevel(max);
                }
                skill.setCurrentLevel(newLevel);
                esp.setSpToJobLevel(jobLevel, currentSp - amount);
                chr.addSkill(skill);
                chr.write(WvsContext.changeSkillRecordResult(skill));
                syncMoXuanSubSkills(chr, skillID, newLevel);
                stats = new HashMap<>();
                stats.put(Stat.sp, esp);
            } else {
                DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("Character %d tried adding a skill without having the required amount of sp (required %d, has %d)", chr.getId(), currentSp, amount));
                return;
            }
        } else {
            int currentSp = chr.getAvatarData().getCharacterStat().getSp();
            if (currentSp >= amount) {
                int curLevel = curSkill == null ? 0 : curSkill.getCurrentLevel();
                int max = curSkill == null ? skill.getMasterLevel() : curSkill.getMasterLevel();
                if (max <= 0) {
                    max = skill.getMaxLevel();
                }
                int newLevel;
                if (curLevel + amount > max) {
                    newLevel = max;
                    amount = max - curLevel;
                } else {
                    newLevel = curLevel + amount;
                }
                if (curSkill != null && curSkill.getMasterLevel() > skill.getMasterLevel()) {
                    skill.setMasterLevel(curSkill.getMasterLevel());
                } else if (skill.getMasterLevel() < max) {
                    skill.setMasterLevel(max);
                }
                skill.setCurrentLevel(newLevel);
                chr.getAvatarData().getCharacterStat().setSp(currentSp - amount);
                chr.addSkill(skill);
                chr.write(WvsContext.changeSkillRecordResult(skill));
                syncMoXuanSubSkills(chr, skillID, newLevel);
                stats = new HashMap<>();
                stats.put(Stat.sp, chr.getAvatarData().getCharacterStat().getSp());
            } else {
                DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("Character %d tried adding a skill without having the required amount of sp (required %d, has %d)", chr.getId(), currentSp, amount));
                return;
            }
        }
        if (stats != null) {
            chr.sendStatsPacket(stats);
            if (EventConstants.HYPER_BURNING_MAX && chr.hasQuest(102430)
                    && !"done".equals(chr.getQRValueByKey(102430, "step"))) {
                chr.getScriptManager().startScript(chr, 102430, "q102430s_1", ScriptType.Quest);
            }
        } else {
            DataPrinter.send(DataPrinter.AUTOBAN_WARNING, String.format("skill stats are null (%d)", skillID));
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
        }
    }

    @Handler(op = InHeader.USER_ABILITY_UP_REQUEST)
    public static void handleUserAbilityUpRequest(Char chr, InPacket inPacket) {
        if (chr.getStat(Stat.ap) <= 0) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
            return;
        }
        inPacket.decodeInt(); // tick
        short stat = inPacket.decodeShort();
        Stat charStat = Stat.getByVal(stat);
        short amount = 1;
        boolean isHpOrMp = false;
        if (charStat == Stat.mmp || charStat == Stat.mhp) {
            isHpOrMp = true;
            amount = 20;
        }
        chr.addStat(charStat, amount);
        chr.addStat(Stat.ap, (short) -1);
        Map<Stat, Object> stats = new HashMap<>();
        if (isHpOrMp) {
            stats.put(charStat, chr.getStat(charStat));
        } else {
            stats.put(charStat, (short) chr.getStat(charStat));
        }
        stats.put(Stat.ap, (short) chr.getStat(Stat.ap));
        chr.sendStatsPacket(stats);
        chr.dispose();
    }

    @Handler(op = InHeader.USER_ABILITY_MASS_UP_REQUEST)
    public static void handleUserAbilityMassUpRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int autoSpSize = inPacket.decodeInt();
        if (inPacket.getUnreadAmount() < autoSpSize * 12L) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
            return;
        }
        Stat charStat = null;
        Stat charStat2 = null;
        int primaryStat = (int) inPacket.decodeLong();
        int amount1 = inPacket.decodeInt();
        int SecondaryStat = autoSpSize > 1 ? (int) inPacket.decodeLong() : 0;
        int amount2 = autoSpSize > 1 ? inPacket.decodeInt() : 0;
        if (amount1 < 0 || amount2 < 0) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
            return;
        }
        if (amount1 + amount2 > chr.getStat(Stat.ap)) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
            return;
        }
        charStat = Stat.getByVal(primaryStat);
        charStat2 = Stat.getByVal(SecondaryStat);
        if (charStat != null) {
            boolean isHpOrMp = false;
            if (charStat == Stat.mmp || charStat == Stat.mhp) {
                isHpOrMp = true;
            }
            chr.addStat(charStat, amount1 * 20);
            chr.addStat(Stat.ap, (short) -amount1);
            Map<Stat, Object> stats = new HashMap<>();
            if (isHpOrMp) {
                stats.put(charStat, chr.getStat(charStat));
            } else {
                stats.put(charStat, (short) chr.getStat(charStat));
            }
            stats.put(Stat.ap, (short) chr.getStat(Stat.ap));
            chr.sendStatsPacket(stats);
        }
        if (charStat2 != null && amount2 != 0) {
            boolean isHpOrMp = false;
            if (charStat2 == Stat.mmp || charStat2 == Stat.mhp) {
                isHpOrMp = true;
            }
            chr.addStat(charStat2, amount2 * 20);
            chr.addStat(Stat.ap, (short) -amount2);
            Map<Stat, Object> stats = new HashMap<>();
            if (isHpOrMp) {
                stats.put(charStat2, chr.getStat(charStat2));
            } else {
                stats.put(charStat2, (short) chr.getStat(charStat2));
            }
            stats.put(Stat.ap, (short) chr.getStat(Stat.ap));
            chr.sendStatsPacket(stats);
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_DOT_HEAL)
    public static void handleUserDotHeal(Char chr, InPacket inPacket) {
        TemporaryStatManager tsm = chr.getTemporaryStatManager();
        int mask = inPacket.decodeInt();

        int heal = inPacket.decodeInt();
        if (tsm.hasStat(CharacterTemporaryStat.DotHealHPPerSecond)) {
            heal = (int) (tsm.getTotalNOptionOfStat(CharacterTemporaryStat.DotHealHPPerSecond) * chr.getMaxHP() / 100.0D);
        } else if (tsm.hasStat(CharacterTemporaryStat.DotHealMPPerSecond)) {
            heal = (int) (tsm.getTotalNOptionOfStat(CharacterTemporaryStat.DotHealMPPerSecond) * chr.getMaxMP() / 100.0D);
        }
        if (mask == Stat.hp.getVal()) {
            chr.heal(heal);
        } else if (mask == Stat.mp.getVal()) {
            chr.healMP(heal);
        }
    }

    @Handler(op = InHeader.USER_CHANGE_STAT_REQUEST)
    public static void handleUserChangeStatRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int mask = inPacket.decodeInt();
        List<Stat> stats = Stat.getStatsByFlag(mask);
        inPacket.decodeInt();
        short hpVal = 0;
        short mpVal = 0;
        boolean hasHp = false;
        boolean hasMp = false;
        for (Stat stat : stats) {
            short val = inPacket.decodeShort();
            if (stat == Stat.hp) {
                hpVal = val;
                hasHp = true;
            } else if (stat == Stat.mp) {
                mpVal = val;
                hasMp = true;
            }
            // các stat khác decode bỏ qua
        }
        byte option = inPacket.decodeByte();
        if (hasHp) {
            chr.heal(hpVal);
        }
        if (hasMp) {
            chr.healMP(mpVal);
        }
    }

    @Handler(op = InHeader.USER_CHANGE_STAT_REQUEST_BY_ITEM_OPTION)
    public static void handleUserChangeStatByItemOptionRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int mask = inPacket.decodeInt();
        int hp = inPacket.decodeInt();
        int mp = inPacket.decodeInt();
        if (hp > 0) {
            chr.heal(hp);
        }
        if (mp > 0) {
            chr.healMP(mp);
        }
    }

    @Handler(op = InHeader.USER_REQUEST_INSTANCE_TABLE)
    public static void handleUserRequestInstanceTable(Char chr, InPacket inPacket) {
        String requestStr = inPacket.decodeString();
        int type = inPacket.decodeInt();
        int subType = inPacket.decodeInt();

        InstanceTableType itt = InstanceTableType.getByStr(requestStr);
        if (itt == null) {
            System.out.printf("Unknown instance table type request %s, type %d, subType %d%n", requestStr, type, subType);
            chr.dispose();
            return;
        }
        int value;
        switch (itt) {
            // HyperSkills: both have the same requestStr. level = type * 5
            case HyperActiveSkill:
            case HyperPassiveSkill:
                if (subType == InstanceTableType.HyperActiveSkill.getSubType()) {
                    value = SkillConstants.getHyperActiveSkillSpByLv(type * 5);
                } else {
                    value = SkillConstants.getHyperPassiveSkillSpByLv(type * 5);
                }
                break;
            case HyperStatIncAmount:
                // type == level
                value = SkillConstants.getHyperStatSpByLv((short) type);
                break;
            case NeedHyperStatLv:
                // type == skill lv
                value = SkillConstants.getNeededSpForHyperStatSkill(type);
                break;
            case Skill_9200:
            case Skill_9201:
            case Skill_9202:
            case Skill_9203:
            case Skill_9204:
                // type == recommendSkillLevel - 1
                // subType == making skill level -1
                value = MakingSkillRecipe.getSuccessProb(Integer.parseInt(requestStr), type + 1, chr.getMakingSkillLevel(Integer.parseInt(requestStr)));
                break;
            default:
                System.out.printf("Unhandled instance table type request %s, type %d, subType %d%n", itt, type, subType);
                return;
        }

        chr.write(WvsContext.resultInstanceTable(requestStr, type, subType, true, value));
    }

    @Handler(ops = {InHeader.USER_HYPER_STAT_RESET_REQUEST})
    public static void handleUserHyperStatResetRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int preset = inPacket.decodeInt();
        if (preset > 2 && preset < 0) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
            return;
        }
        if (chr.getMoney() < GameConstants.HYPER_STAT_RESET_COST) {
            chr.chatPopup(String.format("Bạn không đủ tiền để thực hiện hành động này. (Yêu cầu: %d mesos)", GameConstants.HYPER_STAT_RESET_COST));
            chr.dispose();
        } else if (chr.getLevel() < 140) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
        } else {
            Map<Stat, Object> stats = new HashMap<>();
            chr.deductMoney(GameConstants.HYPER_STAT_RESET_COST);
            List<Skill> skills = new ArrayList<>();
            for (HyperStat hyperStats : chr.getHyperStats(preset)) {
                hyperStats.setSkillLevel(0);
                Skill skill = chr.getSkill(hyperStats.getSkillID(), true);
                if (skill != null) {
                    skill.setCurrentLevel(0);
                    skills.add(skill);
                    chr.addSkill(skill);
                }
            }
            stats.put(Stat.sp, chr.getAvatarData().getCharacterStat().getExtendSP());
            chr.write(WvsContext.changeSkillRecordResult(skills, true, false, false));
            chr.write(WvsContext.updateHyperPresets(chr, preset, (byte) 1));
            chr.write(WvsContext.receiveHyperStatResetResult(chr.getId(), true, true));
            chr.sendStatsPacket(stats);
        }
        chr.dispose();
    }

    @Handler(ops = {InHeader.USER_HYPER_STAT_CHANGE_PRESET_REQUEST})
    public static void handleUserHyperStatChangePresetRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int preset = inPacket.decodeInt();
        if (preset > 2 && preset < 0) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
            return;
        }
        handleChangeHyperStatPreset(chr, preset);
    }

    public static void handleChangeHyperStatPreset(Char chr, int preset) {
        Map<Stat, Object> stats = new HashMap<>();
        List<Skill> skills = new ArrayList<>();
        for (HyperStat hyperStat : chr.getHyperStats(preset)) {
            Skill skill = chr.getSkill(hyperStat.getSkillID(), true);
            skill.setCurrentLevel(hyperStat.getSkillLevel());
            chr.addSkill(skill);
            skills.add(skill);
        }
        chr.createQuestWithQRValue(QuestConstants.HYPER_STATS_PRESET, "hyperstats=" + preset);
        stats.put(Stat.sp, chr.getAvatarData().getCharacterStat().getExtendSP());
        chr.write(WvsContext.changeSkillRecordResult(skills, true, false, false));
        chr.write(WvsContext.updateHyperPresets(chr, preset, (byte) 0));
        chr.sendStatsPacket(stats);
        chr.dispose();
    }

    @Handler(op = InHeader.USER_HYPER_SKILL_RESET_REQUEST)
    public static void handleUserHyperSkillsResetRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick        
        boolean all = inPacket.decodeByte() != 0;
        int type = inPacket.decodeByte();
        int availableHyperSkillSP = chr.getSpentActiveHyperSkillSp() + chr.getSpentPassiveHyperSkillSp();
        if (chr.getMoney() < GameConstants.HYPER_SKILL_RESET_COST) {
            chr.chatPopup(String.format("Bạn không đủ tiền để thực hiện hành động này. (Yêu cầu: %d mesos)", GameConstants.HYPER_SKILL_RESET_COST));
            chr.dispose();
        } else if (availableHyperSkillSP <= 0 || chr.getLevel() < 140) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
        } else {
            Map<Stat, Object> stats = new HashMap<>();
            List<Integer> currentHyperSkills = SkillConstants.getHyperSkill(chr.getJob());
            chr.deductMoney(GameConstants.HYPER_SKILL_RESET_COST);
            List<Skill> newHyperSkills = new ArrayList<>();
            for (int id : currentHyperSkills) {
                Skill skill = chr.getSkill(id);
                if (skill != null) {
                    skill.setCurrentLevel(0);
                    newHyperSkills.add(skill);
                    chr.removeFromBaseStatCache(skill);
                    chr.addSkill(skill);
                }
            }
            chr.addSpToJobByCurrentLevel(availableHyperSkillSP);
            stats.put(Stat.sp, chr.getAvatarData().getCharacterStat().getExtendSP());
            chr.write(WvsContext.changeSkillRecordResult(newHyperSkills, true, false, false));
            chr.write(WvsContext.receiveHyperSkillResetResult(chr.getId(), true, true));
        }
        chr.dispose();
    }

    @Handler(op = InHeader.USER_HYPER_SKILL_UP_REQUEST)
    public static void handleUserHyperSkillUpRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int skillID = inPacket.decodeInt();
        SkillInfo skillInfo = SkillData.getSkillInfoById(skillID);
        if (skillInfo == null) {
            System.out.printf("Character %d attempted assigning hyper SP to a skill with null skill info (%d).%n", chr.getId(), skillID);
            chr.dispose();
            return;
        }
        if (skillInfo.getHyper() != 0 && !SkillConstants.isMatching(skillInfo.getRootId(), chr.getJob()) && !SkillConstants.isHyperSkill(chr.getJob(), skillID)) {
            System.out.printf("Character %d attempted assigning hyper SP to a wrong hyper skill (skill id %d, player job %d)%n", chr.getId(), skillID, chr.getJob());
            chr.dispose();
            return;
        }
        Skill skill = chr.getSkill(skillID, true);
        if (skillInfo.getHyper() != 0) { // Passive/Active hyper
            chr.write(UserPacket.effect(Effect.avatarOriented("Effect/CharacterEff.img/LevelUpHyper")));
            chr.getField().broadcast(UserRemote.effect(chr.getId(), Effect.avatarOriented("Effect/CharacterEff.img/LevelUpHyper")));
        } else { // not hyper skill
            System.out.printf("Character %d attempted assigning hyper stat to an improper skill. (%d, job %d)%n", chr.getId(), skillID, chr.getJob());
            chr.dispose();
            return;
        }
        chr.removeFromBaseStatCache(skill);
        skill.setCurrentLevel(skill.getCurrentLevel() + 1);
        chr.addToBaseStatCache(skill);
        chr.addSkill(skill);
        chr.write(WvsContext.changeSkillRecordResult(skill));
        syncMoXuanSubSkills(chr, skillID, skill.getCurrentLevel());
        chr.dispose();
        if (EventConstants.HYPER_BURNING_MAX
                && chr.hasQuest(102446)
                && !"done".equals(chr.getQRValueByKey(102446, "step"))) {
            chr.getScriptManager().startScript(chr, 102446, "q102446s_1", ScriptType.Quest);
        }
    }

    @Handler(op = InHeader.USER_HYPER_STAT_UP_REQUEST)
    public static void handleUserHyperStatUpRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt(); // tick
        int preset = inPacket.decodeInt(); // preset
        if (preset > 2 && preset < 0) {
            chr.chatPopup("Lỗi không xác định.");
            chr.dispose();
            return;
        }
        int skillID = inPacket.decodeInt();
        int amount = inPacket.decodeInt();
        HyperStat hyperStat = chr.getHyperStats(preset, skillID);
        SkillInfo skillInfo = SkillData.getSkillInfoById(skillID);
        if (skillInfo == null || hyperStat == null) {
            System.out.printf("Character %d attempted assigning hyper SP to a skill with null skill info (%d).%n", chr.getId(), skillID);
            chr.dispose();
            return;
        }
        Skill skill = chr.getSkill(skillID, true);
        short level = chr.getLevel();
        if (skillInfo.getHyperStat() != 0) {
            int totalHyperSp = SkillConstants.getTotalHyperStatSpByLevel(level);
            int spentSp = chr.getSpentHyperSp(preset);
            int availableSp = totalHyperSp - spentSp;
            int neededSp = SkillConstants.getNeededSpForHyperStatSkill(hyperStat.getSkillLevel() + amount);
            if (hyperStat.getSkillLevel() >= skill.getMaxLevel() || availableSp < neededSp) {
                System.out.printf("Character %d attempted assigning too many hyper stat levels. Available SP %d, needed %d, current %d (%d, job %d)%n", chr.getId(), availableSp, neededSp, skill.getCurrentLevel(), skillID, chr.getJob());
                chr.dispose();
                return;
            }
        } else {
            System.out.printf("Character %d attempted assigning hyper stat to an improper skill. (%d, job %d)%n", chr.getId(), skillID, chr.getJob());
            chr.dispose();
            return;
        }
        chr.removeFromBaseStatCache(skill);
        skill.setCurrentLevel(skill.getCurrentLevel() + amount);
        chr.addToBaseStatCache(skill);
        chr.addSkill(skill);
        hyperStat.setSkillLevel(skill.getCurrentLevel());
        chr.write(WvsContext.updateHyperPresets(chr, preset, (byte) skill.getCurrentLevel()));
        chr.write(WvsContext.changeSkillRecordResult(skill));
        if (skillID == Job.HYPER_STAT_ARCANE_FORCE) {
            chr.getJobHandler().giveHyperArcaneForceBuff();
        }
        chr.dispose();
    }

    public static void syncMoXuanSubSkills(Char chr, int mainSkillId, int level) {
        int[] subIds = switch (mainSkillId) {
            // Mo Xuan
            case 175000001 -> new int[]{175001002};
            case 175100000 -> new int[]{175101001};
            case 175111002 -> new int[]{175111003};
            case 175111004 -> new int[]{175111011};
            case 175120017 -> new int[]{175121001, 175121006};
            case 175120018 -> new int[]{175121002, 175121007};
            case 175121003 -> new int[]{175121004};
            // Sia Astelle
            case 182001000 -> new int[]{182001006};
            case 182001001 -> new int[]{182001002};
            case 182001003 -> new int[]{182001007, 182001008};
            case 182101001 -> new int[]{182101002, 182101003, 182101004};
            case 182111000 -> new int[]{182111010};
            case 182111001 -> new int[]{182111002};
            case 182111003 -> new int[]{182111004};
            case 182111005 -> new int[]{182111006, 182111007};
            case 182110001 -> new int[]{182111009, 182111011};
            case 182120000 -> new int[]{182121014, 182121015};
            case 182121001 -> new int[]{182121002};
            case 182121003 -> new int[]{182121004, 182121005, 182121006};
            case 182121007 -> new int[]{182121008, 182121009, 182121010};
            case 182121041 -> new int[]{182121042};
            case 182121043 -> new int[]{182121044};
            // Khali
            case 154001001 -> new int[]{154001002};
            case 154101001 -> new int[]{154101002};
            case 154111002 -> new int[]{154111003};
            case 154110000 -> new int[]{154110001};
            case 154121001 -> new int[]{154121002, 154121003};
            case 154120003 -> new int[]{154120004};
            // Luminous
            case 27121113 -> new int[]{27121114, 27121115};
            // Explorer Warriors (Hero, Paladin, Dark Knight)
            case 1121008 -> new int[]{1120017};
            case 1220022 -> new int[]{1221023};
            case 1320011 -> new int[]{1321024, 1321025, 1321026};
            // Explorer Magicians (Fire/Poison, Ice/Lightning, Bishop)
            case 2101010 -> new int[]{2100010};
            case 2111013 -> new int[]{2111014};
            case 2121007 -> new int[]{2120013};
            case 2121052 -> new int[]{2121055, 2121056};
            case 2211011 -> new int[]{2211015};
            case 2221007 -> new int[]{2220014};
            case 2301002 -> new int[]{2301010};
            case 2311001 -> new int[]{2311015, 2311017};
            case 2311003 -> new int[]{2311016};
            case 2311004 -> new int[]{2311018};
            case 2311009 -> new int[]{2311019};
            case 2311011 -> new int[]{2311014};
            case 2321007 -> new int[]{2321008, 2321017};
            case 2321015 -> new int[]{2321016};
            case 2321052 -> new int[]{2321055};
            // Explorer Archers (BowMaster, Marksman, Pathfinder)
            case 3101009 -> new int[]{3100010};
            case 3111005 -> new int[]{3111017};
            case 3111013 -> new int[]{3110012};
            case 3110015 -> new int[]{3110016};
            case 3120017 -> new int[]{3120018};
            case 3120022 -> new int[]{3121023};
            case 3211005 -> new int[]{3211019};
            case 3300000 -> new int[]{3301003, 3301004};
            case 3301008 -> new int[]{3301009};
            case 3311002 -> new int[]{3311003, 3311004, 3311006, 3311007, 3311008};
            case 3320000 -> new int[]{3321003, 3321004};
            case 3321014 -> new int[]{3321015, 3321016, 3321017, 3321018, 3321019, 3321020, 3321021};
            case 3321035 -> new int[]{3321036, 3321037, 3321038, 3321039, 3321040};
            // Explorer Thieves (Night Lord, Shadower, Dual Blade)
            case 4100011 -> new int[]{4100012};
            case 4111003 -> new int[]{4111015};
            case 4120018 -> new int[]{4120019};
            case 4121017 -> new int[]{4121020};
            case 4201012 -> new int[]{4201013};
            case 4201014 -> new int[]{4200015};
            case 4210014 -> new int[]{4211017};
            case 4211002 -> new int[]{4211016};
            case 4221014 -> new int[]{4221016};
            case 4221018 -> new int[]{4221019, 4221020};
            case 4321006 -> new int[]{4321007};
            case 4341011 -> new int[]{4341012};
            // Explorer Pirates (Buccaneer, Corsair, Cannoneer)
            case 5100018 -> new int[]{5101019};
            case 5100016 -> new int[]{5101021};
            case 5110016 -> new int[]{5111017, 5111019};
            case 5110018 -> new int[]{5110020};
            case 5121013 -> new int[]{5120021};
            case 5120029 -> new int[]{5121025};
            case 5120024 -> new int[]{5121023};
            case 5120026 -> new int[]{5121027, 5120028};
            case 5201012 -> new int[]{5201013, 5201017};
            case 5210015 -> new int[]{5211019, 5211020, 5211021};
            case 5211007 -> new int[]{5210017, 5210018};
            case 5221004 -> new int[]{5220055};
            case 5221015 -> new int[]{5221021};
            case 5220019 -> new int[]{5220054};
            case 5220020 -> new int[]{5220023, 5220024, 5220025};
            case 5221022 -> new int[]{5221027, 5221028, 5221029};
            case 5311004 -> new int[]{5310008};
            case 5311010 -> new int[]{5310011};
            case 5320011 -> new int[]{5321004};
            case 5321052 -> new int[]{5320055};
            // Nova - Kaiser (6100-6112)
            case 61001000 -> new int[]{61001004, 61001005};
            case 61001002 -> new int[]{61001006, 61001207};
            case 61101002 -> new int[]{61110211};
            case 61111008 -> new int[]{61111114, 61120008};
            case 61111100 -> new int[]{61111111, 61111113, 61111218};
            case 61111101 -> new int[]{61111219};
            case 61111002 -> new int[]{61111220};
            case 61121100 -> new int[]{61121201};
            case 61121102 -> new int[]{61121026, 61121203};
            case 61121104 -> new int[]{61121124, 61121221, 61121225};
            case 61121105 -> new int[]{61120018, 61121222};
            case 61120007 -> new int[]{61121217};
            case 61121015 -> new int[]{61121220};
            // Nova - Kain (6300-6312)
            case 63001000 -> new int[]{63001001, 63001100};
            case 63001002 -> new int[]{63001003, 63001005};
            case 63001006 -> new int[]{63001009};
            case 63100002 -> new int[]{63101003, 63100100, 63101100};
            case 63101004 -> new int[]{63100104, 63101104};
            case 63101005 -> new int[]{63101006};
            case 63110001 -> new int[]{63111002};
            case 63110011 -> new int[]{63111012, 63111013};
            case 63111003 -> new int[]{63111004, 63111005, 63110103, 63111103, 63111104, 63111105, 63111106};
            case 63111009 -> new int[]{63111010};
            case 63121002 -> new int[]{63120102, 63121102, 63121103};
            case 63121004 -> new int[]{63121005};
            case 63121006 -> new int[]{63121007};
            case 63121040 -> new int[]{63121041, 63120140, 63121140, 63121141};
            // Nova - Cadena (6400-6412)
            case 64001000 -> new int[]{64001007, 64001008, 64001009, 64001010, 64001011, 64001012};
            case 64001001 -> new int[]{64001006};
            case 64001002 -> new int[]{64001013};
            case 64001003 -> new int[]{64001014};
            case 64101002 -> new int[]{64101008};
            case 64100004 -> new int[]{64101009};
            case 64111004 -> new int[]{64111012};
            case 64110005 -> new int[]{64111013};
            case 64121021 -> new int[]{64121022, 64121023, 64121024};
            case 64121003 -> new int[]{64121011, 64121016};
            case 64121002 -> new int[]{64120010};
            case 64121001 -> new int[]{64121012, 64121013, 64121014, 64121015, 64121017, 64121018, 64121019};
            case 64120006 -> new int[]{64121020, 64121025, 64121026};
            case 64121053 -> new int[]{64121055};
            // Nova - Angelic Buster (6500-6512)
            case 65001001 -> new int[]{65001004};
            case 65111100 -> new int[]{65111007};
            case 65121011 -> new int[]{65120011};
            case 65121003 -> new int[]{65121012};
            // Anima - Ren (16100-16112)
            case 161001001 -> new int[]{161001002};
            case 161101001 -> new int[]{161101009, 161101002};
            case 161100003 -> new int[]{161101004};
            case 161110001 -> new int[]{161111002};
            case 161110003 -> new int[]{161111004};
            case 161110007 -> new int[]{161111008, 161111011};
            case 161121005 -> new int[]{161121014};
            case 161121007 -> new int[]{161121008};
            case 161120001 -> new int[]{161121002};
            case 161120003 -> new int[]{161121004};
            case 161121043 -> new int[]{161121044};
            default -> null;
        };
        if (subIds != null) {
            List<Skill> subSkills = new ArrayList<>();
            for (int subId : subIds) {
                Skill subSkill = SkillData.getSkillDeepCopyById(subId);
                if (subSkill != null) {
                    int subMax = subSkill.getMaxLevel() > 0 ? subSkill.getMaxLevel() : (subSkill.getMasterLevel() > 0 ? subSkill.getMasterLevel() : level);
                    int targetLv = Math.min(level, subMax);
                    subSkill.setCurrentLevel(targetLv);
                    subSkill.setMasterLevel(Math.max(targetLv, subMax));
                    chr.addSkill(subSkill);
                    SkillInfo subSi = SkillData.getSkillInfoById(subId);
                    boolean isInvisible = SkillConstants.isSpecialInvisibleSkill(subId) || (subSi != null && subSi.isInvisible());
                    if (!isInvisible) {
                        subSkills.add(subSkill);
                    }
                }
            }
            if (!subSkills.isEmpty()) {
                chr.write(WvsContext.changeSkillRecordResult(subSkills, true, false, false));
            }
        }
    }
}
