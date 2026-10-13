let havemoney = stage.getItemQuantity(2437750);
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
        let selStr = "#d神秘徽章兌換,兌換每1個徽章需要#v" + boxId + "#\r\n";
        for (let i = 0; i < items.length; i++) {
            selStr += "#r#L" + i + "##v" + items[i] + "##z" + items[i] + "##l\r\n";
        }
        let selected = npc.askMenu(selStr);
        let maxCanGet = stage.getFreeSlot(1);
        selStr = "\r\n#k請輸入兌換 #v" + items[selected] + "# 的數量\r\n可兌換數量: " + havemoney + "\r\n(當前背包可以容納 " + maxCanGet + " 個)：\r\n";
        let number = npc.defNum(maxCanGet).minNum(0).maxNum(maxCanGet).askNumber(selStr);
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
