# The Path of a Dawn Warrior - Completion
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(1101003)  # Mihile

sm.jobAdvance(1100)  # Dawn Warrior 1st Job
sm.resetAP(False, 1100)
sm.giveItem(1402001)  # Wooden Sword (2H)
sm.giveItem(1142066)
sm.addSP(1, False)

sm.completeQuest(parentID)
sm.setBoxChat()
sm.sendSayOkay("Congratulations, you are now a thunder breaker! I have added 4 SP, enjoy your journey!")
sm.lockInGameUI(False,False)