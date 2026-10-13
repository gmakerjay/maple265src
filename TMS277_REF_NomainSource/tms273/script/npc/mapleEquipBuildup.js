//stage.updateQuestRecordExShare(18793, "q0=0;q1=0;q2=0;pq=0;q1Date=22/01/15;q2Date=22/01/15;pqDate=22/01/15");//楓之谷聯盟的開端
if (stage.isQuestCompleted(1465) || stage.isGm()) {
        let response = npc.askMenu("你來這裡有什麼事嗎?#b\r\n#L1#領取每日#r核心寶石#b。#l\r\n#L2#增加#r神秘徽章#b裝備欄。#l" + (stage.isGm() ? "\r\n#L3#設置#r核心碎片9999#b#l\r\n#L4#完成#r五轉#b#l\r\n#L5#學習技能#b#l" : ""));
        if (response == 2) {
                //npc.say("暫時無法使用！");
                if (stage.isQuestCompleted(34478)) {
                        npc.say("你已經增加過#r神秘徽章#b裝備欄了！");
                } else {
                        let anser = npc.askYesNo("增加#r神秘徽章#b裝備欄需要 #e25E#k金幣。確認是否要開啟");
                        if (anser == 1) {
                                if (stage.hasMesos(2500000000)) {
                                        stage.loseMesos(2500000000);
                                        stage.completeQuest(34478);
                                        //stage.completeQuest(1484);
                                        npc.say("#r神秘徽章#b裝備欄已增加！");
                                } else {
                                        npc.say("您的金幣不足！");
                                }
                        }
                }
        } else if (response == 3) {
                stage.updateQuestRecordEx(1477, "count", "9999");
        } else if (response == 4) {
                stage.completeQuest(1465);
        } else if (response == 5) {
                while (true) {
                        let skillId = npc.maxNum(999999999).askNumber("請輸入技能ID：");
                        let level = npc.defNum(1).maxNum(30).askNumber("請輸入技能等級：");
                        stage.changeSkillLevel(skillId, level);
                }
        }
} else {
        npc.say("我還無法為你提供服務！");
}