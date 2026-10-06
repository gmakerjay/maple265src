# ObjectID: 0
# ParentID: 53245
# Character field ID when accessed: 620100026
BURKE = 9270083
BURKE_DIE = 9201289
sm.spawnNpc(BURKE_DIE,400,-120)
sm.flipNpcByTemplateId(BURKE_DIE, False)
sm.removeNpc(BURKE)
sm.hideNpcByTemplateId(BURKE_DIE,False)
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.setPlayerBoxChat()
sm.sendNext("Burke! Are you okay?")
sm.setSpeakerID(BURKE_DIE)
sm.setBoxChat()
sm.sendNext("It's nothing...But one of them look the key to the shuffle...")
sm.sendNext("He's in the control room...I think he's going to shut everything down.")
sm.setPlayerBoxChat()
sm.sendNext("I'll stop them,Burke. You just wait here.")
sm.setSpeakerID(BURKE_DIE)
sm.setBoxChat()
sm.sendNext("Jett...")
sm.completeQuest(parentID)
sm.completeQuestNoRewards(53246)
sm.warp(620100027,0)