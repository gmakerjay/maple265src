from net.swordie.ms.constants import QuestConstants

if sm.getEmptyInventorySlots(1) >= 1:
    sm.completeQuest(34385)
    sm.giveSymbol(1712003, 1, 34385)
    sm.addDailyQuestCount(QuestConstants.LACHELEIN_DAILY_QUEST_COUNT)
else:
    sm.systemMessage("Make sure you have enough space in your inventory..")