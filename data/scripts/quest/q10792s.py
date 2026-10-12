# Title - Reboot 2 Pioneer 

medal = 1142991

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)