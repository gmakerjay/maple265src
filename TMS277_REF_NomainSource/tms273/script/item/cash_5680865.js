/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

const payUtils = require('constant/PayUtils.js');


var boxId = ctx.getDataId(); //箱子ID
let prize = 500;
let whileType = true;
while (whileType) {
    if (stage.hasItem(boxId, 1)) {
        //邏輯開始
        let selStr = `#d每個#v${boxId}:i#可兌換抵用 ${prize},請輸入兌換數量\r\n`

        let number = npc.defNum(1).minNum(1).maxNum(stage.getItemQuantity(boxId)).askNumber(selStr);
        //判斷材料是否足夠

        if (!stage.hasItem(boxId, number)) {
            npc.say("#v" + boxId + "#不足");
        } else {

            stage.loseItem(boxId, number);
            payUtils.gainPay(4, (prize) * (number), stage, db, "抵用券兌換券", boxId);
            if (!stage.hasItem(boxId, 1)) {
                whileType = false;
                npc.say("全部兌換完畢");
            }
        }
    }

}
