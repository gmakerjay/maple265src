/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let members = [];
let FIELD_1 = 993141000;
let FIELD_2 = 993000520;
let incremental = 0;
let game = {
    combination: [],
    injury: 0
}

function init(attachment) {
    event.setVariable('members', members);
    event.setVariable('stat', "0");
    util.broadcastWorldChatMsg(0x12, "[ 烈焰狼 ] : 事件已初始化!");
    let now = new Date();
    let target = new Date(now);
    target.setHours(20, 0, 0, 0);

    if (now.getTime() > target.getTime()) {
        target.setDate(target.getDate() + 1);
    }
    let delay = target.getTime() - now.getTime();
    event.startTimer("game", delay);
}

function removePlayer(playerId, changeMap) {
    for (let i in members) {
        if (members[i].getCharacterId() === playerId) {
            members[i].setEvent(null);
            if (changeMap) {
                members[i].changeMap(100000000, 0);
                members.splice(i, 1);
            }
            break;
        }
    }
}

function mobDied(mob) {
    switch (mob.getDataId()) {
        case 9832024:
            event.stopTimer('kick');
            event.startTimer("kick", 60 * 1000);
            for (let i in members) {
                members[i].showTimer(60);
            }
            event.setVariable('game', game);

            for (let i in members) {
                members[i].runScript("expand/menu/世界獎勵");
            }
            break;
    }
}

function mobHit(stage, mob, damage) {
    let mobs = [9832024];
    if (mobs.indexOf(mob.getDataId()) > -1) {
        game.injury += damage;
        if (game.combination[stage['characterId']]) {
            game.combination[stage['characterId']].damage += damage;
        }
    }
}

function playerDisconnected(stage) {
    removePlayer(stage.getCharacterId(), true);
}

function playerChangedMap(stage, destination) {
    let check = false;
    let stat = parseInt(event.getVariable('stat'));
    let start_date = parseInt(event.getVariable("start_date"));
    let game_date = new Date().getTime()
    switch (destination.getId()) {
        case FIELD_1:
            stage.showReviveCount();
            check = true;
            util.broadcastWorldChatMsg(0x8, "【世界烈焰狼】: 世界烈焰狼逃跑出來了！全服玩家請點擊頭上信封進入副本 目前參與 " + members.length + "/20");
            switch (stat) {
                case 1:
                    if (start_date !== null) {
                        stage.showTimer(((start_date - game_date) / 1000));
                    } else {
                        stage.showTimer(2 * 60);
                    }
                    break;
            }
            break;
        case FIELD_2:
            check = true;
            break;
    }
    if (!check) {
        removePlayer(stage.getCharacterId(), true);
    }
}

function timerExpired(key) {
    let stat = parseInt(event.getVariable('stat'));
    switch (key) {
        case "game":
            switch (stat) {
                case 0:
                    game = {
                        combination: {},
                        injury: 0
                    }
                    util.broadcastWeatherEffectNotice("【世界烈焰狼】世界烈焰狼，快去擊敗他！！！", 371, 6000, true);
                    stat += 1;
                    event.setVariable('stat', String(stat));
                    event.setVariable('start_date', String(new Date().getTime() + 2 * 60 * 1000));
                    event.startTimer("game", 2 * 60 * 1000);
                    break;
                case 1:
                    let map = event.getMap(FIELD_2);
                    for (let i in members) {
                        if (members[i] == null) continue;
                        members[i].changeMap(FIELD_2, 0);
                        game.combination[members[i]['characterId']] = {
                            name: members[i]['characterName'],
                            damage: 0
                        }
                    }
                    if (map.getActiveMobCount() <= 0) {
                        let monster = map.makeMob(9832024);
                        monster.setForcedMobStat(250);
                        monster.changeHp(336250000000000);
                        map.spawnMob(monster, 59, 353);
                    }
                    stat += 1;
                    event.setVariable('stat', String(stat));
                    for (let i in members) {
                        members[i].showTimer(30 * 60);
                    }
                    event.startTimer("kick", 30 * 60 * 1000);
                    break;
                default:
                    members = [];
                    event.setVariable('members', members);
                    event.setVariable('stat', String(0));
                    //util.broadcastWorldChatMsg(0x12, "[ 世界烈焰狼 ] :  已自動處理");
                    let now = new Date();
                    let next = new Date(now);
                    next.setDate(now.getDate() + 1);
                    next.setHours(20, 0, 0, 0);
                    let delay = next.getTime() - now.getTime();
                    event.startTimer("game", delay);
                    let yyyy = next.getFullYear();
                    let mm = String(next.getMonth() + 1).padStart(2, '0');
                    let dd = String(next.getDate()).padStart(2, '0');
                    let timeStr = `${yyyy}-${mm}-${dd} 20:00:00`;
                    util.broadcastWorldChatMsg(0x12, "[ 世界烈焰狼 ] :  已自動處理，下一次開啟時間為 " + timeStr);
                    break;
            }
            break;
        case "kick":
            for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
                members[i].changeMap(100000000, 0);
            }
            stat += 1;
            event.setVariable('stat', String(stat));
            event.startTimer("game", 60 * 1000);
            incremental = 0;
            util.broadcastWorldChatMsg(0x12, "[ 世界烈焰狼 ] : 當前事件結束 等待 1 分鐘後自動銷毀");
            break;
    }
}

function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}