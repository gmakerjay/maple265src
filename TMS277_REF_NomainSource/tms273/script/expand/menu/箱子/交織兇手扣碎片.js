/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/* 附加神魔方碎片 */


let itemList = Array(
    Array(2635747, 2)
);

let itemId = -1;
let amount = -1;


if (stage.getItemQuantity(2636607) >= 2) {

    var selStr = "您現在持有#r" + stage.getItemQuantity(2636607) + "#k個#b#i2636607:# #t2636607##k\r\n請選擇您希望兌換的類型:";
    for (var i = 0; i < itemList.length; i++) {
        selStr += "\r\n#L" + i + "#搜集#r" + itemList[i][1] + "個#k#v2636607#.可以獲得#b#i" + itemList[i][0] + ":# #t" + itemList[i][0] + "##k#l";
    }
    if (stage.getItemQuantity(2636607) / 2 >= 2) {
        selStr += "\r\n#L" + 2 + "#搜集#r" + parseInt(stage.getItemQuantity(2636607) / 2) * 2 + "個#k#v2636607#.可以獲得" + parseInt(stage.getItemQuantity(2636607) / 2) + " x #v2635747##b#t2635747##k#l";
    }
    let selection = npc.askMenu(selStr);
    if (selection == 0) {
        count = 1;
        dcount = 2;
        if (stage.canHold(2635747, count)) {
            stage.loseItem(2636607, dcount);
            stage.gainItem(2635747, count);
            npc.say("恭喜您成功兌換" + count + " x #i" + 2635747 + ":# #b#t" + 2635747 + "##k 。");
        } else {
            npc.say("請清理出1格以上的空間。");
        }
    } else if (selection == 2) {
        var count = parseInt(stage.getItemQuantity(2636607) / 2);
        var dcount = parseInt(stage.getItemQuantity(2636607) / 2) * 2;
        if (stage.canHold(2635747, count)) {
            stage.loseItem(2636607, dcount);
            stage.gainItem(2635747, count);
            npc.say("恭喜您成功兌換" + count + " x #i" + 2635747 + ":# #b#t" + 2635747 + "##k 。");
        } else {
            npc.say("請在特殊欄目清理出1格以上的空間。");
        }
    }
} else {
    npc.say("#v2636607##z2636607#少於2個，無法進行合成");
}