package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.handlers.Timer;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.world.field.Field;
import net.swordie.ms.world.field.MobGen;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

public class MoonBunny implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 1323;
    List<MobGen> mobGens = new ArrayList<>();
    List<Integer> stage1Mobs = List.of(9300058, 9300059);
    List<Integer> stage2Mobs = List.of(9300062, 9300063, 9300064);
    private ScheduledFuture<?> startEvent;
    private byte stage = 0;
    private boolean isAdded = false;

    public MoonBunny(Char chr) {
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
        if (chr.getField().getId() == GameConstants.MOON_BUNNY_STAGE) {
        } else {
            int selection = sm.sendSayOkay("<#eParty Quest: Moon Bunny's Rice Cake#n>\r\nA mysterious Moon Bunny that only appears in #bPrimrose Hill#k during full moons. #bTory#k of #bHenesys Park#k is looking for Maplers to find #rMoon on Bunny's Rice Cake#k for #bGrowlie#k. If you want to meet the Moon Bunny, plant Primorose Seeds in the designated locations and summon forth a full moon. Protect the Moon Bunny from wild animals until all #r80 Rice Cakes#k are made.\r\n- #eLevel#n: 70 or above #r(Recommend Level: 70 - 255)#k\r\n- #eTime Limit#n: 10 min.\r\n- #eNumber of Participants#n: 3 to 6\r\n- #eRewards#n: #v1002798# #t1002798#, Traits Exp and Party Points.#k\r\n#L0##bI want to do a party quest.#k#l\r\n#L1##bView remaining attempts for today.#k#l\r\n#L2##bExchange rice cake(s) for the Hat.#k#l");
            switch (selection) {
                case 0:
                    if (sm.getFieldID() != GameConstants.MOON_BUNNY_ENTRANCE_MAP) {
                        sm.warp(GameConstants.MOON_BUNNY_ENTRANCE_MAP);
                    } else {
                        if (party == null) {
                            sm.sendSayOkay("You have to be in a #bparty#k to enter the Moon Bunny Party Quest. Now go find some friends!");
                        } else if (!party.isLeader(chr)) {
                            sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                        } else if (sm.checkPartyForPQ()) {
                            if (isPartyEligible((short) 70, (short) 275, party)) {
                                if (sm.checkAttempt(entryQuest, party)) {
                                    chr.getParty().setPartyQuest(this);
                                    sm.setAchieveRatio(0);
                                    sm.warpInstanceIn(chr, GameConstants.MOON_BUNNY_STAGE, true);
                                    sm.setInstanceTime(10 * 60);
                                    sm.addAttempt(entryQuest, party);
                                    party.getInstance().addProperty("Moon Bunny", true);
                                    sm.showWeatherNoticeToField("6 Primrose Seeds, stolen by the pigs, must be recovered.", WeatherEffNoticeType.RiceCakePQ);
                                    return;
                                } else {
                                    sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                                }
                            } else {
                                sm.sendSayOkay("One or more party members are below level 70 or higher than level 255.");
                            }
                        }
                    }
                    break;
                case 1:
                    int count = 5;
                    if (chr.hasQuest(entryQuest)) {
                        count = 5 - Integer.parseInt(chr.getQRValueByKey(entryQuest, "count"));
                    }
                    sm.sendSayOkay("B¢n có thº th÷ thách thêm " + count + " l®n nøa.");
                    break;
                case 2:
                    if (sm.hasItem(1003266)) {
                        if (sm.canHold(1003266)) {
                            if (sm.hasItem(GameConstants.RICE_CAKE, 20)) {
                                sm.consumeItem(GameConstants.RICE_CAKE, 20);
                                sm.giveItem(1003266);
                            } else {
                                sm.sendSayOkay("Come back when you have enough 20 Rice Cakes.");
                            }
                        } else {
                            sm.sendSayOkay("Make sure you have enough space in your EQUIP inventory.");
                        }
                    } else if (sm.hasItem(GameConstants.RICE_CAKE, 10)) {
                        if (sm.canHold(1002798)) {
                            sm.consumeItem(GameConstants.RICE_CAKE, 10);
                            sm.giveItem(1002798);
                        } else {
                            sm.sendSayOkay("Make sure you have enough space in your EQUIP inventory.");
                        }
                    } else {
                        sm.sendSayOkay("Come back when you have enough 10 Rice Cakes.");
                    }
                    break;
            }
        }
    }

    @Override
    public void exit() {
        sm.setAchieveRatio(0, false);
        sm.warpInstanceOut(chr, GameConstants.MOON_BUNNY_ENTRANCE_MAP);
    }

    @Override
    public void event() {
        if (chr.getField().getOnFirstUserEnter().equals("moonrabbit_mapEnter")) {
            startEvent = chr.getTimer().addEvent(this::initMoonBunny, 2000);
        }
    }

    public void event(int parentID) {
        if (party.isLeader(chr)) {
            if (sm.getReactorState(parentID) == 0) {
                sm.consumeItem(GameConstants.PRIMROSE_SEED);
                sm.showWeatherNoticeToField("One of the seeds has been placed.", WeatherEffNoticeType.RiceCakePQ, 3000);
                sm.increaseReactorState(parentID, 0);
                sm.increaseReactorState(GameConstants.MOON_REACTOR, 0);
                if (sm.getReactorState(GameConstants.MOON_REACTOR) == 6) {
                    sm.showWeatherNoticeToField("Moon Bunnies can knead the dough only when they're not attacked! Collect 80 Moon Bunny's Rice Cakes!", WeatherEffNoticeType.RiceCakePQ, 7000);
                    sm.setAchieveRatio(25);
                    sm.spawnMob(GameConstants.MOON_BUNNY, -190, -187, false);

                    sm.invokeAtFixedRate(8000, 6000, 16, "dropItem", GameConstants.RICE_CAKE, -190, -187, -284, -184);
                    sm.invokeAtFixedRate(8500, 6000, 16, "dropItem", GameConstants.RICE_CAKE, -190, -187, -232, -190);
                    sm.invokeAtFixedRate(9000, 6000, 16, "dropItem", GameConstants.RICE_CAKE, -190, -187, -190, -187);
                    sm.invokeAtFixedRate(9500, 6000, 16, "dropItem", GameConstants.RICE_CAKE, -190, -187, -150, -180);
                    sm.invokeAtFixedRate(10000, 6000, 16, "dropItem", GameConstants.RICE_CAKE, -190, -187, -89, -180);
                    stage = 1;
                    isAdded = false;
                }
            }
        } else {
            sm.chatScript("Only Leader of your party can do this.");
        }
    }

    @Override
    public void end(Char chr) {
        if (startEvent != null) {
            startEvent.cancel(false);
        }
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.setAchieveRatio(0);
        sm.warpInstanceOut(chr, GameConstants.MOON_BUNNY_ENTRANCE_MAP);
    }

    @Override
    public void clear(Char chr) {
    }

    @Override
    public void leftOrDisband(Char chr) {
        end(chr);
    }

    public void initMoonBunny() {
        Party party = chr.getParty();
        if (party.getInstance() == null || !party.getInstance().hasProperty("Moon Bunny")) {
            startEvent.cancel(false);
            return;
        }
        Field field = chr.getField();
        if (!isAdded) {
            switch (stage) {
                case 0:
                    for (MobGen mobGen : mobGens) {
                        if (stage1Mobs.contains(mobGen.getMob().getTemplateId())) {
                            field.addLife(mobGen);
                        }
                    }
                    isAdded = true;
                    break;
                case 1:
                    for (Mob mob : field.getMobs()) {
                        if (stage1Mobs.contains(mob.getTemplateId())) {
                            mob.remove();
                        }
                    }
                    for (MobGen mobGen : mobGens) {
                        if (stage1Mobs.contains(mobGen.getMob().getTemplateId())) {
                            field.removeLife(mobGen);
                        } else if (stage2Mobs.contains(mobGen.getMob().getTemplateId())) {
                            field.addLife(mobGen);
                        }
                    }
                    isAdded = true;
                    break;
            }
        } else if (isAdded && stage == 1) {
            if (!sm.hasMobById(GameConstants.MOON_BUNNY)) {
                end(chr);
            }
        }
    }
}
