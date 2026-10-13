// Created by MetaMS
// ID:[105300303]
// MapName:前往世界樹頂端的通道
// 前往世界樹頂端的通道

let partyBoss = require("party_boss");
let startMap = 105300303;
if (map.getId() == startMap) {
        ctx.showBossSelectMenu(partyBoss.Demian, [1, 2]);
}