// Created by MetaMS
// Event
// 賓果遊戲

let event = ctx.getEvent("event_bingo");
if (event != null) {
        switch (map.getId()) {
                case 922290000: //等待地圖
                        if (npc.askYesNo("#r#e[主題活動 - 賓果遊戲]#k#n\r\n\r\n怎麼不想等到活動開始進行就要離開這裡了嗎？")) {
                                npc.next().say("#r#e[主題活動 - 賓果遊戲]#k#n\r\n\r\n好的那我送你回到原來的地方。");
                                let rMap = stage.getIntQuestRecordEx(100642, "rMap");
                                if (rMap == 0) {
                                        rMap = 100000000;
                                }
                                stage.changeMap(rMap, 0);
                        }
                        break;
                case 922290100://活動進行地圖
                        npc.say("#r#e[主題活動 - 賓果遊戲]#k#n\r\n\r\n選擇正確答案吧，答對可以獲得積分，積分可以兌換好多獎勵！！加油喲！");
                        break;
                case 922290200://活動結束地圖
                        let sel = npc.askMenu("#r#e[主題活動 - 賓果遊戲]#k#n\r\n\r\n你好，你想要做什麼呢？\r\n#b#L0#檢視我的活動獎勵#l\r\n#b#L1#我要離開這裡#l");
                        switch (sel) {
                                case 0:
                                        stage.runScript("expand/bingo_reward");
                                        break;
                                case 1:
                                        npc.next().say("#r#e[主題活動 - 賓果遊戲]#k#n\r\n\r\n好的那我送你回到原來的地方。");
                                        let rMap = stage.getIntQuestRecordEx(100642, "rMap");
                                        if (rMap == 0) {
                                                rMap = 100000000;
                                        }
                                        stage.changeMap(rMap, 0);
                                        break;
                        }
                        break;
        }
} else {
        npc.next().say("#r#e[主題活動 - 賓果遊戲]#k#n\r\n\r\n活動好像有點問題，並沒有開放哦。");
        stage.changeMap(100000000, 0);
}
