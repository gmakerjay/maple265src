// Created by MetaMS
// ID:[410009700]
// MapName:解放之樹頂端

let event = stage.getEvent("boss_limbo_hard");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);

        let spiritMob = map.makeMob(8881382);
        if (stage.isGm()) {
                spiritMob.changeHp(2)
        }
        map.spawnMob(spiritMob, 0, -19);

        let boss = map.makeMob(8881370);
        boss.changeHp(spiritMob.getHp());
        boss.setSpiritEntityId(spiritMob.getEntityId());
        boss.initPatternSystemId(102301005);
        boss.setFieldActionType(1);
        boss.setFieldActionValue(1232762);
        spiritMob.setHpSync(boss);
        map.spawnMob(boss, 0, -19);

        map.spawnMob(8881371, 0, -19);
        map.spawnMob(8881372, 0, -19);
        map.spawnMob(8881395, 0, -19);

        map.startEvent();
}