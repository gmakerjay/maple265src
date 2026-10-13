money = require("marin_7");

execute();

function execute() {
    let txt = "週年限定禮包\r\n\r\n";
    txt += "當前星語幣：#r" + money.get(stage, db) + "#k\r\n\r\n";
    txt += "#L0#2 星語幣 購買#i" + 5060048 + "##l\r\n";
    txt += "#L1#塔戒禮包 ( 198 星語幣 )#l\r\n";
    txt += "#L2#救世主卷軸禮包 ( 588星語幣 )#l\r\n";
    let sel = npc.me().askMenu(txt);

    txt = "\r\n";
    switch (sel) {
        case 0:
            txt += "請輸入你想購買多少個 #i" + 5060048 + "#\r\n\r\n";
            txt += "當前最高購買數量 " + parseInt(money.get(stage, db) / 2) + " 個\r\n";
            txt += "\r\n\r\n ";
            let num = npc.me().minNum(1).maxNum(parseInt(money.get(stage, db) / 2)).defNum(1).askNumber(txt);

            if (money.get(stage, db) < num * 2) {
                npc.meFlip().say("抱歉..你沒有那麼多星語幣");
                return;
            }
            money.add(stage, db, -num * 2);
            let count = num;
            while (count > 20000) {
                stage.gainItem(5060048, 20000);
                count -= 20000;
            }
            stage.gainItem(5060048, count);
            npc.meFlip().say("購買成功~");
            break;

        case 1:
            npc.meFlip().next().say("要消耗 198 星語幣來購買塔戒禮包嗎 ?\r\n\r\n#i2433841# #z2433841# (#b開啟後隨機獲得一種4級塔戒#k)\r\n");
            if (money.get(stage, db) < 198) {
                npc.meFlip().say("抱歉..你沒有那麼多星語幣");
                return;
            }
            money.add(stage, db, -198);
            stage.gainItem(2433841, 1);
            npc.meFlip().say("購買成功");
            execute();
            break;
        case 2:
            npc.meFlip().next().say("要消耗 588 星語幣來購買塔戒禮包嗎 ?\r\n\r\n#i2430755# #z2430755#\r\n#b自選救世主卷軸#i2612099:# x 10\r\n");
            if (money.get(stage, db) < 588) {
                npc.meFlip().say("抱歉..你沒有那麼多星語幣");
                return;
            }
            money.add(stage, db, -588);
            stage.gainItem(2430755, 10);
            npc.meFlip().say("購買成功");
            execute();
            break;
    }
}