// Created by MetaMS
// Event:Platformer

let mapId = 100000000;
if (stage.getIntQuestRecordEx(34502, "returnMap") > 0) {
        mapId = stage.getIntQuestRecordEx(34502, "returnMap");
        stage.removeQuestRecordEx(34502, "returnMap");
}
usr.playPortalSE();
stage.changeMap(mapId, 0);
