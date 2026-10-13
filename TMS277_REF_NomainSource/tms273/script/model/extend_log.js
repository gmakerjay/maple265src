let extendLog = exports;

extendLog.getPQLog = function (stage, util, questId, resetDay) {
        let count = stage.getIntQuestRecordEx(questId, "count");
        let date = stage.getIntQuestRecordEx(questId, "date");//Format yyyyMMdd
        let logTime = util.getTimeStringToLong(date, "yyyyMMdd");
        let resetTime = logTime + resetDay * 24 * 60 * 60 * 1000;
        let nowTime = new Date().getTime();
        if (nowTime >= resetTime) {
                count = 0;
                stage.updateQuestRecordEx(questId, "count", count);
                stage.updateQuestRecordEx(questId, "date", util.getStringDate("yyyyMMdd"));
        }
        return count;
}

extendLog.addPQLog = function (stage, util, questId, value) {
        let count = stage.getIntQuestRecordEx(questId, "count") + value;
        if (stage.getIntQuestRecordEx(questId, "date") <= 0) {
                stage.updateQuestRecordEx(questId, "date", util.getStringDate("yyyyMMdd"));
        }
        stage.updateQuestRecordEx(questId, "count", count);
}

extendLog.getEventLog = function (stage, util, questId, resetDay) {
        let count = stage.getIntQuestRecordExShare(questId, "count");
        let date = stage.getIntQuestRecordExShare(questId, "date");//Format yyyyMMdd
        let logTime = util.getTimeStringToLong(date, "yyyyMMdd");
        let resetTime = logTime + resetDay * 24 * 60 * 60 * 1000;
        let nowTime = new Date().getTime();
        if (nowTime >= resetTime) {
                count = 0;
                stage.updateQuestRecordExShare(questId, "count", count);
                stage.updateQuestRecordExShare(questId, "date", util.getStringDate("yyyyMMdd"));
        }
        return count;
}

extendLog.addEventLog = function (stage, util, questId, value) {
        let count = stage.getIntQuestRecordExShare(questId, "count") + value;
        if (stage.getIntQuestRecordExShare(questId, "date") <= 0) {
                stage.updateQuestRecordExShare(questId, "date", util.getStringDate("yyyyMMdd"));
        }
        stage.updateQuestRecordExShare(questId, "count", count);
}