package net.swordie.ms.world.partyquest;

import net.swordie.ms.client.character.Char;
import net.swordie.ms.client.social.Party.Party;
import net.swordie.ms.client.social.Party.PartyMember;
import net.swordie.ms.connection.packet.HungryMutoPacket;
import net.swordie.ms.connection.packet.WvsContext;
import net.swordie.ms.constants.GameConstants;
import net.swordie.ms.handlers.GlobalTimerManager;
import net.swordie.ms.scripts.ScriptManagerImpl;
import net.swordie.ms.util.DataPrinter;
import net.swordie.ms.util.container.Tuple;
import net.swordie.ms.world.field.Field;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import static net.swordie.ms.world.boss.BossHelper.setting;
import static net.swordie.ms.world.boss.BossHelper.xy;

public class HungryMuto implements PartyQuest {

    private final ScriptManagerImpl sm;
    private final Char chr;
    private final Party party;
    private final int entryQuest = 34222;
    public final int[][] recipes = {
            {4034959, 0, 1, 130000, 45000},
            {4034960, 1, 1, 130000, 45000},
            {4034961, 2, 1, 130000, 45000},
            {4034962, 3, 1, 130000, 45000},
            {4034963, 4, 1, 130000, 45000},
            {4034964, 5, 1, 130000, 45000},
            {4034965, 6, 2, 130000, 45000},
            {4034966, 7, 1, 130000, 45000},
            {4034967, 8, 1, 130000, 45000},
            {4034968, 9, 1, 130000, 45000},
            {4034969, 10, 1, 130000, 45000},
            {4034970, 11, 1, 130000, 45000},
            {4034971, 12, 1, 130000, 45000},
            {4034972, 13, 1, 130000, 45000},
            {4034973, 14, 1, 130000, 45000},
            {4034974, 15, 1, 130000, 45000}};
    public final Integer[][][] recipeItems = {
            {{2435856, 5}, {2435860, 10}},
            {{2435858, 5}, {2435862, 10}},
            {{2435856, 5}, {2435860, 5}, {2435864, 10}},
            {{2435858, 5}, {2435862, 5}, {2435866, 10}},
            {{2435860, 5}, {2435864, 5}, {2435868, 10}},
            {{2435864, 5}, {2435866, 5}, {2435870, 10}},
            {{2435872, 1}, {2435858, 5}, {2435862, 5}, {2435868, 10}},
            {{2435872, 5}, {2435860, 5}, {2435866, 5}, {2435870, 10}},
            {{2435857, 5}, {2435861, 10}},
            {{2435859, 5}, {2435863, 10}},
            {{2435857, 5}, {2435861, 5}, {2435865, 10}},
            {{2435859, 5}, {2435863, 5}, {2435867, 10}},
            {{2435861, 5}, {2435865, 5}, {2435869, 10}},
            {{2435865, 5}, {2435867, 5}, {2435871, 10}},
            {{2435872, 1}, {2435859, 5}, {2435863, 5}, {2435869, 10}},
            {{2435872, 5}, {2435861, 5}, {2435867, 5}, {2435871, 10}}};

    private boolean enhance = false;
    private int score = 0;
    private int mutoRecipe = 0;
    private boolean bonus = false;
    private boolean complete = false;
    private long finishTime = 0L;
    private long finishBonusTime = 0L;

    public HungryMuto(Char chr) {
        this.sm = chr.getScriptManager();
        this.chr = chr;
        this.party = chr.getParty();
    }

    private boolean isPartyEligible(short lowLevel, short highLevel, Party party) {
        for (PartyMember member : party.getMembers()) {
            if (member.getLevel() < lowLevel || member.getLevel() > highLevel || !member.getChr().hasQuestCompleted(34218)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public void start() {
        if (sm.getFieldID() == GameConstants.HUNGRY_MUTO_EXIT_MAP) {
            if (chr.getQRValueByKey(entryQuest, "clear") != null && chr.getQRValueByKey(entryQuest, "clear").equals("1")) {
                int sel = sm.sendNext("#e#b<Hungry Muto>#k#n\r\n\r\n#b#L0#Claim <Hungry Muto> reward.#l#k");
                boolean canEnd = true;
                for (Char member : party.getOnlineChars()) {
                    if (member.getScriptManager().getEmptyInventorySlots(1) < 5) {
                        canEnd = false;
                        break;
                    }
                }
                if (sel == 0 && canEnd) {
                    reward(party);
                } else {
                    sm.sendSayOkay("Make sure you party have enough at least 5 EQUIP slots.");
                }
            } else if (sm.sendAskYesNo("Do you want to leave?")) {
                exit();
            }
        } else {
            int selection = sm.sendNext("#e#b<Hungry Muto>#k#n\r\nWill you help #bMuto#k to defeat #rGulla#k?"
                    + "\r\n"
                    + "#r*You will be unable to exit mid-content once you've been playing for 10 minutes.#k"
                    + "\r\n\r\n"
                    + "#b"
                    + "#L0#Enter <Hungry Muto>.#l"
                    + "\r\n"
                    + "#L1#Listen to Simia's explanation.#l"
                    + "\r\n"
                    + "#L2#Check remaining attemp available today.#l"
                    + "#k"
                    + "\r\n\r\n"
                    + "#e* After clearing 1 times, you'll have the option to immediately complete.#n");
            switch (selection) {
                case 0:
                    int response = sm.sendNext("#e#bHungry Muto#k#n\r\n"
                            + "\r\n"
                            + "Which #bdifficulty#k would you like to attempt?"
                            + "\r\n"
                            + "#b"
                            + "#L0#Normal#l"
                            + "\r\n"
                            + "#L1#Hard#l"
                            + "#k");
                    if (party == null) {
                        sm.sendSayOkay("You have to be in a #bparty#k to enter the Hungry Muto Party Quest. Now go find some friends!");
                    } else if (!party.isLeader(chr)) {
                        sm.sendSayOkay("If you want to try the quest, please tell the #bleader of your party#k to talk to me.");
                    } else if (sm.checkPartyForPQ() && (response == 1 || response == 0)) {
                        if (isPartyEligible((short) 210, (short) 275, party)) {
                            if (sm.checkAttempt(entryQuest, party, 3)) {
                                try {
                                    String diff = response == 1 ? "hard" : "normal";
                                    for (Char player : party.getPartyMembersInSameFieldWithChr(chr)) {
                                        final LocalDateTime now = LocalDateTime.now();
                                        if (player.hasQuest(entryQuest) || player.hasQuestCompleted(entryQuest)) {
                                            int count = Integer.parseInt(player.getQRValueByKey(entryQuest, "count"));
                                            player.setQRValueByKey(entryQuest, "diff", diff);
                                            player.setQRValueByKey(entryQuest, "count", count == 3 ? "1" : String.valueOf(count + 1));
                                            player.setQRValueByKey(entryQuest, "inGame", "1");
                                            player.setQRValueByKey(entryQuest, "date", DateTimeFormatter.ofPattern("yy/MM/dd").format(now));
                                            player.setQRValueByKey(entryQuest, "score", "0");
                                            player.setQRValueByKey(entryQuest, "ptime", "0");
                                            player.setQRValueByKey(entryQuest, "clear", "0");
                                        } else {
                                            player.createQuestWithQRValue(entryQuest, String.format("diff=%s;count=%d;ingame=%d;date=%s;score=%d;ptime=%d;clear=%d", diff, 1, 1, DateTimeFormatter.ofPattern("yy/MM/dd").format(now), 0, 0, 0));
                                        }
                                    }
                                } catch (Exception e) {
                                    sm.sendSayOkay("Unable to start the Party Quest.");
                                } finally {
                                    party.setPartyQuest(this);
                                    sm.warpInstanceIn(chr, response == 1 ? GameConstants.HUNGRY_MUTO_HARD_STAGE : GameConstants.HUNGRY_MUTO_NORMAL_STAGE, true);
                                    sm.setInstanceTime(10 * 60, false);
                                }
                            } else {
                                sm.sendSayOkay("One or more party members reached daily maximum attempt.");
                            }
                        } else {
                            sm.sendSayOkay("One or more party members are below level 210 or have not completed the [Quest] Goodbye, Chu Chu Island.");
                        }
                    }
                    break;
                case 1:
                    sm.sendNext("Traveler! #rGulla#k started attacking! #bMuto#k can't protect us from #rGulla#k on an empty stomach! Help me make a delicious meal for him!"
                            + "\r\n\r\n"
                            + "#e<Hungry Muto>#n"
                            + "\r\n\r\n"
                            + "#e1. Party Size:#n 1-4 players"
                            + "\r\n"
                            + "#e2. Time limit:#n 10 min"
                            + "\r\n"
                            + "#e3. Daily Clears Possible:#n 3"
                            + "\r\n"
                            + "#e4. Reward:#n #v1712002# #e#b#t1712002##k#n x EXP"
                            + "\r\n\r\n\r\n"
                            + "#L0#Listen to a detailed explanation.#l");
                    int selection2 = sm.sendNext("How may I help you?\r\n\r\n#b"
                            + "#L0#<Hunting and Adding Ingredients>#l"
                            + "\r\n"
                            + "#L1#<Cooking Time the Bonus Gauge>#l"
                            + "\r\n"
                            + "#L2#Difficulty#l"
                            + "\r\n"
                            + "#L3#Rewards#l"
                            + "\r\n"
                            + "#L4#That's all I need to know.#l"
                            + "#k");
                    switch (selection2) {
                        case 0:
                            sm.sendNext("#e<Hunting and Adding Ingredients>#n"
                                    + "\r\n\r\n"
                                    + "Defending Chu Chu Island is #bhungry work#k. The only way to defeat #rGulla#k is by keeping Muto fed. That means #bquickly throwing together whatever Muto wants to eat!#k"
                                    + "\r\n\r\n"
                                    + "#rHunt monsters#k all over to collect the right ingredients. Then, bring them to the #bpot where me and the Pi siblings are waiting#k, and #e#rjump#k#n to #badd the ingredients#k.");
                            break;
                        case 1:
                            sm.sendNext("#e<Cooking Time the Bonus Gauge>#n"
                                    + "\r\n\r\n"
                                    + "Defending Chu Chu Island is #bhungry work#k. The only way to defeat #rGulla#k is by keeping Muto fed. That means #bquickly throwing together whatever Muto wants to eat!#k"
                                    + "\r\n\r\n"
                                    + "#rHunt monsters#k all over to collect the right ingredients. Then, bring them to the #bpot where me and the Pi siblings are waiting#k, and #e#rjump#k#n to #badd the ingredients#k.");
                            break;
                        case 2:
                            sm.sendNext("#e<Difficulty>#n"
                                    + "\r\n\r\n"
                                    + "There are two difficulties: #b<Normal>#k and #b<Hard>#k"
                                    + "\r\n\r\n"
                                    + "Hard mode feautures #rmore powerful monsters#k and #rreduced cooking time.#k"
                                    + "\r\n\r\n"
                                    + "#rRemember that#k #bhow quickly Muto is pushed back#k and the #bdistance Gulla pushed#k when a dish finishes vary with #bparty size#k!");
                            break;
                        case 3:
                            sm.sendNext("#e<Reward>#n"
                                    + "\r\n\r\n"
                                    + "#e#b<Normal>#k#n"
                                    + "\r\n"
                                    + "#eS Rank#n: Clear within 5 min"
                                    + " #eArcane Symbols#n: 3"
                                    + "\r\n\r\n"
                                    + "#eA Rank#n: Clear within 8 min"
                                    + " #eArcane Symbols#n: 2"
                                    + "\r\n\r\n"
                                    + "#eB Rank#n: Clear within 10 min"
                                    + " #eArcane Symbols#n: 1"
                                    + "\r\n\r\n"
                                    + "#b+ EXP based on rank#k\r\n"
                                    + "#e<Reward>#n"
                                    + "\r\n\r\n"
                                    + "#e#b<Hard>#k#n"
                                    + "\r\n"
                                    + "#eS Rank#n: Clear within 5 min"
                                    + " #eArcane Symbols#n: 5"
                                    + "\r\n\r\n"
                                    + "#eA Rank#n: Clear within 8 min"
                                    + " #eArcane Symbols#n: 4"
                                    + "\r\n\r\n"
                                    + "#eB Rank#n: Clear within 10 min"
                                    + " #eArcane Symbols#n: 3"
                                    + "\r\n\r\n"
                                    + "#b+ EXP based on rank#k");
                            break;
                    }
                    break;
                case 2:
                    int count = 0;
                    if (chr.hasQuest(entryQuest)) {
                        count = Integer.parseInt(chr.getQRValueByKey(entryQuest, "count"));
                    }
                    sm.sendNext("Your attempt for today is " + count + ".");
                    break;
                default:
                    break;
            }
        }
    }

    public void reward(Party party) {
        for (Char chr : party.getOnlineChars()) {
            ScriptManagerImpl sm = chr.getScriptManager();
            String diff = chr.getQRValueByKey(entryQuest, "diff");
            int finishTime = Integer.parseInt(chr.getQRValueByKey(entryQuest, "ptime"));
            if (diff.equals("normal")) {
                if (finishTime >= 300) {
                    sm.giveSymbol(1712002, 3);
                    sm.showClearStageExpWindow(242714400);
                } else if (finishTime >= 120) {
                    sm.giveSymbol(1712002, 2);
                    sm.showClearStageExpWindow(222488200);
                } else {
                    sm.giveSymbol(1712002, 1);
                    sm.showClearStageExpWindow(202262000);
                }
            } else if (diff.equals("hard")) {
                if (finishTime >= 300) {
                    sm.giveSymbol(1712002, 5);
                    sm.showClearStageExpWindow(323619200);
                } else if (finishTime >= 120) {
                    sm.giveSymbol(1712002, 4);
                    sm.showClearStageExpWindow(283166800);
                } else {
                    sm.giveSymbol(1712002, 3);
                    sm.showClearStageExpWindow(242714400);
                }
            }
            chr.setQRValueByKey(entryQuest, "clear", "0");
        }
        exit();
        //sm.addEvent(EventManager.addEvent(this::exit, 2000));
    }

    @Override
    public void exit() {
        chr.setRecipe(new Tuple<>(0, 0));
        sm.warpInstanceOut(chr, GameConstants.HUNGRY_MUTO_ENTRANCE_MAP);
    }

    @Override
    public void event() {
        if (chr == null || chr.getParty() == null) {
            return;
        }
        if (party.isLeader(chr)) {
            setEnhance(false);
            party.getInstance().setMutoScore(500);
            setBonus(true);
            chr.getTimer().addEvent(this::spawnOrigin, 1, TimeUnit.SECONDS);
            sm.showEffectToField("Map/Effect3.img/hungryMutoMsg/msg1");
        }
        initRecipe();
        //Global Effect
        effect(party);
    }

    @Override
    public void end(Char chr) {
        if (chr.getBonusTimer() != null) {
            chr.getBonusTimer().cancel(false);
        }
        if (chr.getScoreTimer() != null) {
            chr.getScoreTimer().cancel(false);
        }
        for (Char player : party.getOnlineChars()) {
            player.setRecipe(new Tuple<>(0, 0));
        }
        ScriptManagerImpl sm = chr.getScriptManager();
        sm.showEffectToField("Map/Effect3.img/hungryMuto/TimeOver");
        sm.warpInstanceOut(chr, GameConstants.HUNGRY_MUTO_EXIT_MAP);
    }

    @Override
    public void clear(Char chr) {
        if (chr.getBonusTimer() != null) {
            chr.getBonusTimer().cancel(false);
        }
        if (chr.getScoreTimer() != null) {
            chr.getScoreTimer().cancel(false);
        }
        final int finishTime = party.getInstance().getRemainingTime();
        for (Char player : party.getOnlineChars()) {
            ScriptManagerImpl sm = player.getScriptManager();
            player.setRecipe(new Tuple<>(0, 0));
            player.write(HungryMutoPacket.finish());
            chr.setQRValueByKey(entryQuest, "diff", chr.getQRValueByKey(entryQuest, "diff"));
            chr.setQRValueByKey(entryQuest, "count", chr.getQRValueByKey(entryQuest, "count"));
            chr.setQRValueByKey(entryQuest, "inGame", chr.getQRValueByKey(entryQuest, "inGame"));
            chr.setQRValueByKey(entryQuest, "date", chr.getQRValueByKey(entryQuest, "date"));
            chr.setQRValueByKey(entryQuest, "score", "" + party.getInstance().getMutoScore());
            chr.setQRValueByKey(entryQuest, "ptime", "" + finishTime);
            chr.setQRValueByKey(entryQuest, "clear", "1");
        }
        if (finishTime >= 300) {
            chr.getTimer().addEvent(() -> sm.showEffectToField("Map/Effect.img/Visitor/RankS"), 4000);
        } else if (finishTime >= 120) {
            chr.getTimer().addEvent(() -> sm.showEffectToField("Map/Effect.img/Visitor/RankA"), 4000);
        } else {
            chr.getTimer().addEvent(() -> sm.showEffectToField("Map/Effect.img/Visitor/RankB"), 4000);
        }
        chr.getTimer().addEvent(() -> sm.showEffectToField("Map/Effect3.img/hungryMuto/Clear"), 1000);
        sm.warpInstanceOut(chr, GameConstants.HUNGRY_MUTO_EXIT_MAP);
    }

    @Override
    public void leftOrDisband(Char chr) {
        if (chr.getBonusTimer() != null) {
            chr.getBonusTimer().cancel(false);
        }
        if (chr.getScoreTimer() != null) {
            chr.getScoreTimer().cancel(false);
        }
        if (chr.getParty() != null) {
            for (Char player : chr.getParty().getOnlineChars()) {
                player.setRecipe(new Tuple<>(0, 0));
            }
        } else {
            chr.setRecipe(new Tuple<>(0, 0));
        }
        chr.getTimer().addEvent(() -> sm.showEffectToField("Map/Effect3.img/hungryMuto/failed"), 1000);
        sm.warpInstanceOut(chr, GameConstants.HUNGRY_MUTO_EXIT_MAP);
    }

    public void setTimer() {
        Field field = chr.getField();
        //Chỉ chạy ở leader.
        if (!chr.getParty().isLeader(chr)) {
            return;
        }
        setBonus(true);
        setFinishTime((System.currentTimeMillis() + recipes[getMutoRecipe()][3]));
        setFinishBonusTime((System.currentTimeMillis() + recipes[getMutoRecipe()][4]));
        if (chr.getBonusTimer() != null) {
            chr.getBonusTimer().cancel(false);
        }
        ScheduledFuture<?> sf = chr.getTimer().addFixedRateEvent(() -> {
            try {
                if (field.getChars().isEmpty()) {
                    chr.getBonusTimer().cancel(false);
                } else if (System.currentTimeMillis() > getFinishTime()) {
                    chr.getBonusTimer().cancel(false);
                    chr.getTimer().addEvent(this::recipe, 500);
                } else {
                    if (party.getInstance().getMutoScore() <= 0) {
                        end(chr);
                        return;
                    }
                    if (System.currentTimeMillis() > getFinishBonusTime()) {
                        setBonus(false);
                    }
                    field.broadcast(WvsContext.fieldValue("time", "" + (getFinishTime() - System.currentTimeMillis())));
                }
            } catch (Exception e) {
                DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                chr.getBonusTimer().cancel(false);
            }
        }, 0, 5000, false);
        chr.setBonusTimer(sf);
        GlobalTimerManager.addCharTimer(chr.getId(), sf);
        int t;
        if (sm.getFieldID() == GameConstants.HUNGRY_MUTO_NORMAL_STAGE) {
            t = 80000;
        } else if (sm.getFieldID() == GameConstants.HUNGRY_MUTO_HARD_STAGE) {
            t = 60000;
        } else {
            end(chr);
            return;
        }
        if (chr.getScoreTimer() != null) {
            chr.getScoreTimer().cancel(false);
        }
        ScheduledFuture<?> sf2 = chr.getTimer().addFixedRateEvent(() -> {
            try {
                if (party.getInstance() == null) {
                    chr.getScoreTimer().cancel(false);
                    return;
                }
                party.getInstance().setMutoScore(party.getInstance().getMutoScore() - 50);
                if (field.getChars().size() == 0) {
                    chr.getScoreTimer().cancel(false);
                } else if (party.getInstance().getMutoScore() <= 0) {
                    chr.getScoreTimer().cancel(false);
                    end(chr);
                } else {
                    field.broadcast(WvsContext.fieldValue("score", "" + party.getInstance().getMutoScore()));
                }
            } catch (Exception e) {
                DataPrinter.send(DataPrinter.EXCEPTION_CAUGHT, e);
                chr.getScoreTimer().cancel(false);
            }
        }, 0, t, false);
        chr.setScoreTimer(sf2);
        GlobalTimerManager.addCharTimer(chr.getId(), sf2);
    }

    public void effect(Party party) {
        chr.write(HungryMutoPacket.setTime(10 * 60 * 1000));
        chr.write(WvsContext.sessionValue("rType", "0"));
        chr.write(WvsContext.sessionValue("rCount", "0"));
        chr.write(WvsContext.fieldValue("phase", "1"));
        if (party.isLeader(chr)) {
            chr.setRecipe(new Tuple<>(0, 0));
        }
    }

    //Dùng cho setup một lần trước khi vào map.
    //Todo: Recode lại toàn bộ event for clean code.
    public void initRecipe() {
        if (party.isLeader(chr)) {
            Field field = chr.getField();
            int mutoRecipe = (int) Math.floor(Math.random() * 7);
            if (isEnhance() && party.getInstance().getMutoScore() <= 350) {
                field.killMobs();
                setEnhance(false);
                spawnOrigin();
                field.broadcast(WvsContext.fieldValue("phase", "1"));
            } else if (!isEnhance() && party.getInstance().getMutoScore() >= 700) {
                field.killMobs();
                setEnhance(true);
                spawnOrigin();
                field.broadcast(WvsContext.fieldValue("phase", "2"));
                sm.showEffectToField("Map/Effect3.img/hungryMuto/TimeOver");
            }
            if (isEnhance()) {
                mutoRecipe += 8;
            }
            if (getMutoRecipe() > 0) {
                sm.showEffectToField("Map/Effect3.img/hungryMuto/failed");
                sm.showEffectToField("Map/Effect3.img/hungryMutoMsg/msg6");
            }
            if (isComplete()) {
                party.getInstance().setMutoScore(party.getInstance().getMutoScore() + 200);
                sm.showEffectToField("Map/Effect3.img/hungryMutoMsg/msg5");
                if (isBonus()) {
                    party.getInstance().setMutoScore(party.getInstance().getMutoScore() + 100);
                    sm.showEffectToField("Map/Effect3.img/hungryMuto/perfect");
                } else {
                    sm.showEffectToField("Map/Effect3.img/hungryMuto/good");
                }
                setComplete(false);
            }
            if (party.getInstance().getMutoScore() >= 1000) {
                clear(chr);
                return;
            }
            int type = recipes[mutoRecipe][1];
            setMutoRecipe(mutoRecipe);
            party.getInstance().setMutoRecipe(mutoRecipe);
            field.broadcast(WvsContext.fieldValue("foodType", "" + recipes[mutoRecipe][1]));
            Integer[][] rep = recipeItems[type];
            List<HungryMutoRecipes> hungryMutoRecipesList = new ArrayList<>();
            for (int i = 0; i < rep.length; ++i) {
                HungryMutoRecipes hungryMutoRecipes = new HungryMutoRecipes(i, rep[i][0], rep[i][1], 0);
                if (isEnhance()) {
                    if (Math.floor(Math.random() * 3) == 1) { // 33%
                        hungryMutoRecipes.setRecipeHidden(true);
                    }
                }
                hungryMutoRecipesList.add(hungryMutoRecipes);
            }
            party.getInstance().setMutoRecipes(hungryMutoRecipesList);
            setTimer();
        }
        sendRecipesUI();
    }

    public void recipe() {
        Field field = chr.getField();
        int mutoRecipe = (int) Math.floor(Math.random() * 7);
        if (isEnhance() && party.getInstance().getMutoScore() <= 350) {
            field.killMobs();
            setEnhance(false);
            spawnOrigin();
            field.broadcast(WvsContext.fieldValue("phase", "1"));
        } else if (!isEnhance() && party.getInstance().getMutoScore() >= 700) {
            field.killMobs();
            setEnhance(true);
            spawnOrigin();
            field.broadcast(WvsContext.fieldValue("phase", "2"));
            sm.showEffectToField("Map/Effect3.img/hungryMuto/TimeOver");
        }
        if (isEnhance()) {
            mutoRecipe += 8;
        }
        if (getMutoRecipe() > 0) {
            sm.showEffectToField("Map/Effect3.img/hungryMuto/failed");
            sm.showEffectToField("Map/Effect3.img/hungryMutoMsg/msg6");
        }
        if (isComplete()) {
            party.getInstance().setMutoScore(party.getInstance().getMutoScore() + 200);
            sm.showEffectToField("Map/Effect3.img/hungryMutoMsg/msg5");
            if (isBonus()) {
                party.getInstance().setMutoScore(party.getInstance().getMutoScore() + 100);
                sm.showEffectToField("Map/Effect3.img/hungryMuto/perfect");
            } else {
                sm.showEffectToField("Map/Effect3.img/hungryMuto/good");
            }
            setComplete(false);
        }
        if (party.getInstance().getMutoScore() >= 1000) {
            clear(chr);
            return;
        }
        int type = recipes[mutoRecipe][1];
        setMutoRecipe(mutoRecipe);
        party.getInstance().setMutoRecipe(mutoRecipe);
        field.broadcast(WvsContext.fieldValue("foodType", "" + recipes[mutoRecipe][1]));
        Integer[][] rep = recipeItems[type];
        List<HungryMutoRecipes> hungryMutoRecipesList = new ArrayList<>();
        for (int i = 0; i < rep.length; ++i) {
            HungryMutoRecipes hungryMutoRecipes = new HungryMutoRecipes(i, rep[i][0], rep[i][1], 0);
            if (isEnhance()) {
                if (Math.floor(Math.random() * 3) == 1) { // 33%
                    hungryMutoRecipes.setRecipeHidden(true);
                }
            }
            hungryMutoRecipesList.add(hungryMutoRecipes);
        }
        party.getInstance().setMutoRecipes(hungryMutoRecipesList);
        setTimer();
        sendRecipesUI();
        party.getInstance().setCreateNewRecipe(false);
    }

    public void sendRecipesUI() {
        chr.getField().broadcast(HungryMutoPacket.setNewRecipe(recipes[party.getInstance().getMutoRecipe()], party.getInstance().getMutoRecipes()));
    }

    public void spawnOrigin() {
        Field field = chr.getField();
        int[] mobid;
        if (field.getId() == GameConstants.HUNGRY_MUTO_NORMAL_STAGE) {
            mobid = setting[0];
        } else {
            mobid = setting[1];
        }
        if (isEnhance()) {
            for (int i = 0; i < xy.length; i++) {
                field.spawnMob(mobid[(i / 5) + 8], xy[i][0], xy[i][1], true, 0);
            }
            int rand = (int) Math.floor(Math.random() * xy.length);
            field.spawnMob(mobid[mobid.length - 1], xy[rand][0], xy[rand][1], false, 0);
        } else {
            for (int i = 0; i < xy.length; i++) {
                field.spawnMob(mobid[i / 5], xy[i][0], xy[i][1], true, 0);
            }
            int rand = (int) Math.floor(Math.random() * xy.length);
            field.spawnMob(mobid[mobid.length - 1], xy[rand][0], xy[rand][1], false, 0);
        }
    }

    public void check(Char chr) {
        Party party = chr.getParty();
        if (party == null || party.getInstance() == null) {
            chr.chatMessage("Có g¾ «ó không Ön? Vui lÆng th÷ l¢i.");
            chr.dispose();
            return;
        }
        int[] mutoRecipe = recipes[party.getInstance().getMutoRecipe()];
        boolean right = false; //Sử dụng cho khi một nguyên liệu đủ
        for (HungryMutoRecipes hungryMutoRecipe : party.getInstance().getMutoRecipes()) {
            if (hungryMutoRecipe.getRecipeItem() == chr.getRecipe().getLeft()) {
                right = true;
                hungryMutoRecipe.setRecipeCount(Math.min(hungryMutoRecipe.getRecipeReq(), hungryMutoRecipe.getRecipeCount() + chr.getRecipe().getRight()));
                break;
            }
        }
        boolean isInit = party.getInstance().getMutoRecipes().size() > 0;
        if (isInit) {
            chr.write(HungryMutoPacket.addItem(chr));
            chr.getField().broadcast(HungryMutoPacket.setRecipe(mutoRecipe, party.getInstance().getMutoRecipes(), chr));
            boolean finish = party.getInstance().getMutoRecipes().size() > 0;
            for (HungryMutoRecipes mhr : party.getInstance().getMutoRecipes()) {
                if (mhr.getRecipeCount() < mhr.getRecipeReq()) {
                    finish = false;
                    break;
                }
            }
            if (finish) {
                if (!party.getInstance().isCreateNewRecipe()) {
                    party.getInstance().setCreateNewRecipe(true);
                    setComplete(true);
                    chr.getTimer().addEvent(this::recipe, 500);
                    chr.setRecipe(new Tuple<>(0, 0));
                    chr.getField().broadcast(HungryMutoPacket.addItem(chr));
                    sm.showEffectToField("Map/Effect3.img/hungryMutoMsg/msg4");
                }
            } else {
                if (right) {
                    chr.setRecipe(new Tuple<>(0, 0));
                    chr.getField().broadcast(HungryMutoPacket.addItem(chr));
                    sm.showEffectToField("Map/Effect3.img/hungryMutoMsg/msg4");
                }
            }
        }
        chr.dispose();
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public boolean isEnhance() {
        return enhance;
    }

    public void setEnhance(boolean enhance) {
        this.enhance = enhance;
    }

    public boolean isBonus() {
        return bonus;
    }

    public void setBonus(boolean bonus) {
        this.bonus = bonus;
    }

    public int getMutoRecipe() {
        return mutoRecipe;
    }

    public void setMutoRecipe(int mutoRecipe) {
        this.mutoRecipe = mutoRecipe;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }

    public long getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(long finishTime) {
        this.finishTime = finishTime;
    }

    public long getFinishBonusTime() {
        return finishBonusTime;
    }

    public void setFinishBonusTime(long finishBonusTime) {
        this.finishBonusTime = finishBonusTime;
    }
}
