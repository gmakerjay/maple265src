# [Medal] One who survives only with a strong will

medal = 1142881

if sm.canHold(medal):
    sm.chatScript("Bạn đã nhận được một huy chương mới.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)