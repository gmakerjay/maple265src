# 1405 - Pirates of the Nautilus
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(1090000)
sm.setBoxChat()
response = sm.sendAskYesNo("So you want to become a Pirate?")

if response:
    sm.completeQuestNoRewards(parentID)
    sm.jobAdvance(500)  # Pirate
    sm.resetAP(False, 500)
    sm.giveItem(1492014)
    sm.giveItem(1482014)
    sm.giveItem(2330006, 500)
    sm.sendSayOkay("You are now a #bPirate#k.")
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.lockInGameUI(False, False)
else:
    sm.lockInGameUI(False, False)
    #sm.dispose()
