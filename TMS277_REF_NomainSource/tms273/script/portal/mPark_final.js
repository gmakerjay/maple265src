// Created by MetaMS
// ID:[954104500]
// MapName:6階段:虛空海浪
// 6階段:虛空海浪

let { 設置賽季經驗, get賽季標號 } = require('constant/賽季信息')
let event = stage.getEvent();
if (event != null) {
    let today = new Date();
    // 获取当前是星期几 (0 表示星期日，1 表示星期一，以此类推)
    let dayOfWeek = today.getDay();
    let itemId = 2434745 + dayOfWeek;
    if (map.getActiveMobCount() > 0) {
        stage.showProgressMessageFont("必須消滅平原內所有怪物才能移動到下一個關卡。", 3, 20, 4, 0);//unk:[byte]0
        stage.showSystemMessage("首先打倒場地內所有怪物。");
    } else if (stage.gainItem(itemId, 1)) {
        // Inventory Operation with 1 operations.
        let totalEXP = 0
        if (stage.getLevel() < 290) {
            totalEXP = parseInt(ctx.getExpForLevelUp() * 0.10)
        }
        stage.gainExp(totalEXP);
        /* Update Quest RecordEx | Id:15180 | Name: Unknown | Data: "exp=0" */
        stage.updateQuestRecordEx(15180, "exp", "0");
        let count = stage.getIntQuestRecordExShare(18805, "count") + 1;
        stage.updateQuestRecordExShare(18805, "count", String(count));
        stage.updateQuestRecordExShare(18805, "Td", util.getStringDate("yy/MM/dd"));
        stage.updateQuestRecordExShare(18805, "date", util.getStringDate("yy/MM/dd"));
        stage.updateQuestRecordExShare(18805, "T1", "0");
        stage.updateQuestRecordExShare(18805, "T2", "0");
        stage.updateQuestRecordExShare(18805, "T3", "0");
        if (count >= 2) {
            let ticket = stage.getItemQuantity(4001864);
            if (ticket > 0) {
                stage.loseItem(4001864, 1);
            } else {
                stage.modifyCurrency(2, -20);
            }
        }
        /* Update Quest RecordEx | Id:7901 | Name: Unknown | Data: "" */
        stage.updateQuestRecordEx(7901, "");

        let str = "\r\n在怪物公園玩得開心嗎？這裡有獎勵，呵呵。\r\n\r\n#b#e每日獎勵：#i" + itemId + ":# #t" + itemId + ":# 1個\r\n經驗值獎勵： " + totalEXP;
        if (count >= 2) {
            str += "\r\n使用20 新楓之谷點數了。";
        }
        npc.id(9071000).noEsc().next().say(str);
        npc.id(9071000).noEsc().next().say("那麼下次再使用吧～");

        stage.gainItem(4310020, 2)
        stage.gainItem(2439305, 3)
        
        設置賽季經驗(db, stage, "怪物公園", 10);
        stage.changeMap(951000000, 1);
    } else {
        npc.id(9071000).next().say("請清理背包後再進行！");
    }
}