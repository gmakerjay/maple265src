from net.swordie.ms.constants import QuestConstants

if sm.getEmptyInventorySlots(1) >= 2:
    sm.completeQuest(34292)
    sm.addDailyQuestCount(QuestConstants.MORASS_DAILY_QUEST_COUNT)
    sm.giveSymbol(1712005, 2, 34292)
else:
    sm.systemMessage("Make sure you have enough space in your inventory..")