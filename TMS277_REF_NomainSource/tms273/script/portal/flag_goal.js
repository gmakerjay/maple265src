// Created by MetaMS
// ID:[942002500]
// MapName:夜晚的雪原
// 夜晚的雪原

/* Update Quest RecordEx | Id:32581 | Name: Unknown | Data: "complete=1;guildPoint=0;start=240817151858719;pass=1;lap=1;weekly=100;date=24/08/17/15/18;weeklyRecord=0;mode=1;record=184452;finish=240817152203171;rank=0" */
//stage.updateQuestRecordEx(32581, "complete=1;guildPoint=0;start=240817151858719;pass=1;lap=1;weekly=100;date=24/08/17/15/18;weeklyRecord=0;mode=1;record=184452;finish=240817152203171;rank=0");
let event = stage.getEvent();
if (event != null) {
        let endTime = new Date().getTime();
        let startTime = parseInt(event.getVariable("startTime"));
        let record = endTime - startTime;
        if (record >= 25000) {
                if ("1".equals(stage.getQuestRecordEx(32581, "mode"))) {
                        stage.updateQuestRecordEx(32581, "record", record);
                        stage.updateQuestRecordEx(32581, "finish", new Date().getTime());
                }
                stage.updateQuestRecordEx(32581, "complete", "1");
                stage.showScriptProgressMsg(stage.getCharacterName() + "成功跑完全程。");
                eff.uol("quest/party/clear").delay(-1).showScreenAutoLetterBox();
                usr.playPortalSE();
                switch (map.getId()) {
                        case 942000500:
                                stage.teleportToPortalId(3);
                                break;
                        case 942001500:
                                stage.teleportToPortalId(5);
                                break;
                        case 942002500:
                                stage.teleportToPortalId(3);
                                break;
                }
        } else {
                stage.teleportToPortalId(18);
        }
}