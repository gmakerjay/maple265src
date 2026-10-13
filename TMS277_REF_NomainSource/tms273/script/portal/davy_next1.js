/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let event = stage.getEvent();
if (event != null) {
    let isequip = [4001120, 4001121, 4001122];
    let judge = true;
    for (let i in isequip) {
        if (!stage.hasItem(isequip[i], 50)) judge = false;
    }
    if (!judge) {
        stage.addPopupSay(2094002, 5000, "#face0#請收集 50個 初級 中級 高級 海賊的徽章!！", "", false);
    } else {
        let members = party.getLocalMembers();
        for (let i in members) {
            members[i].changeMap(925100200, 0);
        }
        for (let i in isequip) {
            stage.removeItemAll(isequip[i]);
        }
    }
}
