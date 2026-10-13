// Created by MetaMS
// [傳送門]  |  [3003561]
// MapName:回折的迴廊

if (npc.ui(1).npcFlip().meFlip().askYesNo("這地方很危險。要放棄戰鬥到外面去嗎？\r\n#b(移動到鏡子內照耀的地方。)#k")) {
        /* Response is Yes */
        stage.showSystemMessage("移動到鏡子內照耀的地方。");
        stage.changeMap(450007240, 0);
}