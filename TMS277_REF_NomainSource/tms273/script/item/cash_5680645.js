// Created by MetaMS
// ID:[5680645]
// MapName:邱比特公園
// 200~224等級經驗值2倍券15天券

let maxCount = 4;
let dCount = stage.getIntQuestRecordEx(64502, "dailyCount");
let dDate = stage.getQuestRecordEx(64502, "CashExpLastDay");
let nowTime = new Date().getTime();
let logTime = util.getTimeStringToLong(dDate, "yy/MM/dd");
if (!util.isSameDay(logTime, nowTime)) {
        dCount = 0;
}
if (dCount >= maxCount) {
        npc.id(9010000).say("#i5680645:# #t5680645:# 是 #b1天可使用 " + maxCount + "次#k 喔。\r\n\r\n#b[今天的使用次數]#k\r\n- " + dCount + " / " + maxCount + "次\r\n 再麻煩明天使用。");
} else if (npc.id(9010000).askYesNo("你好，#h0#大人！經驗值序號是一天可以獲得 " + maxCount + "次\r\n現在就要接收嗎？\r\n\r\n#b[今天的使用次數]#k\r\n- " + dCount + " / " + maxCount + "次\r\n\r\n")) {
        /* Response is Yes */
        if (stage.gainItem(5212004, 1)) {
                dCount += 1;
                stage.updateQuestRecordEx(64502, "dailyCount", dCount);
                stage.updateQuestRecordEx(64502, "CashExpLastTime", util.getStringDate("yy/MM/dd/HH/mm"));
                stage.updateQuestRecordEx(64502, "CashExpLastDay", util.getStringDate("yy/MM/dd"));
                npc.id(9010000).next().say("今天已經使用了" + dCount + "次。\r\n\r\n#b[今天的使用次數]#k\r\n- " + dCount + " / " + maxCount + "次");
        } else {
                npc.id(9010000).say("背包空間不足");
        }
} else {
        /* Response is No */
        npc.id(9010000).say("1天可獲得" + maxCount + "次的關係，再麻煩今天內領取！");
}
