/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

const icon = require('constant/icon');
const list = [
    [0, '等級獎勵', '等級獎勵', '#fItem/Consume/0202.img/02022442/info/iconRaw#'],
    [1, '聯盟套裝', '聯盟套裝', '#fCharacter/Longcoat/01050186/info/iconRaw#'],
    [2, '萌新武器', '萌新武器', '#fCharacter/Weapon/01703129/info/iconRaw#'],
    [5, '新手任務', '主線任務', '#fItem/Consume/0243.img/02430154/info/iconRaw#'],
    [3, '萌新寶玉', '萌新寶玉', '#fItem/Consume/0253.img/02534006/info/iconRaw#'],
    [4, '入島禮物', '入島禮物', '#fItem/Cash/0512.img/05121057/info/iconRaw#'],
 //   [6, '萌新輪迴', '萌新輪迴', '#fItem/Consume/0263.img/02635169/info/iconRaw#'],
    [6, '聯盟獎勵', '聯盟獎勵', '#fItem/Consume/0243.img/02436616/info/iconRaw#'],
];
let str = "" + "#r#fn微軟雅黑##fs14##e#b[萌新中心]#r#k#fs14##l\r\n";


for (let i in list) {
    str += `#L${i}#${list[i][3]}${list[i][1]}#l`
    if ((parseInt(i) + 1) % 2 == 0) {
        str += `\r\n`
    } else {
        str += `\t`;
    }
}
str += `\r\n\t\t\t#fs14##L999#${icon.common.home}返回主菜單#l`;

let selection = npc.askMenu(str)
if (selection == 999) {
    stage.runScript('expand/menu');
} else {
    stage.runScript("expand/menu/萌新專區/" + list[selection][2]);
}