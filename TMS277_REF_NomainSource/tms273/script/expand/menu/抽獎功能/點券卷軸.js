/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 稀有抽獎
 * zsf
 */
let log = require('check_log');
var {getPay} = require('vipCommon.js');

/* 普通獎池 */
const priceA = [
    // id   權重  數量  名字
    [2431305, 100, 1, "RED卷軸箱子"],
];
/* 小獎池 */
const priceB = [
    [2432206, 70, 1, "X卷自選", "70%%"],
    [2435824, 30, 1, "V卷自選", "30%%"],
];
/* 大獎池 */
const priceC = [
    [2435824, 70, 1, "V卷自選", "70%%"],
    [2430376, 30, 1, "黑卷自選", "30%"],
];
var type = 0;
let smallPrizeProgress 
let bigPrizeProgress 
let smallPrizeWins 
let bigPrizeWins 

// 稀有抽獎
function start() {
    smallPrizeProgress = log.getEventValue(stage, db, "小獎進度_卷軸_點券");
    bigPrizeProgress = log.getEventValue(stage, db, "大獎進度_卷軸_點券");
    smallPrizeWins = log.getEventValue(stage, db, "小獎歷史中獎次數_卷軸_點券");
    bigPrizeWins = log.getEventValue(stage, db, "大獎歷史中獎次數_卷軸_點券");
    let str = `\r\n累計抽獎 #r${log.getEventValue(stage, db, "稀有抽獎_卷軸_點券")}#k 次\r\n`;
    str += `累計獲得小獎/大獎 #r${smallPrizeWins} / ${bigPrizeWins}#k 次\r\n`;
    str += bigPrizeProgress == 4 ? "本輪再中小獎#r必為大獎!#k\r\n" : `本輪在抽 #r${5 - bigPrizeProgress}#k 次小獎必得大獎\r\n`;
    str += smallPrizeWins == 4 ? "本次抽獎#r必為#r小獎/大獎!#k\r\n" : `本輪在抽 #r${5 - smallPrizeProgress}#k 次獲得小獎/大獎\r\n`;
    str += `本次抽獎需要#r88#k點券\r\n當前擁有: #r${stage.getCurrency(2)}#k \r\n`;

    str += "\r\n#b#e普通獎池 #n\r\n";
    for (let i in priceA) {
        str += `[#v${priceA[i][0]}:i#x#r${priceA[i][2]}#b]`;
    }
    str += "\r\n";
    str += "\r\n#b#e小獎獎池 #r(每次抽取5%獲得小獎/大獎)#b#n\r\n";
    for (let i in priceB) {
        str += `[#v${priceB[i][0]}:i#x${priceB[i][2]}:#r${priceB[i][4]}#b]`;
    }
    str += "\r\n";
    str += "\r\n#b#e大獎獎池 #r(每次抽取10%獲得小獎/大獎)#b#n\r\n";
    for (let i in priceC) {
        str += `[#v${priceC[i][0]}:i#:#r${priceC[i][4]}#b]`;
    }
    str += "\r\n";

    let txt = npc.defText("是").minLen(0).maxLen(2).askText(str);
    if (txt == "是") {
        if (stage.getCurrency(2) < 88) {
            npc.say("點券不足...");
        } else {
            // 扣點券
            stage.modifyCurrency(2, -88);

            let prize = startLottery();
            let prizeStr = "";
            switch (type) {
                case 0:
                    stage.gainItem(prize[0], prize[2]);
                    break;
                case 1:
                    stage.gainItem(prize[0], prize[2]);
                    break;
                case 2:

                    stage.gainItem(prize[0], prize[2]);
                    break;
            }

            prizeStr += `恭喜您獲得 #r#v${prize[0]}:i##z${prize[0]}:i##k x #r${prize[2]}#k 個`;

            npc.say(prizeStr);
        }
        start();
    }
}


function startLottery() {

    // 增加小獎進度
    log.addEventValue(stage, db, "稀有抽獎_卷軸_點券", 1, -1);
    log.addEventValue(stage, db, "小獎進度_卷軸_點券", 1, -1);
    smallPrizeProgress++;

    // 檢查是否達到小獎進度
    let rand1 = Math.random();
    if (smallPrizeProgress >= 5 || rand1 < 0.025) {
        // 重置小獎進度
        log.resetEventValue(stage, db, "小獎進度_卷軸_點券");
        smallPrizeProgress = 0;

        // 增加大獎進度
        log.addEventValue(stage, db, "大獎進度_卷軸_點券", 1, -1);
        bigPrizeProgress++;

        // 檢查是否達到大獎
        if (bigPrizeProgress >= 5 || Math.random() < 0.1) {
            // 重置大獎進度
            log.resetEventValue(stage, db, "大獎進度_卷軸_點券");
            bigPrizeProgress = 0;

            // 增加大獎歷史中獎次數
            bigPrizeWins++;

            // 在大獎獎池中抽獎
            type = 2;
            log.addEventValue(stage, db, "大獎歷史中獎次數_卷軸_點券", 1, -1);
            return roll(priceC);
        } else {
            // 小獎獎池
            type = 1;
            log.addEventValue(stage, db, "小獎歷史中獎次數_卷軸_點券", 1, -1);
            return roll(priceB);
        }
    } else {
        return roll(priceA);
    }
}

function roll(list) {
    if (!Array.isArray(list) || list.length === 0) {
        return null;
    }
    const totalWeight = list.reduce((acc, item) => acc + item[1], 0);
    const randomNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    for (let item of list) {
        cumulativeWeight += item[1];
        if (randomNum < cumulativeWeight) {
            return item;
        }
    }
    return null;
}

start();