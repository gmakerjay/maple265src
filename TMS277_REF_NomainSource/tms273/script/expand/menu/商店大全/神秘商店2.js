/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


const color = require('constant/Color');
const icon = require('constant/Icon');

const {get賽季標號} = require("constant/賽季信息");
const log = require('check_log');
let type = 4;
let scriptName = "神秘商店一號店"

let usedItem = 4310249;//消耗的道具

let list = [
    [1592020, 32],
	[1292018, 32],
    [1212120, 32],
    [1222113, 32],
    [1232113, 32],
    [1242121, 32],
    [1242122, 32],
    [1252098, 32],
    [1262039, 32],
    [1302343, 32],
    [1312203, 32],
    [1322255, 32],
    [1332279, 32],
    [1342104, 32],
    [1362140, 32],
    [1372228, 32],
    [1382265, 32],
    [1402259, 32],
    [1412181, 32],
    [1422189, 32],
    [1432218, 32],
    [1442274, 32],
    [1214018, 32],
    [1452257, 32],
    [1462243, 32],
    [1472265, 32],
    [1482221, 32],
    [1492235, 32],
    [1522143, 32],
    [1532150, 32],
    [1542117, 32],
    [1552119, 32],
    [1582023, 32],
    [1272017, 32],
    [1282017, 32],
    [1404018, 32],
    [1073158, 16],
    [1152200, 16],
    [1152199, 16],
    [1152198, 16],
    [1152197, 16],
    [1152196, 16],
    [1102944, 16],
    [1102943, 16],
    [1102942, 16],
    [1102941, 16],
    [1102940, 16],
    [1073162, 16],
    [1073161, 16],
    [1073160, 16],
    [1073159, 16],
];

while (true) {
    var str = `#r#fn微軟雅黑##fs14##e#b[${scriptName}]#r#k#fs12##l\r\n`;
    let title = `#v${usedItem}:i#`
    str += `擁有: ${title} x #c${usedItem}#\r\n`;

    let selected = 0;
    for (let i in list) {
        str += `#L${i}##i${list[i][0]}##t${list[i][0]}#\t#b單價#r [${list[i][1]}x${title}]#k#l\r\n`;
    }
    let selectedItem = npc.askMenu(str);
    str = "#b當前選擇物品 : #v" + list[selectedItem][0] + "# 單價 :#r" + list[selectedItem][1] + title + "\r\n";
    str += "#e請輸入購買數量#n#b";
    //  str += "\r\n#e剩餘限購數量:" + (items[selected][selectedItem][3] - getEventValue("賬號限購" + items[selected][selectedItem][0], false));
    let number;
    number = npc.defNum(1).minNum(1).maxNum(9999).askNumber(str);
    str = "#b請確認購買物品：\r\n";
    str += "#b物品 : #v" + list[selectedItem][0] + "# 單價 :#r" + list[selectedItem][1] + title + "\r\n";
    str += "#b數量 : " + number + " 個#b 總價 :#r" + (list[selectedItem][1] * number) + title + "\r\n";
    let YN = npc.askYesNo(str);
    if (YN == 1) {
        if (stage.canHold(list[selectedItem][0], number)) {
            if (stage.hasItem(usedItem, list[selectedItem][1] * number)) {
                log.addEventValue(stage, db, "神秘商店一號店" + get賽季標號(), number, -1);
                stage.loseItem(usedItem, list[selectedItem][1] * number);
                let toDrop = util.makeItem(list[selectedItem][0], 1);
                toDrop.setAttribute(8);
                for (let i = 1; i <= number; i++) {
                    stage.gainItem(toDrop);
                }
                npc.say("購買成功");
            } else {
                npc.say(title + "不足，無法進行兌換哦");
            }
        } else {
            npc.say("請清理背包，您當前無法放下所購買物品");
        }
    }
}