// Created by MetaMS
// Boss:Aufheben

let EXIT_MAP = 876000001;

let PHASE_1_DIR = 876000100;
let PHASE_1 = 876000200;

let PHASE_2_DIR = 876000300;
let PHASE_2 = 876000400;

let PHASE_3_DIR = 876000500;
let PHASE_3 = 876000600;

let PHASE_4_DIR = 876000700;
let PHASE_4 = 876000800;

let PHASE_5_DIR = 876000900;
let PHASE_5 = 876001000;

let REVIVE_COUNT = 20;

let BOSS_LOG = "Aufheben";
let party;
let members;
let endTime;

function init(attachment) {
        party = attachment;
        members = party.getLocalMembers();
        event.initMap(PHASE_1_DIR, PHASE_1, PHASE_2_DIR, PHASE_2, PHASE_3_DIR, PHASE_3, PHASE_4_DIR, PHASE_4, PHASE_5_DIR, PHASE_5);
        event.initAufhenbenEvent();
        let map_1 = event.getMap(PHASE_1);
        let map_2 = event.getMap(PHASE_2);
        let map_3 = event.getMap(PHASE_3);
        let map_4 = event.getMap(PHASE_4);
        let map_5 = event.getMap(PHASE_5);
        map_1.reset();
        map_2.reset();
        map_3.reset();
        map_4.reset();
        map_5.reset();

        event.startTimer("kick", 30 * 60 * 1000);
        endTime = new Date().getTime() + 30 * 60 * 1000;

        event.setVariable("members", members);
        event.startTimer("Stage1_Action", 66000);
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
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
                case 9601838:
                        event.getMap(PHASE_1).endEvent();
                        event.setVariable("boss1", "clear");
                        event.startTimer("To_Stage_2", 6000);
                        break;
                case 9601839:
                        event.getMap(PHASE_2).endEvent();
                        event.setVariable("boss2", "clear");
                        event.startTimer("To_Stage_3", 6000);
                        break;
                case 9601840:
                        event.getMap(PHASE_3).endEvent();
                        event.setVariable("boss3", "clear");
                        event.startTimer("To_Stage_4", 6000);
                        break;
                case 9601841:
                        event.getMap(PHASE_4).endEvent();
                        event.setVariable("boss4", "clear");
                        event.startTimer("To_Stage_5", 6000);
                        break;
                case 9601842:
                        event.getMap(PHASE_5).endEvent();
                        event.setVariable("boss5", "clear");
                        event.startTimer("To_Stage_Final", 6000);
                        break;
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
                case PHASE_1_DIR:
                case PHASE_1:
                case PHASE_2_DIR:
                case PHASE_2:
                case PHASE_3_DIR:
                case PHASE_3:
                case PHASE_4_DIR:
                case PHASE_4:
                case PHASE_5_DIR:
                case PHASE_5:
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
                members[i].changeMap(EXIT_MAP);
        }
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "kick":
                        kick();
                        break;
                case "To_Stage_2":
                        warpToMap(PHASE_2_DIR, 0);
                        break;
                case "To_Stage_3":
                        warpToMap(PHASE_3_DIR, 0);
                        break;
                case "To_Stage_4":
                        warpToMap(PHASE_4_DIR, 0);
                        break;
                case "To_Stage_5":
                        warpToMap(PHASE_5_DIR, 0);
                        break;
                case "Start_Stage1_Event":
                        event.getMap(PHASE_1).startEvent();
                        break;
                case "Start_Stage2_Event":
                        event.getMap(PHASE_2).startEvent();
                        break;
                case "Start_Stage3_Event":
                        event.getMap(PHASE_3).startEvent();
                        break;
                case "Start_Stage4_Event":
                        event.getMap(PHASE_4).startEvent();
                        break;
                case "Start_Stage5_Event":
                        event.getMap(PHASE_5).startEvent();
                        break;
        }
}

function warpToMap(map, portal) {
        for (let i = 0; i < members.length; i++) {
                members[i].changeMap(map, portal);
        }
}

function deinit() {
        event.getMap(PHASE_1).endEvent();
        event.getMap(PHASE_2).endEvent();
        event.getMap(PHASE_3).endEvent();
        event.getMap(PHASE_4).endEvent();
        event.getMap(PHASE_5).endEvent();
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(null);
        }
}