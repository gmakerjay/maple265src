/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let marin = [2636208, 50, 5062507];

marinStart();

function marinStart() {
    if (!stage.hasItem(marin[0], marin[1])) {
        npc.meFlip().say("你沒有 " + marin[1] + " 個#i" + marin[0] + "#");
        return;
    }
    let count = parseInt(stage.getItemQuantity(marin[0]) / marin[1]);
    let maxnum = marin[1] * count;
    while (maxnum > 20000) {
        stage.loseItem(marin[0], -20000);
        maxnum -= 20000;
    }
    stage.loseItem(marin[0], maxnum);
    stage.gainItem(marin[2], count);
    stage.dropMessage(0x16, " 兌換了 " + count + " 個");
}