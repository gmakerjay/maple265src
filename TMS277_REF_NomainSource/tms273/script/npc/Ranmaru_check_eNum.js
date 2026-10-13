// Created by MetaMS
// [真田幸村]  |  [9130145]
// MapName:廢棄礦坑Ⅲ

if (stage.isQuestCompleted(65851)) {
        if (map.getId() == 211041700) {
                stage.changeMap(807300100, 0);
        }
} else {
        npc.id(9130145).ui(1).say("#face0#請先完成#b'#y65851#'#k 任務。");
}