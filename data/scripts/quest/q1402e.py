# 1402 - Magicians of Ellinia
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(1032001)  # Grendel the Really Old
sm.setBoxChat()
response = sm.sendAskYesNo("So you want to become a Magician?")

if response:
    sm.completeQuestNoRewards(parentID)
    sm.jobAdvance(200)  # Magician
    sm.resetAP(False, 200)
    sm.giveItem(1372043)
    sm.sendSayOkay("You are now a #bMagician#k.")
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.lockInGameUI(False, False)
else:
    sm.lockInGameUI(False, False)
    #sm.dispose()

