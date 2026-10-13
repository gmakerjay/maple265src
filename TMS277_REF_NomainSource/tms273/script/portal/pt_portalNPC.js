// Created by MetaMS
// ID:[211070300]
// MapName:見面室
// 見面室

if (map.getActiveMobCount() > 0) {
        stage.showSystemMessage("戰鬥正在進行中。如欲離開，請點擊傳送點。");
} else {
        if (npc.id(2161005).askYesNo("完成挑戰要從見面室離開嗎？")) {
                stage.changeMap(211060801, 0);
        }
}