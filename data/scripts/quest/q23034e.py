# 23012 - Wild Hunter 3rd job advancement quest
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(2151002)  # Belle
sm.setBoxChat()
if sm.sendAskYesNo("Would you like to advance to the next level?"):
    sm.completeQuest(parentID)
    sm.jobAdvance(3311)
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.sendSayOkay("Congratulations, you are now at the next level! I have given you some SP, enjoy!")
    sm.lockInGameUI(False, False)
    #sm.dispose()
else:
    sm.sendSayOkay("Come back when you're ready.")
    sm.lockInGameUI(False, False)
    #sm.dispose()
