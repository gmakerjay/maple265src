// Created by MetaMS
// ID:[272020110]
// MapName:阿卡伊農的祭壇前
// 阿卡伊農的祭壇前

let partyBoss = require("party_boss");
let startMap = 272020110;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Akayrum, [0, 1]);
}