/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let casual = [
    '個人倉庫', '清理背包', '裝備回收', '卷軸倉庫',
    '回收原初'
]

execute();

function execute() {
    let txt = "#e\r\n";
    txt += "#b[背包管理]#k\r\n\r\n";
    for (let i in casual) {
        txt += "#L" + i + "#" + casual[i] + "#l ";
        if (i % 4 === 3) txt += "\r\n\r\n";
    }
    let sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            stage.openTrunk(9031016);
            break;
        case 1:
            let regular = ['裝備欄', '消耗欄', '其他欄', '設置欄', '特殊欄', '裝扮欄']
            txt = "\t\t\t\t\t　清理背包\r\n\r\n";
            for (let i in regular) {
                txt += "#L" + i + "#" + regular[i] + "#l";
            }
            txt += "\r\n\r\n\r\n";
            txt += "\t\t　#b下列功能為全部刪除！請慎重選擇#k\r\n\r\n";
            for (let i in regular) {
                txt += "#r#L" + (Number(i) + 100) + "#" + regular[i] + "#l";
            }
            txt += " ";
            let sel_1 = npc.meFlip().askMenu(txt);
            while (true) {
                txt = "\t\t\t\t\t　清理背包\r\n\r\n";
                let equip;
                let inv;
                switch (true) {
                    case sel_1 < 100:
                        inv = (sel_1 === 0 ? 1 : sel_1 === 1 ? 2 : sel_1 === 2 ? 3 : sel_1 === 3 ? 4 : sel_1 === 4 ? 5 : 6);
                        for (let i = 1; i <= 128; i++) {
                            equip = stage.getItemBySlot(inv, i);
                            if (equip === null) continue;
                            if (equip['itemId'] === 2432022) continue;
                            txt += "#b#L" + i + "##i" + equip['itemId'] + "#" + equip['attribute'] + "#l";
                        }
                        let lose_1 = npc.meFlip().askMenu(txt);
                        equip = stage.getItemBySlot(inv, lose_1);
                        txt = "#e確定回收 #r#i" + equip['itemId'] + "##z" + equip['itemId'] + "# 1個 #k嗎？\r\n";
                        if (npc.meFlip().askYesNo(txt)) {
                            stage.removeItemBySlot(inv, lose_1);
                            npc.meFlip().say("回收成功！祝你遊戲愉快~");
                        }
                        break;

                    default:
                        inv = (sel_1 === 100 ? 1 : sel_1 === 101 ? 2 : sel_1 === 102 ? 3 : sel_1 === 103 ? 4 : sel_1 === 104 ? 5 : 6);
                        txt = "#d請輸入你要保留前面幾格位置的東西\r\n";
                        txt += "默認保留8格子\r\n";
                        txt += "最大128格。\r\n";
                        let num = npc.meFlip().defNum(8).minNum(1).maxNum(128).askNumber(txt);

                        txt = "你是否要清空整個" + regular[Number(sel_1) - 100] + "?.只會保留前面" + num + "格欄位置的東西。\r\n";
                        if (npc.meFlip().askYesNo(txt)) {
                            txt = "你是否要清空整個" + regular[Number(sel_1) - 100] + "?.只會保留前面" + num + "格欄位置的東西。\r\n";
                            if (!npc.meFlip().askYesNo(txt)) {
                                execute();
                                return;
                            }
                            for (let i = 1; i <= 128; i++) {
                                equip = stage.getItemBySlot(inv, i);
                                if (equip == null) continue;
                                if (i <= num) continue;
                                stage.removeItemBySlot(inv, i);
                            }
                            npc.meFlip().say("回收成功，祝你遊戲愉快！");
                            execute();
                        }
                        break;
                }
            }
            break;
        case 2:
            stage.runScript('expand/menu/分解裝備');
            break;
        case 3:
            stage.runScript('expand/menu/卷軸倉庫');
            break;
        case 4:
            stage.runScript('expand/menu/回收原初');
            break;
    }
}