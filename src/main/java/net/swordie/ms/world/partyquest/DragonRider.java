package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.constants.WzConstants;
import net.swordie.ms.enums.UIType;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Field;

public class DragonRider implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private Party party;
    private final int entryQuest = 1210;

    public DragonRider(Char chr) {
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
        sm.setSpeakerID(9020016);
        int selection = sm.sendNext("#e<Party Quest: Dragon Rider>#n\r\nHelp an old man out, will you? Defeat the Dragon Rider and restore peace to Leafre!\r\n\r\n#b" +
                "#L0#1. Enter Crimson Sky Dock (Lv. 150+, Solo or Party)#l\r\n" +
                "#L1#2. Find a party.#l\r\n" +
                "#L2#3. Tell me more about this quest.#l\r\n" +
                "#L3#4. How many more attempts do I have today?#l#k");
        switch (selection) {
            case 0:
                Party party = chr.getParty();
                if (party == null) {
                    party = Party.createNewParty(chr, chr.getName() + "'s Party");
                    chr.setParty(party);
                }
                this.party = party;
                if (!party.isLeader(chr)) {
                    sm.sendSayOkay("Please tell the leader of your party to talk to me.");
                    return;
                }
                if (sm.checkPartyForPQ()) {
                    if (isPartyEligible((short) 150, (short) 275, party)) {
                        if (sm.checkAttempt(entryQuest, party)) {
                            sm.warpInstanceIn(chr, GameConstants.DRAGON_RIDER_FIRST_STAGE, true);
                            sm.setInstanceTime(GameConstants.DRAGON_RIDER_TIME, 910002000);
                            sm.setAchieveRatio(0);
                            chr.getParty().setPartyQuest(this);
                            sm.addAttempt(entryQuest, party);
                            return;
                        } else {
                            sm.sendSayOkay("One or more party members have reached the daily maximum attempts.");
                        }
                    } else {
                        sm.sendSayOkay("Someone in your party has not reached Lv. 150. You must be Lv. 150 or higher to enter!");
                    }
                }
                break;
            case 1:
                sm.openUI(UIType.UI_PARTY_INVITATION);
                break;
            case 2:
                sm.sendSayOkay("Enter the #bCrimson Sky Doorway#k and uncover the identity of the #rDragon Rider#k. Soar through the sky and take down Wyverns!\r\n #e- Level:#n 150 or higher #r(Recommended: 150 - 200)#k\r\n#e- Time Limit:#n 20 minutes\r\n#e- Players:#n 1 - 6 (Solo or Party)");
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
        if (sm.sendAskYesNo("Do you want to leave the Dragon Rider Party Quest?")) {
            sm.setAchieveRatio(0, false);
            sm.warpInstanceOut(chr, 910002000);
        }
    }

    @Override
    public void event() {
        Party p = chr.getParty() != null ? chr.getParty() : this.party;
        this.party = p;
        Field field = chr.getField();
        if (field.getId() == 240080500) { // Final Stage
            if (field.getMobs().isEmpty()) {
                clear(chr);
            } else {
                sm.chat("Defeat the Dragon Rider to restore peace!");
            }
        } else {
            if (field.getMobs().isEmpty()) {
                sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
                sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
                sm.warpParty(field.getId() + 100, p);
            } else {
                sm.chat("Please eliminate all enemies before moving to the next stage.");
            }
        }
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, 910002000);
    }

    @Override
    public void clear(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
        sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
        Party p = chr.getParty() != null ? chr.getParty() : this.party;
        sm.givePQRewards(p);
        end(chr);
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}