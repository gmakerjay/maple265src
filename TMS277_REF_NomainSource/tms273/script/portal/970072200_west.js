// Created by MetaMS
// ID:[863010000]
// MapName:愛心樹的記憶

let mapR = 0;
let qR = stage.getQuestData(33553);
if (qR.length != 0) {
        mapR = parseInt(qR);
        stage.removeQuest(33553);
}
let qexR = stage.getIntQuestRecordEx(7265, "mapR");
if (qexR > 0) {
        mapR = qexR;
        stage.showSystemMessage("透過Boss選單移動的玩家返回原本的地圖。");
        stage.updateQuestRecordEx(7265, "");
}
if (mapR > 0) {
        stage.changeMap(mapR, 0);
} else {
        stage.changeMap(100000000, 0);
}