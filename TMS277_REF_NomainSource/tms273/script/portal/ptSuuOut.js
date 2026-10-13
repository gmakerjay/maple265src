// Created by MetaMS
// ID:[350067500]
// MapName:暴走的船艦
// 暴走的船艦

if (map.getId() == 350068600 || map.getId() == 350067600 || map.getId() == 350066600) {
        if (map.getActiveMobCount() > 0) {
                stage.showSystemMessage("地圖中還有獎勵。如欲離開，請點擊傳送點。");
        } else {
                if (npc.ui(1).npcFlip().meFlip().askYesNo("已消滅史烏。要回去嗎？")) {
                        /* Response is Yes */
                        usr.playPortalSE();
                        stage.changeMap(350060300, 0);
                }
        }
} else {
        stage.showSystemMessage("戰鬥進行中，想要退出的話請點擊傳送點。");
}
