sm.lockInGameUI(True, False)
sm.removeEscapeButton()

sm.setPlayerBoxChat()
sm.sendNext("This is Maple World? Did I really... return? I never thought I'd see it again.")
sm.sendSay("I bet everyone is doing well. I'm off to see my friends!")

sm.jobAdvance(2510)
sm.showEffect("Effect/BasicEff.img/JobChangedEunwol", 0, 0, 0, -2, -2, False, 0)
sm.startQuest(parentID)
sm.completeQuest(parentID)
sm.addMaxHP(342)
sm.addMaxMP(665)
sm.lockInGameUI(False, False)