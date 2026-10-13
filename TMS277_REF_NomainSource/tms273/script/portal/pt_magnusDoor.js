// Created by MetaMS
// ID:[401060300]
// MapName:暴君的王座
// 暴君的王座

if (map.getActiveMobCount() > 0) {
        stage.showSystemMessage("戰鬥進行中。想要退場的話請點擊傳送點。");
} else {
        if (npc.me().askYesNo("結束戰鬥，要出去了嗎？")) {
                if (map.getId() == 940100200) {
                        stage.changeMap(940100100, 2);
                } else {
                        stage.changeMap(401060000, 1);
                }
        }
}