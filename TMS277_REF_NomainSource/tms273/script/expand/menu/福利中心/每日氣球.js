/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

let {設置賽季經驗} = require('constant/賽季信息');
let log = require('check_log');
let xiaoxingxing = "#fEffect/CharacterEff/1073453/0/0#";
let xing = "#fEffect/CharacterEff/moveRandomSprayEff/quiverCartridge/effect/2/2#";
let 吹氣次數 = 5;
let 最大挑戰次數 = 3;
let 獎勵達標 = 90;

每日氣球()

function 每日氣球() {
    最大挑戰次數 = 3 + parseInt(log.getEventValue(stage, db, "每日氣球購買次數"));
    var sb = "#d\t\t\t\t" + xiaoxingxing + "每日氣球" + xiaoxingxing + "#l\r\n";
    sb += "\"氣球大挑戰\"項目正在進行中!\r\n";
    sb += "今日挑戰次數:#r" + log.getEventValue(stage, db, "每日氣球") + "/" + 最大挑戰次數 + "#d\r\n";
    sb += "越靠近#r100%#d獎勵越高,#r<" + 獎勵達標 + "#d無法獲得獎勵\r\n"
    sb += "當前在線：#r" + stage.getOnlineTime() + "分鐘#d,在線#r60分鐘#d才能進行挑戰\r\n"
    sb += "當前吹氣次數:#r" + log.getEventValue(stage, db, "吹氣次數") + "/" + 吹氣次數 + "#d次\r\n"
    sb += "當前氣球體積:#r" + log.getEventValue(stage, db, "氣球體積") + "%#d,氣球體積超過#r100%#d時將發生爆炸\r\n"
    sb += "吹氣球會增加#r當前角色突破,氣球正好是100%獎勵翻倍!!但發生爆炸會扣除隨機突破!#d\r\n"
    sb += "#L1#1次小口吹氣(氣球體積隨機增加#r1-15%#d)#l\r\n"
    sb += "#L2#1次大口吹氣(氣球體積隨機增加#r16-30%#d)#l\r\n"
    sb += "#L3#提前結束吹氣#l\r\n"
    var res = npc.askMenu(sb);
    if (res == 1) {
        吹氣(1, 15)
    } else if (res == 2) {
        吹氣(16, 30)
    } else if (res == 3) {
        提前結束吹氣()
    } else if (res == 4) {
        // 購買次數()
    }

}

function 提前結束吹氣() {
    var yes = npc.askYesNo("當前氣球體積:#r" + log.getEventValue(stage, db, "氣球體積") + "%#d,您是否提前結束吹氣(小於90無獎勵)")
    if (yes == 1) {
        var item1 = stage.getItemBySlot(-1, -11);
        let 獎勵 = log.getEventValue(stage, db, "氣球體積") - 100 + 10;
        if (獎勵 > 0) {
                let 增加的金幣 = 1E6;
            switch (獎勵) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    增加的金幣 = 1E8
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    增加的金幣 = 2E8
                    break;
                case 10:
                    增加的金幣 = 5E8
                    break;
            }
            設置賽季經驗(db, stage, "每日氣球", 5)
            let 氣球體積 = log.getEventValue(stage, db, "氣球體積");
            var notice = "玩家：" + stage.getCharacterName() + " 在每日氣球活動中獲得x" + 獎勵;

            util.broadcastChatMsg(0x16, "[每日氣球]玩家：" + stage.getCharacterName() + " 在每日氣球活動中獲得了 " + 增加的金幣 + " 楓幣!")
            stage.gainMesos(增加的金幣)
            log.addEventValue(stage, db, "吹氣次數", -log.getEventValue(stage, db, "吹氣次數"), 1)
            log.addEventValue(stage, db, "氣球體積", -log.getEventValue(stage, db, "氣球體積"), 1)
            log.addEventValue(stage, db, "每日氣球");
            // log.addEventValue(stage, db, "每日氣球", 1, 1)

            var date = new Date()
            var month = date.getMonth() + 1;
            log.addEventValue(stage, db, "章-" + month + "-exp", 10, -1)
            npc.say("你在本次遊玩中吹出了" + 氣球體積 + "%的氣球!獲得：" + 增加的金幣 + " 楓幣!");

        } else if (log.getEventValue(stage, db, "氣球體積") == 0) {
            npc.say("您都沒有開始吹，怎麼能結束呢");
        } else {
            // log.addEventValue(stage, db, "每日氣球", 1, 1)

            var date = new Date()
            var month = date.getMonth() + 1;
            log.addEventValue(stage, db, "章-" + month + "-exp", 10, -1)
            log.addEventValue(stage, db, "吹氣次數", -log.getEventValue(stage, db, "吹氣次數"), 1)
            log.addEventValue(stage, db, "氣球體積", -log.getEventValue(stage, db, "氣球體積"), 1)
            log.addEventValue(stage, db, "每日氣球");
        }
    }
}

function 吹氣(min, max) {
    if (log.getEventValue(stage, db, "每日氣球") >= 最大挑戰次數) {
        npc.say("今日氣球已經達到上限,明天再來玩吧！");
    } else if (log.getEventValue(stage, db, "吹氣次數") >= 吹氣次數) {
        log.addEventValue(stage, db, "吹氣次數", -log.getEventValue(stage, db, "吹氣次數"), 1)
        log.addEventValue(stage, db, "氣球體積", -log.getEventValue(stage, db, "氣球體積"), 1)
        npc.say("最大吹氣次數:" + 吹氣次數 + "次,您已經用完啦！");
    } else {
        let number = marinrandom(min, max);

        var 氣球體積 = parseInt(log.getEventValue(stage, db, "氣球體積")) + number;
        if (氣球體積 > 100) {
            if (log.getEventValue(stage, db, "每日氣球") < 3) {
                設置賽季經驗(db, stage, "每日氣球", 5)
            }
            log.addEventValue(stage, db, "每日氣球");
            stage.dropMessage(3, "本次增加氣球體積:" + number + ",當前氣球體積：" + 氣球體積 + "%!")
            log.addEventValue(stage, db, "吹氣次數", -log.getEventValue(stage, db, "吹氣次數"), 1)
            log.addEventValue(stage, db, "氣球體積", -log.getEventValue(stage, db, "氣球體積"), 1)
            log.addEventValue(stage, db, "每日氣球", 1, 1)
            util.broadcastChatMsg(0x16, "[每日氣球]玩家：" + stage.getCharacterName() + "  這個笨蛋,將氣球吹炸了！！!")
            npc.say("\"啪\"的一聲響起！在你一通猛吹之後，氣球體積突破了100%，發生了爆炸，真是遺憾！");
        } else if (log.getEventValue(stage, db, "吹氣次數") == 吹氣次數 - 1) {
            if (氣球體積 > 獎勵達標) {
                let 獎勵 = 氣球體積 - 100 + 10;
                let 增加的金幣 = 1E6;
                switch (獎勵) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        增加的金幣 = 1E8
                        break;
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        增加的金幣 = 2E8
                        break;
                    case 10:
                        增加的金幣 = 5E8
                        break;
                }
                // gainItem(4310266, 獎勵);
                stage.dropMessage(3, "本次增加氣球體積:" + number + ",當前氣球體積：" + 氣球體積 + "%!")
                util.broadcastWorldChatMsg(0x16, "[每日氣球]玩家：" + stage.getCharacterName() + " 在每日氣球活動中獲得了 :" + 增加的金幣 + " 楓幣!")
                stage.gainMesos(增加的金幣)
                log.addEventValue(stage, db, "吹氣次數", -log.getEventValue(stage, db, "吹氣次數"), 1)
                log.addEventValue(stage, db, "氣球體積", -log.getEventValue(stage, db, "氣球體積"), 1)
                if (log.getEventValue(stage, db, "每日氣球") < 3) {
                    設置賽季經驗(db, stage, "每日氣球", 5)
                }
                log.addEventValue(stage, db, "每日氣球");
                // log.addEventValue(stage, db, "每日氣球", 1, 1)
                npc.say("你在本次遊玩中吹出了" + 氣球體積 + "%的氣球!獲得：" + 增加的金幣 + " 楓幣!");
            } else {

                stage.dropMessage(3, "本次增加氣球體積:" + number + ",當前氣球體積：" + 氣球體積 + "%!")
                if (log.getEventValue(stage, db, "每日氣球") < 3) {
                    設置賽季經驗(db, stage, "每日氣球", 5)
                }
                log.addEventValue(stage, db, "每日氣球");
                // log.addEventValue(stage, db, "每日氣球", 1, 1)
                log.addEventValue(stage, db, "吹氣次數", -log.getEventValue(stage, db, "吹氣次數"), 1)
                log.addEventValue(stage, db, "氣球體積", -log.getEventValue(stage, db, "氣球體積"), 1)
                npc.say("很遺憾沒有達到獎勵標準,你在本次遊玩中吹出了" + 氣球體積 + "%的氣球!")
            }
        } else {
            log.addEventValue(stage, db, "吹氣次數", 1, 1)
            log.addEventValue(stage, db, "氣球體積", number, 1)
            stage.dropMessage(3, "本次增加氣球體積:" + number + ",當前氣球體積：" + log.getEventValue(stage, db, "氣球體積") + "%!")
        }
        每日氣球()
    }
}

function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}