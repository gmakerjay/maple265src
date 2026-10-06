OLLIE = 3003652
SHUBERT = 3003502
MELANGE = 3003654

sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0#Why no sun? I don't like that.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face3#I mean... What does this mean?")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0#Umm... Good question. I don't know, but this might help you figure it out. Here, it's a staff that plays back memories.")
sm.setPlayerBoxChat()
sm.sendNext("A staff that... How does that even work?")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0#Glad you asked. Here are the instructions.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#It's pointing to the right. I think that means we should head for #bLiving Spring 5#k."):
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0#I'll scout ahead and make sure we're not getting ourselves into trouble! Er, more trouble.")
    sm.setSpeakerID(SHUBERT)
    sm.setBoxChat()
    sm.sendNext("#face0#Go on, girl. I'll get our comms back up and running. And let me know if anything needs blowing up!")
    sm.startQuest(34567)
    sm.createQuestWithQRValue(34560, "41=h0;42=h0;44=h1")