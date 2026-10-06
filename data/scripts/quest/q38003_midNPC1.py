# 410000000
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setSpeakerID(3002007)
sm.setBoxChat()
sm.sendNext("Ooh, you must be that 'human'. Your name is Shade? You really are as big as a house! Did someone abandon you because you're useless? Yeah, you look like you'd just sit around and eat all the good scraps.")

sm.setPlayerBoxChat()
sm.sendSay("I wasn't abandoned, there was an incident...")

sm.setSpeakerID(3002007)
sm.setBoxChat()
sm.sendSay("Oh there's always some kind of 'incident'. But anyway, is that brown rice cake? Mmm, I was getting hungry. Let me have it. Oh, and I've got something for you, too. I worked real hard on those shoes. Honest, I never made anything so big. Tell me if they don't fit and I'll adjust 'em for you.")

sm.giveItem(1072892)
sm.createQuestWithQRValue(parentID, "NpcSpeech=30020071")
sm.lockInGameUI(False, False)