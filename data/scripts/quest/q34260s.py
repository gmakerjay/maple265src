# Start [Morass] The Reunion

TANA = 3003400

sm.setPlayerBoxChat()
sm.sendNext("H-hi... Are you... okay? Are you in pain?")
sm.setNpcBoxChat(TANA)
sm.sendNext("#face0#It is... unbearable.")
sm.setPlayerBoxChat()
sm.sendNext("How can you stand it? Don't you want to escape? Don't you hate the people doing this to you?")
sm.setNpcBoxChat(TANA)
sm.sendNext("#face0#Hate? I don't know... hate.")
sm.setPlayerBoxChat()
sm.sendNext("What do you mean? How is that possible?")
sm.startQuest(34260)
sm.completeQuest(34260)
sm.warpInstanceIn(chr, 940204005, False)