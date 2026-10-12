# Title - Mu Lung Garden Monster Collector

medal = 1142934

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)