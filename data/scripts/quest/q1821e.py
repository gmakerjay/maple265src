ESS = 9075200

sm.setSpeakerID(ESS)
if sm.canHold(4310060):
    sm.sendNext("Did you get 10 #t4033451#?")
    sm.sendPrev("Basic course concluded.")
    sm.completeQuest(parentID)
    sm.startQuest(1822)
    sm.completeQuest(1822)
    sm.giveItem(4310060, 2)
else:
    sm.sendSayOkay("Make sure you have space in your inventory.")