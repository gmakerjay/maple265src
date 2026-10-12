# [Game of Yut] Auspicious Game of Yut

medal = 1142522

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)