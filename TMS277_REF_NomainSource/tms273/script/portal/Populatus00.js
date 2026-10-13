// Created by MetaMS
// ID:[220080000]
// MapName:時間塔的隱祕場所
// 時間塔的隱祕場所

let partyBoss = require("party_boss");
let startMap = 220080000;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Papulatus, [0, 1, 3]);
}