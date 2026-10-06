# Start [Morass] Hailing the Chief

RESEARCHER = 3003425

sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("A soldier said that #bmerchant#k will arrive soon.")
sm.setPlayerBoxChat()
sm.sendNext("#b(Merchant?)#k")
sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("One of the deliveries for the reception is late.\r\nCould you go to get it?")
sm.setPlayerBoxChat()
sm.sendNext("Oh... Uh, sure. I'll go get it.")
sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("Just head to the right. You can't miss it.")
sm.setPlayerBoxChat()
sm.sendNext("#b(May as well gather information until the Flying Fish contacts me again.)#k")
sm.startQuest(34254)