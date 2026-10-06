# 914000300
LOST_KID = 1209006
sm.lockInGameUI(True, False)
sm.setSpeakerID(LOST_KID)
sm.removeEscapeButton()
sm.setBoxChat() 
if sm.sendAskAccept("*Sniff sniff* I was so scared... Please take me to Athena Pierce."):
    sm.startQuest(parentID)
    sm.lockInGameUI(False, False)
    sm.showFade(500)
    sm.warp(914000500, 1)
else:
    sm.sendNext("*Sob* Aran has declined my request!")
    sm.lockInGameUI(False, False)
    #sm.dispose()