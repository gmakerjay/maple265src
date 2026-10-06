# 20411 - [Job Adv] (Lv.100) Mihile 4rd job adv
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setSpeakerID(1101002)
sm.setBoxChat()
sm.sendNext("Cygnus is safe and the knights will be back to normal soon, I've even heard some of them referring to you as the new Chief Knight. It looks like you have no choice but to take up my proposal.")
if not sm.canHold(1142402):
    sm.sendSayOkay("You need inventory space.")
    sm.lockInGameUI(False,False)
else:
    if chr.getJob() == 5111:
        sm.lockInGameUI(False,False)
        sm.completeQuest(20411)
        sm.jobAdvance(5112)
        sm.giveAndEquip(1098003)
        sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
        sm.giveItem(1142402)
    else:
        sm.sendNext("You are not a mihile class.")
        sm.lockInGameUI(False,False)