package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.enums.UIType;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Instance;

import java.util.HashMap;

public class AlienVisitor implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 17206;
    private final long RANK_S_EXP = 5720000;
    private final long RANK_A_EXP = 4630000;
    private final long RANK_B_EXP = 3120000;
    private final long RANK_C_EXP = 1610000;

    public AlienVisitor(Char chr) {
        this.sm = chr.getScriptManager();
        this.chr = chr;
        this.party = chr.getParty();
    }

    private boolean isPartyEligible(short lowLevel, short highLevel, Party party) {
        for (PartyMember member : party.getMembers()) {
            if (member.getLevel() < lowLevel || member.getLevel() > highLevel) {
                return false;
            }
        }
        return true;
    }

    @Override
    public void start() {
        if (sm.getFieldID() == GameConstants.ALIEN_VISITOR_ENTRANCE_MAP) {
            int selection = sm.sendNext("MØt tö trïßng kÿ l¢ «ang phát ra tö bên trong tàu vë trî! Tôi c®n mØt ngïßi m¢nh m³ «º thûc hi½n mØt sÑ thí nghi½m.\r\n\r\n" +
                    "#b" +
                    "#L0#HÇi v¹ vî vi½c.#l\r\n" +
                    "#L1##eVào tàu vë trî.#n#l\r\n" +
                    "#L2#Tìm nhóm.#l\r\n" +
                    "#k");
            switch (selection) {
                case 0:
                    sm.sendNext("Mîc tiêu cça Alien Visitor là giúp tôi «ánh b¢i nhøng ngïßi ngoài hành tinh «» rÛi xuÑng g®n Maple World, «Óng thßi làm «i¹u «ó càng nhanh càng tÑt «º nh±n thêm ph®n thïäng.\r\n" +
                            "#e- C¬p:#n 200 ho¶c cao hÛn #r(C¬p «Ø thích hæp: 200-249)#k\r\n" +
                            "#e- Thßi gian:#n 5 phút/màn\r\n" +
                            "#e- SÑ ngïßi tÑi «a:#n 4\r\n" +
                            "#e- Ph®n thïäng:#n" +
                            "\r\n#i1113038# #z1113038#\r\n" +
                            "#i1122256# #z1122256#\r\n" +
                            "#i1032191# #z1032191#\r\n" +
                            "#i1132230# #z1132230#\r\n" +
                            "#i1003893# #z1003893#");
                    break;
                case 1:
                    if (party == null) {
                        sm.sendSayOkay("Hãy tạo nhóm để tiếp tục.\r\nPlease create a party before going in.");
                    } else if (!party.isLeader(chr)) {
                        sm.sendSayOkay("Vui lÆng «º trïäng nhóm cça b¢n nói chuy½n vÜi tôi.\r\nPlease have your party leader talk to me.");
                    } else if (sm.checkPartyForPQ()) {
                        if (isPartyEligible((short) 200, (short) 275, party)) {
                            if (sm.checkAttempt(entryQuest, party)) {
                                if (sm.sendNext("Nªu b¢n «» s§n sàng, h»y bïÜc ra ánh sáng!\r\n\r\n#b#L0#Vào tàu vë trî.#l#k") == 0) {
                                    sm.sendNext("1. B¢n ph¡i «ánh b¢i 180 quái v±t ho¶c trùm trïÜc khi hªt giß.\r\n2. B¢n ph¡i #e#bhoàn thành#k#n 5 giai «o¢n «º nh±n «ïæc kinh nghi½m.\r\n\r\n«öng quên nhøng «iºm ch¾a khoá nøa nhé!");
                                    for (Char player : chr.getParty().getOnlineChars()) {
                                        player.setVisitorStageResult(new HashMap<>());
                                    }
                                    sm.warpInstanceIn(chr, GameConstants.ALIEN_VISITOR_START_MAP, true);
                                    sm.setInstanceTime(GameConstants.ALIEN_VISITOR_TIME, GameConstants.ALIEN_VISITOR_EXT_MAP);
                                    chr.getParty().setPartyQuest(this);
                                    sm.addAttempt(entryQuest, party);
                                    return;
                                }
                            } else {
                                sm.sendSayOkay("MØt trong nhøng thành viên trong nhóm «» hªt lïæt vào nhi½m vî nóm này.");
                            }
                        } else {
                            sm.sendSayOkay("Ai «ó trong nhóm cça b¢n không «¢t c¬p 200 chïa. B¢n ph¡i «¢t c¬p 200 ho¶c cao hÛn!");
                        }
                    }
                    break;
                case 2:
                    sm.openUI(UIType.UI_PARTY_INVITATION);
                    break;
            }
        } else {
            exit();
        }
    }

    @Override
    public void exit() {
        chr.getParty().setPartyQuest(null);
        if (chr.getField().getId() == GameConstants.ALIEN_VISITOR_EXT_MAP) {
            long totalEXP = 0;
            if (!chr.getVisitorStageResult().isEmpty()) {
                String stage1Result = chr.getVisitorStageResult().getOrDefault(1, "Failed");
                String stage1Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                if (!stage1Result.equals("")) {
                    switch (stage1Result) {
                        case "S" -> {
                            totalEXP += RANK_S_EXP;
                            stage1Icon = "#fUI/UIWindowBT.img/Visitor/rank/s";
                        }
                        case "A" -> {
                            totalEXP += RANK_A_EXP;
                            stage1Icon = "#fUI/UIWindowBT.img/Visitor/rank/a";
                        }
                        case "B" -> {
                            totalEXP += RANK_B_EXP;
                            stage1Icon = "#fUI/UIWindowBT.img/Visitor/rank/b";
                        }
                        case "C" -> {
                            totalEXP += RANK_C_EXP;
                            stage1Icon = "#fUI/UIWindowBT.img/Visitor/rank/c";
                        }
                        default -> {
                            stage1Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                        }
                    }
                }
                String stage2Result = chr.getVisitorStageResult().getOrDefault(2, "Failed");
                String stage2Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                if (!stage2Result.equals("")) {
                    switch (stage2Result) {
                        case "S" -> {
                            totalEXP += RANK_S_EXP;
                            stage2Icon = "#fUI/UIWindowBT.img/Visitor/rank/s";
                        }
                        case "A" -> {
                            totalEXP += RANK_A_EXP;
                            stage2Icon = "#fUI/UIWindowBT.img/Visitor/rank/a";
                        }
                        case "B" -> {
                            totalEXP += RANK_B_EXP;
                            stage2Icon = "#fUI/UIWindowBT.img/Visitor/rank/b";
                        }
                        case "C" -> {
                            totalEXP += RANK_C_EXP;
                            stage2Icon = "#fUI/UIWindowBT.img/Visitor/rank/c";
                        }
                        default -> {
                            stage2Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                        }
                    }
                }
                String stage3Result = chr.getVisitorStageResult().getOrDefault(3, "Failed");
                String stage3Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                if (!stage3Result.equals("")) {
                    switch (stage3Result) {
                        case "S" -> {
                            totalEXP += RANK_S_EXP;
                            stage3Icon = "#fUI/UIWindowBT.img/Visitor/rank/s";
                        }
                        case "A" -> {
                            totalEXP += RANK_A_EXP;
                            stage3Icon = "#fUI/UIWindowBT.img/Visitor/rank/a";
                        }
                        case "B" -> {
                            totalEXP += RANK_B_EXP;
                            stage3Icon = "#fUI/UIWindowBT.img/Visitor/rank/b";
                        }
                        case "C" -> {
                            totalEXP += RANK_C_EXP;
                            stage3Icon = "#fUI/UIWindowBT.img/Visitor/rank/c";
                        }
                        default -> {
                            stage3Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                        }
                    }
                }
                String stage4Result = chr.getVisitorStageResult().getOrDefault(4, "Failed");
                String stage4Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                if (!stage4Result.equals("")) {
                    switch (stage4Result) {
                        case "S" -> {
                            totalEXP += RANK_S_EXP;
                            stage4Icon = "#fUI/UIWindowBT.img/Visitor/rank/s";
                        }
                        case "A" -> {
                            totalEXP += RANK_A_EXP;
                            stage4Icon = "#fUI/UIWindowBT.img/Visitor/rank/a";
                        }
                        case "B" -> {
                            totalEXP += RANK_B_EXP;
                            stage4Icon = "#fUI/UIWindowBT.img/Visitor/rank/b";
                        }
                        case "C" -> {
                            totalEXP += RANK_C_EXP;
                            stage4Icon = "#fUI/UIWindowBT.img/Visitor/rank/c";
                        }
                        default -> {
                            stage4Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                        }
                    }
                }
                String stage5Result = chr.getVisitorStageResult().getOrDefault(5, "Failed");
                String stage5Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                if (!stage5Result.equals("")) {
                    switch (stage5Result) {
                        case "S" -> {
                            totalEXP += RANK_S_EXP;
                            stage5Icon = "#fUI/UIWindowBT.img/Visitor/rank/s";
                        }
                        case "A" -> {
                            totalEXP += RANK_A_EXP;
                            stage5Icon = "#fUI/UIWindowBT.img/Visitor/rank/a";
                        }
                        case "B" -> {
                            totalEXP += RANK_B_EXP;
                            stage5Icon = "#fUI/UIWindowBT.img/Visitor/rank/b";
                        }
                        case "C" -> {
                            totalEXP += RANK_C_EXP;
                            stage5Icon = "#fUI/UIWindowBT.img/Visitor/rank/c";
                        }
                        default -> {
                            stage5Icon = "#fUI/UIWindowBT.img/Visitor/rank/f";
                        }
                    }
                }
                sm.sendNext("Kªt qu¡ xªp h¢ng khách truy c±p cça b¢n:\r\n" +
                        "#eMàn 1:#n " + stage1Icon + "\r\n\r\n" +
                        "#eMàn 2:#n " + stage2Icon + "\r\n\r\n" +
                        "#eMàn 3:#n " + stage3Icon + "\r\n\r\n" +
                        "#eMàn 4:#n " + stage4Icon + "\r\n\r\n" +
                        "#eMàn 5:#n " + stage5Icon + "\r\n\r\n" +
                        "#eTÖng kinh nghi½m nh±n «ïæc:#n #r" + Util.getNumberFormat(totalEXP) +
                        "#k");
            }
            if (sm.sendAskYesNo("Theo các t¾nh nguy½n viên khác, mØt sinh v±t trùm quü hiªm l¢i xu¬t hi½n.\r\n#bB¢n có muÑn ra khÇi nÛi này không?#k")) {
                sm.giveExpNoAffectedByExpRate(totalEXP);
                chr.getVisitorStageResult().clear();
                sm.warp(GameConstants.ALIEN_VISITOR_ENTRANCE_MAP);
            }
        } else {
            if (sm.sendAskYesNo("Theo các t¾nh nguy½n viên khác, mØt sinh v±t trùm quü hiªm l¢i xu¬t hi½n.\r\n#bB¢n có muÑn ra khÇi nÛi này không?#k")) {
                sm.warpInstanceOut(chr, GameConstants.ALIEN_VISITOR_EXT_MAP);
            }
        }
    }

    @Override
    public void event() {
        Instance instance = chr.getParty().getInstance();
        if (chr.getParty().isLeader(chr)) {
            if (chr.getField().getId() == 861000050) {
                sm.warpParty(861000100, party);
                instance.setVisitorStageCount(0);
                instance.setTimeout(5 * 60, true);
            } else if ((chr.getField().getId() == 861000100 || chr.getField().getId() == 861000200 || chr.getField().getId() == 861000400) && instance.getVisitorStageCount() == 180) {
                sm.warpParty(chr.getField().getId() + 100, party);
                instance.setVisitorStageCount(0);
                instance.setTimeout(5 * 60, true);
            } else if ((chr.getField().getId() == 861000300 || chr.getField().getId() == 861000500) && instance.getVisitorStageCount() == 1) {
                if (chr.getField().getId() == 861000500) {
                    sm.warpInstanceOut(chr, GameConstants.ALIEN_VISITOR_EXT_MAP);
                } else {
                    sm.warpParty(chr.getField().getId() + 100, party);
                    instance.setVisitorStageCount(0);
                    instance.setTimeout(5 * 60, true);
                }
            } else {
                sm.chat("Cánh cÖng «» «óng!");
            }
        } else {
            sm.sendSayOkay("Ch¿ #bTrïäng nhóm cça b¢n#k mÜi có thº vào cÖng!");
        }
    }

    @Override
    public void end(Char chr) {
        if (chr.getParty() != null) {
            for (Char player : chr.getParty().getOnlineChars()) {
                player.getVisitorStageResult().clear();
            }
        } else {
            chr.getVisitorStageResult().clear();
        }
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.warpInstanceOut(chr, GameConstants.ALIEN_VISITOR_EXT_MAP);
    }

    @Override
    public void clear(Char chr) {
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}