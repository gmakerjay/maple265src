// Created by MetaMS
// ID:[270050100]
// MapName:神祇的黃昏
// 神祇的黃昏

let eventName;
switch (map.getId()) {
        case 270050100:
                eventName = "boss_pinkbeen_normal";
                break;
        case 270051100:
                eventName = "boss_pinkbeen_chaos";
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("npc") == null) {
        event.setVariable("npc", true);
        map.spawnNpc(2141000, -171, -49, 1);
}