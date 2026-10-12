# [Sword Art Online] Black Swordsman

medal = 1142667

if sm.canHold(medal):
    sm.chatScript("You received a new medal.")
    sm.startQuest(parentID)
    sm.completeQuest(parentID)