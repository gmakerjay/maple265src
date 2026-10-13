// Created by MetaMS
// ID:[350060300]
// MapName:核心入口
// 核心入口

let EXIT_MAP = 350060300;

let PHASE_1 = 350060400;
let PHASE_2 = 350060500;
let PHASE_3 = 350060600;
let PHASE_4 = 350060650;

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
        event.initMap(PHASE_1, PHASE_2, PHASE_3, PHASE_4);
        [party, practiceMode, BOSS_LOG] = attachment;
        event.setPracticeMode(practiceMode);
        members = party.getLocalMembers();
        event.getMap(PHASE_1).reset();
        event.getMap(PHASE_2).reset();
        event.getMap(PHASE_3).reset();
        event.getMap(PHASE_4).reset();
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
                case  8950000:
                        event.getMap(PHASE_1).endEvent();
                        event.startTimer("To_Stage_2", 8000);
                        break;
                case 8950001:
                        event.getMap(PHASE_2).endEvent();
                        event.startTimer("To_Stage_3", 8000);
                        break;
                case 8950002:
                        event.getMap(PHASE_3).endEvent();
                        event.startTimer("To_Stage_4", 8000);
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
        //changeMap is false since all PQ maps force return the player to the exit
        //map on his next login anyway, and we don't want to deal with sending
        //change map packets to a disconnected client
        removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case PHASE_1:
                case PHASE_2:
                case PHASE_3:
                case PHASE_4:
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        stage.showReviveCount();
                        break;
                default:
                        //player died and respawned or clicked Nella to leave PQ
                        //changeMap is false so player doesn't get re-warped to exit map
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
                //dissociate event before changing map so playerChangedMap is not
                //called and this method is not called again by the player
                members[i].setEvent(null);
                members[i].changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "To_Stage_2":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_2, 0);
                        }
                        break;
                case "To_Stage_3":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_3, 0);
                        }
                        break;
                case "To_Stage_4":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(PHASE_4, 0);
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
        event.getMap(PHASE_3).endEvent();
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
}