# 칭호 - 떡국 맛 좀 보신 분

medal = 1142816

if sm.canHold(medal):
    sm.chatScript("Bạn đã nhận được một huy chương mới.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)