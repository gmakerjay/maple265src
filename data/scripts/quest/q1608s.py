# [Silent Crusade] Into the Gate

STARLING = 9120221

sm.setSpeakerID(STARLING)
response = sm.sendAskYesNo("I bet this weird gate has something to do with all the monsters going crazy. I think we oughtta take a closer look. You ready?")

if response:
    sm.sendNext("I'm counting on you to keep me safe from the big, bad, scary monsters! Let's go!")

    sm.warpInstanceIn(chr, 931050410)
    sm.startQuest(parentID)
else:
    sm.sendSayOkay("No?..")