MELANGE = 3003654

sm.setSpeakerID(MELANGE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Now, follow me. We needto get to #bTemple of Life 4#k."):
    sm.startQuest(34583)
    sm.setSpeakerID(MELANGE)
    sm.setBoxChat()
    sm.sendNext("#face0#It's to the right.")