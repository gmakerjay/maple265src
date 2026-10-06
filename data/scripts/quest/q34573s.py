OLLIE = 3003652

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face1#I think we should get in there and check it out.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face1#It's in #bMirror-touched Sea 4#k."):
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face1#We should hurry to the #bright#k. I don't want to miss the action.")
    sm.startQuest(34573)