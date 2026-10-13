// Created by MetaMS

if (map.getActiveMobCount() == 0) {
        if (npc.me().askYesNo("要完成戰鬥離開嗎？？")) {
                stage.changeMap(807300100, 0);
        }
} else {
        stage.showSystemMessage("戰鬥正在進行中。如欲離開，請點擊傳送點。");
}
