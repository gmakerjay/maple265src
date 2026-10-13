/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * mortal 腳本訂製 技術顧問 50009219
 */
let event = stage.getEvent();
if (event != null) {
    if (event.getVariable("boss") == null) {
        let mob = map.makeMob(9500532);
        mob.changeHp(10 * 1E12);
        map.spawnMob(mob, -22, -21);
        event.setVariable("boss", true);
    }
}
