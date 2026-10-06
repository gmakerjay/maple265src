# [Game of Yut] Auspicious Game of Yut

medal = 1142522

if sm.canHold(medal):
    sm.chatScript("Bạn đã nhận được một huy chương mới.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)