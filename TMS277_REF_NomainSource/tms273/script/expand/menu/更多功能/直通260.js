/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
const {getPay, loseRMB, losePay} = require('vipCommon.js');

function start() {
    if (stage.getLevel() < 275 && stage.getLevel() > 199) {
        if (npc.askYesNo("是否消耗1000樂豆直達275") == 1) {
            if (stage.getCurrency(1) > 1000) {
                //losePay(db, stage, 1000);
				stage.modifyCurrency(1, -1000);
                // stage.setLevel(250);
                while(stage.getLevel()<275){
				stage.levelUp();
				}
                npc.say("直達成功!");
            } else {
                npc.say("樂豆不足");
            }
        }
    } else {
        npc.say("200級可以使用");
    }
}

start();


