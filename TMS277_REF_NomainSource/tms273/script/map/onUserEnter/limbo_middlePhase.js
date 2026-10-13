// Created by MetaMS
// ID:[410009100]
// MapName:重現的真理的空間

stage.resetForcedStat();
dir.duration(3000).text("邪念之牆跳到邪念碎片上面，消滅對面的根源之影吧。").scale(300).addPopupSay();
let event = stage.getEvent("boss_limbo_normal");
if (event != null && event.getVariable("boss2_middle") == null) {
        event.setVariable("boss2_middle", false);
        event.startTimer("2Phase_Middle_End", 30000);
        map.startEvent();
}