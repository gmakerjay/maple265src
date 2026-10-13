// Created by MetaMS
// ID:[240060200]
// MapName:闇黑龍王洞穴
// 闇黑龍王洞穴

let event = stage.getEvent("boss_hontale_normal");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        event.startTimer("Hontale", 2000);
}