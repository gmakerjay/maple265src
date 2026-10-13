// Created by MetaMS
// ID:[410011400]
// MapName:真理的反面存在之處

let event = stage.getEvent("boss_limbo_hard");
if (event != null && event.getVariable("boss2_middle") == null) {
        event.setVariable("boss2_middle", false);
        event.startTimer("2Phase_Middle_End", 30000);
        map.startEvent();
}