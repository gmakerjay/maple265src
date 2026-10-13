// Created by MetaMS
// ID:[993234800]
// MapName:入場準備
// 入場準備

if (map.getId() == 993234700) {
        let rMap = stage.getIntQuestRecordEx(101615, "rMap");
        stage.changeMap(rMap, 0);
} else if (map.getId() == 993234800) {
        if (npc.id(9063063).askYesNo("啊，你想返回待機室嗎？")) {
                stage.changeMap(993234700, 0);
        }
} else if (map.getId() == 993234900) {
        if (npc.id(9063063).askYesNo("要中斷挑戰前往出口嗎？\r\n\r\n#r#e※ 截至目前為止獲得的分數不列入計算。")) {
                /* Response is Yes */
                usr.playPortalSE();
                stage.changeMap(993234701, 0);
        }
}