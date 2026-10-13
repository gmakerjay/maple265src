// Created by MetaMS
// ID:[941000001]
// MapName:從祭壇出來的路
// 從祭壇出來的路

if (map.getId() == 941000001) {
        let selection = npc.id(2012041).askMenu("\r\n亞爾卡努斯的力量絲毫沒有減弱。再次帶您到地下水道入口。\r\n\r\n#b#L1# 回到地下水道。#k#l\r\n#b#L2# 對話結束。#k#l");
        if (selection == 1) {
                stage.changeMap(941000000, 0);
        }
} else {
        if (npc.id(2012041).askYesNo("如果準備好了，將會帶您過去。\r\n\r\n#b#e現在移動到祭壇嗎？#n#k")) {
                /* Response is Yes */
                stage.changeMap(941000200, 0);
        } else {
                /* Response is No */
                npc.id(2012041).say("那麼，請整頓完畢後再試。");
        }
}