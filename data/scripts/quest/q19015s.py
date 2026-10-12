# 2011 Mystical Artifact Pioneer

medal = 1142307

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)