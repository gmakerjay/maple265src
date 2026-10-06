#NPC
CARTALION = 3000107
#MOB
SPECTER_SHIELD = 9300545
SPECTER_GUERILLA = 9300546
CHECK = 0
sm.lockInGameUI(True, False)
sm.showNpcSpecialActionByTemplateId(CARTALION, "say", 2000)
sm.moveCamera(False ,500,-2800,29)
sm.setCameraOnNpc(CARTALION)
sm.sendDelay(1000)
sm.moveCameraBack(500)
sm.resetCamera()
sm.showBalloonMsg("Effect/Direction9.img/effect/tuto/BalloonMsg1/1", 2000)
sm.sendDelay(1000)
sm.showNpcSpecialActionByTemplateId(CARTALION, "eye", 3000)

sm.forcedInput(2)
sm.sendDelay(1000)
sm.forcedInput(0)

sm.moveCamera(False ,500,-1000,29)
sm.sendDelay(1000)
sm.spawnMob(SPECTER_SHIELD,-1600,29,False)
sm.spawnMob(SPECTER_GUERILLA,-1500,29,False)
sm.sendDelay(500)

sm.spawnMob(SPECTER_SHIELD,-1400,29,False)
sm.spawnMob(SPECTER_GUERILLA,-1300,29,False)
sm.sendDelay(500)
sm.spawnMob(SPECTER_SHIELD,-1200,29,False)
sm.spawnMob(SPECTER_GUERILLA,-1100,29,False)
sm.sendDelay(500)

sm.spawnMob(SPECTER_SHIELD,-1000,29,False)
sm.spawnMob(SPECTER_GUERILLA,-900,29,False)
sm.sendDelay(500)
sm.spawnMob(SPECTER_SHIELD,-800,29,False)
sm.spawnMob(SPECTER_GUERILLA,-700,29,False)

sm.moveCameraBack(500)
sm.lockInGameUI(False, False)
sm.showFieldEffect("Map/Effect.img/xenon/text9",2000)
sm.addPopUpSay(2007, 10000, "#eThe Gigas Wave#n #g(Del)#k Blasts enemies with a powerful slash of your blade.\r\n", "FarmSE.img/boxResult")


CHECK = 1

while CHECK == 1:
    while not sm.hasMobsInField():
        #sm.showFieldEffect("Map/EffectTW.img/arisan/clear")
        CHECK = 2
        sm.removeNpc(CARTALION)
        sm.warp(940001050)
        break
