// Created by MetaMS
// ID:[807300100]
// MapName:去秘密祭壇的路
// 去秘密祭壇的路


let partyCheck = require("party_check");
let partyBoss = require("party_boss");

let bossType = partyBoss.Ranmaru;

let onlyOne = false;
let minPlayers = 1;
let maxPlayers = 6;
let minLevel = [120, 180];
let maxLevel = [300, 300];
let event = ["boss_ranmaru_normal", "boss_ranmaru_hard"];

let sel = npc.defNpc(9130087).askMenu("#e<森蘭丸遠征隊>#n\r\n 請選擇要挑戰的隊伍\r\n#L0#森蘭丸遠征隊#l\r\n#L1#困難森蘭丸遠征隊#l");
let ans = npc.defNpc(9130087).askMenu("#e<Boss：森蘭丸>#n\r\n偉大的勇士阿，準備好要對抗森蘭丸了嗎？\r\n#b\r\n#L0# <Boss：森蘭丸> 申請入場。#l");
if (ans == 0) {
        if (party == null) {
                if (npc.defNpc(9130087).askYesNo("那個地方很危險，你必須先組隊才能進去。你想要創建隊伍以入場嗎？\r\n#b(點擊同意時將創建隊伍。)")) {
                        npc.createParty();
                }
        }
        if (party == null) {
                npc.defNpc(9130087).next().say("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
        } else if (stage.getCharacterId() != party.getLeaderId()) {
                npc.defNpc(9130087).next().say("請讓你的組隊長和我對話吧!");
        } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                npc.defNpc(9130087).next().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
        } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
                npc.defNpc(9130087).next().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
        } else if (party.getMembersCount(map.getId(), minLevel[sel], maxLevel[sel]) < minPlayers) {
                npc.defNpc(9130087).next().say("你隊員的等級要在" + minLevel[sel] + "~" + maxLevel[sel] + "範圍!請確認!");
        } else if ((name = partyCheck.getNotEnterCountCharacter(party, bossType, sel)) != null) {
                npc.defNpc(9130087).next().say("你隊員#r#e" + name + "#n#k次數已經達到上限了。");
        } else if ((name = partyCheck.getNotClearCountCharacter(party, bossType, sel)) != null) {
                npc.defNpc(9130087).next().say("你隊員#r#e" + name + "#n#k完成次數已經達到上限了。");
        } else if (ctx.makeEvent(event[sel], onlyOne, party) == null) {
                npc.defNpc(9130087).next().say("#e#r發生錯誤，請聯系管理員！");
        }
}