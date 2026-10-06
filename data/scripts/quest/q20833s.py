sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.flipSpeaker()
sm.setSpeakerID(1102113)
sm.setBoxChat()
sm.sendNext("(*chirp, chirp*)")

sm.setPlayerAsSpeaker()
sm.setBoxChat()
sm.sendSay("Look! It's a bird! Is it talking to me?")

sm.setSpeakerID(1102113)
sm.setBoxChat()
sm.sendSay("*chirp, chirp, chirp*")

sm.setPlayerAsSpeaker()
sm.setBoxChat()
sm.sendSay("OMIGOODNESS! I can understand birds! I must be some sort of superhero. It... wants me to follow it. I'm sure Kizan won't mind.")

sm.createQuestWithQRValue(parentID, "gardenIn")# must be sent this qr value
sm.lockInGameUI(False,False)
sm.showFade(100)
sm.warp(130030104, 0)