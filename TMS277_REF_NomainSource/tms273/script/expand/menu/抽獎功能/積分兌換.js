/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let log = require('check_log');
let item = "抽獎積分";
let itemListAll = Array(
    [2591008, 2499, 1], // 武功
    [2632972, 1200, 1], // 米特拉
    [2438412, 600, 1], // 鏡世界
    [1182285, 4500, 1], // 創世
    [1202287, 3500, 1], // 石板
    [1182158, 2500, 1], // 奧爾卡
    [1672069, 1600, 1], // 女武神
    [1672075, 7000, 1], // md
    [1662073, 1300, 1], // 男
    [1662072, 1300, 1], // 女
    [2437016, 800, 1], // 特米
    [1112429, 600, 1], // 冒險家暴擊
    [1342090, 1800, 1], // 雙刀副手
    [1182017, 800, 1], // 黃金批的慢
    [2644204, 1000, 1], // 黃金批的慢
    [2644205, 1000, 1], // 黃金批的慢
    [2644206, 1000, 1], // 黃金批的慢
    [2644207, 1000, 1], // 黃金批的慢
  //  [1142709, 500, 1], // 人類最強
  //  [1142789, 5000, 1], // 人類最強
);

function start() {
    let str = `請選擇你要兌換的道具，當前擁有#b${item}#k x ${log.getEventValue(stage, db, item)}\r\n`;


    for (let i = 0; i < itemListAll.length; i++) {
        str += `#L${i}##v${itemListAll[i][0]}# #b#z${itemListAll[i][0]}##k  ${item} x #r${itemListAll[i][1]}#k#l\r\n`;
    }
    let sel = npc.askMenu(str);
    if (log.getEventValue(stage, db, item) >= itemListAll[sel][1]) {
        str = `是否確認兌換#v${itemListAll[sel][0]}# #b#z${itemListAll[sel][0]}##k  #b${item}#k x ${itemListAll[sel][1]}#l\r\n`;

        if (npc.askYesNo(str) == 1) {
            if (log.getEventValue(stage, db, item) >= itemListAll[sel][1]) {
                log.addEventValue(stage, db, item, -itemListAll[sel][1], -1);
                stage.gainItem(itemListAll[sel][0], 1);
                npc.say("兌換成功");
            } else {
                npc.say("積分不足");
            }
        }

    } else {
        npc.say("積分不足");
    }
}

start();