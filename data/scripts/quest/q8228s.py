# Lost in Translation 2

John_Barricade = 9201051

sm.setSpeakerID(John_Barricade)
if sm.sendAskYesNo("Hm, that's no good. I can't seem to make these Hyper Glyphs work, dang it. ... Ah, yea, the outsider! He may know the language this paper is written on. Let Elpam try to read this, maybe he knows something."):
    if sm.canHold(4032032):
        sm.giveItem(4032032)
        sm.sendSayOkay("Very well, I'm counting on you on this one.")
        sm.startQuest(parentID)
    else:
        sm.senSayOkay("Hey. There's no slot on your ETC.")
else:
    sm.senSayOkay("Come on, the city really needs you cooperating on this one!")