// Created by MetaMS
// Quest ID:64605
// [我的小屋]另一个我的小屋？


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