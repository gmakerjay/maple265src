// Created by MetaMS
// Quest ID:66998
// [星夜馬戲團] 出發前往夜晚的武陵！


if (npc.id(9401981).askYesNo("現在武陵正在舉辦夢想和幻想的天燈慶典！\r\n怎麼樣，要現在立刻前往#b<星夜馬戲團>#k慶典會場嗎？呵呵呵。")) {
        /* Response is Yes */
        stage.updateQuestRecordEx(66998, "rMap", map.getId());
        stage.changeMap(867168000, 0);
}