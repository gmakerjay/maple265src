// Created by MetaMS
// ID:[450009450]
// MapName:虛空之眼

let EXIT_MAP = 100000000;

let mapId = 993151011;
var bossId = 9832024;
var mobReduceR = 0;
var maxHp = 336250000000000;
var allDamage = 0;
var damageInfo = {};
let pos = [-31, 85];


let REVIVE_COUNT = 10;
let map;
let party;
let members;
let endTime;
let practiceMode;

let clear = false;
var BOSS_LOG;
let damageAccu = {}
let damageAll = 0;
let stage = 1;
function init() {
    if (event.getChannel() != 1) {
        event.destroyEvent();
    }
    startGame();
}

function startGame() {
    if (map) {
        let mems = map.getAllStage();
        for (let i in mems) {
            mems[i].changeMap(EXIT_MAP, 0)
        }
    }

    event.initMap(993151011);
    map = event.getMap(993151011)
    event.setVariable('map', map);

    let boss = map.makeMob(bossId);
    boss.setHp(maxHp)
    map.spawnMob(boss, pos[0], pos[1])
    event.setVariable('stage', 1);

    // event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;
    event.startTimer("finish", 30 * 60 * 1000);
    damageAccu = {};

    util.broadcastWeatherEffectNotice("『世界BOSS』" + " : " + "請前往主城游戲機參與世界BOSS", 206, 10000, true);
}

function mobHit(player, mob, damage) {
    if (damageAccu[player.getCharacterId()]) {
        damageAccu[player.getCharacterId()] += damage;
    } else {
        damageAccu[player.getCharacterId()] = damage;
    }
    if (mob.getHp() < (maxHp * 0.1) && stage == 1) {
        stage = 0;
        event.setVariable('stage', stage);
    }
}

function finish() {

    let mems = map.getAllStage();
    for (let i in mems) {
        mems[i].changeMap(EXIT_MAP, 0)
    }
    event.setVariable('clearDate', util.getStringDate('yyMMdd'))
    event.setVariable('stage', 2);
    event.setVariable('clearInfo', damageAccu);

    event.startTimer('check', getMsUntilNextHour_00_10())
}

function mobDied(mob) {
    switch (mob.getDataId()) {
        case 8881000:
            event.stopTimer('finish');
            event.startTimer('finish', 1);


            break;

    }
}

function removePlayer(playerId, changeMap) {
    members = map.getAllStage();
    for (let i = 0; i < members.length; i++) {
        if (members[i].getCharacterId() == playerId) {
            //dissociate event before changing map so playerChangedMap is
            //not called and this method is not called again by the player
            members[i].setEvent(null);
            if (changeMap)
                members[i].changeMap(EXIT_MAP, 0);
            //collapse the members array so we don't accidentally warp
            //this member again if the leader leaves later.
            members.splice(i, 1);
            break;
        }
    }
    // if (members.length <= 0) {
    //         event.destroyEvent();
    // }
}

function playerDisconnected(stage) {
    //changeMap is false since all PQ maps force return the player to the exit
    //map on his next login anyway, and we don't want to deal with sending
    //change map packets to a disconnected client
    removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
    switch (destination.getId()) {
        case mapId:
            //player.startQuest(7004, 0, "21/10/19");//Quest Name:Unknown
            //stage.startQuest(7004, 0, "1");//Quest Name:Unknown
            stage.showTimer((endTime - new Date().getTime()) / 1000);

            stage.setReviveCount(10);
            stage.showReviveCount();
            break;
        default:
            //player died and respawned or clicked Nella to leave PQ
            //changeMap is false so player doesn't get re-warped to exit map
            removePlayer(stage.getCharacterId(), false);
            break;
    }
}

function partyMemberDischarged(party, stage) {
    // if (party.getLeaderId() == stage.getCharacterId()) {
    //         kick();
    // } else {
    removePlayer(stage.getCharacterId(), true);
    // }
}


function timerExpired(key) {
    switch (key) {
        case "Phase1_End":
            for (let i = 0; i < members.length; i++) {
                members[i].changeMap(PHASE_2, 0);
            }
            break;
        case "finish":
            finish();
            break;
        case "check":
            let n = new Date();
            if (n.getHours() == 20) {
                startGame();
            }
            event.startTimer('check', getMsUntilNextHour_00_10())
            break;
        // case "show":
        //         for (let i in damageAccu) {
        //                 let m = members.find(m => m.getCharacterId() == i);
        //                 if (m) { 
        //                         m.showSystemMessage(`傷害比例: ${(100 * (damageAccu[i] / damageAll)).toFixed(1)} %`)
        //                 }
        //         }
        //         event.startTimer('show', 5 * 1000); 
    }
}

function deinit() {
}

function getMsUntilNextHour_00_10() {
    const now = new Date();

    // 创建目标时间：下一小时的 00分10秒
    const nextHour = new Date(now);
    nextHour.setMinutes(0);
    nextHour.setSeconds(10);
    nextHour.setMilliseconds(0);
    nextHour.setHours(now.getHours() + 1);

    // 计算时间差（单位：毫秒）
    return nextHour.getTime() - now.getTime();
}