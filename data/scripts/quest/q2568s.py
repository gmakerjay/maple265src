CUTTER = 1096005
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(CUTTER)
sm.setBoxChat()
if sm.sendAskAccept("You're back! Great. I got the Ignition Device all hooked up, so we can get back to civilization. Nothing left to do here, right? Let's roll!"):
    sm.startQuest(parentID)
    sm.lockInGameUI(False, False)
    sm.showFade(500)
    sm.warp(912060200, 0)
else:
    sm.sendNext("You're not done here? What could you POSSIBLY want to do on a mostly-deserted island?")
    sm.lockInGameUI(False, False)
    #sm.dispose()