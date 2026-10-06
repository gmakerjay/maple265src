# Lost in Translation 1

Jack = 9201096

sm.setSpeakerID(Jack)
if sm.sendAskYesNo("Hey buddy! Nice timing. There is this communique I've been able to swipe from the officials at the Keep, however it's information is encrypted. I have no use for this as it is like this. So, will you transport this to John and see if he can decode this?"):
    if sm.canHold(4032032):
        sm.giveItem(4032032)
        sm.sendSayOkay("Very well, I'm counting on you on this one.")
        sm.startQuest(parentID)
    else:
        sm.senSayOkay("Hey. There's no slot on your ETC.")
else:
    sm.senSayOkay("Come on, the city really needs you cooperating on this one!")