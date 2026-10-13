// Created by MetaMS
// Quest ID:7313
// [闇黑龍王]敢死隊名譽隊員的象徵

npc.next().say("這洞窟裡有邪惡的龍#e#r闇黑龍王#k#n. 為了到這地方一定要擁有#e#b#t4001086##k#n狀態通過秘密通道.");
// Inventory Operation with 1 operations.
if (stage.gainItem(4001086, 1)) {
        npc.startQuest();
        npc.completeQuest();
        npc.next().say("有勇氣的人啊, 這物品好像對你比較需要.\r\n\r\n把#i4001086##e#b#t4001086##k#n送給你.");
        npc.say("擁有這個的者才能從#e#b敢死隊的暗號石版#k#n發現秘密通道. 如果失去證明請再次來找我.");
} else {
        npc.next().say("#face1# 背包空間不足，請清理後在跟我對話吧!");
}
