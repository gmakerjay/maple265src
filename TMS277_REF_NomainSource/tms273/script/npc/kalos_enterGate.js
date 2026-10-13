// Created by MetaMS
// [大門]  |  [3005266]
// MapName:摩天塔

let partyBoss = require("party_boss");
let startMap = 410005005;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Kalos, [1, 3,4]);
        // ctx.showBossSelectMenu(partyBoss.Kalos, [0, 1, 2, 4]);
}