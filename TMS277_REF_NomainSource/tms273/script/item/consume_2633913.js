/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let marin = [1004422, 1004423, 1004424, 1004425, 1004426, 1052882, 1052887, 1052888, 1052890, 1052889, 1073030, 1073032, 1073033, 1073034, 1073035, 1082636, 1082637, 1082638, 1082639, 1082640, 1102775, 1102794, 1102795, 1102796, 1102797, 1152174, 1152176, 1152177, 1152178, 1152179
];

marinStart();

function marinStart() {
    var txt = "以下裝備任選一件\r\n\r\n";
    for (var i in marin) {
        txt += "#L" + i + "##v" + marin[i] + "##z" + marin[i] + "##l\r\n";
    }
    sel = npc.meFlip().askMenu(txt);

    txt = "是否要兌換 #i" + marin[sel] + "# 道具呢？\r\n";
    if (npc.meFlip().askYesNo(txt) !== 1) return;

    var Equip = util.makeItem(marin[sel], 1);
    stage.gainItem(Equip);
    stage.loseItem(ctx.getDataId(), 1);
    npc.meFlip().say("兌換成功");
}