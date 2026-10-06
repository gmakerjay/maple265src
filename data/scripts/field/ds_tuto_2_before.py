sm.lockInGameUI(True,False)
sm.forcedInput(1)
sm.sendDelay(30)

sm.forcedInput(0)
sm.showFieldEffect("demonSlayer/text13", 0)
sm.sendDelay(500)

sm.showFieldEffect("demonSlayer/text14", 0)
sm.sendDelay(4000)

sm.lockInGameUI(False,False)
sm.showFade(500)
sm.warpInstanceIn(chr, 927000020, 0)

