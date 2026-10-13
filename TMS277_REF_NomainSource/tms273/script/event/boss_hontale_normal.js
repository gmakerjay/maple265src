// Created by MetaMS
// Boss:Hontale

let EXIT_MAP = 240050500;
let PHASE_1 = 240060000;
let PHASE_2 = 240060100;
let PHASE_3 = 240060200;

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
        event.initMap(PHASE_1, PHASE_2, PHASE_3);
        [party, practiceMode, BOSS_LOG] = attachment;
        event.setPracticeMode(practiceMode);
        members = party.getLocalMembers();
        event.getMap(PHASE_1).reset();
        event.getMap(PHASE_2).reset();
        event.getMap(PHASE_3).reset();
        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                members[i].changeMap(PHASE_1, 0);
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
                case 8810000:
                        event.setVariable("boss1", true);
                        break;
                case 8810001:
                        event.setVariable("boss2", true);
                        break;
                case 8810018:
                        event.setVariable("boss3", true);
                        util.broadcastNoticeWithoutPrefix("經過無數次的挑戰，終於擊破了暗黑龍王的遠征隊！你們才是龍之林的真正英雄~", 0);
                        event.getMap(PHASE_3).killAllMob();
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
                case PHASE_1:
                case PHASE_2:
                case PHASE_3:
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
                members[i].setEvent(null);
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "Hontale":
                        let map = event.getMap(PHASE_3);
                        map.changeBGM("Bgm14/HonTale");
                        map.showEventMsg("伴隨著洞穴內的聲響，暗黑龍王出現了。");
                        let boss = map.makeMob(8810026);
                        map.spawnMob(boss, 92, 260);
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