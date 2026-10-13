/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


const list = [
    [2431305, 2432206, 24],
    [2432206, 2435824, 10],
	[2435824, 2430376, 10],
	[2430376, 2430377, 10]
];

function start() {
    // 卷軸兌換
    let str = "卷軸兌換\r\n";
    for (let i = 0; i < list.length; i++) {
        // A -> B 消耗A x list[i][2]
        str += `#L${i}##v${list[i][0]}:i# x #r${list[i][2]}#k -> #v${list[i][1]}:i##l\r\n`;
    }
    let sel = npc.askMenu(str);
    let count = stage.getItemQuantity(list[sel][0]);
    if (count < list[sel][2]) {
        npc.say("您的材料不足。");
    } else {
        str = `您要兌換幾個#v${list[sel][1]}:i##z${list[sel][1]}:i#？\r\n`;
        let amount = npc.defNum(count / list[sel][2]).minNum(1).maxNum(count / list[sel][2]).askNumber(str);
        if (amount > 0 && stage.hasItem(list[sel][0], list[sel][2] * amount)) {
            stage.loseItem(list[sel][0], list[sel][2] * amount);
            stage.gainItem(list[sel][1], amount);
            npc.say("兌換成功。");
        } else {
            npc.say("您的材料不足。");
        }
    }
}

start();