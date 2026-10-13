/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

//player.runScript("燈泡刪除");
// player.dropMessage(-1,"恭喜您開啟了口袋欄了！");
// player.dropMessage(6," 提示信息：恭喜您開啟了口袋欄了！");
if (stage.getLevel() >= 100) {
    if (stage.isQuestCompleted(40980)) {
        npc.say("你已完成過了！");
    } else {
        let A = npc.askYesNo("想要完成神之子前置麼！");
        if (A == 1) {
            var Care = [40900,   //序章
                40901,   //第一章
                40902,
                40903,
                40904,
                40905,
                40910,   //第二章
                40911,
                40912,
                40913,
                40914,
                40920,   //第三章
                40921,
                40922,
                40923,
                40924,
                40930,   //第四章
                40931,
                40932,
                40933,
                40934,
                40940,   //第五章
                40941,
                40942,
                40943,
                40944,
                40950,   //第六章
                40951,
                40952,
                40953,
                40954,
                40960,   //第七章
                40961,
                40962,
                40963,
                40964,
                40970,   //第八章
                40971,
                40972,
                40973,
                40974,
                40980];
            for (var ii in Care) {
                stage.completeQuest(Care[ii]);
            }
            npc.say("已幫您消除燈泡！");
        }
    }


} else {
    npc.say("等級不足200級，無法消除燈泡！");
}
