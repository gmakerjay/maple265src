sm.setSpeakerID(3003322)

if sm.getEmptyInventorySlots(1) >= 2:
    sm.sendNext("#h0#, I see you completed all 3 missions.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712004# #t1712004# x 2\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 372966000 exp")
    sm.giveSymbol(1712004, 2, 39035)
    sm.completeQuest(39035)
else:
    sm.systemMessage("Make sure you have enough space in your inventory.")