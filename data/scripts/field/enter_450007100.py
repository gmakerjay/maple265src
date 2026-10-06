MELANGE = 3003654
SHUBERT = 3003502
OLLIE = 3003652
NEINHERT = 3003751

if sm.hasQuest(34571):
    sm.setSpeakerID(MELANGE)
    sm.setBoxChat()
    sm.sendNext("#face0#Tana's touched the power of the mirror. It's flowing out through the ocean.")
    sm.setPlayerBoxChat()
    sm.sendNext("Melange? How long have you been here?")
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face1#What does that even mean? The power of the mirror... comes from Tana?")
    sm.setSpeakerID(MELANGE)
    sm.setBoxChat()
    sm.sendNext("#face0#Creating a sun through the power of the Mirror World makes it hard to break from the outside.")
    sm.sendNext("#face0#But the spider's ritual was interrupted, so that power is flowing out with the Erda.")
    sm.setPlayerBoxChat()
    sm.sendNext("Um... I'm still not sure what you're...")
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face1#I don't even how Morass works half the time, so this Mirror World stuff just fries my brain.")
