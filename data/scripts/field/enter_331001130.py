
# ObjectID: 0
# Character field ID when accessed: 331001130
JAY = 1531001
KINESIS = 1531000
TRAININGBOT_B = 2700300
check = 0
count = 0
sm.lockInGameUI(True, False)

sm.spawnMob(TRAININGBOT_B,396,63, False)
sm.spawnMob(TRAININGBOT_B,396,63, False)
sm.spawnMob(TRAININGBOT_B,157,63, False)
sm.spawnMob(TRAININGBOT_B,157,63, False)
sm.spawnMob(TRAININGBOT_B,420,63, False)
sm.spawnMob(TRAININGBOT_B,420,63, False)

sm.setSpeakerID(JAY)
sm.removeEscapeButton()
    
sm.setBoxChat()
sm.showFade(500)
sm.sendNext("Kinesis, now it's time you use your attack skills.")
sm.sendNext("I'm going to upgrade your ESP limiter data to #btier 1#k.")
sm.sendNext("The Psychic Force #s142001000# #g(End)#k skill pushes monsters in a desired direction.")
sm.giveSkill(142001000, 1)
sm.setFuncKeyByScript(True, 142001000, 79)
sm.sendNext("And the Crash #s142001001# #g(Del)#k skill uses your telekinetic power to launch enemies in the air, and then slam them into the ground.")
sm.giveSkill(142001001, 1)
sm.giveSkill(142001004, 1)
sm.setFuncKeyByScript(True, 142001001, 	83)

sm.setSpeakerID(KINESIS)
sm.removeEscapeButton()
sm.setBoxChat()
sm.sendNext("So you want me to push with the #s142001000# #gShift#k key and attack with the #s142001001# #gDel#k key.")

sm.setSpeakerID(JAY)
sm.removeEscapeButton()
sm.setBoxChat()
sm.sendNext("That's right. And hit the Jump key repeatedly to move farther.")
sm.playExclSoundWithDownBGM("UI.img/Focus3", 100)
sm.moveCamera(False ,5000,-284,63)
sm.moveCameraBack(5000)  
sm.lockInGameUI(False, False)

while check == 0:
    sm.setSpeakerID(JAY)
    sm.removeEscapeButton()
    sm.setBoxChat()
    sm.sendNext("Oh, there's one more thing.")
    sm.sendNext("You can save Psychic Points #g(PP)#k and use the Ultimate skills, the most powerful skills you can use.") 
    sm.sendNext("How do you save Psychic Point, you ask? \r\nEasy. Just use your telekinetic power, and they accumulate automatically.")
    #TODO add effect use FF
    sm.sendNext("If you haven't tried an Ultimate skill, then I'll add one to the  #gIns#k key. Feel free to use it before you get out of there.")
    sm.sendNext("#s142001002# Ultimate: Material #g(Ins)#k skill inflicts great damage and can attack enemies on higher grounds.")
    sm.giveSkill(142001002, 1)
    sm.setFuncKeyByScript(True, 142001002, 82)
    check = 1
while check == 1:
    if not sm.hasMobsInField():
        #sm.showFieldEffect("Map/EffectTW.img/arisan/clear")
        sm.spawnMob(TRAININGBOT_B,337,-238, False)
        sm.spawnMob(TRAININGBOT_B,337,-238, False)
        sm.spawnMob(TRAININGBOT_B,337,-238, False)
        sm.spawnMob(TRAININGBOT_B,474,-238, False)
        sm.spawnMob(TRAININGBOT_B,474,-238, False)
        sm.spawnMob(TRAININGBOT_B,474,-238, False)
        sm.spawnMob(TRAININGBOT_B,300,-238, False)
        sm.spawnMob(TRAININGBOT_B,300,-238, False)
        check = 2
    while sm.hasMobById(TRAININGBOT_B):
        while not sm.hasMobsInField():
            #sm.waitForMobDeath()
            sm.showFieldEffect("Map/EffectTW.img/arisan/clear")
            break

    