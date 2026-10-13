/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let {getPay} = require('vipCommon');
let log = require('check_log');
// import {laba} from "common/laba"
var text;
var diff;
var sel;
var time;
// var aaa = "#fEffect/CharacterEff/1112949/4/0#";

let aaa = "#fEffect/CharacterEff/moveRandomSprayEff/quiverCartridge/effect/2/2#";
// var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
// 每個禮包所需的在線時長
// var condition = new Array( 120, 240, 360, 480);
var condition = new Array(60, 120, 180, 240, 300, 360, 420, 480); // 公測TODO


let lc = getPay(db, stage, 3);

const list = [
    [30000, 1, 1143012],
    [10000, 1, 2635226],
    [20000, 1, 2636800],
    [25000, 2, 'buff2'],
    [50000, 2, 'buff3'],
    [60000, 3, '島主之力15點'],
];

var time = stage.getOnlineTime();
var text1 = "";
let status = [];

function start() {
    for (let i in list) {
        status.push(lc >= list[i][0]);
    }
    text = "#d您的累充為： #r" + lc + "#k \r\n";
    text += `#L0##v1143012##z1143012:i#(角色)  累充${list[0][0]}#l\r\n`;
    text += `#L1##v2635226##z2635226:i#(角色)  累充${list[1][0]}#l\r\n`;
    text += `#L2##v2636800##z2636800:i#(角色)  累充${list[2][0]}#l\r\n`;
    text += `#L3##s80002932:i# 2級(賬號)  累充${list[3][0]}#l\r\n`;
    text += `#L4##s80002932:i# 3級(賬號)  累充${list[4][0]}#l\r\n`;
    text += `#L5##s80000616:i# 15級(賬號)  累充${list[5][0]}#l\r\n`;
    let selection = npc.askMenu(text + "\r\n");

    if (!status[selection]) {
        npc.say('條件未達成');
        return;
    }
    switch (selection) {
        case 0:
            if (log.getPQLog(stage, db, '累充30000領取') > 0) {
                npc.say("您已經領過本稱號");
            } else {
                stage.gainItem(list[selection][2], 1);
                log.addPQLog(stage, db, "累充30000領取", 1, -1);
                util.broadcastChatMsg(1, `玩家 <${stage.getCharacterName()}> 領取了30000累充勳章，恭喜！！！ <${util.getItemName(1143012)}>`);
                util.broadcastChatMsg(2, `玩家 <${stage.getCharacterName()}> 領取了30000累充勳章，恭喜！！！ <${util.getItemName(1143012)}>`);
                util.broadcastChatMsg(3, `玩家 <${stage.getCharacterName()}> 領取了30000累充勳章，恭喜！！！ <${util.getItemName(1143012)}>`);
                util.broadcastChatMsg(4, `玩家 <${stage.getCharacterName()}> 領取了30000累充勳章，恭喜！！！ <${util.getItemName(1143012)}>`);
                util.broadcastChatMsg(5, `玩家 <${stage.getCharacterName()}> 領取了30000累充勳章，恭喜！！！ <${util.getItemName(1143012)}>`);
                util.broadcastChatMsg(6, `玩家 <${stage.getCharacterName()}> 領取了30000累充勳章，恭喜！！！ <${util.getItemName(1143012)}>`);
                util.broadcastWeatherEffectNotice(`<${stage.getCharacterName()}> 領取了30000累充勳章，恭喜！！！ <${util.getItemName(1143012)}>`, 224, 100000, true);
                let body = {
                    "message": `累充勳章:\n玩家 <${stage.getCharacterName()}> \n領取了30000累充勳章，恭喜！！！\n讓我們恭喜這個比亞迪!!!`
                }
                //npc.httpPost("http://127.0.0.1:5788/api/notice", JSON.stringify(body));
            }
            break;
        case 1:
            if (log.getPQLog(stage, db, '累充10000領取') > 0) {
                npc.say("您已經領過本稱號");
            } else {
                stage.gainItem(list[selection][2], 1);
                log.addPQLog(stage, db, "累充10000領取", 1, -1);
                util.broadcastChatMsg(1, `玩家 <${stage.getCharacterName()}> 領取了10000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(2, `玩家 <${stage.getCharacterName()}> 領取了10000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(3, `玩家 <${stage.getCharacterName()}> 領取了10000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(4, `玩家 <${stage.getCharacterName()}> 領取了10000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(5, `玩家 <${stage.getCharacterName()}> 領取了10000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(6, `玩家 <${stage.getCharacterName()}> 領取了10000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastWeatherEffectNotice(`<${stage.getCharacterName()}> 領取了10000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`, 224, 100000, true);
                let body = {
                    "message": `累充勳章:\n玩家 <${stage.getCharacterName()}> \n領取了10000累充勳章，恭喜！！！\n讓我們恭喜這個比亞迪!!!`
                }
                //npc.httpPost("http://127.0.0.1:5788/api/notice", JSON.stringify(body));
            }
            break;
        case 2:
            if (log.getPQLog(stage, db, '累充20000領取') > 0) {
                npc.say("您已經領過本稱號");
            } else {
                stage.gainItem(list[selection][2], 1);
                log.addPQLog(stage, db, "累充20000領取", 1, -1);
                util.broadcastChatMsg(1, `玩家 <${stage.getCharacterName()}> 領取了20000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(2, `玩家 <${stage.getCharacterName()}> 領取了20000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(3, `玩家 <${stage.getCharacterName()}> 領取了20000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(4, `玩家 <${stage.getCharacterName()}> 領取了20000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(5, `玩家 <${stage.getCharacterName()}> 領取了20000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastChatMsg(6, `玩家 <${stage.getCharacterName()}> 領取了20000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`);
                util.broadcastWeatherEffectNotice(`<${stage.getCharacterName()}> 領取了20000累充勳章，恭喜！！！ <${util.getItemName(list[selection][2])}>`, 224, 100000, true);
                let body = {
                    "message": `累充勳章:\n玩家 <${stage.getCharacterName()}> \n領取了20000累充勳章，恭喜！！！\n讓我們恭喜這個比亞迪!!!`
                }
                //npc.httpPost("http://127.0.0.1:5788/api/notice", JSON.stringify(body));
            }
            break;
        case 3:
            if (log.getEventValue(stage, db, '累充25000技能領取') > 0) {
                npc.say("您已經領過這個檔位");
            } else {
                if (npc.askYesNo('是否再本角色進修下列技能\r\n#s80002932:i# 2級') == 1) {
                    log.addEventValue(stage, db, '累充25000技能領取', 1, -1);
                    log.addPQLog(stage, db, '累充25000技能領取', 1, -1);
                    stage.changeSkillLevel(80002932, parseInt(stage.getSkillLevel(80002932)) + 2);
                    npc.say('領取成功');
                }
            }
            break;
        case 4:
            if (log.getEventValue(stage, db, '累充50000技能領取') > 0) {
                npc.say("您已經領過這個檔位");
            } else {
                if (npc.askYesNo('是否再本角色進修下列技能\r\n#s80002932:i# 3級') == 1) {
                    log.addEventValue(stage, db, '累充50000技能領取', 1, -1);
                    log.addPQLog(stage, db, '累充50000技能領取', 1, -1);
                    stage.changeSkillLevel(80002932, parseInt(stage.getSkillLevel(80002932)) + 3);
                    npc.say('領取成功');
                }
            }
            break;
        case 5:
            if (log.getEventValue(stage, db, '累充60000技能領取') > 0) {
                npc.say("您已經領過這個檔位");
            } else {
                if (npc.askYesNo('是否再本角色進修下列技能\r\n#s80000616:i# 15級') == 1) {
                    log.addEventValue(stage, db, '累充60000技能領取', 1, -1);
                    log.addPQLog(stage, db, '累充60000技能領取', 1, -1);
                    stage.changeSkillLevel(80000616, parseInt(stage.getSkillLevel(80000616)) + 15);
                    npc.say('領取成功');
                }
            }
            break;
    }


}

start();