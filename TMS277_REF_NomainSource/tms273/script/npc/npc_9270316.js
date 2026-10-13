// Created by MetaMS
// [瓦蕾莉]  |  [9270316]
// MapName:維多利亞海岸出口


let bestlap = stage.getQuestRecordEx(101849, "bestlap");
let besttime = stage.getQuestRecordEx(101849, "besttime");
let ranking = stage.getIntQuestRecordExShare(101849, "ranking");


npc.id(9270316).noEsc().next().say("達成第" + ranking + "名了！\r\n獲得競速點數3點！\r\n\r\n#e完成時間#n：" + formatTimeString(besttime) + "\r\n#e最佳單圈時間#n：" + formatTimeString(bestlap));
stage.showSystemMessage("200 獲得收藏點數，共200 收藏點數。");
npc.id(9270316).noEsc().next().say("已獲得#b收藏點數#k200點！");

let bestlapInt = stage.getIntQuestRecordEx(101849, "bestlap");
let wbestlap = stage.getIntWorldShareRecord(445, "wbestlap");

if (wbestlap == 0 || bestlapInt < wbestlap) {
        stage.updateWorldShareRecord(445, "wbestlap", bestlap);
}

let besttimeInt = stage.getIntQuestRecordEx(101849, "besttime");
let wbesttime = stage.getIntWorldShareRecord(445, "wbesttime");

if (wbesttime == 0 || besttimeInt < wbesttime) {
        stage.updateWorldShareRecord(445, "wbesttime", besttime);
}
let win = stage.getIntWorldShareRecord(445, "win");
if (ranking == 1) {
        win += 1;
        stage.updateWorldShareRecord(445, "win", win);
}

/* Update Quest RecordEx | Id:101849 | Name: Unknown | Data: "bestlap=0;kart=1;play=0;besttime=0000000;ranking=4;result=1" */
stage.updateQuestRecordEx(101849, "bestlap", "0");
/* Update Quest RecordEx | Id:101849 | Name: Unknown | Data: "bestlap=0;kart=1;play=0;besttime=0;ranking=4;result=1" */
stage.updateQuestRecordEx(101849, "besttime", "0");
/* Update Quest RecordEx | Id:101849 | Name: Unknown | Data: "bestlap=0;kart=1;cTime=0;play=0;besttime=0;ranking=4;result=1" */
stage.updateQuestRecordEx(101849, "cTime", "0");
/* Update Quest RecordEx | Id:101849 | Name: Unknown | Data: "bestlap=0;kart=0;cTime=0;play=0;besttime=0;ranking=4;result=1" */
stage.updateQuestRecordEx(101849, "kart", "0");
/* Update Quest RecordEx | Id:101849 | Name: Unknown | Data: "bestlap=0;kart=0;cTime=0;play=0;besttime=0;ranking=0;result=1" */
stage.updateQuestRecordEx(101849, "ranking", "0");
/* Update Quest RecordEx | Id:101849 | Name: Unknown | Data: "bestlap=0;kart=0;cTime=0;play=0;besttime=0;ranking=0;result=0" */
stage.updateQuestRecordEx(101849, "result", "0");
stage.changeMap(993246001, 0);

function formatTimeString(str) {
        if (!/^\d{7}$/.test(str)) {
                throw new Error("輸入格式錯誤，必須是 7 位數字字串");
        }

        const hours = str.slice(0, 2);
        const minutes = str.slice(2, 4);
        const milliseconds = str.slice(4);

        return `${hours}:${minutes}:${milliseconds}`;
}