// Created by MetaMS
// ID:[875030100]
// MapName:紅月下
// 紅月下

let event = stage.getEvent();
if (event != null && "1".equals(event.getVariable("P1_Next"))) {
        let tField = event.getMap(map.getId() + 100);
        if (tField.getPlayerCount() < 2) {
                stage.changeMap(map.getId() + 100, 0);
        }
}