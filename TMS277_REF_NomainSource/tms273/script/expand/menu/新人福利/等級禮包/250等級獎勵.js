/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 150 等級箱子
 */

const listA = [
    1032222,
   
];
let log = require('check_log');

// let boxId = 2431901;//箱子ID

function start() {
    if (log.getPQLog(stage, db, "250等級獎勵") > 0 && !stage.isGm()) {
        npc.say("已經領過");
        return;
    } else if (stage.getLevel() < 250) {
        npc.say("等級不足");
        return;
    }

    let str = "恭喜您達到250級，獎勵包含\r\n高倍4件套\r\n16X卷軸4張\r\n是否領取";
    if (npc.askYesNo(str) == 1) {
        if (log.getPQLog(stage, db, "250等級獎勵") == 0 || stage.isGm()) {
            if (stage.getFreeSlot(1) < 12) {
                npc.say("清理揹包");
                return;
            }
            for (let i in listA) {
                stage.gainItem(listA[i], 1);
                stage.gainItem(2049385, 1);
            }

            log.addPQLog(stage, db, "250等級獎勵", 1, -1);
            npc.say("領取成功");


        } else {
            npc.say("級別不夠哦");
        }
    }
}

start();

