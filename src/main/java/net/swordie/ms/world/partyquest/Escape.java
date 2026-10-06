package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.constants.WzConstants;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Instance;

public class Escape implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 1215;

    public Escape(Char chr) {
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
        sm.setSpeakerID(9020005);
        int selection = sm.sendNext("#e<Party Quest: Escape>#n\r\n" +
                "The truth is, I wanted to run away... but i couldn't leave him behind. He's trapped in the Aerial Prison, and needs someone to bust him out.\r\n\r\n" +
                "#b" +
                "#L0#I'll help the Explorer trapped in the castle!#l\r\n" +
                "#L1#Please tell me about the castle's prison.#l\r\n" +
                "#L2#Please tell me more about the Prison Guard Key.#l" +
                "#k");
        switch (selection) {
            case 0:
                if (sm.getFieldID() != GameConstants.ESCAPE_ENTRANCE_MAP) {
                    sm.sendSayOkay("You're braver than you seem. Follow me, I'll show you to the Aerial Prison.");
                    sm.warp(GameConstants.ESCAPE_ENTRANCE_MAP);
                } else {
                    if (party == null) {
                        sm.sendSayOkay("You have to be in a #bparty#k to enter the Escape Party Quest. Now go find some friends!");
                    } else if (!party.isLeader(chr)) {
                        sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                    } else if (sm.checkPartyForPQ()) {
                        if (isPartyEligible((short) 120, (short) 275, party)) {
                            if (sm.checkAttempt(entryQuest, party)) {
                                sm.warpInstanceIn(chr, GameConstants.ESCAPE_STAGE_FIRST_STAGE, true);
                                sm.setInstanceTime(GameConstants.ESCAPE_TIME, GameConstants.ESCAPE_ENTRANCE_MAP);
                                sm.setAchieveRatio(0);
                                chr.getParty().setPartyQuest(this);
                                sm.addAttempt(entryQuest, party);
                                return;
                            } else {
                                sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                            }
                        } else {
                            sm.sendSayOkay("One or more party members are below level 120 or higher than level 255.");
                        }
                    }
                }
                break;
            case 1:
                sm.sendNext("There's a Hidden Tower in this castle. Numberous people are trapped in the Aerial Prison of that tower. Someone must save them...\r\n#e- Level#n: 140 or above #r(Recommended Level: 140 - 159)#k\r\n#e-Time Limit#n: 20 minutes\r\n#e- Players#n: 3-6\r\n#e-Rewards#n:\r\n#v1132094# #t1132094#\r\n#v1132095# #t1132095#\r\n#v1132096# #t1132096#\r\n#v1132097# #t1132097#\r\n#v1132098# #t1132098#");
                sm.sendSay("Here's the plan.\r\n1. Evade the obstacles and infiltrade the prison.\r\n2. Eliminate all guards on the map.\r\n3. Make it through the maze and find the prison entrance.\r\n4. Eliminate any guards protecting the prison door.\r\n5. Evade the booby traps and get into the Aerial Prison.\r\n6. Eliminate all guards and find the Prison Key.\r\n7. Defeat Prison Guards Ani and free the prisoners.");
                break;
            case 2:
                int exchangeSel = sm.sendNext("#r#z4001534#s#k are keys held by the Hidden Tower's Prison Guards. If you bring me #b5#k of them, I'll give you a small gift. Getting so many would mean that you've saved a lot of people, after all." +
                        "#b" +
                        "\r\n#L0##v1132094# #z1132094##l" +
                        "\r\n#L1##v1132095# #z1132095##l" +
                        "\r\n#L2##v1132096# #z1132096##l" +
                        "\r\n#L3##v1132097# #z1132097##l" +
                        "\r\n#L4##v1132098# #z1132098##l" +
                        "#k");
                if (sm.hasItem(4001534, 5) && sm.canHold(1132094 + exchangeSel)) {
                    sm.giveItem(1132094 + exchangeSel);
                    sm.consumeItem(4001534, 5);
                } else {
                    sm.sendSayOkay("You don't have enough 5 of #t4001534#s or make some room in your EQUIP inventory.");
                }
                break;
        }
    }

    @Override
    public void exit() {
        sm.setSpeakerID(9020005);
        if (sm.sendAskYesNo("Do you want to leave?")) {
            sm.setAchieveRatio(0, false);
            sm.warpInstanceOut(chr, GameConstants.ESCAPE_ENTRANCE_MAP);
        }
    }

    @Override
    public void event() {
        Instance instance = party.getInstance();
        int stage = (sm.getFieldID() % 1000) / 100;
        if (!instance.hasProperty("escape" + stage + "clear")) {
            if (!sm.hasMobsInField() || sm.getFieldID() == 921160600) {
                instance.addProperty("escape" + stage + "clear", sm.getField());
                sm.showEffectToField(WzConstants.EFFECT_PQ_CLEAR);
                sm.playSound(WzConstants.EFFECT_PQ_SOUND_CLEAR, true);
                sm.showClearStageExpWindowToParty(sm.getPQExp());
                sm.setAchieveRatio((stage == 3 || stage == 6) ? (stage * 10 + 10) : (stage * 10));
                sm.invokeAfterDelay(2000, "warpParty", sm.getFieldID() + 100, party);
            }
        }
    }

    @Override
    public void end(Char chr) {
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, GameConstants.ESCAPE_ENTRANCE_MAP);
    }

    @Override
    public void clear(Char chr) {
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}