// Created by MetaMS
// [菖蒲]  |  [9130100]
// MapName:比叡山本堂前

let partyBoss = require("party_boss");
let startMap = 811000999;

if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.PrincessNo, [1]);
}