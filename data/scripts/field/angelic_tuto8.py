# ParentID: 940011080
# ObjectID: 0
# Character field ID when accessed: 940011080
KYLE = 3000140
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.removeNpc(KYLE)
sm.spawnNpc(KYLE,-379,29)
sm.flipNpcByTemplateId(KYLE, False)
sm.hideNpcByTemplateId(KYLE,True)

sm.forcedInput(2)
sm.sendDelay(2200)
sm.forcedInput(0)