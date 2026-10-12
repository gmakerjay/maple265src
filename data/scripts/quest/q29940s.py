# Hero's Successor (29940)

medal = 1142158

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)