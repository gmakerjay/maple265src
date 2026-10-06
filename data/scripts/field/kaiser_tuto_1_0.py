# Character field ID when accessed: 940001010
# ObjectID: 0
# ParentID: 940001010
#NPC
CARTALION = 3000107
#MOB
SPECTER_SHIELD = 9300545
SPECTER_GUERILLA = 9300546
CHECK = 0
sm.lockInGameUI(True, False)
sm.giveSkill(60001229, 1)
sm.setFuncKeyByScript(True, 60001229, 83)
sm.removeNpc(CARTALION)

sm.spawnNpc(CARTALION,-2800,29)
sm.flipNpcByTemplateId(CARTALION, False)

sm.showFade(500)
sm.setSpeakerID(CARTALION)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Kaiser, this won't do. Come with me. There are orther trustworthy people in Pantheon besides me.")

sm.forcedInput(1)
sm.sendDelay(2000)
sm.forcedInput(0)

sm.lockInGameUI(False,False)