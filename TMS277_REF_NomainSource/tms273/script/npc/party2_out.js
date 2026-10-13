// Created by MetaMS
// ID:[922010000]
// MapName:遺棄之塔<冒險的終結>

if (map.getId() == 922010000) {
        stage.removeItemAll(4001022);
        stage.removeItemAll(4001023);
        stage.changeMap(221023300, 0);
} else {
        let str = "你確放棄任務,從這裡出去重新開始嗎?";
        if (npc.askYesNo(str)) {
                stage.changeMap(922010000, 0);
        }
}