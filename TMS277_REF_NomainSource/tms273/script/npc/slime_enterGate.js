// Created by MetaMS
// [神秘的石像]  |  [1013500]
// MapName:守護天使綠水靈的祭壇

let partyBoss = require("party_boss");
let startMap = 160000000;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Slime, [1, 3]);
}