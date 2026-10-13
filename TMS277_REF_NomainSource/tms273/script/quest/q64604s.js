// Created by MetaMS
// Quest ID:64604
// [我的小屋]谢谢你，凯尼斯

let entity_4 = parseInt(stage.getTempValue("entity_4"));
npc.id(9400922).ui(1).noEsc().next().say("#face1#忘了跟你打招呼，我是這個村莊的建築師，我叫做凱妮司。很高興認識你！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b我也很開心。請多多指教！");
npc.id(9400922).ui(1).noEsc().next().say("#face0#這麼有名的勇士居然搬來我們村莊，真是神奇。覺得變得比較安心了。");
npc.id(9400922).ui(1).noEsc().next().say("#face0#我在這裡定居之前，也曾經是楓之谷的勇士。雖然已經是過去的事了… ");
npc.id(9400922).ui(1).noEsc().next().say("#face0#以前的故事之後再跟你說，你怎麼會搬過來？因為已經空很久了，沒想到會有人搬進來。");
npc.id(9400920).ui(1).noEsc().next().say("#face3#哈哈，我們村莊還蠻有名的吧？是吧？哈哈");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b沒錯… ");
npc.id(9400922).ui(1).noEsc().next().say("#face0#看起來有點小，住起來還行嗎？");
npc.id(9400922).ui(1).noEsc().next().say("#face1#如果需要幫助的話，不論何時都可以來找我。別看我這樣，這村莊裡的房子大部分都是我蓋的呢！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b真的嗎？");
npc.id(9400922).ui(1).noEsc().next().say("#face1#當然啊，呵呵");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b謝謝！");
npc.id(9400922).ui(1).noEsc().next().say("#face0#那之後再見了。");
npc.completeQuest();
stage.destroyTempNpc(entity_4);