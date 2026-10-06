ESS = 9075200

sm.setSpeakerID(ESS)
if sm.canHold(4310060):
    sm.sendNext("Did you stop 2 #o9306200# monsters?")
    sm.sendPrev("Basic course concluded.")
    sm.completeQuest(1828)
    sm.giveItem(4310060, 8)
else:
    sm.sendSayOkay("Make sure you have space in your inventory.")