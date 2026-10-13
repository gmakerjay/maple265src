/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
player = require("check_log");
let players = [];
let register = [];
let starttime;
let startmaps = 993000520;
let marin_blood = 5832 * 1E12;

let inherent = [
    [2433971, [1, 1]],
    [2431195, [50, 50]],
    [4001714, [50, 50]],
    [2439137, [30, 30]]
]

function init(attachment) {
    event.setVariable("players", players);
    event.setVariable("register", register);
    event.setVariable("stat", "0");
    event.setVariable("start", false);
    let map = event.getMap(startmaps);
    map.reset();
    let result = getTimeDifference();
    event.setVariable("game_date", result.milliseconds);
    event.startTimer("game", result.milliseconds);
    util.broadcastChatMsg(0x12, "[ 烈焰戰狼 ] : 已開啟智能模式!!開啟時間倒計時 " + result.timeString);
    util.broadcastChatMsg(0x12, "[ 烈焰戰狼 ] : 已開啟智能模式!!開啟時間倒計時 " + result.timeString);
}

function removePlayer(playerId, changeMap) {
    var curplayers = event.getVariable('players');
    for (let i in curplayers) {
        if (curplayers[i].getCharacterId() == playerId) {
            curplayers[i].setEvent(null);
            if (changeMap) {
                curplayers[i].changeMap(100000000, 0);
                curplayers.splice(i, 1);
            }
            break;
        }
    }
}

function mobHit(stage, mob, damage) {
    switch (mob.getDataId()) {
        case 9832024:
            var sumdamage = parseInt(event.getVariable("cid_" + stage.getCharacterId() + "_damage"));
            sumdamage += damage;
            event.setVariable("cid_" + stage.getCharacterId() + "_damage", String(sumdamage));
            break;
    }
}

function mobDied(mob) {
    switch (mob.getDataId()) {
        case 9832024:
            var curplayers = event.getVariable('players');
            for (let i in curplayers) {
                var cardamage = parseInt(event.getVariable("cid_" + curplayers[i].getCharacterId() + "_damage"));
                var gameProportion = ((cardamage / marin_blood) * 100).toFixed(2);
                if (gameProportion >= 1) {
                    txt = "\r\n";
                    for (let n in inherent) {
                        if (n % 3 == 0) txt += "\r\n";
                        var num = marinrandom(inherent[n][1][0], inherent[n][1][1]);
                        curplayers[i].gainItem(inherent[n][0], num);
                    }
                }
            }
            util.broadcastChatMsg(0x12, "[ 烈焰戰狼 ] : 一分鐘後強制給所有人清理出去!!!不要逗留!不要逗留!!");
            util.broadcastChatMsg(0x12, "[ 烈焰戰狼 ] : 一分鐘後強制給所有人清理出去!!!不要逗留!不要逗留!!");
            util.broadcastChatMsg(0x12, "[ 烈焰戰狼 ] : 一分鐘後強制給所有人清理出去!!!不要逗留!不要逗留!!");
            event.startTimer("examine", 1 * 60 * 1000);
            event.stopTimer("datenotice");
            break;
    }
}

function playerDisconnected(stage) {
    removePlayer(stage.getCharacterId(), true);
}

function playerChangedMap(stage, destination) {
    var check = false;
    if (startmaps == destination.getId()) {
        stage.showTimer((starttime - new Date().getTime()) / 1000);
        stage.showReviveCount();
        check = true;
        var curplayers = event.getVariable('players');
        util.broadcastChatMsg(0x8, "[ 烈焰戰狼 ] : 全體副本 < 烈焰戰狼 > 已進入備戰期 ! 各位玩家前往 挑戰 目前參與 " + curplayers.length + "/10!!!");
    }
    if (!check) {
        removePlayer(stage.getCharacterId(), false);
    }
}

function timerExpired(key) {
    switch (key) {
        case 'game':
            players = [];
            event.setVariable("players", players);
            var map = event.getMap(startmaps);
            map.reset();
            stat = parseInt(event.getVariable("stat"));
            stat += 1;
            event.setVariable("stat", String(stat));
            starttime = new Date().getTime() + 5 * 60 * 1000;
            event.setVariable("start", true);
            event.startTimer("startgame", 5 * 60 * 1000);
            for (i = 0; i <= 5; i++) {
                util.broadcastChatMsg(0x8, "[ 烈焰戰狼 ] : " + event.getChannel() + " 頻道 世界本 < 烈焰戰狼 > 已進入備戰期 ! 各位玩家前往 挑戰 目前參與 " + players.length + "/10!!!");
            }
            util.broadcastWeatherEffectNotice("[ 烈焰戰狼 ] : 已進入備戰期! 想挑戰的玩家 前往 " + event.getChannel() + " 頻道 世界烈焰戰狼 進行參與 !!! ", 328, 10000, true);
            break;

        case 'startgame':
            stat = parseInt(event.getVariable("stat"));
            stat += 1;
            event.setVariable("stat", String(stat));
            var map = event.getMap(startmaps);
            var mobs = map.makeMob(9832024);
            mobs.setForcedMobStat(300);
            mobs.changeHp(marin_blood);
            map.spawnMob(mobs, 22, 353);
            starttime = new Date().getTime() + 30 * 60 * 1000;
            for (let i in players) {
                players[i].showTimer(30 * 60);
            }
            event.startTimer("datenotice", 1 * 10 * 1000);
            break;

        case "examine":
            let maps = event.getMap(startmaps);
            if (maps.getPlayerCount() <= 0) {
                maps.reset()
                util.broadcastChatMsg(0x8, "[ 烈焰戰狼 ] : 所有人已正常退出烈焰戰狼!烈焰戰狼已重置!等待下周五的 21:00 我們再相遇 ~ !");
                event.setVariable("stat", "0");
                event.setVariable("start", false);
                var result = getTimeDifference();
                event.startTimer("game", result.milliseconds);
            } else {
                maps.transferTo(100000000, 0);
                event.startTimer("examine", 1 * 60 * 1000);
            }
            break;

        case "datenotice":
            datenotice();
            break;
    }
}

function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    return finalStringArray.slice(0, totalLength).join("");
}

function getTimeDifference() {
    var now = new Date();
    var target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);
    var daysUntilFriday = (5 + 7 - now.getDay()) % 7; // Calculate the number of days until the next Friday
    target.setDate(target.getDate() + daysUntilFriday);
    if (now >= target) {
        target.setDate(target.getDate() + 7); // If it's already past Friday 20:30, move to the next Friday
    }
    var diff = target.getTime() - now.getTime();
    diff = diff < 0 ? 0 : diff;
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
    var pad = function (n) {
        return n < 10 ? '0' + n : n;
    };
    var timeString = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    return {
        milliseconds: diff,
        timeString: timeString
    };
}

// function getTimeDifference() {
//     var now = new Date();
//     var target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);
//     if (now.getHours() >= 20 || (now.getHours() === 19 && now.getMinutes() >= 59 && now.getSeconds() >= 59)) {
//         target.setDate(target.getDate() + 1);
//     }
//     var diff = target.getTime() - now.getTime();
//     diff = diff < 0 ? 0 : diff;
//     var hours = Math.floor(diff / (1000 * 60 * 60));
//     var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((diff % (1000 * 60)) / 1000);
//     var pad = function (n) {
//         return n < 10 ? '0' + n : n;
//     };
//     var timeString = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
//     return {
//         milliseconds: diff,
//         timeString: timeString
//     };
// }

function datenotice() {
    var maps = [startmaps];
    var txt = "";
    var curplayers = event.getVariable('players');
    for (players of curplayers) {
        var cardamage = parseInt(event.getVariable("cid_" + players.getCharacterId() + "_damage"));
        var proportion = ((cardamage / marin_blood) * 100).toFixed(2);
        txt += " ■ " + players.getCharacterName() + " : " + (proportion > 100 ? 100 : proportion) + " % ■ ";
    }
    for (var i in maps) {
        var map = event.getMap(maps[i]);
        map.showSystemMessage(txt);
    }
    event.startTimer("datenotice", 10 * 1000);
}