/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let {設置賽季經驗, get賽季標號} = require('constant/賽季信息')
let log = require('check_log');
let maxenter = 1;

execute();

function execute() {
    if (party.getMembersCount() < 3) {
        npc.meFlip().say("抱歉..人數不足 ( #r3#k )");
        return;
    }
    let now = log.getEventValue(stage, db, "通關玩具組隊");
    if (maxenter > now) {
        log.addEventValue(stage, db, "通關玩具組隊");
        設置賽季經驗(db, stage, "玩具組隊", 5);
        let nextCount = parseInt(now) + 1;
        util.broadcastChatMsg(6, "[玩具組隊]: " + stage.getCharacterName() + " 今日已成功通關玩具組隊" + nextCount + "次,獲得大量獎勵！(賬號每日" + maxenter + "次)");
        if (party.getLeaderId() === stage.getCharacterId()) {
            stage.gainItem(4001785, 1);//定居金500萬
            stage.gainItem(4310224, 1);//組隊幣
            log.addEventValue(stage, db, "組隊隊長值");
            log.addEventValue(stage, db, `組隊隊長值-${get賽季標號()}`, 1, -1);
        }
        stage.gainItem(4001785, 1);//定居金500萬
        stage.gainItem(4310224, 1);//組隊幣
        let rate = 0;
        if (stage.getLevel() < 250) {
            rate = 0.2;
        } else if (stage.getLevel() < 260) {
            rate = 0.10;
        } else if (stage.getLevel() < 270) {
            rate = 0.05;
        } else if (stage.getLevel() < 280) {
            rate = 0.03;
        } else if (stage.getLevel() < 290) {
            rate = 0.01;
        }
        stage.gainExp(ctx.getExpForLevelUp() * rate);
        stage.changeMap(100030301, 0);
    } else {
        stage.showSystemMessage("今日已經領取了" + maxenter + "次獎勵,無法再次領取");
        stage.changeMap(100030301, 0);
    }
}

for (let i in stage) {
    util.log(i);
}
