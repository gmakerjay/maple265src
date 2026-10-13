/**
 * 神秘徽章兌換
 **/
var havemoney = stage.getItemQuantity(ctx.getDataId());
var boxId = ctx.getDataId(); //箱子ID
var items = Array(
    2616225,
    2616224,
    2615061,
    2615060,
    2613077,
    2613076,
    2612090,
    2612089,
    2048849,
    2048848
);

var whileType = true;

while (whileType) {
    if (stage.hasItem(boxId, 1)) {
        //邏輯開始
        let selStr = "#d命運兌換,兌換每1張命運需要#v" + boxId + "#\r\n"

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

