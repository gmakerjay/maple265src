# Start [Morass] A Boy and A Girl

JEAN = 3003406
NAMELESS_CAT = 3003424

sm.setPlayerBoxChat()
sm.sendNext("Ha! Found you!")
sm.setNpcBoxChat(JEAN)
sm.sendNext("#face1#My magic wore off already?")
sm.setPlayerBoxChat()
sm.sendNext("Yes! Now give back my money!")
sm.setNpcBoxChat(JEAN)
sm.sendNext("#face0#Nah... I think I'll just... um... give it to these cats! Ha!\r\nLook, kitties! Shiny, new toys!")
sm.setNpcBoxChat(NAMELESS_CAT)
sm.sendNext("Meow! Meooow!")
sm.setPlayerBoxChat()
sm.sendNext("No, no, no! Bad kitties! Those aren't toys!")
sm.setNpcBoxChat(JEAN)
sm.sendNext("#face0#Better hurry up and catch them,\r\nor those cats will run off with all your cash!")
sm.setPlayerBoxChat()
sm.sendNext("Bah! Come here, kitty! Come on!")
sm.setNpcBoxChat(JEAN)
sm.sendNext("#face9#Remember, Jean the thief always has a #bbackup plan#k!\r\nHa HA!")
sm.startQuest(34253)
sm.createQuestWithQRValue(34271, "20=h0;21=h0;22=h0;23=h0;28=h0;29=h0;30=h0;31=h0;32=h0;33=h0;36=h0;53=h0;54=h0")
sm.setNpcBoxChat(NAMELESS_CAT)
sm.sendNext("Meow!!")
sm.setPlayerBoxChat()
sm.sendNext("I have to get back all the coins they took!")
