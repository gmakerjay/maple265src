// Created by MetaMS

let raw = stage.getQuestData(7998);
let mapId = 100000000;
spawnPoint = 0; //market00 on Perion
if (raw.length != 0) {
        mapId = parseInt(raw);
        spawnPoint = 0;
        stage.removeQuest(7998);
}
usr.playPortalSE();
stage.changeMap(mapId, spawnPoint);