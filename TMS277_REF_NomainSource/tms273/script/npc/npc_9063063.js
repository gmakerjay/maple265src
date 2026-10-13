// Created by MetaMS
// [冠軍冒險者]  |  [9063063]
// MapName:準備室

if (map.getId() == 993234700) {
        let myBestPoint = stage.getIntQuestRecordEx(101615, "bestPoint");
        let worldBestPoint = stage.getIntQuestRecordExShare(503095, "bestPoint");
        let lastDate = stage.getIntQuestRecordEx(503094, "date");
        let logTime = util.getTimeStringToLong(lastDate, "yyMMdd");
        if (!util.isSameWeek(logTime, new Date().getTime())) {
                stage.updateQuestRecordEx(503094, "date", util.getStringDate("yyMMdd"));
                stage.updateQuestRecordEx(503094, "LastRank", "0");
        }
        let lastRank = stage.getIntQuestRecordEx(503094, "LastRank");  //排行記錄 需要查看全體排行後才能刷新
        let selection = npc.id(9063063).askMenu("\r\n勇士！再次歡迎你來到#b#e世界最強拳擊王SEASON2#n#k\r\n！\r\n#e- 上周排行(目前角色)：#n#r#e" + (lastRank <= 0 ? "無記錄" : lastRank) + "#n#k\r\n#e- 歷史最高分數(目前角色)：#n#r#e" + myBestPoint + "分#n#k\r\n#e- 世界內最高分數：#n#r#e" + worldBestPoint + "分#n#k\r\n#L1# #b移動至拳擊王入場準備區。#k#l\r\n#L2# #b請為我說明拳擊王入場準備區。#k#l ");
        if (selection == 1) {
                if (npc.id(9063063).askYesNo("勇士！移動時，#r增益效果將全數移除！#k\r\n\r\n#b#e確定要移動嗎？#n#k")) {
                        /* Response is Yes */
                        stage.cancelAllBuffStat();
                        if (ctx.makeEvent("event_punch_king_ex", false, stage) == null) {
                                npc.me().next().say("#e#r發生錯誤，請聯系管理員！");
                        }
                } else {
                        /* Response is No */
                        npc.id(9063063).say("做好心理準備再來找我吧！");
                }
        }
} else if (map.getId() == 993234701) {//Leave
        let point = stage.getIntQuestRecordEx(101615, "point");
        let myBestPoint = stage.getIntQuestRecordEx(101615, "bestPoint");
        let worldBestPoint = stage.getIntQuestRecordExShare(503095, "bestPoint");
        let str = "";
        if (point > 0) {
                str += "共達成 #r" + point + "#k分了耶？"
                if (point == myBestPoint) {
                        str += "\r\n果然厲害，老師！\r\n\r\n#e更新歷史最高紀錄：#n #r" + point + "分#k ";
                        stage.showSystemMessage("已登錄至排名。");
                }
                if (point == worldBestPoint) {
                        str += "\r\n#e更新世界內最高紀錄：#n #r" + point + "分#k ";
                }
                if (point == myBestPoint) {
                        str += "\r\n#r#e更新目前角色歷史分數：#r#e" + point + "分#n#k ";
                }
                str += "\r\n\r\n\r\n可透過排行榜查看目前排名！";
        }
        str += "\r\n現在要做什麼呢？\r\n#L1# #b#e想重新挑戰#n#k。#k#l\r\n#L2#想返回待機室。#k#l";
        let selection = npc.id(9063063).askMenu(str);
        if (selection == 1) {
                if (npc.id(9063063).askYesNo("不斷挑戰的人最美麗！\r\n要再次前往入場準備區嗎？\r\n\r\n#r(※ 重新挑戰不會解除加持效果。)#k")) {
                        /* Response is Yes */
                        if (ctx.makeEvent("event_punch_king_ex", false, stage) == null) {
                                npc.me().next().say("#e#r發生錯誤，請聯系管理員！");
                        }
                }
        } else if (selection == 2) {
                if (npc.id(9063063).askYesNo("辛苦了！\r\n要立刻前往待機室嗎？")) {
                        /* Response is Yes */
                        /* Update Quest RecordEx | Id:101615 | Name: Unknown | Data: "point=0;rMap=410007521;jobcode=1314;state=0;bestPoint=1448" */
                        //stage.updateQuestRecordEx(101615, "point=0;rMap=410007521;jobcode=1314;state=0;bestPoint=1448");
                        stage.updateQuestRecordEx(101615, "state", "2");
                        stage.changeMap(993234700, 0);
                } else {
                        /* Response is No */
                        npc.id(9063063).say("決定好再來找我吧！");
                }
        }
} else if (map.getId() == 993234800) {
        if (npc.id(9063063).askYesNo("勇士！我好像聽到觀眾們的吶喊聲了耶！\r\n#b#e你要前往參加拳擊王嗎？#n#k")) {
                /* Response is Yes */
                /* Update Quest RecordEx | Id:101616 | Name: Unknown | Data: "date=241016;firstTry=2;check=0" */
                //stage.updateQuestRecordEx(101616, "date=241016;firstTry=2;check=0");
                let firstTry = stage.getIntQuestRecordEx(101616, "firstTry") + 1;
                stage.updateQuestRecordEx(101616, "firstTry", String(firstTry));
                stage.changeMap(993234900, 0);
        } else {
                /* Response is No */
                /* Update Quest RecordEx | Id:101616 | Name: Unknown | Data: "check=0" */
                //stage.updateQuestRecordEx(101616, "check=0");
                npc.id(9063063).say("請在完成準備後重新嘗試！");
        }
}