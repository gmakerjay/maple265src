// Created by MetaMS
// [Unknown]  |  [93]
// MapName:賽爾尼溫廣場

let clearStage = stage.getIntQuestRecordEx(26205, "clearStage");
let txt = "好。準備好要聽故事了嗎？\r\n";
if (clearStage > 0) {
        txt += "#b從之前提到過的部分再次開始。#k";
}
if (party != null) {
        txt += "\r\n#r#e※組隊狀態中無法入場。入場時自動解除隊伍。#n#k";
}
if (npc.id(3006700).askYesNo(txt)) {
        /* Response is Yes */
        /* Update Quest RecordEx | Id:26200 | Name: Unknown | Data: "rMap=410000500" */
        stage.updateQuestRecordEx(26200, "rMap", map.getId());
        if (stage.getIntQuestRecordEx(26218, "dir") == 0) {
                stage.changeMap(993240000, 0);
        } else if (clearStage == 0) {
                stage.changeMap(993241000, 0);
        } else if (clearStage == 1) {
                stage.changeMap(993241010, 0);
        } else if (clearStage == 2) {
                stage.changeMap(993241020, 0);
        } else if (clearStage == 3) {
                stage.changeMap(993241030, 0);
        } else if (clearStage == 4) {
                stage.changeMap(993241040, 0);
        } else if (clearStage == 5) {
                stage.changeMap(993241050, 0);
        }
        //stage.changeMap(993240000, 0);
        //stage.changeMap(993241000, 0);
        //stage.changeMap(993241010, 0);
        //stage.changeMap(993241020, 0);
        //stage.changeMap(993241030, 0);
        //stage.changeMap(993241040, 0);
        //stage.changeMap(993241050, 0);
} else {
        /* Response is No */
        npc.id(3006700).next().say("準備好再來找我吧！");
}