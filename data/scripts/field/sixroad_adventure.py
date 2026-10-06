Rondo = 1520001

sm.lockInGameUI(True, False)
sm.removeNpc(Rondo)
sm.spawnNpc(Rondo, -830, -926)
sm.flipNpcByTemplateId(Rondo, False)
sm.moveCamera(False, 200, -830, -926)
sm.sendDelay(1000)
sm.moveCameraBack(500)
sm.lockInGameUI(False, False)

