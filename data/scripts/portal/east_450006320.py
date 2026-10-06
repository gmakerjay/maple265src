if sm.hasQuestCompleted(34265) and not sm.hasQuestCompleted(34561):
    sm.warp(450006330)
elif sm.hasQuestCompleted(34561) and not sm.hasQuest(34562):
    sm.warp(940204303)
else:
    sm.chat("Cánh cổng này đã bị khoá.")
