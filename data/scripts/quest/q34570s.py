OLLIE = 3003652

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face3#No sign of Will. We should be smug-free while we work.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0#I think we can gather animal fat from those guys.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Hunt #bBellalis#k and gather 100 bottles of their #bAnimal Fat#k if you can."):
    sm.startQuest(34570)
