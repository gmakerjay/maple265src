// Created by MetaMS
// ID:[272020200]
// MapName:阿卡伊農的祭壇
// 阿卡伊農的祭壇

if (map.getActiveMobCount() > 0) {
        stage.showSystemMessage("戰鬥進行中，想要退出的話請點擊傳送點。");
} else if (npc.id(2144017).askYesNo("結束戰鬥，要從阿卡伊農的祭壇退出嗎？")) {
        stage.changeMap(272020110, 0);
}