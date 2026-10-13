/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 354466922
 */

money = require("marin_7");
let genesis = [1442285, 1312213, 1382274, 1252106, 1582044, 1452266, 1322264, 1522152, 1262051, 1592022, 1462252, 1332289, 1532157, 1402268, 1403022, 1272040, 1404022, 1472275, 1212129, 1213022, 1214022, 1542128, 1412189, 1282040, 1482232, 1222122, 1552130, 1422197, 1292022, 1492245, 1362149, 1232122, 1562010, 1432227, 1302355, 1372237, 1242139, 1242141, 1572010];
let mystical = [1212120, 1213018, 1214018, 1222113, 1232113, 1242121, 1242122, 1252098, 1262039, 1272017, 1282017, 1292018, 1302343, 1312203, 1322255, 1332279, 1342104, 1362140, 1372228, 1382265, 1402259, 1403018, 1412181, 1422189, 1432218, 1442274, 1452257, 1462243, 1472265, 1482221, 1492235, 1522143, 1532150, 1542117, 1552119, 1582023, 1592020];

start();

function start() {
    let txt = "創世繼承中心\r\n";
    txt += "需繼承物品 <#r創世#k>放置到 [ #b1#k ]位置\r\n";
    txt += "將屬性物品 <#r神秘#k>放置到 [ #b2#k ]位置\r\n";
    txt += "\t<#r 僅繼承卷軸屬性 且 屬性物品消失 #k>\r\n"
    txt += "額外消耗 #b50#k 星語幣\r\n";
    txt += "卷軸將繼承給 [ #r1#k ]位置的創世身上!\r\n";
    if (npc.meFlip().askYesNo(txt) != 1) return;

    if (money.get(stage, db) < 50) {
        npc.meFlip().say("抱歉..你沒有 50 星語幣");
        return;
    }
    let equip_1 = stage.getItemBySlot(1, 1);
    let equip_2 = stage.getItemBySlot(1, 2);
    if (equip_1 == null || equip_2 == null) {
        npc.meFlip().say("抱歉..[ 1 ] [ 2 ] 不能留空");
        return;
    }
    if (genesis.indexOf(equip_1['itemId']) <= -1) {
        npc.meFlip().say("抱歉..[ 1 ] 位置的物品必須是創世類型");
        return;
    }
    if (mystical.indexOf(equip_2['itemId']) <= -1) {
        npc.meFlip().say("抱歉..[ 2 ] 位置的物品必須是神秘類型");
        return;
    }
    txt = "創世繼承中心\r\n";
    txt += "#b[ 1 ] #d信息 : #r#z" + equip_1['itemId'] + "#\r\n";
    txt += "#b[ 2 ] #d信息 : #r#z" + equip_2['itemId'] + "#\r\n";
    txt += "\r\n";
    txt += "\t\t\t#r確認無誤嗎?開始繼承屬性嗎?\r\n";
    let attribute = [0, 0, 0, 0, 0, 0];
    if (npc.meFlip().askYesNo(txt) == 1) {
        let temporary = util.makeItem(equip_2['itemId'], 1);
        let temp_genesis = util.makeItem(equip_1['itemId'], 1);
        attribute[0] = equip_2['baseStr'] - temporary['baseStr'] + temp_genesis['baseStr'];
        attribute[1] = equip_2['baseDex'] - temporary['baseDex'] + temp_genesis['baseDex'];
        attribute[2] = equip_2['baseInt'] - temporary['baseInt'] + temp_genesis['baseInt'];
        attribute[3] = equip_2['baseLuk'] - temporary['baseLuk'] + temp_genesis['baseLuk'];
        attribute[4] = equip_2['pad'] - temporary['pad'] + temp_genesis['pad'];
        attribute[5] = equip_2['mad'] - temporary['mad'] + temp_genesis['mad'];

        let bute = ['baseStr', 'baseDex', 'baseInt', 'baseLuk', 'pad', 'mad'];
        for (let i in bute) {
            equip_1[bute[i]] = attribute[i];
        }
        stage.updateItemBySlot(1, 1);
        money.add(stage, db, -50);
        stage.removeItemBySlot(1, 2);
        npc.meFlip().say("繼承成功");
    }
}