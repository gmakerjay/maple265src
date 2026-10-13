// Created by MetaMS
// MapName:殘暴炎魔祭壇

let event = stage.getEvent("boss_zakum_normal");
if (event != null && event.getVariable("boss") == null) {
        event.setVariable("boss", true);
        map.showSystemMessage("用原石的力量召喚炎魔!");
        for (let mobId = 8800003; mobId <= 8800010; mobId++) {
                map.spawnMob(mobId, -10, 85);
        }
        map.spawnMob(8800002, -10, 85);
        map.startEvent();
}