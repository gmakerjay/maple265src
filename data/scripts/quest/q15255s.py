# Title - Ludus Lake Monster Collector

medal = 1142932

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)