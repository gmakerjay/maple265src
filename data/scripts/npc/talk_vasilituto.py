# Vasily (10305) | Maple Road : Port
sm.lockInGameUI(True,False)
sm.removeEscapeButton()
sm.setBoxChat()
if sm.hasQuestCompleted(32214):
    if sm.sendAskYesNo("Thanks to you, we're ready to set sail to Lith Harbor"):
        sm.lockInGameUI(False,False)
        sm.showFade(500)
        sm.warp(4000032, 0)
    else:
        sm.lockInGameUI(False,False)
        #sm.dispose()
elif sm.hasQuest(32214):
    if sm.sendAskYesNo("I'll let you on board. Go defeat the monsters rampaging my ship."):
        sm.lockInGameUI(False,False)
        sm.showFade(500)
        sm.warp(4000033, 0)
    else:
        sm.lockInGameUI(False,False)
        #sm.dispose()
else:
    sm.sendSayOkay("It's not time to board yet.")
    sm.lockInGameUI(False,False)