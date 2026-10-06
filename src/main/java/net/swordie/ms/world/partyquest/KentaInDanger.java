package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.scripts.ScriptManagerImpl;

public class KentaInDanger implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 1214;

    public KentaInDanger(Char chr) {
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
        int selection = sm.sendNext("#e<Party Quest: Kenta In Danger>#n\r\nOh, poor Kenta! You must help him. He heard that some of the sea creatures were acting strange, and went to check it out. He hasn't come back yet, and  I'm getting worried. We must find Kenta. Could you help us?\r\n\r\n" +
                "#b" +
                "#L0#I will go find Kenta#l\r\n" +
                "#L1#I would like to have Kenta's New Goggles.#l\r\n" +
                "#L2#Are there any other details.#l\r\n" +
                "#L3#How many more times can I try Kenta in Danger#l#k");
        switch (selection) {
            case 0:
                if (sm.getFieldID() != GameConstants.KENTA_IN_DANGER_ENTRANCE_MAP) {
                    sm.sendNext("Thank you! Let's head to #m923040000# together.");
                    sm.warp(GameConstants.KENTA_IN_DANGER_ENTRANCE_MAP);
                } else {
                    if (party == null) {
                        sm.sendSayOkay("You have to be in a #bparty#k to enter the Kenta In Danger Party Quest. Now go find some friends!");
                    } else if (!party.isLeader(chr)) {
                        sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                    } else if (sm.checkPartyForPQ()) {
                        if (isPartyEligible((short) 160, (short) 275, party)) {
                            if (!sm.checkAttempt(entryQuest, party)) {
                                sm.warpInstanceIn(chr, GameConstants.KENTA_IN_DANGER_FIRST_STAGE, true);
                                sm.setInstanceTime(GameConstants.KENTA_IN_DANGER_TIME, GameConstants.KENTA_IN_DANGER_ENTRANCE_MAP);
                                sm.setAchieveRatio(0);
                                chr.getParty().setPartyQuest(this);
                                sm.addAttempt(entryQuest, party);
                                return;
                            } else {
                                sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                            }
                        } else {
                            sm.sendSayOkay("You cannot enter because your party doesn't have 2 members. You need 2 party members at Lv. 160 or higher to enter, so double-check and talk to me again.");
                        }
                    }
                }
                break;
            case 1:
                if (sm.sendAskYesNo("Oh, so you want #v1022175# #t1022175#, do you? We only give #t1022175# to those who have really, truly helped us understand the oceans better. Look, I tell you what if you bring me, say, #b10 #t4001535#s#k for research, I'll let you have it. The only catch is, you get #t4001535#s from conquering Pianus. So there you go, options!")) {
                    if (sm.hasItem(4001535, 10)) {
                        sm.consumeItem(4001535, 10);
                        sm.giveItem(1022175);
                    } else {
                        sm.sendSayOkay("This is no time for research! Kenta is missing! He must be in danger! Please find him and help him first.");
                    }
                }
                break;
            case 2:
                sm.sendNext("Kenta thought that he needed something more than the samples from explorers for further studies. So he went to the Dangerous Sea, saying that he's going to observe the strange behavior of the sea creatures. I haven't seen him or heard from him since he left. I'm pretty sure that's a bad sign.\r\n#e- Level#n: 160 or above #r(Recommended Level: 160 - 179)#k\r\n#e- Time Limit#n: 20 minutes\r\n#e- Players#n: 2-6\r\n#e- Reward#n:\r\n#v1022175# #t1022175#");
                break;
            case 3:
                int count = 5;
                if (chr.hasQuest(entryQuest)) {
                    count = 5 - Integer.parseInt(chr.getQRValueByKey(entryQuest, "count"));
                }
                sm.sendSayOkay("B¢n có thº th÷ thách thêm " + count + " l®n nøa.");
                break;
        }
    }

    @Override
    public void exit() {
        if (sm.sendAskYesNo("Do you want to leave?")) {
            sm.setAchieveRatio(0, false);
            sm.warpInstanceOut(chr, GameConstants.KENTA_IN_DANGER_ENTRANCE_MAP);
        }
    }

    @Override
    public void event() {
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, GameConstants.KENTA_IN_DANGER_ENTRANCE_MAP);
    }

    @Override
    public void clear(Char chr) {
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}