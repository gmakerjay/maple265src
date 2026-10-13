/*
* 
* 
* 功能：商城NPC
* 
*
*/

/ global player /


const Icon = require('constant/Icon');
const Color = require('constant/Color');

let payUtils = require('constant/payUtils');


const list = [
    [1, '金幣商店', 'expand/menu/楓幣系統/儲備金限量商店', Icon.iconByCase(5450011)],
    [4, '裝備回收', 'expand/menu/楓幣系統/分解裝備', Icon.iconByConsume(2431195)],
];

// let str = "---------------------副本中心---------------------\r\n#fs14##e";
// str = `${icon.任務相關.推薦內容}\r\n` ;;
let str = "#r#fn微軟雅黑##fs14##e#b[金幣系統]#r#k#fs14#   ";
str += `擁有: ${Color.淡桃紅}${payUtils.formatNumberToMoney(payUtils.getPay(6, db, stage))}\r\n#k`;
for (let i in list) {
    str += `#L${i}#${list[i][3]}${list[i][1]}#l`
    if ((parseInt(i) + 1) % 2 == 0) {
        str += `\r\n`
    } else {
        str += `\t`;
    }
}
str += `\r\n\t\t\t#fs14##L999#${Icon.common.home}返回主菜單#l`;
let selection = npc.askMenu(str)
if (selection == 999) {
    stage.runScript('expand/menu');
} else {
    stage.runScript(list[selection][2]);
}