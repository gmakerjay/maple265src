// Created by MetaMS
// ID:[942003002]
// MapName:夜晚的雪原：離場

stage.resetForcedStat();
/* Update Quest RecordEx | Id:32583 | Name: Unknown | Data: "flag=1" */
//stage.updateQuestRecordEx(32583, "flag=1");
// /* Update Quest RecordEx | Id:32581 | Name: Unknown | Data: "complete=0;guildPoint=1;start=240817151858719;pass=1;lap=1;weekly=100;date=24/08/17/15/18;weeklyRecord=184452;mode=1;record=184452;finish=240817152203171;rank=0" */
//stage.updateQuestRecordEx(32581, "complete=0;guildPoint=1;start=240817151858719;pass=1;lap=1;weekly=100;date=24/08/17/15/18;weeklyRecord=184452;mode=1;record=184452;finish=240817152203171;rank=0");

if ("1".equals(stage.getQuestRecordEx(32581, "complete")) && "1".equals(stage.getQuestRecordEx(32581, "mode"))) {
        let msg = "\r\n#e[旗幟爭奪戰結果]\r\n";
        stage.updateQuestRecordEx(32581, "complete", "0");
        let weekly = stage.getIntQuestRecordEx(32581, "weekly");
        let record = stage.getIntQuestRecordEx(32581, "record");
        let weeklyRecord = stage.getIntQuestRecordEx(32581, "weeklyRecord");
        let min = parseInt(Math.floor(record / 60000));
        let sec = parseInt(Math.floor(record / 1000) % 60);
        msg += "\r\n#n- 紀錄：#b" + min + "分 " + sec + "秒";
        if (record < weeklyRecord || weeklyRecord == 0) {
                weeklyRecord = record;
                msg += "(新記錄更新！)";
                stage.updateQuestRecordEx(32581, "weeklyRecord", record);
                let tPoint = calcPoint(record);
                if (tPoint > weekly) {
                        weekly = tPoint;
                        stage.updateQuestRecordEx(32581, "weekly", tPoint);
                        stage.updateGuildEventQuestPoint(0, tPoint);
                }
        }
        let wMin = parseInt(Math.floor(weeklyRecord / 60000));
        let wSec = parseInt(Math.floor(weeklyRecord / 1000) % 60);
        msg += "#k\r\n- 本週最高紀錄：#r" + wMin + "分 " + wSec + "秒#k\r\n- 本週獲得的公會排行點數：#r" + weekly + "分";
        npc.id(9000232).next().say(msg);
}


function calcPoint(record) {
        let tt = map.getId() - 942003000;
        let sec = record / 1000;
        switch (tt) {
                case 0:
                        if (sec < 44) {
                                return 1000;
                        } else if (sec < 46) {
                                return 800;
                        } else if (sec < 48) {
                                return 650;
                        } else if (sec < 50) {
                                return 550;
                        } else if (sec < 52) {
                                return 450;
                        } else if (sec < 54) {
                                return 400;
                        } else if (sec < 56) {
                                return 350;
                        } else if (sec < 58) {
                                return 300;
                        } else if (sec < 61) {
                                return 250;
                        } else if (sec < 64) {
                                return 200;
                        } else {
                                return 100;
                        }
                case 1:
                        if (sec < 37) {
                                return 1000;
                        } else if (sec < 39) {
                                return 800;
                        } else if (sec < 41) {
                                return 650;
                        } else if (sec < 43) {
                                return 550;
                        } else if (sec < 45) {
                                return 450;
                        } else if (sec < 47) {
                                return 400;
                        } else if (sec < 49) {
                                return 350;
                        } else if (sec < 51) {
                                return 300;
                        } else if (sec < 54) {
                                return 250;
                        } else if (sec < 57) {
                                return 200;
                        } else {
                                return 100;
                        }
                case 2:
                        if (sec < 50) {
                                return 1000;
                        } else if (sec < 52) {
                                return 800;
                        } else if (sec < 54) {
                                return 650;
                        } else if (sec < 56) {
                                return 550;
                        } else if (sec < 58) {
                                return 450;
                        } else if (sec < 60) {
                                return 400;
                        } else if (sec < 62) {
                                return 350;
                        } else if (sec < 64) {
                                return 300;
                        } else if (sec < 67) {
                                return 250;
                        } else if (sec < 70) {
                                return 200;
                        } else {
                                return 100;
                        }
        }
        return 0;
}