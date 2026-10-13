/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
log = require('check_log');
let aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
let z5 = "#fEffect/CharacterEff/1112904/2/1#"; //五角花
let tz = "#fEffect/CharacterEff/1082565/2/0#"; //兔子藍
let eff1 = "#fEffect/CharacterEff/1112905/0/1#"; //小紅心
let tz12 = "#fEffect/CharacterEff/1112924/0/0#"; //黃星
let tz13 = "#fEffect/CharacterEff/1112925/0/0#"; //藍星
let tz14 = "#fEffect/CharacterEff/1112926/0/0#"; //紅星
var kk60 = "#fMap/MapHelper/weather/guildBless/7#";
var a1 = "#fUI/CashShop/CSMVPPopup/main/gradeIcon/7#"

const list = [
    "極電卷",
    "red卷",
    "黑卷",
    "榮耀卷",
    "命運卷",
	"救世卷",
    "一星卷_30_22",
    "一星卷_30_23",
    "一星卷_50_18",
    // "紙張A",
    "神秘徽章",
    "核心寶石",
];

const list2 = {
    "極電卷": [
    2616003,
    2616002,
    2613006,
    2613005,
    2612012,
    2612011,
    2048807,
    2048806,
    2046888,
    2046887
    ],
    "RED卷": [
        2048813,
    2048812,
    2615006,
    2615005,
    2616001,
    2616000,
    2612020,
    2612019,
    2613013,
    2613012
    ],
    "黑卷": [
        2048826,
    2048825,
    2616217,
    2616216,
    2615052,
    2615051,
    2613069,
    2613068,
    2612081,
    2612080
    ],
    "榮耀卷": [
        2616219,
    2616218,
    2615055,
    2615054,
    2613071,
    2613070,
    2612082, 
    2612083,
    2048831,
    2048830
    ],
    "命運卷": [
        2616225,
    2616224,
    2615061,
    2615060,
    2613077,
    2613076,
    2612090,
    2612089,
    2048849,
    2048848
    ],
	"救世卷": [
        2616235,
    2616234,
    2615071,
    2615070,
    2048857,
    2048856,
    2612100,
    2612099,
    2613087,
    2613086
    ],
    "一星卷_30_22": [2644050],
    "一星卷_30_23": [2644056],
    "一星卷_50_18": [2644084],
    "神秘徽章": [2439305],
    "核心寶石": [2435902],
    // "紙張A": [4031274],
}
const boxList = {
    "極電卷": 2432206,
    "red卷": 2435824,
    "黑卷": 2430376,
    "榮耀卷": 2430377,
    "命運卷": 2430378,
	"救世卷": 2430379,
    "一星卷_30_22": 2644050,
    "一星卷_30_23": 2644056,
    "一星卷_50_18": 2644084,
    "神秘徽章": 2439305,
    "核心寶石": 2435902,
    // "紙張A": 4031274,
}

function start() {
    let str = `               ${tz12}#b#e頑皮島卷軸保管箱${tz12}#k\r\n`;
    str += `在這裡可以自由存放卷軸，不用擔心揹包滿了\r\n`;
    str += `存入零散卷軸,取出卷軸自選箱\r\n`;
    for (let i in list) {
        str += `#L${i}#${marinstring(" ", 15, (list[i] + ":").toString())}${log.getEventValue(stage, db, "卷軸保管箱-" + list[i])}#l\r\n`;
    }
    let sel = npc.askMenu(str);

    let strSel = `#e#d請選擇操作類型#k#n\r\n`;
    strSel += `#L0#${aaa}存入卷軸#l\t`;
    strSel += `#L1#${aaa}取出卷軸#l\t`;
    switch (npc.askMenu(strSel)) {
        case 0:
            let selList = list2[list[sel]];
            let count = 0;
            for (let i in selList) {
                count += stage.getItemQuantity(selList[i]);
            }
            if (count == 0) {
                npc.say("你沒有這個卷軸");
                return;
            }
            let str2 = `您揹包中共有#r${count}#k個#b${list[sel]}#k卷軸\r\n是否存入`;
            let count2 = 0;
            if (npc.askYesNo(str2) == 1) {
                for (let i in selList) {
                    let cc = stage.getItemQuantity(selList[i]);
                    if (cc == 0) {
                        continue;
                    }
                    stage.showSystemMessage(selList[i]);
                    stage.showSystemMessage(cc);
                    stage.loseItem(selList[i], cc);

                    log.addEventValue(stage, db, `卷軸保管箱-${list[sel]}`, cc, -1);
                    count2 += cc;
                }
            }
            npc.say(`存入成功,共存入#r${count2}#k個#b${list[sel]}#k卷軸\r\n`);
            break;
        case 1:
            let count3 = log.getEventValue(stage, db, `卷軸保管箱-${list[sel]}`);
            if (count3 == 0) {
                npc.say("你沒有這個卷軸");
                return;
            }
            let str3 = `您共有#r${count3}#k個#b${list[sel]}#k卷軸\r\n是否取出`;
            let count4 = 0;
            if (npc.askYesNo(str3)) {
                let cc = parseInt(log.getEventValue(stage, db, `卷軸保管箱-${list[sel]}`));
                log.resetEventValue(stage, db, `卷軸保管箱-${list[sel]}`);
                stage.gainItem(boxList[list[sel]], cc);
                npc.say("取出成功!");
            }

    }


    start();
}

start();

function marinstring(charToFill, totalLength, originalString) {
    const lengthOfDoubleByteChars = (originalString.match(/[\u4E00-\u9FA5]/g) || []).length;
    const length = originalString.length + lengthOfDoubleByteChars;
    const charactersToFill = charToFill.repeat(totalLength - length);
    return originalString + charactersToFill;
}
