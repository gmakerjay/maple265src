/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

marinStart();

function marinStart() {
    if (npc.meFlip().askYesNo("使用可以擴充 傷害自行儲存欄位 1 格！現在要進行擴充嗎？") == 1) {
        stage.increaseDamageSkinSlot(1)
        stage.loseItem(ctx.getDataId(), 1);
    }
}