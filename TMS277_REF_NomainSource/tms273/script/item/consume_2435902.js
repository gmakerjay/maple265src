let count = npc.meFlip().minNum(1).maxNum(stage.getItemQuantity(ctx.getDataId())).defNum(1).askNumber("請輸入你想打開多少個核心");
if (!stage.hasItem(ctx.getDataId(), 1)) {
    npc.meFlip().say("抱歉..你沒有那麼多核心");
} else {
    if (count > 100) {
        npc.meFlip().say("抱歉 單次最大只能 100 個");
    } else {
        let num = count;
        while (count > 0) {
            stage.gainRandVCore(Math.random() * 2)
            count--;
        }
        stage.loseItem(ctx.getDataId(), num);
    }
}