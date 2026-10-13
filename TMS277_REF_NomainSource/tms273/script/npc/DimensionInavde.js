/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let party_event = require("party_event_check");
let log = require("check_log");
let minPlayers = 1;
let maxPlayers = 6;
let minLevel = 30;
let maxLevel = 300;
let maxenter = 5;
let PQLog = "prison_break";

let sel = npc.meFlip().askMenu("#e<組隊任務：逃脫>#n\\r\\n\\r\\n 雖說想就這樣立刻逃跑，但是……我無法拒絕他的囑託。在這座城裡，被關在空中監獄的人們正在尋找幫他們逃離監獄的人。 \\r\\n#k請讓#b所屬組隊的隊長#k來和我說話。\\r\\n#b#L0#我想執行組隊任務。#l\\r\\n#L2#我想知道今天的剩餘挑戰次數。#l")

switch (sel) {
    case 0:
        if (party == null) {
            npc.ui(1).npcFlip().meFlip().say("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
        } else if (stage.getCharacterId() !== party.getLeaderId()) {
            npc.ui(1).me().next().say("請讓你的組隊長和我對話吧!");
        } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
            npc.ui(1).me().next().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
        } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
            npc.ui(1).me().next().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
        } else if (party.getMembersCount(map.getId(), minLevel, maxLevel) < minPlayers) {
            npc.ui(1).me().next().say("你隊員的等級要在" + minLevel + "~" + maxLevel + "範圍!請確認!");
        // } else if ((name = party_event.isAllMembersAllowedEvent(party, db, PQLog, maxenter)) != null) {
        //     npc.ui(2).me().next().say("你隊員#r#e" + name + "#n#k次數已經達到上限了。");
        } else if (ctx.makeEvent("party_prison_break", true, party) == null) {
            npc.ui(1).me().next().say("#e#r發生錯誤，請聯系管理員！");
        }
        break;
	case 2:
        let count = maxenter - log.getEventValue(stage, db, PQLog);
        npc.say("今天剩下的挑戰次數剩 " + count + " 次喔。");				
}