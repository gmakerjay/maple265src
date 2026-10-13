/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */


let txt = "請選擇你想變更的膚色\r\n\r\n";
txt += "#L0#紅暈花瓣護膚變更#l\r\n";
txt += "#L1#花瓣護膚變更#l\r\n";
let sel = npc.meFlip().askMenu(txt);

if (1 === npc.meFlip().askYesNo("確認應用當前膚色嗎?")) {
    (sel === 0 ? stage.setSkin(16) : stage.setSkin(9))
    stage.loseItem(ctx.getDataId(), 1);
}