ESS = 9075200

sm.setSpeakerID(ESS)
if sm.canHold(4310060):
    sm.sendNext("Did you stop 20 #o9306006# monsters?")
    sm.sendPrev("Basic course concluded.")
    sm.completeQuest(1824)
    sm.giveItem(4310060, 4)
else:
    sm.sendSayOkay("Make sure you have space in your inventory.")