from net.swordie.ms.world.field.fieldeffect import GreyFieldType
#NPC
MAGNUS = 3000131
#MOB
MAGICIAN_SPECTER_NPC = 3000125
WARRIOR_SPECTER_NPC = 3000122

MAGICIAN_SPECTER_MOB = 9300548
WARRIOR_SPECTER_MOB = 9300547
CHECK = 0

sm.lockInGameUI(True, False)

sm.removeNpc(MAGNUS)
for i in range(5):
    sm.removeNpc(MAGICIAN_SPECTER_NPC)
for i in range(4):
    sm.removeNpc(WARRIOR_SPECTER_NPC)
    
sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Kaiser... you're late.")

sm.forcedInput(2)
sm.sendDelay(3000)
sm.forcedInput(0)
sm.sendDelay(2000)

sm.spawnNpc(MAGNUS,-450,178)
sm.moveCamera(False ,500, -450,178)
sm.sendDelay(1000)


sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Magnus! What are you doing here.")

sm.forcedInput(2)
sm.sendDelay(6000)
sm.forcedInput(0)

sm.sendDelay(2000)

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Heliseum? Darmoor took it. Plain and simple.")

#sm.moveCameraBack(1000)
sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg1/2",2000)
sm.showNpcSpecialActionByTemplateId(MAGNUS, "fake", 5000)
sm.sendDelay(2000)

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("No... but what of you? Are you injured? You fought against Darmoor's army?")

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Im...unharmed. And the fight? What do you expect from someone who was exiled?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("But ... How did Darmoor's army get insade Heliseum? What did they do to the shield?")

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("There was a traitor of course. The traitor disabled the shield so the Specters could overrun Heliseum.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Magnus... Who would do such a thing?")

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Me.")
#sm.lockInGameUI(False, False)

sm.teleportInField(-869,178)
sm.removeNpc(MAGNUS)

sm.setFieldColour(GreyFieldType.Field, 0, 0, 0, 0)
sm.hideUser(True)
sm.showFade(500)
sm.showFieldEffect("Effect/Direction9.img/effect/tuto/illust0/0",2000)
sm.sendDelay(5000)
sm.setFieldColour(GreyFieldType.Field, 255, 255, 255, 0)
sm.spawnNpc(MAGNUS,-417,178)
sm.hideUser(False)

sm.sendDelay(1000)
sm.showFade(500)
sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("How DARE,you lay Heliseum at Darmoor's feet! You are a DISGRACE to the people of Nova!")
sm.sendNext("The Council spared you, and this is how you repay them? I'll never forgive you! NEVER!")

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I wouldn't expect you to understand, I want power...and Darmoor gave it to me.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("I don't know what kind of power you've got, and I don't care. This wound isn't going to stop me from striking you down!")

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Temper, temper. I don't think you understand your situation. Let me break it down for you.")
sm.sendNext("First. I admin that I might not have the power to defeat you, mighty Kaiser, even with my added power from Darmoor. However, don't make the mistake of thinking I have no plan to counter your strength.")
sm.sendNext("You say your wound isn't going to stop you. But that blade was coated in a vicious posion that will sap your strength, tipping the odds in my favor.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Heh... Then all I have to do is beat your before the poison takes full effect.")

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Indeed. Which brings me to my second point. You're not just fighting me, you know. Heliseum has been overruh with thousands of Specters, all under my command. Even at full strength, I doubt you could beat so many.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("I won't know until I try")
sm.sendDelay(500)

sm.spawnNpc(MAGICIAN_SPECTER_NPC,-791,178)
sm.sendDelay(500)
sm.spawnNpc(WARRIOR_SPECTER_NPC,-691,178)
sm.sendDelay(500)
sm.spawnNpc(MAGICIAN_SPECTER_NPC,-591,178)
sm.sendDelay(500)

sm.forcedInput(1)
sm.sendDelay(500)
sm.forcedInput(0)

sm.spawnNpc(WARRIOR_SPECTER_NPC,-1143,178)
sm.flipNpcByTemplateId(WARRIOR_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(MAGICIAN_SPECTER_NPC,-1243,178)
sm.flipNpcByTemplateId(MAGICIAN_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(WARRIOR_SPECTER_NPC,-1343,178)
sm.flipNpcByTemplateId(WARRIOR_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(MAGICIAN_SPECTER_NPC,-1443,178)
sm.flipNpcByTemplateId(MAGICIAN_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(WARRIOR_SPECTER_NPC,-1543,178)
sm.flipNpcByTemplateId(WARRIOR_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(MAGICIAN_SPECTER_NPC,-1643,178)
sm.flipNpcByTemplateId(MAGICIAN_SPECTER_NPC, False)
sm.sendDelay(500)

sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg1/2",2000)

sm.forcedInput(2)
sm.sendDelay(500)
sm.forcedInput(0)

sm.sendDelay(1000)
sm.showBalloonMsg("Effect/Direction9.img/effect/tuto/BalloonMsg2/0", 2000)
sm.sendDelay(2000)
sm.showBalloonMsgOnNpc("Effect/Direction9.img/effect/tuto/BalloonMsg1/2", 2000,MAGNUS)
sm.sendDelay(2000)

sm.spawnMob(MAGICIAN_SPECTER_MOB,-791,178,False)
sm.spawnMob(WARRIOR_SPECTER_MOB,-691,178,False)
sm.spawnMob(MAGICIAN_SPECTER_MOB,-591,178,False)

sm.spawnMob(WARRIOR_SPECTER_MOB,-1143,178,False)
sm.spawnMob(MAGICIAN_SPECTER_MOB,-1243,178,False)
sm.spawnMob(WARRIOR_SPECTER_MOB,-1343,178,False)
sm.spawnMob(MAGICIAN_SPECTER_MOB,-1443,178,False)
sm.spawnMob(WARRIOR_SPECTER_MOB,-1543,178,False)
sm.spawnMob(MAGICIAN_SPECTER_MOB,-1643,178,False)
sm.moveCamera(True, 0, 0, 0)
for i in range(5):
    sm.removeNpc(MAGICIAN_SPECTER_NPC)
for i in range(4):
    sm.removeNpc(WARRIOR_SPECTER_NPC)


sm.lockInGameUI(False, False)
sm.showFieldEffect("Map/Effect.img/xenon/text9",2000)
sm.addPopUpSay(2007, 10000, "#eThe Gigas Wave#n #g(Del)#k Blasts enemies with a powerful slash of your blade.\r\n", "FarmSE.img/boxResult")

CHECK = 1
while CHECK == 1:
    while not sm.hasMobsInField():
        sm.warp(940001110)
        sm.removeNpc(MAGNUS)
        CHECK = 2
        break



