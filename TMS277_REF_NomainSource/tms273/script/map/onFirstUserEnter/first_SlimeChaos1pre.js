// Created by MetaMS
// ID:[160020000]
// MapName:拉姆拉姆神殿
// 拉姆拉姆神殿

let event = stage.getEvent("boss_slime_chaos");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(8880700, 531, -1089);
        map.spawnMob(8880702, 531, -1089);
        map.startEvent();
}