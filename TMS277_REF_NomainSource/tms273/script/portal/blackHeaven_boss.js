// Created by MetaMS
// ID:[350060300]
// MapName:核心入口
// 核心入口

let partyBoss = require("party_boss");
let startMap = 350060300;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Swoo, [1, 2, 4]);
}