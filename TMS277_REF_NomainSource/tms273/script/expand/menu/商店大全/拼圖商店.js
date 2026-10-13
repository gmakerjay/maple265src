/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
const {getPay, losePay} = require('vipCommon.js');
var {首領怪幣, 銀河自選箱, 巫女球} = require('constant/item.js');


let xiaoxingxing = "#fEffect/CharacterEff/1073453/0/0#";
let xing = "#fEffect/CharacterEff/moveRandomSprayEff/quiverCartridge/effect/2/2#";
var a2 = "#fItem/Pet/5000981.img/move/6#";//小貓翻滾
let tu1 = "#fItem/Cash/0501.img/05010045/effect/stand1/1#"
let tu2 = "#fItem/Cash/0501.img/05010002/effect/default/7#"
let tu3 = "#fUI/NameTag/medal/758/w#"
let tu4 = "#fEffect/SetEff.img/245/effect/28#"
let tu5 = "#fUI/NameTag/medal/758/e#"
let tu6 = "#fUI/NameTag/medal/758/c#"

function loseRMB(rmb, coin) {
    var myAccountName = getAccountName();
    var sql = "insert into zz_rmb(account, rmb, paytime,remark) values('" + myAccountName + "'," + rmb + ",now(),'購買月卡')";
    db.insert(sql);
}


const list = [
    ["拼圖箱子", 2, "拼圖箱子"],
];

let shopName = "";

function start() {
    let str = "";
    for (let i in list) {
        str += i % 3 == 0 ? "\r\n" : "";
        str += `#L${i}#${a2}${list[i][0]}#l`;
    }
    let selection = 0;
    switch (list[selection][1]) {
        case 1:
            stage.openShop(list[selection][2]);
            break;
        case 2:
            shopName = list[selection];
            openShop();
            break;
    }
}

function openShop() {
    let demo = require(`constant/裝備製作/${shopName[0]}`);
    itemlistall = demo.itemlistall['拼圖箱子'];
    let str = `歡迎光臨頑皮島${shopName[2]}！\r\n`
    switch (shopName[0]) {
        case "拼圖箱子":
            str += `#b擁有 星語幣: #r${getPay(db, stage, 1)}\r\n`;
            break;
        case "巫女商店":
            str += `#b擁有#v${巫女球}:i#: #r${stage.getItemQuantity(巫女球)}\r\n`;
            break;
        default:
            str += `#b抵用券: #r${stage.getCurrency(2)}\r\n`;
            str += `#b金幣: #r${stage.getMesos()}\r\n`;
            str += `#b金幣: #r${stage.getMesos()}\r\n`;
            break;
    }

    let typeStr = "星語幣";
    for (let i = 0; i < itemlistall.length; i++) {

        str += `#d#L${i}##v${itemlistall[i][0]}:i##z${itemlistall[i][0]}:i##b ${typeStr}: #r${itemlistall[i][1]}#l\r\n`;
    }

    str += `\r\n#L1001#回收拼圖#l`;
    // str += `#r#L1001##v1114403:i##z1114403:i##b ${typeStr}: #r458 回收#l\r\n`;
    let selectedItem = npc.askMenu(str);
    if (selectedItem > 1000) {
        switch (selectedItem) {
            case 1001:
                stage.runScript('expand/menu/拼圖/拼圖分解');
                break;
        }
    } else {
        let typeStr = "星語幣";
        str = "#b當前選擇物品 : #v" + itemlistall[selectedItem][0] + `# 單價${typeStr} :#r` + itemlistall[selectedItem][1] + "\r\n";
        str += "#e請輸入購買數量#n#b";
        // str += "\r\n#e剩餘限購數量:" + (60 - player.getEventValue("賬號限購起源箱61"));
        let number;
        number = npc.defNum(1).minNum(1).maxNum(60).askNumber(str);
        str = "#b請確認購買物品：\r\n";
        str += "#b物品 : #v" + itemlistall[selectedItem][0] + `# 單價${typeStr} :#r` + itemlistall[selectedItem][1] + "\r\n";
        str += "#b數量 : " + number + ` 個#b 總價${typeStr} :#r` + (itemlistall[selectedItem][1] * number) + "\r\n";
        let YN = npc.askYesNo(str);
        if (YN == 1) {
            if (stage.canHold(itemlistall[selectedItem][0], number)) {
                let canBuy = false;
                if (getPay(db, stage, 1) >= itemlistall[selectedItem][1] * number) {
                    canBuy = true;
                }
                if (canBuy) {
                    loseRMB(-itemlistall[selectedItem][1] * number);
                    stage.gainItem(itemlistall[selectedItem][0], number);
                    npc.say("購買成功");
                } else {
                    npc.say("無法購買");
                }
            } else {
                npc.say("請清理背包，您當前無法放下所購買物品");
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
