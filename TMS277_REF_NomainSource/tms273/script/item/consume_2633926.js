/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let itemList = Array(
    // 1012632,//失控机械標記
    // 1022278,//蘊藏魔力的眼罩
    // 1132308,//夢幻腰帶
    // 1122430,//痛苦根源
    // 1182285,//創世徽章
    // 1032316,//船長姿態耳環
    // 1113306,//巨大恐懼
    1162080,//被詛咒的魔道書-紅【力量】
    1162081,//被詛咒的魔道書-藍【智力】
    1162082,//被詛咒的魔道書-綠【敏捷】
    1162083 //被詛咒的魔道書-黃【運氣】
);

let boxId = ctx.getDataId();//箱子ID


let text = "#b消耗#v" + boxId + "#,可選擇得道具獲得:\r\n#n"
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
            stage.gainItem(itemid, 1);
            stage.loseItem(boxId, 1);
            npc.say("兌換成功");
        } else {
            npc.say("你沒有#v" + boxId + "#");
        }
    } else {
        npc.say("請清理背包！！");
    }
} else {
    npc.say("不想兌換嗎？下次再見。");
}