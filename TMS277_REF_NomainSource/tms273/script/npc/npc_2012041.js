// Created by MetaMS
// [岱達]  |  [2012041]
// MapName:地下水道入口

if (map.getId() == 941000000) {
        /* Update Quest RecordEx | Id:100811 | Name: Unknown | Data: "rMap=100000003;point=11384;complete=2;guildPoint=1;date=23/10/13/19/30;weeklyRecord=0" */
        //stage.updateQuestRecordEx(100811, "rMap=100000003;point=11384;complete=2;guildPoint=1;date=23/10/13/19/30;weeklyRecord=0");
        /* Update Quest RecordEx | Id:100811 | Name: Unknown | Data: "rMap=100000003;point=11384;complete=2;guildPoint=0;date=23/10/13/19/30;weeklyRecord=0" */
        //stage.updateQuestRecordEx(100811, "rMap=100000003;point=11384;complete=2;guildPoint=0;date=23/10/13/19/30;weeklyRecord=0");
        let date = stage.getQuestRecordEx(100811, "date");
        if (date == "") {
                date = util.getStringDate("yy/MM/dd/HH/mm")
                stage.updateQuestRecordEx(100811, "date", date);
        }
        let logTime = util.getTimeStringToLong(date, "yy/MM/dd/HH/mm");
        if (!util.isSameWeek(logTime, new Date().getTime())) {
                stage.updateQuestRecordEx(100811, "weeklyRecord", "0");
                stage.updateQuestRecordEx(100811, "date", util.getStringDate("yy/MM/dd/HH/mm"));
        }
        let weeklyRecord = stage.getIntQuestRecordEx(100811, "weeklyRecord");
        let selection = npc.id(2012041).askMenu("\r\n遺址散發著不祥的氣息。現在調查地下水道嗎？\r\n\r\n#e- 本周最高分數：#n#r#e" + weeklyRecord + "分#n#k\r\n#L1# #b進入威廉古堡的地下水道。#k#l\r\n#L2# #b威廉古堡的地下水道是怎樣的地方呢？#k#l");
        if (selection == 1) {
                if (party != null) {
                        if (npc.id(2012041).askYesNo("威廉的地下水路僅限單人入場，而你現在正處於隊伍當中。要解除隊伍嗎？\r\n#b(點擊同意時將解除隊伍。)#k")) {
                                npc.disbandParty();
                        }
                }
                if (party != null) {
                        npc.id(2012041).say("威廉的地下水路僅限單人入場，請先解除隊伍後再重新嘗試。");
                } else if (npc.askAccept("進入地下水道時，現在持有的\r\n#fs16##b#e所有Buff效果將會被解除，且無法使用萌獸#k#fs12##n。\r\n\r\n現在要進行挑戰嗎？")) {
                        /* Response is Yes */
                        /* Update Quest RecordEx | Id:100811 | Name: Unknown | Data: "rMap=100000003;point=0;complete=2;guildPoint=0;date=23/10/13/19/30;weeklyRecord=0" */
                        //stage.updateQuestRecordEx(100811, "rMap=100000003;point=0;complete=2;guildPoint=0;date=23/10/13/19/30;weeklyRecord=0");
                        if (ctx.makeEvent("guild_boss_eregos", false, stage) == null) {
                                npc.me().next().say("#e#r發生錯誤，請聯系管理員！");
                        }
                } else {
                        /* Response is No */
                        npc.id(2012041).say("知道了。準備好調查的話，請再次對話。");
                }
        } else if (selection == 2) {
                npc.next().say("#r#e威廉古堡的地下水道#k#n有什麼要詢問的嗎？");
                npc.next().say("很久很久之前…有個叫做威廉古堡的古老王國。雖然因為可怕的事件，造成整個王國都滅亡了。");
                npc.next().say("雖然曾多次試圖探險威廉古堡遺址，但並不容易，最終，通往那裡的路被遺忘。\r\n\r\n#r#e直到不久前…");
                npc.next().say("以前就一直在調查威廉古堡的遺址，在因為事故沒有人去過的地方#b發現通往威廉古堡的地下水道。#k");
                npc.next().say("一個祭壇所在的地方，很多入口都像迷宮一樣錯綜複雜，但無論走到哪裡，都會有不祥之氣。");
                npc.next().say("公會總部決定調查地下水道。在地下水道入口跟我搭話，會打開通往威廉古堡地下水道的大門，可以通往不祥之氣的祭壇的通道。");
                npc.next().say("調查只能一個人進行，中途退出公會或被驅逐，則無法獲得副本分數。另外，如果退出公會或被驅逐出境，會從相應的公會總分數中扣除，還請留意。");
                npc.next().say("調查可以不受限制地進行。但是，因為地下水道不祥的氣息，入場時所有Buff效果均會被解除，敬請慎重的做決定。");
                npc.next().say("在通往祭壇的通道上，可以暫時使用Buff技能和消耗道具，之後可以應付所有的考驗。\r\n但是，如果在一定時間內沒有進入祭壇，將退出地下水道，還請務必注意。");
                npc.next().say("在河道最深處的一座不祥的祭壇上，屏住呼吸等待時機地存在即將甦醒。那正是\r\n\r\n                   #r威廉古堡的惡魔–亞爾卡努斯#k\r\n\r\n。");
                npc.next().say("那不滅的存在…受到攻擊越多，就越強大的，所以一定要小心。如果重生為最強的狀態，無論受到多麼強烈的攻擊，他都不會表現出倒下的樣子。\r\n另外，如果因亞爾卡努斯的攻擊而死亡，將立即移動至祭壇外，請務必注意。");
                npc.next().say("地下水道存在者所造成的傷害，依據比例，可以得到副本點數，每週一0點，隨著達成的目標，公會本部將支付獎勵貴族 SP，請加油挑戰。只有公會的總副本分數達到一定分數時，才能獲得。");
                npc.next().say("另外，依據分數排名可以追加獲得貴族SP，退出地下水道後，需要過一定時間才能結算所有分數，此部分還請參考。\r\n#r各公會的副本分數合計需要一定的時間，至全部反映在排名上為止需要一定的時間，即使分數少，也不要驚慌，請稍後再確認。");
                npc.next().say("#b#e第1名：40個的SP\r\n第2名：38個的SP\r\n第3名：36個的SP\r\n第4名～第5名：34個的SP\r\n第6名～第10名：32個的SP\r\n前5%：29個的SP\r\n前10%：27個的SP\r\n前15%：25個的SP\r\n前20%：23個的SP\r\n前25%：21個的SP\r\n前30%：19個的SP\r\n前40%：17個的SP\r\n前60%：15個的SP\r\n前80%：13個的SP\r\n500點以上:10個的SP\r\n\r\n#r#e※沒能獲得500點以上時，就算進入排行榜也無法獲得獎勵。#k#n");
                npc.say("我會一起進去的，不用擔心迷路。快點挑戰吧。");
        }
} else if (map.getId() == 941000001) {
        let selection = npc.id(2012041).askMenu("\r\n亞爾卡努斯的力量絲毫沒有減弱。再次帶您到地下水道入口。\r\n\r\n#b#L1# 回到地下水道。#k#l\r\n#b#L2# 對話結束。#k#l");
        if (selection == 1) {
                stage.changeMap(941000000, 0);
        }
} else {
        if (npc.id(2012041).askYesNo("如果準備好了，將會帶您過去。\r\n\r\n#b#e現在移動到祭壇嗎？#n#k")) {
                stage.changeMap(941000200, 0);
        } else {
                /* Response is No */
                npc.id(2012041).say("那麼，請整頓完畢後再試。");
        }
}