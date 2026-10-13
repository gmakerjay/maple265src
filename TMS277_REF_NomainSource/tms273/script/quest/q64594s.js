// Created by MetaMS
// Quest ID:64594
// [我的小屋]放置沙发！


// Inventory Operation with 1 operations.
if (stage.canHold(2672015, 1)) {
        stage.gainItem(2672015, 1);
        npc.startQuest();
        npc.id(9400921).ui(1).noEsc().next().say("#face1# [#i2672015:##t2672015#] \r\n將將-！這是為了紀念我們成為鄰居，要給你的禮物。代替破碎的椅子，可以坐著休息的超~~軟沙發。");
        eff.term(900).key("0").ry(-80).z(12).uol("Effect/DirectionWz2.img/effect/myHomeTuto/3").location(4).removeAfter(-1).setLayerOn();
        npc.id(9400921).ui(1).noEsc().next().say("#face1#打開背包雙擊#t2672015:#後，便可以移動到#b[家具保管箱]#k。");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#接著在我的小屋選單中按下#b#i3801391##t3801391##k按鍵確認沙發，按下[佈置]後可以放置在想要的位置。但，不可以跟已經放好的床重疊。要試一下嗎？");
        eff.term(300).key("0").setLayerOff();
        npc.id(9400921).ui(1).noEsc().next().say("#face2#希望#h0#會喜歡！");
} else {
        npc.id(9400921).ui(1).noEsc().next().say("#face1# 背包空間不足，請清理後在跟我對話吧!");
}