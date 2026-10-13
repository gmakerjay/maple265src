player = require("check_log");
let article = {
    0: {
        name: "海盜防具",
        bute: [1003605, 1052513, 1072715, 1082476, 1102460, 1132160, 1152098]
    },
    1: {
        name: "盜賊防具",
        bute: [1003604, 1052512, 1072714, 1082475, 1102459, 1132159, 1152097]
    },
    2: {
        name: "法師防具",
        bute: [1003603, 1052511, 1072713, 1082474, 1102458, 1132158, 1152096]
    },
    3: {
        name: "劍士防具",
        bute: [1003601, 1052509, 1072711, 1082472, 1102456, 1132156, 1152094]
    },
    4: {
        name: "弓手防具",
        bute: [1003602, 1052510, 1072712, 1082473, 1102457, 1132157, 1152095]
    }
}

marinStart();

function marinStart() {
    if (player.getPQLog(stage, db, "新手防具效驗") >= 1) {
        var txt = "請選擇你當前職業的武器\r\n";
        if (player.getPQLog(stage, db, "新手武器效驗") > 1) {
            stage.dropAlertNotice("抱歉。。你已領過了防具與武器");
            return;
        }
        article = {
            0: {
                name: "海盜武器",
                bute: [1492154, 1482142, 1532076, 1222052, 1242078, 1403031]
            },
            1: {
                name: "盜賊武器",
                bute: [1332195, 1472181, 1362069, 1242077, 1272027, 1404016, 1292033]
            },
            2: {
                name: "法師武器",
                bute: [1372141, 1382170, 1552045, 1212057, 1252056, 1262028, 1282027]
            },
            3: {
                name: "劍士武器",
                bute: [1302229, 1402153, 1312118, 1412106, 1322164, 1422109, 1562006, 1432140, 1442184, 1542045, 1232072, 1582030, 1213031]
            },
            4: {
                name: "弓手武器",
                bute: [1452172, 1462161, 1522073, 1592034, 1214033]
            }
        }
        for (var key in article) {
            var armor = article[key];
            txt += "#L" + key + "#" + armor.name + "#l\r\n";
        }
        sel = npc.meFlip().askMenu(txt);
        var txt = "請選擇你當前職業的武器\r\n";
        var selectedArmor = article[sel];
        var items = selectedArmor.bute;
        for (var i in items) {
            txt += "#L" + i + "##i" + items[i] + ":##z" + items[i] + "##l\r\n";
        }
        url = npc.meFlip().askMenu(txt);
        txt = "確認選擇#i" + items[url] + "#嗎?\r\n";
        yeno = npc.meFlip().askYesNo(txt);
        if (yeno != 1) return;
        var Equip = util.makeItem(items[url], 1);
        Equip['baseStr'] += 20;
        Equip['baseInt'] += 20;
        Equip['baseDex'] += 20;
        Equip['baseLuk'] += 20;
        Equip['pad'] += 20;
        Equip['mad'] += 20;
        Equip['maxHp'] += 255;
        Equip['maxMp'] += 255;
        Equip['chuc'] += 15;
        Equip['grade'] = 0;
        Equip.setOption1(30086);
        Equip.setOption2(30086);
        Equip.setOption3(30086);
        stage.gainItem(Equip);
        player.addPQLog(stage, db, "新手武器效驗", 1, 3650);
        if (player.getPQLog(stage, db, "新手武器效驗") > 1) {
            stage.loseItem(2430686, 1);
        }
        stage.dropAlertNotice("恭喜..你領完了新手武器");
    } else {
        var txt = "請選擇你當前職業的防具\r\n";
        for (var key in article) {
            var armor = article[key];
            txt += "#L" + key + "#" + armor.name + "#l\r\n";
        }
        sel = npc.meFlip().askMenu(txt);
        var selectedArmor = article[sel];
        var items = selectedArmor.bute;
        txt = "確認選擇 #r" + selectedArmor.name + "#k 嗎?\r\n\r\n";
        for (var i in items) {
            txt += "#i" + items[i] + ":# ";
        }
        txt += "\r\n";
        yeno = npc.meFlip().askYesNo(txt);
        if (yeno != 1) return;
        for (var i in items) {
            var Equip = util.makeItem(items[i], 1);
            Equip['baseStr'] += 20;
            Equip['baseInt'] += 20;
            Equip['baseDex'] += 20;
            Equip['baseLuk'] += 20;
            Equip['maxHp'] += 255;
            Equip['maxMp'] += 255;
            Equip['chuc'] += 15;
            Equip['grade'] = 0;
            Equip.setOption1(30086);
            Equip.setOption2(30086);
            Equip.setOption3(30086);
            stage.gainItem(Equip);
        }
        player.addPQLog(stage, db, "新手防具效驗", 1, 3650);
        yeno = npc.meFlip().askYesNo("恭喜..你領完了防具 是否繼續領武器？\r\n");
        if (yeno != 1) return;
        marinStart();
    }
}
function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    const finalString = finalStringArray.slice(0, totalLength).join("");
    return finalString;
}