# 23033 - BaM 3rd job advancement
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(2151001)
sm.setBoxChat()
if sm.sendAskYesNo("Are you ready to advance to the next level?"):
    sm.jobAdvance(3211)
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.completeQuest(parentID)
    sm.sendSayOkay("Good job on defeating the conductor device. You have advanced a job level, and I have given you some SP.")
    sm.lockInGameUI(False, False)
    #sm.dispose()
else:
    sm.sendSayOkay("Come back when you're ready.")
    sm.lockInGameUI(False, False)
    #sm.dispose()
