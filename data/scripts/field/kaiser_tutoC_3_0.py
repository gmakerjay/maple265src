# Character field ID when accessed: 940001230
# ObjectID: 0
# ParentID: 940001230
TEAR = 3000151
PRIEST_STAFF_0 = 3000114
PRIEST_STAFF_1 = 3000115

PRIEST_NONE_1 = 3000111
sm.removeNpc(TEAR)
sm.removeNpc(PRIEST_STAFF_0)
sm.removeNpc(PRIEST_STAFF_1)
sm.removeNpc(PRIEST_NONE_1)


sm.lockInGameUI(True, False)
sm.hideUser(True)
sm.spawnNpc(TEAR,-201,239)
sm.flipNpcByTemplateId(TEAR, False)
sm.spawnNpc(PRIEST_NONE_1,100,239)
sm.spawnNpc(PRIEST_STAFF_0,248,239)
sm.spawnNpc(PRIEST_STAFF_1,0,239)
sm.sendDelay(2000)
sm.showEffectOnPosition("Morph/1200.img/stand",10000,-102,239)
sm.sendDelay(2000)

sm.setSpeakerID(PRIEST_STAFF_0)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Wh-What is this?")

sm.setSpeakerID(PRIEST_NONE_1)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("That kid transformed into this?")

sm.setSpeakerID(PRIEST_STAFF_0)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Looks dangerous....")
sm.showEffectOnPosition("Morph/1200.img/DKdragonUpper",500,-102,239)
sm.showEffect("Skill/6112.img/skill/61121052/effect", 0, -103, 239,0, 0, False, 1)
sm.sendDelay(1000)
sm.showNpcSpecialActionByTemplateId(PRIEST_NONE_1, "die1", 2000)
#sm.showNpcSpecialActionByTemplateId(PRIEST_STAFF_0, "die1", 2000)
sm.showNpcSpecialActionByTemplateId(PRIEST_STAFF_1, "die1", 2000)
sm.sendDelay(2000)
#sm.removeNpc(PRIEST_STAFF_0)
sm.removeNpc(PRIEST_STAFF_1)
sm.removeNpc(PRIEST_NONE_1)
sm.sendDelay(2000)
sm.setSpeakerID(PRIEST_NONE_1)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("W-What is this madness!?")
sm.lockInGameUI(False, False)
sm.removeNpc(PRIEST_STAFF_0)
sm.removeNpc(TEAR)
sm.showFade(500)
sm.warp(940001240)

