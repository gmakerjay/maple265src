# Character field ID when accessed: 620100029
# ObjectID: 0
# ParentID: 620100029
BURKE = 9270083

sm.spawnNpc(BURKE,2422,-120)
sm.showNpcSpecialActionByTemplateId(BURKE, "say",50000)
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.forcedInput(1)
sm.sendDelay(2000)
sm.forcedInput(0)
sm.showBalloonMsgOnNpc("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/2",2000,BURKE)
sm.sendDelay(2000)
sm.showBalloonMsgOnNpc("Effect/DirectionNewPirate.img/newPirate/balloonMsg2/1",2000,BURKE)
sm.sendDelay(2000)
sm.setPlayerBoxChat()
sm.sendNext("Bruke. You follow me outta here and then you disappear.\r\nThey're after me, not you.")
sm.setSpeakerID(BURKE)
sm.setBoxChat()
sm.sendNext("What are you talking about? We're...we're family. I won't let you face this on your own.")
sm.sendNext("Look, just get on the shuftle!")
sm.setPlayerBoxChat()
sm.sendNext("Burke.... Thank you....")
sm.lockInGameUI(False, False)
sm.chatScript("Follow the arrows to the portals.")
