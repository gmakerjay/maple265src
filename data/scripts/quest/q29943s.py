# Special Training Graduate

medal = 1142244

if sm.canHold(medal):
   sm.chatScript("You received a new medal.")
   sm.giveItem(medal)
   sm.startQuest(parentID)
   sm.completeQuestNoRewards(parentID)