// Created by MetaMS
// ID:[450011990]
// MapName:慾望祭壇入口
// 慾望祭壇入口

let partyBoss = require("party_boss");
let startMap = 450011990;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.JinHillah, [1, 2]);
}