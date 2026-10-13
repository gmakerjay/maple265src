/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let event = stage.getEvent();
if (event != null) {
    if (event.getVariable("boss2")) {
        if (npc.id(9020016).askYesNo("恭喜~完成了御龍魔!!要領取獎勵並離開副本嗎?") === 1) {
            stage.changeMap(100030301, 0);
        }
    } else {
        if (npc.id(9020016).askYesNo("沒有消滅御龍魔!確認要離開當前副本嗎?") === 1) {
            stage.changeMap(100030301, 0);
        }
    }
}