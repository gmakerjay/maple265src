/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 蠟筆系統
 **/



//可以使用的裝備列表
let equips = Array(
    1662073, 1662072, 1662027, 1182285, 1112429, 1114312
);


start();

function start() {
    let canUse = false;
    let selStr = "";
    selStr += "\r\n可以使用的裝備如下\r\n"
    for (var i = 0; i < equips.length; i++) {
        selStr += "#v" + equips[i] + "#,";
    }
    selStr += "可免費激活SS潛能\r\n"

    //獲取第一格裝備
    let toDrop = stage.getItemBySlot(1, 1);
    //判斷第一格裝備是否存在
    if (toDrop == null) {
        npc.say(selStr + "\r\n#r您的第一格沒有裝備，無法使用");
    } else {
        //判斷裝備是否是可用裝備
        let toDropID = toDrop.getItemId();
        if (equips.includes(toDropID)) {
            if (toDrop.getGrade() > 0) {
                npc.say(selStr + "\r\n#g已經激活過了");
            } else {
                toDrop.setGrade(20);
                toDrop.setOption1(40053);
                toDrop.setOption2(40053);
                toDrop.setOption3(40053);
                toDrop.setOption4(42055);
                toDrop.setOption5(42055);
                toDrop.setOption6(42055);
                stage.updateItemBySlot(1, 1);
                npc.say(selStr + "\r\n#g激活成功");
            }
        } else {
            npc.say(selStr + "\r\n#r請將您需要激活潛能的機器人放到第一格！");
        }
    }

}
