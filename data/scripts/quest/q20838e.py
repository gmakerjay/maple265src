
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.flipSpeaker()

sm.setSpeakerID(1102007)
sm.setBoxChat()
sm.sendNext("Do you have the Proof of Exam items?")
sm.sendSay("Yay! I'm so happy! You're every bit as amazing as i knew you'd bet.Here, take this chair. I made it for you! Sit on it when you're tired, and you'll get your HP back faster!  I shipped it into your Set-up inventory!")
sm.completeQuest(parentID)
sm.giveItem(3010060)
sm.lockInGameUI(False,False)