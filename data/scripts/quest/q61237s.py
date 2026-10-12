# Title - Medal of Wind and Steel (61237)

medal = 1142493

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)