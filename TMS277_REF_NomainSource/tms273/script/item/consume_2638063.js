/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


let item = ctx.getDataId();

function start() {
    let itemlistall = require("constant/裝備製作/250無盡輝耀").itemlistall3;
    let str = `請選擇你要兌換的防具，當前擁有#v${item}:i# x ${stage.getItemQuantity(item)}\r\n`;
    // 護肩
    let itemList1 = (itemlistall.filter(v => v[0] == '手套'))[0][1];
    // 上衣
    let itemList2 = (itemlistall.filter(v => v[0] == '披風'))[0][1];
    // 褲子
    let itemList3 = (itemlistall.filter(v => v[0] == '鞋子'))[0][1];
    // 帽子
    // let itemList4 = (itemlistall.filter(v => v[0] == '帽子'))[0][1];
    let itemListAll = [].concat(itemList1, itemList2, itemList3);


    for (let i = 0; i < itemListAll.length; i++) {
        str += `#L${i}##v${itemListAll[i][0]}# #b#z${itemListAll[i][0]}##k  #v${item}:i# x ${itemListAll[i][1]}#l\r\n`;
    }
    let sel = npc.askMenu(str);
    if (stage.hasItem(item, itemListAll[sel][1])) {
        str = `是否確認兌換#v${itemListAll[sel][0]}# #b#z${itemListAll[sel][0]}##k  #v${item}:i# x ${itemListAll[sel][1]}#l\r\n`;

        if (npc.askYesNo(str) == 1) {
            if (stage.hasItem(item, itemListAll[sel][1])) {
                stage.gainItem(itemListAll[sel][0], 1);
                stage.loseItem(item, itemListAll[sel][1]);
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