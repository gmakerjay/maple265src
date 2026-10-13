// Created by MetaMS
// [傳送門]  |  [9091008]
// MapName:西格諾斯殿堂

if (map.getId() != 271040000) {
        if (npc.id(2143004).askYesNo("確定要結束戰鬥，回到西格諾斯後院嗎？")) {
                let target = parseInt(map.getId() / 1000) * 1000 + 210;
                stage.changeMap(target, 0);
        }
}