// Created by MetaMS
// [傳送門]  |  [3003560]
// MapName:鏡光神座

let partyBoss = require("party_boss");
let startMap = 450007240;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Will, [0, 1, 2]);
}