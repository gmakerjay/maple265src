package net.swordie.ms.handlers.script;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.character.MonsterPark;
import net.swordie.ms.client.character.items.Item;
import net.swordie.ms.client.character.skills.Option;
import net.swordie.ms.client.character.skills.SkillStat;
import net.swordie.ms.client.character.skills.info.SkillInfo;
import net.swordie.ms.client.character.skills.temp.TemporaryStatManager;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.connection.InPacket;
import net.swordie.ms.connection.packet.*;
import net.swordie.ms.constants.*;
import net.swordie.ms.enums.BossPartyType;
import net.swordie.ms.handlers.Handler;
import net.swordie.ms.handlers.header.InHeader;
import net.swordie.ms.life.Life;
import net.swordie.ms.life.RandomPortal;
import net.swordie.ms.life.npc.NpcMessageType;
import net.swordie.ms.loaders.ItemData;
import net.swordie.ms.loaders.SkillData;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.scripts.ScriptType;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.FileTime;
import net.swordie.ms.world.field.Field;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static net.swordie.ms.client.character.MonsterPark.entryQuest;
import static net.swordie.ms.client.character.skills.temp.CharacterTemporaryStat.BossWaitingLinesBuff;

public class ScriptHandler {

    @Handler(op = InHeader.USER_SCRIPT_MESSAGE_ANSWER)
    public static void handleUserScriptMessageAnswer(Char chr, InPacket inPacket) {
        ScriptManagerImpl sm = chr.getScriptManager();
        inPacket.decodeInt(); // hardcored 0
        byte lastType = inPacket.decodeByte();
        NpcMessageType nmt = sm.getNpcScriptInfo().getMessageType();
        if (nmt == null) {
            nmt = lastType < NpcMessageType.values().length
                    ? Arrays.stream(NpcMessageType.values()).filter(n -> n.getVal() == lastType).findAny().orElse(NpcMessageType.None)
                    : NpcMessageType.None;
        }
        byte action = 0;
        long answer = 0;
        String ans = "";
        switch (nmt) {
            case Say:
            case SayOk:
            case SayNext:
            case SayPrev:
                inPacket.decodeInt();
                String lastText = inPacket.decodeString();
                action = inPacket.decodeByte();
                break;
            case AskAccept:
            case AskYesNo:
                action = inPacket.decodeByte();
                break;
            case AskMenu:
            case AskSlideMenu:
            case AskStoryUI:
                action = (byte) (inPacket.decodeByte() > 0 ? 1 : -1);
                if (action > 0) {
                    answer = Math.max(inPacket.decodeInt(), 0);
                }
                break;
            case AskText:
            case AskBoxtext:
                action = (byte) (inPacket.decodeByte() > 0 ? 1 : -1);
                if (action > 0) {
                    ans = inPacket.decodeString();
                }
                break;
            case AskNumber:
                action = (byte) (inPacket.decodeByte() > 0 ? 1 : -1);
                if (action > 0) {
                    answer = Math.max(inPacket.decodeLong(), 0L);
                }
                break;
            case AskAvatar:
                action = (byte) (inPacket.decodeByte() > 0 ? 1 : -1);
                if (action > 0) {
                    inPacket.decodeByte();
                    inPacket.decodeByte();
                    answer = inPacket.decodeByte();
                }
                break;
            case AskAndroid:
                action = (byte) (inPacket.decodeByte() > 0 ? 1 : -1);
                if (action > 0) {
                    answer = inPacket.decodeByte();
                }
                break;
            case AskPet:
            case AskPetAll:
                action = (byte) (inPacket.decodeByte() > 0 ? 1 : -1);
                if (action > 0) {
                    answer = inPacket.decodeLong();
                }
                break;
            case AskAngelicBuster:
                action = inPacket.decodeByte();
                answer = action;
                break;
            case AskAvatarZero:
                inPacket.decodeByte();
                action = (byte) (inPacket.decodeByte() > 0 ? 1 : -1);
                if (action > 0) {
                    answer = inPacket.decodeByte();
                }
                break;
            case Monologue:
                action = 1;
                break;
            case PlayMovieClip:
                answer = inPacket.decodeByte();
                action = (byte) (inPacket.decodeByte() > 0 ? 1 : -1);
                break;
            case AskSelectMenu:
                action = inPacket.decodeByte();
                answer = inPacket.decodeByte();
                break;
            case AskIngameDirection:
                inPacket.decodeByte();
                action = inPacket.decodeByte();;
                break;
        }
        if (sm.isActive(sm.getLastActiveScriptType())) {
            sm.handleAction(sm.getLastActiveScriptType(), nmt, action, (int) answer, ans);
            return;
        }
        if (action == -1) {
            sm.dispose();
        }
    }

    @Handler(op = InHeader.DIRECTION_NODE_COLLISION)
    public static void handleDirectionNodeCollision(Char chr, InPacket inPacket) {
        if (chr.getField() == null) {
            return;
        }
        Field field = chr.getField();

        int node = inPacket.decodeInt();
        List<String> directionNode = field.getDirectionNode(node);
        if (directionNode == null) {
            return;
        }
        String script = directionNode.get(chr.getCurrentDirectionNode(node));
        if (script == null) {
            return;
        }
        chr.increaseCurrentDirectionNode(node);
        chr.getScriptManager().setCurNodeEventEnd(false);
        chr.getScriptManager().startScript(chr, field.getId(), script, ScriptType.Field);
    }

    @Handler(op = InHeader.USER_RUN_SCRIPT)
    public static void handleUserRunScript(Char chr, InPacket inPacket) {
        short type = inPacket.decodeShort();
        ScriptManagerImpl sm = chr.getScriptManager();
        switch (type) {
            case 10:
                sm.startScript(chr, 9010000, "MonsterCollection_FAQ", ScriptType.Npc);
                break;
            case 11:
                int fieldID = inPacket.decodeInt();
                if (chr.getField().getId() == fieldID && GameConstants.getMaplerunnerField(fieldID) > 0) {
                    chr.warp(chr.getOrCreateFieldByCurrentInstanceType(FieldConstants.FOREST_OF_TENACITY));
                }
                break;
            case 12:
                sm.startScript(chr, 9010000, "DamageSkinSave_FAQ", ScriptType.Npc);
                break;
            case 18:
                sm.startScript(chr, 9010106, "union_raid", ScriptType.Npc);
                break;
            case 19:
                sm.startScript(chr, 9010106, "union_coin", ScriptType.Npc);
                break;
            case 23:
                sm.startScript(chr, 9010000, "MapleGuide_FAQ", ScriptType.Npc);
                break;
            case 35:
                sm.startScript(chr, 9010000, "Emoticon_FAQ", ScriptType.Npc);
                break;
            case 111:
                sm.openTrunk(9070110);
                break;
            case 112:
                sm.startScript(chr, 9010000, "Enhancement_FAQ", ScriptType.Npc);
                break;
            case 114:
                sm.startScript(chr, 9010000, "autoAP", ScriptType.Npc);
                break;
            case 118:
                sm.startScript(chr, 9010000, "Familiar_FAQ", ScriptType.Npc);
                break;
            default:
                System.out.printf("type %d is not handled.%n", type);
                chr.chatMessage("Tính năng này chưa hoàn thiện, vui lòng báo cho Developer : script_" + type);
                break;
        }
    }

    @Handler(op = InHeader.USER_UI_HELPER)
    public static void handleUserUIHelper(Char chr, InPacket inPacket) {
        int type = inPacket.decodeInt();
        int index = 0;
        if (inPacket.getUnreadAmount() > 0) {
            index = inPacket.decodeInt();
        }
        ScriptManagerImpl sm = chr.getScriptManager();
        switch (type) {
            case 0:
                sm.startScript(chr, 9010000, "Inventory_FAQ", ScriptType.Npc);
                break;
            case 6:
                sm.startScript(chr, 9010000, "Quest_FAQ", ScriptType.Npc);
                break;
            case 30:
                sm.startScript(chr, 9010000, "Medal_FAQ", ScriptType.Npc);
                break;
            case 1338:
                sm.startScript(chr, 9010000, "BossContents_FAQ", ScriptType.Npc);
                break;
            case 1429:
                sm.startScript(chr, 9010000, "Hexa_FAQ", ScriptType.Npc);
                break;
            case 1455:
                sm.startScript(chr, 9010000, "CharacterStat_FAQ", ScriptType.Npc);
                break;
            case 1471:
                sm.startScript(chr, 9010000, "CharacterPreset_FAQ", ScriptType.Npc);
                break;
            case 1504:
                sm.startScript(chr, 9010000, "Planner_FAQ", ScriptType.Npc);
                break;
            case 1616:
                sm.startScript(chr, 9010000, "SkillSequence_FAQ", ScriptType.Npc);
                break;
            case 1663:
                sm.startScript(chr, index, "beyondBurning_start", ScriptType.Content);
                break;
            case 1675:
                sm.startScript(chr, index, "frontierPass_UIOpen", ScriptType.Content);
                break;
            case 1650:
                sm.startScript(chr, 9010000, "Bag_FAQ", ScriptType.Npc);
                break;
            case 1660:
                sm.startScript(chr, 9010000, "BossReward_FAQ", ScriptType.Npc);
                break;
            default:
                System.out.printf("type %d is not handled.%n", type);
                chr.chatMessage("Tính năng này chưa hoàn thiện, vui lòng báo cho Developer : script_" + type);
                break;
        }
    }

    @Handler(op = InHeader.BOSS_UI_REQUEST)
    public static void handleBossUIRequest(Char chr, InPacket inPacket) {
        int orderId = inPacket.decodeInt();
        boolean isPraticeMode = inPacket.decodeByte() != 0;
        inPacket.decodeByte();
        int difficulty = inPacket.decodeInt();
        inPacket.decodeByte();
        inPacket.decodeByte();
        inPacket.decodeByte();
        BossPartyType bossPartyType = BossPartyType.getByOrderIdAndDifficulty(orderId, difficulty);
        if (bossPartyType == null) {
            chr.chatPopup("Boss này đang hoàn thiện, chưa vào được.");
            return;
        }
        int fieldID = BossConstants.getBossWaitingFieldId(bossPartyType);
        chr.setPracticeMode(isPraticeMode);
        handleMoveToBossWaitingField(chr, fieldID, bossPartyType, true);
    }

    @Handler(op = InHeader.CHECK_BOSS_PARTY_BY_SCRIPT)
    public static void handleCheckBossPartyByScript(Char chr, InPacket inPacket) {
        int orderId = inPacket.decodeInt();
        int difficulty = inPacket.decodeInt();
        int fieldID = inPacket.decodeInt();
        BossPartyType bossPartyType = BossPartyType.getByOrderIdAndDifficulty(orderId, difficulty);
        if (bossPartyType == null) {
            chr.chatPopup("Boss này đang hoàn thiện, chưa vào được.");
            return;
        }
        handleMoveToBossWaitingField(chr, fieldID, bossPartyType, false);
    }

    public static void handleMoveToBossWaitingField(Char chr, int fieldID, BossPartyType boss, boolean viaBossUI) {
        var party = chr.getParty();
        var sm = chr.getScriptManager();
        var returnField = chr.getFieldID();

        if (party == null) {
            chr.chatPopup("Hãy tạo nhóm trước khi tiếp tục.");
            return;
        }
        if (chr.getOrCreateFieldByCurrentInstanceType(fieldID) == null) {
            chr.chatPopup("Đã xảy ra lỗi không xác định.");
            return;
        }
        if (chr.getParty().getOnlineChars().size() < chr.getParty().getMembers().size()) {
            chr.chatPopup("Tất cả thành viên phải đang trực tuyến.");
            return;
        }
        for (Char pmChr : chr.getParty().getOnlineChars()) {
            if (pmChr == null) {
                chr.chatPopup("Đã xảy ra lỗi không xác định.");
                return;
            }
            if (pmChr.getLevel() < boss.getLevelMin()
                    || (boss.getPreQuest() != 0 && !pmChr.hasQuestCompleted(boss.getPreQuest()))) {
                chr.chatPopup("Tất cả thành viên phải hoàn thành xong nhiệm vụ yêu cầu của Boss.");
                return;
            }
            pmChr.createQuestWithQRValue(102401, "mapR=" + returnField + ";order="+boss.getOrderId()+";diff="+boss.getDifficulty().getVal());
        }
        if (!sm.checkPartyBossAttempt(boss, party)) {
            chr.chatPopup("Một trong những thành viên trong nhóm đã đạt tối đa lượt Boss này.");
            return;
        }
        if (viaBossUI) {
            if (!party.isLeader(chr)) {
                chr.chatPopup("Xin hãy để người lãnh đạo nhóm của bạn thực hiện.");
                return;
            }
            if (sm.isPartyEligible(chr, (short) boss.getLevelMin(), GameConstants.MAX_LEVEL, party, boss)) {
                sm.warpInstanceIn(chr, fieldID, true);
                sm.setInstanceTime(BossConstants.BOSS_WAITING_TIME, returnField);
                sm.invokeForParty(2000, "initForBossing", boss.getBossName());
            }
        } else {
            for (Char pmChr : chr.getParty().getOnlineChars()) {
                if (pmChr != null) {
                    giveBossPartyBuff(pmChr, boss);
                    pmChr.warp(fieldID);
                }
            }
        }
        chr.write(FieldPacket.closeUI(7));
        chr.dispose();
    }

    private static void giveBossPartyBuff(Char chr, BossPartyType bossPartyType) {
        int skillID = BossConstants.getBossPartyBuffSkill(bossPartyType);
        if (skillID != 0) {
            TemporaryStatManager tsm = chr.getTemporaryStatManager();
            SkillInfo si = SkillData.getSkillInfoById(skillID);
            Option o = new Option();
            o.nOption = si.getValue(SkillStat.x, 1);
            o.rOption = skillID;
            o.tOption = si.getValue(SkillStat.time, 1);
            tsm.sendStat(BossWaitingLinesBuff, o);
        }
    }

    @Handler(op = InHeader.ENTER_RANDOM_PORTAL_REQUEST)
    public static void handleEnterRandomPortalRequest(Char chr, InPacket inPacket) {
        int portalObjID = inPacket.decodeInt();
        Life life = chr.getField().getLifeByObjectID(portalObjID);
        if (!(life instanceof RandomPortal randomPortal)) {
            chr.chatMessage("Cánh cổng không hoạt động.");
            return;
        }
        if (randomPortal.getCharID() != chr.getId()) {
            chr.chatMessage("Đã có người chơi khác ở bên trong.");
            chr.dispose();
            return;
        }
        RandomPortal.Type type = randomPortal.getAppearType();
        String script = type.getScript();
        chr.getScriptManager().startScript(chr, randomPortal.getAppearType().ordinal(), randomPortal.getObjectId(),
                script, ScriptType.Portal);
        chr.dispose();
    }

    @Handler(op = InHeader.LIBRARY_START_SCRIPT)
    public static void handleLibraryStartScript(Char chr, InPacket inPacket) {
        int bookId = inPacket.decodeByte();
        if (chr.hasQuestCompleted(32662)) {
            int questID = QuestConstants.DIMENSION_LIBRARY + bookId;
            chr.getScriptManager().startScript(chr, questID, "q" + questID + "s", ScriptType.Quest);
        }
    }

    @Handler(op = InHeader.MONSTER_PARK_UI_REQUEST)
    public static void handleMonsterParkUIRequest(Char chr, InPacket inPacket) {
        var sm = chr.getScriptManager();

        int extreme = inPacket.decodeInt();
        int type = inPacket.decodeInt();
        int index = inPacket.decodeInt();
        int count = 0;
        int tryCount = 0;
        int clear = 0;
        String date = null;
        boolean isNewDay = false;
        if (!chr.hasQuest(MonsterPark.entryQuest)) {
            tryCount = 0;
            date = FileTime.currentTime().toYYMMDD();
        } else {
            date = chr.getQRValueByKey(MonsterPark.entryQuest, "date");
            count = Integer.parseInt(chr.getQRValueByKey(MonsterPark.entryQuest, "count"));
            tryCount = Integer.parseInt(chr.getQRValueByKey(MonsterPark.entryQuest, "tryCount"));
            clear = Integer.parseInt(chr.getQRValueByKey(MonsterPark.entryQuest, "clear"));
        }

        if (date != null) {
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yy/MM/dd");
            LocalDate saved = LocalDate.parse(date, fmt);
            LocalDate today = LocalDate.now();
            isNewDay = !saved.equals(today);
        }

        if (isNewDay) {
            date = FileTime.currentTime().toYYMMDD();
            count = 0;
            tryCount = 0;
            clear = 0;
        }

        if (chr.getParty() != null) {
            chr.write(UIContextPacket.monsterParkUI(2, 0, 15));
            return;
        }

        if (count >= 7) {
            chr.write(UIContextPacket.monsterParkUI(2, 0, 16));
            return;
        }

        if (tryCount >= 1
                && !sm.hasItem(MonsterPark.freeTicket)
                && !sm.hasItem(MonsterPark.CSTicket)
                && chr.getUser().getMaplePoints() < MonsterPark.CSTicketPrice) {
            chr.write(UIContextPacket.monsterParkUI(2, 0, 16));
            return;
        }

        var monsterPark = GameConstants.getMonsterPark(type, index);
        if (monsterPark == null) {
            chr.write(UIContextPacket.monsterParkUI(2, 0, 1));
            return;
        }

        count += 1;
        if (tryCount == 0) {
            tryCount = 1;
        } else {
            if (sm.hasItem(MonsterPark.freeTicket)) {
                sm.consumeItem(MonsterPark.freeTicket, 1);
            } else if (sm.hasItem(MonsterPark.CSTicket)) {
                sm.consumeItem(MonsterPark.CSTicket, 1);
            } else {
                chr.getUser().deductMaplePoints(MonsterPark.CSTicketPrice);
            }
        }
        chr.createQuestWithQRValue(MonsterPark.entryQuest, "count=" + count + ";date=" + date + ";tryCount=" + tryCount + ";clear=" + clear);
        sm.warpInstanceIn(chr, monsterPark.mapID);
        sm.setInstanceTime(GameConstants.MONSTER_PARK_TIME);
        sm.createQuestWithQRValue(GameConstants.MONSTER_PARK_EXP_QUEST, "0");
    }

    @Handler(op = InHeader.USER_SKIP_TERA_BLINK)
    public static void handleUserSkipTeraBlinkRequest(Char chr, InPacket inPacket) {
        inPacket.decodeInt();
        inPacket.decodeInt();
        int questID = inPacket.decodeInt();
        chr.dispose();
    }
}
