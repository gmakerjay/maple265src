/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * mortal 腳本訂製 技術顧問 50009219
 */

let EXIT_MAP = 100000000;
let PHASE_1 = 911006000;
let PHASE_2 = 911006500;
let PHASE_3 = 911001300;
let PHASE_4 = 911006100;
let REVIVE_COUNT = 5;

let party;
let members;
let endTime;

function init(attachment) {
    event.initMap(PHASE_1, PHASE_2, PHASE_3, PHASE_4);
    party = attachment;
    members = party.getLocalMembers();
    event.getMap(PHASE_1).reset();
    event.getMap(PHASE_2).reset();
    event.startTimer("kick", 30 * 60 * 1000);
    endTime = new Date().getTime() + 30 * 60 * 1000;
    event.setVariable("members", members);
    event.setVariable("stat", "0");
    event.setVariable("correct", "3");
    let randomMap = Math.random() >= 0.5 ? PHASE_1 : PHASE_2;
    let player_map_1 = randomMap === PHASE_1 ? PHASE_1 : PHASE_2;
    let player_map_2 = randomMap === PHASE_1 ? PHASE_2 : PHASE_1;
    members[0].changeMap(player_map_1, 0);
    members[1].changeMap(player_map_2, 0);
    if (player_map_1 == PHASE_2) {
        event.setVariable("npc", members[0].spawnTempNpc(9000386, 30, -21, 1));
    }
    if (player_map_2 == PHASE_2) {
        event.setVariable("npc", members[1].spawnTempNpc(9000386, 30, -21, 1));
    }
    for (let i = 0; i < members.length; i++) {
        members[i].setEvent(event);
        members[i].setReviveCount(REVIVE_COUNT);
    }
}

function mobDied(mob) {

}

function mobHit(stage, mob, damage) {

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
        case PHASE_1:
        case PHASE_2:
        case PHASE_3:
        case PHASE_4:
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
        case "Event_Fail":
            event.stopTimer("kick");
            event.startTimer("kick", 5 * 1000);
            endTime = new Date().getTime() + 5 * 1000;
            for (let i = 0; i < members.length; i++) {
                members[i].showTimer(5);
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