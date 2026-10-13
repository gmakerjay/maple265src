// Created by MetaMS
// Event: Punch king

let EXIT_MAP = 993234701;

let READY_FIELD = 993234800
let BOSS_FIELD = 993234900

let actStage;
let endTime;
let countdown;

function init(attachment) {
        actStage = attachment;
        event.initMap(READY_FIELD, BOSS_FIELD);
        event.getMap(READY_FIELD).reset();
        event.getMap(BOSS_FIELD).reset();
        countdown = 0;
        event.startTimer("kick", 600 * 1000);
        endTime = new Date().getTime() + 600 * 1000;
        actStage.setEvent(event);
        actStage.updateQuestRecordEx(101615, "point", "0");
        actStage.updateQuestRecordEx(101615, "jobcode", actStage.getJob());
        actStage.updateQuestRecordEx(101615, "state", "1");
        actStage.changeMap(READY_FIELD, 0);
}

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 9834315:
                        event.getMap(BOSS_FIELD).spawnMob(9834316, 120, 35);
                        break;
                case 9834316:
                        event.getMap(BOSS_FIELD).spawnMob(9834317, 120, 35);
                        break;
                case 9834317:
                        event.getMap(BOSS_FIELD).spawnMob(9834318, 120, 35);
                        break;
                case 9834318:
                        event.getMap(BOSS_FIELD).spawnMob(9834319, 120, 35);
                        break;
                case 9834319:
                        event.getMap(BOSS_FIELD).spawnMob(9834320, 120, 35);
                        break;
                case 9834320:
                        event.startTimer("end", 1000);
                        event.startTimer("kick", 3000);
                        break;
        }
}

function removePlayer(playerId, changeMap) {
        actStage.setEvent(null);
        if (changeMap) {
                actStage.changeMap(EXIT_MAP, 0);
        }
        event.destroyEvent();
}

function playerDisconnected(stage) {
        removePlayer(stage.getCharacterId(), false);
}

function playerChangedMap(stage, destination) {
        switch (destination.getId()) {
                case READY_FIELD:
                        stage.showTimer((endTime - new Date().getTime()) / 1000);
                        break;
                case BOSS_FIELD:
                        stage.showTimer(false, 0, 0);
                        if (countdown == 0) {
                                event.stopTimer("kick");
                                event.startTimer("end", 125 * 1000);
                                event.startTimer("kick", 128 * 1000);
                                event.startTimer("countdown", 1000);
                        }
                        break;
                default:
                        removePlayer(stage.getCharacterId(), false);
                        break;
        }
}

function kick() {
        actStage.setEvent(null);
        actStage.changeMap(EXIT_MAP, 0);
        event.destroyEvent();
}

function timerExpired(key) {
        switch (key) {
                case "kick":
                        kick();
                        break;
                case "end":
                        event.getMap(BOSS_FIELD).endEvent();
                        break;
                case "countdown":
                        countdown++;
                        event.getMap(BOSS_FIELD).startEvent();
                        if (countdown < 4) {
                                event.startTimer("countdown", 1000);
                        } else if (countdown == 4) {//Spawn Mob
                                event.getMap(BOSS_FIELD).spawnMob(9834315, 120, 35);
                        }
                        break;
        }
}

function deinit() {
        actStage.setEvent(null);
}