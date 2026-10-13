// Created by MetaMS
// ID:[450009301]
// MapName:虛空之眼前方
// 虛空之眼前方

let mapR = stage.getIntQuestRecordEx(7265, "mapR");
if (mapR > 0) {
        stage.showSystemMessage("透過Boss選單移動的玩家返回原本的地圖。");
        stage.updateQuestRecordEx(7265, "");
        stage.changeMap(mapR, 0);
} else {
        stage.changeMap(450009300, 5);
}