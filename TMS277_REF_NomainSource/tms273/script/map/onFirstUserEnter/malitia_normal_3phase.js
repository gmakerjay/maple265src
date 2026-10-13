// Created by MetaMS
// ID:[875030700]
// MapName:紅月消失處

let event = stage.getEvent("boss_malitia_normal");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        map.startEvent();
}