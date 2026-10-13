// Created by MetaMS
// Quest ID:64598
// [我的小屋]米兰达的跳蚤市场

if (stage.hasItem(2671002, 1)) {
        npc.id(9400924).ui(1).noEsc().next().say("#face0#如何？");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b恩… ");
        npc.id(9400920).ui(1).noEsc().next().say("#face1#米蘭達! 太帥了，居然保存了樹木原有的韻味！你的實力好像逐漸增加了呢。");
        npc.id(9400924).ui(1).noEsc().next().say("#face1#呼。\r\n(好像在盯著我。) ");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b好…好帥！");
        npc.id(9400924).ui(1).noEsc().next().say("#face0#之後有新商品，我再來逛逛。");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b謝謝，下次再見！");
        npc.id(9400920).ui(1).noEsc().next().say("#face1##h0#，現在回家吧。");
        npc.completeQuest();
        stage.startNavigation(871000000, 0, "goHome", 0);
} else {
        stage.openShop(9400943);
}
// Inventory Operation with 2 operations.