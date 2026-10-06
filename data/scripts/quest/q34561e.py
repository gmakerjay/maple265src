JEAN = 3003406

sm.setPlayerBoxChat()
sm.sendNext("What's up?")

sm.setSpeakerID(JEAN)
sm.setBoxChat()
sm.sendNext("#face13#I've heard some suspicious folks arrived in Morass the other day, Sounds like they've been looking for something.")

sm.setPlayerBoxChat()
sm.sendNext("Suspicious folks? Suspicious how?")

sm.setSpeakerID(JEAN)
sm.setBoxChat()
sm.sendNext("#face13#You'll know what I mean when you see 'em. Last anyone saw, they were headed for the dungeon. Might wanna look for 'em there. I'll see if i can find out what else they've been up to.")

sm.setPlayerBoxChat()
if sm.sendAskAccept("Should i head out now?"):
    sm.completeQuest(34561)
    sm.warp(940204303)
else:
    sm.setPlayerBoxChat()
    sm.sendNext("Actually hang on, you might want to prepare a bit before going.")
    #sm.dispose()