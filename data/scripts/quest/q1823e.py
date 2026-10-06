ESS = 9075200

sm.setSpeakerID(ESS)
if sm.canHold(4310060):
    sm.sendNext("Did you stop 50 #o9306002# monsters?")
    sm.sendPrev("Basic course concluded.")
    sm.completeQuest(1823)
    sm.giveItem(4310060, 3)
else:
    sm.sendSayOkay("Make sure you have space in your inventory.")