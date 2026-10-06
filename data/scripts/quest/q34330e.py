Gray_Mask = 3003209
sm.setSpeakerID(Gray_Mask)
if sm.getEmptyInventorySlots(1)>= 1:
    sm.flipDialogue()
    sm.sendNext("Hm... The dream is growing weaker.")

    sm.flipDialogue()
    sm.sendSay("Hold on to this for me, won't you? Who knows whether I'll transform into a Dreamkeeper again.")

    sm.flipDialogue()
    sm.sendSay("I discovered this while I was a Dreamkeeper. I guess I was still awake, in a way, Perhaps it will be of use to you.")

    sm.flipDialogue()
    sm.sendSay("I see Protective Mask couldn't make it. The shock of his ordeal must have been great.")

    sm.flipDialogue()
    sm.sendSay("But don't worry. I'm sure he will be recover.")

    sm.flipDialogue()
    sm.sendSay("#h0#...")

    sm.setPlayerAsSpeaker()
    sm.sendSay("I'm going to stop Lucid.")

    sm.flipDialogue()
    sm.sendSay("I won't stand in your way then. Win, #h0#. Both for yourself, and for us.")

    sm.completeQuest(34330)
    sm.startQuest(34331)
    sm.giveSymbol(1712003, 1, 34330)
else:
    sm.systemMessage("Make sure you have enough space in your inventory..")