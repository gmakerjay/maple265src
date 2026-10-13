// Created by MetaMS
// [傳送門]  |  [3004542]
// MapName:王宮大廳

let partyBoss = require("party_boss");
let startMap = 410000670;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Seren, [1, 2, 4]);
}