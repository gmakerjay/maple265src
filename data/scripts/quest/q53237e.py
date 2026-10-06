THUNDERHAMMER = 9270091
sm.removeEscapeButton()
sm.setSpeakerID(THUNDERHAMMER)
sm.setBoxChat()
sm.sendNext("You have returned with the Blue Ore and more than a few stab wounds. Well done.")
if sm.sendAskYesNo("I knew my ruminations were correct. Give me the core fragment. It's time for a new outer shell"):
    sm.completeQuestNoRewards(parentID)
    #sm.dispose()