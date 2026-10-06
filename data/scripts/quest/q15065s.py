# 칭호 - 털었다. 완소 메이플스토어

medal = 1142908

if sm.canHold(medal):
    sm.chatScript("Bạn đã nhận được một huy chương mới.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)