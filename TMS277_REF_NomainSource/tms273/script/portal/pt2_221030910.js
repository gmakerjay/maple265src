// Created by MetaMS
// ID:[221030910]
// MapName:通風口D-77
// 通風口D-77

if (map.getActiveMobCount() > 0) {
        stage.showSystemMessage("戰鬥進行中，想要退出的話請點擊傳送點。");
} else if (npc.ui(1).npcFlip().meFlip().askYesNo("要回到原本的地方嗎？")) {
        /* Response is Yes */
        stage.showSystemMessage("前往主控室。");
        stage.changeMap(221030900, 0);
}