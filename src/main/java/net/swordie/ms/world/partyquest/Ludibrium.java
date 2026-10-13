package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.WzConstants;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Randomizer;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.field.Instance;

public class Ludibrium implements PartyQuest {

    public static final int LUDI_ENTRANCE_MAP = 221023300;
    public static final int LUDI_WAITING_ROOM = 922010000;
    public static final int STAGE_1 = 922010100;
    public static final int STAGE_2 = 922010400;
    public static final int STAGE_3 = 922010600;
    public static final int STAGE_4 = 922010700;
    public static final int STAGE_5 = 922010800;
    public static final int STAGE_FINAL = 922010900;
    public static final int STAGE_BONUS = 922011000;
    public static final int STAGE_EXIT = 922011100;

    public static final int ITEM_PASS = 4001022;
    public static final int ITEM_KEY = 4001023;
    public static final int MOB_ALISHAR = 9300012;

    private final ScriptManagerImpl sm;
    private final Char chr;
    private Party party;
    private final int entryQuest = 1324;
    private Instance instance;
    private byte stage = 0;

    public Ludibrium(Char chr) {
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
        int selection = sm.sendSayOkay("<#eParty Quest: Dimensional Crack#n>\r\nA Dimensional Crack has appeared at Eos Tower! Monsters are pouring out from the crack. Please band together with allies (or venture as a solo hero) to defeat Alishar and seal the crack!\r\n- #eLevel#n: 120 or above #r(Recommend Level: 120 - 255)#k\r\n- #eTime Limit#n: 20 min.\r\n- #eNumber of Participants#n: 1 to 6\r\n- #eRewards#n: #v1022073# #t1022073#, Traits EXP and Party Points.#k\r\n#L0##bI want to do a party quest.#k#l\r\n#L1##bView remaining attempts for today.#k#l");
        switch (selection) {
            case 0:
                if (sm.getFieldID() != LUDI_ENTRANCE_MAP && sm.getFieldID() != LUDI_WAITING_ROOM) {
                    sm.warp(LUDI_ENTRANCE_MAP);
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
                        if (isPartyEligible((short) 70, (short) 275, party)) {
                            if (sm.checkAttempt(entryQuest, party)) {
                                sm.warpInstanceIn(chr, STAGE_1, true);
                                sm.setInstanceTime(20 * 60);
                                sm.setAchieveRatio(0);
                                chr.getParty().setPartyQuest(this);
                                sm.addAttempt(entryQuest, party);
                                if (party.getInstance() != null) {
                                    party.getInstance().addProperty("Stage3Order", new int[]{1, 2, 3, 1, 2, 3});
                                    party.getInstance().addProperty("ludi_started", true);
                                }
                                sm.showWeatherNoticeToField("Defeat monsters and collect Dimensional Passes to advance!", WeatherEffNoticeType.LudibriumPQ);
                                return;
                            } else {
                                sm.sendSayOkay("One or more party members reached daily maximum attempts.");
                            }
                        } else {
                            sm.sendSayOkay("One or more party members are below level 70 or higher than level 275.");
                        }
                    }
                }
                break;
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
        if (sm.sendAskYesNo("Do you really want to leave this Party Quest?")) {
            sm.setAchieveRatio(0, false);
            sm.warpInstanceOut(chr, LUDI_WAITING_ROOM);
        }
    }

    @Override
    public void event() {
        instance = chr.getParty() != null ? chr.getParty().getInstance() : null;
        if (instance == null) {
            return;
        }
        int fieldId = sm.getFieldID();
        boolean isSolo = chr.getParty().getMembers().size() <= 1;

        if (fieldId == STAGE_1) {
            stage = 1;
            int reqPasses = isSolo ? 5 : 20;
            if (instance.hasProperty("ludi1clear")) {
                sm.sendNext("The portal to the next stage is already open! Please proceed!");
            } else if (chr.getParty().isLeader(chr)) {
                if (sm.hasItem(ITEM_PASS, reqPasses)) {
                    sm.consumeItem(ITEM_PASS, reqPasses);
                    clearStage((byte) 1, STAGE_2);
                } else {
                    sm.sendSayOkay("Welcome to Stage 1! Please defeat the Ratz and Black Ratz and bring me #b" + reqPasses + " Dimensional Passes#k (#i" + ITEM_PASS + "#).");
                }
            } else {
                sm.sendSayOkay("Please defeat the Ratz, collect the Dimensional Passes, and hand them to your Party Leader!");
            }
        } else if (fieldId == STAGE_2) {
            stage = 2;
            int reqPasses = isSolo ? 4 : 14;
            if (instance.hasProperty("ludi2clear")) {
                sm.sendNext("The portal to the next stage is open! Please hurry!");
            } else if (chr.getParty().isLeader(chr)) {
                if (sm.hasItem(ITEM_PASS, reqPasses)) {
                    sm.consumeItem(ITEM_PASS, reqPasses);
                    clearStage((byte) 2, STAGE_3);
                } else {
                    sm.sendSayOkay("Welcome to Stage 2! Enter the dark dimensional warp portals, defeat the hidden monsters, and bring me #b" + reqPasses + " Dimensional Passes#k (#i" + ITEM_PASS + "#).");
                }
            } else {
                sm.sendSayOkay("Defeat the monsters hiding in the dark chambers and give the passes to your Party Leader!");
            }
        } else if (fieldId == STAGE_3) {
            stage = 3;
            if (instance.hasProperty("ludi3clear")) {
                sm.sendNext("The path upwards is clear! Please move forward to Stage 4.");
            } else {
                sm.sendNext("Welcome to Stage 3! The boxes contain hidden portals. Jump into the boxes and navigate your way to the top of the tower!");
                clearStage((byte) 3, STAGE_4);
            }
        } else if (fieldId == STAGE_4) {
            stage = 4;
            int reqPasses = isSolo ? 1 : 4;
            if (instance.hasProperty("ludi4clear")) {
                sm.sendNext("The gate to the next stage is unlocked! Please proceed.");
            } else if (chr.getParty().isLeader(chr)) {
                Field f = sm.getField();
                boolean mobsDead = f != null && f.getMobs().isEmpty();
                if (sm.hasItem(ITEM_PASS, reqPasses) || mobsDead) {
                    if (sm.hasItem(ITEM_PASS, reqPasses)) {
                        sm.consumeItem(ITEM_PASS, reqPasses);
                    }
                    clearStage((byte) 4, STAGE_5);
                } else {
                    sm.sendSayOkay("Welcome to Stage 4! Defeat the Shadow Eyes and Chronos to collect #b" + reqPasses + " Dimensional Passes#k (#i" + ITEM_PASS + "#) or wipe out all enemies to unlock the gate!");
                }
            } else {
                sm.sendSayOkay("Defeat all the monsters in this stage and gather the Dimensional Passes for your Party Leader!");
            }
        } else if (fieldId == STAGE_5) {
            stage = 5;
            if (instance.hasProperty("ludi5clear")) {
                sm.sendNext("The portal to the Boss Stage is open! Get ready for Alishar!");
            } else if (chr.getParty().isLeader(chr)) {
                if (isSolo) {
                    clearStage((byte) 5, STAGE_FINAL);
                } else {
                    // Multiplayer platform puzzle check
                    clearStage((byte) 5, STAGE_FINAL);
                }
            } else {
                sm.sendSayOkay("Stand on the platforms and have your Party Leader talk to me!");
            }
        } else if (fieldId == STAGE_FINAL) {
            stage = 6;
            Field f = sm.getField();
            if (instance.hasProperty("ludi6clear")) {
                sm.sendNext("Congratulations! You have conquered the Dimensional Crack! Let's proceed to the Bonus Stage!");
                sm.warpInstanceIn(chr, STAGE_BONUS, false);
            } else if (chr.getParty().isLeader(chr)) {
                boolean alisharDefeated = f == null || !sm.hasMobById(MOB_ALISHAR);
                if (alisharDefeated && (sm.hasItem(ITEM_KEY, 1) || instance.hasProperty("alishar_dead"))) {
                    if (sm.hasItem(ITEM_KEY, 1)) {
                        sm.consumeItem(ITEM_KEY, 1);
                    }
                    instance.addProperty("ludi6clear", true);
                    sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
                    sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
                    sm.setAchieveRatio(100);
                    sm.givePQRewards(party);
                    sm.sendNext("You have defeated #rAlishar#k and saved Ludibrium! Claim your well-deserved rewards in the Bonus Room!");
                    sm.warpInstanceIn(chr, STAGE_BONUS, false);
                } else {
                    sm.sendSayOkay("The monstrous #rAlishar#k looms ahead! Defeat Alishar and obtain the #bDimensional Key#k (#i" + ITEM_KEY + "#) to seal the crack!");
                }
            } else {
                sm.sendSayOkay("Defeat Alishar, obtain the Dimensional Key, and hand it to your Party Leader!");
            }
        } else if (fieldId == STAGE_BONUS) {
            sm.sendSayOkay("Smash the boxes for bonus rewards before time runs out! Talk to the exit balloon when you are finished.");
        } else if (fieldId == STAGE_EXIT) {
            clear(chr);
        }
    }

    public void clearStage(byte st, int nextMapId) {
        if (instance != null) {
            instance.addProperty("ludi" + st + "clear", sm.getField());
        }
        sm.sendSayOkay("Stage " + st + " Cleared! The portal to the next stage has opened. Head through the gate!");
        sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
        sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
        sm.setObjectState("gate", 0);
        sm.playPortalSoundToField();
        sm.setAchieveRatio(st * 16);
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, LUDI_WAITING_ROOM);
    }

    @Override
    public void clear(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.sendNext("Thank you for protecting Ludibrium! Safe travels, brave adventurer!");
        if (party != null) {
            sm.givePQRewards(party);
        }
        end(chr);
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}
