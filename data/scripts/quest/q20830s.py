sm.lockInGameUI(True,False)
sm.removeEscapeButton()

sm.flipSpeaker()

sm.setSpeakerID(1102101)
sm.setBoxChat()
if sm.sendAskYesNo("Okay! You've earned a 30 second re-hydration break! Drink this, and don't faint on me!"):
    sm.startQuest(parentID)
    sm.giveItem(2001555, 1)
    sm.removeEscapeButton()
    sm.sendNext("Press the hotkey I to open your inventory, then double-click to enjoy your cool refreshment! And you WILL enjoy it!")
    sm.playSound("Aran/balloon", 100)
    sm.avatarOriented("UI/tutorial.img/3")
    sm.lockInGameUI(False,False)
    #sm.dispose()
else:
    sm.sendNext("I said, DRINK IT!")
    sm.lockInGameUI(False,False)
    #sm.dispose()