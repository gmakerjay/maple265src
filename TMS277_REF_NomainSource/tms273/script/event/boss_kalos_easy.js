// Created by MetaMS
// Boss: Kalos

let EXIT_MAP = 410005005;
let PHASE_1_DIR = 410006200;
let PHASE_1 = 410006220;

let PHASE_2_DIR = 410006240;
let PHASE_2 = 410006260;

let PHASE_3 = 410006280;

let REVIVE_COUNT = 5;

let party;
let members;
let endTime;
let practiceMode;

let LOG_BOSS = 8881012;
let clear = false;

function init(attachment) {
        event.initMap(PHASE_1_DIR, PHASE_1, PHASE_2_DIR, PHASE_2, PHASE_3);
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
                if (!practiceMode) {
                        members[i].setEnterBoss(LOG_BOSS);
                        event.registerUser(members[i].getCharacterId());
                }
                members[i].setEvent(event);
                members[i].changeMap(PHASE_1_DIR, 0);
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
                case 8881010:
                        event.getMap(PHASE_1).endEvent();
                        event.startTimer("Phase1_End", 5 * 1000);
                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId());
                        }
                        break;
                case 8881012:
                        clear = true;
                        event.getMap(PHASE_2).endEvent();
                        event.getMap(PHASE_2).killAllMob();
                        event.startTimer("Phase2_End", 5 * 1000);
                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId());
                        }
                        break;
                case 8881018:
                        for (let i = 0; !practiceMode && i < members.length; i++) {
                                members[i].addBossClearLog(mob.getDataId());
                        }
                        break;
        }
}

function removePlayer(playerId, changeMap) {
        for (let i = 0; i < members.length; i++) {
                if (members[i].getCharacterId() == playerId) {
                        //dissociate event before changing map so playerChangedMap is
                        //not called and this method is not called again by the player
                        members[i].setEvent(null);
                        if (changeMap) {
                                members[i].changeMap(EXIT_MAP, 0);
                        }
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
        removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case PHASE_1_DIR:
                case PHASE_1:
                case PHASE_2_DIR:
                case PHASE_2:
                case PHASE_3:
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        stage.showReviveCount();
                        break;
                default:
                        stage.cancelDebuff(237, 1);
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
                case "Event_Fail":
                        event.stopTimer("kick");
                        event.startTimer("kick", 5 * 1000);
                        endTime = new Date().getTime() + 5 * 1000;
                        for (let i = 0; i < members.length; i++) {
                                members[i].showTimer(5);
                        }
                        break;
                case "Phase1_End":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_2_DIR, 0);
                        }
                        break;
                case "Phase2_End":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_3, 0);
                        }
                        break;
                case "kick":
                        kick();
                        break;
        }
}

function deinit() {
        event.getMap(PHASE_1).endEvent();
        event.getMap(PHASE_2).endEvent();
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
        if (!practiceMode) {
                event.updateAllUserBossClear(LOG_BOSS, clear);
        }
}