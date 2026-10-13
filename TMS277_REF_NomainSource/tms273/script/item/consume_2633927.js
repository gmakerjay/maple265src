/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let itemlistall = require("constant/裝備製作/其他裝備").itemlistall;
let item = ctx.getDataId();

function start() {
    let str = `請選擇你要兌換的防具，當前擁有#v${item}:i# x ${stage.getItemQuantity(item)}\r\n`;

    // let itemList1 = (itemlistall.filter(v => v[0] == '護肩'))[0][1];
    let itemListAll = (itemlistall.filter(v => v[0] == '米特拉'))[0][1];


    for (let i = 0; i < itemListAll.length; i++) {
        str += `#L${i}##v${itemListAll[i]}# #b#z${itemListAll[i]}##k #l\r\n`;
    }
    let sel = npc.askMenu(str);
    if (stage.hasItem(item, 1)) {
        str = `是否確認兌換#v${itemListAll[sel]}# #b#z${itemListAll[sel]}##k 消耗 #v${item}:i# x 1#l\r\n`;

        if (npc.askYesNo(str) == 1) {
            if (stage.hasItem(item, 1)) {
                stage.gainItem(itemListAll[sel], 1);
                stage.loseItem(item, 1);
                npc.say("兌換成功");
            } else {
                npc.say("材料不足");
            }
        }

    } else {
        npc.say("材料不足");
    }
}

start();