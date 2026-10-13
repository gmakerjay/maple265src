/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var {PuzzleBox} = require('constant/PuzzleBox.js');


function start() {
    let itemId = ctx.getDataId();
    // npc.say(number);
    let info = PuzzleBox[itemId];
    let str = `是否開啟一個#v${itemId}:i# (碎片概率均等)\r\n`;
    let awakeningrateShow = parseInt(info['awakeningrateShow']);
    let awakeningrate = parseInt(info['awakeningrate']);
    let list = info['list'];
    let listA;
    if (awakeningrateShow > 0) {
        listA = info['listA'];
        str += `有${awakeningrateShow}%概率獲得覺醒碎片\r\n`;
        for (let i in listA) {
            str += `#v${listA[i]}:i#`;
        }
        str += `\r\n`;
        str += `或普通碎片\r\n`;
        for (let i in list) {
            str += `#v${list[i]}:i#`;
        }
        str += `\r\n`;
    } else {
        for (let i in list) {
            str += `#v${list[i]}:i#`;
        }
        str += `\r\n`;
    }
    // npc.debug(npc.getScriptName());
    if (npc.askYesNo(str) == 1) {
        if (!stage.hasItem(itemId, 1)) {
            npc.say("抱歉，碎片箱不足");
        } else if (!stage.canHold(1680214, 1)) {
            npc.say("抱歉，拼圖保管箱空間不足");
        } else {
            stage.loseItem(itemId, 1);
            let rand = Math.random();
            let o1 = (parseInt(awakeningrate) / 100);
            // player.showSystemMessage(`${rand} - ${o1} - ${rand < o1}`);
            if (awakeningrate > 0 && rand < o1) {
                // 覺醒箱
                let finalItemId = listA[Math.floor(Math.random() * listA.length)];
                stage.gainItem(finalItemId, 1);
                let str = "【拼圖箱】: 恭喜玩家 <" + stage.getCharacterName() + ">從拼圖箱中獲取[" + util.getItemName(finalItemId) + "]"
                stage.showSystemMessage(str);
                util.broadcastGachaponMsg("拼圖箱：恭喜玩家<" + stage.getCharacterName() + ">獲得了覺醒碎片 {}", util.makeItem(finalItemId, 1));
                npc.say(`恭喜獲得一片#r#e覺醒碎片#k#n\r\n#v${finalItemId}:i##z${finalItemId}:i#\r\n\r\n#e#r(注意:拼圖背包 24 格滿了后，將獲得拼圖失敗)`);
            } else {
                let finalItemId = list[Math.floor(Math.random() * list.length)];
                stage.gainItem(finalItemId, 1);
                npc.say(`恭喜獲得一片\r\n#v${finalItemId}:i##z${finalItemId}:i#\r\n\r\n#e#r(注意:拼圖背包 24 格滿了后，將獲得拼圖失敗)`);
            }
            if (stage.hasItem(itemId, 1)) {
                start();
            }
        }
    }
}


start();