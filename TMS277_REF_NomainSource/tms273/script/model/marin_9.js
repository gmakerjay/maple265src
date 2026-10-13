/* 50009219 腳本訂製 技術顧問 */
player = require("check_log");
marin = exports;
marin.showinfo = function (npc, stage, db, util) {
    var txt = "\r\n";
    txt += "　#L0#楓點商店#l\t\t#L1#樂豆商店#l\r\n\r\n";
    txt += "　#L2#特殊商店#l\t\t#L3#代幣商店#l\r\n";
    sel = npc.meFlip().askMenu(txt);

    var txt = "商店中心\r\n\r\n";
    switch (sel) {
        case 0:
            var article = [
                [2434892, 0, false],
                [5520002, 100, false],
                [5044005, 100, 30],
                [2049762, 200, false],
                [2049782, 300, false],
                [2048307, 50, false],
                [2644110, 2000, false],
                [2049506, 50, false],
                [2048212, 50, false],
                [2049122, 50, false],
                [2049025, 100, false],
                [2040727, 200, false],
                [2500000, 200, false],
                [2501000, 200, false],
                [2643129, 30, false],
                [2590028, 100, false],
                [2435516, 1000, false],
                [2435122, 100, false],
                [2631100, 100, false],
                [2432845, 5000, false],
                [2634320, 5000, false],
                [2631139, 5000, false],
                [1802653, 5000, false],
                [2892000, 200, false],
                [2350006, 500, false],
                [2350004, 500, false],
                [2350005, 500, false],
                [2350007, 500, false],
                [1662002, 200, false],
                [1662003, 200, false],
                [5700000, 100, false]
            ]
            txt += "當前擁有楓點：#r" + stage.getCurrency(2) + "#k\r\n";
            for (var i in article) {
                txt += "#d#L" + i + "##i" + article[i][0] + "##z" + article[i][0] + "# #r" + article[i][1] + "#d 楓點#l\r\n";
            }
            url_0 = npc.meFlip().askMenu(txt);

            var txt = "\r\n";
            txt += "請輸入想購買的數量,單次購買上限 3000個\r\n";
            txt += "購買時請注意自身背包是否有多餘的空位\r\n";
            txt += "#r（月光水晶鑰匙)單次只能購買1個\r\n";
            txt += "\r\n";
            txt += "#k購買#i" + article[url_0][0] + "# 一個需要 #r" + article[url_0][1] + " #k楓點\r\n";
            num = npc.minNum(1).maxNum(3000).defNum(1).askNumber(txt);

            sum = article[url_0][1] * num;
            if (stage.getCurrency(2) < sum) {
                npc.meFlip().say("抱歉..你沒有 " + sum + " 楓點");
                return;
            }

            var txt = "\r\n";
            txt += "你想購買 " + num + " 個 #i" + article[url_0][0] + "# 嗎\r\n\r\n";
            txt += "共消耗楓點 #r" + sum + " #k點\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            stage.modifyCurrency(2, -sum);
            var Equip = util.makeItem(article[url_0][0], num);
            if (article[url_0][2]) {
                Equip['expireDate'] = new Date().getTime() + article[url_0][2] * 60 * 60 * 24 * 1000;
            }
            stage.gainItem(Equip);
            npc.meFlip().say("購買成功");
            break;

        case 1:
            var article = [
                [1114402, 5000],
                [1190301, 50],
                [5520003, 120],
                [2437563, 500],
                [1190302, 5000],
                [1032261, 5000],
                [1033000, 5000],
                [1113220, 3500],
                [1114401, 2000],
                [1122334, 2000],
                [1114400, 5000],
                [1112918, 5000]
            ]
            txt += "當前擁有樂豆：#r" + stage.getCurrency(1) + "#k\r\n";
            for (var i in article) {
                txt += "#d#L" + i + "##i" + article[i][0] + "##z" + article[i][0] + "# #r" + article[i][1] + "#d 樂豆#l\r\n";
            }
            url_1 = npc.meFlip().askMenu(txt);

            var txt = "\r\n";
            txt += "請輸入想購買的數量,單次購買上限 3000個\r\n";
            txt += "購買時請注意自身背包是否有多餘的空位\r\n";
            txt += "\r\n";
            txt += "購買#i" + article[url_1][0] + "# 一個需要 #r" + article[url_1][1] + " #k樂豆\r\n";
            num = npc.minNum(1).maxNum(1).defNum(1).askNumber(txt);

            sum = article[url_1][1] * num;
            if (stage.getCurrency(1) < sum) {
                npc.meFlip().say("抱歉..你沒有 " + sum + " 樂豆");
                return;
            }

            var txt = "\r\n";
            txt += "你想購買 " + num + " 個 #i" + article[url_1][0] + "# 嗎\r\n\r\n";
            txt += "共消耗樂豆 #r" + sum + " #k點\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            stage.modifyCurrency(1, -sum);
            var Equip = util.makeItem(article[url_1][0], num);
            stage.gainItem(Equip);
            npc.meFlip().say("購買成功");
            break;

        case 2:
            var article = [
                [5121072, 20, false],
                [5121057, 30, false],
                [5121073, 30, false],
                [5121048, 40, false],
                [5121075, 50, false],
                [5210000, 500, 7],
                [5360015, 500, 7],
                [2470000, 190, false],
                [5062020, 80, false],
                [5062019, 60, false],
                [5062021, 99, false],
                [5062026, 120, false],
                [5062507, 70, false],
                [5062031, 75, false],
                [5743003, 30, false],
                [5537000, 30, false],
                [5520000, 30, false],
                [5062400, 50, false],
                [5062402, 50, false],
                [2436907, 500, false],
                [5152301, 250, false]
            ]
            txt += "當前擁有楓點：#r" + stage.getCurrency(2) + "#k\r\n";
            for (var i in article) {
                txt += "#d#L" + i + "##i" + article[i][0] + "##z" + article[i][0] + "# #r" + article[i][1] + "#d 楓點#l\r\n";
            }
            url_2 = npc.meFlip().askMenu(txt);

            var txt = "\r\n";
            txt += "請輸入想購買的數量,單次購買上限 3000個\r\n";
            txt += "購買時請注意自身背包是否有多餘的空位\r\n";
            txt += "\r\n";
            txt += "購買#i" + article[url_2][0] + "# 一個需要 #r" + article[url_2][1] + " #k楓點\r\n";
            num = npc.minNum(1).maxNum(3000).defNum(1).askNumber(txt);

            sum = article[url_2][1] * num;
            if (stage.getCurrency(2) < sum) {
                npc.meFlip().say("抱歉..你沒有 " + sum + " 楓點");
                return;
            }

            var txt = "\r\n";
            txt += "你想購買 " + num + " 個 #i" + article[url_2][0] + "# 嗎\r\n\r\n";
            txt += "共消耗楓點 #r" + sum + " #k點\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            stage.modifyCurrency(2, -sum);
            var Equip = util.makeItem(article[url_2][0], num);
            if (article[url_2][2]) {
                Equip['expireDate'] = new Date().getTime() + article[url_2][2] * 60 * 60 * 24 * 1000;
            }
            stage.gainItem(Equip);
            npc.meFlip().say("購買成功");
            break;

        case 3:
            var article = [
                [1005823, 1, 4036518, 100],
                [1005952, 1, 4036518, 100],
                [1006014, 1, 4036518, 100],
                [1006025, 1, 4036518, 100],
                [1006026, 1, 4036518, 100],
                [1073554, 1, 4036518, 100],
                [1073616, 1, 4036518, 100],
                [1073651, 1, 4036518, 100],
                [1073652, 1, 4036518, 100],
                [1073653, 1, 4036518, 100],
                [1082754, 1, 4036518, 100],
                [1082759, 1, 4036518, 100],
                [1082766, 1, 4036518, 100],
                [1082767, 1, 4036518, 100],
                [1082768, 1, 4036518, 100],
                [1103352, 1, 4036518, 100],
                [1103418, 1, 4036518, 100],
                [1103465, 1, 4036518, 100],
                [1103466, 1, 4036518, 100],
                [1103467, 1, 4036518, 100],
                [1152209, 1, 4036518, 100],
                [1152211, 1, 4036518, 100],
                [1152217, 1, 4036518, 100],
                [1152218, 1, 4036518, 100],
                [1152219, 1, 4036518, 100],
                [2612019, 10, 4036518, 10],
                [2049372, 1, 4036518, 5],
                [2049371, 1, 4036518, 10],
                [2049762, 1, 4036518, 10],
                [5062019, 10, 4036518, 15],
                [5062507, 10, 4036518, 20],
                [5537000, 10, 4036518, 10],
                [5743003, 10, 4036518, 10]
            ]
            for (var i in article) {
                txt += "#L" + i + "#購買#i" + article[i][0] + ":# x " + article[i][1] + " 個 需 #i" + article[i][2] + "# x " + article[i][3] + " 個#l\r\n";
            }
            url_3 = npc.meFlip().askMenu(txt);

            var txt = "\r\n";
            txt += "擁有代幣：" + stage.getItemQuantity(article[url_3][2]) + "\r\n";
            txt += "請輸入購買數量\r\n";
            num = npc.minNum(1).maxNum(10).defNum(1).askNumber(txt);

            if (!stage.hasItem(article[url_3][2], num * article[url_3][3])) {
                npc.meFlip().say("抱歉..你沒有那麼多代幣");
                return;
            }

            var sum = num * article[url_3][3];
            if (player.getPQLog(stage, db, "S_key_代幣_" + url_3) >= 10) {
                npc.meFlip().say("抱歉..當前類型只允許 10 回");
                return;
            }

            while (sum > 10000) {
                sum -= 10000;
                stage.loseItem(article[url_3][2], 10000);
            }
            stage.loseItem(article[url_3][2], sum);
            stage.gainItem(article[url_3][0], article[url_3][1] * num);
            player.addPQLog(stage, db, "S_key_代幣_" + url_3, num, -1);
            npc.meFlip().say("購買成功");
            break;
    }
}