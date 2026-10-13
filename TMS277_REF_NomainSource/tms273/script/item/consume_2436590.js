/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let marin = [1713000];

marinStart();

function marinStart() {
    let txt = "以下裝備任選一件\r\n\r\n";
    for (let i in marin) {
        txt += "#L" + i + "##v" + marin[i] + "##z" + marin[i] + "##l\r\n";
    }
    sel = npc.meFlip().askMenu(txt);

    txt = "請輸入你想兌換#i" + marin[sel] + "# 的數量#r（背包剩餘空間" + stage.getFreeSlot(1) + " 個）\r\n";
    let num = npc.meFlip().minNum(1).maxNum((stage.getItemQuantity(ctx.getDataId()) > 128 ? 128 : stage.getItemQuantity(ctx.getDataId()))).defNum(1).askNumber(txt);
    if (num > stage.getFreeSlot(1)) {
        npc.meFlip().say("抱歉..你只允許兌換 " + stage.getFreeSlot(1) + " 個！沒有額外空間了");
        return;
    }
    stage.gainItem(marin[sel], num);
    stage.loseItem(ctx.getDataId(), num);
    npc.meFlip().say("兌換成功");
}