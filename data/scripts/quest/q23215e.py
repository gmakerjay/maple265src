# 23215 | True Awakening
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(2450017)
sm.setBoxChat()
sm.sendNext("You made it back, #h0#! How are you feeling?")
sm.setPlayerBoxChat()
sm.sendNext("Fighting myself from the past wasn't easy, but I remembered many of the skills I had forgotten.")
sm.setSpeakerID(2450017)
sm.setBoxChat()
if sm.sendAskYesNo("Excellent! I was hoping it would work like that. You really do feel strong now. Hey, #h0#, do you want me to write this all down for you?"):
    if sm.canHold(1142344):
        sm.giveItem(1142344)
        sm.jobAdvance(3112)
        sm.giveAndEquip(1099004)  # todo: upgrade instead of replace secondary? (potentials)
        sm.completeQuest(parentID)
        sm.sendSayOkay("Sounds like you've gotten all your old powers back. For now, #h0#, I suggest you focus on training steadily and improving your basics.")
        sm.lockInGameUI(False, False)
    else:
        sm.sendSayOkay("Please make space in your Equip inventory.")
        sm.lockInGameUI(False, False)
else:
    sm.lockInGameUI(False, False)