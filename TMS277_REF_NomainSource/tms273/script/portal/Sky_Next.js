/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let stage_map = parseInt((map.getId() - 240080000) / 100);
let event = stage.getEvent();
if (event != null) {
    let clear = map.getId() == 240080400 ? true : map.getActiveMobCount() <= 0;
    if (clear != null && clear) {
        stage.changeMap(map.getId() + 100, 0);
    } else {
        stage.addPopupSay(9020016, 5000, "#face0#抱歉請檢查是否清理完了所有怪物！", "", false);
    }
}
