/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 150 等級箱子
 */

const listA = [
    1082543,//魔術師流浪者短褲
    1082544,//魔術師刺客短褲
    1082545,//魔術師遊俠短褲
    1082546,//魔術師丹維奇短褲
    1082547,//魔術師戰士短褲
];

const listB = [
    1082543,//魔術師流浪者短褲
    1082544,//魔術師刺客短褲
    1082545,//魔術師遊俠短褲
    1082546,//魔術師丹維奇短褲
    1082547,//魔術師戰士短褲
];

const listC = [
    1102481,//海盜頭
    1102482,//遊俠頭
    1102483,//射手頭
    1102484,//法師頭
    1102485,//戰士頭
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
    if (log.getPQLog(stage, db, "210等級獎勵") > 0 && !stage.isGm()) {
        npc.say("已經領過");
        return;
    } else if (stage.getLevel() < 210) {
        npc.say("等級不足");
        return;
    }

    let str = "恭喜您達到210級，獎勵包含\r\n自選暴君手套一件\r\n15X卷軸2張\r\n是否領取";
    if (npc.askYesNo(str) == 1) {
        let strA = "請選擇您要的上衣\r\n";
        for (let i = 0; i < listA.length; i++) {
            strA += "#L" + i + "##v" + listA[i] + ":i##z" + listA[i] + ":i##l\r\n";
        }
        let selectedA = npc.askMenu(strA);
        if (log.getPQLog(stage, db, "210等級獎勵") == 0 || stage.isGm()) {
            if (stage.getFreeSlot(1) < 12) {
                npc.say("清理揹包");
                return;
            }
            let strResult = "您選擇的物品為\r\n#v" + listA[selectedA] + ":i# #z" + listA[selectedA] + ":i#\r\n是否確定選擇";
            if (npc.askYesNo(strResult) == 1) {
                let toDropA = util.makeItem(listA[selectedA], 1);
                stage.gainItem(toDropA);
                stage.gainItem(2049384, 2);
                log.addPQLog(stage, db, "210等級獎勵", 1, -1);
                npc.say("領取成功");
            }
        } else {
            npc.say("級別不夠哦");
        }
    }
}

start();

