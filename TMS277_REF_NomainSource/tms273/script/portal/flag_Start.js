// Created by MetaMS
// ID:[942002500]
// MapName:夜晚的雪原
// 夜晚的雪原

let event = stage.getEvent();
if (event != null) {
        if ("1".equals(event.getVariable("start"))) {
                usr.playPortalSE();
                stage.showSystemMessage(map.getId())
                if (map.getId() == 912000500 || map.getId() == 942000500) {
                        stage.teleportToPortalId(16);
                } else {
                        stage.teleportToPortalId(18);
                }
        } else {
                stage.showSystemMessage("稍後旗幟爭奪戰即將開始。請再稍等一下！");
        }
} else {
        stage.showSystemMessage("发生错误！請再稍等一下！");
}