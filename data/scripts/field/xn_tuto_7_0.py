# ObjectID: 0
# Character field ID when accessed: 931050950
# ParentID: 931050950
sm.lockInGameUI(True, False)

sm.forcedInput(2)
sm.sendDelay(2000)
sm.forcedInput(1)
sm.sendDelay(2000)
sm.forcedInput(2)
sm.sendDelay(2000)
sm.forcedInput(1)
sm.sendDelay(2000)
sm.forcedInput(0)

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("What was that memory? i cannot recall it....like it's covered in static....")
sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg0/0", 2000)
sm.sendDelay(2000)
sm.sendNext("I need to talk to that woman before Professor Gelmer returns. She must be in a cell.")

sm.forcedInput(2)
sm.sendDelay(3000)
sm.forcedInput(0)
sm.showFade(500)
sm.warp(931050960)

sm.lockInGameUI(False, False)