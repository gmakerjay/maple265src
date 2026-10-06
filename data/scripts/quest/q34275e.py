sm.setSpeakerID(3003432)

if sm.getEmptyInventorySlots(1)>= 2:
    sm.sendNext("#h0#, I see you completed all 3 missions.\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#v1712005# #t1712005# x 2\r\n\r\n#fUI/UIWindow2.img/QuestIcon/8/0# 1330183239 exp")
    sm.giveSymbol(1712005, 2, 34275)
    sm.completeQuest(34275)
else:
    sm.systemMessage("Make sure you have enough space in your inventory.")