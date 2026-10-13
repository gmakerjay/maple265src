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
    let item = stage.getItemBySlot(1, 1);
    if (item == null) {
        npc.say("請將要查看的道具放在第一格");
        return;
    }

    let fire = item.getExGradeOption(); // int
    let numStr = fire.toString();
    while (numStr.length < 12) {
        numStr = "0" + numStr;
    }
    let result = [];
    for (let i = 0; i < 4; i++) {
        let group = numStr.substring(i * 3, i * 3 + 3);
        let attrId = parseInt(group.substring(0, 2));
        let level = parseInt(group.substring(2, 3));
        result.push([attrId, level]);
    }

    let fireStr = "";
    for (let i = 0; i < result.length; i++) {
        let attrId = result[i][0];
        let level = result[i][1];
        if (attrId == 0 && level == 0) continue;
        let attrName = (attrId >= 0 && attrId < exList.length) ? exList[attrId][1] : "未知";
        fireStr += attrName + ": " + level + " 級\r\n";
    }

    npc.say("當前火花:\r\n" + fireStr);
}

start();
