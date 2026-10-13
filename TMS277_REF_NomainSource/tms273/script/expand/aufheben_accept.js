// Created by MetaMS
// Boss:Aufheben

let partyCheck = require("party_check");

let onlyOne = false;
let minPlayers = 1;
let maxPlayers = 6;
let minLevel = 100;
let maxLevel = 300;
let event = "boss_aufheben";

let logQuestId = 100936;
let maxEnter = 5;

let selection = npc.askMenu("#e<BOSS：奥芙赫班>#n\r\n\r\n#b#h0# \n\#k偉大的勇士, 你準備好迎戰奥芙赫班了嗎?#b\r\n#b\r\n#L0# 申請入場<Boss: 奥芙赫班>.#l");
if (selection == 0) {
        if (party == null) {
                if (npc.askYesNo("那個地方很危險，你必須先組隊才能進去。你想要創建隊伍以入場嗎？\r\n#b(點擊同意時將創建隊伍。)")) {
                        npc.createParty();
                }
        }
        if (party == null) {
                npc.next().say("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
        } else if (stage.getCharacterId() != party.getLeaderId()) {
                npc.next().say("請讓你的組隊長和我對話吧!");
        } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                npc.next().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
        } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
                npc.next().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
        } else if (party.getMembersCount(map.getId(), minLevel, maxLevel) < minPlayers) {
                npc.next().say("你隊員的等級要在" + minLevel + "~" + maxLevel + "範圍!請確認!");
        } else if ((name = partyCheck.getNotPQLogCharacter(party, util, logQuestId, 1, maxEnter)) != null) {
                npc.next().say("你隊員#r#e" + name + "#n#k完成次數已經達到上限了。");
        } else if (ctx.makeEvent(event, onlyOne, party) == null) {
                npc.next().say("#e#r發生錯誤，請聯系管理員！");
        }
}