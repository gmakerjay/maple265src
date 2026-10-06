# Title - Mu Lung Garden Monster Collector

medal = 1142934

if sm.canHold(medal):
    sm.chatScript("Bạn đã nhận được một huy chương mới.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)