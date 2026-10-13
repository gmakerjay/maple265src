// Created by MetaMS
// Quest ID:64597
// [我的小屋]搬家聚会的准备


npc.id(9400921).ui(1).noEsc().next().say("#face1##h0#！我想了一下，現在好像需要一張桌子了。還有一些裝飾空蕩蕩牆壁的小物！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b那就太好了！從哪裡可以獲得桌子跟裝飾小物呢？");
npc.id(9400921).ui(1).noEsc().next().say("#face0#裝飾小物可以跟廣場的米蘭達的跳蚤市場購買。");
npc.id(9400921).ui(1).noEsc().next().say("#face0#家具需要去其他村莊的工坊購買，但現在時間所剩不多了，拜託艾丹幫忙好像會比較好。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#我會去找艾丹，你可以跟艾咪一起去米蘭達的跳蚤市場買裝飾小物嗎？");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b我知道了！");
npc.startQuest();