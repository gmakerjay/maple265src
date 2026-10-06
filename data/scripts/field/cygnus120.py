# Character field ID when accessed: 910400100
# ObjectID: 0
# ParentID: 910400100
MIHILE = 1104306
HAWKEYE = 1104310
OZ = 1104307
CYGNUS = 1104304
NEINHEART = 1104305
ECKHART = 1104309
IRENA = 1104308
KIRIRU = 1100003
sm.lockInGameUI(True,False)
sm.removeEscapeButton()

sm.setSpeakerID(KIRIRU)
sm.flipSpeaker()
sm.flipDialogue()
sm.setBoxChat()
sm.sendNext("S-Stop. Please! L-listen...")

sm.setSpeakerID(HAWKEYE)
sm.setBoxChat()
sm.sendNext("Kiku, what happended? We need a doctor over here!")

sm.setSpeakerID(KIRIRU)
sm.flipSpeaker()
sm.flipDialogue()
sm.setBoxChat()
sm.sendNext("N-No!No time....Listen....Ereve...Ereve was attacked!")

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, HAWKEYE )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, MIHILE )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, CYGNUS )

sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, NEINHEART )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, ECKHART )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, OZ )
sm.showBalloonMsgOnNpc("Effect/Direction12.img/effect/tuto/BalloonMsg1/2", 2000, IRENA )
sm.sendDelay(1000)

sm.setSpeakerID(KIRIRU)
sm.flipSpeaker()
sm.flipDialogue()
sm.setBoxChat()
sm.sendNext("Shinsoo is still fighting, but it doesn't look good. Please, help him! Save Ereve....*Cough*")

sm.setSpeakerID(NEINHEART)
sm.setBoxChat()
sm.sendNext("Who attacked Ereve. Kiku? Who?")

sm.setSpeakerID(KIRIRU)
sm.flipSpeaker()
sm.flipDialogue()
sm.setBoxChat()
sm.sendNext("I...don't know. Unfamiliar. A man...Gray skin....Purple hair....")

sm.setSpeakerID(NEINHEART)
sm.setBoxChat()
sm.sendNext("Empress! We must postpone the meeting. All knights are needed in Ereve!")

sm.setSpeakerID(CYGNUS)
sm.setBoxChat()
sm.sendNext("I agree. And I will return as well!")

sm.setSpeakerID(OZ)
sm.setBoxChat()
sm.sendNext("Um...is that a good idea? It'll be dangerous...")

sm.setSpeakerID(MIHILE)
sm.setBoxChat()
sm.sendNext("too dangerous")

sm.setSpeakerID(CYGNUS)
sm.setBoxChat()
sm.sendNext("I will not allow the knights to be split. Not when our home is endangered.")

sm.setSpeakerID(NEINHEART)
sm.setBoxChat()
sm.sendNext("The Empress is right. The attack on Ereve could be decoy to draw, the knights away from the Empress. We must all return to Ereve. The aliance can wait.")

sm.lockInGameUI(False,False)
sm.showFade(1)
sm.warpInstanceOut(chr, 104020120,0)