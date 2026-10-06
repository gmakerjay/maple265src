# Finding Jack

John_Barricade = 9201051

sm.setSpeakerID(John_Barricade)
if sm.sendAskYesNo("The time is now, kid. We have all the preparations complete to further research for why all these oddities have been happening lately. I also must introduce you to my brother, Jack. "):
    sm.sendSayOkay("He is currently wandering around the Crimsonwood Mountain, past the sinister Phantom Forest, in the track to the Crimsonwood Keep. Your next destination is there, may your journey be a safe one.")
    sm.startQuest(parentID)
else:
    sm.senSayOkay("Okay, then. See you around.")