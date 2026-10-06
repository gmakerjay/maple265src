FREUD = 2159357

sm.lockInGameUI(True,False)
sm.curNodeEventEnd(True)
sm.forcedInput(0)

sm.spawnNpc(FREUD, 300, -80)
sm.showNpcSpecialActionByTemplateId(FREUD, "summon", 0)

sm.setSpeakerID(FREUD)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendNext("#b(What happened?)#k")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendSay("#b(I activated all 5 seals.)#k")

sm.setSpeakerID(FREUD)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendSay("#b(Now we have to force the Black Mage's hand. The only way to get him to use his full power is if you use your Light magic against him.)#k")

sm.moveCamera(False, 300, 0, -500)

sm.showFieldEffect("lightning/screenMsg/3")
sm.playExclSoundWithDownBGM("Voice.img/DarkMage/1", 100)
sm.sendDelay(4000)

sm.moveCamera(True, 0, 0, 0)

sm.forcedInput(1)
sm.sendDelay(1000)

sm.forcedInput(0)
sm.showEffect("Effect/Direction8.img/effect/tuto/BalloonMsg0/8", 0, 0, -100, -2, -2, False, 0)
sm.sendDelay(2300)

sm.showEffect("Effect/Direction8.img/effect/tuto/BalloonMsg0/9", 0, 0, -100, -2, -2, False, 0)
sm.sendDelay(1500)

sm.moveCamera(False, 300, 0, -500)

sm.playExclSoundWithDownBGM("Voice.img/DarkMage/4", 100)
sm.showFieldEffect("demonSlayer/whiteOut")
sm.sendDelay(5000)

sm.lockInGameUI(False,False)
sm.removeNpc(FREUD)
sm.showFade(500)
sm.warp(927020100)