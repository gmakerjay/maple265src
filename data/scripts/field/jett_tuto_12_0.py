# ParentID: 620100042
# Character field ID when accessed: 620100042
# ObjectID: 0
BURKE = 9270084
sm.spawnNpc(BURKE,184,-117)
sm.showNpcSpecialActionByTemplateId(BURKE, "say",50000)
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.forcedInput(2)
sm.showBalloonMsg("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/16",2000)
sm.sendDelay(1200)
sm.forcedInput(0)
