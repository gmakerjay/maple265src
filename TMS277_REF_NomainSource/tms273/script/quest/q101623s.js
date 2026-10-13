// Created by MetaMS
// Quest ID:101623
// [新楓之谷時尚週] 萬聖貓的時尚週！


npc.id(9063069).next().say("#b#h0##k, 你好？\r\n特級魔女萬聖貓來了！");
npc.id(9063069).next().say("對於勇士來說，修煉和冒險固然重要，但如果沒有#b#e時尚#n#k，就有2%的不足！你也同意吧？");
npc.id(9063069).next().say("所以準備了萬聖貓的令人毛骨悚然的時尚慶典\r\n！\r\n名為#b#e楓之谷時尚週！#n#k ");
if (npc.id(9063069).askYesNo("如何，聽起來毛骨悚然不悚然？\r\n#b#h0##k，你當然也會參加吧？")) {
        if (stage.getIntWorldShareRecord(391, "start") <= 0) {
                stage.updateWorldShareRecord(391, "start=1;r13=0;r14=0;r15=0;r16=0;r17=0;r18=0;r19=0;r0=0;r1=0;r2=0;r3=0;r4=0;r5=0;r6=0;r7=0;r8=0;r9=0;r10=0;r11=0;r12=0");
        }
        /* Response is Yes */
        /* Update Quest RecordEx | Id:503096 | Name: Unknown | Data: "date=241016;hallowClick=0;camilaClick=0" */
        //stage.updateQuestRecordEx(503096, "date=241016;hallowClick=0;camilaClick=0");
        /* Update Quest RecordEx | Id:503096 | Name: Unknown | Data: "mCnt=0;date=241016;hallowClick=0;camilaClick=0" */
        //stage.updateQuestRecordEx(503096, "mCnt=0;date=241016;hallowClick=0;camilaClick=0");
        /* Update Quest RecordEx | Id:503096 | Name: Unknown | Data: "mComplete=0;mCnt=0;date=241016;hallowClick=0;camilaClick=0" */
        //stage.updateQuestRecordEx(503096, "mComplete=0;mCnt=0;date=241016;hallowClick=0;camilaClick=0");
        /* Update Quest RecordEx | Id:503096 | Name: Unknown | Data: "mComplete=0;mCnt=0;date=241016;hallowClick=0;camilaClick=0;week=1" */
        //stage.updateQuestRecordEx(503096, "mComplete=0;mCnt=0;date=241016;hallowClick=0;camilaClick=0;week=1");
        /* Update Quest RecordEx | Id:503101 | Name: Unknown | Data: "mCnt=0" */
        //stage.updateQuestRecordEx(503101, "mCnt", "0");
        if (stage.getIntQuestRecordExShare(503096, "week") <= 0) {
                stage.updateQuestRecordExShare(503096, "date", util.getStringDate("yyMMdd"));
                stage.updateQuestRecordExShare(503096, "hallowClick", "0");
                stage.updateQuestRecordExShare(503096, "camilaClick", "0");
                stage.updateQuestRecordExShare(503096, "mCnt", "0");
                stage.updateQuestRecordExShare(503096, "mComplete", "0");
                stage.updateQuestRecordExShare(503096, "week", "1");
                stage.updateQuestRecordExShare(503101, "mCnt", "0");
        }
        npc.completeQuest();
        stage.startQuest(101626);//Quest Name:[新楓之谷時尚週] 萬聖貓的時尚週優惠券掉落控制
        stage.openUI(1462);
        npc.id(9063069).next().say("我就知道充滿品味的你當然會參加！\r\n我們一起享受#b時尚週#k吧！");
        npc.id(9063069).next().say("參加方法很簡單。只要消滅妨礙慶典的#r等級範圍怪物#k\r\n#e1000隻#k#n左右，\r\n就會支付#b萬聖貓週#k參加印章和\r\n#b#e#i2636802#萬聖貓禮券#n#k#b#e3張#n#k和\r\n#b#e#i2635907:#  #t2635907:#500個#n#k！\r\n\r\n#r※ 等級範圍怪物是指以角色等級為基準#e-20級到+20級以內#n的怪物。");
        npc.id(9063069).next().say("#b萬聖貓禮券#k可用來在萬聖貓的精品商店換取#b陰森森的時尚#k道具！\r\n每種道具要求的禮券數量不同，如果有想要的商品就努力收集禮券吧～");
        npc.id(9063069).next().say("啊，在消滅#r等級範圍怪物#k的時候偶爾會掉落我弄丟的\r\n#b#e#i2636801:# #t2636801:##n#k！\r\n如果撿到掉落的禮券#b#h0##k 你可以使用！\r\n\r\n#r※ 消滅等級範圍怪物即可依特定機率獲得萬聖貓禮券交換券。");
        npc.id(9063069).say("如果蓋上很多參加印章，我會依照蓋章次數\r\n額外給你#b特別的獎勵#k，所以你要認真參加！");
} else {
        /* Response is No */
        npc.id(9063069).say("咦，對時尚不感興趣嗎？！\r\n\r\n#r#e[活動期間]#n\r\n - 2024年10月29日下午11點59分為止#k");
}