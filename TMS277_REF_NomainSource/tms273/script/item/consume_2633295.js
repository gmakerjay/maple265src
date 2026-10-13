/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let log = require('check_log');

function start() {
    if (log.getPQLog(stage, db, "月光藥水") >= 10) {
        npc.say("您已經使用過月光藥水了。");
    } else {
        if (stage.getLevel() == 300) {
            npc.say("你都滿級了。");
            return;
        }
        const randomNum = Math.floor(Math.random() * 10) + 1;
        let count = Math.min(297 - stage.getLevel(), randomNum);
        stage.loseItem(2633295, 1);
        log.addPQLog(stage, db, "月光藥水", 1, -1);
        for (let i = 0; i < count; i++) {
            stage.gainExp(ctx.getExpForLevelUp());
        }
        stage.showSystemMessage("使用月光藥水,等級提升了 " + count + "");
    }
}


start();