// Created by MetaMS
// ID:[10500110]
// MapName:時間之空隙
// 時間之空隙

let event = stage.getEvent();
if (event != null && "0".equals(event.getVariable("BTZ_DONE"))) {
        stage.changeMap(map.getId() + 10, 0);
}