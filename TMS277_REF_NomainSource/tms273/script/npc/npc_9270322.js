// Created by MetaMS
// [達利額]  |  [9270322]
// MapName:激鬥陣地入口

if (map.getId() == 921174100 || map.getId() == 921174900) {
        if (stage.checkNearby(ctx.getEntityPosX(), ctx.getEntityPosY(), 200)) {
                if (npc.ui(1).noEsc().askYesNo("要馬上離開嗎？")) {
                        /* Response is Yes */
                        stage.changeMap(921174008, 0);
                }
        } else {
                stage.showSystemMessage("請靠近達利額並進行對話。");
        }
} else {
        let total = stage.getIntWorldShareRecord(256, "count");
        let win = stage.getIntWorldShareRecord(256, "win");
        let selection = npc.id(9270322).askMenu("要參加#b#e虛擬戰鬥#k#n嗎？\r\n#e累積勝利次數：" + win + "次#k\r\n#e累積失敗次數：" + (total - win) + "次#k\r\n\r\n#L1##r<戰鬥吧！傳說的回歸>#n實戰模式#k#l\r\n#L2##r<戰鬥吧！傳說的回歸>#n練習模式#k#l\r\n\r\n#L99#現在不想參加。#l");
        if (selection == 1) {
                stage.showGameMatchingOpen(0xA);
        } else if (selection == 2) {
                if (npc.id(9270322).askYesNo("已選擇#b練習模式#k。可透過練習模式獨自進入戰場，測試各種角色。\r\n要馬上開始嗎？")) {
                        let stages = [];
                        stages.push(stage);
                        if (ctx.makeEvent("event_battle_pvp_practice", false, stages) == null) {
                                npc.say("發生未知錯誤！");
                        }
                }
        }
}