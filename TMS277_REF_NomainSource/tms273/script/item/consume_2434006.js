/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var {getPay} = require('vipCommon.js');

const list = [
    [1012632, 600, 1, "口紅", "6%"],
    [1022278, 600, 1, "眼罩", "6%"],
    [1132308, 2700, 1, "腰帶", "25%"],
    [2633926, 4200, 1, "書", "40%"],
    [1113306, 400, 1, "巨大恐懼", "0.5%"],
    [1122430, 400, 1, "痛苦根源", "0.5%"],
    [1032316, 1700, 1, "耳環", "0.5%"],
];
const list2 = [
    [1132308, 2700, 1, "腰帶", "25%"],
    [2633926, 4200, 1, "書", "40%"],
    [1032316, 1700, 1, "耳環", "0.5%"],
];


function start() {
    if (stage.hasItem(2434006, 50)) {
        stage.loseItem(2434006, 50);
        let itemInfo = roll(list);
        if (getPay(db, stage, 3) < 10000) {
            itemInfo = roll(list2);
        }
        let toDrop = util.makeItem(itemInfo[0], 1);
        toDrop.setAttribute(8);
        stage.gainItem(toDrop);
        // player.gainItem(itemInfo[0], itemInfo[2]);
        util.broadcastChatMsg(1, `<${stage.getCharacterName()}> 開啟首領怪飾品箱獲得了 <${util.getItemName(itemInfo[0])}>`);
        let body = {
            "message": `首領怪飾品箱:\n玩家 <${stage.getCharacterName()}> \n獲得了 <${util.getItemName(itemInfo[0])}>\n讓我們恭喜他!!!`
        }
        //npc.httpPost("http://127.0.0.1:5788/api/notice", JSON.stringify(body));
        npc.say(`恭喜您獲得 #b${util.getItemName(itemInfo[0])}`);
    } else {
        npc.say("本箱50個碎片可開啟一次");
    }
}

// if (player.isGm()) {

start();

// }

function roll(list) {
    // 計算總權重
    const totalWeight = list.reduce((acc, item) => acc + item[1], 0);

    // 生成一個0到totalWeight之間的隨機數
    const randomNum = Math.random() * totalWeight;

    // 根據隨機數，確定抽取的獎品
    let cumulativeWeight = 0;
    for (var item of list) {
        cumulativeWeight += item[1];
        if (randomNum < cumulativeWeight) {
            // 返回抽取的獎品的[id, 數量, 名字]
            return item;
        }
    }

    // 如果沒有成功抽取獎品（例如獎池為空），返回null或者其他適當的值
    return null;
};
