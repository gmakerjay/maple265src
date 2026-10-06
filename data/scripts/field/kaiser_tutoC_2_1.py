# ObjectID: 0
# Character field ID when accessed: 940001220
# ParentID: 940001220
TEAR = 3000151
PRIEST_STAFF_0 = 3000114
PRIEST_STAFF_1 = 3000115

PRIEST_NONE_0 = 3000110
PRIEST_NONE_1 = 3000111
sm.lockInGameUI(True, False)

sm.forcedAction(6, 0)
sm.showEffect("Skill/6100.img/skill/61001005/CharLevel/100/effect", 0, -103, 239,0, 0, False, 1)
sm.sendDelay(1000)
sm.showBalloonMsgOnNpc("Effect/Direction9.img/effect/story/BalloonMsg1/8", 2000,PRIEST_NONE_0)
sm.showNpcSpecialActionByTemplateId(PRIEST_NONE_0, "die1", 2000)
sm.sendDelay(2000)
sm.removeNpc(PRIEST_NONE_0)
sm.sendDelay(2000)

sm.setSpeakerID(PRIEST_STAFF_0)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Ho-How dare you... Attack!")

sm.showNpcSpecialActionByTemplateId(PRIEST_STAFF_0, "attack1", 2000)
sm.showNpcSpecialActionByTemplateId(PRIEST_STAFF_1, "attack1", 2000)
sm.sendDelay(2000)
sm.showEffectOnPosition("Npc/3000114.img/hit",5000,-102,239)
sm.sendDelay(2000)

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Achkkkkkkk!")

sm.setSpeakerID(PRIEST_NONE_1)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Wha-! How can kid be so strong?")

sm.setSpeakerID(PRIEST_STAFF_1)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Down in one strike?! We can't let this happen! Get them!")

sm.showEffectOnPosition("Effect/Direction9.img/effect/tuto/Effect/0",2000,-102,239)
sm.sendDelay(2000)
sm.lockInGameUI(False, False)
sm.removeNpc(TEAR)
sm.removeNpc(PRIEST_STAFF_0)
sm.removeNpc(PRIEST_STAFF_1)
sm.removeNpc(PRIEST_NONE_1)
sm.showFade(500)
sm.warp(940002020)