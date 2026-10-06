from net.swordie.ms.constants import QuestConstants

if sm.getEmptyInventorySlots(1) >= 2:
    sm.completeQuest(39038)
    sm.addDailyQuestCount(QuestConstants.ARCANA_DAILY_QUEST_COUNT)
    sm.giveSymbol(1712004, 2, 39038)
else:
    sm.systemMessage("Make sure you have enough space in your inventory..")