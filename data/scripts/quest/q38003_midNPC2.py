# 410000000
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(3002006)
sm.setBoxChat()
sm.sendNext("Ahem, hem! How terrible... Even the most insignificant creatures have tails, but what happened to you? You can walk on two feet and talk, yet you do not have a tail?")

sm.setPlayerBoxChat()
sm.sendSay("Yeah, terrible, whatever... You know, I have no trouble getting around without a tail...")

sm.setSpeakerID(3002006)
sm.setBoxChat()
sm.sendSay("True enough. Well, good thing you're such an optimist! You wouldn't live long otherwise. Now then, let's at least try to make you presentable. We'll start with with tying that messy hair up. Use this item")

sm.giveItem(1004037)
sm.createQuestWithQRValue(parentID, "NpcSpeech=30020071/30020062")
sm.lockInGameUI(False, False)