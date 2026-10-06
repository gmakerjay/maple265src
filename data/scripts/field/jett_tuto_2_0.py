# ParentID: 620100020
# Character field ID when accessed: 620100020
# ObjectID: 0
BOUNTY_HUNTER_1 = 9201277
BOUNTY_HUNTER_2 = 9201270
BOUNTY_HUNTER_3 = 9201271
CRIMINAL = 9201276
BURKE = 9270083
sm.spawnNpc(BOUNTY_HUNTER_1,-280,-120)
sm.spawnNpc(BOUNTY_HUNTER_2,-200,-120)
sm.spawnNpc(BOUNTY_HUNTER_3,-120,-120)
sm.spawnNpc(CRIMINAL,0,-120)
sm.spawnNpc(BURKE,150,-120)
sm.flipNpcByTemplateId(BOUNTY_HUNTER_1, False)
sm.flipNpcByTemplateId(BOUNTY_HUNTER_2, False)
sm.flipNpcByTemplateId(BOUNTY_HUNTER_3, False)
sm.flipNpcByTemplateId(CRIMINAL, False)
sm.showNpcSpecialActionByTemplateId(BOUNTY_HUNTER_1, "say",50000)
sm.showNpcSpecialActionByTemplateId(BOUNTY_HUNTER_2, "say",50000)
sm.showNpcSpecialActionByTemplateId(BOUNTY_HUNTER_3, "say",50000)
sm.showNpcSpecialActionByTemplateId(BURKE, "say")
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
sm.showFieldEffect("Map/Effect.img/newPirate/text4")
sm.sendDelay(3000)
sm.setSpeakerID(BURKE)
sm.setBoxChat() 
sm.sendNext("Good work,team. All of you together were able to bring in the whole group.")
sm.setSpeakerID(CRIMINAL)
sm.setBoxChat() 
sm.sendNext("Whatever,Burke! You're nothing without that loser with the Core. That's the only reason you had a chance!")
sm.setPlayerBoxChat()
sm.sendNext("Man,shut your face. I don't want to rough you up before we turn you in. Lock them up and keep an eye on them!")
sm.setSpeakerID(BOUNTY_HUNTER_1)
sm.setBoxChat() 
sm.sendNext("Roger that,chief.")
sm.warp(620100021,0)
sm.removeNpc(BOUNTY_HUNTER_1)
sm.removeNpc(BOUNTY_HUNTER_2)
sm.removeNpc(BOUNTY_HUNTER_3)
sm.removeNpc(CRIMINAL)
sm.removeNpc(BURKE)
