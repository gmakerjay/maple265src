# Sparkling Crystal - Hidden Street : Dimensional World
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setBoxChat()
response = sm.sendAskYesNo("Do you really want to leave?")

if response:
    sm.lockInGameUI(False, False)
    sm.showFade(100)
    sm.warpInstanceOut(chr, 211000001) # El Nath : Chief's Residence
else:
    sm.lockInGameUI(False, False)