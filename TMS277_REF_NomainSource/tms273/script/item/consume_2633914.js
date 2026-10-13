/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let itemList = Array(
    1404018,
    1214018,
    4310217,
    1592020,//神秘之影遠古弓
    1582023,//神秘之影機甲槍
    1552119,//神秘之影摺扇
    1542117,//神秘之影武士刀
    1532150,//神秘之影攻城炮
    1522143,//神秘之影雙弩槍
    1492235,//神秘之影短槍
    1482221,//神秘之影指節
    1472265,//神秘之影拳套
    1462243,//神秘之影弩
    1452257,//神秘之影弓
    1442274,//神秘之影矛
    1432218,//神秘之影長槍
    1422189,//神秘之影雙手錘
    1412181,//神秘之影雙手戰斧
    1402259,//神秘之影雙手劍
    1382265,//神秘之影長杖
    1372228,//神秘之影短杖
    1362140,//神秘之影手杖
    1342104,//神秘之影刃
    1332279,//神秘之影匕首
    1322255,//神秘之影錘
    1312203,//神秘之影斧
    1302343,//神秘之影單手劍
    1292018,//神秘之影草扇
    1282017,//神秘之影魔力手套
    1272017,//神秘之影鎖鏈
    1262039,//神秘之影ESP限制器
    1252098,//神秘之影魔法槌
    1242122,//神秘之影能量劍（飛俠）
    1242121,//神秘之影能量劍（海盜）
    1232113,//神秘之影亡命劍
    1222113,//神秘之影靈魂手銃
    1213018,//神秘之影調諧器
    1212120 //神秘之影雙頭杖

);

let boxId = ctx.getDataId();

let text = "#b消耗#v" + boxId + "#,可選擇獲得道具:\r\n#n";
for (let i = 0; i < itemList.length; i++) {
    text += "#L" + i + "##v" + itemList[i] + "##z" + itemList[i] + "##l\r\n";
}

let selected = npc.askMenu(text);
let confirmText = "您是否確定獲取#v" + itemList[selected] + "#";
let YN = npc.askYesNo(confirmText);

if (YN == 1) {
    if (stage.canHold(itemList[selected], 1)) {
        if (stage.hasItem(boxId, 1)) {
            let itemid = itemList[selected];
            stage.loseItem(boxId, 1);
            let toDrop = util.makeItem(itemid, 1);
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
