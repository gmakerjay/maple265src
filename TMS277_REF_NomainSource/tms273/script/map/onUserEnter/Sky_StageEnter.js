/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */
let event = stage.getEvent();
if (event != null) {
    switch (map.getId()) {
        case 240080500:
            let skillId = util.getNoviceSkill(1026, stage.getJob());
            stage.cancelBuffStat(-skillId);

            if (event.getVariable("boss2") == null) {
                event.setVariable("boss2", true);
                map.spawnMob(8300007, 250, -10);
            }
            break;
    }
}
