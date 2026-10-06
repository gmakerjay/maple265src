# 410000000
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(3002009)
sm.setBoxChat()
sm.sendNext("Oh, my. You must be... Oh, dear... I just had my first litter, and I was so happy all my kits turned out fine. Your poor parents... They must have been devastated. So don't blame them, okay?")

sm.setPlayerBoxChat()
sm.sendSay("I'm fine! This is normal for-")

sm.setSpeakerID(3002009)
sm.setBoxChat()
sm.sendSay("I'm sure it is, sweetie. Now, this is an outfit that I made at the chief's request. He says that clothes can really lift spirits. And you look like you need it.")

sm.giveItem(1050306)
sm.createQuestWithQRValue(parentID, "NpcSpeech=30020071/30020062/30020093")
sm.lockInGameUI(False, False)