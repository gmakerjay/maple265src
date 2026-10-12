# 칭호 - 메이플 3000일 훈장

medal = 1142335

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)