// Created by MetaMS
// Quest ID:67001
// [星夜馬戲團] 武陵慶典的序幕


npc.id(9401981).ui(1).next().say("來，閉上雙眼。我幫你施魔法！");
//stage.changeSkillLevel(80010293, -1);
//stage.changeSkillLevel(80010293, 1);
//stage.changeSkillLevel(80010293, 1);
//stage.changeSkillLevel(80010293, 2);
//stage.changeSkillLevel(80012538, -1);
//stage.changeSkillLevel(80012538, 1);
//stage.changeSkillLevel(80012538, 1);
stage.updateQuestRecordEx(67022, "eventObj", "0");
/* Update Quest RecordEx | Id:67022 | Name: Unknown | Data: "eventObj=0;week=2" */
stage.updateQuestRecordEx(67022, "week", "2");
/* Update Quest RecordEx | Id:67022 | Name: Unknown | Data: "grade=2;eventObj=0;week=2" */
stage.updateQuestRecordEx(67022, "grade", "2");
/* Update Quest RecordEx | Id:67022 | Name: Unknown | Data: "event=2;grade=2;eventObj=0;week=2" */
stage.updateQuestRecordEx(67022, "event", "2");
npc.completeQuest();
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.uol("Effect/DirectionWz2.img/effect/annual2024/lotus").duration(750).y(-10).overlay(true).npc(true).setEffectPlay();
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
npc.id(9401981).ui(1).next().say("怎麼樣！有感覺到魔法嗎？");
npc.ui(1).npcFlip().meFlip().next().say("#fc0xFFbfbfbf#(嗯？有什麼改變嗎？不太清楚…….)");
npc.id(9401981).ui(1).next().say("呵呵呵。別懷疑。\r\n有空再來找我，我會送你可以體驗新鮮樂趣的活動入場券！");
npc.ui(1).npcFlip().meFlip().next().say("總之，謝謝你，休菲凱曼！");
npc.id(9401981).ui(1).next().say("不用客氣！享受武陵天燈慶典，把禮物也帶回去吧。");
stage.showScriptProgressMsg("可以選擇活動票券和裝飾慶典。請確認<星夜馬戲團活動提醒>！");