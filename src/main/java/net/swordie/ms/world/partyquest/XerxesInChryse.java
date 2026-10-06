package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.connection.packet.TemporarySkillMan;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.field.MobGen;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

public class XerxesInChryse implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 1314;
    private List<Mob> mobs = new ArrayList<>();
    private List<ScheduledFuture> mobTimers = new ArrayList<>();

    public XerxesInChryse(Char chr) {
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
        sm.setSpeakerID(2170016);
        int selection = sm.sendNext("#e<Party Quest: Xerxes in Chryse>#n\r\nHas anyone seen my pet? He's cute and fluffy and has a terrifying army serving his whims.\r\n\r\n" +
                "#b" +
                "#L0#Enter the Chryse Party Quest.#l\r\n" +
                "#L1#Listen to Michaela's story.#l\r\n" +
                "#L2#Get your reward.#l\r\n" +
                "#L3#Check on your remaining challenges for the day.#l#k");
        switch (selection) {
            case 0:
                if (party == null) {
                    sm.sendSayOkay("You can't enter without being in a party. Try again after joining a party.");
                } else if (!party.isLeader(chr)) {
                    sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                } else if (sm.checkPartyForPQ()) {
                    if (isPartyEligible((short) 110, (short) 275, party)) {
                        if (sm.checkAttempt(entryQuest, party)) {
                            sm.warpInstanceIn(chr, GameConstants.XERXES_CHRYSE_FRONT_FIELD, true);
                            sm.setInstanceTime(GameConstants.XERXES_CHRYSE_TIME, 910002000);
                            party.setPartyQuest(this);
                            chr.getField().broadcast(TemporarySkillMan.setTemporarySkillSet(80001705, 6));
                            sm.addAttempt(entryQuest, party);
                            return;
                        } else {
                            sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                        }
                    } else {
                        sm.sendSayOkay("One or more party members are below level 110.");
                    }
                }
                break;
            case 1:
                sm.sendNext("My pet's name is Xerxes. He's the softest, sweetest little mountain sheep. Well, he was... until the whole's raising a huge army's thing.");
                sm.sendSay("I think he's up to no good at the Coliseum Tower, what with the building and fearmongering. Please go see what my precious pet is doing there.\r\n\r\n" +
                        "- #eLevel:#n 110 or above #r(Recommended Level: 110 - 129)#k\r\n" +
                        "- #eTime Limit:#n 20 minutes\r\n" +
                        "- #ePlayers:#n 1 - 4\r\n" +
                        "- #eRewards:#n\r\n\r\n#i1022245# #z1022245#\r\n#i1022246# #z1022246#");
                break;
            case 2:
                if (sm.hasItem(4001844, 80)) {
                    int sel2 = sm.sendNext("Which one you like?\r\n\r\n#b#L0##i1022245# #z1022245##l\r\n#L1##i1022246# #z1022246##l#k");
                    if (sm.canHold(1022245) && sel2 == 0) {
                        sm.consumeItem(4001844, 80);
                        sm.giveItem(1022245);
                    } else if (sm.canHold(1022246) && sel2 == 1) {
                        sm.consumeItem(4001844, 80);
                        sm.giveItem(1022246);
                    }
                } else {
                    sm.sendNext("Hm... #h #, you have #r#c4001844##k #t4001844#. You need to bring back at least #r80#k for the rewad.");
                }
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
        if (sm.getFieldID() == GameConstants.XERXES_CHRYSE_ENTRANCE_MAP) {
            if (sm.sendAskYesNo("Do you want to give up and return with me")) {
                if (sm.sendAskYesNo("Really? That's not very heroic...\r\n#r(Press Yes to forfeit your progress and leave.)#k")) {
                    sm.warpInstanceOut(chr, 920012600);
                }
            }
        } else if (sm.getFieldID() == GameConstants.XERXES_CHRYSE_EXIT) {
            sm.sendNext("#h #! I trusted you, and you gave up so easily. However, I'm sure that was just a one-time thing, so I'll trust you to come back and help again sometime.");
            int sel = sm.sendNext("I'll bring you back to one of these places.\r\n\r\n#b#L0#Challenge <Xerxes in Chryse>#l\r\n#L1#Return to #e#m910002000##n#l#k");
            if (sel == 0) {
                start();
            } else if (sel == 1) {
                sm.sendNext("I will send you to #m910002000# right away.");
                sm.warpInstanceOut(chr, 910002000);
            }
        }
    }

    @Override
    public void event() {
        Field field = chr.getField();
        this.mobs = field.getMobs().stream().toList();
        this.mobTimers.clear();
        for (Mob mob : field.getMobs()) {
            mob.removeWithAnimation();
        }
        for (MobGen mobGen : field.getMobGens()) {
            field.removeLife(mobGen);
        }
        initStage();
    }

    private void initStage() {
        // Stage 1:
        ScheduledFuture<?> s1 = chr.getTimer().addEvent(() -> {
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage1");
            for (int i = 0; i < 45; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 1, TimeUnit.SECONDS);
        this.mobTimers.add(s1);
        // Stage 2:
        ScheduledFuture<?> s2 = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage2");
            for (int i = 0; i < 45; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 5, TimeUnit.SECONDS);
        this.mobTimers.add(s2);
        // Stage 3:
        ScheduledFuture<?> s3 = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage3");
            for (int i = 0; i < 45; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 15, TimeUnit.SECONDS);
        this.mobTimers.add(s3);
        // Stage 4:
        ScheduledFuture<?> s4 = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage4");
            for (int i = 0; i < 45; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 25, TimeUnit.SECONDS);
        this.mobTimers.add(s4);
        // Stage 5:
        ScheduledFuture<?> s5 = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage5");
            for (int i = 0; i < 45; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 35, TimeUnit.SECONDS);
        this.mobTimers.add(s5);
        // Stage 6:
        ScheduledFuture<?> s6 = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage6");
            for (int i = 0; i < 70; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 50, TimeUnit.SECONDS);
        this.mobTimers.add(s6);
        // Stage 7:
        ScheduledFuture<?> s7 = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage7");
            for (int i = 0; i < 70; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 65, TimeUnit.SECONDS);
        this.mobTimers.add(s7);
        // Stage 8:
        ScheduledFuture<?> s8 = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage8");
            for (int i = 0; i < 70; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 80, TimeUnit.SECONDS);
        this.mobTimers.add(s8);
        // Stage 9:
        ScheduledFuture<?> s9 = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage9");
            for (int i = 0; i < 70; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 105, TimeUnit.SECONDS);
        this.mobTimers.add(s9);
        // Stage 10:
        ScheduledFuture<?> s10 = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stage10");
            for (int i = 0; i < 70; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 130, TimeUnit.SECONDS);
        this.mobTimers.add(s10);
        // Final Stage:
        ScheduledFuture<?> sFinal = chr.getTimer().addEvent(() -> {
            if (sm.getFieldID() != GameConstants.XERXES_CHRYSE_FRONT_FIELD) {
                this.mobTimers.clear();
                return;
            }
            sm.showEffectToField("Map/Effect.img/kreasePQ/stageFinal");
            for (int i = 0; i < 70; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
            for (int i = 0; i < 70; i++) {
                if (mobs.size() > i) {
                    Mob m = mobs.get(i);
                    sm.spawnMob(m.getTemplateId(), m.getX(), m.getY(), false);
                }
            }
        }, 150, TimeUnit.SECONDS);
        this.mobTimers.add(sFinal);
    }

    @Override
    public void end(Char chr) {
        for (ScheduledFuture<?> sf : mobTimers) {
            if (sf != null) {
                sf.cancel(false);
            }
        }
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.warpInstanceOut(chr, GameConstants.XERXES_CHRYSE_EXIT);
        if (chr.getParty() != null) {
            chr.getParty().broadcast(TemporarySkillMan.setTemporarySkillSet(0, 0));
        } else {
            chr.write(TemporarySkillMan.setTemporarySkillSet(0, 0));
        }
    }

    @Override
    public void clear(Char chr) {
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }
}
