/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */
const payUtils = require('constant/PayUtils.js');
let attribute = ['expireDate', 'title', 'ruc', 'cuc', 'maxHp', 'maxMp', 'pdd', 'craft', 'speed', 'jump', 'attribute', 'levelUpType', 'incSkill', 'level', 'exp', 'durability', 'iuc', 'puc', 'pvpDamage', 'reduceReq', 'specialAttribute', 'durabilityMax', 'incReq', 'growthEnchant', 'bossDamageR', 'ignorePdr', 'damageR', 'statRate', 'cuttable', 'exGradeOption', 'itemState', 'grade', 'chuc', 'soulOption', 'soulSocket', 'soulOptionId', 'arc', 'arcExp', 'arcLevel', 'aut', 'autExp', 'autLevel', 'option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'socket1', 'socket2', 'socket3']
let sortequip = {
    0: [1152212, 1152213, 1152214, 1152215, 1152216],//永恆護肩
    1: [1005980, 1005981, 1005982, 1005983, 1005984],//永恆帽子
    2: [1073629, 1073630, 1073631, 1073632, 1073633],//永恆鞋子
    3: [1082760, 1082761, 1082762, 1082763, 1082764],//永恆手套
    4: [1103433, 1103434, 1103435, 1103436, 1103437],//永恆披風
    5: [1042433, 1042434, 1042435, 1042436, 1042437],//永恆上衣
    6: [1062285, 1062286, 1062287, 1062288, 1062289],//永恆下衣
    7: [1004808, 1004809, 1004810, 1004811, 1004812],//神秘頭
    8: [1053063, 1053064, 1053065, 1053066, 1053067],//神秘套裝
    9: [1073158, 1073159, 1073160, 1073161, 1073162],//神秘鞋子
    10: [1082695, 1082696, 1082697, 1082698, 1082699],//神秘手套
    11: [1102940, 1102941, 1102942, 1102943, 1102944],//神秘披風
    12: [1152196, 1152197, 1152198, 1152199, 1152200]//神秘護肩
}
execute();

function execute() {
    let txt = "#r防具變更說明:#k\r\n";
    txt += "#b1.#k把需要變更的防具放置 [ #r1#k ] 位置\r\n";
    txt += "#b2.#k變更防具職業所需 500 樂豆\r\n";
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
        npc.me().say("抱歉..當前 [ #r1#k ] 物品沒有變更條件!");
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
    if (payUtils.getPay(2, db, stage) < 500) {
        npc.meFlip().say("抱歉..你沒有 500 樂豆");
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
    for (let i in attribute) {
        old_equip[attribute[i]] = equip[attribute[i]];
    }
    payUtils.gainPay(2, -500, stage, db, '武器轉換', '')
    stage.removeItemBySlot(1, 1);
    stage.gainItem(old_equip);
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