// Created by MetaMS
// Boss Entry

let partyBoss = require("party_boss");

let onlyOne = false;

let minPlayers = 1;
let maxPlayers = 3;

let event = "boss_malitia_";

let startMap = 875033004;

if (map.getId() == startMap) {
        if (party == null) {
                npc.createParty();
        }
        if (party == null) {
                npc.npcFlip().meFlip().sayEx("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
        } else if (stage.getCharacterId() != party.getLeaderId()) {
                npc.me().sayEx("請讓你的組隊長和我對話吧!");
        } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                npc.me().sayEx("好像有隊員在其他地方，請把隊員都召集到這裡！");
        } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
                npc.me().sayEx("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
        } else if ((name = party.checkBossEventLevel(bossType, difficulty)) != null) {
                npc.me().sayEx("請確認你隊員" + name + "的等級範圍!");
        } else if (!practiceMode && (name = party.checkBossEventClear(bossType, difficulty)) != null) {
                npc.me().sayEx("你隊員#r#e" + name + "#n#k完成次數已經達到上限了。");
        } else if (ctx.makeEvent(event + partyBoss.difficulty[difficulty], onlyOne, [party, practiceMode]) == null) {
                npc.me().sayEx("#e#r發生錯誤，請聯系管理員！");
        }
}