// Created by MetaMS
// Boss: Suu

let event = stage.getEvent("boss_suu_extreme");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);
        let boss = map.makeMob(8881200);
        boss.changeHp(545000000000000);
        boss.setFieldActionType(1);
        boss.setFieldActionValue(4755);
        map.spawnMob(boss, 0, -16);//main dummy boss

        map.startEvent();
}