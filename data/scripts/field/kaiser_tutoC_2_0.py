# ObjectID: 0
# Character field ID when accessed: 940001220
# ParentID: 940001220
TEAR = 3000151
PRIEST_STAFF_0 = 3000114
PRIEST_STAFF_1 = 3000115

PRIEST_NONE_0 = 3000110
PRIEST_NONE_1 = 3000111

sm.removeNpc(TEAR)
sm.removeNpc(PRIEST_STAFF_0)
sm.removeNpc(PRIEST_STAFF_1)
sm.removeNpc(PRIEST_NONE_1)
sm.removeNpc(PRIEST_NONE_0)

sm.lockInGameUI(True, False)

sm.spawnNpc(TEAR,-201,239)
sm.flipNpcByTemplateId(TEAR, False)

sm.spawnNpc(PRIEST_NONE_1,100,239)
sm.spawnNpc(PRIEST_STAFF_0,248,239)
sm.spawnNpc(PRIEST_STAFF_1,0,239)
sm.spawnNpc(PRIEST_NONE_0,-50,239)
sm.sendDelay(2000)

sm.setSpeakerID(PRIEST_STAFF_0)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Eh? A child dares to interfere?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Tear, wait")

sm.setSpeakerID(PRIEST_NONE_0)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("These kids are fearless. A pity we cannot allow any witnesses to excape.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("You think you can take me down? Bring it!")

sm.setSpeakerID(PRIEST_STAFF_0)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Ha! What can you do all by yourself?")

sm.forcedInput(2)
sm.sendDelay(2000)
sm.forcedInput(0)

sm.lockInGameUI(False, False)

sm.removeNpc(TEAR)
sm.removeNpc(PRIEST_STAFF_0)
sm.removeNpc(PRIEST_STAFF_1)
sm.removeNpc(PRIEST_NONE_1)
sm.removeNpc(PRIEST_NONE_0)