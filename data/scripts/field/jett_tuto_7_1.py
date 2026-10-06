# ObjectID: 0
# Character field ID when accessed: 620100027
# ParentID: 620100027
KEY_KEEPER = 9420567
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.forcedInput(1)
sm.sendDelay(1000)
sm.forcedInput(0)
sm.showBalloonMsg("Effect/DirectionNewPirate.img/newPirate/balloonMsg1/20",2000)
sm.sendDelay(2000)
sm.startQuestNoCheck(53247)
sm.spawnMob(KEY_KEEPER,-400,-120,False)
sm.setPlayerBoxChat()
sm.sendNext("You there! Get away from those controls, and drop that key!")
sm.chatScript("Eliminate the Key Keeper and find the Master Key.")
sm.lockInGameUI(False, False)