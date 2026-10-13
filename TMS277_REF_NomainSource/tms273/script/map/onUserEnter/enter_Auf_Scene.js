// Created by MetaMS
// ID:[876000100]
// MapName:大本木商场最高层

cam.releaseCtrl()
cam.initCtrl();

dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.setInGameCurNodeEventEnd(true);
dir.setStandAloneMode(true);
dir.removeAdditionalEffectEx();
dir.setVansheeMode(true);
eff.blind(true).binary(255).setLayerBlind();

/* Update Quest RecordEx | Id:66549 | Name: Unknown | Data: "" */
//player.updateQuestRecordEx(66549, "");
/* Update Quest RecordEx | Id:66549 | Name: Unknown | Data: "pNum=0" */
//player.updateQuestRecordEx(66549, "pNum=0");
/* Update Quest RecordEx | Id:66549 | Name: Unknown | Data: "jck=0;pNum=0" */
//player.updateQuestRecordEx(66549, "jck=0;pNum=0");
/* Update Quest RecordEx | Id:66549 | Name: Unknown | Data: "jck=1;pNum=0" */
//player.updateQuestRecordEx(66549, "jck=1;pNum=0");
/* Update Quest RecordEx | Id:66549 | Name: Unknown | Data: "jck=0;pNum=0" */
//player.updateQuestRecordEx(66549, "jck=0;pNum=0");
/* Update Quest RecordEx | Id:502129 | Name: Unknown | Data: "boss=1;eDate=23/04/29;eCnt=4" */
//player.updateQuestRecordEx(502129, "boss=1;eDate=23/04/29;eCnt=4");
/* Update Quest RecordEx | Id:502129 | Name: Unknown | Data: "eDCnt=4;boss=1;eDate=23/04/29;eCnt=4" */
//player.updateQuestRecordEx(502129, "eDCnt=4;boss=1;eDate=23/04/29;eCnt=4");
/* Update Quest RecordEx | Id:66549 | Name: Unknown | Data: "jck=0;pNum=0;enter=1" */
//player.updateQuestRecordEx(66549, "jck=0;pNum=0;enter=1");
dir.block().setInGameDirectionMode();
dir.setStandAloneMode(false);
stage.changeMap(map.getId() + 100, 0);
