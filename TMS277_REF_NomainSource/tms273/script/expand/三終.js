/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
money = require("marin_7");
let log = require('check_log');
start();

function start() {
    let marin = [];
    let txt = "終傷處理中心\r\n";
    txt += "#b背包中放置10個包含兩條終傷詞條的怪怪可以合成1個三終傷詞條的怪怪\r\n";
    txt += "怪怪卡顏色需為傳說綠色  需扣除500星語幣\r\n"
    txt += "需 #r500#d 星語幣\r\n\r\n";
    for (let i = 1; i <= 128; i++) {
        let equip = stage.getItemBySlot(2, i);
        if (equip == null) continue;
        if (equip['familiar'] == 0) continue;
        if (equip['grade'] != 4) continue;
        let potential1 = equip['potential1'];
        let potential2 = equip['potential2'];
        let potential3 = equip['potential3'];

        if ((potential1 == 40016 && potential2 == 40016 && potential3 != 40016) ||
            (potential1 == 40016 && potential3 == 40016 && potential2 != 40016) ||
            (potential2 == 40016 && potential3 == 40016 && potential1 != 40016)) {
            marin.push(i);
            if (marin.length == 10) break;
        }
    }
    let judge = true;
    if (marin.length < 10) {
        judge = false;
    }
    for (let i in marin) {
        let equip = stage.getItemBySlot(2, marin[i]);
        if (i % 6 == 0) txt += "\r\n\r\n";
        if (!judge) {
            txt += "#i" + equip['itemId'] + "#\t";
        } else {
            txt += "#L" + i + "##i" + equip['itemId'] + "##l　";
        }
    }
    txt += "\r\n";
    if (!judge) {
        txt += "\r\n";
        txt += "#r\t\t抱歉..10 張滿足條件的才能合成!\r\n";
        if (npc.meFlip().askYesNo(txt) != 1) return;
    } else {
        txt += "\r\n";
        txt += "#r\t\t請選擇你想生成的最終外形\r\n";
        let sel = npc.meFlip().askMenu(txt);

        if (log.getEventValue(stage, db, "終傷效驗") > 0) {
            npc.meFlip().say("一個賬號只能合成一回");
            return;
        }
        if (money.get(stage, db) < 500) {
            npc.meFlip().say("抱歉..你沒有 500 星語幣");
            return;
        }

        equip = stage.getItemBySlot(2, marin[sel]);
        if (npc.meFlip().askYesNo("確認選擇 #i" + equip['itemId'] + "# 當最終外形嗎?並重置屬性!") == 1) {
            equip['potential1'] = 40016;
            equip['potential2'] = 40016;
            equip['potential3'] = 40016;
            stage.updateItemBySlot(2, marin[sel]);

            for (let i in marin) {
                if (marin[i] == marin[sel]) continue;
                stage.removeItemBySlot(2, marin[i]);
            }
            money.add(stage, db, -500);
            log.addEventValue(stage, db, "終傷效驗", 1, -1);
            npc.meFlip().say("合成成功~");
        }
    }
}