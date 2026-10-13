// Created by MetaMS
// Quest ID:503094
// [拳擊王] 世界最佳拳擊王 SEASON 2

if ("1".equals(stage.getQuestRecordEx(503094, "tuto"))) {
        let flag = true;
        while (flag) {
                let myBestPoint = stage.getIntQuestRecordEx(101615, "bestPoint");
                let worldBestPoint = stage.getIntQuestRecordExShare(503095, "bestPoint");
                let selection = npc.id(9063063).askMenu("勇士！\r\n歡迎來到#b#e世界最強拳擊王SEASON2#n#k！\r\n#b- 世界內最高分數：" + worldBestPoint + "分\r\n - 目前角色歷史最高分數：" + myBestPoint + "分 \r\n#b- 今天的經驗值加持：#e可領取#n#k\r\n#L0##b#e我想進入拳擊王待機室#n#k。#l\r\n#L1##b#e世界最強拳擊王#n#k是什麼？#l\r\n#L2##b#e我想瞭解參加方法#n#k。#l\r\n#L3##b#e我想瞭解獎勵#n#k。#l\r\n\r\n#L99#目前沒有任何疑問。#l");
                switch (selection) {
                        case 0:
                                /* Update Quest RecordEx | Id:101615 | Name: Unknown | Data: "rMap=410007521;point=0;jobcode=1314;bestPoint=0" */
                                //stage.updateQuestRecordEx(101615, "rMap=410007521;point=0;jobcode=1314;bestPoint=0");
                                stage.updateQuestRecordEx(101615, "rMap", String(map.getId()));
                                if (npc.id(9063063).askYesNo("勇士！\r\n你想移動至待機室嗎？")) {
                                        /* Response is Yes */
                                        flag = false;
                                        stage.changeMap(993234700, 0);
                                } else {
                                        /* Response is No */
                                        npc.id(9063063).say("那就等你準備好了再來找我吧！");
                                }
                                break;
                        case 3:
                                npc.id(9063063).next().say("#b排名獎勵#k如下！\r\n請努力贏得獎勵，讓其他勇士見識你的實力吧！\r\n\r\n#b#e[各職業第1名]#n\r\n#n - #i2636800:#  #t2636800:# 1個\r\n - #i2636948:#  #t2636948:# 1個\r\n\r\n#b#e[各職業第2～10名]#n\r\n#n#k - #i2636948:#  #t2636948:# 1個\r\n\r\n#r一般/Reboot世界排名將分開計算，獎勵亦將分別發送。");
                                npc.id(9063063).next().say("不是一定要登上排名才能獲得獎勵！\r\n我會根據拳擊王分數把#r#i2636146:# #t2636146:##k作為#b挑戰獎勵#k送給你！\r\n根據拳擊王分數，每#r#e100分#n#k可領取#r#e1個#n#k獎勵！\r\n\r\n#r※ #t2636146:#最多可獲得30個。\r\n\r\n#r※ #t2636146:#每個世界只能獲得1次。\r\n\r\n#r※也可用世界內其他101級以上的角色獲得挑戰獎勵。(神之子角色必須完成劇情任務第2章才能獲得獎勵。)");
                                npc.id(9063063).next().say("啊，還有！\r\n這次#b#e世界最強拳擊王#n#k適逢SEASON2，也重新\r\n準備了#b造訪獎勵#k！");
                                npc.id(9063063).next().say("#b一天一次#k，我會透過待機室裡的#b勇士職業挑戰者中的第一名#k發送#b經驗值加持#k！\r\n啊，如果找不到，#b長得和我一模一樣的勇士#k應該會在附近，請去找他領取。\r\n\r\n#r※ 獲得的經驗值加持可持續30分鐘。\r\n\r\n#r※ 每天每個世界只能獲得1次經驗值加持。");
                                npc.id(9063063).next().say("#b即使沒有拳擊王參加記錄也能領取#b造訪獎勵#k。#k\r\n別忘囉，一天一定要前往待機室一次！嘿嘿。");
                                break;
                        case 2:
                                npc.id(9063063).next().say("使用方法很簡單！\r\n\r\n首先，你必須先進入待機室，然後等你準備好了之後，就可以移動至入場準備區。請注意，#r入場時將會解除所有加持#k！\r\n\r\n#r※參加拳擊王後，重新挑戰時不會解除加持。");
                                npc.id(9063063).next().say("第二，請消滅#r共分6階段#k增加#r防禦率#k和#r等級#k的怪物！\r\n可比照在#r限制時間2分鐘#k內對怪物#r造成的傷害量#k獲得#r分數#k。只要能在限制時間內獲得#r1000分#k，你的成績即可登上排名！");
                                npc.id(9063063).next().say("第三，請到退場地圖找我計算分數！\r\n如果不找我交談，你的#r#e分數記錄及排名記錄\r\n都將作廢喔！#n#k\r\n\r\n#r※已登錄的排名記錄不會刪除，只會被新記錄更新。");
                                npc.id(9063063).next().say("第四，參加獎勵可透過星星通知領取！\r\n\r\n\r\n#r※活動結束後，經過排名計算即可獲得排名獎勵。詳情請參考官網介紹。");
                                npc.id(9063063).next().say("以上就是關於本次活動的說明！\r\n勇士，加油！\r\n\r\n#r※[活動期間]\r\n-至2024年10月29日23點59分為止#k");
                                break;
                        case 1:
                                npc.id(9063063).next().say("#b#e世界最強拳擊王#n#k指的是在#r所有世界#k中，依照#r職業類別#k\r\n尋找最強勇士的活動！");
                                npc.id(9063063).next().say("得到#r1000分#k以上的分數就能登上排名！\r\n#r5轉以上#k的#r50個職業#k的成績將分別記錄。\r\n\r\n#r※一般/Reboot世界排名將分開計算。\r\n\r\n※排名記錄不會刪除，只會被新紀錄更新。\r\n\r\n※只有在自由轉職或刪除角色時，角色排名才會刪除。\r\n\r\n※以不當方式登上排名時，可能會被踢除排名並且無法使用遊戲或遊戲內容。\r\n\r\n※以違規行為進入排行榜時，可能被排除在排行榜登記，以及限制使用遊戲或系統內容。");
                                npc.id(9063063).next().say("在限制時間內#r達成最高分#k的勇士\r\n將可獲得排名獎勵。\r\n啊，請別擔心！就算沒登上排名，還是可根據#r獲得分數#k\r\n獲得#r參加獎勵#k！");
                                npc.id(9063063).next().say("所以請別猶豫！\r\n踴躍參加吧！");
                                break;
                        case 99:
                                flag = false;
                                break;
                }
        }
} else {
        npc.id(9063063).next().say("#b#e勇士！！#n#k\r\n好久不見！這段時間過得好嗎？");
        npc.id(9063063).next().say("許久不見，聽說你做了很多修練！\r\n為了不輸給你，我也很努力變強呢，呵呵。");
        npc.me().next().say("(我已經變得比預期的強太多了說…)");
        npc.id(9063063).next().say("我當然不是空手來的！\r\n有看到我帶來的腰帶吧？\r\n這腰帶就是要給最強的勇士！\r\n\r\n…呵呵，有發現嗎？");
        npc.id(9063063).next().say("能讓#r所有世界#k中#r相同職業#k的勇士們較量身手的大賽！\r\n#b#e世界最強拳擊王SEASON2！#n#k現在即將舉辦！！");
        if (npc.id(9063063).askYesNo("怎樣？\r\n除了#r排名獎勵#k之外，連#r挑戰獎勵#k都相當豐厚！\r\n要挑戰#b#e世界最強拳擊王SEASON2#n#k嗎？")) {
                /* Response is Yes */
                /* Update Quest RecordEx | Id:101615 | Name: Unknown | Data: "bestPoint=0" */
                stage.updateQuestRecordEx(101615, "bestPoint", "0");
                /* Update Quest RecordEx | Id:101615 | Name: Unknown | Data: "jobcode=1314;bestPoint=0" */
                stage.updateQuestRecordEx(101615, "jobcode", String(stage.getJob()));
                /* Update Quest RecordEx | Id:101615 | Name: Unknown | Data: "point=0;jobcode=1314;bestPoint=0" */
                stage.updateQuestRecordEx(101615, "point", "0");
                /* Update Quest RecordEx | Id:503094 | Name: [拳擊王] 世界最佳拳擊王 SEASON 2 | Data: "date=241016" */
                stage.updateQuestRecordEx(503094, "date", util.getStringDate("yyMMdd"));
                /* Update Quest RecordEx | Id:503094 | Name: [拳擊王] 世界最佳拳擊王 SEASON 2 | Data: "date=241016;tuto=1" */
                stage.updateQuestRecordEx(503094, "tuto", "1");
                if (stage.getIntQuestRecordExShare(503095, "bestPoint") == 0) {
                        /* Update Quest RecordEx | Id:503095 | Name: [拳擊王] 獲得分數獎勵吧！ | Data: "bestPoint=0" */
                        stage.updateQuestRecordExShare(503095, "bestPoint", "0");
                        /* Update Quest RecordEx | Id:503095 | Name: [拳擊王] 獲得分數獎勵吧！ | Data: "get=0;bestPoint=0" */
                        stage.updateQuestRecordExShare(503095, "get", "0");
                }
                npc.id(9063063).say("哇，你的回答果然很有勇士風範！\r\n想參加拳擊王時，請透過#b星星通知#k\r\n找我交談！");
        } else {
                /* Response is No */
                npc.id(9063063).say("勇士！別害怕，挑戰看看吧！\r\n勇於挑戰的樣子最適合你！\r\n\r\n#r#e※[活動期間]\r\n-至2024年10月29日23點59分為止");
        }
}
