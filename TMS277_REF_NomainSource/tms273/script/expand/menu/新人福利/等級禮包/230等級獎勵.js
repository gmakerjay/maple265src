/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 150 等級箱子
 */


const listA = [
    1132174,
    1132175,
    1132176,
    1132177,
    1132178,
];

const listB = [
    1082543,//魔术师流浪者短裤
    1082544,//魔术师刺客短裤
    1082545,//魔术师游侠短裤
    1082546,//魔术师丹维奇短裤
    1082547,//魔术师战士短裤
];

const listC = [
    1102481,//海盗头
    1102482,//游侠头
    1102483,//射手头
    1102484,//法师头
    1102485,//战士头
];

const listD = [
    1132174,
    1132175,
    1132176,
    1132177,
    1132178,
];

/**
 * 150等武器自選
 **/


// let boxId = 2431901;//箱子ID
let log = require('check_log');

function start() {
    // if (!stage.isGm()) {
    //     return;
    // }
    if (log.getPQLog(stage, db, "230等級獎勵") > 0 && !stage.isGm()) {
        npc.say("已經領過");
        return;
    } else if (stage.getLevel() < 230) {
        npc.say("等級不足");
        return;
    }

    let str = "恭喜您達到230級，獎勵包含\r\n自選暴君手套一件\r\n15X卷軸2張\r\n是否領取";
    if (npc.askYesNo(str) == 1) {
        let strA = "請選擇您要的上衣\r\n";
        for (let i = 0; i < listA.length; i++) {
            strA += "#L" + i + "##v" + listA[i] + ":i##z" + listA[i] + ":i##l\r\n";
        }
        let selectedA = npc.askMenu(strA);
        if (log.getPQLog(stage, db, "230等級獎勵") == 0 || stage.isGm()) {
            if (stage.getFreeSlot(1) < 12) {
                npc.say("清理揹包");
                return;
            }
            let strResult = "您選擇的物品為\r\n#v" + listA[selectedA] + ":i# #z" + listA[selectedA] + ":i#\r\n是否確定選擇";
            if (npc.askYesNo(strResult) == 1) {
                let toDropA = util.makeItem(listA[selectedA], 1);
                stage.gainItem(toDropA);
                stage.gainItem(2049384, 2);
                log.addPQLog(stage, db, "230等級獎勵", 1, -1);
                npc.say("領取成功");
            }
        } else {
            npc.say("級別不夠哦");
        }
    }
}

start();

