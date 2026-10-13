// Created by MetaMS
// [傳送門]  |  [9091007]
// MapName:通風口D-77

if (npc.ui(1).npcFlip().meFlip().askYesNo("要回到原本的地方嗎？")) {
        /* Response is Yes */
        stage.showSystemMessage("前往主控室。");
        stage.changeMap(221030900, 0);
}