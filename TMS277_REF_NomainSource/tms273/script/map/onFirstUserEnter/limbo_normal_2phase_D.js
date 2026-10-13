// Created by MetaMS
// ID:[410009500]
// MapName:重現的邪念的空間

let event = stage.getEvent("boss_limbo_normal");
if (event != null && event.getVariable("boss2_d") == null) {
        event.setVariable("boss2_d", false);

        let spiritMob = map.makeMob(8881335);
        spiritMob.setHp(spiritMob.getMaxHp() / 2);
        map.spawnMob(spiritMob, 0, -13);

        let boss = map.makeMob(8881315);
        boss.changeHp(spiritMob.getMaxHp());
        boss.setSpiritEntityId(spiritMob.getEntityId());
        boss.setFieldActionType(1);
        boss.setFieldActionValue(924571);

        spiritMob.setHpSync(boss);
        map.spawnMob(boss, 0, -13);

        map.spawnMob(8881316, 650, -13);
        map.spawnMob(8881317, 650, -13);
        map.startEvent();
}