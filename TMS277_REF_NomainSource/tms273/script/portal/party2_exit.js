// Created by MetaMS
// ID:[221023300]
// MapName:愛奧斯塔101樓<入場地圖>
// 愛奧斯塔101樓<入場地圖>

let rMap = stage.getQuestData(7842);
let portal = 0;
if (rMap == 0 || rMap == 221023200) {
        rMap = 221023200;
        portal = 1;
}
stage.completeQuest(7842);//Quest Name:Unknown
stage.changeMap(rMap, portal);