OLLIE = 3003652

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face1#There's a #rball of spiders#k there on the right. I bet they're a present from Will.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face3#It'd be a good idea to get a handle on them now, before they really start multiplying.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Go to the #bMirror-touched Sea 2#k and hunt 200 #bAranya#k."):
    sm.startQuest(34572)
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0#All right, let's get started. It's to the #bright#k.")