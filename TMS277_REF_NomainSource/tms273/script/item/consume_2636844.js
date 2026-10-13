/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let havemoney = stage.getItemQuantity(ctx.getDataId());
let boxId = ctx.getDataId();
let items = Array(
    1354027,
    1092087,
    1099011,
    1099012,
    1353105,
    1354037,
    1342095,
    1353707,
    1354007,
    1352009,
    1352109,
    1352206,
    1352216,
    1352226,
    1352276,
    1352286,
    1352296,
    1352406,
    1352506,
    1352707,
    1352815,
    1352906,
    1352916,
    1352935,
    1352945,
    1352867,
    1098006,
    1352957,
    1352967,
	1354017,
    1352975,
    1353006,
    1352928,
    1352236,
    1352246,
    1352256,
    1353807,
    1352266,
    1352606,
    1352807,
    1552084,
    1353205,
    1353306,
    1353505,
    1353606,
    1353405,
    1092089,
    1352824,
    1092088,
    1354007
);

let whileType = true;

while (whileType) {
    if (stage.hasItem(boxId, 1)) {
        let selStr = "#d副手兌換,兌換每1個副手需要#v" + boxId + "#\r\n";
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