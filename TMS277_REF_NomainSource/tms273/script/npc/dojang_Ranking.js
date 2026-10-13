// Created by MetaMS
// [武陵排行榜]  |  [2091010]
// MapName:武陵道場入口


/* Update Quest RecordEx | Id:100472 | Name: Unknown | Data: "" */
//stage.updateQuestRecordEx(100472, "");
/* Update Quest RecordEx | Id:100472 | Name: Unknown | Data: "dojangRankJob=0" */
//stage.updateQuestRecordEx(100472, "dojangRankJob=0");
/* Update Quest RecordEx | Id:100472 | Name: Unknown | Data: "dojangRankJob=0;dojangRank2=0" */
//stage.updateQuestRecordEx(100472, "dojangRankJob=0;dojangRank2=0");
stage.showDojangRank();
stage.showSystemMessage("武陵道場的紀錄反映到排名上，可能會花一點時間。核計點數是在清算每週的排行後，以全體排行為基準來進行發給。");
dir.npcId(2091011).duration(1100).text("核計點數是在清算每週的排行後，以#r全體排行#k為基準來進行發給。").addPopupSay();