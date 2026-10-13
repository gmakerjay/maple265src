/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let marin = [
    4001842, 20, 4001843, 2, 4310156
];

function marinStart() {
    const item1Id = marin[0];
    const item1Quantity = marin[1];
    const item2Id = marin[2];
    const item2Quantity = marin[3];
    const rewardItemId = marin[4];

    let txt = "你必須拿來" + item1Quantity + " 個#i" + item1Id + "# 和\r\n";
    txt += item2Quantity + " 個 #i" + item2Id + "#\r\n";
    txt += "才可以和我進行交易。\r\n";
    txt += "二手機器人需要的#b#z" + rewardItemId + "##k在我手裡\r\n";
    txt += "#L0##r兌換#b#i" + rewardItemId + "##z" + rewardItemId + "##r[檢視詳情]#l\r\n";
    let sel = npc.meFlip().askMenu(txt);

    txt = `#i${item1Id}# 擁有 ${stage.getItemQuantity(item1Id)}
\r\n\r\n#i${item2Id}#擁有 ${stage.getItemQuantity(item2Id)}

\r\n\r\n請輸入你想兌換多少個 #i${rewardItemId}##z${rewardItemId}#`;

    let num = npc.meFlip().minNum(1).maxNum(999).defNum(1).askNumber(txt);

    if (!stage.hasItem(item1Id, item1Quantity * num) || !stage.hasItem(item2Id, item2Quantity * num)) {
        npc.say(`抱歉..你沒有 ${item1Quantity * num} 個#i${item1Id}#與 ${item2Quantity * num} 個 #i${item2Id}#`);
        return;
    }

    stage.gainItem(rewardItemId, num);
    stage.loseItem(item1Id, item1Quantity * num);
    stage.loseItem(item2Id, item2Quantity * num);
    npc.meFlip().say(`恭喜兌換了 ${num} 個 #i${rewardItemId}#`);
}

marinStart();
