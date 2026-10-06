OLLIE = 3003652

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face3##h0#, do you see that over there? I don't think these coral trees burn but I see a... Tree-like object moving around.")
sm.setPlayerBoxChat()
sm.sendNext("I don't see anything over there. You must have real good eyes, Ollie.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0#Hey, they made me a scout for a reason.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Whatever it is, I bet we could burn it to dry the flare out. Let's get going."):
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0#Follow me! We'll need to head out to #bLiving Spring 4#k.")
    sm.startQuest(34564)
    sm.createQuestWithQRValue(34560, "41=h0;42=h0")
