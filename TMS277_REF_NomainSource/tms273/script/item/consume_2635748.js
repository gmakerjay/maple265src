/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 神秘徽章兌換
 **/
var havemoney = stage.getItemQuantity(ctx.getDataId());
var boxId = ctx.getDataId(); //箱子ID
var items = Array(
    1713000,//賽爾提烏
    1713001,//旅館
    1713002,//奧迪烏姆
    1713003,//奧迪烏姆
    1713005,//奧迪烏姆
    1713004,//奧迪烏姆
	1714000//奧迪烏姆
);

var whileType = true;


while (whileType) {
    if (stage.hasItem(boxId, 1)) {
        let selStr = "#d原初兌換,兌換每1個徽章需要#v" + boxId + "#\r\n";
        for (let i = 0; i < items.length; i++) {
            selStr += "#r#L" + i + "##v" + items[i] + "##z" + items[i] + "##l\r\n";
        }
        let selected = npc.askMenu(selStr);
        let maxCanGet = stage.getFreeSlot(1);
        selStr = "\r\n#k請輸入兌換 #v" + items[selected] + "# 的數量\r\n可兌換數量: " + havemoney + "\r\n(當前背包可以容納 " + maxCanGet + " 個)：\r\n";
        let number = npc.defNum(1).minNum(0).maxNum(maxCanGet).askNumber(selStr);

        if (!stage.hasItem(boxId, number)) {
            npc.say("#v" + boxId + "# 不足");
        } else {
            stage.loseItem(boxId, number);
            stage.gainItem(items[selected], number);
            if (npc.askYesNo("兌換成功！是否繼續兌換？") != 1) {
                whileType = false;
            }
        }
    } else {
        npc.say("你沒有#v" + boxId + "#");
        whileType = false;
    }
}
