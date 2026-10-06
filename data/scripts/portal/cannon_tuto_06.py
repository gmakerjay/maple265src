MONKEY = 1096003

sm.lockInGameUI(False,False)
sm.lockInGameUI(True,False)
sm.forcedInput(4)

sm.removeEscapeButton()

sm.setSpeakerID(MONKEY)
sm.reservedEffect("Effect/Direction4.img/cannonshooter/face00")
sm.setBoxChat()
sm.sendNext("Ook! Ook!")

sm.lockInGameUI(False,False)