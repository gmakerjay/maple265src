# 1401 - Warriors of Perion
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(1022000)  # Dances with Balrog
sm.setBoxChat()
response = sm.sendAskYesNo("So you want to become a Warrior?")

if response:
    sm.completeQuestNoRewards(parentID)
    sm.jobAdvance(100)
    sm.resetAP(False, 100)
    sm.giveItem(1302182)
    sm.sendSayOkay("You are now a #bWarrior#k.")
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.lockInGameUI(False, False)
else:
    sm.lockInGameUI(False, False)
    #sm.dispose()