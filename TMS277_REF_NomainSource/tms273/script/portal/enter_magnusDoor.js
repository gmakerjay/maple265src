// Created by MetaMS
// ID:[401060000]
// MapName:赫力席母最上層入口
// 赫力席母最上層入口

let partyBoss = require("party_boss");
let startMap = 401060000;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Magnus, [0, 1, 2]);
}