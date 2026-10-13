// Created by MetaMS
// ID:[871000000]
// MapName:广场


/* Update Quest RecordEx | Id:500767 | Name: Unknown | Data: "2=1;3=1;entrance=0;7=1;managerXpos=100;managerYpos=100" */
//stage.updateQuestRecordEx(500767, "2=1;3=1;entrance=0;7=1;managerXpos=100;managerYpos=100");
/* Update Quest RecordEx | Id:501185 | Name: [我的小屋]即将到来的冬天 | Data: "" */
//stage.updateQuestRecordEx(501185, "");
if (stage.getQuestRecordExShare(500767, "entrance").length == 0) {
        stage.updateQuestRecordExShare(500767, "entrance", "0");
}
if (stage.isQuestStarted(64597) || stage.isQuestCompleted(64597) && !stage.isQuestCompleted(64598)) {
        stage.setPartner(true, 9400928, 80011836, false);
}
if (stage.isQuestStarted(64605)) {
        stage.setPartner(true, 9400928, 80011836, false);
        stage.setPartner(true, 9400929, 80011837, false);
        stage.startNavigation(871000000, 0, "goKenneth", 0);
}
let entity_11 = stage.spawnTempNpc(9400926, 500, 300, 1);
stage.setNpcSpecialAction(entity_11, "summon", 0, false);
let entity_12 = stage.spawnTempNpc(9400927, 600, 300, 1);
stage.setNpcSpecialAction(entity_12, "summon", 0, false);
let entity_13 = stage.spawnTempNpc(9400925, -504, 318, 5);//NpcName:entity_13