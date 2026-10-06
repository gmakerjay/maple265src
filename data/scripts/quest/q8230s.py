# Stemming the Tide

npc = 9201096

sm.setSpeakerID(npc)
if sm.sendAskYesNo("Hey, traveler! I need your help. A great threat is about to endanger the folks down there at the New Leaf City, the way I can see it right now. These creatures roaming around here suddenly... That can be no good. Care if you listen to what I have to say?"):
    sm.sendSayOkay("That's the thing: the Twisted Masters, great figures that currently holds seize of the Crimsonwood Keep, have planned a large-scale attack to the New Leaf City, that may be happening on the next few days. I can't just stay here observing while they prepare for this attack. However, I can't just leave this position, I must keep an eye on their moves at all costs. There's where you enter: go find Lukan, knight of the past Crimsonwood Keep, that is currently wandering around the woods, and receive from him further orders, he knows what to do.")
    sm.startQuest(parentID)
else:
    sm.sendSayOkay("Okay, then. See you around.")