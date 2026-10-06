# Missing script here.. needs to be sniffed from GMS
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.flipSpeaker()

sm.setSpeakerID(1064018)
sm.setBoxChat()
sm.sendNext("Hey, you're looking pretty good,#h0#. I think I'll promode you top Knight-in-Training.\r\n Just follow the arrows, and they'll lead you straight to the Empress.")
sm.sendSay("Prove me right, #h0#.")
sm.startQuest(parentID)
sm.lockInGameUI(False,False)