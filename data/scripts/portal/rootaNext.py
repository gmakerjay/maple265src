ALICIA = 1064002
sm.setSpeakerID(ALICIA)
if sm.hasMobsInField():
    sm.chat("Eliminate all monster before proceeding.")
else:
    sm.flipSpeaker()
    sm.removeEscapeButton()
    if sm.sendAskYesNo("Are you ready to fight?"):
        sm.warp(sm.getFieldID() + 10)

