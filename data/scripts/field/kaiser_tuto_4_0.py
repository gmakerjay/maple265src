# ObjectID: 0
# Character field ID when accessed: 940001110
# ParentID: 940001110
#NPC
MAGNUS = 3000131
#MOB

REAPER_SPECTER_NPC = 3000128

REAPER_SPECTER_MOB = 9300549

CHECK = 0

sm.lockInGameUI(True, False)

sm.removeNpc(MAGNUS)
sm.spawnNpc(MAGNUS,-417,178)
for i in range(9):
    sm.removeNpc(REAPER_SPECTER_NPC)

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Bravo, Kaiser. Defiant to the last. I look forward to seeing how many Specters you can cut down before they overwhelm you.")

sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendNext("Sorry to disappoint, but you're going first, Magnus")

sm.sendDelay(500)
sm.spawnNpc(REAPER_SPECTER_NPC,-791,178)
sm.sendDelay(500)
sm.spawnNpc(REAPER_SPECTER_NPC,-691,178)
sm.sendDelay(500)
sm.spawnNpc(REAPER_SPECTER_NPC,-591,178)
sm.sendDelay(500)

sm.forcedInput(1)
sm.sendDelay(500)
sm.forcedInput(0)

sm.sendDelay(500)
sm.spawnNpc(REAPER_SPECTER_NPC,-1143,178)
sm.flipNpcByTemplateId(REAPER_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(REAPER_SPECTER_NPC,-1243,178)
sm.flipNpcByTemplateId(REAPER_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(REAPER_SPECTER_NPC,-1343,178)
sm.flipNpcByTemplateId(REAPER_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(REAPER_SPECTER_NPC,-1443,178)
sm.flipNpcByTemplateId(REAPER_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(REAPER_SPECTER_NPC,-1543,178)
sm.flipNpcByTemplateId(REAPER_SPECTER_NPC, False)
sm.sendDelay(500)

sm.spawnNpc(REAPER_SPECTER_NPC,-1643,178)
sm.flipNpcByTemplateId(REAPER_SPECTER_NPC, False)
sm.sendDelay(1000)

sm.forcedInput(2)
sm.sendDelay(500)
sm.forcedInput(0)
sm.setCameraOnNpc(MAGNUS)
sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Oh, I doubt that very much. There are still plenty of Specters here to head you off. That poison taking effect yet?")


sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("You're a coward, Magnus. Hiding behind your minions and dirty tricks, all earned by licking the boots of Darmoor. You have no ho honor.")

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Honor is overrated, I just want to watch you suffer, and look! I got what I wanted.")
sm.sendNext("Oh, but don't worry. I'm merciful enough to end your life with my own hands. Kaiser may return, but I'll take great pleasure in ending your career.")
sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg1/2",2000)
sm.sendDelay(2000)

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("(This poison is spreading too fast. This might be my last chance. I have to do what I can to end this quickly.)")

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Even when you reincarnate, you'll be right  back to square one. Too weak to oppose us. It's all over for you.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Enought talk, Magnus. Let us end this.")
sm.sendDelay(2000)

sm.showEffectOnPosition("Effect/Direction9.img/effect/tuto/Effect/0",2000,-909,178)
sm.hideUser(True)
sm.sendDelay(2000)
sm.showEffectOnPosition("Morph/1200.img/stand",5000,-909,178)
sm.sendDelay(2000)

sm.setSpeakerID(MAGNUS)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Now THIS is what i wanted! I was afraid the poison might stop you from transforming, but you don't disappoint, I always wanted to test my strength against your true form. Have at you!")

sm.lockInGameUI(False, False)

for i in range(9):
    sm.removeNpc(REAPER_SPECTER_NPC)
    sm.removeNpc(MAGNUS)
sm.showFade(500)
sm.warp(940002030)