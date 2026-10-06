# Character field ID when accessed: 620100021
# ParentID: 620100021
# ObjectID: 0
BURKE = 9270083
sm.spawnNpc(BURKE,14,-65)
sm.flipNpcByTemplateId(BURKE, False)
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.forcedInput(1)
sm.sendDelay(200)
sm.forcedInput(0)
sm.setPlayerBoxChat()
sm.sendNext("Forget those idiots. You'er the captain of this crew. We all know that.")
sm.setSpeakerID(BURKE)
sm.setBoxChat() 
sm.sendNext("I know. Thanks, Jett.")
sm.setPlayerBoxChat()
sm.sendNext("Right, hey, we're gonna party before we make the drop-off. Come on!")
sm.setSpeakerID(BURKE)
sm.setBoxChat() 
sm.sendNext("Okay,I'll be there soon.")
sm.forcedInput(2)
sm.sendDelay(3200)
sm.forcedInput(0)
