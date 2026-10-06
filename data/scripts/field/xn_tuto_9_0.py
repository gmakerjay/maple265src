# ParentID: 931050970
# ObjectID: 0
# Character field ID when accessed: 931050970
ROOB_D = 2159380
CLAUDINE = 2159384
ANDROID = 9300682

sm.lockInGameUI(True, False)
sm.removeNpc(ROOB_D)
sm.removeNpc(CLAUDINE)



sm.forcedInput(2)
sm.sendDelay(1000)
sm.forcedInput(0)
sm.sendDelay(1000)


sm.spawnNpc(ROOB_D, -1695,32)
sm.spawnNpc(CLAUDINE, -1590,32)
sm.flipNpcByTemplateId(CLAUDINE, False)
sm.flipNpcByTemplateId(ROOB_D, False)

sm.setSpeakerID(ROOB_D)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("This corridor leads to the Silo, and outside... We're going to run into alot of Guard Robots on the way.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("I'll handle them. Don't worry")

sm.setSpeakerID(CLAUDINE)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I'm afraid I'm not going to be much use in a fight with this injured arm... Are you sure about this?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Let's give it a try")

sm.moveNpcByTemplateId(ROOB_D, False, 2000, 100)
sm.moveNpcByTemplateId(CLAUDINE, False, 2000, 100)
sm.spawnMob(ANDROID,-1249,32, False)
sm.spawnMob(ANDROID,-1249,32, False) 
sm.spawnMob(ANDROID,-382,0, False)
sm.spawnMob(ANDROID,-154,32, False)
sm.spawnMob(ANDROID,-154,32, False)
sm.spawnMob(ANDROID,0,32, False)
sm.spawnMob(ANDROID,0,32, False)




sm.lockInGameUI(False, False)