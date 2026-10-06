
NEINHEART = 1104305


sm.removeEscapeButton()

sm.setSpeakerID(NEINHEART)
sm.setBoxChat()
sm.sendNext("But...if not a trap, then why attack Ereve? What do our foes nope to gain by striking the island?")
sm.sendNext("Is it the World Tree they're after? No...fighting Shinsoo just to seize the World Tree is nsking too much")
if sm.sendAskYesNo("We simply do not have enough information. To Ereve!"):
    sm.warpInstanceIn(chr, 913032000, 0)
    sm.startQuest(parentID)
    sm.completeQuest(parentID)
    #sm.dispose()