// Created by MetaMS
// ID:[240060102]
// MapName:試煉之穴2
// 試煉之穴2

let eventName;
let mobId;
switch (map.getId()) {
        case 240060100:
                eventName = "boss_hontale_normal";
                mobId = 8810025;
                break;
        case 240060101:
                eventName = "boss_hontale_chaos";
                mobId = 8810129;
                break;
        case 240060102:
                eventName = "boss_hontale_easy";
                mobId = 8810201;
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        map.spawnMob(mobId, -350, 260);
        party.showNoticeWithoutPrefix("洞穴深處有巨大的生物在靠近。");
        map.startEvent();
}