// Created by MetaMS
// Event Manage

if (stage.isGm()) {
        let text = "Select Game Event:#b\r\n" +
                "#L1#HPRS#l\r\n" +
                "#L2#Bingo#l\r\n";
        let response = npc.askMenu(text);
        switch (response) {
                case 1: {
                        let event = ctx.getEvent("event_rps");
                        if (event != null) {
                                if ("1".equals(event.getVariable("Open"))) {
                                        npc.say("剪刀石頭布活動已開啟，請不要重複開啟。");
                                } else {
                                        event.startTimer("Event_Open", 500);
                                        util.broadcastQuestOpen(100641, 30);
                                        npc.say("剪刀石頭布活動開啟成功！");
                                }
                        } else {
                                npc.say("剪刀石頭布活動指令碼不存在或者未設定載入。");
                        }
                        break;
                }
                case 2: {
                        let event = ctx.getEvent("event_bingo");
                        if (event != null) {
                                if ("1".equals(event.getVariable("Open"))) {
                                        npc.say("賓果遊戲活動已開啟，請不要重複開啟。");
                                } else {
                                        event.startTimer("Event_Open", 500);
                                        util.broadcastQuestOpen(1428, 30);
                                        npc.say("賓果遊戲活動開啟成功！");
                                }
                        } else {
                                npc.say("賓果遊戲活動指令碼不存在或者未設定載入。");
                        }
                        break;
                }
        }
}