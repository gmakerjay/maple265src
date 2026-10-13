// Created by MetaMS
// Event:Platformer

//進行次數重置檢測  QuestId:18838
//獲得的星星總數  QuestId:18869  starSum

let count = stage.getQuestRecordEx(18838, "count");
if ("".equals(count)) {
        count = 99;
        stage.updateQuestRecordEx(18838, "count", count);
        stage.updateQuestRecordEx(18838, "stageT", "0");
        stage.updateQuestRecordEx(18838, "stage", "0");
        stage.updateQuestRecordEx(18869, "starSum", "0");
        stage.updateQuestRecordEx(18870, "timeSum", "0");
}
let idx = stage.getIntQuestRecordEx(500651, "1");
stage.openUIWithOption(1112, idx);