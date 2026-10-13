/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let group = [1132174, 1132175, 1132176, 1132177, 1132178, 1102481, 1102481, 1102482, 1102483, 1102484, 1102485, 1082543, 1082543, 1082544, 1082545, 1082546, 1082547, 1072743, 1072744, 1072745, 1072746, 1072747];

let txt = "以下裝備任選一件\r\n\r\n";
for (var i in group) {
    txt += "#L" + i + "##v" + group[i] + "##z" + group[i] + "##l\r\n";
}
sel = npc.meFlip().askMenu(txt);

txt = "是否要兌換 #i" + group[sel] + "# 道具呢？\r\n";

if (npc.meFlip().askYesNo(txt) === 1) {
    var Equip = util.makeItem(group[sel], 1);
    stage.gainItem(Equip);
    stage.loseItem(ctx.getDataId(), 1);
    npc.meFlip().say("兌換成功");
}