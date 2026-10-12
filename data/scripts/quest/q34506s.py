# [Maplerunner] Single Yellow Star

medal = 1142957

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)