/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 商城-新端腳本
 **/
const Icon = require('constant/Icon');
let payUtils = require('constant/payUtils');
let log = require('check_log');

function 當前第幾周() {
    let temptTime = new Date()
    //周幾
    let weekday = temptTime.getDay() || 7
    //周1+5天=周六
    temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
    let firstDay = new Date(temptTime.getFullYear(), 0, 1)
    let dayOfWeek = firstDay.getDay()
    let spendDay = 1
    if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1
    }
    firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
    let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
    let result = Math.ceil(d / 7)
    return result + 1
}

function 賽季() {
    var date = new Date();
    var year = date.getFullYear()
    var 賽季標號 = year + "" + 當前第幾周();
    return 賽季標號
}

const ticketId = 4310014;
let type = 3;// 1=點券商城 2=抵用商城 3=金幣商城 4=現金點商城
let items = Array(
    Array("#i3801315##e#b 雜貨道具 #i3801315#",
        Array(5062021, 1800_0000, "", "", 100, 1),
        Array(5062500, 1800_0000, "", "", 100, 1),
        Array(5062031, 2100_0000, "", "", 100, 1),
        Array(5062026, 3000_0000, "", "", 100, 1),
        Array(5743003, 900_0000, "", "", 100, 1),
        Array(2430376, 7_0000_0000, "", "", 5, 1),
        Array(2472000, 3000_0000, "", "", 20, 1),
        Array(2048761, 300000000, "", "", 7, 1)
    ),
);
let title = "";
let haveMoney = 0;
while (true) {
    switch (type) {
        case 1:
            title = "點券"
            haveMoney = stage.getCurrency(1);
            break;
        case 2:
            title = "抵用"
            haveMoney = stage.getCurrency(2);
            break;
        case 3:
            title = "金幣"
            haveMoney = stage.getMesos();
            break;
        case 4:
            title = "現金點"
            haveMoney = getHyPay(1);
            break;
        case 5:
            title = "儲備金"
            haveMoney = payUtils.getBindMesos();
            break;
    }


    let seleted = 0;
    let str = Icon.wn24 + "#r#fn微軟雅黑##fs14##e#b[儲備金商店(周限量)]#r#k#fs12##l#k  ";
    str += `擁有: ${haveMoney}\r\n`;
    for (let i = 1; i < items[seleted].length; i++) {
        let remaining = items[seleted][i][4] - log.getEventValue(stage, db, `雪花-${賽季()}-${items[seleted][i][0]}`);

        if (items[seleted][i][2] != null) {
            str += "#k#L" + i + "##v" + items[seleted][i][0] + `# x ${items[seleted][i][5]}  #d單價#r ` + payUtils.formatNumberToMoney(items[seleted][i][1]) + " " + title + "  " + items[seleted][i][2] + `${remaining}/${items[seleted][i][4]}#l\r\n`;
            str += "" + items[seleted][i][3] + ""
        } else {
            str += "#k#L" + i + "##v" + items[seleted][i][0] + `# x ${items[seleted][i][5]}  #d單價#r ` + payUtils.formatNumberToMoney(items[seleted][i][1]) + " " + title + `${remaining}/${items[seleted][i][4]}#l\r\n`;
        }
    }
    let seletedItem = npc.askMenu(str);
    str = "#b當前選擇物品 : #v" + items[seleted][seletedItem][0] + "# 單價 :#r" + payUtils.formatNumberToMoney(items[seleted][seletedItem][1]) + title + "\r\n";
    str += "#e請輸入購買數量";
    let number;
    while (true) {
        let remaining = items[seleted][seletedItem][4] - log.getEventValue(stage, db, `雪花-${賽季()}-${items[seleted][seletedItem][0]}`);
        if (type != 3) {
            number = npc.defNum(0).minNum(1).maxNum(Math.min(haveMoney / items[seleted][seletedItem][1], remaining)).askNumber(str);
        } else {
            number = npc.defNum(0).minNum(1).maxNum(9999).askNumber(str);
        }
        if (number == 0) {
            npc.say("不可以輸入 0 哦！");
        } else if (number > remaining) {
            npc.say("限購次數不足");
        } else {
            break;
        }
    }
    str = "#b請確認購買物品：\r\n";
    str += "#b當前" + title + "：" + payUtils.formatNumberToMoney(haveMoney) + "\r\n";
    str += "#b物品 : #v" + items[seleted][seletedItem][0] + `# x ${items[seleted][seletedItem][5]} 單價 :#r` + payUtils.formatNumberToMoney(items[seleted][seletedItem][1]) + title + "\r\n";
    str += "#b數量 : " + number + " 個#b 總價 :#r" + payUtils.formatNumberToMoney((items[seleted][seletedItem][1] * number)) + title + "\r\n";
    let YN = npc.askYesNo(str);
    if (YN == 1) {
        if (stage.canHold(items[seleted][seletedItem][0], number)) {
            switch (type) {
                case 1:
                    stage.modifyCurrency(2, -(items[seleted][seletedItem][1] * number));
                    stage.gainItem(items[seleted][seletedItem][0], number);
                    log.addEventValue(stage, db, `雪花-${賽季()}-${items[seleted][seletedItem][0]}`, number, -1)
                    npc.say("購買成功");
                    break;
                case 2:
                    stage.modifyCurrency(2, -(items[seleted][seletedItem][1] * number));
                    stage.gainItem(items[seleted][seletedItem][0], number);
                    log.addEventValue(stage, db, `雪花-${賽季()}-${items[seleted][seletedItem][0]}`, number, -1)
                    npc.say("購買成功");
                    break;
                case 3:
                    if (stage.hasMesos((items[seleted][seletedItem][1] * number))) {
                        stage.gainItem(items[seleted][seletedItem][0], number);
                        stage.loseMesos(items[seleted][seletedItem][1] * number);
                        log.addEventValue(stage, db, `雪花-${賽季()}-${items[seleted][seletedItem][0]}`, number, -1)
                        npc.say("購買成功");
                    } else {
                        npc.say("金幣不足");
                    }
                    break;
                case 4:
                    gainHyPay(-(items[seleted][seletedItem][1] * number))
                    增加累計點(+(items[seleted][seletedItem][1] * number));//花改
                    stage.gainItem(items[seleted][seletedItem][0], number);
                    log.addEventValue(stage, db, "==現金點商城==:玩家: 「" + stage.getCharacterName() + "」購買了 " + items[seleted][seletedItem][2] + " x" + number + " 總計 " + (items[seleted][seletedItem][1] * number) + "現金點！");
                    log.addEventValue(stage, db, `雪花-${賽季()}-${items[seleted][seletedItem][0]}`, number, -1)
                    npc.say("購買成功");
                    break;
                case 5:
                    // player.loseItem(ticketId, items[seleted][seletedItem][1] * number);
                    payUtils.gainPay(6, -items[seleted][seletedItem][1] * number, stage, db, `儲備金限量商店`, `${sh.getItemName(items[seleted][seletedItem][0])}x${items[seleted][seletedItem][1]}`)
                    stage.gainItem(items[seleted][seletedItem][0], number * items[seleted][seletedItem][5]);
                    // setEventValue("==雪花幣商城==:玩家: 「" + player.getName() + "」購買了 " + items[seleted][seletedItem][2] + " x" + number + " 總計 " + (items[seleted][seletedItem][1] * number) + "雪花幣！", 1);
                    log.addEventValue(stage, db, `雪花-${賽季()}-${items[seleted][seletedItem][0]}`, number, -1)
                    // log.addEventValue(stage,db,'消耗雪花幣', 1, -1);
                    npc.say("購買成功");
                    break;
            }
        } else {
            npc.say("請清理背包，您當前無法放下所購買物品");
        }
    }
}


function 增加累計點(count) {
    var sql = "update hypay set leiji =leiji+" + count + " where accname = '" + getAccountName() + "';";
    db.update(sql);
}

//花改 範圍下

function getHyPay() {
    var sql = "select pay from hypay where accountid = " + stage.getAccountId();
    var result = db.select(sql,);
    if (result.size() > 0) {
        if (result.get(0) != null) {
            return result.get(0).get("pay");
        }
    } else {
        return 0;
    }

}

function gainHyPay(count) {
    var sql = "update hypay set pay =pay+" + count + " where accname = '" + getAccountName() + "';";
    db.update(sql);
}

function getAccountName() {
    const ret = db.select(`SELECT *
                           FROM account
                           WHERE id = '${stage.getAccountId()}'
                           LIMIT 0,1;`);
    return ret[0].get("name");
}
