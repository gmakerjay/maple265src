// Created by MetaMS
// [卡蜜拉]  |  [9270313]
// MapName:維多利亞足球對抗賽 <競技場出口>

let win = stage.getIntWorldShareRecord(432, "win");
let result = stage.getQuestRecordEx(101822, "result");
let score = stage.getQuestRecordEx(101822, "score");
let strR = "放棄";
if (!"0".equals(result)) {
        if ("win".equals(result)) {
                strR = "勝利";
                win += 1;
        } else if ("lose".equals(result)) {
                strR = "失敗";
        } else if ("draw".equals(result)) {
                strR = "平手";
        }

        npc.id(9270313).next().say("#e#r" + score + "進球#n#k掌控了賽場耶！\r\n比賽結果為#b#e" + strR + "！#n#k(勝利次數：#e" + win + "次#n)\r\n已獲得收藏點數300 ！\r\n\r\n#r※每日獲得收藏點數：300\r\n#r※ 請務必在主賽場地圖完成收藏書簽到。");
        let todayPlay = stage.getIntWorldShareRecord(444, "todayPlay") + 1;
        stage.updateWorldShareRecord(444, "todayPlay", todayPlay);
        stage.updateWorldShareRecord(444, "lastDate", util.getStringDate("yy/MM/dd"));

        if ("win".equals(result)) {
                stage.updateWorldShareRecord(432, "win", win);
        } else if ("lose".equals(result)) {
                let lose = stage.getIntWorldShareRecord(432, "lose") + 1;
                stage.updateWorldShareRecord(432, "lose", lose);
        } else if ("draw".equals(result)) {
                let draw = stage.getIntWorldShareRecord(432, "draw") + 1;
                stage.updateWorldShareRecord(432, "draw", draw);
        }

        /* Update Quest RecordEx | Id:101822 | Name: Unknown | Data: "score=5;result=0" */
        stage.updateQuestRecordEx(101822, "score", "0");
        /* Update Quest RecordEx | Id:101822 | Name: Unknown | Data: "score=0;result=0" */
        stage.updateQuestRecordEx(101822, "result", "0");
}
stage.changeMap(993247399, 1);