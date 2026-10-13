// Created by MetaMS
// Quest ID:67017
// [星夜馬戲團] 神祕運勢抽籤說明


npc.id(9401983).next().say("這是只給認真享受慶典的人的特別禮物！");
npc.id(9401983).next().say("我的命運究竟如何，幸運會跟著我到哪呢~\r\n你沒有想過要尋找微微安的運嗎？");
npc.id(9401983).next().say("可不是隨便誰都能給的～是星夜馬戲團慶典期間才特別免費提供的。");
if (npc.id(9401983).askYesNo("如果好奇今天的運勢，要不要挑戰神祕運勢抽籤呢？\r\n根據運勢可能會得到特別的禮物喔！")) {
        /* Response is Yes */
        stage.showSpecialUI(1, "UIAnnualEventLuckyDraw");
        npc.id(9401983).noEsc().next().say("首先，按下#b抽取#k鍵搖晃籤筒，從五支籤中選擇最中意的一支。#b(一天可參與一次)#k");
        npc.id(9401983).noEsc().next().say("可獲得的道具目錄和出現機率如下。\r\n\r\n#fc0xFFcb32cd##e<大吉>#n\r\n#i2644302:# #t2644302:# 1個 (0.002%)\r\n#i2644075:# #t2644075:# 1個 (0.004%)\r\n#i2644103:# #t2644103:# 1個 (0.494%)\r\n#i2636222:# #t2636222:# 10個 (1.5%)\r\n#i2048766:# #t2048766:# 30個 (3%)\r\n#i2711021:# #t2711021:# 30個 (5%)\r\n#i2634437:# #t2634437:# 100個 (5%)\r\n\r\n#fc0xFF2d5be6##e<中吉>#n\r\n#i2048766:# #t2048766:# 5個 (3%)\r\n#i2711021:# #t2711021:# 20個 (3%)\r\n#i2049793:# #t2049793:# 1個 (3%)\r\n#i2711023:# #t2711023:# 30個 (3%)\r\n#i2711023:# #t2711023:# 20個 (3%)\r\n#i2632290:# #t2632290:# 3個 (3.5%)\r\n#i2632290:# #t2632290:# 2個 (4%)\r\n#i2048759:# #t2048759:# 30個 (4%)\r\n#i2048758:# #t2048758:# 10個 (4%)\r\n#i2028333:# #t2028333:# 30個 (5%)\r\n#i2634437:# #t2634437:# 50個 (5%)\r\n#i2439869:# #t2439869:# 20個 (5.5%)\r\n\r\n#fc0xFF00b83d##e<小吉>#n\r\n#i2711023:# #t2711023:# 15個 (3.5%)\r\n#i2048759:# #t2048759:# 10個 (4.5%)\r\n#i2028333:# #t2028333:# 10個 (5%)\r\n#i2439869:# #t2439869:# 10個 (7%)\r\n#i2636880:# #t2636880:# 10個 (9%)\r\n#i2634437:# #t2634437:# 20個 (10%)");
        npc.id(9401983).noEsc().next().say("那麼，祝你有個充滿幸運的一天～");
        /* Update Quest RecordEx | Id:504627 | Name: Unknown | Data: "start=1;mapTuto2=1;burn=1;lv=4;s1=2;s2=2;s3=2;s4=2;s5=2;s6=2;s7=2;mapTuto=1;event=2;week=4;first=1" */
        //stage.updateQuestRecordEx(504627, "start=1;mapTuto2=1;burn=1;lv=4;s1=2;s2=2;s3=2;s4=2;s5=2;s6=2;s7=2;mapTuto=1;event=2;week=4;first=1");
        /* Update Quest RecordEx | Id:504631 | Name: Unknown | Data: "tplay=0;passbycheck=0;totalPlayCount=0;passbyCount=0;lastDate=0" */
        stage.updateQuestRecordExShare(504631, "tplay=0;passbycheck=0;totalPlayCount=0;passbyCount=0;lastDate=0");
        stage.showSpecialUI(0, "UIAnnualEventLuckyDraw");
        npc.completeQuest();
} else {
        npc.id(9401983).say("還沒準備好嗎？這也是很正常的！\r\n\r\n※活動期間：2024年 11月 26日 23點 59分為止");
}