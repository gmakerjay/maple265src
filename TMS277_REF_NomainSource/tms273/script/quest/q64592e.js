// Created by MetaMS
// Quest ID:64592
// [我的小屋]到洒满阳光的地方去

if ("1".equals(stage.getQuestData(64592))) {
        npc.id(9400921).ui(1).noEsc().next().say("#face0#果然！只是把床換個位置，家裡看起來就更寬敞也更溫馨！");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#要不要在床上躺一下？");
        npc.id(9400921).ui(1).noEsc().next().say("#face2#靠近床邊，點擊後便可以躺下。\r\n你就當作我不在，放輕鬆躺著吧！");
        npc.completeQuest();
        stage.startQuest(64593);//Quest Name:[我的小屋]要躺会儿吗？
} else {
        npc.id(9400921).ui(1).noEsc().next().say("#face1#還沒移動家具呢，沒關係，第一次總是比較困難。我慢慢地跟你重新說明一下。");
        eff.term(900).key("0").ry(-80).z(12).uol("Effect/DirectionWz2.img/effect/myHomeTuto/2").location(4).removeAfter(-1).setLayerOn();
        npc.id(9400921).ui(1).noEsc().next().say("#face1#首先在我的小屋選單中按下#i3801392##t3801392#，變更為可以移動家具的佈置模式。");
        npc.id(9400921).ui(1).noEsc().next().say("#face1#接下來點擊床之後，在想要的位置再次點擊便可以囉。");
        eff.term(300).key("0").setLayerOff();
        npc.id(9400921).ui(1).noEsc().next().say("#face2#請再試一次吧。");
}