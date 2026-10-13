// Created by MetaMS
// Quest ID:26219
// [史詩副本] 高山探險完成


npc.id(3006700).next().say("我的新抒情歌#e<史詩副本：高山>#n怎麼樣呢？\r\n作為聽我新歌的回報，我準備了一個小禮物！\r\n\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i1143348# #t1143348# ");
// Inventory Operation with 1 operations.
if (stage.gainItem(1143348, 1)) {
        npc.completeQuest();
        npc.id(3006700).say("已經送你一個小勛章作為禮物了。\r\n請確認物品欄！");
} else {
        npc.id(3006700).say("背包空間不足");
}
