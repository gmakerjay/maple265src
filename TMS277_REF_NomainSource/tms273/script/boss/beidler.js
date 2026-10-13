// Created by MetaMS
// ID:[105200000]
// MapName:巨大根基
// 巨大根基

let partyBoss = require("party_boss");

let onlyOne = false;

let minPlayers = 1;
let maxPlayers = 6;

let event = "boss_beidler_";

let startMap = 863010000;

if (map.getId() == startMap) {
        if (party == null) {
                npc.createParty();
        }
        if (party == null) {
                npc.npcFlip().meFlip().say("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
        } else if (stage.getCharacterId() != party.getLeaderId()) {
                npc.me().say("請讓你的組隊長和我對話吧!");
        } else if (party.getMembersCount(map.getId(), 1, 300) < party.getMembersCount()) {
                npc.me().say("好像有隊員在其他地方，請把隊員都召集到這裡！");
        } else if (party.getMembersCount(map.getId(), 1, 300) < minPlayers || party.getMembersCount(map.getId(), 1, 300) > maxPlayers) {
                npc.me().say("你需要有一個#r" + minPlayers + "~" + maxPlayers + "#k人的隊伍.!");
        } else if ((name = party.checkBossEventLevel(bossType, difficulty)) != null) {
                npc.me().say("請確認你隊員" + name + "的等級範圍!");
        } else if (!practiceMode && (name = party.checkBossEventClear(bossType, difficulty)) != null) {
                npc.me().say("你隊員#r#e" + name + "#n#k完成次數已經達到上限了。");
        } else {
                let check = true;
                if ((name = party.checkCharacterItem(4033981, 1)) != null) {
                        check = false;
                        npc.me().say("感覺被什麼阻擋了。\r\n#b(隊員中#r#e" + name + "#n#b沒有 #i4033981##t4033981#，因此無法入場。)#k");
                }
                if (check) {
                        if (ctx.makeEvent(event + partyBoss.difficulty[difficulty], onlyOne, [party, practiceMode]) == null) {
                                npc.me().say("#e#r發生錯誤，請聯系管理員！");
                        }
                }
        }
}