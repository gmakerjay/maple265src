# Character field ID when accessed: 620100024
# ObjectID: 0
# ParentID: 620100024
BURKE = 9270083
BURKE_2 = 9201287
sm.spawnNpc(BURKE,-130,-79)
sm.spawnNpc(BURKE_2,-130,-79)
sm.flipNpcByTemplateId(BURKE, False)
sm.flipNpcByTemplateId(BURKE_2, False)
sm.hideUser(True)
sm.hideNpcByTemplateId(BURKE_2,True)
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.setSpeakerID(BURKE)
sm.setBoxChat()
sm.sendNext("Jett...I'm so sorry, but I need your power. Just the Core...Please forgive me.")
sm.sendDelay(2000)
sm.removeNpc(BURKE)
sm.hideNpcByTemplateId(BURKE_2,False)
sm.sendDelay(2000)
sm.warp(620100025,0)
sm.removeNpc(BURKE_2)