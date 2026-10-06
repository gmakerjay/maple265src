# End [Morass] Hailing the Chief

MAN = 3003426
GANGSTER = 3003418

sm.setNpcBoxChat(GANGSTER)
sm.sendNext("Hey, old man. Did you not hear me, or are you just stupid? I said pay up!\r\nYou want a primo market spot, you've gotta fork over the dough.")
sm.setNpcBoxChat(MAN)
sm.sendNext("W-well, you see, business has been down L-lately...")
sm.setPlayerBoxChat()
sm.sendNext("#b(That man seems to be in trouble.)#k")
sm.completeQuest(34254)