/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
let players, maps, startmap, exitmap;
let combination = 0;

function init(attachment) {
    [players, startmap, exitmap] = attachment;
    for (let i in startmap) {
        maps = event.initMap(startmap[i]);
        event.setVariable("maps_" + i, event.getMap(startmap[i]));
    }
    event.setVariable("stat", 0);
    event.setVariable("stage", 0);
    event.startTimer("kick", 2.5 * 60 * 1000);
    players.setEvent(event);
    players.changeMap(event.getVariable("maps_0"), 0);
    players.setReviveCount(5);
    players.addPopupSay(2012041, 3000, "因祭壇不祥之氣\r\n#r所有Buff將被移除。", "", false);
    players.addPopupSay(2012041, 2000, "為了與#r威廉古堡的惡魔#k的決戰整頓整頓吧!", "", false);
    players.cancelAllBuffStat()
}

function playerDisconnected(stage) {
    stage.setEvent(null);
    event.destroyEvent();
}

function playerChangedMap(stage, destination) {
    switch (destination.getId()) {
        case startmap[0]:
            stage.showTimer(2.5 * 60);
            break;
        case startmap[1]:
            event.stopTimer("kick");
            event.startTimer("start", 3000);
            break;
        default:
            stage.setEvent(null);
            event.destroyEvent();
            break;
    }
}

function timerExpired(key) {
    switch (key) {
        case "kick":
            kick();
            break;
        case "start":
            let stat = parseInt(event.getVariable("stat"));
            let map = event.getVariable("maps_1");
            switch (stat) {
                case 0:
                    map.showScreenAutoLetterBox("UI/MultiSoccer_UI.img/Effect/countdown");
                    break;
                case 1:
                    map.showScreenAutoLetterBox("UI/MultiSoccer_UI.img/Effect/start");
                    event.startTimer("monster", 1000);
                    event.startTimer("kick", 2 * 60 * 1000);
                    players.showTimer(2 * 60 * 1000);
                    break;
            }
            if (stat < 1) {
                stat += 1;
                event.setVariable("stat", String(stat));
                event.startTimer("start", 2700);
            }
            break;

        case "monster":
            map = event.getVariable("maps_1");
            var mobs = map.makeMob(9500800);
            mobs.changeHp(100 * 1E10);
            map.spawnMob(mobs, 160, 95);
            break;


    }
}

function mobHit(stage, mob, damage) {
    combination += damage;
    txt = "#rSTAGE :#b " + event.getVariable("stage") + "\r\n\r\n";
    txt += "#rSCORE :#b " + parseInt(combination / 1E10) + "\r\n";
    //stage.showBalloonMsg(txt, 200, 3000);
}

function mobDied(mob) {
    let stage = parseInt(event.getVariable("stage"));
    let map = event.getVariable("maps_1");
    stage += 1;
    event.setVariable("stage", String(stage));

    if (stage <= 5) {
        mobs = map.makeMob(9500800 + stage);
        mobs.setForcedMobStat(players.getLevel());
        mobs.changeHp(100 * 1E10 * stage);
        map.spawnMob(mobs, 160, 95);
        players.addPopupSay(2012041, 1500, "STAGE : " + stage + "\r\n亞爾卡努斯的力量越來越強大！", "", false);
    } else {
        mobs = map.makeMob(9500805);
        mobs.setForcedMobStat(players.getLevel());
        mobs.changeHp(100 * 1E12 * stage);
        map.spawnMob(mobs, 160, 95);
    }
}

function kick() {
    players.setEvent(null);
    players.changeMap(exitmap, 0);
    event.destroyEvent();
}

function deinit() {
    let score = players.getIntQuestRecordEx(400003, "SCORE");
    score = parseInt(combination / 1E10);
    players.updateQuestRecordEx(400003, "SCORE", String(score));
    players.setEvent(null);
}