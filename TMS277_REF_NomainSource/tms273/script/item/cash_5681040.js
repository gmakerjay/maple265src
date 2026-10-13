// Created by MetaMS
// ID:[5681040]


stage.updateQuestRecordExShare(503103, "count", "1");
stage.updateQuestRecordExShare(503103, "start", "1");
stage.updateQuestRecordExShare(503103, "EndDate", util.getStringDate(new Date().getTime() + 30 * 24 * 60 * 60 * 1000, "yy/MM/dd"));
stage.updateQuestRecordExShare(503103, "daily", "0");//Today use
stage.updateQuestRecordExShare(503103, "count1", "0");
stage.updateQuestRecordExShare(503103, "count2", "0");
stage.updateQuestRecordExShare(503103, "StartDate", util.getStringDate("yy/MM/dd"));
stage.updateQuestRecordExShare(503103, "lastDate", util.getStringDate(new Date().getTime() + 30 * 24 * 60 * 60 * 1000, "yy/MM/dd"));
stage.updateQuestRecordExShare(503103, "gauge", "0");//
stage.updateQuestRecordExShare(503103, "tuto", "1");
stage.showSystemMessage("靈魂艾爾達加速器已活化。");
ctx.consume();