// Created by MetaMS
// [深思熟慮的卡利納]  |  [9063145]
// MapName:番茄慶典滑雪場入口

if (map.getId() == 993238100) {
        if (npc.id(9063145).askYesNo("要現在出發嗎？\r\n\r\n#r※ 接受時將會移動，將會解除隊伍。\r\n※ 在番茄收割場(戰鬥地圖)中，將不可使用#eHEXA技能共同核心#n和#e潛能預設#n。")) {
                /* Response is Yes */
                /* Update Quest RecordEx | Id:101756 | Name: Unknown | Data: "point=0;complete=0;state=1" */
                stage.updateQuestRecordEx(101756, "point=0;complete=0;state=1");
                stage.changeMap(993238200, 0);
        }
} else if (map.getId() == 993238000) {
        let selection = npc.id(9063145).askMenu("要取得#b#e<卡利納的黃金番茄慶典>#n#k的番茄嗎？\r\n\r\n#e本週經驗值獎勵：#b未領取#k\r\n#L1#想進入#b#e<卡利納的番茄慶典>#k#n。#l\r\n#L2#請告訴我關於#b#e過去的參加紀錄#n#k。#l\r\n\r\n#L3#已經沒什麼想做的了。#l");
        if (selection == 1) {
                if (party != null) {
                        if (npc.id(9063145).askYesNo("番茄慶典僅限單人入場，而你現在正處於隊伍當中。要解除隊伍嗎？\r\n#b(點擊同意時將解除隊伍。)#k")) {
                                npc.disbandParty();
                        }
                }
                if (party != null) {
                        npc.id(9063145).say("番茄慶典僅限單人入場，請先解除隊伍後再重新嘗試。");
                } else if (npc.id(9063145).askYesNo("#b#e<卡利納的番茄慶典>#n#k\r\n現在要前往番茄慶典入口嗎？\r\n#r\r\n※ 入場時將解除所有buff效果。#k")) {
                        /* Response is Yes */
                        if (ctx.makeEvent("event_punch_king", false, stage) == null) {
                                npc.me().next().say("#e#r發生錯誤，請聯系管理員！");
                        }
                } else {
                        /* Response is No */
                        npc.id(9063145).say("知道了。準備好的話，請再次對話。");
                }
        }
}