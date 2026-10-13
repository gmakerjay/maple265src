/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 箱子抽取道具
 **/

//抽的物品
let items = Array(
    Array(1214016, 1),
    Array(1532098, 1),
    Array(1522094, 1),
    Array(1492179, 1),
    Array(1482168, 1),
    Array(1472214, 1),
    Array(1462193, 1),
    Array(1452205, 1),
    Array(1442223, 1),
    Array(1432167, 1),
    Array(1422140, 1),
    Array(1412135, 1),
    Array(1402196, 1),
    Array(1382208, 1),
    Array(1372177, 1),
    Array(1362090, 1),
    Array(1342082, 1),
    Array(1332225, 1),
    Array(1322203, 1),
    Array(1312153, 1),
    Array(1302275, 1),
    Array(1242061, 1),
    Array(1242060, 1),
    Array(1232057, 1),
    Array(1542063, 1),
    Array(1552063, 1),
    Array(1222058, 1),
    Array(1212063, 1),
    Array(1252015, 1),
    Array(1262016, 1),
    Array(1272015, 1),
    Array(1282015, 1),
    Array(1582016, 1)
);

let boxId = 2435712;//箱子ID


let ss = "#b消耗#v" + boxId + "#,可抽取FFN武器裝備"
ss += "\r\n是否使用？";
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