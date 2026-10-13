// Created by MetaMS
// Boss:Shinas

let EXIT_MAP = 271041210;
let FIELD_1 = 271041100;
let FIELD_2 = 271041300;

let REVIVE_COUNT = 5;

let party;
let members;
let endTime;
let practiceMode;

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
        event.getMap(FIELD_2).reset();
        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                members[i].changeMap(FIELD_1, 1);
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

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 8850111:
                        event.setVariable("boss", true);
                        event.getMap(FIELD_1).killAllMob();
                                if (practiceMode) {
                                        return;
                                }
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
                        //util.broadcastNoticeWithoutPrefix("", 0);
                        break;
        }
        for (let i = 0; !practiceMode && i < members.length; i++) {
                members[i].addBossClearLog(mob.getDataId());
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
        switch (key) {
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