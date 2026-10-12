# Cosmos Knockout Participant

medal = 1142795

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)