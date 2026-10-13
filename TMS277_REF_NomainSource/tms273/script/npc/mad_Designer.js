// Created by MetaMS
// [程式設計師賽門]  |  [9000233]
// MapName:旗幟爭奪戰：等待室

if (map.getId() == 942003050) {
        let weekOfYear = util.getWeekOfYear();
        let type = parseInt(Math.floor(weekOfYear % 3));

        let selMap = type == 0 ? "夜晚的雪原" : type == 1 ? "夕陽的雪原" : "白晝的雪原";

        let selection = npc.askMenu("#e歡迎來到旗幟爭奪戰等待室！#n\r\n\r\n本週賽道 : #r#e" + selMap + "#n#k\r\n\r\n#b#L2#我想挑戰旗幟爭奪戰。#l\r\n#b#L1#我想去旗幟爭奪戰練習賽道。#l\r\n#b#L0#請告訴我關於旗幟爭奪戰的事。#l\r\n");
        if (selection == 0) {
                stage.runScript("expand/flag_help");
        } else if (selection == 2) {
                if (npc.askAccept("本週賽道是 #b#e" + selMap + "#n#k。現在就和成員們一起挑戰嗎？")) {
                        /* Response is Yes */
                        if (party == null) {
                                if (npc.askYesNo("旗幟爭奪戰僅限在組隊狀態下入場。\r\n要自己直接建立隊伍嗎？\r\n#b(同意時將建立隊伍。)")) {
                                        npc.createParty();
                                }
                        }
                        let fieldId = type == 0 ? 942002500 : type == 1 ? 942001500 : 942000500;
                        let exitFieldId = type == 0 ? 942003002 : type == 1 ? 942003001 : 942003000;
                        if (party == null) {
                                npc.next().say("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
                        } else if (ctx.makeEvent("guild_flag", false, [party, fieldId, exitFieldId, 1]) == null) {
                                npc.me().say("#e#r發生錯誤，請聯系管理員！");
                        }
                }
        } else if (selection == 1) {
                let ccc = npc.askMenu("\r\n你想要練習哪一個賽道呢？雖然說都不簡單就是了。\r\n#b#L1#白晝的雪原練習賽道#l\r\n#b#L2#夕陽的雪原練習賽道#l\r\n#b#L3#夜晚的雪原練習賽道#l");
                if (ccc == 3) {
                        if (npc.askYesNo("旗幟爭奪戰僅限在組隊狀態下入場。\r\n要自己直接建立隊伍嗎？\r\n#b(同意時將建立隊伍。)")) {

                        } else {
                                /* Response is No */
                                npc.say("嗯…既然如此，那你就先自行創建隊伍後再來找我吧。");
                        }
                }
        }
} else if (map.getId() == 942003000 || map.getId() == 942003001 || map.getId() == 942003002) {
        let selection = npc.askMenu("旗幟爭奪戰玩得開心嗎？怎麼了？\r\n#b#L0#想從這裡出去。#l\r\n#b#L1#請送我回旗幟爭奪戰等待室。\r\n#b#L2#請告訴我關於旗幟爭奪戰的事。#l");
        if (selection == 0) {
                npc.next().say("你想要離開這裡嗎？離開之前可以透過旁邊那優秀的遊戲機查看排行。建議你可以稍微看一下。");
                if (npc.askAccept("要送你回到來這邊之前所在的地圖嗎？")) {
                        let mapId = stage.getIntQuestRecordEx(14266, "rMap");
                        stage.changeMap(mapId, 0);
                } else {
                        /* Response is No */
                        npc.say("好吧,如果想回到原來的地方再跟我說吧.");
                }
        } else if (selection == 1) {
                if (npc.askAccept("你想再參與一次嗎？還是要送你回等待室？")) {
                        stage.changeMap(942003050, 0);
                } else {
                        /* Response is No */
                        npc.say("好吧，你想回等待室就跟我說。");
                }
        } else if (selection == 2) {
                stage.runScript("expand/flag_help");
        }
}