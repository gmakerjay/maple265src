# Start of What's Next?
KIMU = 1102004
sm.lockInGameUI(True,False)
sm.removeEscapeButton()

sm.flipSpeaker()
sm.setSpeakerID(KIMU)
sm.setBoxChat()
sm.sendSayOkay("You can use the portal on the left side of the map to move to the training area. Follow the signs! I'll be there.")

sm.startQuest(parentID)
sm.lockInGameUI(False,False)