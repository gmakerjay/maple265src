# Character field ID when accessed: 910150001
# ObjectID: 0
# ParentID: 910150001
#if not int(sm.getQRValue(24007)) == 1:
if not sm.hasQuestCompleted(24003):
    sm.lockInGameUI(True, False)
    sm.showBalloonMsg("Effect/Direction5.img/effect/mercedesInIce/merBalloon/6", 2000)
    sm.sendDelay(2000)
    sm.forcedInput(2)
    sm.sendDelay(2000)
    sm.forcedInput(0)
    sm.showBalloonMsg("Effect/Direction5.img/effect/mercedesInIce/merBalloon/8", 2000)
    sm.lockInGameUI(False, False)
    sm.chatScript("Press the Alt key to jump.")
    