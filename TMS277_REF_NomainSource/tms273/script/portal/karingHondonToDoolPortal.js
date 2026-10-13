// Created by MetaMS
// ID:[410007220]
// MapName:失去色彩的秋天
// 失去色彩的秋天

let event = stage.getEvent();
if (event != null && "1".equals(event.getVariable("Clear_B3"))) {
        usr.playPortalSE();
        stage.changeMap(map.getId() - 40, 0);
}