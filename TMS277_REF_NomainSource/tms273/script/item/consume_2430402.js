/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * group 腳本訂製 技術顧問 50009219
 */

let group = [1712001, 1712002, 1712003, 1712004, 1712005, 1712006,1713000, 1713001, 1713002, 1713003, 1713004];

let txt = "以下裝備任選一件\r\n\r\n";
for (var i in group) {
    txt += "#L" + i + "##v" + group[i] + "##z" + group[i] + "##l\r\n";
}
sel = npc.meFlip().askMenu(txt);

txt = "請輸入你想兌換#i" + group[sel] + "# 的數量#r（背包剩餘空間" + stage.getFreeSlot(1) + " 個）\r\n";
num = npc.minNum(1).maxNum((stage.getItemQuantity(ctx.getDataId()) > 100 ? 100 : stage.getItemQuantity(ctx.getDataId()))).defNum(1).askNumber(txt);
if (num > stage.getFreeSlot(1)) {
    npc.meFlip().say("抱歉..你只允許兌換 " + player.getFreeSlots(1) + " 個！沒有額外空間了");
} else {
    stage.gainItem(group[sel], num);
    stage.loseItem(ctx.getDataId(), num);
    npc.meFlip().say("兌換成功");
}