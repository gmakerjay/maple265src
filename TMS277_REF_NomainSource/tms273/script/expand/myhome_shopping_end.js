// Created by MetaMS
// My home shopping done

let n = stage.getIntQuestRecordExShare(500773, "manager");
let npcId = 9400920 + n;

let t = stage.getQuestRecordExShare(500778, "t");
let nT = util.getStringDate("yy/MM/dd/HH/mm");
if (stage.isQuestStarted(500778)) {
        let reward = stage.getIntQuestRecordExShare(500778, "reward");
        if (nT > t) {
                if (stage.canHold(reward, 1)) {
                        stage.updateQuestRecordExShare(500778, "last", nT);
                        stage.removeQuest(500778);
                        stage.gainItem(reward, 1);
                        npc.id(npcId).ui(1).next().say("#face1#啦啦~！收集到了#b#i" + reward + ",Count:1:# #t" + reward + ",Count:1##k！");
                } else {
                        npc.id(npcId).ui(1).say("#face1# 背包空間不足，請清理後在跟我對話吧!");
                }
        } else {
                npc.id(npcId).ui(1).next().say("#face1#購物還未結束呢！");
        }
} else {
        npc.id(npcId).ui(1).next().say("#face1#發生未知錯誤");
}