package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.constants.WzConstants;
import net.swordie.ms.enums.UIType;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Instance;

public class LordPirate implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 1204;

    public LordPirate(Char chr) {
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
        int selection = sm.sendNext("#e<Party Quest: Lord Pirate>#n\r\nWhat do you want?\r\n\r\n" +
                "#b" +
                "#L0#I want to do a party quest.#l\r\n" +
                "#L1#I want a party.#l\r\n" +
                "#L2#I want some answers.#l\r\n" +
                "#L3#I want a Lord Pirate Hat.#l\r\n" +
                "#L4#How many more runs do i have today?#l" +
                "#k");
        switch (selection) {
            case 0:
                if (sm.getFieldID() != GameConstants.LORD_PIRATE_ENTRANCE_MAP) {
                    sm.sendSayOkay("You're braver than you seem. Follow me, I'll show you to the Aerial Prison.");
                    sm.warp(GameConstants.LORD_PIRATE_ENTRANCE_MAP);
                } else {
                    if (party == null) {
                        sm.sendSayOkay("You have to be in a #bparty#k to enter the Escape Party Quest. Now go find some friends!");
                    } else if (!party.isLeader(chr)) {
                        sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                    } else if (sm.checkPartyForPQ()) {
                        if (isPartyEligible((short) 130, (short) 275, party)) {
                            if (sm.checkAttempt(entryQuest, party)) {
                                sm.sendNext("The #m9800156# ambushed us and the king of the bellflowers, #b#p2094001##k, has been kidnapped. Shoo #m9800156# and his crewman away to rescue #b#p2094001##k.\r\n#L0##bSure! I'll help you, Guon.#l#k");
                                sm.warpInstanceIn(chr, GameConstants.LORD_PIRATE_FIRST_STAGE, true);
                                sm.setInstanceTime(GameConstants.LORD_PIRATE_TIME, GameConstants.LORD_PIRATE_ENTRANCE_MAP);
                                sm.setAchieveRatio(0);
                                chr.getParty().setPartyQuest(this);
                                sm.addAttempt(entryQuest, party);
                                return;
                            } else {
                                sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                            }
                        } else {
                            sm.sendSayOkay("One or more party members are below level 130 or higher than level 255.");
                        }
                    }
                }
                break;
            case 1:
                sm.openUI(UIType.UI_PARTY_INVITATION);
                break;
            case 2:
                sm.sendSayOkay("#b#m251000000##k, home of the Bellflowers, has been attacked by the #r#m9800156##k. The king of the Bellflowers, #b#p2094001##k, has been kidnapped. Gather your allies and attack the pirate ship. Drive the #m9800156# and his men away!\r\n#e- Level#n: 130+ #r(Recommended Level: 130 - 149)#k\r\n#e- Players#n: 3 - 6\r\n#e- Reward#n: #v1003856# #b#t1003856##k");
                break;
            case 3:
                int exchangeSel = sm.sendNext("Thank you for rescuing #bWu Yang#k from the #bLord Pirate#k. If you bring me his Hat Fragments, I'll glue them together to make a #bLord Pirate Hat#k. Which hat do you want?\r\n" +
                        "#L0##b#v1003856# #t1003856##k #r(Requires #t4001455# x30)#k#l\r\n" +
                        "#L1##b#v1003857# #t1003857##k #r(Requires #t4001455# x60)#k#l\r\n" +
                        "#L2##b#v1003858# #t1003858##k #r(Requires #t4001455# x90)#k#l");
                if (sm.hasItem(4001455, 30 * (exchangeSel + 1)) && sm.canHold(1003856 + exchangeSel)) {
                    sm.giveItem(1003856 + exchangeSel);
                    sm.consumeItem(4001455, 30 * (exchangeSel + 1));
                } else {
                    sm.sendSayOkay("You don't have enough " + 30 * (exchangeSel + 1) + " of #t4001455#s or make some room in your EQUIP inventory.");
                }
                break;
            case 4:
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
        if (sm.sendAskYesNo("Are you sure you want to leave?")) {
            sm.setAchieveRatio(0, false);
            sm.warpInstanceOut(chr, GameConstants.LORD_PIRATE_ENTRANCE_MAP);
        }
    }

    @Override
    public void event() {
        int stage = (sm.getFieldID() % 1000) / 100;
        int requireCount = 30;
        int ROOKIE_PIRATE_MARK = 4001120; // Stage 0
        int RISING_PIRATE_MARK = 4001121; // Stage 1
        int VETERAN_PIRATE_MARK = 4001122; // Stage 2
        Instance instance = party.getInstance();
        if (sm.getFieldID() == 925100100) {
            if (party.isLeader(chr)) {
                if (instance.hasProperty("lordpirate" + stage + "clear")) {
                    sm.sendNext("Make your way through the portal on the right");
                } else {
                    if (sm.hasItem(ROOKIE_PIRATE_MARK, requireCount) && sm.hasItem(RISING_PIRATE_MARK, requireCount) && sm.hasItem(VETERAN_PIRATE_MARK, requireCount)) {
                        sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
                        sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
                        sm.setAchieveRatio(stage * 25);
                        sm.showClearStageExpWindowToParty(sm.getPQExp());
                        sm.consumeItem(ROOKIE_PIRATE_MARK, requireCount);
                        sm.consumeItem(RISING_PIRATE_MARK, requireCount);
                        sm.consumeItem(VETERAN_PIRATE_MARK, requireCount);
                        instance.addProperty("lordpirate" + stage + "clear", sm.getField());
                        sm.sendNext("Great you may now continue to the next stage!");
                    } else {
                        sm.sendNext("Please bring me " + requireCount + ":" +
                                "\r\n#v" + ROOKIE_PIRATE_MARK + "##b#t" + ROOKIE_PIRATE_MARK + "##k" +
                                "\r\n#v" + RISING_PIRATE_MARK + "##b#t" + RISING_PIRATE_MARK + "##k" +
                                "\r\n#v" + VETERAN_PIRATE_MARK + "##b#t" + VETERAN_PIRATE_MARK + "##k");
                    }
                }
            } else {
                sm.sendSayOkay("Please, have your party leader speak to me.");
            }
        } else if (sm.getFieldID() == 925100500) {
            if (!sm.hasMobsInField() && !instance.hasProperty("lordpirate" + stage + "clear")) {
                if (party.isLeader(chr)) {
                    sm.sendNext("You have done us a great favour, what ever can we do to repay you?");
                } else {
                    sm.sendSayOkay("Please have your party leader speak to me.");
                }
                sm.givePQRewards(party);
                sm.setAchieveRatio(100);
                instance.addProperty("lordpirate" + stage + "clear", sm.getField());
                for (Char player : party.getOnlineChars()) {
                    ScriptManagerImpl sm = player.getScriptManager();
                    sm.consumeItem(4001117, sm.getQuantityOfItem(4001117)); // Old Metal Key
                    sm.consumeItem(4001120, sm.getQuantityOfItem(4001120)); // Rookie Pirate Mark
                    sm.consumeItem(4001121, sm.getQuantityOfItem(4001121)); // Rising Pirate Mark
                    sm.consumeItem(4001122, sm.getQuantityOfItem(4001122)); // Veteran Pirate Mark
                }
                sm.invokeAfterDelay(2000, "warpParty", 925100700, party);
            } else {
                sm.sendSayOkay("Please get rid of the Captain!");
            }
        } else {
            exit();
        }
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, GameConstants.LORD_PIRATE_ENTRANCE_MAP);
    }

    @Override
    public void clear(Char chr) {
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}