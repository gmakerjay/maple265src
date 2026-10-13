// Created by MetaMS
// ID:[925020000]
// MapName:武陵道場
// 武陵道場

let rMapId = 100000000;
let rMap = stage.getQuestData(1207);
if (rMap.length > 0) {
        rMapId = parseInt(rMap);
}
stage.startQuest(1207, "");//Quest Name:Unknown
stage.changeMap(rMapId, 0);