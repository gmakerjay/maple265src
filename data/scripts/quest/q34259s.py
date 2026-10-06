# Start [Morass] In Search of the Diary

RESEARCHER = 3003429

sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("Hm, the Research Journal seems to be missing. One of our researchers recently had a bit of a scare in the lower dungeon. They must have dropped it there before they ran out. ")
sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("The flickering torchlight in the corridor plays tricks on your eyes. Our rather flighty researchers tend to let their imaginations run a way with them. After that last incident, I haven't been able to get any of them to go down there anymore.")
sm.setNpcBoxChat(RESEARCHER)
if sm.sendAskYesNo("You're the only one left that will go down there. Would you look for the missing journal entries"):
	sm.setPlayerBoxChat()
	sm.sendNext("Sure.")
	sm.setNpcBoxChat(RESEARCHER)
	sm.sendNext("I have the entry for #bHekatonian Year 53, Month 9, Day 18#k. Its will be the most helpful, but you'll need the prior entries to get a proper understanding. You'll find them in either #bShadowdance Hall 2 or 3#k.")
	sm.setPlayerBoxChat()
	sm.sendNext("Isn't this inhumane?")
	sm.setNpcBoxChat(RESEARCHER)
	sm.sendNext("Oh, quit your bellyaching! Shey's already agreed to do your job for you.")
	sm.createQuestWithQRValue(34259, "paper=0")



