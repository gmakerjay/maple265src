// Created by MetaMS
// ID:[875033004]
// MapName:紅月暗影籠罩的入口
// 紅月暗影籠罩的入口

let partyBoss = require("party_boss");
let startMap = 875033004;
if (map.getId() == startMap) {
        if (party == null) {
                if (npc.ui(1).npcFlip().meFlip().askYesNo("自己一個人挑戰好像有點危險。仍要進入嗎？\r\n#b(<<Boss瑪麗西亞>>是建議3人隊伍執行的內容，入場時需要1人以上的隊伍。接受時將生成隊伍。)")) {
                        npc.createParty();
                }
        }
        if (party == null) {
                npc.npcFlip().meFlip().sayEx("這裡很危險，必須組隊進入。\r\n#b(只有1人以上的隊伍可以申請。)#k");
        } else {
                ctx.showBossSelectMenu(partyBoss.Malitia.id, [1, 4]);
        }
}