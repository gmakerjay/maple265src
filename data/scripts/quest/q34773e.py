sm.setSpeakerID(3003530)
if (sm.hasQuestCompleted(35731)): # [Labyrinth of Suffering] Source of Suffering
    if sm.getEmptyInventorySlots(1)>= 6:
        sm.sendNext("#h0#, I see you completed all 3 missions.\r\n\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712006# #t1712006# x 6\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 3112628779 exp")
        sm.giveSymbol(1712006, 6, 34773)
        sm.completeQuest(34773)
    else:
        sm.systemMessage("Make sure you have enough space in your inventory.")
elif (sm.hasQuestCompleted(35632)): # [Moonbridge] Clear Path
    if sm.getEmptyInventorySlots(1)>= 4:
        sm.sendNext("#h0#, I see you completed all 3 missions.\r\n\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712006# #t1712006# x 4\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 3112628779 exp")
        sm.giveSymbol(1712006, 4, 34773)
        sm.completeQuest(34773)
    else:
        sm.systemMessage("Make sure you have enough space in your inventory.")
else:
    if sm.getEmptyInventorySlots(1)>= 2:
        sm.sendNext("#h0#, I see you completed all 3 missions.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712006# #t1712006# x 2\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 3112628779 exp")
        sm.giveSymbol(1712006, 2, 34773)
        sm.completeQuest(34773)
    else:
        sm.systemMessage("Make sure you have enough space in your inventory.")