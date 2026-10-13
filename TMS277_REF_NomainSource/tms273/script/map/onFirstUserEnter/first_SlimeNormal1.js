// Created by MetaMS
// ID:[160040000]
// MapName:拉姆拉姆神殿
// 拉姆拉姆神殿

let event = stage.getEvent("boss_slime_normal");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        map.spawnMob(8880711, 531, -1089);
        map.spawnMob(8880713, 531, -1089);
        map.startEvent();
}