// Created by MetaMS
// Event
// [AWAKE] 賓果


function start () {
        let event = ctx.getEvent("event_bingo");
        if (event == null || stage.getChannelId() != 1) {
                npc.say("活動未启用！");
        } else {
                if ("1".equals(event.getVariable("Open"))) {
                        if (npc.noEsc().askAccept("#e[ 百人賓果！]#n\r\n\r\n百人賓果遊戲即將開啟，要來體驗下樂趣嗎？\r\n\r\n#b（同意後將切換#r頻道#k前往等待地圖）。")) {
                                stage.updateQuestRecordEx(100642, "rMap", String(map.getId()));
                                
                                stage.setEvent(event)
                                stage.changeMap(922290000, 1);
                        } else {
                                /* Response is No */
                                npc.say("嗯……好的, 你去看看其他遊戲吧。真是遺憾……");
                        }
                } else {
 
                        if (check()) {
                                        event.startTimer("Event_Open", 500);
                                        util.broadcastQuestOpen(100642, 30); 
                                        util.log("賓果遊戲活動開啟成功！"); 
                        } else {
                                npc.say("活動未開放。");
                        }
                }
        }

}

function check () {
        let now = new Date();
        let day = now.getDay();      // 星期几（0=周日，1=周一，..., 6=周六）
        let hour = now.getHours();   // 当前小时（0~23）
        let minute = now.getMinutes();
        let second = now.getSeconds();

        let isTargetDay = [2, 4, 6].includes(day);  // 周二、周四、周六
        let isTargetTime = (hour == 21 && minute == 0);  // 20:00 ~ 20:01

        if (isTargetDay && isTargetTime) {
        // 当前时间是周二/四/六 且时间在 20:00 ~ 20:01 内
        // ✅ 执行目标逻辑
                return true;
        } else {
                return false;
        }
}

start();
