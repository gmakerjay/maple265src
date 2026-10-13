// Created by MetaMS
// ID:[941000000]
// MapName:地下水道入口
// 地下水道入口

if (map.getId() == 941000000) {
        usr.playPortalSE();
        let returnMap = stage.getIntQuestRecordEx(100811, "rMap");
        stage.changeMap(returnMap, 0);
} else if (map.getId() == 941000200) {
        if (npc.id(2012041).askYesNo("要中斷挑戰嗎？\r\n\r\n#r#e※ 到目前為止獲得的分數將會消失。")) {
                /* Response is Yes */
                usr.playPortalSE();
                stage.changeMap(941000001, 0);
        }
} else if (npc.id(2012041).askYesNo("要放棄挑戰，回到地下水道入口嗎？")) {
        /* Response is Yes */
        usr.playPortalSE();
        stage.changeMap(941000001, 0);
}
