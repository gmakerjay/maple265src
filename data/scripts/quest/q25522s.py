# Opponent of Destiny

medal = 1142483
echo = 20041005

if sm.canHold(medal):
    sm.chatScript("Bạn đã nhận được một huy chương mới.")
    sm.giveSkill(echo)
    sm.startQuest(parentID)
    sm.completeQuest(parentID)