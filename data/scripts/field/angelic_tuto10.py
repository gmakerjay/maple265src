# Character field ID when accessed: 940011100
# ObjectID: 0
# ParentID: 940011100
ESKALADE = 3000018
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendNext("Okay, dragon-guy, we're here.")
sm.setSpeakerID(ESKALADE)
sm.setBoxChat() 
sm.sendNext("Do you see a ring where the relic used to be?")
sm.forcedInput(2)
sm.sendDelay(3500)
sm.forcedInput(0)