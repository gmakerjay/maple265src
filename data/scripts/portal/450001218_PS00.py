if sm.hasQuestCompleted(34120):
    sm.warp(450001219)
elif sm.hasQuestCompleted(34118): #and not sm.hasQuest(34119):
    sm.startQuest(34119)
    sm.warpInstanceIn(chr, 450001340)
    sm.setInstanceTime(1200, sm.getReturnField())
else:
    sm.chat("You are not allowed to go in.")
