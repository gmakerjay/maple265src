if sm.hasMobsInField():
    sm.flipSpeaker()
    sm.flipDialoguePlayerAsSpeaker()
    sm.sendSayOkay("There are still monsters here. I must defeat them all.")
else:
    if sm.getFieldID() == 400052500:
        sm.addQRValue(32364, "1")
        sm.modifiedCharacter()
        sm.warpInstanceOut(chr, 400000000)
    else:
        sm.warpNoReturn(sm.getFieldID() + 100, 0)