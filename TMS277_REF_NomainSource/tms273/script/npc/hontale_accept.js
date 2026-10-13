// Created by MetaMS
// [遠征隊的標識]  |  [2083004]
// MapName:闇黑龍王洞穴入口

let partyBoss = require("party_boss");
let startMap = 240050400;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Hontale, [0, 1, 3]);
}