// Created by MetaMS
// ID:[401060000]
// MapName:赫力席母最上層入口
// 赫力席母最上層入口

let mapR = stage.getIntQuestRecordEx(7265, "mapR");
if (mapR > 0) {
        stage.showSystemMessage("透過Boss選單移動的玩家返回原本的地圖。");
        stage.updateQuestRecordEx(7265, "");
        stage.changeMap(mapR, 0);
} else {
        stage.changeMap(401053002, 0);
}