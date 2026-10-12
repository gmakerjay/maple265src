# Title - Island Near Victoria Monster Collector

medal = 1142941

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)