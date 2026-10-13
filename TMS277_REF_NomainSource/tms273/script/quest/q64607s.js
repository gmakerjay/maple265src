// Created by MetaMS
// Quest ID:64607
// [我的小屋]2层蘑菇屋的生活

if (stage.onMyHome()) {
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b這裡真的是我家… ");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b之後可以隨心所欲的佈置這個空間了嗎？");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b超讚讚讚讚！真的好漂亮！");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b但是…要從哪裡開始呢？...");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b到現在為止多虧了阿爾文跟艾咪，才能愉快又順利的完成… ");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b他們…之後也會陪著我嗎？");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b請阿爾文跟艾咪當你的管理員吧！");
        npc.completeQuest();
} else {
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b建築好像完成了。回家看看吧。\r\n(※該任務僅能在我的小屋中進行。)");
}

