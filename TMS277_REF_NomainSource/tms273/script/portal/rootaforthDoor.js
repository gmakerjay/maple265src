// Created by MetaMS
// ID:[105200000]
// MapName:巨大根基
// 巨大根基

let partyBoss = require("party_boss");
let startMap = 105200000;

if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Bellum, [1, 3]);
}
