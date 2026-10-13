/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let event = stage.getEvent();
if (event != null) {
    if (npc.id(2094002).askYesNo("現在要離開副本嗎?") === 1) {
        stage.changeMap(251010404, 0);
    }
}