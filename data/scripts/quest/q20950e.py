
NEINHEART = 1104305

sm.lockInGameUI(True,False)
sm.removeEscapeButton()

sm.setSpeakerID(NEINHEART)
sm.setBoxChat()
sm.sendNext("How did things go? Oh, I should tell you that the Empress just arrived on Victoria Island. All the other Chief Knights are here as well, but you should never lower your guard. Shall we head out?")
sm.sendNext("Wait...Kiku? Why is Kiku here all? Goodness, he's injured!")
sm.lockInGameUI(False,False)
sm.showFade(100)
sm.warpInstanceIn(chr, 910400100, 0)
sm.completeQuest(parentID)