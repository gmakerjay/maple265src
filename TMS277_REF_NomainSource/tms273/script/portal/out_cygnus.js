// Created by MetaMS
// ID:[271040100]
// MapName:西格諾斯殿堂
// 西格諾斯殿堂

if (map.getActiveMobCount() == 0) {
        if (npc.id(2143004).askYesNo("確定要結束戰鬥，回到西格諾斯後院嗎？")) {
                let target = parseInt(map.getId() / 1000) * 1000 + 210;
                stage.changeMap(target, 0);
        }
} else {
        stage.showSystemMessage("正在戰鬥中。想要離開的話，請點擊傳送點。");
}