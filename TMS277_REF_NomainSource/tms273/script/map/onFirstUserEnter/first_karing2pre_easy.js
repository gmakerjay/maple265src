// Created by MetaMS
// ID:[410008160]
// MapName:殘酷的冬天
// 殘酷的冬天

let event = stage.getEvent("boss_karing_easy");
if (event != null && event.getVariable("boss4") == null) {
        event.setVariable("boss4", false);
        map.spawnMob(8880907, 1026, 106);
        map.spawnMob(8880908, 0, 106);
        map.startEvent();
}