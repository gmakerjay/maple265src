# End [Arcana] The Harmony of the Forest

sm.setSpeakerID(3003320)
sm.sendNext("Thank you for everything. Because of you, the forest is returning to normal . I want you to have this for all you've done!\r\n#i1712004# #b#t1712004##k")
if sm.getEmptyInventorySlots(1) >= 1:
    sm.sendSay("It will take time for the wild spirits to come to their senses.")
    sm.giveSymbol(1712004, 1, 34478)
    sm.completeQuest(34478)
else:
    sm.sendSayOkay("Please make more space in your EQUIP inventory.")