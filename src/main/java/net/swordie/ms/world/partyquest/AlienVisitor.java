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
    private Party party;
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
            int selection = sm.sendNext("A strange magnetic field is emanating from inside the spaceship! I need a brave adventurer to conduct some vital research.\r\n\r\n" +
                    "#b" +
                    "#L0#Ask about the mission.#l\r\n" +
                    "#L1##eEnter the spaceship.#n#l\r\n" +
                    "#L2#Find a party.#l\r\n" +
                    "#k");
            switch (selection) {
                case 0:
                    sm.sendNext("The goal of Alien Visitor is to defeat the extraterrestrials that crashed near Maple World. Clear them as fast as possible to earn top rank rewards!\r\n" +
                            "#e- Level:#n 200 or higher #r(Recommended: 200 - 249)#k\r\n" +
                            "#e- Time Limit:#n 5 min per stage\r\n" +
                            "#e- Max Players:#n 1 - 4 (Solo or Party)\r\n" +
                            "#e- Rewards:#n" +
                            "\r\n#i1113038# #z1113038#\r\n" +
                            "#i1122256# #z1122256#\r\n" +
                            "#i1032191# #z1032191#\r\n" +
                            "#i1132230# #z1132230#\r\n" +
                            "#i1003893# #z1003893#");
                    break;
                case 1:
                    Party currentParty = chr.getParty();
                    if (currentParty == null) {
                        currentParty = Party.createNewParty(chr, chr.getName() + "'s Party");
                        chr.setParty(currentParty);
                    }
                    this.party = currentParty;
                    if (!party.isLeader(chr)) {
                        sm.sendSayOkay("Please have your party leader talk to me.");
                    } else if (sm.checkPartyForPQ()) {
                        if (isPartyEligible((short) 200, (short) 275, party)) {
                            if (sm.checkAttempt(entryQuest, party)) {
                                if (sm.sendNext("If you are ready, step into the light!\r\n\r\n#b#L0#Enter the spaceship.#l#k") == 0) {
                                    sm.sendNext("1. You must defeat 180 monsters or the stage boss before time runs out.\r\n2. Complete all 5 stages to receive rank evaluations and bonus EXP.\r\n\r\nGood luck out there!");
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
                                sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                            }
                        } else {
                            sm.sendSayOkay("Someone in your party has not reached Lv. 200. You must be Lv. 200 or higher!");
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
        if (chr.getParty() != null) chr.getParty().setPartyQuest(null);
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
                sm.sendNext("Your Alien Visitor performance rating:\r\n" +
                        "#eStage 1:#n " + stage1Icon + "\r\n\r\n" +
                        "#eStage 2:#n " + stage2Icon + "\r\n\r\n" +
                        "#eStage 3:#n " + stage3Icon + "\r\n\r\n" +
                        "#eStage 4:#n " + stage4Icon + "\r\n\r\n" +
                        "#eStage 5:#n " + stage5Icon + "\r\n\r\n" +
                        "#eTotal EXP gained:#n #r" + Util.getNumberFormat(totalEXP) +
                        "#k");
            }
            if (sm.sendAskYesNo("According to the outpost researchers, a rare boss creature has been spotted.\r\n#bWould you like to exit to the research camp?#k")) {
                sm.giveExpNoAffectedByExpRate(totalEXP);
                chr.getVisitorStageResult().clear();
                sm.warp(GameConstants.ALIEN_VISITOR_ENTRANCE_MAP);
            }
        } else {
            if (sm.sendAskYesNo("According to the outpost researchers, a rare boss creature has been spotted.\r\n#bWould you like to exit to the research camp?#k")) {
                sm.warpInstanceOut(chr, GameConstants.ALIEN_VISITOR_EXT_MAP);
            }
        }
    }

    @Override
    public void event() {
        Party p = chr.getParty() != null ? chr.getParty() : this.party;
        this.party = p;
        if (p == null) return;
        Instance instance = p.getInstance();
        if (p.isLeader(chr)) {
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
                sm.chat("The portal is still locked! Defeat the required enemies first.");
            }
        } else {
            sm.sendSayOkay("Only your #bparty leader#k can operate the portal!");
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
        ScriptManagerImpl sm = chr.getScriptManager();
        Party p = chr.getParty() != null ? chr.getParty() : this.party;
        if (p != null) {
            sm.givePQRewards(p);
        } else {
            sm.givePQRewards(null);
        }
        end(chr);
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}