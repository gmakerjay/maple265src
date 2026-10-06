# 1403 - Bowmen of Henesys
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(1012100)  # Athena
sm.setBoxChat()
response = sm.sendAskYesNo("So you want to become a Bowman?")

if response:
    sm.completeQuestNoRewards(parentID)
    sm.jobAdvance(300)  # Archer
    sm.resetAP(False, 300)
    sm.giveItem(1452051, 1)
    sm.giveItem(2060000, 500)
    sm.giveItem(2061000, 500)
    sm.sendSayOkay("You are now an #bArcher#k.")
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.lockInGameUI(False, False)
else:
    sm.lockInGameUI(False, False)
    #sm.dispose()
