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
extendLog.getPQLogWeek = function (stage, util, questId) {
        let count = stage.getIntQuestRecordEx(questId, "count");
        let date = stage.getIntQuestRecordEx(questId, "date");//Format yyyyMMdd
        let logTime = util.getTimeStringToLong(date, "yyyyMMdd");
        if (!util.isSameWeek(logTime, new Date().getTime())) {
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
//用於判斷周常任務，如果不是同一周，就重置
extendLog.getEventLogWeek = function (stage, util, questId) {
        let count = stage.getIntQuestRecordExShare(questId, "count");
        let date = stage.getIntQuestRecordExShare(questId, "date");//Format yyyyMMdd
        let logTime = util.getTimeStringToLong(date, "yyyyMMdd");
        if (!util.isSameWeek(logTime, new Date().getTime())) {
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
//判斷隊伍玩家賬號是否可入場BOSS（周）
extendLog.checkEventClearLogWeek = function (party, util, clearTimes, difficulty) {
        let bossMsg = []
        //先取要挑戰boss信息
        for (key in clearTimes) {
                if (clearTimes[key][0] == difficulty) {
                        bossMsg = clearTimes[key];
                }
        }
        //判斷所有成員是否滿足入場
        let members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let count = members[i].getIntQuestRecordExShare(bossMsg[1], "count");
                let date = members[i].getIntQuestRecordExShare(bossMsg[1], "date");//Format yyyyMMdd
                let logTime = util.getTimeStringToLong(date, "yyyyMMdd");
                if (!util.isSameWeek(logTime, new Date().getTime())) {
                        //不是同一周，重置次數
                        count = 0;
                        members[i].updateQuestRecordExShare(bossMsg[1], "count", count);
                        members[i].updateQuestRecordExShare(bossMsg[1], "date", util.getStringDate("yyyyMMdd"));

                }
                if (count >= bossMsg[2]) {
                        return members[i].getCharacterName();
                }
        }
        return null;

}
//判斷隊伍玩家賬號是否可入場BOSS（天）
extendLog.checkEventClearLog = function (party, util, clearTimes, difficulty) {
        let bossMsg = []
        //先取要挑戰boss信息
        for (key in clearTimes) {
                if (clearTimes[key][0] == difficulty) {
                        bossMsg = clearTimes[key];
                }
        }
        //判斷所有成員是否滿足入場
        let members = party.getLocalMembers();
        for (let i = 0; i < members.length; i++) {
                let count = members[i].getIntQuestRecordExShare(bossMsg[1], "count");
                let date = members[i].getIntQuestRecordExShare(bossMsg[1], "date");//Format yyyyMMdd
                let logTime = util.getTimeStringToLong(date, "yyyyMMdd");
                let resetTime = logTime + 24 * 60 * 60 * 1000;
                let nowTime = new Date().getTime();
                if (nowTime >= resetTime) {
                        count = 0;
                        members[i].updateQuestRecordExShare(bossMsg[1], "count", count);
                        members[i].updateQuestRecordExShare(bossMsg[1], "date", util.getStringDate("yyyyMMdd"));
                }
                if (count >= bossMsg[2]) {
                        return members[i].getCharacterName();
                }
        }
        return null;

}
//將副本挑戰記錄信息
extendLog.addBossEventLog = function (stage, util, questId, value, memberNames, usedTime) {
        let count = stage.getIntQuestRecordExShare(questId, "count") + value;
        // if (stage.getIntQuestRecordExShare(questId, "date") <= 0) {
        stage.updateQuestRecordExShare(questId, "date", util.getStringDate("yyyyMMdd"));
        // }
        stage.updateQuestRecordExShare(questId, "count", count);
        stage.updateQuestRecordExShare(questId, "memberNames", memberNames);
        stage.updateQuestRecordExShare(questId, "usedTime", usedTime);
}
//根據怪物ID獲取副本名稱
extendLog.getENameByMobId = function (mobId) {
        let ename = "未知";
        switch (mobId) {
                case 8800022:
                        ename = "扎昆(Easy)";
                        break;
                case 8800002:
                        ename = "扎昆(Normal)";
                        break;
                case 8800102:
                        ename = "扎昆(Chaos)";
                        break;
                case 8880010:
                        ename = "梅格耐斯(Easy)";
                        break;
                case 8880002:
                        ename = "梅格耐斯(Normal)";
                        break;
                case 8880000:
                        ename = "梅格耐斯(Hard)";
                        break;
                case 8500002:
                        ename = "拉圖斯(Easy)";
                        break;
                case 8500012:
                        ename = "拉圖斯(Normal)";
                        break;
                case 8500022:
                        ename = "拉圖斯(Chaos)";
                        break;
                case 9421581:
                        ename = "森蘭丸(Normal)";
                        break;
                case 9421589:
                        ename = "森蘭丸(Hard)";
                        break;
                case 8810214:
                        ename = "暗黑龍王(Easy)";
                        break;
                case 8810018:
                        ename = "暗黑龍王(Normal)";
                        break;
                case 8810122:
                        ename = "暗黑龍王(Chaos)";
                        break;
                case 8870000:
                        ename = "希拉(Normal)";
                        break;
                case 8870100:
                        ename = "希拉(Hard)";
                        break;
                case 8920106:
                        ename = "血腥皇后(Normal)";
                        break;
                case 8920006:
                        ename = "血腥皇后(Chaos)";
                        break;
                case 8900103:
                        ename = "比艾樂(Normal)";
                        break;
                case 8900003:
                        ename = "比艾樂(Chaos)";
                        break;
                case 8910100:
                        ename = "斑斑(Normal)";
                        break;
                case 8910000:
                        ename = "斑斑(Chaos)";
                        break;
                case 8930100:
                        ename = "貝倫(Normal)";
                        break;
                case 8930000:
                        ename = "貝倫(Chaos)";
                        break;
                case 8840007:
                        ename = "凡雷恩(Easy)";
                        break;
                case 8840000:
                        ename = "凡雷恩(Normal)";
                        break;
                case 8840014:
                        ename = "凡雷恩(Hard)";
                        break;
                case 8820001:
                        ename = "皮卡啾(Normal)";
                        break;
                case 8820212:
                        ename = "皮卡啾(Chaos)";
                        break;
                case 8850111:
                        ename = "西格諾斯(Easy)";
                        break;
                case 8850011:
                        ename = "西格諾斯(Normal)";
                        break;
                case 9450022:
                        ename = "濃姬(Normal)";
                        break;

                case 8881102:
                        ename = "斯烏(Normal)";
                        break;
                case 8881152:
                        ename = "斯烏(Hard)";
                        break;
                case 8881202:
                        ename = "斯烏(Extreme)";
                        break;
                case 8880111:
                        ename = "戴米安(Normal)";
                        break;
                case 8880101:
                        ename = "戴米安(Hard)";
                        break;
                case 8880155:
                        ename = "路西德(Easy)";
                        break;
                case 8880150:
                        ename = "路西德(Normal)";
                        break;
                case 8880153:
                        ename = "路西德(Hard)";
                        break;
                case 8880362:
                        ename = "威爾(Easy)";
                        break;
                case 8880342:
                        ename = "威爾(Normal)";
                        break;
                case 8880302:
                        ename = "威爾(Hard)";
                        break;
                case 8880711:
                        ename = "天使綠水靈(Normal)";
                        break;
                case 8880700:
                        ename = "天使綠水靈(Chaos)";
                        break;
                case 8644650:
                        ename = "戴斯克(Normal)";
                        break;
                case 8644655:
                        ename = "戴斯克(Chaos)";
                        break;
                case 8645009:
                        ename = "頓凱爾(Normal)";
                        break;
                case 8645066:
                        ename = "頓凱爾(Hard)";
                        break;
                case 8880405:
                        ename = "真希拉(Normal)";
                        break;
                case 8880410:
                        ename = "真希拉(Hard)";
                        break;
                case 8880519:
                        ename = "黑魔法師(Hard)";
                        break;
                case 8880549:
                        ename = "黑魔法師(Extreme)";
                        break;
                case 8880632:
                        ename = "賽蓮(Normal)";
                        break;
                case 8880602:
                        ename = "賽蓮(Hard)";
                        break;
                case 8880652:
                        ename = "賽蓮(Extreme)";
                        break;
                case 8881012:
                        ename = "卡洛斯(Easy)";
                        break;
                case 8880802:
                        ename = "卡洛斯(Normal)";
                        break;
                case 8881032:
                        ename = "卡洛斯(Chaos)";
                        break;
                case 8881052:
                        ename = "卡洛斯(Extreme)";
                        break;
                case 8880912:
                        ename = "咖凌(Easy)";
                        break;
                case 8880842:
                        ename = "咖凌(Normal)";
                        break;
                case 8880942:
                        ename = "咖凌(Hard)";
                        break;
                case 8880972:
                        ename = "咖凌(Extreme)";
                        break;
                case 8881332:
                        ename = "林波(Normal)";
                        break;
                case 8881382:
                        ename = "林波(Hard)";
                        break;
        }
        return ename;
}