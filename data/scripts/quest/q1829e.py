ESS = 9075200

sm.setSpeakerID(ESS)
if sm.canHold(4310060):
    sm.sendNext("Did you stop 20 #o9306101# monsters?")
    sm.sendPrev("Basic course concluded.")
    sm.completeQuest(1829)
    sm.giveItem(4310060, 9)
else:
    sm.sendSayOkay("Make sure you have space in your inventory.")