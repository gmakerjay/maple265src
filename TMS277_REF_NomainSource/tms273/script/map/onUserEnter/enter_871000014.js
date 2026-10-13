// Created by MetaMS
// ID:[871000014]
// MapName:凯尼斯的家


dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.removeAdditionalEffectEx();
let entity_1 = stage.spawnTempNpc(9400928, -200, 250, 0);
stage.setNpcSpecialAction(entity_1, "summon", 0, false);
let entity_2 = stage.spawnTempNpc(9400929, -300, 250, 0);
stage.setNpcSpecialAction(entity_2, "summon", 0, false);
eff.blind(true).binary(255).setLayerBlind();
cam.start(1000).end(2000).x(-150).y(80).setScaleAbsMove();
dir.setDelay(1000);
usr.text("#fs20##e建築家凱妮司的家").speed(50).time(2000).local(6).posX(-50).posY(-50).align(1).lineSpace(4).showTextEffect();
cam.delay(3000).x(350).setRelMove();
dir.setDelay(600);
eff.duration(1000).setLayerBlind();
dir.setDelay(1000);
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b哇…");
eff.blind(true).binary(255).duration(500).setLayerBlind();
dir.setDelay(500);
cam.x(250).y(300).setAbsMove();
cam.delay(3000).x(-350).setRelMove();
eff.duration(1000).setLayerBlind();
dir.setDelay(1000);
dir.moveDir(2).moveFixel(180).setForcedMove();
dir.setDelay(1000);
dir.setForcedFlip(-1);
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b哇！這是什麼？炎魔．．．桌子？！");
stage.setNpcForceMove(entity_1, 1, 20, 100);
npc.id(9400920).ui(1).noEsc().next().say("#face0#哇! 你怎麼知道的？！");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b一看就知道是炎魔的手吧？");
stage.setNpcForceMove(entity_2, 1, 80, 100);
npc.id(9400921).ui(1).noEsc().next().say("#face0#原來是這樣… 因為我們沒看過炎魔，不知道他長這樣。");
npc.id(9400921).ui(1).noEsc().next().say("#face1#聽說這個是凱妮司在冒險家時期，抓到炎魔後獲得的。");
npc.id(9400920).ui(1).noEsc().next().say("#face0#沒錯，這個故事我也好像聽了50次。");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b抓到炎魔之後獲得的桌子？");
npc.id(9400921).ui(1).noEsc().next().say("#face1#雖然我沒有拿到過，但聽說消滅楓之谷世界Boss怪，就可以獲得特別的家具。");
let entity_3 = stage.spawnTempNpc(9400931, 270, 260, 1);
stage.setNpcSpecialAction(entity_3, "summon", 0, false);
npc.id(9400921).ui(1).noEsc().next().say("#face0#現在聽說的有#t2672045:#、#t2672046:#、#t2672013:#？還有嗎，艾咪？");
npc.id(9400920).ui(1).noEsc().next().say("#face0#好像還聽說過#t2672052:#！");
stage.setNpcForceMove(entity_3, -1, 170, 100);
cam.delay(3000).x(100).setRelMove();
npc.id(9400922).ui(1).noEsc().next().say("#face1#除了這些，還可以獲得很多其他的。只是我們沒看過而已。如果是你，應該可以得到更多喔。");
dir.setForcedFlip(1);
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b凱妮司！");
npc.id(9400922).ui(1).noEsc().next().say("#face1#來的真快，呵呵");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b那個… ");
npc.id(9400922).ui(1).noEsc().next().say("#face0#本來的房子有點小吧？其實那間也是我蓋的。我學習建造之後蓋的第二個房子，第一個是這間。");
npc.id(9400922).ui(1).noEsc().next().say("#face0#雖然很喜歡，但又小又舊，我知道住起來有點不方便。");
npc.id(9400922).ui(1).noEsc().next().say("#face0#等我一下。");
dir.setDelay(300);
stage.setNpcSpecialAction(entity_3, "special", 3000, false);
dir.setDelay(3000);
npc.id(9400922).ui(1).noEsc().next().say("#face0#來，看看吧。如何？");
eff.blind(true).binary(150).duration(300).setLayerBlind();
eff.term(900).key("0").ry(-80).z(12).uol("Effect/DirectionWz2.img/effect/myHome/1").location(4).removeAfter(-1).setLayerOn();
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b這個房子要給我…？");
npc.id(9400921).ui(1).noEsc().next().say("#face1#太讚了！那個菇傘狀屋頂線條真優雅！");
npc.id(9400922).ui(1).noEsc().next().say("#face1#呵呵呵，如果你們答應我幾件事，我就把這間房子的藍圖給你。如何？");
eff.term(300).key("0").setLayerOff();
eff.duration(300).setLayerBlind();
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b什麼約定…?？");
npc.id(9400922).ui(1).noEsc().next().say("#face0#不會太困難的。");
npc.id(9400922).ui(1).noEsc().next().say("#face0#第一，房子是全然為了自己所創造的空間。這個房子給你之後，請打造自自己的空間。");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b當然！");
npc.id(9400922).ui(1).noEsc().next().say("#face0#第二，因為費力的狩獵跟戰鬥而疲憊時，回到家裡來休息吧。都說家是讓自己充電的空間。");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b那當然！");
npc.id(9400922).ui(1).noEsc().next().say("#face0#最後，希望你可以跟我們克蘭西亞的居民友好的相處。");
npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b當然。都是非常理所當然的事情，感覺不用特別約定也沒關係啊？");
let selection = npc.id(9400922).ui(1).noEsc().askMenu("#face1#呵呵呵，一忙起來，有可能會忘記這些理所當然的事。\r\n#b#L0# 我答應你，凱妮司。#l\r\n#L1# 好像難以答應，凱妮司。#l");
if (selection == 0) {
        npc.id(9400922).ui(1).noEsc().next().say("#face0#謝謝你能答應我，那以後就好好相處吧！");
} else {
        npc.id(9400922).ui(1).noEsc().next().say("#face0#呵呵，沒想到會是這個答案，有點慌張但相信你們會做得很好。你身邊這些朋友應該也會幫忙... ");
}
if (stage.canHold(2630598, 1)) {
        // Inventory Operation with 1 operations.
        stage.gainItem(2630598, 1);
        /* Update Quest RecordEx | Id:64605 | Name: [我的小屋]另一个我的小屋？ | Data: "chk=1;give=1" */
        stage.updateQuestRecordEx(64605, "give", "1");
        npc.id(9400922).ui(1).noEsc().next().say("#face1#[#i2630598:##t2630598#] \r\n來，拿著！這是要是給你的建築藍圖。");
        npc.id(9400922).ui(1).noEsc().next().say("#face1#雙擊背包消耗欄中的藍圖，可以啟用建築清單。");
        /* Update Quest RecordEx | Id:64605 | Name: [我的小屋]另一个我的小屋？ | Data: "chk=1;dir=1;give=1" */
        stage.updateQuestRecordEx(64605, "dir", "1");
        eff.term(900).key("1").ry(-80).z(12).uol("Effect/DirectionWz2.img/effect/myHomeTuto/5").location(4).removeAfter(-1).setLayerOn();
        npc.id(9400922).ui(1).noEsc().next().say("#face0#回家後在我的小屋選單中按下#i3801390#按鈕，選擇弓箭手村2層住屋後，接著選擇滿意的屋頂、外牆跟窗戶，就可以開始建造。");
        npc.id(9400922).ui(1).noEsc().next().say("#face0#有困難的話隨時都可以來找我，蓋出一個像樣的房子之後，記得邀請我去參觀。哈哈哈 ");
        eff.term(300).key("1").setLayerOff();
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b凱妮司，謝謝你！");
        npc.id(9400921).ui(1).noEsc().next().say("#face2#房子擴大的話，可以裝飾的地方也會增加吧？真興奮！");
        npc.id(9400920).ui(1).noEsc().next().say("#face2#什麼啊，好羨慕~！快來我們家開始建造吧。我要第一個參觀！");
        stage.completeQuest(64605);//Quest Name:[我的小屋]另一个我的小屋？
        /* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "1=1;2=1;3=1;4=1;entrance=0;7=1;managerXpos=100;managerYpos=100" */
        stage.updateQuestRecordExShare(500767, "1", "1");
} else {
        npc.id(9400922).ui(1).noEsc().next().say("#face1# 背包空間不足，請清理後在跟我對話吧!");
}
cam.setReturnToUser();
// Unhandled Ingame Direction Event [26] Packet: 1A BC 02 00 00 
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
stage.destroyTempNpc(entity_1);
stage.destroyTempNpc(entity_2);
stage.destroyTempNpc(entity_3);
stage.changeMap(871000001, 1);