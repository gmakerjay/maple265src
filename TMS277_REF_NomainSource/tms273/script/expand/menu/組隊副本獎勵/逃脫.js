/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let { 設置賽季經驗, get賽季標號 } = require('constant/賽季信息')
let log = require('check_log');
let maxenter = 1;
let chance = 1;

execute();

function execute() {
    /*if (!stage.hasItem(4001008, 10)) {
        npc.meFlip().say("擊敗看守阿尼!逃脫監獄吧!")
        return;
    }
        */
    if (party.getMembersCount() < 3) {
        npc.meFlip().say("抱歉..人數不足 ( #r3#k )");
        return;
    }
    let now = log.getEventValue(stage, db, "prison_break");
    if (maxenter > now) {
        log.addEventValue(stage, db, "prison_break");
        設置賽季經驗(db, stage, "逃脫組隊", 5);
        let nextCount = parseInt(now) + 1;
        util.broadcastChatMsg(6, "[逃脫組隊]: " + stage.getCharacterName() + " 今日已成功通關逃脫組隊" + nextCount + "次,獲得大量獎勵！(賬號每日" + maxenter + "次)");
        if (party.getLeaderId() === stage.getCharacterId()) {
            //stage.removeItemAll(4001008);
            log.addEventValue(stage, db, "組隊隊長值");
            log.addEventValue(stage, db, `組隊隊長值-${get賽季標號()}`, 1, -1);
        }
        if (stage.getLevel() < 290) {
            stage.gainExp(ctx.getExpForLevelUp() * 0.2);
        }
        stage.gainItem(4310224, 1);
        stage.gainItem(4001714, 5);
        stage.changeMap(100030301, 0);
    } else {
        stage.showSystemMessage("今日已經領取了" + maxenter + "次獎勵,無法再次領取");
        stage.changeMap(100030301, 0);
    }
}
