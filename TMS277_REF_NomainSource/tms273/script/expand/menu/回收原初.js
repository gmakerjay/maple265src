/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

var text;
var inventoryType = 1;
var deleteSlot;
var deleteQuantity;
var typed = 0;
var beDeletedArr = new Array();
var listq = Array(
    2, 5, 20
);
var itemq = 0;

let boxId = 2633336;

function start() {
    const toDoList = [];
    let prize = 0;
    let price = 0;


    // 詢問是否分解，分解後不可恢復
    let text = "#e#r#h0##k#n\r\n#k您好，歡迎來到原初回收中心\r\n#r#e分解後不可恢復!\r\n";


    text += `\r\n\r\n#k#n回收價格表:\r\n`;
    text += "#v" + boxId + ":i# x 300 => #r#e" + `[抵用 * 1500]#n#k\r\n`;
    if (stage.getItemQuantity(boxId) < 300) {
        npc.say(text + `不足300`);
    } else {
        let num = npc.defNum(1).minNum(1).maxNum(stage.getItemQuantity(boxId) / 300).askNumber(text + '請輸入分解組數');
        if (stage.hasItem(boxId, num * 300)) {
            if (npc.askYesNo(`是否確認分解`) == 1) {
                stage.loseItem(boxId, num * 300);
                stage.modifyCurrency(2, 1500 * num);
                npc.say('分解成功');
            }
        } else {
            npc.say('物品不足');
        }
    }

    start();
}


start();