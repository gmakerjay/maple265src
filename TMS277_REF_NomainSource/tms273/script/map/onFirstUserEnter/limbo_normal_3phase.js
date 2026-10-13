// Created by MetaMS
// ID:[410009700]
// MapName:解放之樹頂端

let event = stage.getEvent("boss_limbo_normal");
if (event != null && event.getVariable("boss3") == null) {
        event.setVariable("boss3", false);

        let spiritMob = map.makeMob(8881332);
        map.spawnMob(spiritMob, 0, -19);

        let boss = map.makeMob(8881320);
        boss.changeHp(spiritMob.getHp());
        boss.setSpiritEntityId(spiritMob.getEntityId());
        boss.initPatternSystemId(102300005);
        boss.setFieldActionType(1);
        boss.setFieldActionValue(1232762);
        spiritMob.setHpSync(boss);
        map.spawnMob(boss, 0, -19);

        map.spawnMob(8881321, 0, -19);
        map.spawnMob(8881322, 0, -19);
        map.spawnMob(8881345, 0, -19);

        map.startEvent();
}