OLLIE = 3003652
LIGHT_EXECUTOR = 3003504

sm.setSpeakerID(LIGHT_EXECUTOR)
sm.setBoxChat()
if sm.sendAskAccept("My purpose here has been served. #bMirror-touched Sea 7#k. That is where you will find her."):
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face3#Wait, before you go... Why are you helping us?")
    sm.setSpeakerID(LIGHT_EXECUTOR)
    sm.setBoxChat()
    sm.sendNext("It is her will.")
    sm.setSpeakerID(LIGHT_EXECUTOR)
    sm.setBoxChat()
    sm.sendNext("The spider is the enemy. The enemy of an enemy is a friend.")
    sm.setSpeakerID(LIGHT_EXECUTOR)
    sm.setBoxChat()
    sm.sendNext("Go now. To the right.")
    sm.startQuest(34577)
