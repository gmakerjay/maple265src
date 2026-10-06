# End [Morass] In Search of the Diary

RESEARCHER = 3003429

sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("Did you find the Journal?")
sm.setPlayerBoxChat()
sm.sendNext("Yes. Who wrote this?")
sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("The former High Priest. He resigned shortly after that incident.\r\nHere's what he put in his final entry.")
sm.lockUI()
sm.blind(1, 200, 0, 0)
sm.sayMonologue("This is neither magic nor science.", False)
sm.sayMonologue("It is beyond human; it is of the gods.\r\n", False)
sm.sayMonologue("We have overstepped our bounds.", True)
sm.blind(0, 0, 0, 1000)
sm.unlockUI()
sm.removeEscapeButton()
sm.setPlayerBoxChat()
sm.sendNext("What does he mean by that?!")
sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("That is why you're here. We needed you to bring High Priest Arkarium.")
sm.setPlayerBoxChat()
sm.sendNext("Is that why Arkarium...")
sm.completeQuest(34259)


