/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
let party_event = require("party_event_check");
let log = require("check_log");
let minPlayers = 1;
let maxPlayers = 6;
let minLevel = 30;
let maxLevel = 300;
let maxenter = 5;
let PQLog = "party2";

let sel = npc.askMenu("#e<組隊任務 : 時空的裂縫>#n從這上面開始充滿危險的存在，所以再不能繼續往上。跟組隊員一起核心協力是否要一起解決問題呢？想要挑戰的話 #b透過屬於你隊伍的隊長#k跟我對話。\\r\\n#k請讓#b所屬組隊的隊長#k來和我說話。\\r\\n#b#L0#我想執行組隊任務。#l\\r\\n#L1#我想聽一下說明。#l\\r\\n#L2#我想知道今天的剩餘挑戰次數。#l")

switch (sel) {
        case 0:
                if (party == null) {
                        npc.ui(1).say("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
                } else if (stage.getCharacterId() !== party.getLeaderId()) {
                        npc.ui(1).next().say("請讓你的組隊長和我對話吧!");
                } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                        npc.ui(1).next().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
                } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
                        npc.ui(1).next().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
                } else if (party.getMembersCount(map.getId(), minLevel, maxLevel) < minPlayers) {
                        npc.ui(1).next().say("你隊員的等級要在" + minLevel + "~" + maxLevel + "範圍!請確認!");
                // } else if ((name = party_event.isAllMembersAllowedEvent(party, db, PQLog, maxenter)) != null) {
                //         npc.ui(2).next().say("你隊員#r#e" + name + "#n#k次數已經達到上限了。");
                } else if (ctx.makeEvent("pq_party2", true, party) == null) {
                        npc.ui(1).next().say("#e#r發生錯誤，請聯系管理員！");
                }
                break;
        case 1:
                npc.say("#e<組隊任務：時空裂縫>#n\r\n#b#m220000000##k出現時空裂縫了！要擋住從這裡入侵的怪物們，由勇敢的冒險家們主動協助是最實在的。與值得信任的同伴們結合力量，救出#m220000000#吧！打敗怪物或是解開謎題的各種難關後打敗#r#o9300012##k吧。 \r\n  - #e等級#n：110以上 #r( 推薦等級：120 ~ 139 )#k \r\n  - #e限制時間#n：20分鐘\r\n  - #e參加人員#n：3~6位\r\n  - #e獲得道具#n ： #i1022073:# #t1022073# #b(每5次幫忙時會獲得)#k\r\n                         各種消耗，其他，裝備道具");
                break;
		case 2:
        let count = maxenter - log.getEventValue(stage, db, PQLog);
        npc.say("今天剩下的挑戰次數剩 " + count + " 次喔。");			
}