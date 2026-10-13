// Created by MetaMS
// ID:[410007180]
// MapName:失去光明的夏天
// 失去光明的夏天

let event = stage.getEvent();
if (event != null && "1".equals(event.getVariable("Clear_B2"))) {
        usr.playPortalSE();
        stage.changeMap(map.getId() + 40, 0);
}