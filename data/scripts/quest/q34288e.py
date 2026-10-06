from net.swordie.ms.constants import QuestConstants

if sm.getEmptyInventorySlots(1) >= 2:
    sm.completeQuest(34288)
    sm.addDailyQuestCount(QuestConstants.MORASS_DAILY_QUEST_COUNT)
    sm.giveSymbol(1712005, 2, 34288)
else:
    sm.systemMessage("Make sure you have enough space in your inventory..")