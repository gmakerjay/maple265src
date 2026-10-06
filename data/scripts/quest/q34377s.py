sm.setSpeakerID(3003209)
if chr.getInstance()is None:
    if chr.getField().getId() != 450003100:
        sm.warp(450003100)
    else:
        sm.startQuest(34377)
        sm.completeQuest(34377)
else:
    sm.flipDialogue()
    sm.sendSayOkay("Unable to move to Lachelein...")
    #sm.dispose()
