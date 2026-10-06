# Start [Morass] Truth behind the Rumor

TANA = 3003400

sm.setNpcBoxChat(TANA)
sm.sendNext("#face0#Do you know who i am?")
sm.setPlayerBoxChat()
sm.sendNext("Who do you mean?")
sm.setNpcBoxChat(TANA)
sm.sendNext("#face0#No one remembers me. I remember no one. All i have is my name.")
sm.setPlayerBoxChat()
sm.sendNext("Wh-")
sm.setNpcBoxChat(TANA)
sm.sendNext("#face0#But you... I know you")
sm.setNpcBoxChat(TANA)
sm.sendNext("#face5#Aaagh!")
sm.startQuest(34258)
