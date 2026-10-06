sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(1101002)
sm.setBoxChat()
if sm.sendAskYesNo("Now you're a REAL knight. Would you like to take your Job Advancement?"):
    if not sm.canHold(1142401):
        sm.sendSayOkay("You need inventory space.")
        sm.lockInGameUI(False,False)
        #sm.dispose()
    else:
        if chr.getJob() == 5110:
            sm.lockInGameUI(False,False)
            sm.jobAdvance(5111)
            sm.giveAndEquip(1098002)
            sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
            sm.giveItem(1142401)
            sm.completeQuest(20320)
        else:
            sm.sendNext("You are not a mihile class.")
            sm.lockInGameUI(False,False)
else:
    sm.lockInGameUI(False,False)

