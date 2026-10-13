// Created by MetaMS
// ID:[410011300]
// MapName:重現的邪念的空間

let event = stage.getEvent("boss_limbo_hard");
if (event != null && event.getVariable("boss2_c") == null) {
        event.setVariable("boss2_c", false);

        let spiritMob = map.makeMob(8881385);
        if (stage.isGm()) {
                spiritMob.changeHp(1)
        }
        spiritMob.setMinHpLimitR(80);
        map.spawnMob(spiritMob, 0, 0);

        let boss = map.makeMob(8881358);
        boss.changeHp(spiritMob.getMaxHp());
        boss.setSpiritEntityId(spiritMob.getEntityId());
        boss.setFieldActionType(1);
        boss.setMinHpLimitR(80);
        boss.setFieldActionValue(924571);

        spiritMob.setHpSync(boss);
        map.spawnMob(boss, 0, 0);

        map.spawnMob(8881357, 650, 1);
        map.spawnMob(8881359, 650, 1);
        map.spawnMob(8881360, -650, 1);
        map.startEvent();
}