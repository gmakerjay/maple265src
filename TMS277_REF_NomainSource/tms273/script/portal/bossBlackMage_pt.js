// Created by MetaMS
// ID:[450012500]
// MapName:巨人的心臟
// 巨人的心臟
let partyBoss = require("party_boss");

let startMap = 450012500;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.BlackMage, [2, 4]);
}