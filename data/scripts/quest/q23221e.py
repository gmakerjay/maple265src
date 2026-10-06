MASTEMA = 2151009
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(MASTEMA)
sm.setBoxChat()
if not sm.canHold(1142556):
    sm.sendNext("Please clear some space in your equip inventory.")
    sm.lockInGameUI(False, False)
    #sm.dispose()

sm.sendNext("You made it back, #h0#! How are you?")

sm.setPlayerBoxChat()
sm.sendSay("I didn't know I had such anger within me. It is not easy to control.")

sm.setSpeakerID(MASTEMA)
sm.setBoxChat()
if sm.sendAskYesNo("But you succeeded, #h0#! I should write this down for posterity, right?"):
    sm.completeQuest(parentID)
    sm.giveItem(1142556)
    sm.giveAndEquip(1099009)
    sm.jobAdvance(chr.getJob()+1)
    sm.sendSayOkay("Your inner rage is now under your control, #h0#! All that's elft for you is to keep training.")
    sm.lockInGameUI(False, False)
else:    
    sm.lockInGameUI(False, False)
