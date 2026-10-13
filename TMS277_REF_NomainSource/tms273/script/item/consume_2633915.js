/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let itemList = Array(
    1004808,//神秘之影戰士帽
    1053063,//神秘之影戰士套裝
    1073158,//神秘之影戰士鞋
    1082695,//神秘之影戰士手套
    1102940,//神秘之影戰士披風
    1152196,//神秘之影戰士護肩

    1004809,//神秘之影法師帽
    1053064,//神秘之影法師套裝
    1073159,//神秘之影法師鞋
    1082696,//神秘之影法師手套
    1102941,//神秘之影法師披風
    1152197,//神秘之影法師護肩

    1004810,//神秘之影弓箭手帽
    1053065,//神秘之影弓箭手套裝
    1073160,//神秘之影弓箭手鞋
    1082697,//神秘之影弓箭手手套
    1102942,//神秘之影弓箭手披風
    1152198,//神秘之影弓箭手護肩

    1004811,//神秘之影飛俠帽
    1053066,//神秘之影飛俠套裝
    1073161,//神秘之影飛俠鞋
    1082698,//神秘之影飛俠手套
    1102943,//神秘之影飛俠披風
    1152199,//神秘之影飛俠護肩

    1004812,//神秘之影海盜帽
    1053067,//神秘之影海盜套裝
    1073162,//神秘之影海盜鞋
    1082699,//神秘之影海盜手套
    1102944,//神秘之影海盜披風
    1152200 //神秘之影海盜護肩

);

let boxId = ctx.getDataId();//箱子ID


let text = "#b消耗#v" + boxId + "#,可選擇獲得道具:\r\n#n"
for (var i = 0; i < itemList.length; i++) {
    text += "#L" + i + "##v" + itemList[i] + "##z" + itemList[i] + "##l\r\n";
}
let selected = npc.askMenu(text);

text = "您是否確定獲取#v" + itemList[selected] + "";
let YN = npc.askYesNo(text);
if (YN == 1) {
    if (stage.canHold(itemList[selected], 1)) {
        if (stage.hasItem(boxId, 1)) {
            var itemid = itemList[selected];
            stage.loseItem(boxId, 1);

            let toDrop = util.makeItem(itemid, 1);
            toDrop.setAttribute(8);
            stage.gainItem(toDrop);
            // player.gainItem(itemid,1);
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