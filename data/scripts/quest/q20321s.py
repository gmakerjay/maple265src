# 20321 - [Job Adv] (Lv.60) Mihile 3rd job adv
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(1101002)
sm.setBoxChat()
if sm.sendAskYesNo("Are you ready to enter the Test area?"):
    sm.lockInGameUI(False,False)
    sm.showFade(100)
    sm.warpInstanceIn(chr, 913070200)
    sm.setInstanceTime(300, 130000000, 0)
    #sm.dispose()
else:
    sm.lockInGameUI(False,False)
    #sm.dispose()