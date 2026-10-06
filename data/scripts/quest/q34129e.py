sm.setSpeakerID(3003104)
if (sm.hasQuestCompleted(34272)): # [Morass] The Swamp Remains
    if sm.getEmptyInventorySlots(1)>= 7:
        sm.sendNext("#h0#, I see you completed all 5 missions.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712001# #t1712001# x 7\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 372966000 exp")
        sm.giveSymbol(1712001, 7, 34129)
        sm.completeQuest(34129)
    else:
        sm.systemMessage("Make sure you have enough space in your inventory.")
elif (sm.hasQuestCompleted(34478)): # [Arcana] The Harmony of the Forest
    if sm.getEmptyInventorySlots(1)>= 6:
        sm.sendNext("#h0#, I see you completed all 5 missions.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712001# #t1712001# x 6\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 372966000 exp")
        sm.giveSymbol(1712001, 6, 34129)
        sm.completeQuest(34129)
    else:
        sm.systemMessage("Make sure you have enough space in your inventory.")
elif (sm.hasQuestCompleted(34331)): # [Lachelein] Decisive Battle
    if sm.getEmptyInventorySlots(1)>= 5:
        sm.sendNext("#h0#, I see you completed all 5 missions.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712001# #t1712001# x 5\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 372966000 exp")
        sm.giveSymbol(1712001, 5, 34129)
        sm.completeQuest(34129)
    else:
        sm.systemMessage("Make sure you have enough space in your inventory.")
elif (sm.hasQuestCompleted(34218)): # [Chu Chu] Goodbye, Chu Chu Island
    if sm.getEmptyInventorySlots(1)>= 4:
        sm.sendNext("#h0#, I see you completed all 5 missions.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712001# #t1712001# x 4\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 372966000 exp")
        sm.giveSymbol(1712001, 4, 34129)
        sm.completeQuest(34129)
    else:
        sm.systemMessage("Make sure you have enough space in your inventory.")
else:
    if sm.getEmptyInventorySlots(1)>= 3:
        sm.sendNext("#h0#, I see you completed all 5 missions.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712001# #t1712001# x 3\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 372966000 exp")
        sm.giveSymbol(1712001, 3, 34129)
        sm.completeQuest(34129)
    else:
        sm.systemMessage("Make sure you have enough space in your inventory.")