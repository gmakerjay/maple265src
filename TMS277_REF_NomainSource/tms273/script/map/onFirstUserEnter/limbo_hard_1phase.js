// Created by MetaMS
// ID:[410011100]
// MapName:重現的真理的空間

let event = stage.getEvent("boss_limbo_hard");
if (event != null && event.getVariable("boss1") == null) {
        event.setVariable("boss1", false);

        let spiritMob = map.makeMob(8881356);
        if (stage.isGm()) {
                spiritMob.changeHp(1)
        }
        map.spawnMob(spiritMob, 0, 3);

        let boss = map.makeMob(8881350);
        boss.changeHp(spiritMob.getHp());
        boss.setSpiritEntityId(spiritMob.getEntityId());
        boss.initPatternSystemId(101001004);
        boss.setFieldActionType(1);
        boss.setFieldActionValue(924571);
        spiritMob.setHpSync(boss);
        map.spawnMob(boss, 0, 3);
        
        map.startEvent();
}