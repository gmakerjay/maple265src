BURKE = 9270083
COMM = 9201286
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.moveCamera(200,2422,-120)
sm.sendDelay(2000)
sm.setSpeakerID(BURKE)
sm.setBoxChat()
sm.sendNext("We're en route. Can you really bring us down over Maple World?")
sm.setSpeakerID(COMM)
sm.setBoxChat()
sm.sendNext("Kshhhh...Of course...Our power...is great....Kshhhhhhh....this....")
sm.warp(620100041,0)
sm.removeNpc(BURKE)
