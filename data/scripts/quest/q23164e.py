sm.lockInGameUI(True, False)
sm.removeEscapeButton()
ELEX = 2151000
HIGH_POWERED_CHARGES = 1353402

sm.setSpeakerID(ELEX)
sm.setBoxChat()
sm.sendNext("You destroyed the #o9001032#! Good. This should aleviate the problem of insufficient energy in town. We'll all be able to sleep a little easier now. You've done a tremendous good for Edelstein.")
if sm.sendAskYesNo("You've proven yourself, so I'd like to pass along some even more powerful Blaster skills. I've got faith you'll use them for the good fight."):
    if not sm.canHold(HIGH_POWERED_CHARGES):
        sm.sendSayOkay("Please make space in your equipment inventory.")
        sm.lockInGameUI(False, False)
        #sm.dispose()
    else:
        sm.jobAdvance(3711)
        sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
        sm.giveItem(HIGH_POWERED_CHARGES)
        sm.completeQuest(parentID)
        sm.sendNext("I've advanced you. Wield your newfound power to fight for freedom!")
        sm.sendPrev("I'll see you at the next lesson. Until then, continue your good fight.")
        sm.lockInGameUI(False, False)
        #sm.dispose()
else:
    sm.lockInGameUI(False, False)
    #sm.dispose()