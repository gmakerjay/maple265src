# ParentID: 931050980
# ObjectID: 0
# Character field ID when accessed: 931050980
ROOB_D = 2159380
CLAUDINE = 2159384

sm.lockInGameUI(True, False)
sm.removeNpc(ROOB_D)
sm.removeNpc(CLAUDINE)

sm.spawnNpc(ROOB_D, -1000,43)
sm.spawnNpc(CLAUDINE, -900,43)
sm.flipNpcByTemplateId(CLAUDINE, False)
sm.flipNpcByTemplateId(ROOB_D, False)


sm.forcedInput(2)
sm.moveNpcByTemplateId(CLAUDINE, False, 500, 150)
sm.moveNpcByTemplateId(ROOB_D, False, 460, 150)

sm.sendDelay(4500)
sm.forcedInput(0)
sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000)
sm.sendDelay(500)
sm.showEffectOnPosition("Effect/Direction12.img/effect/tuto/laser",2000,-300,43)
sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg2/15", 2000)
sm.showNpcSpecialActionByTemplateId(CLAUDINE, "stand", 90000)
sm.showNpcSpecialActionByTemplateId(ROOB_D, "stand", 90000)
sm.sendDelay(2000)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/16", 2000, CLAUDINE )
sm.sendDelay(1000)
sm.removeNpc(ROOB_D)
sm.sendDelay(1000)
sm.removeNpc(CLAUDINE)
sm.sendDelay(2000)

sm.showFade(500)
sm.warp(931050990)
sm.lockInGameUI(False, False)