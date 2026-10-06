# Character field ID when accessed: 940001100
# ObjectID: 0
# ParentID: 940001100

sm.lockInGameUI(True, False)

sm.forcedInput(2)
sm.sendDelay(2000)
sm.forcedInput(0)
sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg0/0", 2000)
sm.sendDelay(2000)

sm.showFade(500)
sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Something feel wrong. Am i too late?")
sm.sendNext("But even Darmoor himself can't break through the Shield of Heliseum. What happened here?")

sm.forcedInput(1)
sm.sendDelay(500)
sm.forcedInput(0)

sm.sendNext("The boundary is unmarked...")

sm.forcedInput(2)
sm.sendDelay(1000)
sm.forcedInput(0)


sm.moveCamera(False ,500, -474, 178)
sm.sendDelay(1000)
sm.sendNext("The Eye of Protector Rock, which has never closed, is dark.")
sm.sendNext("Heliseum has already been captured? What about the shield?")
sm.moveCameraBack(1000)
sm.sendDelay(1000)

sm.forcedInput(2)
sm.sendDelay(1000)
sm.forcedInput(0)
sm.lockInGameUI(False, False)