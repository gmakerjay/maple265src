ESS = 9075200

sm.setSpeakerID(ESS)
if sm.canHold(4310060):
    sm.sendNext("Did you stop 50 #o9306000# monsters?")
    sm.sendPrev("Basic course concluded.")
    sm.completeQuest(1820)
    sm.giveItem(4310060, 1)
else:
    sm.sendSayOkay("Make sure you have space in your inventory.")