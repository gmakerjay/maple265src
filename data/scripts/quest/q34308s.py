Protective_Mask = 3003202

sm.setSpeakerID(Protective_Mask)
sm.flipDialogue()
sm.sendNext("Did you identify the Awakened One? Who was it?")

sm.flipDialogue()
sel = sm.sendNext("What should I say?\r\n\r\n#b#L0#Beauty Mask#l\r\n#L1#Classy Cat Mask#l\r\n#L2#Shrimp Mask#l#k")

if sel == 2:
    sm.flipDialogue()
    sm.sendNext("I see. Speak with Shrimp Mask. Convince him to aid our cause.")
    sm.startQuest(parentID)
