// Created by MetaMS
// ID:[262030000]
// MapName:希拉之塔入口
// 希拉之塔入口

let mapR = stage.getIntQuestRecordEx(7265, "mapR");
if (mapR > 0) {
        stage.showSystemMessage("透過Boss選單移動的玩家返回原本的地圖。");
        stage.updateQuestRecordEx(7265, "");
        stage.changeMap(mapR, 0);
} else {
        stage.changeMap(262010000, 3);
}