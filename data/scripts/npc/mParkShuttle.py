# Monster Park Shuttle
oldFieldID = sm.getReturnField()
if sm.getFieldID() != 951000000:
    sm.setSpeakerID(9071003)
    sm.flipDialogue()
    if sm.sendAskYesNo("Oh, our dearest guest! Would you like to go to Spiegelmann's Monster Park?"):
        sm.sendNext("Have a wonderful time at Monster Park!")
        sm.setReturnField()
        sm.showFade(500)
        sm.warp(951000000, 0)
elif sm.getFieldID() == 951000000:
    if oldFieldID == 0 or oldFieldID == 951000000:
        sm.chat("(Portal) No previous map data found. Teleporting to Henesys.")
        map = 100000000
        portal = 0
    else:
        map = oldFieldID
        portal = 0
    if sm.sendAskYesNo("Hello! Do you need a ride back to town? That's what the Monster Park Shuttle is for!"):
        sm.sendNext("Alright, the shuttle will take you back to town.")
        sm.showFade(500)
        sm.warp(map, portal)
    else:
        sm.sendNext("Feel free to use the shuttle whenever you want to leave Monster Park. Safe and comfortable rides, guaranteed 100%!")