# Start [Morass] A Frightening Rumor 2

WOMAN = 3003427
SOLDIER = 3003451

sm.setNpcBoxChat(WOMAN)
sm.sendNext("Oh, hello!")
sm.setNpcBoxChat(WOMAN)
sm.sendNext("Yes, there was a survivor.I'd be happy to tell you, but...")
sm.setNpcBoxChat(WOMAN)
sm.sendNext("Would you mind doing me a favor first?")
sm.setPlayerBoxChat()
sm.sendNext("A favor?")
sm.setNpcBoxChat(WOMAN)
sm.sendNext("Yes, please. I'm really in a fix, and that lazy guard there is no help at all.\r\nWould you teach the #bStrong Ganngsters#k a lesson about manners? They always cause troble around here, and it's really hurting my business.")
sm.setNpcBoxChat(SOLDIER)
sm.sendNext("Who're you calling lazy?! I told you, my old knee injury is getting to me today!")
sm.setNpcBoxChat(WOMAN)
sm.sendNext("Don't you play the helpless victim with me! It seemed just fine this afternoon when you chased down that vendor and 'rescued' a meat pie from him! If only my problem was having to many meat pies on my hands...")
sm.setNpcBoxChat(WOMAN)
if sm.sendAskYesNo("Will you please help me out, Shey?"):
	sm.setNpcBoxChat(WOMAN)
	sm.sendNext("Thank you! Teach around 200 #bStrong Ganngsters#k some manners.\r\nThey like to loiter around #bBully Blvd. 3#k like a bunch of hoodlums.")
	sm.setNpcBoxChat(SOLDIER)
	sm.sendNext("Thanks for helping out, Shey! I'd do it myseft, you know, but my back... it's just really been a problem lately.")
	sm.setNpcBoxChat(WOMAN)
	sm.sendNext("Oh, quit your bellyaching! Shey's already agreed to do your job for you.")
	sm.startQuest(34256)