# Start [Morass] A Frightening Rumor 1

MAN = 3003426
GANGSTER = 3003418

sm.setPlayerBoxChat()
sm.sendNext("Is there a problem here?")
sm.setNpcBoxChat(GANGSTER)
sm.sendNext("Nothing that concerns you. Get lost!")
sm.setNpcBoxChat(MAN)
sm.sendNext("Oh, Shey! Perfect timing! Help me out here!\r\n\r\n#eBack off, you greedy thugs! This guy's a priest of the great temple!#n")
sm.setPlayerBoxChat()
sm.sendNext("#b(Priest? Hm... so Shey's a priest.)#k")
sm.setNpcBoxChat(GANGSTER)
sm.sendNext("Oh, uh... You are? Well... We'll just take this and get out of your way, then.")
sm.setNpcBoxChat(MAN)
sm.sendNext("Hey! Give that back! You can't just go around taking anything you want!")
if sm.sendAskYesNo("That's my livelihood you're running off with!\r\nShey! Would you please, please get my #bRipe Apples#k back from them?\r\nBusiness is bad enough as it is."):
    sm.startQuest(34255)