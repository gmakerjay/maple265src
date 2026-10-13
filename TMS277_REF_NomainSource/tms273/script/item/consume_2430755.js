/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let bute = [2048857, 2048856, 2612100, 2612099, 2613087, 2613086, 2615071, 2615070, 2616235, 2616234];

let txt = "請選擇你想領的卷軸!\r\n";
for (let i in bute) {
    txt += "#L" + i + "##i" + bute[i] + "# #z" + bute[i] + "##l\r\n";
}
sel = npc.meFlip().askMenu(txt);

txt = "你選擇了 #i" + bute[sel] + "#\r\n\r\n";
txt += "請選擇你想領多少張 最大不能超過 #r" + stage.getItemQuantity(ctx.getDataId()) + "\r\n";
txt += " ";
num = npc.meFlip().minNum(1).maxNum(stage.getItemQuantity(ctx.getDataId())).defNum(1).askNumber(txt);

if (npc.meFlip().askYesNo("確認領取 " + num + " 張 #i" + bute[sel] + "# 嗎?") == 1) {
    stage.gainItem(bute[sel], num);
    stage.loseItem(ctx.getDataId(), num);
}