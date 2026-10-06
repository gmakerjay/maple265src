if sm.getEmptyInventorySlots(1)>= 1:
    sm.startQuest(34120)
    sm.completeQuestNoRewards(34120)
    sm.giveSymbol(1712001, 1, 34120)
    sm.consumeItem(1712000)
    sm.progressMessageFont("You obtained the completion stamps for the Vanishing Journey content! Check your content map")
    sm.sendNext("#b(You picked up the Arcane Symbol: Vanishing Journey that Kao behind.)#k")
else:
    sm.systemMessage("Make sure you have enough space in your inventory..")