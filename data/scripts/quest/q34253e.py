# End [Morass] A Boy and A Girl

NAMELESS_CAT = 3003424

sm.removeEscapeButton()
sm.setNpcBoxChat(NAMELESS_CAT)
sm.sendNext("Meoooow!")
sm.setPlayerBoxChat()
sm.sendNext("Phew! I barely managed to track all of them down.")
sm.completeQuest(34253)
sm.createQuestWithQRValue(34271, "20=h0;21=h0;22=h0;23=h1;28=h0;29=h0;30=h0;31=h0;32=h0;33=h0;36=h0;53=h0;54=h0")
sm.setPlayerBoxChat()
sm.sendNext("Just wait until I catch you Jean.")
sm.warpInstanceIn(chr, 940204003, False) # cutscene