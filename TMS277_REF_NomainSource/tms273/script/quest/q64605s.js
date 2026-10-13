// Created by MetaMS
// Quest ID:64605
// [我的小屋]另一个我的小屋？


npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b阿爾文！艾咪！有聽凱妮司說了嗎？");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b那個… 幫助指的是會幫忙蓋更大的房子嗎？");
npc.id(9400920).ui(1).noEsc().next().say("#face3##h0#...為什麼突然眼睛發亮…？");
npc.id(9400921).ui(1).noEsc().next().say("#face1#雖然沒有仔細聽，但聽說如果想要更大的房子，凱妮司是我們村莊裡唯一可以幫忙的人。");
npc.id(9400920).ui(1).noEsc().next().say("#face1#凱妮司家的大門永遠都為居民敞開，所以如果你好奇的話，不如去看看？");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b可以陪我一起去嗎？");
npc.id(9400921).ui(1).noEsc().next().say("#face2#當然！");
npc.id(9400920).ui(1).noEsc().next().say("#face2#當然~給我薪水的話。呵呵");
npc.id(9400921).ui(1).noEsc().next().say("#face1#開玩笑的，#h0#。現在走吧？");
npc.startQuest();
stage.startNavigation(map.getId(), 0, "out00", 0);