# Opponent of Destiny

medal = 1142483
echo = 20041005

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.giveSkill(echo)
    sm.startQuest(parentID)
    sm.completeQuest(parentID)