from net.swordie.ms.constants import QuestConstants

if sm.getEmptyInventorySlots(1) >= 1:
    sm.completeQuest(39020)
    sm.giveSymbol(1712002, 1, 39020)
    sm.addDailyQuestCount(QuestConstants.CHU_CHU_DAILY_QUEST_COUNT)
else:
    sm.systemMessage("Make sure you have enough space in your inventory..")