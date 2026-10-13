// Created by MetaMS
// Event Colorful Mail

let EXIT_MAP = 993225000;
let mapId = 993190800;
let player;
let endTime;
let map;

function init(attachment) {
        stage = attachment;
        event.initMap(mapId);
        map = event.getMap(mapId);
        stage.updateQuestRecordEx(16184, "Score=0;Point=0;Combo=0"); // Point 分数  Score：点数  Combo：最高连击
        stage.changeMap(map, 0);
        stage.setEvent(event);

        event.startTimer("start", 4 * 1000);
}

function playerDisconnected(stage) {
        event.destroyEvent();
}

function playerChangedMap(stage, destination) {
        if (destination.getId() != mapId) {
                stage.runScript("expand/mg_unlock");
                event.destroyEvent();
        }
}

function mobDied(mob) {
}

function timerExpired(key) {
        switch (key) {
                case "time_up":
                        map.endEvent();
                        event.startTimer("kick", 7 * 1000);
                        break;
                case "kick":
                        stage.changeMap(EXIT_MAP, 1);
                        break;
                case "end":
                        event.stopTimer("kick");
                        event.startTimer("kick", 5 * 1000);
                        break;
                case "start":
                        event.startTimer("time_up", 93 * 1000);
                        endTime = new Date().getTime() + 93 * 1000;
                        stage.showTimer(93);
                        map.startEvent();
                        break;
        }
}

function deinit() {
        stage.setEvent(null);
}