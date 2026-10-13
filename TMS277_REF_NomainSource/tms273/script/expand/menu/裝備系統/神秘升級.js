/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let casual = {
    use: {
        1: [12],
        2: [15],
        3: [20],
        4: [27],
        5: [36],
        6: [47],
        7: [60],
        8: [75],
        9: [92],
        10: [111],
        11: [132],
        12: [155],
        13: [180],
        14: [207],
        15: [236],
        16: [267],
        17: [300],
        18: [335],
        19: [372]
    },
    1712001: [
        970000, 1230000, 1660000, 2260000, 3060000, 4040000, 5220000,
        6600000, 8180000, 9990000, 12010000, 14260000, 16740000, 19450000,
        22420000, 25630000, 29100000, 32830000, 36820000
    ],
    1712002: [
        1210000, 1530000, 2060000, 2800000, 3780000, 4980000, 6420000,
        8100000, 10020000, 12210000, 14650000, 17360000, 20340000, 23590000,
        27140000, 30970000, 35100000, 39530000, 44260000
    ],
    1712003: [
        1450000, 1830000, 2460000, 3340000, 4500000, 5920000, 7620000,
        9600000, 11860000, 14430000, 17290000, 20460000, 23940000, 27730000,
        31860000, 36310000, 41100000, 46230000, 51700000
    ],
    1712004: [
        1690000, 2130000, 2860000, 3880000, 5220000, 6860000, 8820000,
        11100000, 13700000, 16650000, 19930000, 23560000, 27540000, 31870000,
        36580000, 41650000, 47100000, 52930000, 59140000
    ],
    1712005: [
        1930000, 2430000, 3260000, 4420000, 5940000, 7800000, 10020000,
        12600000, 15540000, 18870000, 22570000, 26660000, 31140000, 36100000,
        41300000, 46990000, 53000000, 59360000, 66080000
    ],
    1712006: [
        2170000, 2730000, 3660000, 4960000, 6660000, 8740000, 11220000,
        14100000, 17380000, 21090000, 25120000, 29760000, 34740000, 40150000,
        46020000, 52330000, 59100000, 66330000, 74020000
    ]
};

execute();

function execute() {
    let txt = "\t\t\t\t秘法符文\r\n\r\n";
    txt += "請把要升級的秘法符文穿戴上去 並下列選擇提升的秘法\r\n";
    for (let i = -1600; i >= -1606; i--) {
        let equip = stage.getItemBySlot(-6, i);
        if (equip == null) continue;
        if (equip['arcLevel'] >= 20) continue;
        txt += "#d#L" + Math.abs(i) + "##i" + equip['itemId'] + "##b lv.#r" + marinstring(" ", 3, equip['arcLevel'].toString()) + "#l　";
        if (i % 3 === 1) txt += "\r\n";
    }
    let sel = npc.meFlip().askMenu(txt);

    let marin = [0, 0];
    let idx = -(Math.abs(sel));
    let equip = stage.getItemBySlot(-6, idx);
    if (equip['arcLevel'] >= 20) {
        npc.meFlip().say("抱歉..強化到最高了!");
        return;
    }
    marin[0] = casual[equip['itemId']][equip['arcLevel'] - 1];
    marin[1] = casual.use[equip['arcLevel']];
    txt = "\t\t\t\t\t　#i" + equip['itemId'] + "#\r\n";
    txt += "#d當前級別：#b" + equip['arcLevel'] + "\r\n";
    txt += "#d消耗楓幣：#b" + marin[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "\r\n";
    txt += "#d消耗數量：#b" + marin[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "\r\n";
    if (npc.meFlip().askYesNo(txt)) {
        let judge = true;
        if (!stage.hasMesos(marin[0])) {
            judge = false;
        }
        if (!stage.hasItem(2439305, marin[1])) {
            judge = false;
        }
        if (!judge) {
            npc.meFlip().say("抱歉..你所需材料沒有達標!");
            return;
        }
        stage.loseMesos(marin[0]);
        stage.loseItem(2439305, marin[1]);
        equip['arcLevel'] += 1;
        equip['arc'] += 10;
        equip['arcExp'] = 0;
        let aubute = ['baseStr', 'baseDex', 'baseInt', 'baseLuk'];
        for (let i in aubute) {
            if (equip[aubute[i]] > 0) {
                equip[aubute[i]] += 100;
            }
        }
        stage.updateItemBySlot(-6, idx);
        npc.meFlip().say("強化成功");
        execute();
    }
}

function marinstring(charToFill, totalLength, originalString) {
    const lengthOfDoubleByteChars = (originalString.match(/[\u4E00-\u9FA5]/g) || []).length;
    const length = originalString.length + lengthOfDoubleByteChars;
    const charactersToFill = charToFill.repeat(totalLength - length);
    return originalString + charactersToFill;
}
