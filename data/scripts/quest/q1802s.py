sm.setSpeakerID(2151003)
sm.sendNext("I want you to investigate Gelimer's lab. The knowledge we recover there could be intergral to our fight against the Black Wings.")

sel = sm.sendAskYesNo("The others are tied up. I'll leave this investigation to you. Bring us back something we can use.")

if sel == 1:
    sm.sendSayOkay("You should able to take the #e#bDimensional Mirror#k#n to get into Gelimer's #e#rEvolution Lab#k#n. Good Luck.")
    sm.startQuest(1802)
    sm.addQRValue(1802, "done")