# [Sword Art Online] Premium Clearer

medal = 1142665

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)