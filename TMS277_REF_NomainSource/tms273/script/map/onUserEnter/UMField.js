// Created by MetaMS
// ID:[913050010]
// MapName:聯盟會議場


// [LP_SetMindDelveResult] [00 00 00 00 ]
eff.uol("Bgm45.img/Heroes Of Maple Theme Piano").changeBGM();
/* Update Quest RecordEx | Id:33909 | Name: Unknown | Data: "1=0" */
//stage.updateQuestRecordEx(33909, "1=0");
/* Update Quest RecordEx | Id:33909 | Name: Unknown | Data: "1_5=0;1=0" */
//stage.updateQuestRecordEx(33909, "1_5=0;1=0");
/* Update Quest RecordEx | Id:33909 | Name: Unknown | Data: "1_5=0;1=0;2=0" */
//stage.updateQuestRecordEx(33909, "1_5=0;1=0;2=0");
/* Update Quest RecordEx | Id:33909 | Name: Unknown | Data: "1_5=0;1=0;2=0;3=0" */
//stage.updateQuestRecordEx(33909, "1_5=0;1=0;2=0;3=0");
/* Update Quest RecordEx | Id:33909 | Name: Unknown | Data: "1_5=0;1=0;2=0;3=0;4=0" */
//stage.updateQuestRecordEx(33909, "1_5=0;1=0;2=0;3=0;4=0");
/* Update Quest RecordEx | Id:34008 | Name: Unknown | Data: "0=0" */
//stage.updateQuestRecordEx(34008, "0=0");
/* Update Quest RecordEx | Id:34008 | Name: Unknown | Data: "0=0;1=0" */
//stage.updateQuestRecordEx(34008, "0=0;1=0");
/* Update Quest RecordEx | Id:34008 | Name: Unknown | Data: "0=0;1=0;2=0" */
//stage.updateQuestRecordEx(34008, "0=0;1=0;2=0");
/* Update Quest RecordEx | Id:34008 | Name: Unknown | Data: "0=0;1=0;2=0;3=0" */
//stage.updateQuestRecordEx(34008, "0=0;1=0;2=0;3=0");
/* Update Quest RecordEx | Id:34008 | Name: Unknown | Data: "0=0;1=0;2=0;3=0;5=0" */
//stage.updateQuestRecordEx(34008, "0=0;1=0;2=0;3=0;5=0");
let skillId = util.getNoviceSkill(190, stage.getJob());
if (stage.isQuestStarted(1507)) {
        stage.startQuest(1507);//Quest Name:聯盟的誕生
        stage.completeQuest(1507);//Quest Name:聯盟的誕生
        if (stage.getSkillLevel(skillId) == 0) {
                stage.changeSkillLevel(skillId, -1);
                stage.changeSkillLevel(skillId, 1);
                stage.showScriptProgressMsg("獲得聯盟的意志技能！");
                stage.showSystemMessage("已獲得<聯盟的意志>技能。");
        }
//stage.setTemporarySkillSet(0);
}
dir.block().setInGameDirectionMode();
dir.setDirectionMod(false);