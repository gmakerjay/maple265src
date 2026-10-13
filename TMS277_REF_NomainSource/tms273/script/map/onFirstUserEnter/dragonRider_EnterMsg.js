/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let event = stage.getEvent();
if (event != null) {
    switch (map.getId()) {
        case 240080300:
            if (event.getVariable("boss1") == null) {
                event.setVariable("boss1", true);
                map.spawnMob(8300006, 1550, 152);
            }
            break;
    }
}