// Created by MetaMS
// Quest ID:64602
// [我的小屋]搬家聚会


// Inventory Operation with 1 operations.
if (stage.canHold(2672018, 1)) {
        let entity_5 = parseInt(stage.getTempValue("entity_5"));
        stage.gainItem(2672018, 1);
        npc.completeQuest();
        npc.id(9400924).ui(1).noEsc().next().say("#face0#[#i2672018:##t2672018#] \r\n這個，是喬遷賀禮。");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b哇！是你親自做的嗎？好帥。要怎麼做才能讓他長得這麼漂亮？連葉子都在發光！");
        npc.id(9400924).ui(1).noEsc().next().say("#face0#… 這是我買來的。");
        npc.ui(1).npcFlip().meFlip().noEsc().next().say("#b哇…謝謝米蘭達。我會好好照顧他的。");
        stage.destroyTempNpc(entity_5);
} else {
        npc.id(9400924).ui(1).noEsc().next().say("#face0# 背包空間不足，請清理後在跟我對話吧!");
}
