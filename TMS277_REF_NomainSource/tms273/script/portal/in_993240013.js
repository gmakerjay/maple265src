// Created by MetaMS
// ID:[993241050]
// MapName:雪原封印區域入口
// 雪原封印區域入口

let clearStage = stage.getIntQuestRecordEx(26205, "clearStage");

usr.playPortalSE();
//stage.setTemporarySkillSet(0);
if (clearStage == 5) {
        stage.changeMap(993240013, 0);
} else if (clearStage == 6) {
        stage.changeMap(993240014, 0);
}
