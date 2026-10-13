/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 箱子抽取道具
 **/

//抽的物品
let items = Array(
    Array(1214017, 1),
    Array(1582017, 1),
    Array(1212115, 1),
    Array(1222109, 1),
    Array(1232109, 1),
    Array(1402251, 1),
    Array(1242116, 1),
    Array(1262017, 1),
    Array(1302333, 1),
    Array(1312199, 1),
    Array(1322250, 1),
    Array(1592019, 1),
    Array(1332274, 1),
    Array(1342101, 1),
    Array(1362135, 1),
    Array(1372222, 1),
    Array(1382259, 1),
    Array(1412177, 1),
    Array(1422184, 1),
    Array(1432214, 1),
    Array(1442268, 1),
    Array(1452252, 1),
    Array(1462239, 1),
    Array(1472261, 1),
    Array(1482216, 1),
    Array(1492231, 1),
    Array(1522138, 1),
    Array(1532144, 1),
    Array(1552110, 1),
    Array(1252093, 1),
    Array(1272016, 1),
    Array(1282016, 1),
    Array(1542108, 1)
);


let boxId = 2435714;//箱子ID


let ss = "#b消耗#v" + boxId + "#,可抽取埃蘇系列武器裝備"
ss += "\r\n支持以下裝備：\r\n";
for (var i = 0; i < items.length; i++) {
    ss += "#v" + items[i] + "#";
}
let YN = npc.askYesNo(ss);
if (YN == 1) {
    if (stage.hasItem(boxId, 1)) {

        let ran = Math.floor(Math.random() * items.length);
        if (stage.canHold(items[ran][0], items[ran][1])) {
            stage.gainItem(items[ran][0], items[ran][1]);
            stage.loseItem(boxId, 1);
            npc.say("抽取成功");
        } else {
            npc.say("請清理背包");
        }
    } else {
        npc.say("你沒有#v" + boxId + "#");
    }
} else {
    npc.say("不想使用嗎？下次再見。");
}