# Special Training Beginner
medal = 1142242

if sm.canHold(medal):
   sm.chatScript("Bạn đã nhận được một huy chương mới.")
   sm.giveItem(medal)
   sm.startQuest(parentID)
   sm.completeQuest(parentID)