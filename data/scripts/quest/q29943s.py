# Special Training Graduate

medal = 1142244

if sm.canHold(medal):
   sm.chatScript("Bạn đã nhận được một huy chương mới.")
   sm.giveItem(medal)
   sm.startQuest(parentID)
   sm.completeQuestNoRewards(parentID)