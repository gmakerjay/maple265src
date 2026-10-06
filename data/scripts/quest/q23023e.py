# 23023 - 2nd job advancement Battle Mage
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(2151001)
sm.setBoxChat()
if sm.sendAskYesNo("Are you ready to advance to the next level?"):
    sm.completeQuest(parentID)
    sm.jobAdvance(3210)
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.sendSayOkay("Good job on finding the report. I've molded you into the next level of being a Battle Mage.")
    sm.lockInGameUI(False, False)
    sm.warpInstanceOut(chr, chr.getFieldID(), 0)
    #sm.dispose()
else:
    sm.sendSayOkay("Come back when you're ready.")
    sm.lockInGameUI(False, False)
    #sm.dispose()
