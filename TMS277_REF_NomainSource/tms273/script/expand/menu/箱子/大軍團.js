/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var {getPay} = require('vipCommon.js');

const boxId = 2439138;

const list = [
    [2048761, 500, 1, "覺醒火焰", "8%"],
    [5062009, 800, 3, "紅磨魔方", "12%"],
    [2472000, 800, 3, "白金錘", "12%"],
    [5062024, 800, 3, "六角", "8%"],
    [5062022, 800, 3, "鏡像魔方", "12%"],
    [5062021, 800, 3, "平等魔方", "8%"],
    [5062026, 800, 3, "唯一魔方", "7%"],
    [5062009, 800, 3, "紅磨魔方", "12%"],
    [2472000, 800, 3, "白金錘", "12%"],
    [5062024, 800, 3, "六角", "8%"],
    [5062022, 800, 3, "鏡像魔方", "12%"],
    [5062021, 800, 3, "平等魔方", "8%"],
    [5062026, 800, 3, "唯一魔方", "7%"],
    [5062009, 800, 3, "紅磨魔方", "12%"],
    [2472000, 800, 3, "白金錘", "12%"],
    [5062024, 800, 3, "六角", "8%"],
    [5062022, 800, 3, "鏡像魔方", "12%"],
    [5062021, 800, 3, "平等魔方", "8%"],
    [5062026, 800, 3, "唯一魔方", "7%"],
    [5062009, 800, 3, "紅磨魔方", "12%"],
    [2472000, 800, 3, "白金錘", "12%"],
    [5062024, 800, 3, "六角", "8%"],
    [5062022, 800, 3, "鏡像魔方", "12%"],
    [5062021, 800, 3, "平等魔方", "8%"],
    [5062026, 800, 3, "唯一魔方", "7%"],
    [5062009, 800, 3, "紅磨魔方", "12%"],
    [2472000, 800, 3, "白金錘", "12%"],
    [5062024, 800, 3, "六角", "8%"],
    [5062022, 800, 3, "鏡像魔方", "12%"],
    [5062021, 800, 3, "平等魔方", "8%"],
    [5062026, 800, 3, "唯一魔方", "7%"],
    [5062009, 800, 3, "紅磨魔方", "12%"],
    [2472000, 800, 3, "白金錘", "12%"],
    [5062024, 800, 3, "六角", "8%"],
    [5062022, 800, 3, "鏡像魔方", "12%"],
    [5062021, 800, 3, "平等魔方", "8%"],
    [5062026, 800, 3, "唯一魔方", "7%"],
    [5062009, 800, 3, "紅磨魔方", "12%"],
    [2472000, 800, 3, "白金錘", "12%"],
    [5062024, 800, 3, "六角", "8%"],
    [5062022, 800, 3, "鏡像魔方", "12%"],
    [5062021, 800, 3, "平等魔方", "8%"],
    [5062026, 800, 3, "唯一魔方", "7%"],
];
const list2 = [
    // [1012632, 600, 1, "口紅", "6%"],
    // [1022278, 600, 1, "眼罩", "6%"],
    // [1132308, 2500, 1, "腰帶", "25%"],
    // [2633926, 4000, 1, "書", "40%"],
    [1113306, 400, 1, "巨大恐懼", "4%"],
    [1122430, 400, 1, "痛苦根源", "4%"],
    [1032316, 1500, 1, "耳環", "15%"],
];
const log = require('check_log');
let count = log.getEventValue(stage, db, "大軍團隨機") * 400 + 1000;

function start() {
    let str = `請選擇您要開啟的方式:\r\n`;
    str += `#L1#使用20個碎片開啟 (小概率獲得漆黑套裝)#l\r\n`;
    str += `#L2#使用${count}個碎片開啟 (必中漆黑套裝,開啟消耗遞增)#l\r\n`;
    str += `#L3#使用5000個碎片開啟 (自選漆黑套裝)#l\r\n`;

    switch (npc.askMenu(str)) {
        case 1:
            if (!stage.hasItem(boxId, 20)) {
                npc.say("碎片不足");
                return;
                // return;
            }
            if (stage.getFreeSlot(1) < 5 || stage.getFreeSlot(2) < 5 || stage.getFreeSlot(3) < 5 || stage.getFreeSlot(5) < 5) {
                npc.say("清理背包");
                return;
            }
            str = `是否花費20個碎片開啟,有小概率獲得漆黑套裝?`;
            if (npc.askYesNo(str) == 1) {
                let item = roll(list);
                stage.loseItem(boxId, 20);
                stage.gainItem(item[0], item[2]);
                npc.say("獲得了 #b#t" + item[0] + "##k " + item[2] + "個");
            }
            break;
        case 2:
            // if (player.isGm()) {
            if (stage.hasItem(boxId, count)) {
                stage.loseItem(boxId, count);
                log.addEventValue(stage, db, "大軍團隨機", 1, -1);
                let itemInfo = roll(list2);
                if (getPay(db, stage, 3) < 10000) {
                    itemInfo = [1032316, 1500, 1, "耳環", "15%"];
                }
                //if (player.getId() == 38802) {
                //itemInfo =     [1012632, 600, 1, "口紅", "6%"]

                //}
                let toDrop = util.makeItem(itemInfo[0], 1);
                toDrop.setAttribute(8);
                stage.gainItem(toDrop);
                util.broadcastChatMsg(1, `<${stage.getCharacterName()}> 開啟大軍團長的寶物獲得了 <${util.getItemName(itemInfo[0])}>`);
                let body = {
                    "message": `大軍團長的寶物:\n玩家 <${stage.getCharacterName()}> \n獲得了 <${util.getItemName(itemInfo[0])}>\n讓我們恭喜他!!!`
                }
                //npc.httpPost("http://127.0.0.1:5788/api/notice", JSON.stringify(body));
                npc.say(`恭喜您獲得 #b${util.getItemName(itemInfo[0])}`);
            } else {
                npc.say("碎片不足");
            }
            // }
            break;
        case 3:
            if (!stage.hasItem(boxId, 5000)) {
                npc.say("碎片不足");
                return;
                // return;
            }
            str = `您可以消耗5000個#v${boxId}:i#碎片兌換一個自選漆黑\r\n`;
            for (let i in list2) {
                str += `#L${i}##v${list2[i][0]}:i##z${list2[i][0]}:i##l\r\n`;
            }
            let sel3 = npc.askMenu(str);
            if (npc.askYesNo(`是否確認兌換#v${list2[sel3][0]}:i##z${list2[sel3][0]}:i#`) == 1) {
                stage.loseItem(boxId, 5000);
                // player.gainItem(list2[sel3][0], 1);
                let toDrop = util.makeItem(list2[sel3][0], 1);
                toDrop.setAttribute(8);
                stage.gainItem(toDrop);
                let body = {
                    "message": `大軍團長的寶物:\n玩家 <${stage.getCharacterName()}> \n獲得了 <${util.getItemName(list2[sel3][0])}>\n讓我們恭喜他!!!`
                }
                //npc.httpPost("http://127.0.0.1:5788/api/notice", JSON.stringify(body));
                npc.say("獲得了 #b#t" + list2[sel3][0] + "##k " + 1 + "個");
            }
            break;
    }
}

start();

function roll(list) {
    if (!Array.isArray(list) || list.length === 0) {
        return null;
    }
    const totalWeight = list.reduce((acc, item) => acc + item[1], 0);
    const randomNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    for (let item of list) {
        cumulativeWeight += item[1];
        if (randomNum < cumulativeWeight) {
            return item;
        }
    }
    return null;
}