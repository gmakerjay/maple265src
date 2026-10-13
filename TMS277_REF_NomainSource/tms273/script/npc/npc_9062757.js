/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let log = require('check_log');

execute();

function execute() {
    if (log.getEventValue(stage, db, "激流_校驗") >= 2) {
        npc.meFlip().next().say("當日已領過獎勵了!");
        stage.changeMap(100000000, 0);
    } else {
        let count = stage.getIntQuestRecordEx(17209, "Score");
        if (count >= 2000) {
            log.addEventValue(stage, db, "激流_校驗");
            stage.updateQuestRecordEx(17209, "Score", String(0));
            stage.modifyCurrency(2, 500);
            stage.gainMesos(1E8);
            npc.meFlip().next().say("恭喜！你獲得了 500 楓點！1 億楓幣！");
        } else {
            npc.meFlip().next().say("抱歉..必須達到 2000m 才有獎勵!\r\n\r\n今日成績：" + count);
        }
        stage.changeMap(100000000, 0);
    }
}