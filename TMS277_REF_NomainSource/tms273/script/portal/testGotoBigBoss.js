// Created by MetaMS
// ID:[863010000]
// MapName:愛心樹的記憶
// 愛心樹的記憶

var log = require('check_log');
let partyBoss = require("party_boss"); 
if ([15212, 15412, 2217].includes(stage.getJob()) && log.getPQLog(stage, db, '每日貝勒鑰匙') == 0) {
    log.addPQLog(stage, db, '每日貝勒鑰匙')
    if (!stage.hasItem(4033981, 1)) {
        stage.gainItem(4033981, 1)
    }
} 
ctx.showBossSelectMenu(partyBoss.Beidler, [1]);