/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

//stage.runScript('expand/menu/箱子/BOSS戒指箱/綠玉');
/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * zsf 腳本定製 @mizhijitui
 * XXXXXXXX
 */
// 58 35 6 1
const boxId = ctx.getDataId();
const boxName = `白玉BOSS戒指箱(最高級)`;
const npcId = 2540017;
const rings = [
    [1113329, 20, '持續之戒', [10, 80, 10]],
    [1113098, 50, '克制之戒', [10, 80, 10]],
    [1113108, 100, '集成之戒', [30, 50, 15, 5]],
    [1113109, 100, '等級增益S', [30, 50, 15, 5]],
    [1113110, 100, '等級增益D', [30, 50, 15, 5]],
    [1113111, 100, '等級增益I', [30, 50, 15, 5]],
    [1113112, 100, '等級增益L', [30, 50, 15, 5]],
    [1113113, 60, '武器增益S', [0, 90, 10, 0]],
    [1113114, 60, '武器增益D', [0, 90, 10, 0]],
    [1113115, 60, '武器增益I', [0, 90, 10, 0]],
    [1113116, 60, '武器增益L', [0, 90, 10, 0]],
    [1113122, 100, '風險之戒', [0, 90, 10, 0]],
    [1113104, 100, '爆擊傷害戒指', [30, 50, 15, 5]],
    [1113125, 100, '水晶HM', [30, 50, 15, 5]],
    [1113099, 100, '末日之戒', [30, 50, 15, 5]],
    [1113100, 100, '極限之戒', [30, 50, 15, 5]],
    [1113101, 100, '嗜血之戒', [30, 50, 15, 5]],
    [1113102, 100, '嗜魂之戒', [30, 50, 15, 5]],
    [1113105, 100, '暴擊破甲之戒', [30, 50, 15, 5]],
    [1113106, 100, '暴擊輪換之戒', [30, 50, 15, 5]],
    [1113107, 100, '穩如泰山輪換之戒', [30, 50, 15, 5]],
    [1113117, 100, '迅捷之戒', [30, 50, 15, 5]],
    [1113118, 100, '穿越之戒', [30, 50, 15, 5]],
    [1113119, 100, '護盾消長之戒', [30, 50, 15, 5]],
    [1113120, 100, '反射之戒', [30, 50, 15, 5]],
    [1113121, 100, '消解之戒', [30, 50, 15, 5]],
    [1113123, 100, '水晶H', [30, 50, 15, 5]],
    [1113124, 100, '水晶M', [30, 50, 15, 5]],
    [1113126, 100, '康復穩如泰山之戒', [30, 50, 15, 5]],
    [1113127, 100, '康復防禦之戒', [30, 50, 15, 5]],
    [1113128, 100, '起源之塔增強之戒', [30, 50, 15, 5]],
    [1113103, 100, '持久之戒', [30, 50, 15, 5]],
];


function start() {

    let str = `#v${boxId}:i##z${boxId}:i#` + '\r\n';
    str += `隨機獲得下列戒指的其中一個，戒指概率均等，等級隨着箱子品級波動\r\n`;
    for (let i in rings) {
        str += `#v${rings[i][0]}:i#`;
    }
    str += `#r是否開啟\r\n`;
    if (npc.id(npcId).askYesNo(str) == 1) {
        const totalWeight = rings.reduce((acc, item) => acc + item[1], 0);
        if (!stage.hasItem(boxId, 1)) {
            npc.id(npcId).say(`箱子不足`);
        } else if (stage.getFreeSlot(1) < 2) {
            npc.id(npcId).say(`背包空間不足`);
        } else {
            const randomNum = Math.random() * totalWeight;
            let randItem = null;
            // 根據隨機數，確定抽取的獎品
            let cumulativeWeight = 0;
            for (var item of rings) {
                cumulativeWeight += item[1];
                if (randomNum < cumulativeWeight) {
                    // 返回抽取的獎品的[id, 數量, 名字]
                    randItem = item;
                    break;
                }
            }
            if (randItem) {
                let levelCnt = 0;
                let randLevel = -1;
                let levelWeight = randItem[3].reduce((acc, item) => acc + item, 0);
                const randLevelCnt = Math.random() * levelWeight;
                for (var l in randItem[3]) {
                    levelCnt += randItem[3][l];
                    if (randLevelCnt < levelCnt) {
                        // 返回抽取的獎品的[id, 數量, 名字]
                        randLevel = Number(l) + 1;
                        break;
                    }
                }
                stage.loseItem(boxId, 1);
                let toDrop = util.makeItem(randItem[0], 1);
                toDrop.setLevel(randLevel);
                stage.gainItem(toDrop);
                npc.say(`恭喜獲得!\r\n#v${randItem[0]}:i##z${randItem[0]}:i# #r等級:${randLevel}`);
            }
        }
    }

}

function test100() {
    let xiyouList = [
        1113098,
        1113329,
        1113113,
        1113114,
        1113115,
        1113116,
        1113122,
    ];
    let resultInfo = {};
    for (let z = 0; z < 100; z++) {
        const totalWeight = rings.reduce((acc, item) => acc + item[1], 0);
        if (!stage.hasItem(boxId, 1)) {
            npc.id(npcId).say(`箱子不足`);
        } else if (stage.getFreeSlot(1) < 2) {
            npc.id(npcId).say(`背包空間不足`);
        } else {
            const randomNum = Math.random() * totalWeight;
            let randItem = null;
            // 根據隨機數，確定抽取的獎品
            let cumulativeWeight = 0;
            for (var item of rings) {
                cumulativeWeight += item[1];
                if (randomNum < cumulativeWeight) {
                    // 返回抽取的獎品的[id, 數量, 名字]
                    randItem = item;
                    break;
                }
            }
            if (randItem) {
                let levelCnt = 0;
                let randLevel = -1;
                let levelWeight = randItem[3].reduce((acc, item) => acc + item, 0);
                const randLevelCnt = Math.random() * levelWeight;
                for (var l in randItem[3]) {
                    levelCnt += randItem[3][l];
                    if (randLevelCnt < levelCnt) {
                        // 返回抽取的獎品的[id, 數量, 名字]
                        randLevel = Number(l) + 1;
                        break;
                    }
                }
                if (resultInfo[`${randItem[0]}-${randLevel}`]) {
                    resultInfo[`${randItem[0]}-${randLevel}`] += 1;
                } else {
                    resultInfo[`${randItem[0]}-${randLevel}`] = 1;
                }
                // resultInfo[`${randItem[0]}-${randLevel}`]
                // npc.say(`#v${randItem[0]}:i##z${randItem[0]}:i# ${randLevel}`);
            }
        }
    }
    let str = `#v${boxId}:i##z${boxId}:i#\r\n`;
    let str2 = ``;
    let list2 = [];
    for (let i in resultInfo) {
        let id = i.split('-')[0];
        let level = i.split('-')[1];
        if (xiyouList.includes(parseInt(id))) {
            list2.push([id, level, resultInfo[i]]);
        } else {
            str2 += `#v${id}:i##z${id}:i# 等級:${level} x ${resultInfo[i]}\r\n`;
        }
    }
    for (let i in list2) {
        str += `#r#v${list2[i][0]}:i##z${list2[i][0]}:i# 等級:${list2[i][1]} x ${list2[i][2]}#k\r\n`;
    }
    npc.say(str + str2);
}

start();