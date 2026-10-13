// Created by MetaMS


let rMap = stage.getIntQuestRecordEx(7600, "rMap");
let portalId = stage.getIntQuestRecordEx(7600, "sp");
if (rMap == 0) {
        rMap = 100000000;
        portalId = 0;
}
usr.playPortalSE();
stage.changeMap(rMap, portalId);