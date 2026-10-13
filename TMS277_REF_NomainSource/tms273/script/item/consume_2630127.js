/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

//送的物品

const list = [
    [// 一期
        [5000870, 5000871, 5000872],
        [1802655, 1802656, 1802657]
    ],
    [// 二期
        [5000884, 5000885, 5000886],
        [1802715, 1802715, 1802716]
    ],
];

let boxId = 2630127;//箱子ID


let text = "#b消耗#v" + boxId + "#,可選擇你要1組p寵！！:\r\n#n"
// }
for (let i in list) {
    text += "#d#L" + i + "#" + `第${parseInt(i) + 1}期月光寵物  ` + "#v" + list[i][0][0] + "# ";
    text += "#v" + list[i][0][1] + "# ";
    text += "#v" + list[i][0][2] + "##l\r\n";
}
let selected = npc.askMenu(text);

text = "您是否確定獲取\r\n";
text += "#v" + list[selected][0][0] + "#";
text += "#v" + list[selected][0][1] + "#";
text += "#v" + list[selected][0][2] + "#";
let YN = npc.askYesNo(text);
if (YN == 1) {
    if (stage.canHold(list[selected][0][0], 3) && stage.canHold(list[selected][1][0], 3)) {
        if (stage.hasItem(boxId, 1)) {
            stage.loseItem(boxId, 1);

            for (let i = 0; i < 3; i++) {
                stage.gainItem(list[selected][0][i], 1);//寵物本體
                stage.gainItem(list[selected][1][i], 1);//裝備
            }
            util.broadcastGachaponMsg(15, "『萌新P寵箱』 : 恭喜 " + stage.getCharacterName() + ` 領取了${parseInt(selected) + 1}代p寵和裝備！！！！！！！`);
            npc.say("兌換成功");
        } else {
            npc.say("你沒有#v" + boxId + "#");
        }
    } else {
        npc.say("請清理揹包！");
    }
} else {
    npc.say("不想兌換嗎？下次再見。");
}