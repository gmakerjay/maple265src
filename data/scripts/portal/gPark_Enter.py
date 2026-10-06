REQ_LEVEL = 125

sm.setSpeakerID(2079000)
sm.setBoxChat()
if chr.getLevel() >= int(REQ_LEVEL):
    if sm.getParty() is None:
        sm.sendSayOkay("You have to be in a #bparty#k to enter the Ghost Park. Now go find some friends!")
    else:
        sm.startGhostPark()
elif chr.getLevel() < int(REQ_LEVEL):
    sm.sendSayOkay("You have to be atleast Level 125 to participate Ghost Park.")

