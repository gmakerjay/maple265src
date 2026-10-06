# Lost in Translation 3

Jack = 9201096

sm.setSpeakerID(Jack)
if sm.sendAskYesNo("I knew we could rely on the outsider on this matter! Now that we have the letter translated by him, head it to Jack, he knows what to do."):
    if sm.canHold(4032018):
        sm.giveItem(4032018)
        sm.sendSayOkay("Very well, I'm counting on you on this one.")
        sm.startQuest(parentID)
    else:
        sm.senSayOkay("Hey. There's no slot on your ETC.")
else:
    sm.senSayOkay("Come on, the city really needs you cooperating on this one!")