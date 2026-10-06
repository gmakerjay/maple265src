# End [Morass] Unexpected Enemy 3

FLYING_FISH = 3003409

sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendNext("No matter how many I defeat, there are always more!")
sm.setNpcBoxChat(FLYING_FISH)
sm.sendNext("#face0#Wonderful isn't it, the ability for the Erda to be born anew?")
sm.setPlayerBoxChat()
sm.sendNext("Wonderful isn't exactly the first thing that comes to mind...")
sm.setNpcBoxChat(FLYING_FISH)
sm.sendNext("#face0#Wait... I can sense her nearby.\r\nShe's much closer than I expected.")
sm.setPlayerBoxChat()
sm.sendNext("Her? Who are you talking about?")
sm.completeQuest(34252)
sm.createQuestWithQRValue(34271, "20=h0;21=h1;22=h0;23=h1;28=h0;29=h0;30=h0;31=h0;32=h0;33=h0;36=h0;53=h0;54=h0")
sm.setNpcBoxChat(FLYING_FISH)
sm.sendNext("#face0#Tana! Her presence alone is enough to effect even me...\r\nLet's proceed with caution.")
sm.warpInstanceIn(chr, 940204002, False) #cutscene