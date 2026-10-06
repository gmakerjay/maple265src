# ObjectID: 0
# Character field ID when accessed: 940011040
# ParentID: 940011040
from net.swordie.ms.world.field.fieldeffect import GreyFieldType
NEFARIOUS_1 = 3000110
NEFARIOUS_2 = 3000114
KYLE = 3000141
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.removeNpc(KYLE)
sm.removeNpc(NEFARIOUS_2)
sm.removeNpc(NEFARIOUS_1)

sm.spawnNpc(KYLE,-187,239)
sm.spawnNpc(NEFARIOUS_1,100,239)
sm.spawnNpc(NEFARIOUS_2,200,239)
sm.flipNpcByTemplateId(KYLE, False)

sm.forcedInput(2)
sm.sendDelay(500)
sm.faceOff(20226)
sm.forcedInput(4)

sm.setSpeakerID(NEFARIOUS_2)
sm.setBoxChat()  
sm.sendNext("W-what is this madness?!")

sm.setSpeakerID(NEFARIOUS_1)
sm.setBoxChat()  
sm.sendNext("How could a mere child have that kind of power?!")

sm.setSpeakerID(NEFARIOUS_2)
sm.setBoxChat()  
sm.sendNext("He seems to be unconscious. We are lucky.")

sm.setSpeakerID(NEFARIOUS_1)
sm.setBoxChat()  
sm.sendNext("They came out of nowhere. We must eliminate them before more come.")

sm.showBalloonMsg("Effect/Direction10.img/effect/story/BalloonMsg0/2",2000)
sm.sendDelay(2000)
sm.forcedInput(0)
sm.sendDelay(500)

sm.setSpeakerID(NEFARIOUS_2)
sm.setBoxChat()  
sm.sendNext("He's waking up!.")

sm.forcedAction(5, 0)
sm.showEffect("Skill/6512.img/skill/65121002/effect", 0, 8, 239,0, 0, False, 1)
sm.sendDelay(1000)
sm.showNpcSpecialActionByTemplateId(NEFARIOUS_2, "die1", 3000)
sm.showNpcSpecialActionByTemplateId(NEFARIOUS_1, "die1", 3000)
sm.setFieldGrey(GreyFieldType.Field, True)
sm.warp(940011050, 0)
sm.removeNpc(NEFARIOUS_2)
sm.removeNpc(NEFARIOUS_1)
sm.removeNpc(KYLE)
