# Title - Apprentice Santa

medal = 1142923

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)