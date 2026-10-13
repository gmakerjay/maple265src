/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


const payUtils = require('constant/PayUtils.js');
const color = require('constant/Color');
const icon = require('constant/icon');

var GC1 = "#fEffect/CharacterEff.img/1082700/2/0#";
var SW1 = "#fEffect/CharacterEff.img/1112960/0/0#";
var SW2 = "#fEffect/CharacterEff.img/1112960/0/1#";
var SW3 = "#fEffect/CharacterEff.img/1112960/0/2#";
var SW4 = "#fEffect/CharacterEff.img/1112960/0/3#";

var XC01 = "#fUI/NameTag.img/292/w#";
var XC02 = "#fUI/NameTag.img/292/c#";
var XC03 = "#fUI/NameTag.img/292/e#";

var selStr = "";


function start() {
    openMenu();
}

const MENU_CONST = [
    [`贊助兌換`, "expand/menu/贊助中心/兌換樂豆點券", "script"],
    [`硬幣兌換`, "expand/menu/遊戲商店/交換硬幣", "script"],
    [`首領結晶回收`, "9001212", "openShop"],
    [`埃蘇神秘回收`, "expand/menu//楓幣系統/分解裝備", "script"],
    [`抽獎回收->火花`, "expand/menu/抽獎功能/火花回收", "script"],
    [`抽獎回收->巫女球`, "expand/menu/抽獎功能/巫女回收", "script"]
];


function openMenu() {
    selStr += `#fs12#${color.灰}我是星語谷最好的中介，我這裏提供各類兌換服務\r\n`;
    for (let i in MENU_CONST) {
        selStr += `${color.布魯氏藍}`;
        switch (MENU_CONST[i][2]) {
            case "wait":
                selStr += `#r`;
        }
        selStr += `#L${i}# ${MENU_CONST[i][0]}#l`;
        if (((parseInt(i) + 1) % 1) == 0) {
            selStr += "\r\n";

        }
    }

    let sel = npc.askMenu(selStr);
    switch (MENU_CONST[sel][2]) {
        case "script":
            stage.runScript(MENU_CONST[sel][1]);
            break;
        case "changeMap":
            if (map.getId() == MENU_CONST[sel][1]) {
                npc.say("你在主城啦還瞎點！");
            } else {
                stage.changeMap(MENU_CONST[sel][1], 0);
            }
            break;
        case "openShop":
            stage.openShop(MENU_CONST[sel][1]);
            break;
        case "wait":
            npc.say("等待開放");
            break;
        case "1":
            payUtils.gainPay(1, 100, stage, db, "測試", "增加");
            break;
        case "2":
            payUtils.gainPay(2, -100, stage, db, "測試", "扣除");
            break;
        case "3":
            payUtils.gainPay(3, 100, stage, db, "測試", "增加");
            break;
        case "4":
            payUtils.gainPay(4, 100, stage, db, "測試", "增加");
            break;
        case "5":
            payUtils.gainPay(5, 100, stage, db, "測試", "增加");
            break;

    }


}

start();