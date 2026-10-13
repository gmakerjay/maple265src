// Created by MetaMS

/* global portal, stage, npc */

let raw = stage.getQuestData(26010);
let mapId = 200000300;
let spawnPoint = 11; //market00 on Perion
if (raw.length != 0) {
        mapId = parseInt(stage.getQuestData(26010));
        spawnPoint = 0;
        stage.removeQuest(26010);
}
if (stage.getIntQuestRecordEx(26015, "returnMap") > 0) {
        mapId = stage.getIntQuestRecordEx(26015, "returnMap");
        spawnPoint = 0;
        stage.removeQuestRecordEx(26015, "returnMap");
        stage.removeQuest(26015);
}
stage.changeMap(mapId, spawnPoint);