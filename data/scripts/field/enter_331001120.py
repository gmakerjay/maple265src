# ParentID: 331001120
# ObjectID: 0
# Character field ID when accessed: 331001120
#NPC
JAY = 1531001
#MOB
TRAININGBOT_A = 2700302
TRAININGBOT_B = 2700300
TRAININGBOT_C = 2700309

sm.spawnMob(TRAININGBOT_A,629,63, False)

sm.lockInGameUI(True, False)

sm.setSpeakerID(JAY)
sm.removeEscapeButton()
sm.setBoxChat()
sm.showFade(500)
sm.sendNext("Before we measure your combat capability, I want you to destroy that training robot A in front of you. Let's check your basic settings first.")

sm.chatScript("Use the Basic Attack key and skills to eliminate enemies.")
sm.playExclSoundWithDownBGM("Voice3.img/Kinesis/guide_06", 100)
#sm.showBalloonMsg("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 2000)
#TODO ADD EFFECT ATTACK 
#TODO ADD START QUEST
sm.lockInGameUI(False, False)
while sm.hasMobById(TRAININGBOT_A):
    sm.waitForMobDeath()
        #TODO ADD EFFECT LOOT
    #sm.sendDelay(200)
    sm.setSpeakerID(JAY)
    sm.removeEscapeButton()
    sm.setBoxChat()
    sm.showFade(500)
    sm.lockInGameUI(True, False)
    sm.sendNext("Good, everything's being measured properly. Now let's start the test. Destrory all the 5 training robots B up there.")
    sm.chatScript("Press Z to pick up items.")
    sm.spawnMob(TRAININGBOT_B,821,-150, False)
    sm.spawnMob(TRAININGBOT_B,510,-150, False)
    sm.spawnMob(TRAININGBOT_B,-61,-179, False)
    sm.spawnMob(TRAININGBOT_B,148,-179, False)
    sm.spawnMob(TRAININGBOT_B,307,-179, False)
    sm.sendDelay(1000)    
    sm.playExclSoundWithDownBGM("UI.img/Focus3", 100)
    sm.moveCamera(False ,1000, 307,-179)
    sm.moveCameraBack(1000)
   
    sm.lockInGameUI(False, False)   
    sm.sendNext("Press Z to pick up components broken off the robots. When you're done, use the portal on the left to come back to me.")
    sm.playExclSoundWithDownBGM("Voice3.img/Kinesis/guide_12", 100)
    
while sm.hasMobById(TRAININGBOT_B):
    while not sm.hasMobsInField():
        #sm.waitForMobDeath()
        sm.showFieldEffect("Map/EffectTW.img/arisan/clear")
        break
