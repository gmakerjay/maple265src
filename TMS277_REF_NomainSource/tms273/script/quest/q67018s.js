// Created by MetaMS
// Quest ID:67018
// [星夜馬戲團] 神祕運勢抽籤

let dStr = util.getStringDate("yyMMdd");
if (!dStr.equals(stage.getQuestRecordExShare(504631, "lastDate"))) {
        stage.updateQuestRecordExShare(504631, "lastDate", dStr);
        stage.updateQuestRecordExShare(504631, "tplay", "0");
}

let loop = true;
while (loop) {
        let selection = npc.id(9401983).askMenu("要測一下今天的運氣嗎？\r\n\r\n\r\n#L0##b 前往參與<神祕運勢抽籤>活動#k#l\r\n#L1##b 我想了解參與活動的方法。#k#l\r\n#L2##b 我想了解獎勵。#k#l\r\n#L3##b 我想了解活動期間。#k#l\r\n\r\n#L100# 我沒有其他好奇的了。#l");

        switch (selection) {
                case 3:
                        npc.id(9401983).next().say("進行期間到#b2024年 11月 26日 23點 59分#k為止喔～");
                        break;
                case 2:
                        npc.id(9401983).next().say("想知道在#b<神祕運勢抽籤>#k活動中會收到什麼禮物嗎？");
                        npc.id(9401983).next().say("準備了以下禮物！\r\n\r\n#b<神祕運勢抽籤> 活動獎勵#k\r\n#fc0xFFcb32cd##e<大吉>#n\r\n#i2644302:# #t2644302:# 1個 (0.002%)\r\n#i2644075:# #t2644075:# 1個 (0.004%)\r\n#i2644103:# #t2644103:# 1個 (0.494%)\r\n#i2636222:# #t2636222:# 10個 (1.5%)\r\n#i2048766:# #t2048766:# 30個 (3%)\r\n#i2711021:# #t2711021:# 30個 (5%)\r\n#i2634437:# #t2634437:# 100個 (5%)\r\n\r\n#fc0xFF2d5be6##e<中吉>#n\r\n#i2048766:# #t2048766:# 5個 (3%)\r\n#i2711021:# #t2711021:# 20個 (3%)\r\n#i2049793:# #t2049793:# 1個 (3%)\r\n#i2711023:# #t2711023:# 30個 (3%)\r\n#i2711023:# #t2711023:# 20個 (3%)\r\n#i2632290:# #t2632290:# 3個 (3.5%)\r\n#i2632290:# #t2632290:# 2個 (4%)\r\n#i2048759:# #t2048759:# 30個 (4%)\r\n#i2048758:# #t2048758:# 10個 (4%)\r\n#i2028333:# #t2028333:# 30個 (5%)\r\n#i2634437:# #t2634437:# 50個 (5%)\r\n#i2439869:# #t2439869:# 20個 (5.5%)\r\n\r\n#fc0xFF00b83d##e<小吉>#n\r\n#i2711023:# #t2711023:# 15個 (3.5%)\r\n#i2048759:# #t2048759:# 10個 (4.5%)\r\n#i2028333:# #t2028333:# 10個 (5%)\r\n#i2439869:# #t2439869:# 10個 (7%)\r\n#i2636880:# #t2636880:# 10個 (9%)\r\n#i2634437:# #t2634437:# 20個 (10%)");
                        npc.id(9401983).next().say("怎麼樣，算命，還能拿禮物。一石二鳥！");
                        break;
                case 1:
                        npc.id(9401983).next().say("#b參加活動的方法很簡單！\r\n\r\n#e#b[神祕運勢抽籤]#k參加方法#n\r\n1. 按下#r抽取#k鍵混合棒子。\r\n2. 從#r五支棒子#k中選擇最吸引人的一支。#k\r\n#r※ 每個世界每天可以參加一次抽籤！#k");
                        npc.id(9401983).next().say("怎麼樣？真的很簡單吧？");
                        break;
                case 0:
                        loop = false;
                        if ("1".equals(stage.getQuestRecordExShare(504631, "tplay"))) {
                                npc.id(9401983).say("哎呀？今天好像已經抽完籤了？能明天再來找我嗎？\r\n\r\n#r※<神祕運勢抽籤>每個世界每天只能參加一次。#k");
                        } else if (npc.id(9401983).askYesNo("真的要用這角色參加運勢抽籤嗎？\r\n\r\n#r※<神祕運勢抽籤>每個伺服器一天只能參加一次。#k")) {
                                /* Response is Yes */
                                /* Update Quest RecordEx | Id:504631 | Name: Unknown | Data: "tplay=0;passcheck=1;passbycheck=0;totalPlayCount=0;passbyCount=0;lastDate=0" */
                                stage.updateQuestRecordExShare(504631, "passcheck", "0");
                                dir.npcId(9401983).duration(1500).text("祝好運！").scale(300).addPopupSay();
                                stage.showSpecialUI(1, "UIAnnualEventLuckyDraw");
                        }
                        break;
                case 100:
                        loop = false;
                        break;
        }
}