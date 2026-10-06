# Character field ID when accessed: 940001210
# ObjectID: 0
# ParentID: 940001210
TEAR = 3000103
VELDEROTH = 3000104
PRIEST_STAFF_0 = 3000114
PRIEST_STAFF_1 = 3000114

PRIEST_NONE_0 = 3000110
PRIEST_NONE_1 = 3000111

sm.removeNpc(TEAR)
sm.removeNpc(VELDEROTH)
sm.removeNpc(PRIEST_STAFF_0)
sm.removeNpc(PRIEST_STAFF_1)
sm.removeNpc(PRIEST_NONE_1)
sm.removeNpc(PRIEST_NONE_0)


sm.lockInGameUI(True, False)


sm.spawnNpc(TEAR,-378,239)
sm.spawnNpc(VELDEROTH,-449,239)

sm.flipNpcByTemplateId(VELDEROTH, False)
sm.flipNpcByTemplateId(TEAR, False)

sm.spawnNpc(PRIEST_NONE_0,93,239)
sm.spawnNpc(PRIEST_STAFF_0,248,239)

sm.spawnNpc(PRIEST_NONE_1,-59,239)
sm.spawnNpc(PRIEST_STAFF_1,-165,239)
sm.flipNpcByTemplateId(PRIEST_NONE_1, False)
sm.flipNpcByTemplateId(PRIEST_STAFF_1, False)
sm.showNpcSpecialActionByTemplateId(VELDEROTH, "say", 20000)
sm.showNpcSpecialActionByTemplateId(TEAR, "say", 20000)
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, TEAR )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, VELDEROTH )
sm.showBalloonMsg("Effect/Direction12.img/effect/tuto/BalloonMsg1/3", 2000)
sm.sendDelay(2000)

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("Well, those priests are keeping busy. It's funny, though..... I don't recognize any of them.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Shhh! Something is not right. Velderoth!")

sm.setSpeakerID(VELDEROTH)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("You're right. They look suspicious. I'm going to run back to base and get help. You two stay here and keep an eye on them, okay? But no heroics. You get out of here if they spot you.")

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg0/0", 2000, TEAR )
sm.sendDelay(2000)

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("What are you talking about?")

sm.removeNpc(VELDEROTH)

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("They attacked the East Sanctum? What are they trying to do with the Relic?")

sm.setSpeakerID(PRIEST_NONE_0)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("The relic's disappearance should weaken the shields.")

sm.setSpeakerID(PRIEST_STAFF_0)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I thought the relic was cursed... should we really be touching it?")

sm.setSpeakerID(PRIEST_NONE_0)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("I did not realize they allowed superstitious nincomppops entry to our order! Will you balk at the call of destiny?")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Are they trying to take the Relic?")

sm.setSpeakerID(TEAR)
sm.removeEscapeButton()
sm.setBoxChat()    
sm.sendNext("We gotta stop them!")

sm.moveNpcByTemplateId(TEAR, False, 400, 100)
sm.sendDelay(1000)
sm.forcedInput(2)
sm.sendDelay(2000)
sm.forcedInput(0)

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, PRIEST_STAFF_0 )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, PRIEST_STAFF_1 )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, PRIEST_NONE_1 )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, PRIEST_NONE_0 )
sm.showBalloonMsgOnNpc("Effect/Direction9.img/effect/story/BalloonMsg1/7", 2000,TEAR)
sm.sendDelay(2000)
sm.showFieldEffect("Map/Effect.img/kaiser/tear_rush")
sm.sendDelay(2000)
sm.lockInGameUI(False, False)

sm.removeNpc(TEAR)

sm.removeNpc(PRIEST_STAFF_0)
sm.removeNpc(PRIEST_STAFF_1)
sm.removeNpc(PRIEST_NONE_1)
sm.removeNpc(PRIEST_NONE_0)
sm.showFade(500)
sm.warp(940001220)