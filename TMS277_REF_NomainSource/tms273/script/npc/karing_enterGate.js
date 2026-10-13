// Created by MetaMS
// [通往失去光芒的四季的大門]  |  [3006193]
// MapName:四季停駐的樓閣

let partyBoss = require("party_boss");
let startMap = 410007025;

if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Karing, [0, 1, 2, 4]);
}