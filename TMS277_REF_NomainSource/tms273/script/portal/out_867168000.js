// Created by MetaMS
// ID:[867168000]
// MapName:星夜馬戲團武陵慶典會場
// 星夜馬戲團武陵慶典會場


if (npc.id(9401981).askYesNo("要回到當初來的地方嗎？不用擔心，直到活動結束為止，隨時都可以回到慶典現場！")) {
        /* Response is Yes */
        usr.playPortalSE();
        let rMap = stage.getIntQuestRecordEx(66998, "rMap");
        stage.changeMap(rMap, 0);
}