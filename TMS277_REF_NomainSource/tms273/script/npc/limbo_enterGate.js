// Created by MetaMS
// [通往重現空間的大門]  |  [3006558]
// MapName:被淚水浸滿的神殿

let partyBoss = require("party_boss");
let startMap = 410007601;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Limbo, [1, 2]);
}