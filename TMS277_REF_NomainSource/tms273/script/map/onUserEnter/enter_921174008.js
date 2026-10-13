// Created by MetaMS
// ID:[921174008]
// MapName:激鬥陣地出口

stage.resetForcedStat();
stage.revival(100);
let uiOpen = stage.getIntWorldShareRecord(259, "UI");
if (uiOpen > 0) {
        stage.openUI(1286);
        stage.updateWorldShareRecord(259, "UI", "0");
        stage.updateWorldShareRecord(259, "gameEnd", "0");
}