// Created by MetaMS
// [被遺忘的神殿管理人]  |  [2141001]
// MapName:被遺忘的黃昏

let partyBoss = require("party_boss");
let startMap = 270050000;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Pinkbeen, [1, 3]);
}