// Created by MetaMS
// [邱翁]  |  [2094000]
// MapName:休菲凱曼的招待所
let party_event = require("party_event_check");
let log = require("check_log");
let minPlayers = 1;
let maxPlayers = 6;
let minLevel = 200;
let maxLevel = 300;
let maxenter = 5;
let PQLog = "pirate";

let selection = npc.askMenu("#e<組隊任務 : 海賊王>#n\r\n你想要什麼呢？ \r\n#b#L0# 我想要組隊任務。#l\r\n#L1# 想要找一起組隊的隊員。#l\r\n#L2# 想聽說明。#l\r\n#L3# 想領取海賊王的帽子。#l\r\n#L4# 想知道今天剩下的挑戰次數。#l");
switch (selection) {
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
        } else if (ctx.makeEvent("party_pirate", false, party) == null) {
            npc.ui(1).me().next().say("#e#r發生錯誤，請聯系管理員！");
        }
        break;
    case 1:
        stage.openUIWithOption(7, 1);
        stage.showSystemMessage("使用隊伍視窗(快捷鍵 p) 內 '尋找隊伍'功能, 就可以隨時找到想要的隊伍.");
        break;
    case 2:
        npc.next().say("深山人蔘所居住的#b#m251000000##k內#r有海盜 #o9300119##k來襲擊。深山人蔘們的王#b#p2094001##k被綁架了。 請跟同伴進入海盜船內趕走 #o9300119#。拜託了。\r\n - #e等級#n ： 130等級以上#r ( 推薦等級： 130 ～ 149 )#k \r\n - #e參加人員#n : 3 ～ 6名\r\n - #e最終獎勵#n ： #b#i01003856# #t01003856##k");
        break;
    case 3:
        let sel = npc.askMenu("感謝你們擊退#b海賊王#k，救出了#b雨揚#k。若是你取得了帽子的碎片並拿來給我，我就幫你製作#b海賊王帽子#k做為謝禮。想要什麼樣的帽子？#b\r\n#L0##i1003856:##t1003856#\r\n#r(需要#t4001455# 30個)#l#b\r\n#L1##i1003857:##t1003857#\r\n#r(#t1003856:# 1個，需要 #t4001455# 60個)#l#b\r\n#L2##i1003858:##t1003858#\r\n#r(#t1003857:# 1個，需要#t4001455# 90個)#l");
        let reqCount = 30 + sel * 30;
        let itemId = 1003856 + sel;
        npc.next().say("要製作海賊王的帽子 嗎？帶來足夠的帽子碎片嗎？");
        npc.next().say("嗯嗯？用這個無法製作海賊王的帽子呢，如果想要海賊王的帽子的話，帽子碎片需要" + reqCount + "個。");
        break;
    case 4:
        let count = maxenter - log.getEventValue(stage, db, PQLog);
        npc.say("今天剩下的挑戰次數剩 " + count + " 次喔。");
        break;
}