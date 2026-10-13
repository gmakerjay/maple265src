// Created by MetaMS
// ID:[875030200]
// MapName:紅月染紅之心

let event = stage.getEvent("boss_malitia_normal");
if (event != null && event.getVariable("boss1_1") == null) {
        event.setVariable("boss1_1", false);
        map.startEvent();
}