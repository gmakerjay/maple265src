// Created by MetaMS
// [白雪覆蓋的恢復的祭壇]  |  [9062958]
// MapName:Unknown

if ("1".equals(stage.getQuestRecordEx(101489, "npcHeal"))) {
        dir.npcId(9062891).duration(3000).text("喂！會充滿力量吧？").scale(300).addPopupSay();
        /* Update Quest RecordEx | Id:101489 | Name: [Maple19冒險] 全新的冒險開始 | Data: "npcHeal=0;lazy=0;enter=1;result=0" */
        stage.updateQuestRecordEx(101489, "npcHeal", "0");
        stage.revival(100);
} else {
        stage.showSystemMessage("還不能使用恢復祭壇。");
}