# Hidden Street : Destroyed Temple of Time Entrance (927020000) | Used in Luminous' Intro
PHANTOM = 2159353
sm.sendDelay(120)
sm.removeEscapeButton()
sm.setSpeakerID(PHANTOM)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendNext("A little over-dramatic, don't you think?")

sm.spawnNpc(PHANTOM, 1210, 10)
sm.showNpcSpecialActionByTemplateId(PHANTOM, "summon", 0)
sm.forcedInput(2)
sm.sendDelay(30)

sm.forcedInput(0)
sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("You're late. Typical. One would think the greatest thief in the world could steal a watch, at least.")

sm.setSpeakerID(PHANTOM)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendSay("There's such a thing as showing up fashionably late, you know. Besides, you're the big hero. I'm just along for the ride.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendSay("Call me what you will. We must all stand together, or perish.")

sm.setSpeakerID(PHANTOM)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendSay("I knew I wasn't going to like you from the start. You're too stuffy.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendSay("Sure. Right back at you.")

sm.setSpeakerID(PHANTOM)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendSay("I'm glad we're on the same page. And yet we were sent here together to wait for the end... Maybe Freud has a better sense of humor than I thought.")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendSay("I still don't understand why I must stand idly by here with YOU. Perhaps he thought the situation would be enough to make us set aside our differences.")

sm.setSpeakerID(PHANTOM)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendSay("That's the kind of good-hearted nonsense that gets people killed...")

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendSay("Enough chatter. I sense a dark presence.")

sm.setSpeakerID(PHANTOM)
sm.removeEscapeButton()
sm.setBoxChat()   
sm.sendSay("Don't waste your time moping around up here, staring into the distance. It's not as romantic as it seems...")
sm.sendDelay(300)

sm.showNpcSpecialActionByTemplateId(PHANTOM, "teleportation", 0)
sm.sendDelay(840)

sm.removeNpc(PHANTOM)
sm.sendDelay(1000)

sm.removeEscapeButton()
    sm.setPlayerBoxChat()
sm.sendNext("Just one more step...")

sm.forcedInput(1)
sm.curNodeEventEnd(True)