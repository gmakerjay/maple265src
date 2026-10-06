sm.setSpeakerID(3003209)

if sm.getEmptyInventorySlots(1) >= 1:
    sm.sendNext("#h0#, I see you completed all 3 missions.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712003# #t1712003# x 1\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 372966000 exp")
    sm.giveSymbol(1712003, 1, 34378)
    sm.completeQuest(34378)
else:
    sm.systemMessage("Make sure you have enough space in your inventory.")