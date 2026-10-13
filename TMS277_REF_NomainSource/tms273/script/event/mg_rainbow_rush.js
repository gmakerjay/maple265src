// Created by MetaMS
// Event Rainbow rush

let EXIT_MAP = 993221301;
let mapId = 993190000;
let stage;
let endTime;
let map;

function init(attachment) {
        stage = attachment;
        event.initMap(mapId);
        map = event.getMap(mapId);
        stage.updateQuestRecordEx(17209, "Score=0"); // Quest Name:Unknown
        stage.changeMap(map, 0);
        stage.setEvent(event);

        event.startTimer("time_up", 130000);
        endTime = new Date().getTime() + 130000;
        stage.showTimer(130);
}

function playerDisconnected(stage) {
        event.destroyEvent();
}

function playerChangedMap(stage, destination) {
        if (destination.getId() != mapId) {
                event.destroyEvent();
        }
}

function mobDied(mob) {
}

function timerExpired(key) {
        switch (key) {
                case "time_up":
                        map.endEvent();
                        event.startTimer("kick", 5 * 1000);
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