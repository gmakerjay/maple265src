// Created by MetaMS
// ID:[410007140]
// MapName:失去生氣的春天
// 失去生氣的春天

let event = stage.getEvent();
if (event != null && "1".equals(event.getVariable("Clear_B1"))) {
        usr.playPortalSE();
        stage.changeMap(map.getId() + 80, 0);
}