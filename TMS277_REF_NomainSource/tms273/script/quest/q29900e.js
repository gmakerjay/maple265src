// Created by MetaMS
// Quest ID:29900
// 新手冒險家


if (stage.gainItem(1142107, 1)) {
        npc.startQuest();
        npc.completeQuest();
        stage.showSystemMessage("已獲得<新手冒險家>勳章了。");
} else {
        npc.next().say("背包空間不足，請清理後在跟我對話吧!");
}
