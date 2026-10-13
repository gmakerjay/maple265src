/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
const {getPay, loseRMB, losePay} = require('vipCommon.js');
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
let log = require('check_log');
const list = [
    ["雜貨商店", 1, 2060004],
    ["副手商店", 1, 9072100],
    ["裝備商店", 2, "裝備商店"],
    ["強化商店", 2, "強化商店"],
    ["其他商店", 2, "其他商店"],
    ["BUFF商店", 2, "BUFF商店"],
    ["機器商店", 2, "機器商店\r\n#r銀河戰士可潛能"],
    // ["傷害皮膚", 2, "傷害皮膚"],
    ["理髮整容", 2, "整形商店"],
    // ["內測商店", 2, "內測商店"],
    ["首領商店", 2, "首領怪幣商店"],
    ["巫女商店", 2, "巫女商店"],
    ["埃蘇商店", 1, 3003108],
    ["暴君商店", 1, 3003109],
    ["拼圖商店", 3, "遊戲商店/拼圖商店"],
    ["神秘武器", 1, 3003106],
    ["神秘防具", 1, 3003105],
];
const list2 = [];
let shopName = ["理髮整容", 2, "整形商店"];
let demo = require(`constant/遊戲商店/${shopName[0]}`);

function start() {

    openShop();
}


function openShop() {
    itemlistall = demo.itemlistall;
    let str = `歡迎光臨星語谷${shopName[2]}！\r\n`
    switch (shopName[0]) {
        case "首領商店":
            str += `#b擁有#v${首領怪幣}:i#: #r${stage.getItemQuantity(首領怪幣)}\r\n`;
            break;
        case "巫女商店":
            str += `#b擁有#v${巫女球}:i#: #r${stage.getItemQuantity(巫女球)}\r\n`;
            break;
        default:
            str += `#b樂豆: #r${getPay(db, stage, 2)}\r\n`;
            str += `#b抵用券: #r${stage.getCurrency(2)}\r\n`;
            str += `#b金幣: #r${stage.getMesos()}\r\n`;
            break;
    }

    for (let i = 0; i < itemlistall.length; i++) {
        let typeStr = "";
        switch (itemlistall[i][2]) {
            case 1:
                typeStr = "樂豆";
                break;
            case 2:
                typeStr = "抵用券";
                break;
            case 3:
                typeStr = "金幣";
                break;
            case 4:
                typeStr = `#v${首領怪幣}:i#`;
                break;
            case 5:
                typeStr = `#v${巫女球}:i#`;
                break;
        }
        str += `#d#L${i}##v${itemlistall[i][0]}:i##z${itemlistall[i][0]}:i##b ${typeStr}: #r${itemlistall[i][1]}#l\r\n`;
    }
    let selectedItem = npc.askMenu(str);
    let typeStr = "";
    switch (itemlistall[selectedItem][2]) {
        case 1:
            typeStr = "樂豆";
            break;
        case 2:
            typeStr = "抵用券";
            break;
        case 3:
            typeStr = "金幣";
            break;
        case 4:
            typeStr = `#v${首領怪幣}:i#`;
            break;
        case 5:
            typeStr = `#v${巫女球}:i#`;
            break;
    }
    str = "#b當前選擇物品 : #v" + itemlistall[selectedItem][0] + `# 單價${typeStr} :#r` + itemlistall[selectedItem][1] + "\r\n";
    str += "#e請輸入購買數量#n#b";
    // str += "\r\n#e剩餘限購數量:" + (items[selected][selectedItem][3] - getEventValue("賬號限購" + items[selected][selectedItem][0], false));
    let number;
    number = npc.defNum(1).minNum(1).maxNum(9999).askNumber(str);

    str = "#b請確認購買物品：\r\n";
    str += "#b物品 : #v" + itemlistall[selectedItem][0] + `# 單價${typeStr} :#r` + itemlistall[selectedItem][1] + "\r\n";
    str += "#b數量 : " + number + ` 個#b 總價${typeStr} :#r` + (itemlistall[selectedItem][1] * number) + "\r\n";
    let YN = npc.askYesNo(str);
    if (YN == 1) {
        if (stage.canHold(itemlistall[selectedItem][0], number)) {
            let canBuy = false;
            switch (itemlistall[selectedItem][2]) {
                case 1:// 樂豆
                    if (getPay(db, stage, 2) >= itemlistall[selectedItem][1] * number) {
                        canBuy = true;
                    }
                    break;
                case 2:
                    if (stage.getCurrency(2) >= itemlistall[selectedItem][1] * number) {
                        canBuy = true;
                    }
                    break;
                case 3:
                    if (stage.getMesos() >= itemlistall[selectedItem][1] * number) {
                        canBuy = true;
                    }
                    break;
                case 4:
                    if (stage.getItemQuantity(首領怪幣) >= itemlistall[selectedItem][1] * number) {
                        canBuy = true;
                    }
                    break;
                case 5:
                    if (stage.getItemQuantity(巫女球) >= itemlistall[selectedItem][1] * number) {
                        canBuy = true;
                    }
                    break;
            }
            if (canBuy) {
                switch (itemlistall[selectedItem][2]) {
                    case 1:// 樂豆
                        losePay(db, stage, itemlistall[selectedItem][1] * number);
                        break;
                    case 2:
                        stage.modifyCurrency(2, -itemlistall[selectedItem][1] * number);
                        break;
                    case 3:
                        stage.loseMesos(itemlistall[selectedItem][1] * number);
                        break;
                    case 4:
                        stage.loseItem(首領怪幣, itemlistall[selectedItem][1] * number);
                        break;
                    case 5:
                        stage.loseItem(巫女球, itemlistall[selectedItem][1] * number);
                        break;
                }
                if (itemlistall[selectedItem][3]) {
                    if (itemlistall[selectedItem][3] == -1) {
                        for (let i = 0; i < number; i++) {
                            let toDrop = util.makeItem(itemlistall[selectedItem][0], 1);
                            toDrop.setCuttable(0);
                            toDrop.attribute(8);
                            toDrop.setTitle('可剪刀0次');
                            stage.gainItem(toDrop);
                        }
                    } else {
                        stage.gainItem(itemlistall[selectedItem][0], number, itemlistall[selectedItem][3]);
                    }
                } else {
                    stage.gainItem(itemlistall[selectedItem][0], number);
                }
                npc.say("購買成功");
                openShop();
            } else {
                npc.say("錢不夠哦");
            }
        } else {
            npc.say("請清理背包，您當前無法放下所購買物品");
        }
    }
}

start();


