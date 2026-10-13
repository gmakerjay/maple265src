// Created by MetaMS
// ID:[221030900]
// MapName:主控室
// 主控室


let mapR = stage.getIntQuestRecordEx(7265, "mapR");
if (mapR > 0) {
        stage.showSystemMessage("透過Boss選單移動的玩家返回原本的地圖。");
        stage.updateQuestRecordEx(7265, "");
        stage.changeMap(mapR, 0);
} else {
        usr.playPortalSE();
        stage.changeMap(221030800, 3);
}