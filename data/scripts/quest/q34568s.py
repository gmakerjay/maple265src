OLLIE = 3003652

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face1#Oh, here we go! It says the staff is rechargeable. So...")
sm.setPlayerBoxChat()
sm.sendNext("What kind of magic staff is rechargeable? Does it run on batteries?")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face3#According to this, the staff needs to be charged when its light grows weak. Defeating living things near it allows the staff to absorb magic from them.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#Okay, so, our staff is powered by violence. I think we can work with that! Why don't you hunt some #bBellalions#k? Maybe 200, just to be safe?"):
    sm.startQuest(34568)
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0#Remember, it's for a good cause!")
