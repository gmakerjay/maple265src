# End [Morass] The Prince and the Princess 2

JEAN = 3003406

sm.lockUI()
sm.setPlayerBoxChat()
sm.sendNext("Got it! So... it was a necklace!")
sm.setNpcBoxChat(JEAN)
sm.sendNext("#face0#Perfect!")
sm.setPlayerBoxChat()
sm.sendNext("Wait a minute... this looks like an anti-magic stone fragment. Ah!")
sm.blind(1, 200, 0, 0)
sm.OnOffLayer_On(0, "0", 0, 0, 0, "Map/Effect3.img/morass/Jean/3", 4, 1, -1, 0)
sm.sendDelay(1000)
sm.OnOffLayer_Off(1000, "0", 0)
sm.blind(0, 0, 0, 0)
sm.setNpcBoxChat(JEAN)
sm.sendNext("#face1#Whoa! That was close. Be careful!")
sm.sendNext("#face1#Don't you remember the last time one of these broke?\r\nShatter this, and every living thing nearby will disappear without a trace.")
sm.sendNext("#face1#Anything worth having comes with a little risk.\r\nThe more beautiful and special something is, the more dangerous... just like Tana.")
sm.setPlayerBoxChat()
sm.sendNext("Well, you ought to be more careful.")
sm.unlockUI()
sm.completeQuest(34263)