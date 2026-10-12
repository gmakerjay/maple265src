# Title - Medal of the Morning Moon (61236)

medal = 1142492

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)