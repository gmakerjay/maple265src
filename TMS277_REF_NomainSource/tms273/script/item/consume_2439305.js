/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let havemoney = stage.getItemQuantity(ctx.getDataId());
let boxId = ctx.getDataId();
let items = Array(
    1712001,
    1712002,
    1712003,
    1712004,
    1712005,
    1712006
);

let whileType = true;

while (whileType) {
    if (stage.hasItem(boxId, 1)) {
        let selStr = "#d神秘徽章兑换,兑换每1个徽章需要#v" + boxId + "#\r\n";
        for (let i = 0; i < items.length; i++) {
            selStr += "#r#L" + i + "##v" + items[i] + "##z" + items[i] + "##l\r\n";
        }
        let selected = npc.askMenu(selStr);
        let maxCanGet = stage.getFreeSlot(1);
        selStr = "\r\n#k请输入兑换 #v" + items[selected] + "# 的数量\r\n可兑换数量: " + havemoney + "\r\n(当前背包可以容纳 " + maxCanGet + " 个)：\r\n";
        let number = npc.defNum(1).minNum(0).maxNum(maxCanGet).askNumber(selStr);

        if (!stage.hasItem(boxId, number)) {
            npc.say("#v" + boxId + "# 不足");
        } else {
            stage.loseItem(boxId, number);
            stage.gainItem(items[selected], number);
            if (npc.askYesNo("兑换成功！是否继续兑换？") != 1) {
                whileType = false;
            }
        }
    } else {
        npc.say("你没有#v" + boxId + "#");
        whileType = false;
    }
}