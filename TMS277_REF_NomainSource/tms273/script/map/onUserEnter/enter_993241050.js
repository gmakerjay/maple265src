// Created by MetaMS
// ID:[993241050]
// MapName:雪原封印區域入口


stage.resetForcedStat();
if (!stage.isQuestStarted(26216) && !stage.isQuestCompleted(26216)) {
        stage.startQuest(26216);//Quest Name:[史詩副本] 太陽神米特拉
        /* Update Quest RecordEx | Id:26216 | Name: [史詩副本] 太陽神米特拉 | Data: "dir=0" */
        stage.updateQuestRecordEx(26216, "dir", "0");
        npc.id(3006701).ui(1).noEsc().next().say("#face0#現在到了最終章了嗎？");
        npc.id(3006701).ui(1).noEsc().next().say("#face0#……賽蓮這小子，居然在來到這裡的期間都沒看到他。");
        npc.id(3006701).ui(1).noEsc().next().say("#face0#難道他走在我前面…");
        npc.id(3006701).ui(1).noEsc().next().say("#face0#哼，等等看就知道了。");
        stage.startNavigation(993241050, 0, "go_to_midboss", 0);
}