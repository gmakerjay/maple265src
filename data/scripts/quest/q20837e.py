sm.lockInGameUI(True,False)
sm.flipSpeaker()
sm.removeEscapeButton()

sm.setSpeakerID(1102102)
sm.setBoxChat()
sm.sendNext("Elemental Slash is useful, so use it often!")
sm.sendSay("I supposed you're about ready to become a Knight-in-Training. I'll send you to the Test Site, and remember, no slouching!")

sm.completeQuest(parentID)
sm.lockInGameUI(False,False)
sm.showFade(100)
sm.warp(130030106, 0)