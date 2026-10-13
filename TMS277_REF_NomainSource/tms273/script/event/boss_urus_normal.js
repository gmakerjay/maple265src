// Created by MetaMS
// BOSS:Ranmaru Normal

let EXIT_MAP = 970072200;
let FIELD_1 = 970072000;
let FIELD_2 = 970072100;

let members;
let endTime;

function init(attachment) {
        event.initMap(FIELD_1, FIELD_2);
        members = attachment;
        event.getMap(FIELD_1).reset();
        event.getMap(FIELD_2).reset();
        event.getMap(FIELD_1).spawnMob(8881000, 0, 86);

        event.startTimer("event_end", 10 * 60 * 1000);
        endTime = new Date().getTime() + 10 * 60 * 1000;
        event.setVariable("members", members);
        for (let i = 0; i < members.length; i++) {
                members[i].setEvent(event);
                members[i].changeMap(FIELD_1, 0);
        }
}

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 8881000:
                        event.stopTimer("event_end");
                        event.startTimer("event_end", 3 * 60 * 1000);
                        endTime = new Date().getTime() + 3 * 60 * 1000;
                        for (let i = 0; i < members.length; i++) {
                                members[i].showTimer((endTime - new Date().getTime()) / 1000);
                        }
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
                        break;
                default:
                        removePlayer(stage.getCharacterId(), false);
                        break;
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
                case "event_end":
                        event.startTimer("kick", 3 * 60 * 1000);
                        endTime = new Date().getTime() + 3 * 60 * 1000;
                        for (let i = 0; i < members.length; i++) {
                                members[i].changeMap(FIELD_2, 0);
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