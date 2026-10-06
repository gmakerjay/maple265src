# ParentID: 931060060
# Character field ID when accessed: 931060060
# ObjectID: 0
ROOB_D = 2159380
CLAUDINE = 2159384
BERYL = 2159378
ELEX = 2159388
BRIGHTON = 2159386
CHECKY = 2159387
BELLE = 2159385

sm.lockInGameUI(True, False)

sm.removeNpc(ROOB_D)
sm.removeNpc(CLAUDINE)
sm.removeNpc(BERYL)
sm.removeNpc(BELLE)
sm.removeNpc(BRIGHTON)
sm.removeNpc(ELEX)
sm.removeNpc(CHECKY)

sm.spawnNpc(ROOB_D, -1000,43)
sm.spawnNpc(CLAUDINE, -900,43)
sm.flipNpcByTemplateId(CLAUDINE, False)
sm.showNpcSpecialActionByTemplateId(CLAUDINE, "say", 90000)
sm.flipNpcByTemplateId(ROOB_D, False)

sm.spawnNpc(BERYL, -700,43)
sm.spawnNpc(ELEX, -626,43)
sm.spawnNpc(BRIGHTON,-460,43)
sm.spawnNpc(BELLE,-424,43)
sm.spawnNpc(CHECKY,-191,43)
sm.showFade(500)
sm.sendDelay(1000)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/17", 2000, BELLE )
sm.sendDelay(2000)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/18", 2000, BELLE )
sm.sendDelay(2000)

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("The cavalry is here!")

sm.setSpeakerID(CHECKY)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Save the hugs for later, Claudine. We've gotta get you out of here first!")

sm.showNpcSpecialActionByTemplateId(CHECKY, "shoot", 2000)
sm.showEffectOnPosition("Effect/Direction12.img/effect/tuto/smogStart",2000,-191,43)
sm.sendDelay(2000)
sm.showEffectOnPosition("Effect/Direction12.img/effect/tuto/smog",2000,-191,43)
sm.sendDelay(1000)
sm.showEffectOnPosition("Effect/Direction12.img/effect/tuto/smogEnd",2000,-191,43)

sm.removeNpc(ROOB_D)
sm.removeNpc(CLAUDINE)
sm.removeNpc(BELLE)
sm.removeNpc(BRIGHTON)
sm.removeNpc(ELEX)
sm.removeNpc(CHECKY)
sm.hideUser(True)
sm.sendDelay(1000)
sm.showFade(500)
sm.warp(931060070)

sm.lockInGameUI(False, False)