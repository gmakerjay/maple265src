OLLIE = 3003652

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0##h0#! Can you hear me?")
sm.setPlayerBoxChat()
sm.sendNext("Huh? Ollie?")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
if sm.sendAskAccept("#face0#There's something I need to tell you. Please talk to me."):
    sm.startQuest(34772)