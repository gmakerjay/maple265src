sm.setSpeakerID(3003152)

if sm.getEmptyInventorySlots(1) >= 1:
    sm.sendNext("#h0#, I see you completed all 3 missions.\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712002# #t1712002# x 1\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 372966000 exp")
    sm.giveSymbol(1712002, 1, 39014)
    sm.completeQuest(39014)
else:
    sm.systemMessage("Make sure you have enough space in your inventory.")