#   [Job Adv] (Lv.100)   Way of the NightLord / Shadower
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(2081400) # Hellin
sm.setBoxChat()
sm.sendNext("You have returned.")
sm.sendNext("I will take these tokens of heroism from you, and grant you your 4th job skills.\r\nYou helped a great deal in the fight to come.")
sm.completeQuestNoRewards(parentID)
chrJobID = sm.getChr().getJob()
sm.jobAdvance(chrJobID+1)
sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
sm.lockInGameUI(False, False)
