// Created by MetaMS
// Event wagul tower

let EXIT_MAP = 993224800;
let mapId = 993190400;
let stage;
let endTime;
let map;

function init(attachment) {
        stage = attachment;

        event.initMap(mapId);
        map = event.getMap(mapId);
        stage.updateQuestRecordEx(100252, "play", "play"); // Quest Name:Unknown
        stage.updateQuestRecordEx(100252, "high", "0"); // Quest Name:Unknown
        stage.updateQuestRecordEx(16209, "Score=0"); // Quest Name:Unknown
        stage.changeMap(map, 0);
        stage.setEvent(event);

        event.startTimer("time_up", 10 * 60 * 1000);
        endTime = new Date().getTime() + 10 * 60 * 1000;
        stage.showTimer(10 * 60);
}

function playerDisconnected(stage) {
        event.destroyEvent();
}


function playerChangedMap(stage, destination) {
        if (destination.getId() != mapId) {
                stage.runScript("expand/mg_unlock");
                stage.updateQuestRecordEx(100252, "play", "end"); // Quest Name:Unknown
                event.destroyEvent();
        }
}

function mobDied(mob) {
}

function timerExpired(key) {
        switch (key) {
                case "time_up":
                        map.endEvent();
                        event.startTimer("kick", 3 * 1000);
                        break;
                case "kick":
                        stage.changeMap(EXIT_MAP, 1);
                        break;
                case "end":
                        event.stopTimer("kick");
                        event.startTimer("kick", 5 * 1000);
                        break;
        }
}

function deinit() {
        stage.setEvent(null);
}