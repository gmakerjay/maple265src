Master_Lyck = 3003152

sm.setSpeakerID(Master_Lyck)
if chr.getInstance() is None:
    if chr.getField().getId() != 450002000:
        sm.warp(450002000)
    else:
        sm.sendNext("Ahhh... This year's festival feels so much more meaningful to me. I need alot of ingredients for it.")
        if sm.sendAskYesNo("Can you help me?"):
            sm.startQuest(39013)
            sm.completeQuest(39013)
        else:
            sm.sendSayOkay("Well nevermind then.")
else:
    sm.flipDialogue()
    sm.sendSayOkay("Unable to move to Chu Chu Island...")
    #sm.dispose()
