sm.setSpeakerID(9010000)
sm.flipDialogue()
if sm.canHold(2435719, 10):
    sm.giveItem(2435719, 10)
    sm.consumeItem(2436403, 1)
else:
    sm.systemMessage("Please make more space in your inventory.")