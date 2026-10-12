# Mu Lung Dojo Vanquisher

medal = 1142064

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)