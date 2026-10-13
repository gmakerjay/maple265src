/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 箱子選擇道具
 **/

//送的物品
let items = Array(
    1152174, //埃蘇萊布斯騎士護肩
    1152176, //埃蘇萊布斯法師護肩
    1152177, //埃蘇萊布斯弓箭手護肩
    1152178, //埃蘇萊布斯飛俠護肩
    1152179, //埃蘇萊布斯海盜護肩
    1004422, //埃蘇萊布斯騎士頭盔
    1004423, //埃蘇萊布斯法師帽
    1004424, //埃蘇萊布斯弓箭手帽
    1004425, //埃蘇萊布斯飛俠帽
    1004426, //埃蘇萊布斯海盜帽
    1102775, //埃蘇萊布斯騎士披風
    1102794, //埃蘇萊布斯魔法師披風
    1102795, //埃蘇萊布斯弓箭手披風
    1102796, //埃蘇萊布斯飛俠披風
    1102797, //埃蘇萊布斯海盜披風
    1082636, //埃蘇萊布斯騎士手套
    1082637, //埃蘇萊布斯法師手套
    1082638, //埃蘇萊布斯弓箭手手套
    1082639, //埃蘇萊布斯飛俠手套
    1082640, //埃蘇萊布斯海盜手套
    1052882, //埃蘇萊布斯騎士套裝
    1052887, //埃蘇萊布斯魔法師套裝
    1052888, //埃蘇萊布斯弓箭手套裝
    1052889, //埃蘇萊布斯飛俠套裝
    1052890, //埃蘇萊布斯海盜套裝
    1073030, //埃蘇萊布斯騎士鞋
    1073032, //埃蘇萊布斯法師鞋
    1073033, //埃蘇萊布斯弓箭手鞋
    1073034, //埃蘇萊布斯飛俠鞋
    1073035
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
            let toDrop = util.makeItem(items[selected], 1);
            toDrop.setAttribute(8);
            stage.gainItem(toDrop);
            stage.loseItem(boxId, 1);
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