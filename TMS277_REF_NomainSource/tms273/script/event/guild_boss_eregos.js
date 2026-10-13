// Created by MetaMS
// Event: Monster park

let EXIT_MAP = 941000001;

let READY_FIELD = 941000100
let BOSS_FIELD = 941000200

let actStage;
let endTime;
let countdown;

function init(attachment) {
        actStage = attachment;
        event.initMap(READY_FIELD, BOSS_FIELD);
        event.getMap(READY_FIELD).reset();
        event.getMap(BOSS_FIELD).reset();
        countdown = 0;
        event.startTimer("kick", 150 * 1000);
        endTime = new Date().getTime() + 150 * 1000;
        actStage.setEvent(event);
        actStage.updateQuestRecordEx(100811, "point", "0");
        actStage.changeMap(READY_FIELD, 0);
}

function mobDied(mob) {
        switch (mob.getDataId()) {
                case 9500800:
                        event.getMap(BOSS_FIELD).spawnMob(9500801, mob.getPosX(), mob.getPosY());
                        break;
                case 9500801:
                        event.getMap(BOSS_FIELD).spawnMob(9500802, mob.getPosX(), mob.getPosY());
                        break;
                case 9500802:
                        event.getMap(BOSS_FIELD).spawnMob(9500803, mob.getPosX(), mob.getPosY());
                        break;
                case 9500803:
                        event.getMap(BOSS_FIELD).spawnMob(9500804, mob.getPosX(), mob.getPosY());
                        break;
                case 9500804:
                        event.getMap(BOSS_FIELD).spawnMob(9500805, mob.getPosX(), mob.getPosY());
                        break;
                case 9500805:
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
                        stage.showTimer(true, 0, 0);
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
                                event.getMap(BOSS_FIELD).spawnMob(9500800, 235, 95);
                        }
                        break;
        }
}

function deinit() {
        actStage.setEvent(null);
}