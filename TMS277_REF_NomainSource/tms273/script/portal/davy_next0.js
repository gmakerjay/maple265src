/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let event = stage.getEvent();
if (event != null) {
    if (stage.hasItem(4001117, 7) && map.getActiveMobCount() === 0) {
        let members = party.getLocalMembers();
        for (let i in members) {
            members[i].changeMap(925100100, 0);
        }
        stage.removeItemAll(4001117);
    } else {
        stage.addPopupSay(2094002, 5000, "#face0#請收集老海盜箱子裡的鑰匙 7 個並消滅所有怪物,否則無法通過！", "", false);
    }
}