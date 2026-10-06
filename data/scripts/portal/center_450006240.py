if sm.hasQuest(34267):
    #sm.warp(450006400) cutscene later
    sm.giveExpNoAffectedByExpRate(58955824)
    sm.completeQuest(34267)
    sm.startQuest(34268)
    sm.completeQuest(34268)
    sm.startQuest(34269)
    sm.completeQuest(34269)
    sm.createQuestWithQRValue(34271, "20=h0;21=h0;22=h0;23=h0;28=h0;29=h0;30=h0=31=h0;33=h0;36=h1;53=h0;54=h0")
    sm.warp(450006040)
else:
    sm.chat("Cánh cổng này đã bị khoá.")