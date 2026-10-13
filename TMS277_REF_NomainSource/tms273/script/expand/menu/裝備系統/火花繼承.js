const list = [
    // 輝耀上下
    [1042433, 1052723],
    [1042434, 1052723],
    [1042435, 1052723],
    [1042436, 1052723],
    [1042437, 1052723],
    [1062285, 1052723],
    [1062286, 1052723],
    [1062287, 1052723],
    [1062288, 1052723],
    [1062289, 1052723],
    // 輝耀帽子
    [1005980, 1004808],
    [1005981, 1004809],
    [1005982, 1004810],
    [1005983, 1004811],
    [1005984, 1004812],
    // 輝耀護肩
    [1152212, 1152196],
    [1152213, 1152197],
    [1152214, 1152198],
    [1152215, 1152199],
    [1152216, 1152200],
];


const exList = [
    [0, "力量"],
    [1, "敏捷"],
    [2, "智力"],
    [3, "運氣"],
    [4, "力敏"],
    [5, "力智"],
    [6, "力運"],
    [7, "敏智"],
    [8, "敏運"],
    [9, "智運"],
    [10, "最大血"],
    [11, "最大魔"],
    [12, "等級減少"],
    [13, "防禦"],
    [14, "？"],
    [15, "？"],
    [16, "？"],
    [17, "攻"],
    [18, "魔"],
    [19, "移動速度"],
    [20, "跳躍"],
    [21, "BOSS"],
    [22, ""],
    [23, "傷害"],
    [24, "全屬"]
];


function start() {
    let index = -1;

    let toDropNew = stage.getItemBySlot(1, 1);
    let toDropOld = stage.getItemBySlot(1, 2);
    let exceptOld = 0;
    let str = `請將需要被#b提取#k火花的裝備放在#r物品欄第二格子#k\r\n`;
    str += `請將需要被#b覆蓋#k火花的裝備放在#r物品欄第一格子#k\r\n`;
    str += `#r火花繼承后，被提取裝備會消失#k\r\n`;
    let str2 = "";
    for (let i in list) {
        let item1 = list[i][0];
        let item2 = list[i][1];
        if (toDropNew != null && item1 == toDropNew.getItemId()) {
            exceptOld = item2;
        }
        str2 += `#v${item1}:i##z${item1}:i# <<<< #v${item2}:i##z${item2} \r\n\r\n`;
    }
    if (toDropNew != null && toDropOld != null && toDropOld.getItemId() == exceptOld) {
        let YN = npc.askYesNo(str + "是否確認繼承");
        if (YN == 1) {
            let fire = toDropOld.getExGradeOption();
            let numStr = fire.toString();
            while (numStr.length < 12) {
                numStr = "0" + numStr;
            }
            // 以3個字符為單位分割成4組
            const groups = [];
            for (let i = 0; i < 12; i += 3) {
                groups.push(numStr.slice(i, i + 3));
            }

            // 將每組按長度2 1分割，並整理成數組
            let result = groups.map(group => {
                return [parseInt(group.slice(0, 2)), parseInt(group.slice(2, 3))];
            });
            let fireStr = "";
            for (let i in result) {
                fireStr += exList[result[i][0]][1] + ": " + result[i][1] + " 級\r\n";
            }
            str = "被提取火花:\r\n" + fireStr + "是否確認提取#r(提取后被提取道具會消失)#k";
            if (npc.askYesNo(str) == 1) {
                toDropNew.setExGradeOption(fire);
                stage.updateItemBySlot(1, 1);
                stage.removeItemBySlot(1, 2);
                npc.say("火花繼承成功!");
            }
        }
    } else {
        npc.say(str + "繼承關係如下:\r\n" + str2);
    }


}


start();