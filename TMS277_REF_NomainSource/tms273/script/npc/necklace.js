/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

// if (map.getId() == 100000205) {

//     player.runScript("葷素大戰");
// }


const payUtils = require('constant/PayUtils.js');
const log = require('check_log');
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
    // [`${GC1}測試金融`, "阿/測試新金融體系", "script"],
    [`葷素大戰`, "expand/menu/新葷素/葷素大戰", "script"],
    [`金銀樂透`, "expand/menu/新葷素/新葷素", "script"],
    // [`${GC1}增加星語幣`, "阿/測試新金融體系", "1"],
    // [`${GC1}增加樂豆`, "阿/測試新金融體系", "2"],
    // [`${GC1}增加累充`, "阿/測試新金融體系", "3"],
    // [`${GC1}增加抵用`, "阿/測試新金融體系", "4"],
    // [`${GC1}增加金幣`, "阿/測試新金融體系", "5"],
];


function openMenu() {
    selStr += `#d#n#fs13#請選擇要參与的玩法\r\n`;
    for (let i in MENU_CONST) {
        selStr += `#k`;
        switch (MENU_CONST[i][2]) {
            case "wait":
                selStr += `#r`;
        }
        selStr += `#L${i}#${MENU_CONST[i][0]}#l`;
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

    }


}

start();