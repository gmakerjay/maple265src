# Special Training Beginner
medal = 1142242

if sm.canHold(medal):
   sm.chatScript("You received a new medal.")
   sm.giveItem(medal)
   sm.startQuest(parentID)
   sm.completeQuest(parentID)