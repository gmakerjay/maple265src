// Created by MetaMS
// [梅迪沙]  |  [2184000]
// MapName:希拉之塔入口


let partyBoss = require("party_boss");
let startMap = 262030000;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Hillah, [1, 2]);
}