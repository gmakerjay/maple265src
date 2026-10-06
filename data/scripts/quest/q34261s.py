# Start [Morass] Rage of the King

RESEARCHER = 3003429

sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("His majesty is growing impatient.")
sm.sendNext("What should we do? We can't minimize the rejection value...")
sm.sendNext("Have we exhausted even the high priest's abilities?")
sm.setPlayerBoxChat()
sm.sendNext("What's going on?")
sm.setNpcBoxChat(RESEARCHER)
if sm.sendAskYesNo("We're preparing for an unscheduled experiment.\r\nCould you gather some materials?"):
	sm.setPlayerBoxChat()
	sm.sendNext("Sure.")
	sm.setNpcBoxChat(RESEARCHER)
	sm.sendNext("I need some of that #b#t4036311##k in either #bShadowdance Hall 3 or 4#k.")
	sm.startQuest(34261)