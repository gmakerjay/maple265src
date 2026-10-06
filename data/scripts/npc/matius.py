# Matthias
if sm.hasQuest(20807):
    sm.removeEscapeButton()
    sm.setBoxChat()
    sm.lockInGameUI(True,False)
    if sm.sendAskYesNo("Would you like to try the first test?"):
        sm.lockInGameUI(False,False)
        sm.showFade(100)
        sm.warp(913070800, 0)
        sm.setInstanceTime(5 * 60, 913070800)
        #sm.addEvent(sm.invokeAfterDelay(30 *1000, "warp", 103000000, 0))
        #sm.invokeAfterDelay(5000 * 1000, "warpInstanceOut", 103000000, 0)
    else:
        sm.lockInGameUI(False,False)
        #sm.dispose()