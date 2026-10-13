// Created by MetaMS
// ID:[921160000]
// MapName:隱藏之塔入口<入場地圖>
// 隱藏之塔入口<入場地圖>


let rMap = stage.getQuestData(7890);
let portal = 0;
if (rMap == 0 || rMap == 211060200) {
        rMap = 211060200;
}
stage.completeQuest(7890);//Quest Name:Unknown
stage.changeMap(rMap, portal);