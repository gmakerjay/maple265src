# [Maple Castle] Maple Castle VIP

medal = 1142537

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)