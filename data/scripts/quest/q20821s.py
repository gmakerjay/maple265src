# Start of Knight's Orientation
KIMU = 1102004
sm.lockInGameUI(True,False)
sm.removeEscapeButton()

sm.setSpeakerID(KIMU)
sm.flipSpeaker()
sm.setBoxChat()
sm.sendNext("This is the ceremony where we welcome all the newbie knights. "
"We need to find Training Instructor Kiku. "
"He's gotta be around here somewhere...")

sm.sendSay("Having a hard time finding Kiku? You should use that NPC button next to your map! "
"Just click on Kiku and you'll see an arrow!\r\n"
"Hurry up and go say hi before he gets grumpy!")

sm.startQuestNoCheck(parentID)
sm.lockInGameUI(False,False)