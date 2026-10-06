LADY_SYL = 1056000
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(LADY_SYL)
sm.setBoxChat()
if sm.sendAskYesNo("So, the Mirror of Insight has chosen you. Very well. I will promote you to Blade Recruit when you are ready."):
    sm.completeQuest(parentID)
    sm.giveItem(1342000)
    sm.jobAdvanceForDB(430)
    sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
    sm.sendNext("You are now a #b#eBlade Recruit#n#k. Take pride in that fact.")
    sm.lockInGameUI(False, False)
else:
    sm.sendSayOkay("Why hesitate? What are you afraid of?")
    sm.lockInGameUI(False, False)
    #sm.dispose()