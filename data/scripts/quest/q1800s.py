if sm.getFieldID() != 310010000:
    sm.setSpeakerID(2151003)
    sel = sm.sendAskYesNo("Calling the Alliance. The Black Wings are operation deep within the mines below Edelestein. Something foul is afoot. Need help in #m310010000# immediately. Please accept.")
    if sel == 1:
        sm.warpInstanceOut(chr, 310010000)
        sm.startQuest(1800)
        sm.completeQuest(1800)
else:
    sm.startQuest(1800)
    sm.completeQuest(1800)
    
