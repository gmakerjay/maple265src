// Created by MetaMS
// ID:[410011500]
// MapName:重現的邪念的空間

let event = stage.getEvent("boss_limbo_hard");
if (event != null && event.getVariable("boss2_d") == null) {
        event.setVariable("boss2_d", false);

        let spiritMob = map.makeMob(8881385);
        if (stage.isGm()) {
                spiritMob.changeHp(2)
        }
        spiritMob.setHp(spiritMob.getMaxHp() / 2);
        map.spawnMob(spiritMob, 0, -13);

        let boss = map.makeMob(8881365);
        boss.changeHp(spiritMob.getMaxHp());
        boss.setSpiritEntityId(spiritMob.getEntityId());
        boss.setFieldActionType(1);
        boss.setFieldActionValue(924571);

        spiritMob.setHpSync(boss);
        map.spawnMob(boss, 0, -13);

        map.spawnMob(8881366, 650, -13);
        map.spawnMob(8881367, 650, -13);
        map.startEvent();
}