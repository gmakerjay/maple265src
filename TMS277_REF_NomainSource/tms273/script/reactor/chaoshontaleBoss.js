// Created by MetaMS
// ID:[240060202]
// MapName:混沌闇黑龍王的洞窟
// 混沌闇黑龍王的洞窟

let event = stage.getEvent("boss_hontale_chaos");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);
        event.startTimer("Hontale", 2000);
}