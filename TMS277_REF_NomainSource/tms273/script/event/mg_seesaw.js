// Created by MetaMS
// Event Seesaw

let EXIT_MAP = 993224600;
let mapId = 993221000;
let stage, map;
let endTime;

function init(attachment) {
        stage = attachment;
        event.initMap(mapId);
        map = event.getMap(mapId);
        stage.changeMap(map, 0);
        stage.setEvent(event);
        event.startTimer("kick", 10 * 60 * 1000);
        event.startTimer("start", 3 * 1000);
        endTime = new Date().getTime() + 10 * 60 * 1000;
}

function playerDisconnected(stage) {
        event.destroyEvent();
}

function playerChangedMap(stage, destination) {
        if (destination.getId() != mapId) {
                event.destroyEvent();
        } else {
                stage.updateQuestRecordEx(101311, "count=0;point=0");//count：為進行蹺蹺板成功了的次數，point：為獲得的積分，[每次進入都會重置成績]
        }
}

function kick() {
        stage.setEvent(null);
        stage.changeMap(EXIT_MAP, 0);
        event.destroyEvent();
}


function timerExpired(key) {
        switch (key) {
                case "kick":
                        kick();
                        break;
                case "start":
                        map.startEvent();
                        break;
                case "end":
                        event.stopTimer("kick");
                        event.startTimer("kick", 3 * 1000);
                        break;

        }
}

function deinit() {
        stage.setEvent(null);
}