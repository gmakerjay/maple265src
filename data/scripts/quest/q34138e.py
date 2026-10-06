from net.swordie.ms.constants import QuestConstants

if sm.getEmptyInventorySlots(1)>= 1:
    sm.completeQuest(34138)
    sm.giveSymbol(1712001, 1, 34138)
    sm.addDailyQuestCount(QuestConstants.VANISHING_JOURNEY_DAILY_QUEST_COUNT)
else:
    sm.systemMessage("Make sure you have enough space in your inventory..")