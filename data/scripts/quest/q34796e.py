from net.swordie.ms.constants import QuestConstants

if sm.getEmptyInventorySlots(1) >= 2:
    sm.completeQuest(34796)
    sm.addDailyQuestCount(QuestConstants.ESFERA_DAILY_QUEST_COUNT)
    sm.giveSymbol(1712006, 2, 34796)
else:
    sm.systemMessage("Make sure you have enough space in your inventory..")