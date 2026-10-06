from net.swordie.ms.world.field.fieldeffect import GreyFieldType

sm.lockInGameUI(True, False)
sm.playExclSoundWithDownBGM("Bgm40.img/SecretMission", 100)
sm.setFieldColour(GreyFieldType.Field, 0, 0, 0, 0)
sm.hideUser(True)
sm.sendDelay(1200)
sm.showFieldEffect("Map/Effect.img/xenon/text8")
sm.sendDelay(1000)
sm.setFieldColour(GreyFieldType.Field, 255, 255, 255, 0)
sm.hideUser(False)

sm.spawnNpc(GELIMER, -189,63)
sm.flipNpcByTemplateId(GELIMER, False)
sm.showNpcSpecialActionByTemplateId(GELIMER, "say", 90000)
sm.showEffectOnPosition("Effect/Direction12.img/effect/tuto/doorOpen",2000,0,0)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/9", 2000, GELIMER )
sm.sendDelay(2000)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/10", 2000, GELIMER )
sm.sendDelay(2000)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/8", 2000, GELIMER )
sm.sendDelay(2000)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg2/7", 2000, GELIMER )
sm.sendDelay(2000)


sm.removeNpc(GELIMER)
sm.showFade(500)
sm.warp(931060081)

sm.lockInGameUI(False, False)