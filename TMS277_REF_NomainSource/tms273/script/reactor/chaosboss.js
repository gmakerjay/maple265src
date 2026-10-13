// Created by MetaMS
// MapName:混沌殘暴炎魔祭壇

let event = stage.getEvent("boss_zakum_chaos");
if (event != null && event.getVariable("boss") == null) {
        event.setVariable("boss", true);
        map.showSystemMessage("用原石的力量召喚炎魔!");
        for (let mobId = 8800103; mobId <= 8800110; mobId++) {
                map.spawnMob(mobId, -10, 85);
        }
        map.spawnMob(8800102, -10, 85);
        map.startEvent();
}