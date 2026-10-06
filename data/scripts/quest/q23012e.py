# 23012 - Wild Hunter 1st job advancement quest
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
XBOW_ID = 1462092

sm.setSpeakerID(2151002)  # Belle
sm.setBoxChat()
if sm.sendAskYesNo("Would you like to become a Wild Hunter?"):
    if not sm.canHold(XBOW_ID) or not sm.canHold(2061000):
        sm.sendSayOkay("Please make some space in your Equipment or Use Inventory.")
        sm.lockInGameUI(False, False)
        #sm.dispose()
    else:
        sm.completeQuest(23012)
        sm.jobAdvance(3300)
        sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
        sm.resetAP(False, 3300)
        sm.giveItem(XBOW_ID, 1)
        sm.giveSkill(30001061)  # Capture
        sm.giveSkill(30001062)  # Call of the Hunter
        sm.giveItem(2061000, 2000)
        sm.sendSayOkay("Congratulations, you are now a Wild Hunter! I have given you some SP and items to start out with, enjoy!")
        sm.lockInGameUI(False, False)
        #sm.dispose()
else:
    sm.sendSayOkay("Come back when you're ready.")
    sm.lockInGameUI(False, False)
    #sm.dispose()