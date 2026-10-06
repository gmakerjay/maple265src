# 410000000
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(3002008)
sm.setBoxChat()
sm.sendNext("You poor thing! How hard your life must be with no tail, no ears... Oh goodness, I want to give you just the BIGGEST hug... But I'd rather not touch you. Oh, bless your heart.")

sm.setPlayerBoxChat()
sm.sendSay("Um... thanks? (I give up.)")

sm.setSpeakerID(3002008)
sm.setBoxChat()
sm.sendSay("Well, I don't have much, but take this claw. Might help you tidy up your looks, don'tcha know. Come talk to me if anything troubles you! Nothing like a babbling Brook to cheer you up!")

sm.giveItem(1082572)
sm.createQuestWithQRValue(parentID, "NpcSpeech=30020071/30020062/30020093/30020084")
sm.lockInGameUI(False, False)