// Created by MetaMS
// ID:[875030100]
// MapName:紅月下

let event = stage.getEvent("boss_malitia_normal");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.startEvent();
}