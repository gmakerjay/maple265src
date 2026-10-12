# Title - Medal of the Bushido (61122)

medal = 1142490

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)