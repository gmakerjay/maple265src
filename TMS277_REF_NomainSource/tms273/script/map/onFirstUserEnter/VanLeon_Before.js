// Created by MetaMS
// ID:[211070300]
// MapName:見面室
// 見面室

let eventName;
switch (map.getId()) {
        case 211070300:
                eventName = "boss_vanleon_easy";
                break;
        case 211070400:
                eventName = "boss_vanleon_hard";
                break;
        case 211070500:
                eventName = "boss_vanleon_normal";
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("npc") == null) {
        event.setVariable("npc", true);
        map.spawnNpc(2161000, -6, -188, 1);
}