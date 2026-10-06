# Start [Arcana] The Floral Flute

SMALL_SPIRIT = 3003301
WIND_SPIRIT = 3003302

sm.setSpeakerID(WIND_SPIRIT)
sm.flipDialogue()
sm.sendNext("Speak, speak! I, Wind Spirit, await your quest! Hurry, hurry.")
sm.setSpeakerID(SMALL_SPIRIT)
sm.flipDialogue()
sm.sendSay("Wind Spirit, could you carry us down this cliff to where the Floral Flute is?")
sm.setSpeakerID(WIND_SPIRIT)
sm.flipDialogue()
sm.sendSay("Dooot~ The flute below the cliff, the floral flute that toots.\r\nDooooooot~")
sm.setSpeakerID(WIND_SPIRIT)
if sm.sendAskYesNo("Yes, we'll ride the wind, zoomy and free. Down, down, to the flute that doots. Ready?"):
    sm.removeNpc(WIND_SPIRIT)
    sm.removeNpc(SMALL_SPIRIT)
    sm.startQuest(34454)
    sm.warp(450005100)