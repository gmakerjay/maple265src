
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setBoxChat()
if sm.sendAskYesNo("Would you like to leave the fight?"):
    sm.lockInGameUI(False, False)
    sm.showFade(100)
    sm.warpInstanceOut(chr, 120000101)
else:
    sm.lockInGameUI(False, False)
    #sm.dispose()