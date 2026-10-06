# 20810 - [Job Adv] (Lv.30)   Mihile
sm.setSpeakerID(2520025)
sm.setBoxChat()
sm.removeEscapeButton()
sm.lockInGameUI(True, False)
if sm.sendAskYesNo("Congratulations on passing your trials, do you want to become one of my knights?"):
    if not sm.canHold(1302038):
        sm.sendSayOkay("You need inventory space.")
        sm.lockInGameUI(False, False)
        #sm.dispose()
    elif not sm.canHold(1142400):
        sm.sendSayOkay("You need inventory space.")
        sm.lockInGameUI(False, False)
        #sm.dispose()
    else:
        if chr.getJob() == 5100:
            sm.lockInGameUI(False, False)
            sm.jobAdvance(5110)
            sm.giveItem(1302038)
            sm.giveItem(1142400)
            sm.completeQuest(20810)
            #sm.dispose()
        else:
            sm.sendNext("You are not a mihile class.")
            sm.lockInGameUI(False, False)
            #sm.dispose()
