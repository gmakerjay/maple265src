// Created by MetaMS
// BOSS:Ranmaru Hard

let EXIT_MAP = 807300100;
let FIELD_1 = 807300210;
let FIELD_2 = 807300220;

let REVIVE_COUNT = 10;

let party;
let members;
let endTime;
let practiceMode;

let fireCount = 0;
let n = util.getScriptPath();
let ns = n.split('/')
ns = ns[ns.length - 1]
ns = ns.split('.'); 
let scriptName = ns[0]
let damageAccu={};
let damageAll = 0;
let BOSS_LOG;
function init(attachment) {
        event.initMap(FIELD_1, FIELD_2);
        [party, practiceMode, BOSS_LOG] = attachment;
        event.setPracticeMode(practiceMode);
        members = party.getLocalMembers();
        event.getMap(FIELD_1).reset();
        event.startTimer("kick", 60 * 60 * 1000);
        endTime = new Date().getTime() + 60 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                members[i].changeMap(FIELD_1, 0);
                members[i].setReviveCount(REVIVE_COUNT);
                damageAccu[members[i].getCharacterId()] = 1;
                damageAll += 1;
        }
        event.setVariable('scriptName', scriptName);
        event.setVariable('bossName', BOSS_LOG);
        event.setVariable("consuming", Date.now());
        event.setVariable("single", members.length == 1);
        event.startTimer('show', 1);
}
function mobHit(player, mob, damage) {
        damageAccu[player.getCharacterId()] += damage;
        damageAll += damage;
}
let rewardFlg = false;
function mobDied(mob) {
        switch (mob.getDataId()) {
                case 9421577:
                        event.startTimer("Spawn_P", 60 * 1000);
                        break;
                case 9421578:
                        event.startTimer("Spawn_B", 60 * 1000);
                        break;
                case 9421579:
                        event.startTimer("Spawn_R", 60 * 1000);
                        break;
        }
        for (let i = 0; !practiceMode && i < members.length; i++) {
                members[i].addBossClearLog(mob.getDataId());
        }
        if (practiceMode) {
                return;
        }
        if (!rewardFlg) {
                rewardFlg = true;
                let showStr = [`[副本信息]: ${BOSS_LOG} 被成功攻略 ${practiceMode ? "練習模式" : ""}`];
        let finalTime = parseInt((Date.now() - event.getVariable('consuming')) / 1000);
        event.setVariable('finalTime', finalTime)
        for (let i in damageAccu) {
                let m = members.find(m => m.getCharacterId() == i);
                let per = (100 * (damageAccu[i] / damageAll)).toFixed(2);
                showStr.push(`[傷害資訊]: ${m.getCharacterName()} 傷害占比 ${per}%`);
                event.setVariable(`${m.getCharacterId()}-per`, per);
                if (!practiceMode && m) {
                        m.addBossClearLog(mob.getDataId());
                        m.runScript('boss/BOSS_REWARD_APPLY')
                }
        }
        let T_A = Math.floor(finalTime / (60)); // 分
        let T_B = Math.floor(finalTime % (60)); // 秒
        showStr.push(`[通關時間]: ${T_A}:${T_B.toString().padStart(2, '0')}`)
        for (let i in showStr) {
                util.broadcastWorldChatMsg(4, showStr[i]);
        }
        event.stopTimer('show');
        }
        
}

function removePlayer(playerId, changeMap) {
        for (let i = 0; i < members.length; i++) {
                if (members[i].getCharacterId() == playerId) {
                        members[i].setEvent(null);
                        if (changeMap) {
                                members[i].changeMap(EXIT_MAP, 0);
                        }
                        members.splice(i, 1);
                        break;
                }
        }
        if (members.length <= 0) {
                event.destroyEvent();
        }
}

function playerDisconnected(stage) {
        removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case FIELD_1:
                case FIELD_2:
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        stage.showReviveCount();
                        break;
                default:
                        removePlayer(stage.getCharacterId(), false);
                        break;
        }
}

function partyMemberDischarged(party, stage) {
        if (party.getLeaderId() == stage.getCharacterId()) {
                kick();
        } else {
                removePlayer(stage.getCharacterId(), true);
        }
}

function kick() {
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        let map = event.getMap(FIELD_1);
        switch (key) {
                case "Spawn_P"://束縛的陰陽師
                        let pCount = map.getMobCount(9421577);
                        if (pCount <= 0) {
                                map.spawnMob(9421577, -824, -169);
                        }
                        break;
                case "Spawn_B"://治癒的陰陽師
                        let bCount = map.getMobCount(9421578);
                        if (bCount <= 0) {
                                map.spawnMob(9421578, -65, -135);
                        }
                        break;
                case "Spawn_R"://紅焰的陰陽師
                        let rCount = map.getMobCount(9421579);
                        if (rCount <= 0) {
                                map.spawnMob(9421579, -367, -298);
                                event.startTimer("Spawn_Fire", 25 * 1000);
                        }
                        break;
                case "Spawn_Fire":
                        if (map.getMobCount(9421579) > 0 && fireCount < 15) {
                                map.spawnMob(9421585, 545 - (fireCount * 120), 123);
                                map.blowWeather(5120026, "紅焰的陰陽師召喚了巨大的火焰！", 4);
                                fireCount++;
                                event.startTimer("Spawn_Fire", 25 * 1000);
                        }
                        break;
                case "kick":
                        kick();
                        break;
        }
}

function deinit() {
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
}