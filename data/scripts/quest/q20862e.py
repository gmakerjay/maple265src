# The Path of a Blaze Wizard - Completion
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(1101004)  # Oz

sm.jobAdvance(1200)  # Blaze Wizard 1st Job
sm.resetAP(False, 1200)
sm.giveItem(1382000)  # Wooden Staff
sm.giveItem(1142066)

sm.completeQuest(parentID)
sm.setBoxChat()
sm.sendSayOkay("Congratulations, you are now a blaze wizard! I have added 5 AP and 5 SP, enjoy your journey!")
sm.lockInGameUI(False,False)
