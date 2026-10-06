from net.swordie.ms.world.field.fieldeffect import GreyFieldType

VON_LEON_LAB = 9300635
GELIMER = 2159377
sm.lockInGameUI(True, False)
sm.showFieldEffect("Map/Effect.img/xenon/text9",2000)
sm.spawnMob(VON_LEON_LAB,65,-301,False)
sm.giveSkill(30021238, 1)
sm.lockInGameUI(False, False)
while sm.hasMobById(VON_LEON_LAB):
    sm.waitForMobDeath()
    sm.spawnNpc(GELIMER, -189,63)
    sm.flipNpcByTemplateId(GELIMER, False)
    sm.showNpcSpecialActionByTemplateId(GELIMER, "say", 90000)
    #sm.giveSkill(30021238, 0)
    sm.lockInGameUI(True, False)
    sm.moveCamera(False ,500, 0, 0)
    
    sm.setSpeakerID(GELIMER)
    sm.removeEscapeButton()
    sm.setBoxChat()    
    sm.sendNext("Good, very good! I am very satisfied with these results. Just a few more fine adjustments and...")
    sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, GELIMER )
    sm.flipNpcByTemplateId(GELIMER, True)
    sm.sendDelay(2000)
    sm.sendNext("An intruder?! It could be Orchid. Turn on the monitor!")
    sm.sendNext("Is it the Resistance? I suppose that would be better than Orchid, but.... this is the worst possible time!")
    sm.sendNext("Wait, wait, wait. Maybe this will work. One more test, yes ... they will be perfect... Hahaha.....MWAHAHAHA!")
    sm.showFade(500)
    sm.warp(931050940)
    sm.removeNpc(GELIMER)
    sm.lockInGameUI(False, False)