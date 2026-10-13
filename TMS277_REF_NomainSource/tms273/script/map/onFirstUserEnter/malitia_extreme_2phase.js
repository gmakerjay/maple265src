// Created by MetaMS
// ID:[875030400]
// MapName:崩毀的上坡

let event = stage.getEvent("boss_malitia_extreme");
if (event != null) {
        if (event.getVariable("boss2") == null) {
                event.setVariable("boss2", false);
                map.startEvent();
        } else {
                cam.type(1).delay(0).rate(700).setScaleRate();
        }
}