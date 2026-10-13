package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.constants.WzConstants;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Randomizer;
import net.swordie.ms.world.field.Instance;

public class FirstTimeTogether implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 1323;

    Instance instance;
    byte stage = 0;

    public FirstTimeTogether(Char chr) {
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
        int selection = sm.sendSayOkay("<#eParty Quest: First Time Together#n>\r\nI'm waiting for brave adventures. Please work together, share vicious #rKing Smile#k! King Smile will appear when you complete the challenges. You will need to find the right location and collect Passes corresponding to the answer to the quiz.\r\n- #eLevel#n: 70 or above #r(Recommend Level: 70 - 255)#k\r\n- #eTime Limit#n: 20 min.\r\n- #eNumber of Participants#n: 3 to 4\r\n- #eRewards#n: #v1072369# #t1072369#, Traits Exp and Party Points.#k\r\n#L0##bI want to do a party quest.#k#l\r\n#L1##bView remaining attempts for today.#k#l");
        switch (selection) {
            case 0:
                if (sm.getFieldID() != GameConstants.FIRST_TIME_TOGETHER_ENTRANCE_MAP) {
                    sm.warp(GameConstants.FIRST_TIME_TOGETHER_ENTRANCE_MAP);
                } else {
                    Party party = chr.getParty();
                    if (party == null) {
                        party = Party.createNewParty(chr, chr.getName() + "'s Party");
                        chr.setParty(party);
                    }
                    if (!party.isLeader(chr)) {
                        sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                    } else if (sm.checkPartyForPQ()) {
                        if (isPartyEligible((short) 70, (short) 275, party)) {
                            if (sm.checkAttempt(entryQuest, party)) {
                                sm.warpInstanceIn(chr, GameConstants.FIRST_TIME_TOGETHER_STAGE_1, true);
                                sm.setInstanceTime(20 * 60);
                                sm.setAchieveRatio(0);
                                party.getInstance().addProperty("kpq4answer", Randomizer.rand(10, 5000));
                                chr.getParty().setPartyQuest(this);
                                sm.addAttempt(entryQuest, party);
                                return;
                            } else {
                                sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                            }
                        } else {
                            sm.sendSayOkay("One or more party members are below level 70 or higher than level 255.");
                        }
                    }
                }
            case 1:
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
            sm.warpInstanceOut(chr, GameConstants.FIRST_TIME_TOGETHER_ENTRANCE_MAP);
        }
    }

    @Override
    public void event() {
        String scriptName = sm.getLastActiveScriptName();
        instance = party.getInstance();
        stage = (byte) ((sm.getFieldID() % 10000) / 1000);

        switch (scriptName) {
            case "WUK_StageEnter": { //FirstEnterField
                switch (stage) {
                    case 1:
                        sm.invokeAfterDelay(2000, "showWeatherNoticeToField", "Everyone! Talk to Cloto, and defeat Ligators to find the coupons Cloto wants!", WeatherEffNoticeType.KerningPQ);
                        break;
                    case 2:
                        sm.invokeAfterDelay(2000, "showWeatherNoticeToField", "Find 3 ropes that can open the door to the next Stage, Then grab onto them!", WeatherEffNoticeType.KerningPQ);
                        break;
                    case 3:
                        sm.invokeAfterDelay(2000, "showWeatherNoticeToField", "Find the 3 platforms that can open the door to the next stage!", WeatherEffNoticeType.KerningPQ);
                        break;
                    case 4:
                        for (int i = 0; i < 12; i++) {
                            sm.spawnMob(9305204, Randomizer.rand(-400, 400), -435, false);
                        }
                        sm.invokeAfterDelay(2000, "showWeatherNoticeToField", "Defeat the monsters to clear this stage!", WeatherEffNoticeType.KerningPQ);
                        break;
                    case 5:
                        sm.spawnMob(9305205, 0, -435, false);
                        sm.invokeAfterDelay(2000, "showWeatherNoticeToField", "Defeat the King Slime!", WeatherEffNoticeType.KerningPQ);
                        break;
                }
                break;
            }
            case "WUkerning_next": {
                switch (stage) {
                    case 1:
                        if (instance.hasProperty("kpq" + stage + "clear")) {
                            sm.sendNext("Please hurry on to the next stage, the portal opened!");
                        } else {
                            if (party.isLeader(chr)) {
                                if (party.getMembers().size() <= 1) { // Solo mode
                                    if (instance.hasProperty("kpq" + stage + "leader_preamble")) {
                                        if (sm.hasItem(4001007, 5)) {
                                            sm.consumeItem(4001007, 5);
                                            WUK_clearStage(stage);
                                            break;
                                        } else {
                                            sm.sendSayOkay("Solo Challenger! Defeat Ligators and collect 5 #bCoupons#k (#i4001007#).");
                                        }
                                    } else {
                                        sm.sendNext("Welcome to the 1st Stage! Since you are challenging solo, please defeat Ligators and bring me 5 #bCoupons#k to clear the stage. Good luck!");
                                        instance.addProperty("kpq" + stage + "leader_preamble", sm.getField());
                                    }
                                } else { // Multiplayer Party mode
                                    byte numPasses = (byte) Math.max(1, sm.getPartySize() - 1);
                                    if (instance.hasProperty("kpq" + stage + "leader_preamble")) {
                                        if (sm.hasItem(4001008, numPasses)) {
                                            sm.consumeItem(4001008, numPasses);
                                            WUK_clearStage(stage);
                                            break;
                                        } else {
                                            sm.sendSayOkay("I'm sorry, but you are short on the number of passes. You need to give me " + numPasses + " passes to clear the stage.");
                                        }
                                    } else {
                                        sm.sendNext("Hello and welcome to the first stage. As you can see, this place is full of Ligators. Each Ligator will drop one #bcoupon#k when defeated. Each party member, except the party leader, must come talk to me and then bring me the exact number of #bcoupons#k that i ask for. Once everyone completes their individual missions the party can move on to the next stage. Good luck!");
                                        instance.addProperty("kpq" + stage + "leader_preamble", sm.getField());
                                    }
                                }
                            } else {
                                if (instance.hasProperty("kpq" + stage + "member_preamble")) {
                                    sm.sendNext("Here's the question:\r\n Collect 10 coupons from the Ligators.");
                                    if (sm.hasItem(4001008, 1)) {
                                        sm.sendSayOkay("Please give the pass to your leader.");
                                    } else if (sm.hasItem(4001007, 10)) {
                                        sm.sendNext("That's the right answer! For that you have just received a #bpass#k. Please hand it to the leader of the party.");
                                        sm.consumeItem(4001007, 10);
                                        sm.giveItem(4001008, 1);
                                    } else {
                                        sm.sendSayOkay("I'm sorry, but you need 10 coupons! Please collect more coupons from Ligators.");
                                    }
                                } else {
                                    sm.sendNext("Hello and welcome to the first stage. As you can see, this place is full of Ligators. Each Ligator will drop one #bcoupon#k when defeated. Each party member, except the party leader, must come talk to me and then bring me the exact number of #bcoupons#k that i ask for. Once everyone completes their individual missions the party can move on to the next stage. Good luck!");
                                    instance.addProperty("kpq" + stage + "member_preamble", sm.getField());
                                }
                            }
                        }
                        break;
                    case 2:
                    case 3:
                        if (instance.hasProperty("kpq" + stage + "clear")) {
                            sm.sendNext("Please hurry on to the next stage, the portal opened!");
                        } else {
                            String nthText = stage == 2 ? "2nd" : "3rd";
                            String nthObj = stage == 2 ? "ropes" : "platforms";
                            String nthVerb = stage == 2 ? "hang" : "stand";
                            if (party.isLeader(chr)) {
                                if (instance.hasProperty("kpq" + stage + "leader_preamble")) {
                                    if (sm.rectangleStages(stage)) {
                                        WUK_clearStage(stage);
                                    } else {
                                        WUK_wrong();
                                    }
                                    break;
                                } else {
                                    sm.sendNext("Welcome to the " + nthText + " stage. Out of these " + nthObj + ", find the right combination and " + nthVerb + " on them. (Solo players can " + nthVerb + " on any one " + nthObj.substring(0, nthObj.length() - 1) + " to clear!) Double-click me when you are ready!");
                                    instance.addProperty("kpq" + stage + "leader_preamble", sm.getField());
                                }
                            } else {
                                sm.sendSayOkay("Please have the party leader talk to me.");
                            }
                        }
                        break;
                    case 4:
                        if (instance.hasProperty("kpq" + stage + "clear")) {
                            sm.sendNext("Please hurry on to the next stage, the portal opened!");
                        } else {
                            if (party.isLeader(chr)) {
                                boolean mobsDead = sm.getField().getMobs().isEmpty();
                                if (mobsDead || sm.hasItem(4001008, 1) || sm.hasItem(4001007, 5)) {
                                    if (sm.hasItem(4001008, 1)) sm.consumeItem(4001008, 1);
                                    if (sm.hasItem(4001007, 5)) sm.consumeItem(4001007, 5);
                                    WUK_clearStage(stage);
                                } else {
                                    sm.sendSayOkay("Defeat all monsters in this stage (or collect 5 coupons) to unlock the final gate to King Slime!");
                                }
                            } else {
                                sm.sendSayOkay("Please have the party leader talk to me.");
                            }
                        }
                        break;
                    case 5:
                        if (instance.hasProperty("kpq" + stage + "clear")) {
                            sm.sendNext("Please hurry on to the next stage, the portal opened!");
                        } else {
                            if (!sm.hasMobById(9305205)) {
                                clear(chr);
                                break;
                            } else {
                                sm.sendNext("Hello. Welcome to the 5th and final stage. Defeat King Slime and talk to me to complete the quest!");
                            }
                        }
                        break;
                }
                break;
            }
            case "WUkerningCal0":
            case "WUkerningCal1":
            case "WUkerningCal2":
            case "WUkerningCal3":
                int parentID = sm.getScriptInfoByType(sm.getLastActiveScriptType()).getParentID();
                String sign = scriptName.equals("WUkerningCal0") ? "+" : (scriptName.equals("WUkerningCal1") ? "-" : (scriptName.equals("WUkerningCal2")) ? "x" : "/");
                if (party.isLeader(chr)) {
                    if (instance.hasProperty("kpq4calculate")) {
                        if (!instance.getProperty("kpq4calculate").equals(sign)) {
                            for (int i = 9250100; i <= 9250103; i++) {
                                sm.changeReactorState(i, (byte) 0);
                            }
                            instance.setProperty("kpq4calculate", sign);
                            sm.increaseReactorState(parentID, 0);
                            break;
                        }
                    } else {
                        sm.increaseReactorState(parentID, 0);
                        instance.addProperty("kpq4calculate", sign);
                        break;
                    }
                } else {
                    chr.chatScriptMessage("Only the party leader can perform this action.");
                }
                break;
        }
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, GameConstants.FIRST_TIME_TOGETHER_ENTRANCE_MAP);
    }

    @Override
    public void clear(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.sendNext("Congratulations on clearing all the stages. Take care...");
        sm.givePQRewards(party);
        end(chr);
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }

    public void WUK_clearStage(byte stage) {
        instance.addProperty("kpq" + stage + "clear", sm.getField());
        sm.sendSayOkay("Congratulations on clearing the stage! I'll make the portal that sends you to the next stage. There's a time limit on getting there, so please hurry. Best of luck to you all!");
        sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
        sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
        sm.setObjectState("gate", 0);
        sm.playPortalSoundToField();
        sm.setAchieveRatio(stage * 20);
    }

    public void WUK_wrong() {
        sm.showEffectToField(WzConstants.EFECT_PQ_WRONG);
        sm.playSound(WzConstants.EFECT_PQ_SOUND_WRONG, true);
    }
}