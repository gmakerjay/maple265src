// Created by MetaMS
// Quest ID:64592
// [我的小屋]到洒满阳光的地方去

npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b恩…我是剛搬來的人。");
npc.id(9400921).ui(1).noEsc().next().say("#face3#搬家嗎？恩…我以為那是沒有人的房子，原來不是啊。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#我是住你隔壁的阿爾文。人家說擦肩而過都算是緣分，我們居然可以變成鄰居，很高興認識你！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b很高興認識你…雖然不知道我到底能不能住在這個房子裡，請多多指教。");
npc.id(9400921).ui(1).noEsc().next().say("#face2#恩~~ 看起來很雅致，應該很適合一個人居住吧？稍微整理一下應該就可以了！我會幫忙的，不要擔心。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#首先應該要丟掉這個破碎的椅子。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#這個我來清理，先把床搬到有日照充足窗邊如何？");
eff.term(900).key("0").ry(-80).z(12).uol("Effect/DirectionWz2.img/effect/myHomeTuto/2").location(4).removeAfter(-1).setLayerOn();
npc.id(9400921).ui(1).noEsc().next().say("#face1#我的小屋選單中按下#i3801392##t3801392#，可以進入能夠移動家具的佈置模式。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#在佈置模式中點擊床之後，在想要的位置再次點擊，便完成囉！");
eff.term(300).key("0").setLayerOff();
npc.id(9400921).ui(1).noEsc().next().say("#face2#可以試一下嗎？先把床移動到想要的位置，再跟我對話吧。");
stage.updateQuestRecordExShare(500767, "3", "1");
npc.startQuest();//Quest Name:[我的小屋]到洒满阳光的地方去