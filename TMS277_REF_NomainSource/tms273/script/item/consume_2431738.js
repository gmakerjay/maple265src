const payUtils = require('constant/PayUtils.js');

const item = ctx.getDataId();

function start() {
    let count = stage.getItemQuantity(item);
   let num = npc.defNum(count).minNum(1).maxNum(count).askNumber("請輸入你要兌換的數量，當前擁有" + count + "個");


    if (stage.hasItem(item, num)) {
        stage.loseItem(item, num);


        payUtils.gainPay(4, 500 * num, stage, db, ctx.getDataId(), num);
    } else {
        npc.say("材料不足");
    }
}

start();