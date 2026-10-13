/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 抽獎
 *
 * 機制說明： 抽獎首先會生成0-100的隨機數，獎品裏面幾率大於這個數的才會進入最終獎池，最終獲得的獎品將在最終獎池裡面隨機獲得一個。
 *
 **/
const tt = "#fUI/UIWindow2/AdditionalOptionTooltip/unique#"; //餅乾兔子
const a1 = "#fUI/RunnerGame/RunnerGameUI/Effect/ItemEffect_Protect1/3#";
let type = 4031546;// 1=點券 2=抵用 3=金幣 4=銀鑄 物品ID=材料抽獎（梅花7）
let needNum = 1;//需要數量
let title = "小紅包";
let haveMoney = 0;
let log = require('check_log');
//獎品
let laba = 100;//公告喇叭需要的幾率
let items = [

    [500, 4310263],
    [1000, 4310263],
    [2000, 4310263],
    [3000, 4031548],
    [4000, 4031548],
    [5000, 4031548],
    [10000, 4031548],
    [10500, 4310263],
    [11000, 4310263],
    [12000, 4310263],
    [13000, 4031548],
    [14000, 4031548],
    [15000, 4031548],
    [20000, 4031548],
    [20500, 4310263],
    [21000, 4310263],
    [22000, 4310263],
    [23000, 4031548],
    [24000, 4031548],
    [25000, 4031548],
    [30000, 4031548],
    [30500, 4310263],
    [31000, 4310263],
    [32000, 4310263],
    [33000, 4031548],
    [34000, 4031548],
    [35000, 4031548],
    [40000, 4031548],
    [40500, 4310263],
    [41000, 4310263],
    [42000, 4310263],
    [43000, 4031548],
    [44000, 4031548],
    [45000, 4031548],
    [50000, 4031548],
]
let today = new Date();
let month = today.getMonth() + 1; // JavaScript中的月份從0開始，所以需要加1
let endMonthDay = new Date(today.getFullYear(), month, 0).getDate(); // 獲取當前月份的最後一天
function start() {
    let hyPay = db.select(`select sum(rmb) as sum
                           from zz_rmb
                           where account = '${getAccountName()}'
                             and remark = '新年'
                             and paytime >= '2025-0${month}-01'
                             and paytime < '2025-0${month + 1}-01'`);
    stage.showSystemMessage(JSON.stringify(hyPay))
    hyPay = hyPay[0].get("sum");
    hyPay = hyPay == null ? 0 : hyPay;
    let sel = `${month}月總贊助金額 #r` + hyPay + "\r\n#r\r\n";

    for (let i in items) {

        if (hyPay >= items[i][0]) {
            if (log.getEventValue(stage, db, `${month}月累充` + i) > 0) {
                sel += "#d#L" + (i) + "#" + tt + " [#r已領取#d]本月充值禮包福利 #r\t\t\t" + items[i][0] + "#l\r\n";
            } else {
                sel += "#d#L" + (i) + "#" + tt + " [可領取]本月充值禮包福利 #r\t\t\t" + items[i][0] + "#l\r\n";
            }
        } else {
            sel += "#d#L" + (i) + "#" + tt + " [未達成]本月充值禮包福利 #r\t\t\t" + items[i][0] + "#l\r\n";
        }
    }

    let selected = npc.askMenu(sel);
    sel = "			#r#e - 循環紅包 #r" + items[selected][0] + " #r元福利 -\r\n#d#n"

    // switch (items[selected][1]) {
    //     case 1:
            sel += `  #i${items[selected][1]}# #z${items[selected][1]}#[1個]\r\n`;
    //         break;
    //     case 2:
    //         sel += "  #i4031548# #z4031548#[1個]\r\n";
    //         break;
    // }
    sel += "#r#e\r\n是否現在就領取該禮包？\r\n";
    if (npc.askYesNo(sel) == 1) {
        if (log.getEventValue(stage, db, `${month}月累充` + selected) > 0) {
            npc.say("您的賬號已經領取過該禮包，無法再次領取");
        } else if (hyPay < items[selected][0]) {
            npc.say("金額未達標，無法領取");
        } else {
            if (stage.getFreeSlot(1) < 2 || stage.getFreeSlot(2) < 2 || stage.getFreeSlot(3) < 2 || stage.getFreeSlot(4) < 2 || stage.getFreeSlot(5) < 2) {
                npc.say("包裹空間不足，請確保包裹每個欄位有至少 " + 2 + " 格空間");
            } else {
                log.addEventValue(stage, db, `${month}月累充` + selected, 1, -1);
                stage.gainItem(items[selected][1], 1);

                util.broadcastChatMsg(6, "☆紅包☆  玩家 " + stage.getCharacterName() + " 領取了累充 " + items[selected][0] + " 點大禮包！！！");
                npc.say("領取成功");
            }
        }
    }
}

start();

function getAccountName() {
    
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
 
        return ret[0].get("name"); 
}