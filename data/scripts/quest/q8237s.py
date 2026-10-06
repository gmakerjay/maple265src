# Bounty Hunter - Catch a Bigfoot by the Toe 1

Lita_LawLess = 9201054

sm.setSpeakerID(Lita_LawLess)
if sm.sendAskYesNo("Hey, traveler! I need your help. A new threat has appeared to the citizens of the New Leaf City. I'm currently recruiting anyone, and this time's target is #rthe Headless Horseman#k. Are you in?"):
    sm.sendSayOkay("Very well. Get me #r1 #t4032013##k, asap. The NLC is counting on you.")
    sm.startQuest(parentID)
else:
    sm.sendSayOkay("Okay, then. See you around.")