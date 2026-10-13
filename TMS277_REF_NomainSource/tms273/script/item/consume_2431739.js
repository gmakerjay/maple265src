/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


const payUtils = require('constant/PayUtils.js');
const item = ctx.getDataId();

function start() {
    let count = stage.getItemQuantity(item);
    let num = npc.defNum(count).minNum(1).maxNum(count).askNumber("請輸入你要兌換的數量，當前擁有" + count + "個")
    if (stage.hasItem(item, num)) {
        stage.loseItem(item, num);
        payUtils.gainPay(4, num * 1000, stage, db, "2431739", count);
    } else {
        npc.say("材料不足");
    }
}

start();