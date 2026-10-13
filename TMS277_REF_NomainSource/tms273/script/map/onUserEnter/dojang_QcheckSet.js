// Created by MetaMS
// ID:[925020002]
// MapName:武陵道場出口


stage.updateQuestRecordEx(3847, "NResult", "complete");
let NFloor = stage.getIntQuestRecordEx(3847, "NFloor");
let NTime = stage.getIntQuestRecordEx(3847, "NTime");

let oldFloor = stage.getIntQuestRecordEx(100466, "Floor");
let oldTime = stage.getIntQuestRecordEx(100466, "Time");

let update = false;
if (NFloor > oldFloor) {
        update = true;
        stage.updateQuestRecordEx(100466, "Floor", NFloor);
        stage.updateQuestRecordEx(100466, "Time", NTime);
}
if (NFloor == oldFloor && NTime < oldTime) {
        update = true;
        stage.updateQuestRecordEx(100466, "Time", NTime);
}
stage.updateQuestRecordEx(100466, "rDay", util.getStringDate("yy/MM/dd"));
if (update) {
        stage.updateQuestRecordEx(100466, "Scr", "1");//check best
        stage.showProgressMessageFont("- 達成最高紀錄 -", 3, 25, 4, 0);//unk:[byte]0
}
stage.updateQuestRecordEx(100466, "Scr", "0");//check best

npc.id(2091011).noEsc().say("辛苦了。 試著繼續挑戰吧。\r\n(目前的時間 :" + util.getStringDate("yy/MM/dd, HH點 mm分") + ")\r\n\r\n<最近紀錄資訊>\r\n#b  - 排行區間 : 精通\r\n  - 完成樓層 : " + NFloor + " 層\r\n  - 花費的時間 : " + NTime + " 秒#k\r\n\r\n若是達成比之前更好的紀錄，就會自動登錄在#r武陵排行榜#k。\r\n登錄時需要一點時間，千萬別忘記。");