// Created by MetaMS
// ID:[951000000]
// MapName:怪物公園
// 怪物公園


const MAX_COUNT = 7;
const POINT_COST = 20;
let mPark = require("mpark_map")
let selection = ctx.getOption();

let count = stage.getIntQuestRecordExShare(18805, "count");

let logDate = stage.getQuestRecordExShare(18805, "date");
let nowDate = util.getStringDate("yy/MM/dd");
if (!logDate.equals(nowDate)) {
        count = 0;
        stage.updateQuestRecordExShare(18805, "Td", util.getStringDate("yy/MM/dd"));
        stage.updateQuestRecordExShare(18805, "date", util.getStringDate("yy/MM/dd"));
        stage.updateQuestRecordExShare(18805, "count", "0");
        stage.updateQuestRecordExShare(18805, "tryCount", "0");
}

if (party != null) {
        npc.disbandParty();
}
if (party != null) {
        npc.defNpc(9071004).say("無法在組隊狀態下入場。\r\n請先解除隊伍再入場。");
} else {
        let maps = mPark.getMapIds(2, selection);
        if (count >= MAX_COUNT) {
                npc.defNpc(9071004).say("\r\n今天已經進行過終極怪物公園。\r\n明天再來吧！");
        } else if (count > 1 && stage.getCurrency(2) < POINT_COST) {
                npc.defNpc(9071004).say("#e#r楓點不足，無法進行！");
        } else if (ctx.makeEvent("monster_park", false, [stage, maps]) == null) {
                npc.defNpc(9071004).say("#e#r發生錯誤，請聯系管理員！");
        }
}