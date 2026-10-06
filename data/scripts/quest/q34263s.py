# Start [Morass] The Prince and the Princess 2

JEAN = 3003406

sm.setNpcBoxChat(JEAN)
sm.sendNext("#face12#I think I dropped it somewhere here.")
sm.setPlayerBoxChat()
sm.sendNext("What is it that you dropped exactly?")
sm.setNpcBoxChat(JEAN)
sm.sendNext("#face0#It's just... something Tana would like.\r\nI got distracted and dropped it somewhere around here.")
sm.setPlayerBoxChat()
sm.sendNext("Is it jewelry or what?")
sm.sendNext("#b(And what would Tana want with jewelry?)#k")
sm.sendNext("One of these monsters must have taken it.")
sm.setNpcBoxChat(JEAN)
if sm.sendAskYesNo("#face0#Oh! Well, you're really strong. Do you think you could get it?"):
	sm.setPlayerBoxChat()
	sm.sendNext("Yeah. I-I think so.")
	sm.startQuest(34263)