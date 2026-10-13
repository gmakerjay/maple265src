// Created by MetaMS
// ID:[871000000]
// MapName:广场
// 广场


if (stage.isQuestStarted(64605) && !"1".equals(stage.getQuestRecordEx(64605, "chk"))) {
        /* Update Quest RecordEx | Id:64605 | Name: [我的小屋]另一个我的小屋？ | Data: "chk=1" */
        stage.updateQuestRecordEx(64605, "chk", "1");
        stage.changeMap(871000014, 0);
} else {
        stage.changeMap(871000001, 0);
}