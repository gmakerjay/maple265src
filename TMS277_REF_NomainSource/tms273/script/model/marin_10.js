/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
money = require("marin_7");
player = require("check_log");

function execute(npc, stage, db, util) {
    let txt = "女神祝福\r\n\r\n";
    txt += "#L0#黃金女神祝福#l\t#L1#白金女神祝福#l\t#L2#鑽石女神祝福#l\r\n\r\n";
    let sel = npc.meFlip().askMenu(txt);
    let snum = stage.getIntQuestRecordExShare(10000 + sel, "snum");
    let count = stage.getIntQuestRecordExShare(10000 + sel, "count");
    switch (sel) {
        case 0:
            txt = "#r黃金女神祝福\t#b288 #d星語幣 ( 已購 #r" + snum + "#d 回 )\r\n";
            if (count > 0) {
                txt += "#d當前可領 #r" + count + " #d次\r\n";
            }
            txt += "#d購買立即給與 #b10000#d 楓點\r\n";
            txt += "#d#i2048761:# x 15\r\n";
            txt += "#d#i3700663:# ( 稱號使用 30天 購買 #r3#d 回變為永久 )\r\n";
            txt += "#d每日可領 #i5062507# #i 5062031 # #i5062512# x 20 與 #r1288#d 楓點\r\n";
            txt += "\r\n";
            txt += "#L0#購買女神#l\t\t#L1#每日領取#l\r\n";
            url = npc.meFlip().askMenu(txt);
            switch (url) {
                case 0:
                    if (money.get(stage, db) < 288) {
                        npc.meFlip().say("抱歉..你沒有 288 星語幣");
                        return;
                    }
                    if (snum >= 3) {
                        npc.meFlip().say("已經永久道具了 不可以繼續購買了");
                        return;
                    }
                    money.add(stage, db, -288);
                    stage.showScriptProgressMsg("扣除星語幣 288");
                    switch (parseInt(snum)) {
                        case 0:
                            Equip = util.makeItem(3700663, 1);
                            Equip['expireDate'] = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
                            stage.gainItem(Equip);
                            break;
                        case 1:
                            judge = false;
                            for (i = 1; i <= 128; i++) {
                                Equip = stage.getItemBySlot(3, i);
                                if (Equip == null) continue;
                                if (Equip['itemId'] != 3700663) continue;
                                Equip['expireDate'] += 30 * 24 * 60 * 60 * 1000;
                                stage.updateItemBySlot(3, i);
                                judge = true;
                                break;
                            }
                            if (!judge) {
                                Equip = util.makeItem(3700663, 1);
                                Equip['expireDate'] = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
                                stage.gainItem(Equip);
                            }
                            break;
                        case 2:
                            stage.removeItemAll(3700663);
                            stage.gainItem(3700663, 1);
                            break;
                    }
                    snum += 1;
                    stage.updateQuestRecordExShare(10000 + sel, "snum", String(snum));
                    count += 30;
                    stage.updateQuestRecordExShare(10000 + sel, "count", String(count));
                    stage.gainItem(2048761, 15);
                    stage.modifyCurrency(2, 10000);
                    stage.showProgressMessageFont("楓點 x 10000", 5, 20, 23, 0)
                    npc.meFlip().say("購買成功");
                    break;
                case 1:
                    if (count <= 0) {
                        npc.meFlip().say("抱歉..你當前沒有剩餘的領取次數了");
                        return;
                    }
                    if (!stage.hasItem(3700663, 1)) {
                        npc.meFlip().say("抱歉..你沒有女神的祝福不能領獎");
                        return;
                    }
                    txt = "每日領取獎勵\r\n\r\n";
                    if (player.getEventValue(stage, db, "黃金女神禮包") > 0) {
                        npc.meFlip().say("今日領過了");
                        return;
                    }
                    player.addEventValue(stage, db, "黃金女神禮包");
                    stage.modifyCurrency(2, 1288);
                    stage.gainItem(5062507, 20);
                    stage.gainItem(5062031, 20);
                    stage.gainItem(5062512, 20);
                    count -= 1;
                    stage.updateQuestRecordExShare(10000 + sel, "count", String(count));
                    stage.showProgressMessageFont("楓點 x 1288", 5, 20, 23, 0)
                    npc.say("領取成功");
                    break;
            }
            break;

        case 1:
            txt = "#r白金女神祝福\t#b588 #d星語幣 ( 已購 #r" + snum + "#d 回 )\r\n";
            if (count > 0) {
                txt += "#d當前可領 #r" + count + " #d次\r\n";
            }
            txt += "#d購買立即給與 #b30000#d 楓點\r\n";
            txt += "#d#i2048761:# x 30\r\n";
            txt += "#d#i3700662:# ( 稱號使用 30天 購買 #r3#d 回變為永久 )\r\n";
            txt += "#d每日可領 #i5062507# #i 5062031 # #i5062512# x 40 與 #r2666#d 楓點\r\n";
            txt += "\r\n";
            txt += "#L0#購買女神#l\t\t#L1#每日領取#l\r\n";
            url = npc.meFlip().askMenu(txt);
            switch (url) {
                case 0:
                    if (money.get(stage, db) < 588) {
                        npc.meFlip().say("抱歉..你沒有 588 星語幣");
                        return;
                    }
                    if (snum >= 3) {
                        npc.meFlip().say("已經永久道具了 不可以繼續購買了");
                        return;
                    }
                    money.add(stage, db, -588);
                    stage.showScriptProgressMsg("扣除星語幣 588");
                    switch (parseInt(snum)) {
                        case 0:
                            Equip = util.makeItem(3700662, 1);
                            Equip['expireDate'] = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
                            stage.gainItem(Equip);
                            break;
                        case 1:
                            judge = false;
                            for (i = 1; i <= 128; i++) {
                                Equip = stage.getItemBySlot(3, i);
                                if (Equip == null) continue;
                                if (Equip['itemId'] != 3700662) continue;
                                Equip['expireDate'] += 30 * 24 * 60 * 60 * 1000;
                                stage.updateItemBySlot(3, i);
                                judge = true;
                                break;
                            }
                            if (!judge) {
                                Equip = util.makeItem(3700662, 1);
                                Equip['expireDate'] = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
                                stage.gainItem(Equip);
                            }
                            break;
                        case 2:
                            stage.removeItemAll(3700662);
                            stage.gainItem(3700662, 1);
                            break;
                    }
                    snum += 1;
                    stage.updateQuestRecordExShare(10000 + sel, "snum", String(snum));
                    count += 30;
                    stage.updateQuestRecordExShare(10000 + sel, "count", String(count));
                    stage.gainItem(2048761, 30);
                    stage.modifyCurrency(2, 30000);
                    stage.showProgressMessageFont("楓點 x 30000", 5, 20, 23, 0)
                    npc.meFlip().say("購買成功");
                    break;
                case 1:
                    if (count <= 0) {
                        npc.meFlip().say("抱歉..你當前沒有剩餘的領取次數了");
                        return;
                    }
                    if (!stage.hasItem(3700662, 1)) {
                        npc.meFlip().say("抱歉..你沒有女神的祝福不能領獎");
                        return;
                    }
                    txt = "每日領取獎勵\r\n\r\n";
                    if (player.getEventValue(stage, db, "白金女神禮包") > 0) {
                        npc.meFlip().say("今日領過了");
                        return;
                    }
                    player.addEventValue(stage, db, "白金女神禮包");
                    stage.modifyCurrency(2, 2666);
                    stage.gainItem(5062507, 40);
                    stage.gainItem(5062031, 40);
                    stage.gainItem(5062512, 40);
                    count -= 1;
                    stage.updateQuestRecordExShare(10000 + sel, "count", String(count));
                    stage.showProgressMessageFont("楓點 x 2666", 5, 20, 23, 0)
                    npc.say("領取成功");
                    break;
            }
            break;

        case 2:
            txt = "#r鑽石女神祝福\t#b888 #d星語幣 ( 已購 #r" + snum + "#d 回 )\r\n";
            if (count > 0) {
                txt += "#d當前可領 #r" + count + " #d次\r\n";
            }
            txt += "#d購買立即給與 #b50000#d 楓點\r\n";
            txt += "#d#i2048761:# x 46\r\n";
            txt += "#d#i3700661:# ( 稱號使用 30天 購買 #r3#d 回變為永久 )\r\n";
            txt += "#d每日可領 #i5062507# #i 5062031 # #i5062512# x 66 與 #r3888#d 楓點\r\n";
            txt += "\r\n";
            txt += "#L0#購買女神#l\t\t#L1#每日領取#l\r\n";
            url = npc.meFlip().askMenu(txt);
            switch (url) {
                case 0:
                    if (money.get(stage, db) < 888) {
                        npc.meFlip().say("抱歉..你沒有 888 星語幣");
                        return;
                    }
                    if (snum >= 3) {
                        npc.meFlip().say("已經永久道具了 不可以繼續購買了");
                        return;
                    }
                    money.add(stage, db, -888);
                    stage.showScriptProgressMsg("扣除星語幣 888");
                    switch (parseInt(snum)) {
                        case 0:
                            Equip = util.makeItem(3700661, 1);
                            Equip['expireDate'] = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
                            stage.gainItem(Equip);
                            break;
                        case 1:
                            judge = false;
                            for (i = 1; i <= 128; i++) {
                                Equip = stage.getItemBySlot(3, i);
                                if (Equip == null) continue;
                                if (Equip['itemId'] != 3700661) continue;
                                Equip['expireDate'] += 30 * 24 * 60 * 60 * 1000;
                                stage.updateItemBySlot(3, i);
                                judge = true;
                                break;
                            }
                            if (!judge) {
                                Equip = util.makeItem(3700661, 1);
                                Equip['expireDate'] = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
                                stage.gainItem(Equip);
                            }
                            break;
                        case 2:
                            stage.removeItemAll(3700661);
                            stage.gainItem(3700661, 1);
                            break;
                    }
                    snum += 1;
                    stage.updateQuestRecordExShare(10000 + sel, "snum", String(snum));
                    count += 30;
                    stage.updateQuestRecordExShare(10000 + sel, "count", String(count));
                    stage.gainItem(2048761, 46);
                    stage.modifyCurrency(2, 50000);
                    stage.showProgressMessageFont("楓點 x 50000", 5, 20, 23, 0)
                    npc.meFlip().say("購買成功");
                    break;
                case 1:
                    if (count <= 0) {
                        npc.meFlip().say("抱歉..你當前沒有剩餘的領取次數了");
                        return;
                    }
                    if (!stage.hasItem(3700661, 1)) {
                        npc.meFlip().say("抱歉..你沒有女神的祝福不能領獎");
                        return;
                    }
                    txt = "每日領取獎勵\r\n\r\n";
                    if (player.getEventValue(stage, db, "鑽石女神禮包") > 0) {
                        npc.meFlip().say("今日領過了");
                        return;
                    }
                    player.addEventValue(stage, db, "鑽石女神禮包");
                    stage.modifyCurrency(2, 3888);
                    stage.gainItem(5062507, 66);
                    stage.gainItem(5062031, 66);
                    stage.gainItem(5062512, 66);
                    count -= 1;
                    stage.updateQuestRecordExShare(10000 + sel, "count", String(count));
                    stage.showProgressMessageFont("楓點 x 3888", 5, 20, 23, 0)
                    npc.say("領取成功");
                    break;
            }
            break;
    }
}

module.exports = {
    execute: execute
};
