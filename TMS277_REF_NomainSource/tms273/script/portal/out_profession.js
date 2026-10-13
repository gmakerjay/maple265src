// Created by MetaMS


let rMap = stage.getIntQuestRecordEx(7860, "returnMap");
let spawnPoint = 0; //market00 on Perion
if (rMap == 0) {
        rMap = 100000000;
        pawnPoint = 20; //market00 on Perion
}
stage.removeQuestRecordEx(7860, "returnMap");
usr.playPortalSE();
stage.changeMap(rMap, spawnPoint);