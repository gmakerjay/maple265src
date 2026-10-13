// Created by MetaMS
// Quest ID:7707
// 凌晨重置任務

npc.completeQuest();

stage.resetFatigue();

let nDate = util.getStringDate("yyMMdd");
let cDate = stage.getQuestRecordExShare(503096, "date");
if (cDate != nDate) {
        stage.updateQuestRecordExShare(503096, "date", util.getStringDate("yyMMdd"));
        stage.updateQuestRecordExShare(503096, "mComplete", "0");
        stage.updateQuestRecordEx(503098, "m0", "0");
        stage.removeQuest(503098);
}