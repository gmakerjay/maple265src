// Created by MetaMS
// ID:[105200710]
// MapName:皇后之城<混沌>
// 皇后之城<混沌>

if (map.getActiveMobCount() > 0) {
        stage.showSystemMessage("戰鬥進行中，想要退出的話請點擊傳送點。");
} else if (npc.me().askYesNo("要完成戰鬥離開嗎？？")) {
        stage.changeMap(105200000, 0);
}