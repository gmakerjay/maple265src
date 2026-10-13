/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 箱子選擇道具
 **/

//送的物品
let items = Array(
    1404017,
    4310217,
    1213017,
    1214017,
    1292017,
    1582017,
    1212115, //埃蘇萊布斯雙頭杖
    1222109, //埃蘇萊布斯靈魂手銃
    1232109, //埃蘇萊布斯亡命劍
    1402251, //埃蘇萊布斯寬大刀
    1242116, //埃蘇萊布斯能量劍
    1262017, //埃蘇萊布斯ESP限制器
    1302333, //埃蘇萊布斯軍刀
    1312199, //埃蘇萊布斯戰斧
    1322250, //埃蘇萊布斯戰錘
    1332274, //埃蘇萊布斯屠龍斬
    1342101, //埃蘇萊布斯之刃
    1362135, //埃蘇萊布斯摺疊手杖
    1372222, //埃蘇萊布斯短杖
    1382259, //埃蘇萊布斯長杖
    1412177, //埃蘇萊布斯大斧
    1422184, //埃蘇萊布斯大鎚
    1432214, //埃蘇萊布斯穿透矛
    1442268, //埃蘇萊布斯巨靈開山斧
    1452252, //埃蘇萊布斯弓
    1462239, //埃蘇萊布斯弩
    1472261, //埃蘇萊布斯復讎斗拳
    1482216, //埃蘇萊布斯拳甲
    1492231, //
    1522138, //
    1532144, //
    1552110, //
    1592019, //遠古弓
    1252093,
    1272016,
    1282016,
    1542108
);

let boxId = ctx.getDataId();//箱子ID


let ss = "#b消耗#v" + boxId + "#,可選擇獲得道具:\r\n#n"
for (let i = 0; i < items.length; i++) {
    ss += "#L" + i + "##r #v" + items[i] + "# #z" + items[i] + "# x 1 #l\r\n"
}

let selected = npc.askMenu(ss);

ss = "您是否確定獲取#v" + items[selected] + "# x 1";
let YN = npc.askYesNo(ss);
if (YN == 1) {
    if (stage.canHold(items[selected], 1)) {
        if (stage.hasItem(boxId, 1)) {
            stage.loseItem(boxId, 1);
            let toDrop = util.makeItem(items[selected], 1);
            toDrop.setAttribute(8);
            stage.gainItem(toDrop);
            npc.say("兌換成功");
        } else {
            npc.say("你沒有#v" + boxId + "#");
        }
    } else {
        npc.say("請清理背包！");
    }
} else {
    npc.say("不想兌換嗎？下次再見。");
}