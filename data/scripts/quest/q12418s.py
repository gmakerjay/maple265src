# Spiegelmann's Artifact Excavator 2012

medal = 1142407

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)