# ObjectID: 0
# Character field ID when accessed: 940011030
# ParentID: 940011030
KYLE = 3000140
VELDEROTH = 3000104
NEFARIOUS_1 = 3000112
NEFARIOUS_2 = 3000114

NEFARIOUS_3 = 3000112
NEFARIOUS_4 = 3000114
sm.lockInGameUI(True, False)
sm.removeEscapeButton()

sm.removeNpc(KYLE)
sm.removeNpc(VELDEROTH)
sm.removeNpc(NEFARIOUS_2)
sm.removeNpc(NEFARIOUS_1)
sm.removeNpc(NEFARIOUS_3)
sm.removeNpc(NEFARIOUS_4)

sm.spawnNpc(VELDEROTH,-480,239)
sm.spawnNpc(KYLE,-380,239)

sm.spawnNpc(NEFARIOUS_1,100,239)
sm.spawnNpc(NEFARIOUS_2,200,239)

sm.spawnNpc(NEFARIOUS_4,-76,239)
sm.spawnNpc(NEFARIOUS_3,-176,239)

sm.flipNpcByTemplateId(NEFARIOUS_4,False)
sm.flipNpcByTemplateId(NEFARIOUS_3,False)
sm.flipNpcByTemplateId(VELDEROTH, False)
sm.flipNpcByTemplateId(KYLE, False)

sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 20000)
sm.showNpcSpecialActionByTemplateId(KYLE,"say", 20000)


sm.sendDelay(500)
sm.setSpeakerID(VELDEROTH)
sm.setBoxChat()  
sm.sendNext("Nothing here, big surpise.....")
sm.sendDelay(1000)

sm.showBalloonMsgOnNpc("Effect/Direction10.img/effect/story/BalloonMsg1/0",2000,KYLE)
sm.showBalloonMsgOnNpc("Effect/Direction10.img/effect/story/BalloonMsg1/0",2000,VELDEROTH)
sm.showBalloonMsg("Effect/Direction10.img/effect/story/BalloonMsg1/3",2000)
sm.sendDelay(2000)

sm.setPlayerBoxChat()
sm.sendNext("Hey, who are those priests? I've never seen 'em before.")

sm.setSpeakerID(KYLE)
sm.setBoxChat()  
sm.sendNext("Velderoth, this isn't right!")

sm.setSpeakerID(VELDEROTH)
sm.setBoxChat()  
sm.sendNext("You're right. They look suspicious. I'm going to run back to base and get help. You two stay here and keep an eye on them,okay. But no heroics. You get out of here if they spot you.")

sm.showBalloonMsg("Effect/Direction10.img/effect/story/BalloonMsg0/0",2000)
sm.sendDelay(2000)

sm.setPlayerBoxChat()
sm.sendNext("What are they talking about?")

sm.removeNpc(VELDEROTH)

sm.setSpeakerID(NEFARIOUS_1)
sm.setBoxChat()  
sm.sendNext("The relic's disappearance should weaken the shields.")

sm.setSpeakerID(NEFARIOUS_2)
sm.setBoxChat()  
sm.sendNext("I thounght the relic was cursed... should we really be touching it?")

sm.setSpeakerID(NEFARIOUS_1)
sm.setBoxChat()  
sm.sendNext("I did not realize they allowed superstitious nincompoops entry to our order! Will you balk at the call of desstiny?")

sm.setPlayerBoxChat()
sm.sendNext("(Are they trying to steal the relic?)")

sm.setSpeakerID(KYLE)
sm.setBoxChat()  
sm.sendNext("They're gonna take the relic away!")

sm.setPlayerBoxChat()
sm.sendNext("Lets stop them!")
sm.sendDelay(500)

sm.showBalloonMsgOnNpc("Effect/Direction10.img/effect/story/BalloonMsg1/1",2000,NEFARIOUS_1)
sm.showBalloonMsgOnNpc("Effect/Direction10.img/effect/story/BalloonMsg1/1",2000,NEFARIOUS_2)
sm.showBalloonMsgOnNpc("Effect/Direction10.img/effect/story/BalloonMsg1/1",2000,NEFARIOUS_3)
sm.showBalloonMsgOnNpc("Effect/Direction10.img/effect/story/BalloonMsg1/1",2000,NEFARIOUS_4)
sm.showBalloonMsg("Effect/Direction10.img/effect/story/BalloonMsg1/6",3000)
sm.forcedInput(2)
sm.moveNpcByTemplateId(KYLE, False, 2000, 150)
sm.sendDelay(3000)
sm.forcedInput(0)
sm.sendDelay(3000)

