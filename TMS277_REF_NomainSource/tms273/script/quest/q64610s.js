// Created by MetaMS
// Quest ID:64610
// [我的小屋]管家的工作
let type = stage.getIntQuestRecordExShare(500773, "manager");
let npcId = 9400920 + type;
if (stage.canHold(2630702, 1)) {
        npc.id(npcId).ui(1).noEsc().next().say("#face1##h0#！我身為管理人，有稍加苦思能夠幫助#h0#的方法。");
        eff.term(900).key("1").ry(-80).z(12).uol("Effect/DirectionWz2.img/effect/myHomeTuto/6").location(4).removeAfter(-1).setLayerOn();
        npc.id(npcId).ui(1).noEsc().next().say("#face1#那就是．．．特地為了#h0#練習了小小的BUFF！雖然不是什麼了不起的東西，但畢竟還是我的小小心意一天一次，一定要記得領取喔！");
        npc.id(npcId).ui(1).noEsc().next().say("#face1#雖然實力平平，應該會逐漸增加吧？因為未來我們要一起度過的時間還很長！");
        eff.term(300).key("1").setLayerOff();
        npc.id(npcId).ui(1).noEsc().next().say("#face2#我會一直待在這裡，有什麼好奇的事情，或是需要幫助的話，歡迎來找我。");
        npc.id(npcId).ui(1).noEsc().next().say("#face1#對了，這是克蘭西亞居民們準備的禮物。#h0#，雖然有點晚了，還是要謝謝你成為我們的鄰居。");
        // Inventory Operation with 1 operations.
        stage.gainItem(2630702, 1);
        npc.completeQuest();
        /* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "finishTime=-608;1=1;type=0;2=1;3=1;4=1;entrance=1;6=1;7=1;managerXpos=100;managerYpos=100" */
        stage.updateQuestRecordExShare(500767, "6", "1");
        /* Update Quest RecordEx | Id:500763 | Name: [我的小屋]家？家！我的家！ | Data: "end=1;season=null;name=Nice破風使者;CID=17579860;cid=17579860" */
        stage.updateQuestRecordExShare(500763, "end", "1");
        stage.startQuest(500820);//Quest Name:[myHome] mirandaShop dummy
} else {
        npc.id(npcId).ui(1).noEsc().next().say("#face0# 背包空間不足，請清理後在跟我對話吧!");
}