/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 稀有抽獎
 * zsf
 */
let log = require('check_log');
var {getPay} = require('vipCommon.js');

/* 普通奖池 */
const priceA = [
    // id   权重  数量  名字
    [2434290, 300, 1, "武公保证荣誉勋章"],
  //  [2048743, 150, 1, "160火焰"],
    [2437750, 200, 5, "神秘球"],
    [5062031, 150, 1, "附加记忆潜能魔方"],
    [2435719, 200, 5, "核心"],
];
/* 小奖池 */
const priceB = [
    [2048761, 800, 1, "觉醒火焰", "8%"],
    [5062009, 1200, 3, "红磨魔方", "12%"],
    [4001715, 1000, 1, "1E", "10%"],
    [2635748, 1000, 5, "原初秋", "10%"],
    [2472000, 1200, 10, "白金锤", "12%"],
    [5062020, 800, 5, "六角", "8%"],
    [5062013, 1200, 1, "taiyang", "12%"],
    [5062021, 800, 5, "平等魔方", "8%"],
    [5062026, 700, 5, "唯一魔方", "7%"],
    [4001714, 1000, 10, "1000W", "10%"],
    [5062512, 300, 3, "juedui", "3%"],
    [2437016, 189, 1, "特米武器箱", "6%"],
];
/* 大奖池 */
const priceC = [
    [2431738, 1189, 1, "500乐豆", "5.83%"],
    [1342090, 185, 1, "双刀副手", "0.77%"],
    // [1052723, 105, 1, "灭龙！！！", "2.62%"],
    [1182285, 20, 1, "创世胸罩", "0.77%"],
    [1182158, 70, 1, "奥尔卡", "0.77%"],
    [2438412, 200, 1, "威尔核心", "6.17%"],
    [2632972, 100, 1, "米特拉核心", "21.60%"],
    [1113316, 250, 1, "黎明之守护天使戒指", "7.71%"],
    [1012757, 500, 1, "暮光祝福标记", "15.43%"],
    [1032330, 250, 1, "艾斯泰拉耳环", "7.71%"],
    [1122443, 500, 1, "拂晓吊坠", "15.43%"],
    [1113055, 189, 1, "巨匠戒指", "5.83%"],
    [1032216, 100, 1, "真红戒指", "3.88%"],
    [1113070, 100, 1, "真红戒指", "3.88%"],
    [1152155, 150, 1, "真红护肩", "3.88%"],
    [1122296, 189, 1, "死神项链", "5.83%"],
    [1113196, 50, 1, "魔性", "5.83%"],
];

/* 大奖池 */
const priceCReal = [
    [2431738, 5, 1, "500乐豆", "5.83%"],
    [1342090, 185, 1, "双刀副手", "0.77%"],
    // [1052723, 15, 1, "灭龙！！！", "2.62%"],
    [1182285, 20, 1, "创世胸罩", "0.77%"],
    // [1182158, 40, 1, "奥尔卡", "0.77%"],
    [2438412, 200, 1, "威尔核心", "6.17%"],
    [2632972, 100, 1, "米特拉核心", "21.60%"],
    [1113316, 250, 1, "黎明之守护天使戒指", "7.71%"],
    [1012757, 500, 1, "暮光祝福标记", "15.43%"],
    [1032330, 250, 1, "艾斯泰拉耳环", "7.71%"],
    [1122443, 500, 1, "拂晓吊坠", "15.43%"],
    [1113055, 189, 1, "巨匠戒指", "5.83%"],
    [1032216, 100, 1, "真红戒指", "3.88%"],
    [1113070, 100, 1, "真红戒指", "3.88%"],
    [1152155, 150, 1, "真红护肩", "3.88%"],
    [1122296, 189, 1, "死神项链", "5.83%"],
    [1113196, 50, 1, "魔性", "5.83%"],
];
var type = 0;
let smallPrizeProgress = log.getEventValue(stage, db, "小獎進度_裝備");
let bigPrizeProgress = log.getEventValue(stage, db, "大獎進度_裝備");
let smallPrizeWins = log.getEventValue(stage, db, "小獎歷史中獎次數_裝備");
let bigPrizeWins = log.getEventValue(stage, db, "大獎歷史中獎次數_裝備");

// 稀有抽獎
function start() {
    let str = `\r\n累計抽獎 #r${log.getEventValue(stage, db, "稀有抽獎_裝備")}#k 次\r\n`;
    str += `累計獲得小獎/大獎 #r${smallPrizeWins} / ${bigPrizeWins}#k 次\r\n`;
    let prizePool = db.select("SELECT COALESCE(SUM(amount), 0) AS total_amount FROM zsf_lottery_records")[0].get("total_amount");
    str += `當前獎池: #r${prizePool} #k樂豆\r\n`;
    str += bigPrizeProgress == 4 ? "本輪再中小獎#r必為大獎!#k\r\n" : `本輪在抽 #r${5 - bigPrizeProgress}#k 次小獎必得大獎\r\n`;
    str += smallPrizeProgress == 4 ? "本次抽獎#r必為#r小獎/大獎!#k\r\n" : `本輪在抽 #r${5 - smallPrizeProgress}#k 次獲得小獎/大獎\r\n`;
    str += `本次抽獎需要#r45#k樂豆\r\n當前擁有: #r${getPay(db, stage, 2)}#k \r\n`;

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
    let sumC = priceC.reduce((acc, curr) => acc + curr[1], 0);
    for (let i in priceC) {
        str += `[#v${priceC[i][0]}:i#:#r${(priceC[i][1] / sumC * 100).toFixed(2)}%#b]`;
    }
    str += "\r\n";

    let txt = npc.defText("是").minLen(0).maxLen(2).askText(str);
    if (txt == "是") {
        if (getPay(db, stage, 2) < 45) {
            npc.say("樂豆不足...");
        } else {
            if (stage.getFreeSlot(1) < 5) {
                npc.say("清理揹包");
                return;
            }
            // 增加積分
            log.addEventValue(stage, db, "抽獎積分", 1, -1);
            // 扣餘額
            stage.modifyCurrency(1, -45);
            // 增加獎池
            db.insert(`insert into zsf_lottery_records(playerId, accountId, playerName, amount, time)
                       values (${stage.getCharacterId()}, ${stage.getAccountId()}, '${getAccountName()}',
                               5, now());`);

            // 千分之1的概率拿走一半獎池
            if (Math.random() < 0.001 ) {
                prizePool = db.select("SELECT COALESCE(SUM(amount), 0) AS total_amount FROM zsf_lottery_records")[0].get("total_amount");
                let half = Math.floor(Math.floor(prizePool / 2));
                stage.modifyCurrency(1, half);
                db.insert(`insert into zsf_lottery_records(playerId, accountId, playerName, amount, time)
                       values (${stage.getCharacterId()}, ${stage.getAccountId()}, '${getAccountName()}',
                               ${-half}, now());`);
                
                util.broadcastChatMsg(21, `玩家 <${stage.getCharacterName()}> \n爆了獎池 <${half}>\n讓我們恭喜這個比亞迪`);
                 
            }

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
                    let toDrop = util.makeItem(prize[0], 1);
                    util.broadcastGachaponMsg("【幸運抽獎】恭喜玩家 " + stage.getCharacterName() + " 從大獎裡獲得了 {}", toDrop);
                    stage.gainItem(prize[0], prize[2]);
                    if (prize[0] == 1052723) {
                        util.broadcastChatMsg(21, "出貨了出貨了，玩家" + stage.getCharacterName() + "在大獎池裡獲得了 <" + util.getItemName(prize[0]) + ">");
                        let body = {
                            "message": `裝備抽獎:\n玩家 <${stage.getCharacterName()}> \n抽中了 <${util.getItemName(prize[0])}>\n讓我們恭喜這個比亞迪!!!`
                        }
                    }
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
    log.addEventValue(stage, db, "稀有抽獎_裝備", 1, -1);
    log.addEventValue(stage, db, "小獎進度_裝備", 1, -1);
    smallPrizeProgress++;

    // 檢查是否達到小獎進度
    if (smallPrizeProgress >= 5 || Math.random() < 0.01) {
        // 重置小獎進度
        log.resetEventValue(stage, db, "小獎進度_裝備");
        smallPrizeProgress = 0;

        // 增加大獎進度
        log.addEventValue(stage, db, "大獎進度_裝備", 1, -1);
        bigPrizeProgress++;

        // 檢查是否達到大獎
        if (bigPrizeProgress >= 5 || Math.random() < 0.1) {
            // 重置大獎進度
            log.resetEventValue(stage, db, "大獎進度_裝備");
            bigPrizeProgress = 0;

            // 增加大獎歷史中獎次數
            bigPrizeWins++;

            // 在大獎獎池中抽獎
            type = 2;
            log.addEventValue(stage, db, "大獎歷史中獎次數_裝備", 1, -1);
            return roll(priceCReal);
        } else {
            // 小獎獎池
            type = 1;
            log.addEventValue(stage, db, "小獎歷史中獎次數_裝備", 1, -1);
            return roll(priceB);
        }
    } else {
        type = 0;
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

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}