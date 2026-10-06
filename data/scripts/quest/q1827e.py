ESS = 9075200

sm.setSpeakerID(ESS)
if sm.canHold(4310060):
    sm.sendNext("Did you stop 30 #o9306007# monsters?")
    sm.sendPrev("Basic course concluded.")
    sm.completeQuest(1827)
    sm.giveItem(4310060, 7)
else:
    sm.sendSayOkay("Make sure you have space in your inventory.")