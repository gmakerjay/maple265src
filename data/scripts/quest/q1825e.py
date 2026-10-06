ESS = 9075200

sm.setSpeakerID(ESS)
if sm.canHold(4310060):
    sm.sendNext("Did you stop 20 #o9306005# and 5 #o9306100# monsters?")
    sm.sendPrev("Basic course concluded.")
    sm.completeQuest(1825)
    sm.giveItem(4310060, 5)
else:
    sm.sendSayOkay("Make sure you have space in your inventory.")