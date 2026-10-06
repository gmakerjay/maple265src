package net.swordie.ms.world.partyquest;


import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.scripts.ScriptManagerImpl;

public class TangyoonCooking implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;

    public TangyoonCooking(Char chr) {
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
        int selection = sm.sendNext("#e<Party Quest: Cooking with Tangyoon>#n\r\nDo you want to make some delicious dishes for the crew of the Nautilus? I can teach you how.\r\n\r\n#b#L0#Start Cooking with Tangyoon.#l\r\n#L1#Get Tangyoon's Chef Outfit.#l\r\n#L2#Listen to the explanation about Cooking with Tangyoon.#l\r\n#L3#View remaining attempts for today.#l#k");
        switch (selection) {
            case 0:
                if (chr.getField().getId() != GameConstants.TANGYOON_COOKING_ENTRANCE_MAP) {
                    sm.sendNext("Cooking is not easy. But if you're still up for it then follow me");
                    sm.warp(GameConstants.TANGYOON_COOKING_ENTRANCE_MAP);
                } else {
                    if (party == null) {
                        sm.sendSayOkay("You have to be in a #bparty#k to enter the Tangyoon Cooking Party Quest. Now go find some friends!");
                    } else if (!party.isLeader(chr)) {
                        sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                    } else if (sm.checkPartyForPQ()) {
                        if (isPartyEligible((short) 60, (short) 90, party)) {
                            sm.warpInstanceIn(chr, GameConstants.TANGYOON_COOKING_ENTRANCE_MAP, true);
                            sm.sendSayOkay("You know what they say about too many cooks. If you'd like to enter, then you need to be in a party of 3 or less. Just have your Party Leader enter for you. You can even come by yourself.");
                            sm.setInstanceTime(20 * 60);
                            party.getInstance().addProperty("Tangyoon Cooking", true);
                            chr.getParty().setPartyQuest(this);
                            return;
                        } else {
                            sm.sendSayOkay("One or more party members are below level 60 or higher than level 90.");
                        }
                    }
                }
                break;
            case 1:
                int selection1 = sm.sendNext("A Chef Outfit? Only the most talented cooks can get those.\r\n\r\n#L0#Give me a Chef Outfit (2 or more #t4033668#s).#l\r\n#L1#Give me a Chef Hat (3 or more #t4033668#s).#l");
                if (selection1 == 0) {
                    if (sm.hasItem(4033668, 2) && sm.canHold(1052578)) {
                        sm.consumeItem(4033668, 2);
                        sm.giveItem(1052578);
                    } else {
                        sm.sendNext("Are you sure you have 2 #t4033668#s? If not, make sure your Equip tab is not full. And don't try to trick me! I can smell deceit.");
                    }
                } else {
                    if (sm.hasItem(4033668, 3) && sm.canHold(1003762)) {
                        sm.consumeItem(4033668, 3);
                        sm.giveItem(1003762);
                    } else {
                        sm.sendNext("Are you sure you have 3 #t4033668#s? If not, make sure your Equip tab is not full. And don't try to trick me! I can smell deceit.");
                    }
                }
                break;
            case 2:
                sm.sendNext("Welcome to the Nautilus, the finest pirate ship in Maple World! I'm Tangyoon, the head chef in charge of the galley! Everyone knows I'm the boss around here, whipping up dishes of aggressively good grub.");
                sm.sendPrev("But even a great chef like me has trouble keeping up with these pirates! I've never seen such scurvy souls eat so much. I'm starting to think I need assistants.");
                sm.sendPrev("And that's where you come in. I can teach you to cook if you're strong enough for it. See, you have to beat the ingredients into submission to cook them. You also have to salt and roast them just right, but we can get to that later.");
                sm.sendPrev("If your food is good, you'll be hailed as a hero. If it isn't though... Well, pirates express themselves through violence, y'know. But I think you can handle it. Want to give it a try? You can try up to 5 times a day.\r\n#e- Level#n: 60 or above #r(Recommended Level: 60 - 90)#k\r\n#e- Time Limit#n: 20 minutes\r\n#e- Players#n: 1-3\r\n#e- Rewards#n:\r\n#v1003762# #t1003762#\r\n#v1052578# #t1052578#");
                break;
            case 3:
                //TODO: Attempt
                sm.sendSayOkay("You can try the challenge 5 more time(s) today.");
                break;
        }
    }

    @Override
    public void exit() {
        sm.setSpeakerID(1097001);
        if (sm.sendAskYesNo("Are you giving up already?")) {
            sm.warpInstanceOut(chr, GameConstants.TANGYOON_COOKING_ENTRANCE_MAP);
        }
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.warpInstanceOut(chr, GameConstants.TANGYOON_COOKING_ENTRANCE_MAP);
    }

    @Override
    public void clear(Char chr) {

    }

    @Override
    public void event() {
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}
