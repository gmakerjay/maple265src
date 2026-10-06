quests_to_complete = [
        2600,
        2601,
        2602,
        2603,
        2604,
        2605,
        2606,
        2607,
        2608,
        2609  # A Strange Explorer
]
EXPLORER = 2470018
sm.setSpeakerID(EXPLORER)
sm.removeEscapeButton()
sm.lockInGameUI(True,False)
sm.setBoxChat()
if sm.sendAskYesNo("#eWould you like to skip the tutorial questline"):
    sm.lockInGameUI(False,False)
    for quest in quests_to_complete:
        sm.completeQuestNoRewards(quest)
    sm.levelUntil(10)
    sm.setSTR(4)
    sm.setDEX(4)
    sm.setLUK(25)
    sm.setAP(33)
    sm.giveItem(1332063)
    sm.giveItem(1142107)
    sm.jobAdvanceForDB(400)
    sm.warp(103050101)
else:
    sm.blindEffect(False)
    sm.blindEffect(True)
    sm.chatScript("The Secret Garden Depths")
    sm.chatScript("On a rainy day...")
    sm.forcedInput(0)
    sm.sendDelay(3000)
    sm.forcedInput(2)
    #sm.dispose()