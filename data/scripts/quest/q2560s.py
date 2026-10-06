MONKEY = 1096003
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(MONKEY)
sm.setBoxChat()
sm.sendNext("Ooook! Ook! Ook!")

sm.setPlayerBoxChat()
sm.sendSay("Well, that hit the spot, but... I still don't understand what happened. Where's the ship? Hey, do you know what happened to me?")


sm.setSpeakerID(MONKEY)
sm.setBoxChat()
if sm.sendAskAccept("Oook! (The monkey nods. Does he really know what's going on? Couldn't hurt to ask.)"):
    sm.startQuest(parentID)
    sm.lockInGameUI(False, False)
else:
    sm.sendNext("Ook! Ook! (The monkey looks very dissatisfied.)")
    sm.lockInGameUI(False, False)
    #sm.dispose()