// Created by MetaMS
// My home shopping

let n = stage.getIntQuestRecordExShare(500773, "manager");
let npcId = 9400920 + n;
let nT = util.getStringDate("yy/MM/dd/HH/mm");

if (!stage.isQuestStarted(500778)) {
        let name = stage.getTempValue("HOME_BUY_NAME");
        let time = stage.getTempValue("HOME_BUY_TIME");
        let key = stage.getTempValue("HOME_BUY_KEY");
        let reward = stage.getTempValue("HOME_BUY_REWARD");
        let ret = npc.id(npcId).ui(1).askAccept("#face0##b" + name + "#k家具選購需要#b" + time + "小時#k #k。你確定要現在出發嗎？");//#r(10分鐘 額外降低加成)
        if (ret == 1) {
                let nowTime = new Date().getTime();
                let endTime = nowTime + time * 60 * 60 * 1000;
                stage.updateQuestRecordExShare(500778, "reward", reward);
                stage.updateQuestRecordExShare(500778, "Count", String(1));
                stage.updateQuestRecordExShare(500778, "lotteryName", key);
                stage.updateQuestRecordExShare(500778, "last", nT);
                stage.updateQuestRecordExShare(500778, "bonusCoin", String(0));
                stage.updateQuestRecordExShare(500778, "t", util.getStringDate(endTime, "yy/MM/dd/HH/mm"));
                stage.startQuest(500778);

                npc.id(npcId).ui(1).next().say("#face1#好的！那我就去找家具了，你慢慢等吧！");
        }
} else {
        let ret = npc.id(npcId).ui(1).askAccept("#face3#選購還沒結束呢！你真的要取消嗎？");
        if (ret == 1) {
                stage.removeQuest(500778);
                stage.updateQuestRecordExShare(500778, "");
                stage.updateQuestRecordExShare(500778, "last", nT);
        }
}