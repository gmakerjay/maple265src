# Special Training Intermediate

medal = 1142243

if sm.canHold(medal):
   sm.chatScript("Bạn đã nhận được một huy chương mới.")
   sm.giveItem(medal)
   sm.startQuest(parentID)
   sm.completeQuest(parentID)