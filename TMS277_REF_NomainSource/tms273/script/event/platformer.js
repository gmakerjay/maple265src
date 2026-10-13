// Created by MetaMS
// Event:Platformer

let mapId;
let tStage, map;
let mFoothold = [];

function init(attachment) {
        tStage = attachment;
        let stage = parseInt(tStage.getQuestData(34502));
        mapId = 993001000 + stage * 10;
        event.initMap(mapId);
        map = event.getMap(mapId);
        tStage.setEvent(event);
        tStage.changeMap(map, 0);
}

function playerDisconnected(stage) {
        event.destroyEvent();
}

function playerChangedMap(stage, destination) {
        if (destination.getId() != mapId) {
                event.destroyEvent();
        }
}

function timerExpired(key) {
        switch (key) {
                case "summon_obstacle":
                        event.startTimer("summon_obstacle", 3000);
                        //map.createObstacleAtom(0, 10, 54, 54, -1000, 50);
                        break;
        }
}

function deinit() {
        tStage.setEvent(null);
}