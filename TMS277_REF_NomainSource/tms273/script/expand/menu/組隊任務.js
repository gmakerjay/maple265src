/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


var GC1 = "#fEffect/CharacterEff.img/1082700/2/1#";
var SW1 = "#fEffect/CharacterEff.img/1112960/0/0#";
var SW2 = "#fEffect/CharacterEff.img/1112960/0/1#";
var SW3 = "#fEffect/CharacterEff.img/1112960/0/2#";
var SW4 = "#fEffect/CharacterEff.img/1112960/0/3#";
var SW4 = "#fEffect/CharacterEff.img/1112960/0/4#";
var SW5 = "#fEffect/CharacterEff.img/1112960/0/5#";
var SW6 = "#fEffect/CharacterEff.img/1112960/0/6#";
var SW7 = "#fEffect/CharacterEff.img/1112960/0/7#";

var XC01 = "#fUI/NameTag.img/292/w#";
var XC02 = "#fUI/NameTag.img/292/c#";
var XC03 = "#fUI/NameTag.img/292/e#";

var selStr = "";

function start() {
    openMenu();
}

const MENU_CONST = [
//   [`海盜船`, "npc/prisonBreak_enter", "script", 'q1'],
    [`御龍魔`, "npc/prisonBreak_enter", "script", 'q2'],
    [`玩具塔`, "npc/party2_enter", "script", 'q3'],
    [`第一次同行`, "npc/party1_enter", "script", 'q4'],
    //   [`女神的痕跡`, "npc/party3_enter", "script", 'w1'],
    //   [`毒霧森林`, "npc/wuParty6_elin", "script", 'w2'],
    [`逃脫`, "npc/prisonBreak_enter", "script", 'w3'],
];

function openMenu() {
    selStr += `#d#n#fs13#組隊任務\r\n`;
    for (let i in MENU_CONST) {
        selStr += `#k`;
        switch (MENU_CONST[i][2]) {
            case "wait":
                selStr += `#r`;
        }
        selStr += `#b${MENU_CONST[i][0]} 開放#k`;
        if (((parseInt(i) + 1) % 1) == 0) {
            selStr += "\r\n";
        }
    }
    selStr += `\r\n#L0#前往組隊大廳#l`;
    selStr += `\r\n#L1#組隊一條龍獎勵#l`;

    let sel = npc.askMenu(selStr);
    if (sel == 0) {
        if (map.getId() != 100030301) {
            stage.changeMap(100030301, 0);
        } else {
            npc.say('您已經在組隊大廳了');
        }
    } else if (sel == 1) {
        stage.runScript('expand/menu/組隊副本獎勵/新組隊一條龍');
    }
}

start();
