// Created by MetaMS
// Quest ID:64595
// [我的小屋]到广场逛逛


let selection = npc.id(9400921).ui(1).noEsc().askMenu("#face2#有時間的話，要不要跟我一起去廣場？順便介紹其他鄰居給你！\r\n#b#L0# 答應。#l\r\n#L1# 說今天很忙。#l");
if (selection == 0) {
        stage.startNavigation(map.getId(), 0, "out00", 0);
        npc.startQuest();
        npc.id(9400921).ui(1).noEsc().next().say("#face2#很好，跟我來！");
} else if (selection == 1) {
        npc.id(9400921).ui(1).noEsc().next().say("#face1#真可惜，那如果你可以去參觀廣場再跟我說，好嗎？");
}