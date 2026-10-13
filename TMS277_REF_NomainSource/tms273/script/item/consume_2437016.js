/**
 * 神秘徽章兌換
 **/
var havemoney = stage.getItemQuantity(ctx.getDataId());
var boxId = ctx.getDataId(); //箱子ID
var items = Array(
1592033,
1582026,
1552068,
1542068,
1532110,
1522106,
1492191,
1482180,
1472227,
1462205,
1452217,
1442235,
1432179,
1422153,
1412148,
1404038,
1403034,
1402211,
1382223,
1372189,
1362102,
1342086,
1332239,
1322216,
1312166,
1302290,
1292034,
1282029,
1272029,
1262030,
1252066,
1242081,
1232075,
1222075,
1214037,
1213034,
1212080,
1092113,


);

var whileType = true;

while (whileType) {
    if (stage.hasItem(boxId, 1)) {
        //邏輯開始
        let selStr = "#d特米自選,需要#v" + boxId + "#\r\n"

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

