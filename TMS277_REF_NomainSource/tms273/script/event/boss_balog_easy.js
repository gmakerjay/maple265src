// Created by MetaMS
// Boss:Balrog

let partyBoss = require("party_boss");

let BOSS_TYPE = partyBoss.Balrog;
let SEL_IDX = 0;

let EXIT_MAP = 105100100;
let FIELD_1 = 105100400;
let FIELD_2 = 105100401;

let REVIVE_COUNT = 5;

let party;
let members;
let endTime;

function init(attachment) {
        event.initMap(FIELD_1, FIELD_2);
        party = attachment;
        members = party.getLocalMembers();
        event.getMap(FIELD_1).reset();
        event.getMap(FIELD_2).reset();
        event.startTimer("kick", 20 * 60 * 1000);
        endTime = new Date().getTime() + 20 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                members[i].addBossEnterLog(BOSS_TYPE, SEL_IDX);
                members[i].changeMap(FIELD_1, 0);
                members[i].setReviveCount(REVIVE_COUNT);
        }
}

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 8830010:
                        event.setVariable("boss", true);
                        event.getMap(FIELD_1).killAllMob();
                        event.startTimer("Stage_End", 5 * 1000);
                        break;
        }
        for (let i = 0; i < members.length; i++) {
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
                case "Stage_End":
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(FIELD_2, 0);
                        }
                        break;
                case "Release"://8830008
                        let balog = event.getVariable("Balog");
                        balog.setInvincible(false);
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