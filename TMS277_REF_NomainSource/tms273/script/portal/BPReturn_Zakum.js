// Created by MetaMS
// ID:[105100100]
// MapName:通往殘暴炎魔之門
// 通往殘暴炎魔之門

let mapR = stage.getIntQuestRecordEx(7265, "mapR");
if (mapR > 0) {
        stage.showSystemMessage("透過Boss選單移動的玩家返回原本的地圖。");
        stage.updateQuestRecordEx(7265, "");
        stage.changeMap(mapR, 0);
} else {
        stage.changeMap(211042200, 2);
}