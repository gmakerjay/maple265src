package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.constants.WzConstants;
import net.swordie.ms.enums.UIType;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.life.Reactor;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Instance;

public class Juliet implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 1205;

    public Juliet(Char chr) {
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
        if (sm.getFieldID() == 910002000) {
            if (sm.sendNext("Brave Maplers, please help us preserve the fragile peace of Magatia!\r\n#L0##bGo to #m261000021# to listen to Juliet's story.") == 0) {
                sm.warp(261000021);
            }
        } else if (sm.getFieldID() == 261000021) {
            int selection = sm.sendNext("#e<Party Quest: Romeo & Juliet>#n\r\nMagatia faces a grave threat. We need brave adventures to help us.\r\n\r\n" +
                    "#b" +
                    "#L0#Listen to Juliet's story.#l\r\n" +
                    "#L1#Start the quest.#l\r\n" +
                    "#L2#Find a party.#l\r\n" +
                    "#L3#Make a necklace with #z4001160#s.#l\r\n" +
                    "#L4#Combine two necklaces into one.#l\r\n" +
                    "#L5#How many more attempts do i have?#l" +
                    "#k");
            switch (selection) {
                case 0:
                    sm.sendNext("I, Juliet, am deeply in love with Romeo, and I know he loves me too. The problem is, I am in Alcadno Society, and Romeo is under Zenumist Society, so we are not meant to be together...");
                    sm.sendSay("What you should know is that it wasn't always like this. That is why we would like nothing more than to serve as a bridge between Zenumist and Alcadno and contribute towards peace between these two societies.");
                    sm.sendSay("We have tried our best, but unfortunately, Magatia is currently #bon the verge of a full-fledged war#k. That is because a while ago, the #bpower source of both Zenumist and Alcadno went missing#k. Both societies are now blaming one another for this incident, and it is getting worse by the day.");
                    sm.sendSay("I recently received a tip from an anonymous source that it is actually a deed of a #b3rd person#k, totally unrelated to this. In order to prevent this civil war of Magatia and have my love for Romeo fully blossom, we must find that #b3rd person#k and stop that person from destroying this great tower.");
                    sm.sendSay("Show your bravery, and help defend the peace in Magatia!\r\n" +
                            "#e- Level:#n 70 or higher #r(Recommended Level: 70-119)#k\r\n" +
                            "#e- Time Limit:#n 20 min\r\n" +
                            "#e- Number of Players:#n 4\r\n" +
                            "#e- Reward:#n" +
                            "\r\n#i1122117# #z1122117#\r\n(Can be obtained from #bJuliet#k once you collect #r20#k #b#z4001160##k.)" +
                            "\r\n#i1122118# #z1122118#\r\n(Can be traded for 1 #b#z1122116##k and 1 #b#z1122117##k)");
                    break;
                case 1:
                    if (party == null) {
                        sm.sendSayOkay("You have to be in a #bparty#k to enter the Juliet Party Quest. Now go find some friends!");
                    } else if (!party.isLeader(chr)) {
                        sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                    } else if (sm.checkPartyForPQ()) {
                        if (isPartyEligible((short) 70, (short) 275, party)) {
                            if (sm.checkAttempt(entryQuest, party, 10)) {
                                sm.warpInstanceIn(chr, GameConstants.JULIET_ENTRANCE_FIRST_STAGE, true);
                                sm.setInstanceTime(GameConstants.ROMEO_JULIET_TIME, GameConstants.JULIET_EXIT_MAP);
                                sm.setAchieveRatio(0);
                                chr.getParty().setPartyQuest(this);
                                sm.addAttempt(entryQuest, party);
                                return;
                            } else {
                                sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                            }
                        } else {
                            sm.sendSayOkay("Someone in your party isn't Lv. 70 yet. You must be Lv. 70 or higher to help Juliet!");
                        }
                    }
                    break;
                case 2:
                    sm.openUI(UIType.UI_PARTY_INVITATION);
                    break;
                case 3:
                    if (sm.hasItem(4001160, 20)) {
                        if (sm.canHold(1122117)) {
                            sm.giveItem(1122117);
                            sm.consumeItem(4001160, 20);
                        } else {
                            sm.sendSayOkay("You don't have enough empty EQUIP slot.");
                        }
                    } else {
                        sm.sendSayOkay("You don't have enough 20 #i4001160# #z4001160#.");
                    }
                    break;
                case 4:
                    if (sm.hasItem(1122116) && sm.hasItem(1122117)) {
                        if (sm.canHold(1122118)) {
                            sm.giveItem(1122118);
                            sm.consumeItem(1122116, 1);
                            sm.consumeItem(1122117, 1);
                        } else {
                            sm.sendSayOkay("You don't have enough empty EQUIP slot.");
                        }
                    } else {
                        sm.sendSayOkay("You don't have enough 1 #i1122116# #z1122116# and 1 #i1122117# #z1122117#.");
                    }
                    break;
                case 5:
                    int count = 10;
                    if (chr.hasQuest(entryQuest)) {
                        count = 10 - Integer.parseInt(chr.getQRValueByKey(entryQuest, "count"));
                    }
                    sm.sendSayOkay("B¢n có thº th÷ thách thêm " + count + " l®n nøa.");
                    break;
            }
        } else {
            exit();
        }
    }

    @Override
    public void exit() {
        if (sm.sendAskYesNo("Do you want to leave?")) {
            sm.setAchieveRatio(0, false);
            sm.warpInstanceOut(chr, GameConstants.JULIET_EXIT_MAP);
        }
    }

    @Override
    public void event() {
        Instance instance = chr.getParty().getInstance();
        if (chr.getField().getId() == GameConstants.JULIET_ENTRANCE_FIRST_STAGE) {
            if (Util.succeedProp(5)) {
                if (!instance.hasProperty("juliet1clear") && !sm.hasItem(4001131) && sm.canHold(4001131)) {
                    sm.giveItem(4001131);
                    sm.sendSayOkay("You got a #i4001131# #z4001131#!");
                } else {
                    sm.sendSayOkay("Unable to find anything here.");
                }
            } else if (Util.succeedProp(20)) {
                int selection = sm.sendNext("This is one suspicious-looking switch.#b\r\n\r\n#L0#Press the switch.\r\n#L1#Leave it as it is.");
                if (selection == 0 && !instance.hasProperty("juliet1clear")) {
                    clearStage(1);
                }
            } else if (Util.succeedProp(40)) {
                if (!instance.hasProperty("juliet1clear")) {
                    sm.giveExpNoAffectedByExpRate(500);
                    sm.sendSayOkay("Earned 500 EXP!");
                } else {
                    sm.sendSayOkay("Unable to find anything here.");
                }
            } else if (Util.succeedProp(60)) {
                if (!instance.hasProperty("juliet1clear")) {
                    sm.giveMesos(500);
                    sm.sendSayOkay("Found 500 mesos");
                } else {
                    sm.sendSayOkay("Unable to find anything here.");
                }
            } else {
                sm.sendSayOkay("Unable to find anything here.");
            }
        } else if (chr.getField().getId() == 926110100) {
            boolean canPass = true;
            for (Reactor r : chr.getField().getReactors()) {
                if (r.getTemplateId() == 2618000 && r.getState() < 7) {
                    canPass = false;
                    break;
                }
            }
            if (canPass) {
                clearStage(3);
                sm.warp(926110200);
            } else {
                sm.chat("This portal is blocked");
            }
        } else if (chr.getField().getId() == 926110200) {
            if (!instance.hasProperty("juliet4clear")) {
                if (chr.getParty().isLeader(chr)) {
                    if (sm.hasItem(4001134, 2)) {
                        sm.consumeItem(4001134, 2);
                        clearStage(4);
                        sm.changeReactorState(2618007, (byte) 1);
                    } else {
                        sm.chat("This portal is blocked");
                    }
                } else {
                    sm.sendSayOkay("Please give 2 #i4001134# #z4001134# to your Party Leader!");
                }
            } else {
                sm.warp(926110203);
            }
        } else if (chr.getField().getId() == 926110203) {
            if (!instance.hasProperty("juliet5start")) {
                int avgLevel = chr.getParty().getAvgPartyLevel();
                for (int i = 0; i < 15; i++) {
                    sm.spawnMob(9300143, chr.getPosition().getX(), chr.getPosition().getY(), false, 4000L * avgLevel);
                }
                for (int i = 0; i < 10; i++) {
                    sm.spawnMob(9300144, chr.getPosition().getX(), chr.getPosition().getY(), false, 4000L * avgLevel);
                }
                instance.addProperty("juliet5start", true);
            } else if (instance.hasProperty("juliet5start") && chr.getField().getMobs().size() == 0) {
                if (!instance.hasProperty("juliet5clear")) {
                    if (Util.succeedProp(20)) {
                        int selection = sm.sendNext("This is one suspicious-looking switch.#b\r\n\r\n#L0#Press the switch.\r\n#L1#Leave it as it is.");
                        if (selection == 0) {
                            clearStage(5);
                        } else {
                            sm.sendSayOkay("Unable to find anything here.");
                        }
                    } else {
                        sm.sendSayOkay("Unable to find anything here.");
                    }
                }
            }
        } else if (chr.getField().getId() == 926110401) {
            if (chr.getParty().isLeader(chr)) {
                sm.removeNpc(2112010);
                int avgLevel = chr.getParty().getAvgPartyLevel();
                chr.getField().spawnMob(9300150, -535, -126, false, 9999999999L);
                chr.getField().spawnMob(9300150, -276, -126, false, 9999999999L);
                for (int i = 0; i < 2; i++) {
                    chr.getField().spawnMob(9300143, 58, 150, false, 20000L * avgLevel);
                }
                for (int i = 0; i < 2; i++) {
                    chr.getField().spawnMob(9300143, 250, 150, false, 20000L * avgLevel);
                }
                for (int i = 0; i < 2; i++) {
                    chr.getField().spawnMob(9300143, 350, 150, false, 20000L * avgLevel);
                }
                for (int i = 0; i < 2; i++) {
                    chr.getField().spawnMob(9300144, -158, 150, false, 20000L * avgLevel);
                }
                for (int i = 0; i < 2; i++) {
                    chr.getField().spawnMob(9300144, 100, 150, false, 20000L * avgLevel);
                }
                for (int i = 0; i < 2; i++) {
                    chr.getField().spawnMob(9300144, 200, 150, false, 20000L * avgLevel);
                }
                chr.getField().spawnMob(9300152, 100, 150, false, 100000L * avgLevel); // Angry Frankenroid
                sm.showWeatherNoticeToField("Please protect Romeo by defeating Frankenroid!", WeatherEffNoticeType.JulietNPC);
            } else {
                sm.sendSayOkay("Only #bLeader of your party#k can talk to me!");
            }
        }
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, GameConstants.JULIET_EXIT_MAP);
    }

    @Override
    public void clear(Char chr) {
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }

    private void clearStage(int stage) {
        Instance instance = chr.getParty().getInstance();
        instance.addProperty("juliet" + stage + "clear", sm.getField());
        sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
        sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
        sm.showClearStageExpWindowToParty(sm.getPQExp());
        sm.setAchieveRatio(stage * 15);
    }
}