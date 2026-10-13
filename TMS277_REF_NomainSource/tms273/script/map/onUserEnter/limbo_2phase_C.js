// Created by MetaMS
// ID:[410009100]
// MapName:重現的真理的空間

stage.resetForcedStat();
dir.duration(3000).text("應該可以利用淨化的氣息，阻止怪物暴走。").scale(300).addPopupSay();
let event = stage.getEvent("boss_limbo_normal");
if (event != null && event.getVariable("boss2_c") == null) {
        event.setVariable("boss2_c", false);

        let spiritMob = map.makeMob(8881335);
        spiritMob.setMinHpLimitR(80);
        map.spawnMob(spiritMob, 0, 0);

        let boss = map.makeMob(8881308);
        boss.changeHp(spiritMob.getMaxHp());
        boss.setSpiritEntityId(spiritMob.getEntityId());
        boss.setFieldActionType(1);
        boss.setMinHpLimitR(80);
        boss.setFieldActionValue(924571);

        spiritMob.setHpSync(boss);
        map.spawnMob(boss, 0, 0);

        map.spawnMob(8881307, 650, 1);
        map.spawnMob(8881309, 650, 1);
        map.spawnMob(8881310, -650, 1);
        map.startEvent();
}