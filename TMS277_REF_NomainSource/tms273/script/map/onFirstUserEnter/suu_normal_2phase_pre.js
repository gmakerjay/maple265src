// Created by MetaMS
// Boss: Suu

let event = stage.getEvent("boss_suu_normal");
if (event != null && event.getVariable("boss2") == null) {
        event.setVariable("boss2", false);
        let boss = map.makeMob(8881101);
        boss.changeHp(400000000000);
        boss.setFieldActionType(1);
        boss.setFieldActionValue(4755);
        map.spawnMob(boss, 515, 97);//main boss

        map.startEvent();
}