/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let event = stage.getEvent();
if (event != null) {
    if (event.getVariable("stage_4_clear") === String(4)) {
        let members = party.getLocalMembers();
        for (let i in members) {
            members[i].changeMap(925100500, 0);
        }
        stage.removeItemAll(4001117);
    } else {
        stage.addPopupSay(2094002, 5000, "#face0#請關閉所有入口,否則無法通過！", "", false);
    }
}