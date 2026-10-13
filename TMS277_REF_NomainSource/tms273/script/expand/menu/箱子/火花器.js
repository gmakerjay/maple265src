/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 火化器
 * zsf
 */
const blackList = [];
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
const itemId = 2633195;

function start() {
    let toDrop = stage.getItemBySlot(1, 1);
    if (toDrop == null) {
        npc.say("將要強化的裝備放在第一格");
        return;
    }
    if (blackList.indexOf(toDrop.getItemId()) != -1) {
        npc.say("這個裝備不可以");
        return;
    }

    let numStr = toDrop.getExGradeOption().toString();


    if (numStr.length < 10) {
        npc.say("只能強化4條以上火花的道具。");
        return;
    }

    // 如果長度為11，左補0
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
    let can = false;
    let str = `#v${toDrop.getItemId()}# 當前火花等級: \r\n`;
    str += `${toDrop.getExGradeOption()}\r\n`;
    for (let i in result) {
        str += exList[result[i][0]][1] + "\t等級: " + result[i][1] + "\r\n";
        if (result[i][1] < 9) {
            can = true;
        }
    }
    if (can) {
        str += `是否進行洗鍊，使用后隨機使一條火花提升一個等級，如隨機到已經為9級的詞條，詞條不動，火花器消失。`;
        if (npc.askYesNo(str) == 1) {
            if (stage.hasItem(itemId, 1)) {
                stage.loseItem(itemId, 1);
                let rand = Math.floor(Math.random() * 4);
                if (result[rand][1] == 9) {
                    npc.say(`很遺憾,火花器閃了一下，發現指向了#r${result[rand][0]}#k 這條已經不需要強化了`);
                    return;
                } else {
                    let levelUp = 1;
                    for (let i = 0; i < (3 - rand); i++) {
                        levelUp = levelUp * 1000;
                    }

                    util.log(toDrop.getExGradeOption());
                    let newLevel = parseInt(toDrop.getExGradeOption()) + parseInt(levelUp);
                    util.log(newLevel);
                    toDrop.setExGradeOption(newLevel);
                    stage.updateItemBySlot(1, 1);
                    npc.say(`恭喜你,火花器閃了一下，#r${exList[result[rand][0]][1]}#k 變強了!\r\n等級: ${result[rand][1]} -> ${result[rand][1] + 1}`);

                }
            }
        }
    } else {
        npc.say("已經滿火花了不可繼續強化");
    }

    // npc.say(str);
}


start();