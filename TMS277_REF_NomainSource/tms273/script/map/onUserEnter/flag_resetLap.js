// Created by MetaMS
// ID:[942002500]
// MapName:夜晚的雪原

stage.resetForcedStat();
let date = stage.getQuestRecordEx(32581, "date");
if (date == "") {
        date = util.getStringDate("yy/MM/dd/HH/mm")
        stage.updateQuestRecordEx(32581, "date", date);
}
let logTime = util.getTimeStringToLong(date, "yy/MM/dd/HH/mm");
if (!util.isSameWeek(logTime, new Date().getTime())) {
        stage.updateQuestRecordEx(32581, "weekly", "0");
        stage.updateQuestRecordEx(32581, "weeklyRecord", "0");
        stage.updateQuestRecordEx(32581, "date", util.getStringDate("yy/MM/dd/HH/mm"));
}
stage.updateQuestRecordEx(32581, "lap", "0");
stage.updateQuestRecordEx(32581, "rank", "0");
stage.updateQuestRecordEx(32581, "pass", "0");
stage.updateQuestRecordEx(32581, "finish", "0");
/* Update Quest RecordEx | Id:32581 | Name: Unknown | Data: "complete=0;guildPoint=0;start=0;pass=0;lap=0;weekly=0;date=24/08/17/15/18;weeklyRecord=0;mode=1;record=0;finish=0;rank=0" */
//stage.updateQuestRecordEx(32581, "complete=0;guildPoint=0;start=0;pass=0;lap=0;weekly=0;date=24/08/17/15/18;weeklyRecord=0;mode=1;record=0;finish=0;rank=0");