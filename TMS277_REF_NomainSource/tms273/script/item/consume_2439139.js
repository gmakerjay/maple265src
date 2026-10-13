/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

var count = stage.getItemQuantity(ctx.getDataId());
if (count < 250) {
    npc.meFlip().say("250個 #i" + ctx.getDataId() + "# 兌換1個#i2634472#");
}

var max = Math.floor((count / 250));
var use = max * 250;
while (use > 0) {
    var num = Math.min(use, 20000);
    stage.loseItem(ctx.getDataId(), num);
    use -= num;
}
stage.gainItem(2634472, max);