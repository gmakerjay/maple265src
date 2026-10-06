OLLIE = 3003652
LIGHT_EXECUTOR = 3003504

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face1#It's not really that easy, y'know. We need to charge it up, and that means defeating monsters, so...")
sm.setSpeakerID(LIGHT_EXECUTOR)
sm.setBoxChat()
if sm.sendAskAccept("Then defeat 200 #bKeepers of Light#k."):
    sm.startQuest(34576)
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face1#Uh, aren't they on your side?")
    sm.setSpeakerID(LIGHT_EXECUTOR)
    sm.setBoxChat()
    sm.sendNext("I follow only the voice.")
