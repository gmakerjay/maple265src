let log = require('check_log');
money = require("marin_7");
start();

function start() {
    let txt = "\t\t\t　#i2022034# #b喜迎端午佳節 #i2022034#\r\n";
    txt += "#dtest谷端午活動大酬賓!!準備好參與端午活動了嗎?\r\n";
    txt += "擊殺真實地圖內的怪物 贏 #b#i2433891#\r\n";
    txt += "#d每日貢獻 #r10#d 個禮盒可獲得每日獎勵 ( 每日50個額外獎勵 )\r\n";
    txt += "擁有禮盒 [ #r" + stage.getItemQuantity(2433891) + " #d] 當日上繳 [ #r" + log.getEventValue(stage, db, "當日_端午數量") + "#d ]　累計 [ #r" + log.getEventValue(stage, db, "累計_端午數量") + "#d ]\r\n";
    txt += "\r\n";
    txt += "#L0#上繳物品#l\r\n";
    txt += "#L1#領每日禮盒獎勵#l\r\n";
    txt += "#L2#領每日額外獎勵#l\r\n";
    txt += "#L3#領累計獎勵#l\r\n";
    txt += "#r#L4#端午禮包#l\r\n";
    let sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            txt = "#d當前擁有禮盒數量 #r" + stage.getItemQuantity(2433891) + "\r\n";
            txt += "#d當日已上繳數量 #r" + log.getEventValue(stage, db, "當日_端午數量") + "\r\n";
            txt += "\r\n";
            txt += "是否立即上繳背包內的所有禮盒?\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            let count = stage.getItemQuantity(2433891);
            log.addEventValue(stage, db, "當日_端午數量", count, 1);
            log.addEventValue(stage, db, "累計_端午數量", count, -1);
            while (count > 20000) {
                stage.loseItem(2433891, 20000);
                count -= 20000;
            }
            stage.loseItem(2433891, count);
            npc.meFlip().say("上繳完成~");
            break;

        case 1:
            if (log.getEventValue(stage, db, "端午_日_效驗") > 0) {
                npc.meFlip().say("抱歉..今日領過了");
                return;
            }
            var marin = [
                [2430402, 10],
                [5062026, 10],
                [5062507, 10],
                [2636421, 2],
                [4009548, 10],
                [2433970, 1]
            ]
            txt = "每日獎勵如下列所示\r\n";
            for (let i in marin) {
                txt += "#i" + marin[i][0] + "# x " + marin[i][1] + " ";
            }
            txt += "\r\n";
            txt += "\t\t#r是否立即領每日獎勵?( 需每日上繳 10 個 )\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            count = parseInt(log.getEventValue(stage, db, "當日_端午數量"));
            if (count < 10) {
                npc.meFlip().say("抱歉..今日沒有上繳 10 個");
                return;
            }
            for (let i in marin) {
                stage.gainItem(marin[i][0], marin[i][1]);
            }
            log.addEventValue(stage, db, "端午_日_效驗");
            npc.meFlip().say("恭喜!!每日獎勵領取成功!");
            break;

        case 2:
            if (log.getEventValue(stage, db, "端午_額_效驗") > 0) {
                npc.meFlip().say("抱歉..今日領過了");
                return;
            }
            var marin = [
                [2430402, 20],
                [5062026, 20],
                [5062507, 20],
                [2636421, 10],
                [4009548, 50],
                [2433971, 1]
            ]
            txt = "每日額外獎勵如下列所示\r\n";
            for (let i in marin) {
                txt += "#i" + marin[i][0] + "# x " + marin[i][1] + " ";
            }
            txt += "\r\n";
            txt += "\t\t#r是否立即領每日獎勵?( 需每日上繳 50 個 )\r\n";
            if (npc.meFlip().askYesNo(txt) != 1) return;

            count = parseInt(log.getEventValue(stage, db, "當日_端午數量"));
            if (count < 50) {
                npc.meFlip().say("抱歉..今日沒有上繳 50 個");
                return;
            }
            for (let i in marin) {
                stage.gainItem(marin[i][0], marin[i][1]);
            }
            log.addEventValue(stage, db, "端午_額_效驗");
            npc.meFlip().say("恭喜!!每日額外獎勵領取成功!");
            break;

        case 3:
            var marin = [
                [200, 2430402, 30],
                [400, 5743003, 60],
                [600, 2472001, 30],
                [800, 5062031, 60],
                [1000, 2433971, 2],
                [1500, 5062512, 60],
                [2000, 2616216, 3]
            ]
            txt = "累計獎勵\r\n";
            for (let i in marin) {
                txt += "#L" + i + "##d累計獲得 " + marin[i][0] + " 獲得 #i" + marin[i][1] + "# x " + marin[i][2] + " ( " + (log.getEventValue(stage, db, "計_端午_" + marin[i][0]) > 0 ? "#b已領" : "#r未領") + " )#l\r\n";
            }
            url = npc.meFlip().askMenu(txt);

            count = parseInt(log.getEventValue(stage, db, "累計_端午數量"));
            if (count < marin[url][0]) {
                npc.meFlip().say("抱歉..你沒有累計上繳 " + marin[url][0] + " 個禮盒");
                return;
            }
            if (log.getEventValue(stage, db, "計_端午_" + marin[url][0]) > 0) {
                npc.meFlip().say("抱歉..當前項目領過了");
                return;
            }
            stage.gainItem(marin[url][1], marin[url][2]);
            log.addEventValue(stage, db, "計_端午_" + marin[url][0], 1, -1);
            npc.meFlip().say("領取成功~");
            break;

        case 4:
            bute = [
                [5062026, 66],
                [5062507, 66],
                [5062031, 66],
                [5062512, 66],
                [2636421, 66],
                [4009548, 660],
                [2472001, 66],
                [2049389, 1],
                [2644008, 1]
            ]
            txt = "\r\n";
            txt += "限時禮包!!!只需 #r108 #k即可領回家!\r\n";
            for (let i in bute) {
                txt += "#i" + bute[i][0] + "#x" + bute[i][1]
            }
            txt += "\r\n";
            if (npc.meFlip().askYesNo(txt) == 1) {
                if (money.get(stage, db) < 108) {
                    npc.meFlip().say("抱歉..你沒有 108 星語幣");
                    return;
                }
                money.add(stage, db, -108);
                for (let i in bute) {
                    stage.gainItem(bute[i][0], bute[i][1]);
                }
                npc.meFlip().say("恭喜!!購買成功!");
            }
            break;

        default:
            npc.meFlip().say("暫時沒有獎勵數組");
            break;
    }
}