// Created by MetaMS
// ID:[211070000]
// MapName:見面室前走道
// 見面室前走道

let partyBoss = require("party_boss");
let startMap = 211070000;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Vanleon, [0, 1, 2]);
}