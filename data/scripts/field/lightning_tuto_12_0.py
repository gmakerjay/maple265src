LANIA = 1032201

sm.lockInGameUI(True,False)

sm.spawnNpc(LANIA, 340, 0)
sm.showNpcSpecialActionByTemplateId(LANIA, "summon", 0)
sm.forcedInput(2)
sm.sendDelay(30)

sm.forcedInput(0)
sm.setSpeakerID(LANIA)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendNext("The weather's beautiful! We should have a picnic before winter comes! Would you like that?")

sm.setBoxChat()   
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendSay("Let's buy some ingredients from the market. I feel like cooking!")

sm.setSpeakerID(LANIA)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendSay("Yes! I'll make a cream cheese spread and we can make fancy sandwiches!")

sm.setBoxChat()   
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendSay("(Yes, a home cooked meal is what I need to calm this turmoil inside.)")

sm.moveNpcByTemplateId(LANIA, True, 400, 100)
sm.sendDelay(1500)

sm.forcedInput(1)