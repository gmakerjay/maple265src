sm.setSpeakerID(3003133)
sm.sendNext("There is no way forward. It's a dead end... We'll have to climb the cliff.")
if sm.sendAskYesNo("Imprenta, what do you say? Let's climb up."):
    sm.startQuest(parentID)
    