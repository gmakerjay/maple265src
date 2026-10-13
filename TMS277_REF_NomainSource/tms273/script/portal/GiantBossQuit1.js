// Created by MetaMS
// ID:[863010100]
// MapName:往培羅德
// 往培羅德

if (npc.id(9390120).askYesNo("如果現在離開，在完成組隊的挑戰之前無法回來。這樣也要離開嗎？")) {
        /* Response is Yes */
        usr.playPortalSE();
        stage.changeMap(863010000, 0);
}