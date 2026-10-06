CLAUDINE = 2159382
CLAUDINE_2 = 2159383
BRIGHTON = 2159386
BELLE = 2159385
GELIMER = 2159377
BERYL = 2159378
#MOB
ANDROID = 9300682


sm.lockInGameUI(True, False)
sm.removeNpc(CLAUDINE)
sm.removeNpc(CLAUDINE_2)
sm.removeNpc(BRIGHTON)
sm.removeNpc(BELLE)
sm.removeNpc(GELIMER)
sm.removeNpc(BERYL)
sm.hideUser(True)
sm.showEffectOnPosition("Mob/9300682.img/stand",2000,45,43)
sm.showEffectOnPosition("Mob/9300682.img/stand",2000,-45,43)
sm.sendDelay(2000)
sm.showFade(1000)
sm.showEffectOnPosition("Mob/9300682.img/die1",2000,45,43)
sm.sendDelay(500)
sm.showEffectOnPosition("Mob/9300682.img/die1",2000,45,43)
sm.sendDelay(500)


sm.spawnNpc(CLAUDINE, 250,43)
sm.spawnNpc(BRIGHTON, 400,43)
sm.spawnNpc(BELLE, 431,43)
sm.moveCamera(False ,500, 27, 43)
sm.sendDelay(2000)


sm.setSpeakerID(BRIGHTON)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("They just keep coming!")

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("We heard there was a hidden lab here, but this is something big!")

sm.setSpeakerID(BELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("With defenses like these, they must be hiding something big. And I'm going to find out what.")

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("You're cool as can be, aren't you Belle? Nothing phases you.")

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CLAUDINE )
sm.sendDelay(2000)
sm.flipNpcByTemplateId(CLAUDINE, False)
sm.flipNpcByTemplateId(BRIGHTON, True)
sm.showNpcSpecialActionByTemplateId(BRIGHTON, "move", 2000)

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/12", 2000, CLAUDINE )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, BRIGHTON )
#sm.sendDelay(2000)
sm.sendDelay(2000)
sm.showNpcSpecialActionByTemplateId(CLAUDINE, "catched", 1)
sm.flipNpcByTemplateId(BRIGHTON, False)
sm.moveNpcByTemplateId(BRIGHTON, False, 100, 100)
sm.sendDelay(2000)
sm.flipNpcByTemplateId(BRIGHTON, True)
sm.moveNpcByTemplateId(BRIGHTON, True, 50, 100)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/13", 2000, BELLE )
sm.hideUser(False)
sm.forcedInput(0)
sm.moveCameraBack(500)
sm.removeNpc(CLAUDINE)
sm.spawnNpc(CLAUDINE_2, 250,43)

sm.forcedInput(2)
sm.sendDelay(7000)
sm.forcedInput(0)

sm.setPlayerBoxChat()
sm.sendNext("Attack on my command")

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CLAUDINE_2 )

sm.setSpeakerID(BELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Get away from Claudine!")
sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000)
sm.sendDelay(1000)

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Argh, M...My head! It......hurts")
sm.showEffectToField("Effect/Direction12.img/effect/memory/0")
sm.sendNext("Get away from Claudine!")
if chr.getAvatarData().getAvatarLook().getGender() == 0:
    sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/memory/0", 2000)
elif chr.getAvatarData().getAvatarLook().getGender() == 1:
    sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/memory/1", 2000)
    
sm.spawnNpc(GELIMER,-782,43) 
sm.spawnNpc(BERYL,-782,43)
sm.flipNpcByTemplateId(GELIMER, False)   
sm.moveNpcByTemplateId(GELIMER, False, 700, 200)
sm.moveNpcByTemplateId(BERYL, False, 600, 150)
sm.sendDelay(5000)
sm.showNpcSpecialActionByTemplateId(GELIMER, "say", 90000)
sm.sendDelay(2000)

sm.setSpeakerID(GELIMER)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("What are you doing?! Capture them! Capture them all!")

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, BRIGHTON )
sm.sendDelay(1000)

sm.setSpeakerID(BRIGHTON)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Belle! Get out of here!")

sm.setSpeakerID(BELLE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("What about Claudine?")

sm.setSpeakerID(BRIGHTON)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("She'll be okay! We need to get back-up!")

sm.showEffectOnPosition("Effect/Direction12.img/effect/tuto/smog",2000,400,43)
sm.sendDelay(1000)
sm.showEffectOnPosition("Effect/Direction12.img/effect/tuto/smogEnd",2000,400,43)

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/14", 2000, CLAUDINE_2 )
sm.sendDelay(2000)
sm.removeNpc(BRIGHTON)
sm.removeNpc(BELLE)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, GELIMER )
sm.sendDelay(2000)

sm.setSpeakerID(GELIMER)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Don't let them get away!")
sm.sendNext("Xenon! Watch this one! Beryl, you and i will chase down the rest of these rats!")
sm.moveNpcByTemplateId(GELIMER, False, 200, 200)
sm.moveNpcByTemplateId(BERYL, False, 200, 150)
sm.sendDelay(2000)
sm.showFade(500)
sm.warp(931050950)

sm.lockInGameUI(False, False)


sm.removeNpc(BERYL)
sm.removeNpc(CLAUDINE_2)

sm.removeNpc(GELIMER)
