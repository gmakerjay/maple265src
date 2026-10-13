/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * sean 腳本訂製 劇情製作 DC <alicems_online>
 *
 */

let event = stage.getEvent();
if (event != null) {
    if (event.getVariable('stage_4_clear') == null) {
        event.setVariable('stage_4_clear', String(0));
    }
    let stage_4_clear = parseInt(event.getVariable('stage_4_clear'));
    stage_4_clear += 1;
    event.setVariable('stage_4_clear', String(stage_4_clear));
    stage.dropMessage(11, "入口已關閉 !");
}