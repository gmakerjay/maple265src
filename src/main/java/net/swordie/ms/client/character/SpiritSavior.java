package net.swordie.ms.client.character;

import net.swordie.ms.connection.packet.UserLocal;
import net.swordie.ms.enums.InvType;
import net.swordie.ms.enums.MoveAbility;
import net.swordie.ms.enums.WeatherEffNoticeType;
import net.swordie.ms.life.Reactor;
import net.swordie.ms.life.Summon;
import net.swordie.ms.life.mob.Mob;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.Position;
import net.swordie.ms.util.Util;
import net.swordie.ms.world.field.Instance;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class SpiritSavior {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final int entryQuest = 16215;
    private final int spiritCoin = 4310235;
    public static final int SPIRIT_SAVIOR_MAP = 921172300;
    private final int exitMap = 921172400;
    private final int time = 180 * 1000;
    private Map<Integer, Position> BoundRockSpirits = new HashMap<>();
    private final Position[] positions = {
            new Position(-1288, -775),
            new Position(-1981, -1014),
            new Position(-3245, -1615),
            new Position(908, -774),
            new Position(1719, -1015),
            new Position(2899, -1617),
            new Position(2887, -1375),
            new Position(-3245, -1315),
            new Position(113, -1431),
            new Position(-466, -1438),
            new Position(-2192, -536),
            new Position(1908, -533)};

    public SpiritSavior(Char chr) {
        this.chr = chr;
        this.sm = chr.getScriptManager();
    }

    public void start() {
        sm.setSpeakerID(3003381);
        final LocalDateTime now = LocalDateTime.now();
        if (chr.getFieldID() == exitMap) {
            if (!chr.hasQuest(entryQuest)) {
                chr.createQuestWithQRValue(entryQuest, "point=0;life=100;chase=0;count=0;date=" + DateTimeFormatter.ofPattern("yy/MM/dd").format(now));
                sm.warpInstanceOut(chr, 450005000);
                return;
            }
            String pointStr = chr.getQRValueByKey(entryQuest, "point");
            if (pointStr != null) {
                int point = Integer.parseInt(pointStr);
                int max = (int) (point / 1000.0D);
                sm.sendNext("Did you rescue alot of my friends?!\r\nI see you have #e#b" + point + " Rescue Points#k#n! You will going to get " + max + " Spirit Coins this time.");
                if (point >= 1000) {
                    if (sm.canHold(spiritCoin, max)) {
                        sm.giveItem(spiritCoin, max);
                        sm.warpInstanceOut(chr, 450005000);
                        return;
                    } else {
                        sm.sendSayOkay("Empty at least one slot in your ETC first.");
                        //sm.dispose();
                        return;
                    }
                }
            }
            sm.warpInstanceOut(chr, 450005000);
            return;
        }
        if (chr.getLevel() >= 225 && chr.hasQuestCompleted(34478)) {
            if (!chr.hasQuest(entryQuest)) {
                chr.createQuestWithQRValue(entryQuest, "point=0;life=100;chase=0;count=0;date=" + DateTimeFormatter.ofPattern("yy/MM/dd").format(now));
            }
            int selection = sm.sendNext("#e#b<Spirit Savior>#k#n\r\n(Yawn) Will I ever get any sleep?\r\n\r\n#b" +
                    "#L0#Attempt <Spirit Savior>.#l\r\n" +
                    "#L1#Trade in Spirit Coins.#l\r\n" +
                    "#L2#Listen to the explanation.#l#k\r\n\r\n" +
                    "#eAfter clearing 1 times, you'll have option to immediately complete.#n");
            switch (selection) {
                case 0:
                    if (chr.getParty() != null) {
                        sm.sendSayOkay("You are in a party. Please quit your party to able to go in!");
                    } else {
                        if (sm.sendAskYesNo("Are you ready to go save my friends?")) {
                            if (sm.checkAttempt(entryQuest, 3)) {
                                if (sm.getEmptyInventorySlots(InvType.ETC) >= 1) {
                                    sm.warpInstanceIn(chr, SPIRIT_SAVIOR_MAP, false);
                                    sm.setInstanceTime(3 * 60, exitMap);
                                    sm.addAttempt(entryQuest, 3);
                                    return;
                                } else {
                                    sm.sendSayOkay("Empty at least one slot in your ETC first.");
                                }
                            } else {
                                sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                            }
                        }
                    }
                    break;
                case 1:
                    int max = sm.getQuantityOfItem(spiritCoin) / 3;
                    if (max > 0) {
                        int arcanaSymbol = 1712004;
                        int count = sm.sendAskNumber("Do you want to exchange #i" + spiritCoin + "# #b#t" + spiritCoin + "##ks for #i" + arcanaSymbol + "# #r#t" + arcanaSymbol + "##k items?\r\n(#b#t" + spiritCoin + "# x3#k = #r#t" + arcanaSymbol + "# x1#k)\r\nYou can exchange up to #e#r" + max + "#k#n.", 1, 1, max);
                        if (count > 0 && count <= max) {
                            if (sm.hasItem(spiritCoin, count * 3)) {
                                if (sm.canHold(arcanaSymbol, count)) {
                                    sm.consumeItem(spiritCoin, count * 3);
                                    sm.giveSymbol(arcanaSymbol, count);
                                } else {
                                    sm.sendSayOkay("Please make more space in your EQUIP inventory.");
                                }
                            } else {
                                sm.sendSayOkay("You don't have enough Spirit Coins! Please waste my time.");
                            }
                        } else {
                            sm.sendSayOkay("You enter the wrong value. Please try again!"); // won't happen
                        }
                    } else {
                        sm.sendSayOkay("You don't have enough Spirit Coins! Please waste my time.");
                    }
                    break;
                case 2:
                    chr.write(UserLocal.openUrl("https://forums.maplestory.nexon.net/discussion/18679/spirit-savior-guide"));
                    break;
            }
        } else {
            sm.sendSayOkay("Please complete the quest #e#r[Arcana] The Harmony of the Forest#k#n and level 225+ to attempt Spirit Savior!");
        }
        //sm.dispose();
    }

    public void exit() {
        end();
    }

    public void event() {
        Instance instance = chr.getInstance();
        if (instance == null) {
            end();
            return;
        }
        if (BoundRockSpirits.isEmpty()) {
            init();
        }
        for (Map.Entry<Integer, Position> rand : getRandomList(BoundRockSpirits)) {
            sm.spawnMob(rand.getKey(), rand.getValue().getX(), rand.getValue().getY(), false);
        }
        chr.setQRValueByKey(entryQuest, "chase", "0");
        chr.setQRValueByKey(entryQuest, "life", "100");
        sm.addEvent(chr.getTimer().addEvent(() -> {
            sm.showEffect("Map/Effect.img/killing/first/start");
            sm.playSound("event/start");
        }, 1000L));
    }

    public void init() {
        // Left
        BoundRockSpirits.put(8644101, new Position(-898, -731));
        BoundRockSpirits.put(8644102, new Position(-1645, -971));
        BoundRockSpirits.put(8644103, new Position(-2993, -1571));
        BoundRockSpirits.put(8644104, new Position(-2142, -1751));
        BoundRockSpirits.put(8644105, new Position(-1315, -1991));
        BoundRockSpirits.put(8644106, new Position(-830, -2231));
        // Right
        BoundRockSpirits.put(8644107, new Position(488, -731));
        BoundRockSpirits.put(8644108, new Position(1369, -971));
        BoundRockSpirits.put(8644109, new Position(2661, -1571));
        BoundRockSpirits.put(8644110, new Position(1852, -1751));
        BoundRockSpirits.put(8644111, new Position(1096, -1991));
        BoundRockSpirits.put(8644112, new Position(563, -2231));
    }

    private List<Map.Entry<Integer, Position>> getRandomList(Map<Integer, Position> BoundRockSpirits) {
        List<Map.Entry<Integer, Position>> randomList = new ArrayList<>();
        for (int i = 0; i < 8; i++) {
            Map.Entry<Integer, Position> rand = Util.getRandomFromCollection(BoundRockSpirits.entrySet());
            if (rand == null) {
                continue;
            }
            randomList.add(rand);
            BoundRockSpirits.entrySet().removeIf(x -> x.getKey() == rand.getKey());
        }
        return randomList;
    }

    public void end() {
        sm.showEffect("Map/Effect2.img/event/gameover");
        sm.warpInstanceOut(chr, exitMap);
    }

    public void monsterkilled(Mob mob) {
        Instance instance = chr.getInstance();
        if (instance == null || chr.getFieldID() != SPIRIT_SAVIOR_MAP) {
            end();
            return;
        }
        sm.spawnReactor(3600001, mob.getPosition().getX(), mob.getPosition().getY());
        Set<Mob> mobs = new HashSet<>();
        for (Mob m : chr.getField().getMobs()) {
            if (m.getTemplateId() >= 8644101 && m.getTemplateId() <= 8644112) {
                mobs.add(m);
            }
        }
        if (BoundRockSpirits.isEmpty()) {
            init();
        }
        Map.Entry<Integer, Position> rand = Util.getRandomFromCollection(BoundRockSpirits.entrySet());
        if (rand != null) {
            sm.spawnMob(rand.getKey(), rand.getValue().getX(), rand.getValue().getY(), false);
        } else {
            sm.spawnMob(rand.getKey(), mob.getPosition().getX(), mob.getPosition().getY(), false);
        }
    }

    public void checkPoint() {
        Instance instance = chr.getInstance();
        if (instance == null || chr.getFieldID() != SPIRIT_SAVIOR_MAP) {
            end();
            return;
        }
        int check = -1;
        int count = 0;
        for (Summon summon : chr.getField().getSummons()) {
            if (summon.getSkillID() == 80002310 && summon.getOwnerId() == chr.getId()) {
                chr.getField().removeLife(summon.getObjectId(), false);
                check++;
                count++;
            }
        }
        if (count > 0) {
            sm.showEffect("Map/Effect3.img/savingSpirit/" + count);
            sm.playSound("Sound/MiniGame.img/Result_Yut");
            for (Mob m : chr.getField().getMobs()) {
                if (m.getTemplateId() >= 8644301 && m.getTemplateId() <= 8644305) {
                    chr.getField().removeMob(m.getObjectId());
                }
            }
            int point = Integer.parseInt(chr.getQRValueByKey(entryQuest, "point"));
            switch (check) {
                case 0 -> chr.setQRValueByKey(entryQuest, "point", "" + (point + 200));
                case 1 -> chr.setQRValueByKey(entryQuest, "point", "" + (point + 500));
                case 2 -> chr.setQRValueByKey(entryQuest, "point", "" + (point + 1000));
                case 3 -> chr.setQRValueByKey(entryQuest, "point", "" + (point + 1500));
                case 4 -> chr.setQRValueByKey(entryQuest, "point", "" + (point + 2500));
            }
        }
        //sm.dispose();
    }

    public void reactorHandle(Reactor reactor) {
        Instance instance = chr.getInstance();
        if (instance == null || chr.getFieldID() != SPIRIT_SAVIOR_MAP) {
            end();
            return;
        }
        if (instance.getProperty("ObjectId4") != null && instance.getProperty("ObjectId4") != "") {
            sm.removeReactorByObjectID(reactor.getObjectId());
            return;
        }
        var check = 0;
        for (Summon summon : chr.getField().getSummons()) {
            if (summon.getSkillID() == 80002310 && summon.getOwnerId() == chr.getId()) {
                check++;
            }
        }
        spawnSpirit();
        chr.setQRValueByKey(entryQuest, "chase", "" + (1 + Util.getRandom(0, 4)));
        switch (check) {
            case 0:
                sm.showWeatherNotice("It seems the Toxic Spirit has taken notice! Escape!", WeatherEffNoticeType.Arcana);
                break;
            case 1:
            case 2:
            case 3:
                sm.showWeatherNotice("The Toxic Spirit is getting stronger by the minute..!", WeatherEffNoticeType.Arcana);
                break;
            case 4:
                sm.showWeatherNotice("The Toxic Spirit has achieved and its strongest form! Becareful!", WeatherEffNoticeType.Arcana);
                break;
        }
        Mob mob = (Mob) chr.getField().getLifeByTemplateId(8644301 + (check == 0 ? 0 : (check - 1)));
        int newMob = 8644301 + check;
        if (check != 0 && mob != null) {
            Position pos = mob.getPosition();
            sm.spawnMob(newMob, pos.getX(), pos.getY(), false);
            chr.getField().removeMob(mob.getObjectId());
        } else if (check == 0) {
            sm.spawnMob(newMob, -194, -1391, false);
        }
        Position randPosition = Util.getRandomFromCollection(positions);
        sm.spawnMob(8644201, randPosition.getX(), randPosition.getY(), false);
        sm.removeReactorByObjectID(reactor.getObjectId());
    }

    private Summon spawnSpirit() {
        Summon summon = Summon.getSummonByAndSetStatWithTime(chr, 80002310, (byte) 1, System.currentTimeMillis(), chr.getInstance().getRemainingTime());
        summon.setMoveAbility(MoveAbility.WalkSmart);
        chr.getField().spawnAddSummon(summon);
        return summon;
    }
}
