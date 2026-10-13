// Created by MetaMS
// ID:[105200210]
// MapName:午後的茶桌
// 午後的茶桌

let event = stage.getEvent("boss_pierre_normal");
if (event != null && event.getVariable("boss") == null) {
        map.blowWeather(5120098, "誠心的歡迎您來到比艾樂的下午茶派對!", 3);
        event.setVariable("boss", false);
        let mob = map.makeMob(8900100);
        mob.setFieldActionType(1);
        mob.setFieldActionValue(0x28);
        map.spawnMob(mob, 1000, 551);
        map.startEvent();
}