// Created by MetaMS
// [防毒面具]  |  [3003208]
// MapName:惡夢時間塔

let partyBoss = require("party_boss");
let startMap = 450004000;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Lucid, [0, 1, 2]);
}