let icon = require('constant/Icon');
let list = [
    ["禮包系統", "更多功能/禮包系統"],
    ["消除燈泡", "更多功能/消除燈泡"],
    // ["同步突破", "便捷服務/同步突破"],
    ["聯盟系統", "更多功能/冒險島聯盟"],
    ["快速升級", "更多功能/直通260"],
    ["島主之力", "更多功能/強力BUFF"],
    ["釣魚功能", "更多功能/釣魚功能"],
    // ["#fc0xFFFF1493#提出想法", "更多功能/new_意見牆"],
    ["神之子點", "更多功能/神之子前置"],
    //["綁定QQ  ", "更多功能/綁定QQ"],
    ["還原皮膚", "更多功能/還原傷害皮膚"],
    // ["拓展欄位", "更多功能/拓展欄位"],
    // ["搶救閃退", "更多功能/搶救閃退角色"],
    ["前置開通", "更多功能/一鍵主線"],
    // ["自由專職", "更多功能/自由轉職"],
    ["領取物品", "更多功能/Q群商店"],
    ["物品兌換", "更多功能/便捷兌換"],
    ["裝卸副手", "更多功能/裝卸副手"],
    ["自由職業", "更多功能/自由職業"],
    ["武器轉換", "更多功能/武器轉換"],
    ["防具轉換", "更多功能/防具轉換"],
    ["六轉重置", "更多功能/六轉重置"],
	["超級屬性", "更多功能/超級屬性"],
    // ["武器轉換", "更多功能/武器轉換"],
];

let blackList = [];
let str = `#e#b[更多功能]#r#k#l\r\n`;

for (let i = 0; i < list.length; i++) {
    str += (i % 4 === 0 && i > 0) ? "\r\n" : "";
    if (!blackList.includes(i)) {
        str += `#L${i}##k${list[i][0]}#l`;
    } else {
        str += `#L${i}##r${list[i][0]}#l`;
    }
}

str += `\r\n\r\n\t\t\t#fs14##L999#${icon.common.返回[0]}返回主菜單#l`;

let selection = npc.askMenu(str);
if (blackList.includes(selection) && !stage.isGm()) {
    npc.say("維修中");
} else if (selection === 999) {
    stage.runScript('expand/menu');
} else {
    stage.runScript("expand/menu/" + list[selection][1]);
}