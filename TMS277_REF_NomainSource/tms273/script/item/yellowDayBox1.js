/**
 * 神秘徽章兌換
 **/
var havemoney = stage.getItemQuantity(2430026);
var boxId = 2430026; //箱子ID
var items = Array(
    2048826,
    2048825,
    2616217,
    2616216,
    2615052,
    2615051,
    2613069,
    2613068,
    2612081,
    2612080
);

var whileType = true;

while (whileType) {
    if (stage.hasItem(boxId, 1)) {
        //邏輯開始
        let selStr = "#d黑卷兌換,兌換每1張黑卷需要#v" + boxId + "#\r\n"

        //selStr="請選擇一個神秘徽章進行兌換吧：\r\n"
        for (var i = 0; i < items.length; i++) {
            selStr += "#r#L" + i + "##v" + items[i] + "##z" + items[i] + "##l\r\n"
        }
        let selected = npc.askMenu(selStr);
        let maxCanGet = stage.getFreeSlot(2);
        selStr = "\r\n#k請輸入兌換 #v" + items[selected] + "#的數量\r\n可兌換數量" + havemoney + "\r\n(當前背包可以容納" + maxCanGet + "個)：\r\n"
        let number = npc.defNum(1).minNum(1).maxNum(maxCanGet).askNumber(selStr);
        //判斷材料是否足夠

        if (!stage.hasItem(boxId, number)) {
            npc.say("#v" + boxId + "#不足");
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

