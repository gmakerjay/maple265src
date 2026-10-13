// Created by MetaMS
// ID:[921174007]
// MapName:激鬥陣地入口
// 激鬥陣地入口


if (npc.id(9270321).askYesNo("確定要返回#e#b主賽場#n#k嗎？")){
        /* Response is Yes */
        usr.playPortalSE();
        stage.changeMap(993244300, 0);
}
