MOONBEAM = 3002000
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendNext("The town seems restless, different from other days. Did something happen?")

sm.setSpeakerID(MOONBEAM)
sm.setBoxChat()
sm.sendSay("...Dunno.")

sm.setPlayerBoxChat()
sm.sendSay("(Something must be up. Moonbeam isn't herself either.)")
sm.sendSay("Okay.")

sm.setSpeakerID(MOONBEAM)
sm.setBoxChat()
sm.sendSay("...I'm sorry.")

sm.setPlayerBoxChat()
sm.sendSay("Why?")

sm.setSpeakerID(MOONBEAM)
sm.setBoxChat()
sm.sendSay("Just... everything. I'm sorry. I'm really, really sorry...")

sm.startQuest(parentID)

sm.setPlayerBoxChat()
sm.sendSay("Moonbeam! Why is she crying all of a sudden? I should look into it myself.")
sm.lockInGameUI(False, False)

