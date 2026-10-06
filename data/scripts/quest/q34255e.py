# End [Morass] A Frightening Rumor 1

MAN = 3003426

sm.setNpcBoxChat(MAN)
sm.sendNext("Thank you so much! Now I can get this food delivered.")
sm.setPlayerBoxChat()
sm.sendNext("I'm glad I could help!")
sm.sendNext("Also, do you know anything about that crystal disaster?")
sm.setNpcBoxChat(MAN)
sm.sendNext("Disaster? Well, it's been quite a while...\r\nDidn't it happen before you left for your studies?")
sm.setPlayerBoxChat()
sm.sendNext("I heard there was a survior.")
sm.setNpcBoxChat(MAN)
sm.sendNext("I-I don't know anything about that. I'm sorry.\r\nYou should try asking someone else.")
sm.sendNext("Maybe the pottery shop lady over there?")
sm.completeQuest(34255)