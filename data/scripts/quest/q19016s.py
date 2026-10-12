# 2012 Artifact Hunt Participant

medal = 1142305

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)