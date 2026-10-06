# Nova Participant

medal = 1142842

if sm.canHold(medal):
    sm.chatScript("Bạn đã nhận được một huy chương mới.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)