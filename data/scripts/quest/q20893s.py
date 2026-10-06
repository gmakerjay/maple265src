# 20893 - [Job Adv] (Lv.100)   The Nightmare
#
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(1101000)
sm.setBoxChat()
sm.sendNext("...")

sm.setPlayerBoxChat()
sm.sendNext("#b(The Empress appears to be sleeping.) Empress? Empress.... Empress!!!")

sm.setSpeakerID(1101000)
sm.setBoxChat()
sm.sendNext("(...)")

sm.setPlayerBoxChat()
sm.sendNext("The Empress looks exhausted. I'll just leave this report next to her. She'll find it when she wakes.")

sm.lockInGameUI(False,False)
sm.showFade(100)
sm.warpInstanceIn(chr, 913031001)