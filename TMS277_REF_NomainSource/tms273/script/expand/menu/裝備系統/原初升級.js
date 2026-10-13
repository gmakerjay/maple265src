/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let casual = {
    use: {
        1: [29],
        2: [76],
        3: [141],
        4: [224],
        5: [325],
        6: [444],
        7: [581],
        8: [736],
        9: [909],
        10: [1001]
    },
    1713000: [36500000, 91200000, 160700000, 241900000, 331500000, 426200000, 522900000, 618200000, 709000000, 792000000],
    1713001: [41700000, 104800000, 186100000, 282200000, 390000000, 506100000, 627400000, 750700000, 872600000, 990000000],
    1713002: [46900000, 118500000, 211500000, 322500000, 448500000, 586000000, 732000000, 883200000, 1036200000, 1188000000],
    1713003: [52200000, 132200000, 236800000, 362800000, 507000000, 666000000, 836600000, 1015600000, 1199800000, 1386000000],
    1713004: [57400000, 145900000, 262200000, 403200000, 565500000, 745900000, 941200000, 1148100000, 1363500000, 1584000000],
    1713005: [62600000, 159600000, 287600000, 443500000, 624000000, 825800000, 1045800000, 1280600000, 1527100000, 1782000000]
};

execute();

function execute() {
    let txt = "\t\t\t\t原初之力\r\n\r\n";
    txt += "請把要升級的原初之力穿戴上去 並下列選擇提升的原初\r\n";
    for (let i = -1700; i >= -1706; i--) {
        let equip = stage.getItemBySlot(-9, i);
        if (equip == null) continue;
        if (equip['autLevel'] >= 11) continue;
        txt += "#d#L" + Math.abs(i) + "##i" + equip['itemId'] + "##b lv.#r" + marinstring(" ", 3, equip['autLevel'].toString()) + "#l　";
        if (i % 3 === 1) txt += "\r\n";
    }
    let sel = npc.meFlip().askMenu(txt);

    let marin = [0, 0];
    let idx = -(Math.abs(sel));
    let equip = stage.getItemBySlot(-9, idx);
    if (equip['autLevel'] >= 11) {
        npc.meFlip().say("抱歉..強化到最高了!");
        return;
    }
    marin[0] = casual[equip['itemId']][equip['autLevel'] - 1];
    marin[1] = casual.use[equip['autLevel']];
    txt = "\t\t\t\t\t　#i" + equip['itemId'] + "#\r\n";
    txt += "#d當前級別：#b" + equip['autLevel'] + "\r\n";
    txt += "#d消耗楓幣：#b" + marin[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "\r\n";
    txt += "#d消耗數量：#b" + marin[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "\r\n";
    if (npc.meFlip().askYesNo(txt)) {
        let judge = true;
        if (!stage.hasMesos(marin[0])) {
            judge = false;
        }
        if (!stage.hasItem(2633336, marin[1])) {
            judge = false;
        }
        if (!judge) {
            npc.meFlip().say("抱歉..你所需材料沒有達標!");
            return;
        }
        stage.loseMesos(marin[0]);
        stage.loseItem(2633336, marin[1]);
        equip['autLevel'] += 1;
        equip['aut'] += 10;
        equip['autExp'] = 0;
        let aubute = ['baseStr', 'baseDex', 'baseInt', 'baseLuk'];
        for (let i in aubute) {
            if (equip[aubute[i]] > 0) {
                equip[aubute[i]] += 200;
            }
        }
        stage.updateItemBySlot(-9, idx);
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
