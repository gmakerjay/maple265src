/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */
const payUtils = require('constant/PayUtils.js');
let attribute = ['expireDate', 'title', 'ruc', 'cuc', 'maxHp', 'maxMp', 'pdd', 'craft', 'speed', 'jump', 'attribute', 'levelUpType', 'incSkill', 'level', 'exp', 'durability', 'iuc', 'puc', 'pvpDamage', 'reduceReq', 'specialAttribute', 'durabilityMax', 'incReq', 'growthEnchant', 'bossDamageR', 'ignorePdr', 'damageR', 'statRate', 'cuttable', 'exGradeOption', 'itemState', 'grade', 'chuc', 'soulOption', 'soulSocket', 'soulOptionId', 'arc', 'arcExp', 'arcLevel', 'aut', 'autExp', 'autLevel', 'socket1', 'socket2', 'socket3']
let sortequip = {
    0: [//創世
        1302000,1302355, 1402268, 1312213, 1412189, 1322264, 1422197, 1432227, 1442285, 1232122, 1382274, 1372237, 1462252, 1332289, 1472275, 1492245, 1482232, 1532157, 1362149,
        1272040, 1552130, 1542128, 1252106, 1212129, 1522152, 1242139, 1262051, 1282040, 1222122, 1213022, 1582044, 1592022, 1452266, 1403022, 1214022, 1292022],
    1: [//神秘
        1592020, 1404018, 1302343, 1292018, 1213018, 1522143, 1402259, 1312203, 1412181, 1322255, 1422189, 1432218, 1442274, 1232113, 1382265, 1452257, 1462243, 1372228, 1403018, 1214018,
        1332279, 1472265, 1492235, 1482221, 1532150, 1362140, 1272017, 1552119, 1542117, 1252098, 1212120, 1522143, 1242122, 1242121, 1262039, 1282017, 1222113, 1582023, 1403030],
    2: [//銀河
        1353205, 1353505, 1353405, 1352807, 1352606, 1352266, 1352256, 1352246, 1352236, 1352928, 1353006, 1352975, 1352967, 1352957, 1353707, 1352945, 1352935, 1352916, 1353105,
        1353807, 1352906, 1352815, 1352707, 1352506, 1352406, 1352296, 1352286, 1352276, 1098006, 1352226, 1352216, 1352206, 1352109, 1352009, 1353807, 1352867,
        1099012, 1353306, 1353606, 1354007, 1352972, 1354017, 1342109]
}
let option = {
    0: [42051, 40052],
    1: [32051, 30052]
}
execute();

function execute() {
    let txt = "#r武器變更說明:#k\r\n";
    txt += "#b1.#k把需要變更的武器放置 [ #r1#k ] 位置\r\n";
    txt += "#b2.#k變更武器職業所需 1500 樂豆\r\n";
    txt += "#b3.#k使用後需使用還原捲軸進行還原\r\n\t ( #b潛能 星之力 火花#k ) 不變\r\n";
    if (npc.me().askYesNo(txt) !== 1) return;

    let equip = stage.getItemBySlot(1, 1); 
    if (equip === null) {
        npc.me().noEsc().say("抱歉..[ 1 ] 位置不能留空");
        return;
    }
    let slot = null;
    for (let i in sortequip) {
        if (sortequip[i].includes(equip['itemId'])) {
            slot = i;
            break;
        }
    }
    if (slot === null) {
        txt = "抱歉..當前 [ #r1#k ] 物品沒有變更條件!\r\n";
        txt += "支持的物品如下列所示\r\n\r\n";
        for (let i in sortequip[0]) {
            txt += "#i" + sortequip[0][i] + ":#";
        }
        npc.me().say(txt);
        return;
    }
    let casual_equip = sortequip[slot].filter(item => item !== equip['itemId']);
    txt = "請選擇你想變更的其他職業的物品\r\n";
    txt += "等待變更物品 #i" + equip['itemId'] + ":# 請在下列選擇變更的物品\r\n\r\n";
    for (let i in casual_equip) {
        txt += "#L" + casual_equip[i] + "##i" + casual_equip[i] + ":##l";
    }
    let sel_1 = npc.me().askMenu(txt);
    txt = "";
    txt += "\t\t\t\t#i" + equip['itemId'] + ":#　--->　#i" + sel_1 + ":#\r\n";
    txt += "#b1.#d力量 #b2.#d敏捷 #b3.#d智力 #b4.#d幸運\r\n";
    txt += "#k請在下列輸入重新組合的四維屬性\r\n";
    txt += "#r例:#d( 2 4 1 3 ) 組合如下列所示 ( #r1234#k 保持默認 )\r\n";
    txt += "#b力量 -> #r敏捷 | #b敏捷-> #r幸運 | #b智力 -> #r力量 | #b幸運 -> #r智力\r\n";
    txt += "#b力量 :#r" + equip['baseStr'] + " ";
    txt += "#b敏捷 :#r" + equip['baseDex'] + " ";
    txt += "#b智力 :#r" + equip['baseInt'] + " ";
    txt += "#b幸運 :#r" + equip['baseLuk'] + "\r\n\r\n";
    txt += " ";
    let name = npc.me().defText("1234").minLen(4).maxNum(4).askText(txt);

    if (!isvalid(name)) {
        npc.me().say("抱歉..組合出錯!\r\n\r\n( #r不能重複 且只能是 #b1 2 3 4 #r範圍內的組合#k )");
        return;
    }
    txt = "";
    txt += "\t\t\t\t#i" + equip['itemId'] + ":#　--->　#i" + sel_1 + ":#\r\n";
    txt += "\t\t\t#b1.#d力量 #b2.#d敏捷 #b3.#d智力 #b4.#d幸運\r\n";
    txt += "\t\t\t#r目前屬性變更組合如下列所示#k\r\n\r\n";
    let casual_attribute = {
        1: ['baseStr', '力量', 0],
        2: ['baseDex', '敏捷', 0],
        3: ['baseInt', '智力', 0],
        4: ['baseLuk', '幸運', 0]
    }
    name = name.split('');
    let new_equip = util.makeItem(equip['itemId'], 1);
    for (let i in casual_attribute) {
        txt += "\t\t\t\t#r" + casual_attribute[i][1] + " #k--->#b " + casual_attribute[name[i - 1]][1] + "\r\n";
        casual_attribute[i][2] = equip[casual_attribute[i][0]] - new_equip[casual_attribute[i][0]];
    }
    npc.me().next().say(txt);

    let judge = false;
    if (npc.me().askYesNo("\r\n\r\n\t\t\t#r是否進行魔攻物攻互換?") === 1) {
        judge = true;
    }
    let option_judge = false;
    txt = "";
    txt += "是否進行潛能互換?\r\n\r\n";
    txt += "攻擊力 <--> 魔法力\r\n";
    if (npc.me().askYesNo(txt) === 1) {
        option_judge = true;
    }
    if (payUtils.getPay(2, db, stage) < 1500) {
        npc.me().say("抱歉..你沒有 1500 樂豆");
        return;
    }
    let old_equip = util.makeItem(sel_1, 1);
    for (let i in casual_attribute) {
        old_equip[casual_attribute[i][0]] += casual_attribute[name[i - 1]][2];
    }
    if (judge) {
        old_equip['pad'] += equip['mad'] - new_equip['mad'];
        old_equip['mad'] += equip['pad'] - new_equip['pad'];
    } else {
        old_equip['pad'] += equip['pad'] - new_equip['pad'];
        old_equip['mad'] += equip['mad'] - new_equip['mad'];
    }
    if (option_judge) { 
        const mappings = {


            42051: 42053,
            32051: 32053,
            40051: 40052,
            30051: 30052,
            42053: 42051,
            32053: 32051,
            40052: 40051,
            30052: 30051,


        };

        for (let i = 1; i <= 6; i++) {
            let optionKey = 'option' + String(i);
            let equipValue = equip[optionKey]; 
            if (mappings[equipValue]) {
                old_equip[optionKey] = mappings[equipValue];
            } else {
                old_equip[optionKey] = equip[optionKey];
            }
        }

    } else {
        old_equip['option1'] = equip['option1'];
        old_equip['option2'] = equip['option2'];
        old_equip['option3'] = equip['option3'];
        old_equip['option4'] = equip['option4'];
        old_equip['option5'] = equip['option5'];
        old_equip['option6'] = equip['option6'];
    }
    for (let i in attribute) {
        old_equip[attribute[i]] = equip[attribute[i]];
    }
    stage.removeItemBySlot(1, 1);
     
    stage.gainItem(old_equip);
    payUtils.gainPay(2, -500, stage, db, '武器轉換', '')
    npc.me().say("變更成功");
}

function isvalid(str) {
    if (str.length !== 4) {
        return false;
    }
    if (!hasUniqueCharacters(str)) {
        return false;
    }
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== '1' && str[i] !== '2' && str[i] !== '3' && str[i] !== '4') {
            return false;
        }
    }
    return true;
}

function hasUniqueCharacters(str) {
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            if (str[i] === str[j]) {
                return false;
            }
        }
    }
    return true;
}

function marinstring(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    return finalStringArray.slice(0, totalLength).join("");
}