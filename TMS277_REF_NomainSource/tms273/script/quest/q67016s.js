// Created by MetaMS
// Quest ID:67016
// [星夜馬戲團] 盧公的動態視力修煉場體驗

let dStr = util.getStringDate("yyMMdd");
if (!dStr.equals(stage.getQuestRecordEx(504629, "date"))) {
        stage.updateQuestRecordEx(504629, "date", dStr);
        stage.updateQuestRecordEx(504629, "clear", "0");
}

let loop = true;
while (loop) {
        let askStr = "你來使用<盧公的動態視力修煉場>嗎？！\r\n只要專注於修煉，並不容易變強。把所有的心意都聚集起來修煉，再修煉吧。#n！\r\n#L0##b <盧公的動態視力修煉場>營運期間#k#l\r\n#L1##b <盧公的動態視力修煉場>使用方法#k#l\r\n#L2##b <盧公的動態視力修煉場獎勵#k\r\n\r\n#L3##r進入<盧公的動態視力修煉場>！#k#l\r\n";
        if ("1".equals(stage.getQuestRecordEx(504629, "R"))) {
                askStr += "#L4##b <盧公的動態視力修煉場>領取獎勵#k#l\r\n";
        }
        let selection = npc.id(9401993).askMenu(askStr + "\r\n#L999# 沒有其他疑問了。#l");
        switch (selection) {
                case 0:
                        npc.id(9401993).next().say("你好奇<盧公的動態視力修煉場>的營運期間嗎？\r\n同體視力修煉場只營運到#r2024年11月26日23時59分#k。\r\n#b一天只能進行一次#k修煉，別錯過囉，參加修煉吧。");
                        break;
                case 1:
                        npc.id(9401993).next().say("#b#h0##k！\r\n好奇<盧公的動態視力修煉場>的使用方法嗎？\r\n");
                        npc.id(9401993).next().say("#b<盧公的動態視力修煉場>使用方法！#k\r\n\r\n#e[參加條件]#n\r\n#b每日幻想硬幣全部獲得#k後，#b一天一次#k可修煉。\r\n\r\n#e[盧公的動態視力修煉場說明]#n\r\n1.動態視力修煉場分為#b10個關卡#k。\r\n(因為要訓練動態視力，所以關卡非常快速。)\r\n\r\n2.每關卡提供的仙桃種子為#b五顆#k。\r\n(關卡限制時間#b短#k，必須迅速命中#r猴王目標#k。)\r\n\r\n3.修煉開始後，會出現正面#b15個目標#k，在限制時間#r5秒#k內，從出現的#b目標中找出#r蟠猴#k，並使用蘋果人來擊敗牠獲得分數。\r\n\r\n4.#r15個#k的目標中，蟠猴#b3～5#k隻會隨機出現。\r\n\r\n#e[蟠猴目標種類]#n\r\n\r\n#b#i3801914# #i3801915# #i3801916# #i3801917# #k\r\n\r\n#r(如果不命中上方的蟠猴目標，將無法獲得分數。)#k\r\n\r\n這樣的說明足夠了嗎？如果有不瞭解的地方，隨時來找我吧。\r\n從今天開始，每天#b修煉結束#k後來找我，一定要領取#r獎勵#k！\r\n");
                        break;
                case 2:
                        npc.id(9401993).next().say("看來你很好奇<盧公的動態視力修煉場>的獎勵。\r\n獎勵分為只要#b參加#k修煉就能獲得的#r基本獎勵#k和\r\n根據你的#b實力#k能獲得的#r額外獎勵#k。");
                        npc.id(9401993).next().say("這是動態視力修煉的獎勵！\r\n\r\n#e[基本獎勵]#n\r\n\r\n#b#i2638170:##t2638170:##k\r\n\r\n#e[追加獎勵]#n\r\n#b處理蟠猴1～15隻#b#i2638170:#1個\r\n處理蟠猴15～29隻#i2638170:#2個\r\n處理蟠猴30～35隻#i2638170:#3個\r\n處理蟠猴36～39隻#i2638170:#4個\r\n處理蟠猴40隻#i2638170:#5個#k\r\n\r\n滿意獎勵嗎？\r\n通過修煉成長的話，一定要教訓#b武陵桃園仙桃#k小偷#r蟠猴#k們！");
                        break;
                case 3:
                        loop = false;
                        if ("1".equals(stage.getQuestRecordEx(504629, "R"))) {
                                npc.id(9401993).say("好像還有尚未領取的獎勵！請先領取獎勵再來找我！");
                        } else if ("1".equals(stage.getQuestRecordEx(504629, "clear"))) {
                                npc.id(9401993).say("<盧公的動態視力修煉場>一天只能入場一次。如果想再修煉，請明天再來！");
                        } else if (ctx.makeEvent("event_annual_shooting", false, stage) == null) {
                                npc.me().say("#e#r發生錯誤，請聯系管理員！");
                                stage.changeMap(867168300, 0);
                        }
                        break;
                case 4:
                        loop = false;
                        if (!"1".equals(stage.getQuestRecordEx(504629, "R"))) {
                                npc.id(9401993).noEsc().next().say("你的操作行為已經被記錄，再次發現，將嚴懲！");
                        } else if (npc.askAccept("根據在<動態視力修煉場>的努力修煉結果，會發放獎勵！\r\n要現在領取<動態視力修煉場>修煉獎勵嗎？")) {
                                let reward = 2000005;//default : 2638170
                                let kill = stage.getIntQuestRecordEx(504629, "kill");
                                let sSay = "你做的很好！\r\n你成功命中了 ";
                                let plus = 0;
                                if (kill <= 0) {
                                        plus = 0;
                                } else if (kill <= 15) {
                                        sSay = "你的動態視力似乎有問題。\r\n只瞄準了 ";
                                        plus = 1;
                                } else if (kill <= 29) {
                                        plus = 2;
                                } else if (kill <= 35) {
                                        plus = 3;
                                } else if (kill <= 39) {
                                        plus = 4;
                                } else if (kill >= 40) {
                                        plus = 5;
                                }
                                /* Response is Yes */
                                if (stage.gainItem(reward, 1 + plus)) {
                                        /* Update Quest RecordEx | Id:504629 | Name: Unknown | Data: "date=241113;enter=0;R=1;clear=1;kill=15" */
                                        //stage.updateQuestRecordEx(504629, "date=241113;enter=0;R=1;clear=1;kill=15");
                                        /* Update Quest RecordEx | Id:504629 | Name: Unknown | Data: "date=241113;enter=0;R=0;clear=1;kill=15" */
                                        //stage.updateQuestRecordEx(504629, "date=241113;enter=0;R=0;clear=1;kill=15");
                                        stage.updateQuestRecordEx(504629, "R", "0");
                                        npc.id(9401993).noEsc().next().say(sSay + kill + "隻的蟠猴。\r\n再怎麼樣參與總是有意義的，所以作為基本獎勵給你#i" + reward + ":# 1個，額外獎勵#i" + reward + ":# " + plus + "個。");
                                } else {
                                        npc.id(9401993).say("背包欄位不足，請清理。");
                                }
                        } else {
                                /* Response is No */
                                npc.id(9401993).noEsc().next().say("為什麼不領取獎勵？請重新找我對話吧。");
                        }
                        break;
                case 999:
                        loop = false;
                        break;
        }
}