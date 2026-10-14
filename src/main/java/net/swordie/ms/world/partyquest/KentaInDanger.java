package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.constants.WzConstants;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.world.field.Instance;

public class KentaInDanger implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private Party party;
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
        int selection = sm.sendNext("#e<Party Quest: Kenta In Danger>#n\r\nOh, poor Kenta! You must help him. He heard that some of the sea creatures were acting strange, and went to check it out. He hasn't come back yet, and I'm getting worried. We must find Kenta. Could you help us?\r\n\r\n" +
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
                    Party currentParty = chr.getParty();
                    if (currentParty == null) {
                        currentParty = Party.createNewParty(chr, chr.getName() + "'s Party");
                        chr.setParty(currentParty);
                    }
                    this.party = currentParty;
                    if (!party.isLeader(chr)) {
                        sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                    } else if (sm.checkPartyForPQ()) {
                        if (isPartyEligible((short) 160, (short) 275, party)) {
                            if (sm.checkAttempt(entryQuest, party)) {
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
                            sm.sendSayOkay("One or more party members are below level 160 or higher than level 275.");
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
                sm.sendNext("Kenta thought that he needed something more than the samples from explorers for further studies. So he went to the Dangerous Sea, saying that he's going to observe the strange behavior of the sea creatures. I haven't seen him or heard from him since he left. I'm pretty sure that's a bad sign.\r\n#e- Level#n: 160 or above #r(Recommended Level: 160 - 179)#k\r\n#e- Time Limit#n: 20 minutes\r\n#e- Players#n: 1-6 (Solo or Party)\r\n#e- Reward#n:\r\n#v1022175# #t1022175#");
                break;
            case 3:
                int count = 5;
                if (chr.hasQuest(entryQuest)) {
                    count = 5 - Integer.parseInt(chr.getQRValueByKey(entryQuest, "count"));
                }
                sm.sendSayOkay("You can challenge this " + count + " more time(s) today.");
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
        if (party == null) {
            return;
        }
        int fieldId = sm.getFieldID();
        Party p = chr.getParty() != null ? chr.getParty() : this.party;
        this.party = p;
        if (fieldId == 923040100) {
            sm.warpParty(923040200, p);
        } else if (fieldId == 923040200) {
            sm.warpParty(923040300, p);
        } else if (fieldId == 923040300) {
            sm.warpParty(923040400, p);
        } else if (fieldId == 923040400) {
            Instance instance = p != null ? p.getInstance() : null;
            if (instance != null && !instance.hasProperty("pianus_spawned")) {
                instance.addProperty("pianus_spawned", true);
                sm.spawnMob(8520000, 180, 1810, false);
                sm.showWeatherNoticeToField("Defeat Pianus to rescue Kenta!", WeatherEffNoticeType.KentaPQ);
                return;
            }
            if (!sm.hasMobsInField()) {
                if (p != null && p.isLeader(chr)) {
                    sm.sendNext("Thank you so much for rescuing me from Pianus! Here is your reward.");
                } else {
                    sm.sendSayOkay("Thank you for helping me defeat Pianus!");
                }
                clear(chr);
            } else {
                sm.sendSayOkay("Please defeat Pianus to save Kenta!");
            }
        } else {
            exit();
        }
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, GameConstants.KENTA_IN_DANGER_ENTRANCE_MAP);
    }

    @Override
    public void clear(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
        sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
        Party p = chr.getParty() != null ? chr.getParty() : this.party;
        if (p != null) {
            sm.givePQRewards(p);
            for (Char player : p.getOnlineChars()) {
                player.addItemToInventory(4001535, 2);
            }
            sm.invokeAfterDelay(2000, "warpParty", GameConstants.KENTA_IN_DANGER_ENTRANCE_MAP, p);
        } else {
            sm.givePQRewards(null);
            chr.addItemToInventory(4001535, 2);
            sm.warpInstanceOut(chr, GameConstants.KENTA_IN_DANGER_ENTRANCE_MAP);
        }
        sm.setAchieveRatio(100);
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}