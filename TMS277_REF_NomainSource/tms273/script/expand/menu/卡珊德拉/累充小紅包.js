/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 抽獎
 *
 * 機制說明： 抽獎首先會生成0-100的隨機數，獎品裏面幾率大於這個數的才會進入最終獎池，最終獲得的獎品將在最終獎池裡面隨機獲得一個。
 *
 **/
const {getPay, loseRMB} = require('vipCommon.js');
const log = require('check_log');
let items = Array(
    //物品ID 數量 幾率(幾率請寫100以下,只有幾率在laba以下的才會喇叭公告)
    Array(2630030, 1, 100),//	神秘之影遠古弓
    Array(2630029, 1, 100),//	神秘之影遠古弓
    Array(2630028, 1, 100),//	神秘之影雙頭杖
    Array(2630026, 1, 100),//	神秘之影靈魂手銃
    Array(2630024, 1, 100),//	神秘之影亡命劍
    Array(2630021, 1, 100),//	神秘之影能量劍
    Array(4001715, 1, 100),//	神秘之影能量劍
    Array(4001716, 1, 30),//	神秘之影能量劍


);
//展示出來的獎品
let showItems1 = Array(
    Array(2630030, 1, 100),//	神秘之影遠古弓
    Array(2630029, 1, 100),//	神秘之影遠古弓
    Array(2630028, 1, 100),//	神秘之影雙頭杖
    Array(2630026, 1, 100),//	神秘之影靈魂手銃
    Array(2630024, 1, 100),//	神秘之影亡命劍
    Array(2630021, 1, 100),//	神秘之影能量劍
    Array(4001715, 1, 90),//	神秘之影能量劍
    Array(4001716, 1, 30),//	神秘之影能量劍


);
let types = 4310306;// 1=點券 2=抵用 3=金幣 4=銀鑄 物品ID=材料抽獎（梅花7）
let needNum = 1;//需要數量
let title = "小紅包";
let haveMoney = 0;

//獎品
let laba = 100;//公告喇叭需要的幾率

const 小紅包 = 4031546;
const 中紅包 = 4310263;
const 大紅包 = 4031548;

const needItems = [
    [小紅包],
    [中紅包],
    [大紅包],
    [中紅包, 大紅包],
];

const rands = [
    [1, 1],
    [2, 4],
    [3, 21],
    [5, 28],
];
let today = new Date();
let month = today.getMonth() + 1; // JavaScript中的月份從0開始，所以需要加1
let endMonthDay = new Date(today.getFullYear(), month, 0).getDate(); // 獲取當前月份的最後一天
while (true) {
    let reStr = `選擇抽獎模式:\r\n`;
    reStr += `#L0##v${小紅包}:i# 倍率: ${rands[0][0]} ~ ${rands[0][1]} #l\r\n`;
    reStr += `#L1##v${中紅包}:i# 倍率: ${rands[1][0]} ~ ${rands[1][1]} #l\r\n`;
    reStr += `#L2##v${大紅包}:i# 倍率: ${rands[2][0]} ~ ${rands[2][1]} #l\r\n`;
    reStr += `#L3##v${中紅包}:i# + #v${大紅包}:i# 倍率: ${rands[3][0]} ~ ${rands[3][1]} #l\r\n`;

    let sel = npc.askMenu(reStr);


    switch (types) {
        default:
            title = "小紅包刮獎";

            haveMoney = (stage.getItemQuantity(types));
            break;
    }
    let str = "\t\t\t#fs16##r#e" + title + "#fs12##n\r\n";
    //str += type==3?"#b每次需要 #r"+needNum+" #b金幣":type>4?("#b擁有獎券 #v"+type+"##r "+haveMoney+" #b個.每次需要消耗 #r"+needNum+" #b個\r\n#v"+type+"#產出方式：#r組隊一條龍"):("#b剩餘 #r"+haveMoney+" #b"+title+" 每次需要 #r"+needNum+" #b"+title);
    str += "\r\n#d開啟后隨機獲得以下中的任意1個、\r\n#r(幸運獎勵1%概率額外獲得88星語幣)\r\n"
    str += `需要消耗: \r\n`;
    for (let i in needItems[sel]) {
        str += `#v${needItems[sel][i]}:i# (剩餘: ${stage.getItemQuantity(needItems[sel][i])})\r\n`;
    }
    str += `\r\n獎勵波動範圍 ${rands[sel][0]} ~ ${rands[sel][1]} 倍\r\n`;
    var rand = Math.floor(Math.random() * (rands[sel][1] - rands[sel][0] + 1)) + rands[sel][0];
    if (stage.isGm()) {
        str += rand + "\r\n";
    }
    str += ``;
    for (let i = 0; i < showItems1.length; i++) {
        str += "#r#v" + showItems1[i] + "##z " + showItems1[i] + "#\r\n";
    }


    str += "				#b#n是否現在直接開啟？\r\n"
    //str += "\r\n#k如果你足夠幸運，還能抽到2-3個箱子，是否抽獎？"
    let YN = npc.askYesNo(str);
    if (YN == 1) {
        let canGet = true;
        for (let i in needItems[sel]) {
            if (stage.getItemQuantity(needItems[sel][i]) == 0) {
                canGet = false;
            }
        }
        if (canGet) {
            //抽獎
            if (stage.getFreeSlot(1) < 2 || stage.getFreeSlot(2) < 2 || stage.getFreeSlot(3) < 2 || stage.getFreeSlot(4) < 2 || stage.getFreeSlot(5) < 2) {
                npc.say("包裹空間不足，請確保包裹每個欄位有至少 " + 2 + " 格空間");
            } else {
                for (let i in needItems[sel]) {
                    stage.loseItem(needItems[sel][i], 1)
                }
                let random = Math.floor(Math.random() * 100);
                let finalItems = Array();
                for (let i = 0; i < items.length; i++) {
                    if (random < items[i][2]) finalItems.push(items[i]);
                }
                var random1 = Math.floor(Math.random() * finalItems.length);
                var newItem = util.makeItem(finalItems[random1][0], 1);
                var newItemName = util.getItemName(newItem['itemId']);
                if (finalItems[random1][2] <= laba)
                    stage.gainItem(finalItems[random1][0], rand );
                //npc.broadcastWeatherEffectNotice(2,"五醬超漂亮",10000);
                else
                    stage.gainItem(finalItems[random1][0], rand);
                let finalStr = "抽取成功！獲得#v" + finalItems[random1][0] + "##r#z" + finalItems[random1][0] + "# x " + rand;

                let hyPay = db.select(`SELECT SUM(rmb) AS sum
                                    FROM zz_rmb
                                    WHERE account = '${getAccountName()}'
                                    AND remark = '新年'
                                    AND YEAR(paytime) = 2025
                                    AND MONTH(paytime) = ${month};`);
                hyPay = hyPay[0].get("sum");
                hyPay = hyPay == null ? 0 : hyPay;
                let canRmb = false;
                const 黑名單 = [
                    , 'po09ik' //
                    , 'wanxiao1' // 泰酷辣

                ];

                if (!黑名單.includes(getAccountName()) && log.getEventValue(stage, db, `月紅包星語幣${month}`) == 0 && hyPay >= 500) {
                    canRmb = true;
                }

                if (stage.isGm()) {
                    stage.showSystemMessage(log.getEventValue(stage, db, `月紅包星語幣${month}`));
                }
                if ((Math.random() < 0.01 && canRmb) || (canRmb && Math.random() < 0.01 && sel == 0)) {
                    log.addEventValue(stage, db, `月紅包星語幣${month}`, 1, -1)
                    var sql = "insert into zz_rmb(account, rmb, paytime,remark) values('" + getAccountName() + "'," + parseInt(rand * 88) + ",now(),'五月累充紅包')";
                    db.insert(sql);
                    util.broadcastWeatherEffectNotice("≡獎勵≡  恭喜 " + stage.getCharacterName() + " 從中獲得星語幣【" + rand * 88 + "】!", 184, 10000, true);
                    let body = {
                        "message": `星語谷紅包:\n玩家 <${stage.getCharacterName()}> \n拆開紅包時發現了獎勵: <${rand * 88}>\n讓我們恭喜這個比亞迪!!!`
                    }
                    finalStr += `\r\n觸發獎勵好運,額外獲得星語幣: ${rand * 88}`;
                }
                npc.say(finalStr);
            }
        } else {
            npc.say("您的紅包不足！無法抽取");
            break;
        }
    }
}


function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}