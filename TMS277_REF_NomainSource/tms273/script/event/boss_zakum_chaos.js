// Created by MetaMS
// ID:[280030000]
// MapName:殘暴炎魔祭壇
// 殘暴炎魔祭壇

let EXIT_MAP = 211042300;

let FIELD_1 = 280030000;

let REVIVE_COUNT = 5;

let party;
let members;
let endTime;
let practiceMode;
let scriptName = `boss_zakum_normal`;
let damageAccu={};
let damageAll = 0;
let BOSS_LOG;
function init(attachment) {
        event.initMap(FIELD_1);
        [party, practiceMode, BOSS_LOG] = attachment;
        event.setPracticeMode(practiceMode);
        members = party.getLocalMembers();
        let field = event.getMap(FIELD_1);
        field.reset();
        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
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
function mobDied(mob) {
        let map_1 = event.getMap(FIELD_1);
        switch (mob.getDataId()) {
                case 8800102:
                        event.getMap(FIELD_1).endEvent();
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
                        break;
        }
}

function removePlayer(playerId, changeMap) {
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
        if (members.length <= 0) {
                event.destroyEvent();
        }
}

function playerDisconnected(stage) {
        //changeMap is false since all PQ maps force return the player to the exit
        //map on his next login anyway, and we don't want to deal with sending
        //change map packets to a disconnected client
        removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case FIELD_1:
                        //player.startQuest(7004, 0, "21/10/19");//Quest Name:Unknown
                        //stage.startQuest(7004, 0, "1");//Quest Name:Unknown
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
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
        if (party.getLeaderId() == stage.getCharacterId()) {
                kick();
        } else {
                removePlayer(stage.getCharacterId(), true);
        }
}

function kick() {
        for (let i = 0; i < members.length; i++) {
                //dissociate event before changing map so playerChangedMap is not
                //called and this method is not called again by the player
                members[i].setEvent(null);
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "Event_Action":
                        let field = event.getMap(FIELD_1);
                        field.startEvent();
                        break;
                case "kick":
                        kick();
                        break;
                case "show":
                        for (let i in damageAccu) {
                                let m = members.find(m => m.getCharacterId() == i);
                                if (m) { 
                                        m.showSystemMessage(`傷害比例: ${(100 * (damageAccu[i] / damageAll)).toFixed(1)} %`)
                                }
                        }
                        event.startTimer('show', 5 * 1000);
                        break;
        }
}

function deinit() {
        let field = event.getMap(FIELD_1);
        field.endEvent();
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
}