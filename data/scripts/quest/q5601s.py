# Spiegelmann's Artifact Excavator 2013

medal = 1142652

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)