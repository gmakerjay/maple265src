// Created by MetaMS

if (stage.getIntQuestRecordExShare(503096, "mComplete") == 1) {
        if (npc.id(9063069).askYesNo("你消滅等級範圍怪物#b1000隻#k啦！\r\n要馬上領取#b#e每日獎勵#n#k嗎？\r\n#r#e※ 此獎勵每個世界只能獲得一次。#n#k\r\n\r\n#i2636801# #b#e萬聖貓禮券 3張#n#k\r\n#i2635907#   #b#e#t2635907#500個#n#k")) {
                /* Response is Yes */
                if (stage.gainItem(2635907, 500)) {
                        /* Update Quest RecordEx | Id:503096 | Name: Unknown | Data: "mComplete=1;mCnt=1;date=241017;hallowClick=0;camilaClick=0;week=1" */
                        //stage.updateQuestRecordEx(503096, "mComplete=1;mCnt=1;date=241017;hallowClick=0;camilaClick=0;week=1");
                        let mCnt = stage.getIntQuestRecordExShare(503096, "mCnt");
                        mCnt += 1;
                        stage.updateQuestRecordExShare(503096, "mCnt", mCnt);

                        /* Update Quest RecordEx | Id:503096 | Name: Unknown | Data: "mComplete=2;mCnt=1;date=241017;hallowClick=0;camilaClick=0;week=1" */
                        //stage.updateQuestRecordEx(503096, "mComplete=2;mCnt=1;date=241017;hallowClick=0;camilaClick=0;week=1");
                        stage.updateQuestRecordExShare(503096, "mComplete", "2");

                        /* Update Quest RecordEx | Id:503096 | Name: Unknown | Data: "point=3;mComplete=2;mCnt=1;date=241017;hallowClick=0;camilaClick=0;week=1" */
                        //stage.updateQuestRecordEx(503096, "point=3;mComplete=2;mCnt=1;date=241017;hallowClick=0;camilaClick=0;week=1");
                        let point = stage.getIntQuestRecordExShare(503096, "point");
                        point += 3;
                        stage.updateQuestRecordExShare(503096, "point", point);

                        stage.showSystemMessage("萬聖貓 已獲得優惠券 3張和EXP交換券 500張。");
                } else {
                        npc.id(9063069).say("背包空間不足，請清理後再試。");
                }
        } else {
                /* Response is No */
                npc.id(9063069).say("如果改變心意，請在晚上12點前再來找我～\r\n過了晚上12點就必須重新消滅怪物！");
        }
}