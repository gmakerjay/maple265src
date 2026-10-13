// Created by MetaMS
// Quest ID:504621
// [星夜馬戲團] 大師設計師升級


npc.id(9401993).ui(1).next().say("你來了呀，#h0#。我一直在等你。");
npc.ui(1).npcFlip().meFlip().next().say("盧公！有什麼事嗎？");
npc.id(9401993).ui(1).next().say("不為了別的，只是想感謝為了慶典而到處奔波的你。");
npc.ui(1).npcFlip().meFlip().next().say("不用客氣。我正在裝飾慶典會場，盡情享受慶典。");
npc.id(9401993).ui(1).next().say("為了他人而活，這件事雖然很容易，但並不容易…");
npc.id(9401993).ui(1).next().say("你好像擁有了真正的仙人的姿態。");
if (npc.id(9401993).ui(1).askAccept("所以說，#h0#。我為你準備了。要收下嗎？\r\n#b#i2638018:##t2638018:#\r\n\r\n#r※接受時，將同時發放勳章並升級為大師慶典設計者。")) {
        /* Response is Yes */
        if (stage.gainItem(2638018, 1)) {
                /* Update Quest RecordEx | Id:501816 | Name: Unknown | Data: "cashMove=1" */
                //stage.updateQuestRecordEx(501816, "cashMove=1");
                /* Update Quest RecordEx | Id:504627 | Name: Unknown | Data: "start=1;mapTuto2=1;burn=1;lv=4;s1=2;s2=2;s3=2;s4=2;s5=2;s6=2;mapTuto=1;event=2;week=4;first=1" */
                //stage.updateQuestRecordEx(504627, "start=1;mapTuto2=1;burn=1;lv=4;s1=2;s2=2;s3=2;s4=2;s5=2;s6=2;mapTuto=1;event=2;week=4;first=1");
                /* Update Quest RecordEx | Id:504627 | Name: Unknown | Data: "start=1;mapTuto2=1;burn=1;lv=4;s1=2;s2=2;s3=2;s4=2;s5=2;s6=2;s7=1;mapTuto=1;event=2;week=4;first=1" */
                //stage.updateQuestRecordEx(504627, "start=1;mapTuto2=1;burn=1;lv=4;s1=2;s2=2;s3=2;s4=2;s5=2;s6=2;s7=1;mapTuto=1;event=2;week=4;first=1");
                npc.completeQuest();
                stage.changeSkillLevel(80010293, 4);
                stage.showSystemMessage("恭喜！慶典設計者技能提升到了4等級。");
                npc.id(9401993).ui(1).next().say("轉眼間就成為大師設計者了。請一定要堅持到最後。\r\n我也會送你禮物。請一起確認物品欄！");
        } else {
                npc.id(9401993).say("背包空間不足，請清理後再試。");
        }
} else {
        /* Response is No */
        npc.id(9401993).ui(1).noEsc().next().say("是嗎？那準備好再來找我吧。");
}