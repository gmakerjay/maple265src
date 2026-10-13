/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


const icon = require('constant/Icon');


const menus = [
    ['塔戒專區', '裝備系統/塔戒菜單'],
    ['特殊潛能', '裝備系統/機器潛能'],
    ['裝備吸收', '裝備系統/裝備吸收'],
    ['創世解封', '裝備系統/創世解封'],
    ['創世繼承', '裝備系統/創世繼承'],
    ['輝耀繼承', '裝備系統/輝耀繼承'],
    ['火花繼承', '裝備系統/火花繼承'],
    ['卷軸計算', '裝備系統/卷軸計算'],
    ['查看火花', '裝備系統/查看火花'],
    ['便捷白錘', '裝備系統/白金錘子'],
    ['塔戒吸收', '裝備系統/塔戒吸收'],
    ['武功洗煉', '裝備系統/武功洗練'],
    ['頂貝繼承', '裝備系統/頂貝繼承'],
    ['徽章繼承', '裝備系統/密特拉繼承'],
    ['拼圖技能', '裝備系統/覺醒拼圖BUFF'],
    // ['智能怪怪', '裝備系統/智能洗怪怪'],
];
// if (stage.isGm()) {
    menus.push(['根源繼承', '裝備系統/根源繼承']);
    menus.push(['星星強化', '星星強化機']);
    menus.push(['漆黑吞噬', '漆黑吞噬']);
// }
var str = `#e#b[裝備專區]#r#k#l\r\n`;
for (var i = 0; i < menus.length; i++) {
    str += "#L" + i + "#" + menus[i][0] + "#l#k"
    if ((i + 1) % 4 == 0) {
        str += "\r\n\r\n"
    }
}
str += `\r\n\t\t\t#fs14##L999#${icon.common.返回[0]}返回主菜單#l`;

var selection = npc.askMenu(str);

str += `\r\n\t\t\t#fs14##L999#${icon.common.返回[0]}返回主菜單#l`;
if (selection == 999) {
    stage.runScript('expand/menu');
} else {
    stage.runScript("expand/menu/" + menus[selection][1]);
}


