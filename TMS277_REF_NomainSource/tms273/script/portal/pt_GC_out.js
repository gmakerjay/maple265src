// Created by MetaMS
// ID:[450012210]
// MapName:靠近盡頭之處
// 靠近盡頭之處

if (map.getId() == 450012650 || map.getId() == 450012250) {
        if (map.getActiveMobCount() > 0) {
                stage.showSystemMessage("地圖中還有獎勵。如欲離開，請點擊傳送點。");
        } else {
                if (npc.ui(1).npcFlip().meFlip().askYesNo("擊退親衛隊長頓凱爾了。要回去嗎？")) {
                        /* Response is Yes */
                        usr.playPortalSE();
                        stage.changeMap(450012200, 2);
                }
        }
} else {
        stage.showSystemMessage("戰鬥進行中，想要退出的話請點擊傳送點。");
}